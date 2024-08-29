const mongoose=require("mongoose")


const adminchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
 
  
  
   

},{
    timestamps:true

})

const Manager=mongoose.model("Admin",adminchema)
module.exports = Manager;