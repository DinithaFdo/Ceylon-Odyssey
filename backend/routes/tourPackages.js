const router = require('express').Router();
let TourPackage = require('../models/tourPackage.js');
const multer = require('multer');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./TourPackageImages");
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() +"_" + file.originalname);
    } 
});

var upload = multer({
    storage: storage
}).single("pImage");


router.post('/AddTPackage', upload, async (req, res) => {
    try {
        const newPackage = new TourPackage({
            packageId: req.body.packageId,
            package_Title: req.body.package_Title,
            pCreateDate: req.body.pCreateDate,
            packageDes: req.body.packageDes,
            pCategory: req.body.pCategory,
            pImage: req.file.filename,
            packagePrice: Number(req.body.packagePrice),
            pDestination: req.body.pDestination,
            pDays: Number(req.body.pDays)
        });

        await newPackage.save();

        res.status(200).json(newPackage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.route('/').get((req, res) => {

    TourPackage.find().then(tourPackages =>{
        res.json(tourPackages)
    }).catch(err => {
        console.log(err)
    });

});

router.route("/update/:id").put(async(req, res) => {

    let fetchPackageID = req.params.id;
    const {packageId, package_Title, pCreateDate, packageDes, pCategory, pImage, packagePrice, pDestination, pDays} = req.body;

    const updatePackage = {
        packageId,
        package_Title,
        pCreateDate,
        packageDes,
        pCategory,
        pImage,
        packagePrice,
        pDestination,
        pDays
    };

    const update = await TourPackage.findByIdAndUpdate(fetchPackageID, updatePackage)
    .then(() => {
        res.status(200).send({status: "Package updated!"})
    }).catch(err => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    });

});

router.route("/delete/:id").delete(async(req, res) => {
    
    let fetchPackageID = req.params.id;
    
    await TourPackage.findByIdAndDelete(fetchPackageID)
        .then(() => {
            res.status(200).send({status: "Package deleted!"});
    }).catch(err => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting package", error: err.message});
    });
    
});

router.route("/get/:category").get(async(req, res) => {
    let fetchCategory = req.params.category;
    const category = await TourPackage.find({category: fetchCategory})
        .then((package) => {
            res.status(200).send({status: "Package fetched!", package})
        }).catch(err => {
            console.log(err.message);
            res.status(500).send({status: "Error with fetching package", error: err.message});
        });
});

module.exports = router;