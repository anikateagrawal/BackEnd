const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:25
    },
    date:{
        type:Number
    },
    rating:{
        type:Number,
        required:[true,"Ratings needed"],
        min:1,
        max:10
    },
    watched:{
        type:Boolean,
        default:false
    }
});

const movies=mongoose.model('series',schema);

module.exports =movies;

