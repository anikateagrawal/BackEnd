const express=require('express');
const app=express();
const path=require('path');
const methodOverride=require('method-override');
const {v4:uuid}=require('uuid');

app.use(methodOverride('_method'));

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
    id=uuid();
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

app.put('/comments/:id/edit',(req,res)=>{
    const {id}=req.params;
    const {username,comment}=req.body;
    var com=comments.find((comment)=>comment.id==id)
    if(com==undefined)res.send("Not found");
    else
    {
        com.user=username;
        com.text=comment;
        res.redirect("/comments/"+id);
    }
})

app.delete('/comments/:id',(req,res)=>{
    const {id}=req.params;
    comments=comments.filter((c)=>c.id!=id);
    res.redirect('/comments');
});

app.get('/comments/:id/edit',(req,res)=>{
    const {id}=req.params;
    var comment=comments.find((comment)=>comment.id==id)
    if(comment==undefined)res.send("Not found");
    else
    res.render('edit',{comment});
})

var comments=[
    {
    id:uuid(),
    user:"john",
    text:"this is first comment"
},{
    id:uuid(),
    user:"ron",
    text:"this is second comment"
},{
    id:uuid(),
    user:"von",
    text:"this is third comment"
}
]

