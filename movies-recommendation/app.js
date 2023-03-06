const express=require('express');
const path=require('path');
const app=express();
const mongoose=require('mongoose');
const movies=require('./models/movies.js');
mongoose.connect('mongodb://127.0.0.1:27017/moviesDb').then(()=>console.log('DB Connected')).catch((e)=>console.log(e));

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.listen(3000,()=>console.log('server is running at port 3000'));

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/search',async(req,res)=>{
    const {q}=req.query;
    console.log(q);
    const data=await movies.find({name:{$regex:`^${q}`}});
    res.status(200).send(data);
})