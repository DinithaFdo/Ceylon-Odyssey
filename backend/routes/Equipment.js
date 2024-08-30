const router = require('express').Router();
const equipment = require('../models/Equipment');
let Equipment = require('../models/Equipment.js');
const multer = require('multer');


router.route('/add').post((req, res) => {
    const equipmentId = req.body.equipmentId;
    const equipmentName = req.body.equipmentName;
    const equipmentType = req.body.equipmentType;
    const equipmentDescription = req.body.equipmentDescription;
    const equipmentImage = req.body.equipmentImage;
    const equipmentPrice = Number(req.body.equipmentPrice);
    const equipmentQuantity = Number(req.body.equipmentQuantity);

    const newEquipment = new Equipment({
        equipmentId,
        equipmentName,
        equipmentType,
        equipmentDescription,
        equipmentImage,
        equipmentPrice,
        equipmentQuantity
    });

    newEquipment.save()
        .then(() => res.json('Equipment added!'))
        .catch(err => res.status(400).json('Error: ' + err));
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

router.route("/get/:type").get(async(req, res) =>{

    let fetchequipmentType = req.params.type;

    const type = await Equipment.find({equipmentType: fetchequipmentType})
    .then(() => {
        res.status(200).send({status: "Equipment fetched", equipment: equipment})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with fetching Equipment", error: err.message});
    });
});


module.exports = router;