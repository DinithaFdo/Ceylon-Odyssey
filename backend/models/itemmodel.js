const mongoose=require("mongoose")
const itemchema=mongoose.Schema({
    ticketId:String,
    subject:String,
    description:String,
    priority:String,
    date:String,
    solution:String,
    
    is_complete:{
        type:Boolean,
        default:false

    },
   

},{
    timestamps:true

})

const itemmodel=mongoose.model("Tickts",itemchema)
module.exports = itemmodel;