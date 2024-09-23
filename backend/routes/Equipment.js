const router = require('express').Router();
const Equipment = require('../models/Equipment');
const PDFDocument = require('pdfkit');
const multer = require('multer');
const express = require('express');
const cors = require('cors');

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

    await Equipment.findByIdAndDelete(fetchequipmentID)
    .then(() => {
        res.status(200).send({status: "Equipment deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting Equipment", error: err.message});
    });
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
        pdfDoc.text('Low Stock Equipment Report', { align: 'center' });
        pdfDoc.moveDown();
        lowStockEquipment.forEach(item => {
            pdfDoc.text(`Name: ${item.equipmentName}, Quantity: ${item.equipmentQuantity}`);
        });
        pdfDoc.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;