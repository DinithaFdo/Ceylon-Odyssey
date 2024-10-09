const router = require('express').Router();
const Equipment = require('../models/Equipment');
const PDFDocument = require('pdfkit');
const multer = require('multer');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Destination = require('../models/destination');

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
        // Parse tags (districtTags) if they're sent as a JSON string
        const tags = req.body.districtTags ? JSON.parse(req.body.districtTags) : [];

        const newEquipment = new Equipment({
            equipmentId: req.body.equipmentId,
            equipmentName: req.body.equipmentName,
            equipmentType: req.body.equipmentType,
            equipmentDescription: req.body.equipmentDescription,
            equipmentImage: req.file.filename,
            equipmentPrice: Number(req.body.equipmentPrice),
            equipmentQuantity: Number(req.body.equipmentQuantity),
            districtTags: tags // Add the district tags
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
        
        // If no image is uploaded, use the existing image
        const equipmentImage = req.file ? req.file.filename : existingEquipment.equipmentImage;

        // Update equipment with the new fields
        const updateEquipment = {
            equipmentName,
            equipmentType,
            equipmentDescription,
            equipmentImage,
            equipmentPrice: Number(equipmentPrice),
            equipmentQuantity: Number(equipmentQuantity),
            districtTags: req.body.districtTags ? JSON.parse(req.body.districtTags) : existingEquipment.districtTags // Handle districtTags if present
        };

        // Update the equipment document in the database
        const updatedEquipment = await Equipment.findByIdAndUpdate(fetchequipmentID, updateEquipment, { new: true });

        // Send response with updated equipment data
        res.status(200).json({ status: "Equipment updated", equipment: updatedEquipment });
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

        
        pdfDoc.pipe(res);

        
        const logoPath = path.join(__dirname, '/logo.png');
        pdfDoc.image(logoPath, { fit: [100, 100], align: 'center' });

        
        pdfDoc.moveDown(2);
        pdfDoc.fontSize(20).text('Low Stock Equipment Report', { align: 'center' });
        pdfDoc.moveDown(2);

        
        pdfDoc.moveTo(50, pdfDoc.y).lineTo(550, pdfDoc.y).stroke();
        pdfDoc.moveDown(0.2);
        

        
        pdfDoc.fontSize(12);

        
        pdfDoc.text('Name', 80, pdfDoc.y + 5); 

        
        pdfDoc.text('Quantity', 350, pdfDoc.y - 6);
        pdfDoc.moveDown();

        
        pdfDoc.moveTo(50, pdfDoc.y).lineTo(550, pdfDoc.y).stroke();
        pdfDoc.moveDown(0.2);

        
        lowStockEquipment.forEach(item => {
            
            pdfDoc.text(item.equipmentName, 50, pdfDoc.y + 5); 

            
            pdfDoc.text(item.equipmentQuantity.toString(), 370, pdfDoc.y - 10);
            pdfDoc.moveDown();
        });

        
        pdfDoc.moveTo(50, pdfDoc.y).lineTo(550, pdfDoc.y).stroke();

        
        pdfDoc.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/recommend/:destinationID', async (req, res) => {
    try {
        // Find the destination by ID
        const destination = await Destination.findById(req.params.destinationID);

        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        const destinationDistrict = destination.dDistrict;

        // Find all equipment that has district tags matching the destination district
        const recommendedEquipment = await Equipment.find({ districtTags: destinationDistrict });

        // If no equipment is found, send an empty array
        if (recommendedEquipment.length === 0) {
            return res.status(200).json({ message: 'No relevant equipment found for this destination', equipment: [] });
        }

        // Send the recommended equipment back
        res.status(200).json({ equipment: recommendedEquipment });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;