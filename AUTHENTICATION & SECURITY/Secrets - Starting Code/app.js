import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import pg from "pg";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/userDB", {userNewUrlParser: true});

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine','ejs')

app.get("/",(req,res)=>{
    res.render("home.ejs")
})


app.get("/login",(req,res)=>{
    res.render("login.ejs")
})


app.get("/register",(req,res)=>{
    res.render("register.ejs")
})


app.listen(port,(req,res)=>{
    console.log("Server is running in " + port);
})