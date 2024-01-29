import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcryptjs";
import passport from "passport";
import session from "express-session";
import { Strategy } from "passport-local";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "brbr109br",
  port: 5432,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.use(
    session({
      secret: "Something",
      resave: false,
      saveUninitialized: true,
      cookie:{
        maxAge: 1000 * 60 * 60
      }
    })
  );

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");


app.get("/",(req,res)=>{
    console.log(req.user);
    if (req.isAuthenticated){
        res.render("home.ejs");
    }else{
        res.redirect("/login");
    }
});
//LOGIN ROUTE;
app.get("/login",(req,res)=>{
    res.render("login.ejs");
});
app.post("/login", passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login"
}));
//REGISTER ROUTE;
app.get("/register",(req,res)=>{
    res.render("register.ejs");
});
app.post("/register", async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password.trim();
    const checkRegistered = await db.query("SELECT * FROM users WHERE email = $1",[username]);
    if (checkRegistered.rows.length >= 1){
        res.send("You are already registered.")
    }else{
        bcrypt.hash(password.trim(),10, async (err,hash)=>{
            if (err){
                console.log("Error hashing password.");
            }
            const hashedPassword = hash.trim();
            try{                
                const result = await db.query("INSERT INTO users(email,password) VALUES ($1,$2) RETURNING *",[username,hashedPassword.trim()]);
                console.log(result.rows[0]);
                res.render("home.ejs");
            }catch(err){
                console.error(err);
                res.render("register.ejs");
    }
})}});

var strategy = new Strategy(async function verify(username, password, cb) {
    try{
        const userCheck = await db.query("SELECT * FROM users WHERE email = $1",[username]);
        if (userCheck.rows.length > 0){
            const user = userCheck.rows[0];
            const storedPassword = user.password.trim();

            bcrypt.compare(password,storedPassword,(err,match)=>{
                if (err){
                    return cb(err);
                }else{
                    if (match){
                        return cb(null, user);
                    }else{
                        return cb(null, false);
                    }
                }
            });
        }else{
            return cb("User not found.");
        }
    }catch(err){
        return cb(err);
    }
});

passport.use(strategy);
passport.serializeUser((user,cb)=>{
  cb(null, user);
});

passport.deserializeUser((user,cb)=>{
  cb(null, user);
});


app.listen(port, ()=>{
    console.log(`Console is running in ${port}`);
});
