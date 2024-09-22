const router = require('express').Router();
const equipment = require('../models/Equipment');
let Equipment = require('../models/Equipment.js');
const multer = require('multer');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({

    destination: function(req, file, cb){
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


router.route("/update/:id").put(async(req, res) =>{

    let fetchequipmentID = req.params.id;
    const {equipmentId, equipmentName, equipmentType, equipmentDescription, equipmentImage, equipmentPrice, equipmentQuantity} = req.body;

    const updateEquipment = {
        equipmentId,
        equipmentName,
        equipmentType,
        equipmentDescription,
        equipmentImage,
        equipmentPrice,
        equipmentQuantity
    }

    const update = await Equipment.findByIdAndUpdate(fetchequipmentID, updateEquipment)
    .then(() => {
        res.status(200).send({status: "Equipment updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
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

router.route("/get/:equipmentType").get(async(req, res) =>{

    let fetchequipmentType = req.params.equipmentType;

    const type = await Equipment.find({equipmentType: fetchequipmentType})
    .then((equipment) => {
        res.status(200).send({status: "Equipment fetched", equipment})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with fetching Equipment", error: err.message});
    });
});


module.exports = router;