const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema({

    destinationID : {
        type : Number,
        required: true
    },

    dTitle : {
        type : String,
        required: true
    },

    dDescription : {
        type : String,
        required: true
    },

    dThumbnail : {
        type : String,
        required: true
    },

    dExtImage : {
        type : String,
        required: true
    },

    dDistrict : {
        type : String,
        required: true
    },

    dProvince : {
        type : String,
        required: true
    },

});

const Destination = mongoose.model("Destination",destinationSchema);

module.exports = Destination;