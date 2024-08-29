const router = require('express').Router();
let TourPackage = require('../models/tourPackage.js');

router.route('/add').post((req, res) => {

    const packageId = req.body.packageId;
    const package_Title = req.body.package_Title;
    const pCreateDate = req.body.pCreateDate;
    const packageDes = req.body.packageDes;
    const pCategory = req.body.pCategory;
    const pImage = req.body.pImage;
    const packagePrice = Number(req.body.packagePrice);
    const pDestination = req.body.pDestination;
    const pDays = Number(req.body.pDays);

    const newTourPackage = new TourPackage({
        packageId,
        package_Title,
        pCreateDate,
        packageDes,
        pCategory,
        pImage,
        packagePrice,
        pDestination,
        pDays
    });

    newTourPackage.save().then(() => {
        res.json('Tour Package added!')
    }).catch(err => {
        console.log(err);
    });

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