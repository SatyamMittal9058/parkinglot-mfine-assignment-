const mongoose=require('mongoose');
const carSchema=new mongoose.Schema({
    slot:{
        type:Number,
    },
    regNumber:{
        type:String,
    },
    color:{
        type:String,
    },
})
const carModel=mongoose.model('carModel',carSchema);
module.exports=carModel;