import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import pg from "pg";
import mongoose from "mongoose";

async function main(){

    await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
}

main().catch(err => {console.log(err);})

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine','ejs')


const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

app.get("/",(req,res)=>{
    res.render("home.ejs")
})


app.get("/login",(req,res)=>{
    res.render("login.ejs")
})


app.get("/register",(req,res)=>{
    res.render("register.ejs")
})
app.post("/register", async(req,res)=>{
    
    const newUser = new User({
        email:req.body.username,
        password:req.body.password
    });
    await newUser.save()
    res.render("secrets.ejs")

});

app.listen(port,(req,res)=>{
    console.log("Server is running in " + port);
})