const express=require('express');
const app=express();
const path=require('path');
app.listen(5000,()=>{
    console.log("server running at port 5000");
});

app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));
app.get('/',(req,res)=>{
    console.log(req.query);
    res.render('index')
})

app.get('/user',(req,res)=>{
    console.log(req.query);
    res.send("get request received");
})

app.post('/user',(req,res)=>{
    console.log(req.body);
    res.send("post request received");
})