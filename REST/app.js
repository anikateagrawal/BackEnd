const express=require('express');
const app=express();
const path=require('path');
app.listen(5050,()=>{
    console.log("server running at port 5050");
});

app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

app.get('/comments',(req,res)=>{
    console.log(req.query);
    res.render('index',{comments})
})

app.post('/comments',(req,res)=>{
        const {username,comment}=req.body;
    if(comments.length!=0)
    var id=comments[comments.length-1].id+1;
    else id=1;
    comments.push({
        'id':id,
        user:username,
        text:comment
    });
    res.render('index',{comments});
})

app.get('/comments/new',(req,res)=>{
    res.render('new');
})


var comments=[
    {
    id:1,
    user:"john",
    text:"this is first comment"
},{
    id:2,
    user:"ron",
    text:"this is second comment"
},{
    id:3,
    user:"von",
    text:"this is third comment"
}
]

