const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
    
    equipmentId : {
        type : String,
        required : true
    },

    equipmentName : {
        type : String,
        required : true
    },

    equipmentType : {
        type : String,
        required : true
    },

    equipmentDescription : {
        type : String,
        required : true
    },

    equipmentImage : {
        type : String,
        required : true
    },

    equipmentPrice : {
        type : Number,
        required : true
    },

    equipmentQuantity : {
        type : Number,
        required : true
    },


});

const Equipment = mongoose.model('Equipment', EquipmentSchema);

module.exports = Equipment;