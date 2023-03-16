const express=require('express');
const app=express();
const path=require('path');
const cookieParser=require('cookie-parser');
app.use(cookieParser('this is secret code'));


app.listen(5000,()=>console.log('server running at port 5000'));


app.set('views',path.join(__dirname,'views'));
app.set('view engine','views');


app.get('/setcookies',(req,res)=>{
    res.cookie('name','kartik',{maxAge:7*24*60*60*1000,signed:true}).cookie('age',21,{httpOnly:true}).cookie('location','mathura').cookie('login',true).send('cookies created successfully');
});

app.get('/seecookies',(req,res)=>{
    res.send(JSON.stringify(req.cookies)+" "+JSON.stringify(req.signedCookies));
})

app.get('/login',(req,res)=>{
    const {login}=req.cookies;
    if(login)res.send('user is login logged in');
    else res.redirect('/setcookies');
})