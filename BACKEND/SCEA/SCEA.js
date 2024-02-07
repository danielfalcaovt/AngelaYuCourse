import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import env from "dotenv";
import ejs from "ejs";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import session from "express-session";

env.config();

const db = new pg.Client({
    user:process.env.PG_USER,
    hostname:process.env.PG_HOST,
    database:process.env.PG_DATABASE,
    password:process.env.PG_PASSWORD,
    port:process.env.PG_PORT
});
db.connect();

const app = express();
const port = 3000;
const __dirname = import.meta.dirname;

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",async(req,res)=>{
    if(req.isAuthenticated()){
       try{
        const userid = req.user.id;
        const result = await db.query("SELECT * FROM posts WHERE userid = $1",[userid]);
        const cadastrados = result.rows;
        res.render("index.ejs",{
            products:cadastrados
        });
       }catch(err){
            console.log(err);
       }
    }else{
        res.redirect("/login");
    }
});

app.post("/send",async(req,res)=>{
    if (req.isAuthenticated()){
        const userid = req.user.id;
        const produto = req.body.produto;
        const estoque = req.body.estoque;
        let checkHave = await db.query("SELECT * FROM posts WHERE posttext = $1",[produto]);
        if (checkHave.rows.length > 0){
            console.log('Already registered.');
        }else{
            const posts = await db.query("INSERT INTO posts(posttext,userid) VALUES($1,$2) RETURNING *",[produto,userid]); 
        }
        res.redirect("/");
    }else{
        res.redirect("/login");
    }
});

app.get('/send',(req,res)=>{
    res.redirect("/");
});

app.get('/login',(req,res)=>{
    res.render("login.ejs");
}); 

app.post("/login",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login"
}));

app.get("/register",(req,res)=>{
    res.render("register.ejs");
})

app.post("/register", async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = await db.query("SELECT * FROM users WHERE email = $1",[username]);
    if (user.rows.length > 0){
        console.log('You re already registered.');
        res.redirect("/login");
    }else{
        bcrypt.hash(password.trim(),10, async (err,hash)=>{
            const user = await db.query("INSERT INTO users(email,password) VALUES($1,$2) RETURNING *",[username,hash.trim()]);
            console.log(user.rows[0]);
            res.render("index.ejs");
        });
    }
});

passport.use("local",new Strategy( async function verify(username,password,cb){
    try{
        const user = await db.query("SELECT * FROM users WHERE email = $1",[username]);
        if (user.rows.length > 0){
            const userPassword = user.rows[0].password;
            bcrypt.compare(password,userPassword,(err,success)=>{
                if(err){
                   return cb(err);
                }else{
                    if(success){
                       return cb(null,user.rows[0]);
                    }else{
                       return cb(null,false);
                    }
                }
            })}else{
               return cb("User not found.");
            };
    }catch(err){
        console.log(err);        
    }
}))

passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });  

app.listen(port,()=>{
    console.log(`Server is listening in ${port} port.`);
});

