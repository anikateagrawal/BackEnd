const express=require('express')
const app=express()
const cookieParser=require('cookie-parser');
const session=require('express-session');
const path=require('path');
const MongoDBStore = require('express-mongodb-session')(session);

const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/session',
    collection: 'mySessions'
  });

  store.on('error', function(error) {
    console.log(error);
  });

app.use(cookieParser());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.listen(5000,()=>console.log('server running at port 5000'));

app.use(session({
    secret:'This is a session',
    resave:true,
    store:store,
    saveUninitialized:true
}));

app.get('/session',(req,res)=>{
    res.redirect('/products');
})

app.get('/',(req,res)=>{
    res.render('user');
})
app.get('/user',(req,res)=>{
    const {username}=req.query;
    req.session.username=username;
    res.redirect('/greet');
});


app.get('/greet',(req,res)=>{
    const {username}=req.session;
    console.log(req.session);
    res.send('welcome '+username+`   <a href="/products">products</a>`);
})

app.post('/products',(req,res)=>{
    const {name,price,desc}=req.body;
    req.session.products.push({name,price,desc});
    res.redirect('/products');
})

app.get('/products',(req,res)=>{
    const {products}=req.session;
    if(products==undefined)req.session.products=[];
    console.log(req.session);
    res.render('products',{products});
})

app.get('/add',(req,res)=>{
    res.render('add');
})