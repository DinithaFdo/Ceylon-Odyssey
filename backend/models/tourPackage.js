const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tourPackageSchema = new Schema({
    
    packageId : {
        type : String,
        required : true
    },

    package_Title : {
        type : String,
        required : true
    },

    createDate : {
        type : String,
        required : true
    },

    packageDescription : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required : true
    },

    image : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    destination : {
        type : String,
        required : true
    },

    days : {
        type : Number,
        required : true
    }


});

const TourPackage = mongoose.model('TourPackage', tourPackageSchema);

module.exports = TourPackage;