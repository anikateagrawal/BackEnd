const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/moviesDb').then(()=>console.log("connected")).catch((err)=>console.log(err));

const seriesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    date:Number,
    rating:Number,
    watched:Boolean
})

const series=new mongoose.model('Series',seriesSchema);
series.create({date:2018,rating:9.8,watched:false}).catch((e)=>{
    console.log(e.message);
});

