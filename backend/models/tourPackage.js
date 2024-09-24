const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tourPackageSchema = new Schema({
    
    packageId : {
        type : String,
        required : [true, "Package ID is required!"],
        unique : true
    },

    package_Title : {
        type : String,
        required : [true, "Package package Title is required!"],
        minlength : [10, "Package Title should be at least 10 characters"]
    },

    pCreateDate : {
        type : String,
        required : [true, "Package Create date is required!"],
        default : Date.now,
        validate : {
            validator : function (value) {
                return value == Date.now
            },
            message : "Package Create Date must be today's date"
        }
    },

    packageDes : {
        type : String,
        required : [true, "Package Description is required!"],
        minlength : [100, "Package Description should be at least 100 characters"]
    },

    pCategory : {
        type : String,
        enum : ['Adventure Tours', 'Cultural Tours', 'Wildlife and Nature Tours'],
        required : [true, "Package Category is required!"]
    },

    pImage : {
        type : String,
        required : [true, "Package Image is required!"]
    },

    packagePrice : {
        type : Number,
        required : [true, "Package Price is required!"],
        min : [0, "Price must be at least 0"],
        validate : {
            validator : function (value) {
                return value >= 0;
            },
            message : "Package price should be greater than or equal 0"
        }
    },

    pDestination : {
        type : String,
        required : [true, "Package Destinations are required!"],
    },

    pDays : {
        type : Number,
        required : [true, "Number of days is required!"],
        validate : {
            validator : function (value) {
                return value == 3 || value == 5 || value == 7 || value > 7 
            },
            message : "Package Days must be 3, 5, 7, or more than 7"
        }
    }


});

const TourPackage = mongoose.model('TourPackage', tourPackageSchema);

module.exports = TourPackage;