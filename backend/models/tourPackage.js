const mongoose = require('mongoose');

const Schema = new mongoose.Schema;

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
        type : Date,
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


});

const TourPackage = mongoose.model('TourPackage', tourPackageSchema);

module.exports = TourPackage;