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
    id=comments.length+1;
    comments.push({
        'id':id,
        user:username,
        text:comment
    });
    res.redirect('/comments');
})

app.get('/comments/new',(req,res)=>{
    res.render('new');
})

app.get('/comments/:id',(req,res)=>{
    const {id}=req.params;
    var comment=comments.find((comment)=>comment.id==id)
    if(comment==undefined)res.send("Not found");
    else
    res.render('show',{comment});
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

