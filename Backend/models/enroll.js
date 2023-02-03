const mongoose=require('mongoose');

const EnrollSchema=mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    course:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('enroll',EnrollSchema);