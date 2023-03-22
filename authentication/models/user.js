const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    }
});

const model=mongoose.model('Users',schema);

module.exports=model;