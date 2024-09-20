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

    pCreateDate : {
        type : String,
        default : Date.now,
        required : true
    },

    packageDes : {
        type : String,
        required : true
    },

    pCategory : {
        type : String,
        enum:['Adventure Tours', 'Cultural Tours', 'Wildlife and Nature Tours'],
        required : true
    },

    pImage : {
        type : String,
        required : true
    },

    packagePrice : {
        type : Number,
        required : true
    },

    pDestination : {
        type : String,
        required : true
    },

    pDays : {
        type : Number,
        required : true
    }


});

const TourPackage = mongoose.model('TourPackage', tourPackageSchema);

module.exports = TourPackage;