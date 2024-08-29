const router = require('express').Router();
let TourPackage = require('../models/tourPackage.js');

router.route('/add').post((req, res) => {

    const packageId = req.body.packageId;
    const package_Title = req.body.package_Title;
    const createDate = req.body.createDate;
    const packageDescription = req.body.packageDescription;
    const category = req.body.category;
    const image = req.body.image;
    const price = Number(req.body.price);
    const destination = req.body.destination;
    const days = Number(req.body.days);

    const newTourPackage = new TourPackage({
        packageId,
        package_Title,
        createDate,
        packageDescription,
        category,
        image,
        price,
        destination,
        days
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
    const {packageId, package_Title, createDate, packageDescription, category, image, price, destination, days} = req.body;

    const updatePackage = {
        packageId,
        package_Title,
        createDate,
        packageDescription,
        category,
        image,
        price,
        destination,
        days
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