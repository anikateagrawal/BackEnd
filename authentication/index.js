const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const app = express();
const users = require("./models/user");
const bcrypt = require("bcrypt");
const session=require('express-session');


const saltRounds = 10;

mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    cookie:{}
}))

app.get("/", (req, res) => {
  res.render("signup");
});

app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const pass = await bcrypt.hash(password, saltRounds);
  await users.create({ username, password: pass });
  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await users.findOne({ username });
  if (!user) {
    return res.send("username not found");
  }

  if (await bcrypt.compare(password, user.password)) {
    req.session.userid=user.id;
    res.redirect('/dashboard');
  } else {
    res.send("password incorrect");
  }
});


let requireLogin=(req,res,next)=>{
    if(!req.session.userid)return res.redirect('/login');
    next();
}

app.get('/dashboard',requireLogin,(req,res)=>{
    res.render('dashboard');
})


app.get("/login", (req, res) => {
  res.render("login");
});

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login');
})

app.listen(5000, () => {
  console.log("App listening on port 5000!");
});
