const express=require('express');
const app=express();
const port=8080;
const path=require("path");

app.set('views',path.join(__dirname,'views'));

app.listen(port,()=>{
    console.log("server is running at port ",port);
});

app.set('view engine','ejs');

app.get('/home',(req,res)=>{
    rn=Math.floor(Math.random()*10);
    res.render('index',{rn});
});

app.use(express.static(path.join(__dirname,'public')));

const todos=["football","coding","Reading"];

app.get('/todos',(req,res)=>{
    res.render('Todos',{todos});
});

app.set('partials',path.join(__dirname,'views','partials'));