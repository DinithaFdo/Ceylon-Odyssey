const router = require('express').Router();
const Equipment = require('../models/Equipment');
const PDFDocument = require('pdfkit');
const multer = require('multer');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./EquipmentImages");
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: storage
}).single("equipmentImage");

function deleteImage(filePath) {
    fs.unlink(path.join(__dirname, '..', 'EquipmentImages', filePath), (err) => {
        if (err) {
            console.error('Failed to delete the file:', err);
        }
    });
}


router.post('/add', upload, async (req, res) => {
    try {
        const newEquipment = new Equipment({
            equipmentId: req.body.equipmentId,
            equipmentName: req.body.equipmentName,
            equipmentType: req.body.equipmentType,
            equipmentDescription: req.body.equipmentDescription,
            equipmentImage: req.file.filename,
            equipmentPrice: Number(req.body.equipmentPrice),
            equipmentQuantity: Number(req.body.equipmentQuantity)
        });

        await newEquipment.save();

        res.status(200).json(newEquipment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route('/').get((req, res) => {
    Equipment.find()
        .then(equipment => res.json(equipment))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route("/update/:id").put(upload, async (req, res) => {
    let fetchequipmentID = req.params.id;
    const { equipmentName, equipmentType, equipmentDescription, equipmentPrice, equipmentQuantity } = req.body;

    try {
        
        const existingEquipment = await Equipment.findById(fetchequipmentID);

        
        const equipmentImage = req.file ? req.file.filename : existingEquipment.equipmentImage;

        
        const updateEquipment = {
            equipmentName,
            equipmentType,
            equipmentDescription,
            equipmentImage,
            equipmentPrice,
            equipmentQuantity
        };

        
        await Equipment.findByIdAndUpdate(fetchequipmentID, updateEquipment);

        res.status(200).send({ status: "Equipment updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});


router.route("/delete/:id").delete(async(req, res) =>{

    let fetchequipmentID = req.params.id;

   
    try {
        const equipmentToDelete = await Equipment.findById(fetchequipmentID);

        if (!equipmentToDelete) {
            return res.status(404).send({ status: "Equipment not found!" });
        }

        if (equipmentToDelete.equipmentImage) {
            deleteImage(equipmentToDelete.equipmentImage);
        }

        await Equipment.findByIdAndDelete(fetchequipmentID);
        res.status(200).send({ status: "Equipment deleted!" });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting Equipment", error: err.message});
    }
});

router.route("/get/:id").get(async(req, res) => {
    let fetchEquipmentID = req.params.id;

    try {
        const fetchEquipment = await Equipment.findById(fetchEquipmentID);
        console.log(fetchEquipment); 

        if (fetchEquipment) {
            res.status(200).send({ status: "Equipment fetched!", equipment: fetchEquipment });
        } else {
            res.status(404).send({ status: "Equipment not found" });
        }
    } catch (err) {
        res.status(500).send({ status: "Error fetching equipment", error: err.message });
    }
});



router.get('/report', async (req, res) => {
    try {
        const lowStockEquipment = await Equipment.find({ equipmentQuantity: { $lt: 5 } });
        const pdfDoc = new PDFDocument();
        let filename = 'low_stock_equipment_report.pdf';
        res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-Type', 'application/pdf');

        // Pipe the document to the response
        pdfDoc.pipe(res);

        // Add website logo
        const logoPath = path.join(__dirname, '/logo.png');
        pdfDoc.image(logoPath, { fit: [100, 100], align: 'center' });

        // Add title for the report
        pdfDoc.moveDown(2);
        pdfDoc.fontSize(20).text('Low Stock Equipment Report', { align: 'center' });
        pdfDoc.moveDown(2);

        // Draw the top horizontal line
        pdfDoc.moveTo(50, pdfDoc.y).lineTo(550, pdfDoc.y).stroke();
        pdfDoc.moveDown(0.2);
        

        // Set up table header with fixed positions
        pdfDoc.fontSize(12);

        // Adjust Name column to be slightly lower by adding more to Y
        pdfDoc.text('Name', 80, pdfDoc.y + 5); // Further lowered by adjusting Y

        // Adjust Quantity column to stay as is
        pdfDoc.text('Quantity', 350, pdfDoc.y - 6);
        pdfDoc.moveDown();

        // Draw a horizontal line after the headers
        pdfDoc.moveTo(50, pdfDoc.y).lineTo(550, pdfDoc.y).stroke();
        pdfDoc.moveDown(0.2);

        // Add table rows with equipment data
        lowStockEquipment.forEach(item => {
            // Adjust Name to be slightly lower
            pdfDoc.text(item.equipmentName, 50, pdfDoc.y + 5); // Lower the Name line more

            // Align Quantity
            pdfDoc.text(item.equipmentQuantity.toString(), 370, pdfDoc.y - 10);
            pdfDoc.moveDown();
        });

        // Draw a final horizontal line at the bottom of the table
        pdfDoc.moveTo(50, pdfDoc.y).lineTo(550, pdfDoc.y).stroke();

        // End the document
        pdfDoc.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;