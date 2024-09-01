const router = require('express').Router();
let Destination = require('../models/destination');

router.route("/add").post((req,res) => {
    const destinationID = Number(req.body.destinationID);
    const dTitle = req.body.dTitle;
    const dDescription = req.body.dDescription;
    const dThumbnail = req.body.dThumbnail;
    const dExtImage = req.body.dExtImage;
    const dDistrict = req.body.dDistrict;
    const dProvince = req.body.dProvince;

    const newDestination = new Destination({
        destinationID,
        dTitle,
        dDescription,
        dThumbnail,
        dExtImage,
        dDistrict,
        dProvince
    });

    newDestination.save().then(() => {
        res.json("Destination added");
    }).catch((err) => {
        console.log(err);
    });
})

router.route("/").get((req,res) => {

    Destination.find().then((destinations) => {
        res.json(destinations);
    }).catch((err) => {
        console.log(err);
    })
});

router.route("/update/:id").put(async (req,res) => {
    let destinationID = req.params.id;
    const {dTitle, dDescription, dThumbnail, dExtImage, dDistrict, dProvince} = req.body;

    const updateDestination = {
        dTitle,
        dDescription,
        dThumbnail,
        dExtImage,
        dDistrict,
        dProvince
    }

    const update = await Destination.findByIdAndUpdate(destinationID, updateDestination).then(() => {
        res.status(200).send({status: "Destination updated", destination: update});
    }
    ).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    }
    )

});

router.route("/delete/:id").delete(async (req,res) => {
    let destinationID = req.params.id;

    await Destination.findByIdAndDelete(destinationID).then(() => {
        res.status(200).send({status: "Destination deleted"});
    }
    ).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with deleting data"});
    }
    )
});

router.route("/get/:id").get(async (req,res) => {
    let destinationID = req.params.id;

    const destination = await Destination.findById(destinationID).then(() => {
        res.status(200).send({status: "Destination fetched", destination: destination});
    }
    ).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with fetching data"});
    }
    )
});

module.exports = router;