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
        res.redirect("/consulta");
    }else{
        res.redirect("/login");
    }
});
app.get("/cadastro", async (req,res)=>{
    if(req.isAuthenticated()){
        try{
         const userid = req.user.id;
         const result = await db.query("SELECT * FROM posts");
         const cadastrados = result.rows;
         console.log(cadastrados);
         res.render("index.ejs",{
             products:cadastrados,
             cadastro:true
            });
        }catch(err){
             console.log(err);
        }
    }else{
        res.redirect("/login");
     }
});


app.post("/cadastro",async(req,res)=>{
    if (req.isAuthenticated()){
        const userid = req.user.id;
        const produto = req.body.produto.trim();
        console.log(produto);
        const estoque = req.body.estoque.trim();
        let checkHave = await db.query("SELECT * FROM posts WHERE (posttext = $1 AND estoque = $2)",[produto,estoque]);
        if (checkHave.rows.length > 0){
            console.log('Already registered.');
        }else{
            await db.query("INSERT INTO posts(posttext,estoque,userid) VALUES($1,$2,$3)",[produto,estoque,userid]); 
        }
        res.redirect("/");
    }else{
        res.redirect("/login");
    }
});
app.get("/consulta",async(req,res)=>{
    if(req.isAuthenticated()){
        try{
         const userid = req.user.id;
         const result = await db.query("SELECT * FROM posts");
         const cadastrados = result.rows;
         res.render("index.ejs",{
             products:cadastrados,
             consulta:true
         });
        }catch(err){
             console.log(err);
        }
     }else{
         res.redirect("/login");
     }    
})
app.post("/consulta",async(req,res)=>{
    if(req.isAuthenticated()){
        const userData = req.body.produto.trim();
        const result = await db.query("SELECT * FROM posts WHERE posttext = $1",[userData]);
        console.log(result.rows);
        if (result.rows.length >0 ){
            const produto = result.rows[0];
            res.render("index.ejs",{
                products:produto,
                consulta:true
            })
        }else{
            res.redirect("/consulta");
        };
    }else{
        res.redirect("/login");
    }
});

app.get("/delete",async(req,res)=>{
    if (req.isAuthenticated()){
        console.log(req.user.admin);
        try{
            const userid = req.user.id;
            const result = await db.query("SELECT * FROM posts");
            const cadastrados = result.rows;
            res.render("index.ejs",{
                products:cadastrados,
                delete:true
            });
           }catch(err){
                console.log(err);
           }
    }else{
        res.redirect("/login");

    }
});
app.post("/delete",async(req,res)=>{
    if (req.isAuthenticated()){
        const email = req.user.email;
        const checkAdmin = await db.query("SELECT * FROM users WHERE email = $1 AND admin = $2",[email,'Y']);
        if (checkAdmin.rows.length > 0){
            try{
                const userData = req.body.produto;
                const dadosTratados = Number(userData.trim());
                const check = await db.query("SELECT * FROM posts WHERE id = $1",[dadosTratados]);
                if (check.rows.length > 0){
                    const deleting = await db.query("DELETE FROM posts WHERE id = $1",[dadosTratados]);
                    res.redirect("/delete");
                }else{
                    res.redirect("/delete");
                }
            }catch(err){
                    console.log(err);
               }
        }else{
            res.send("You do not have permission to do that.");
            
        }
    }else{
        res.redirect("/login");

    }
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
    if(password.length === 0){
        res.send("Password cannot be empty.")
    }else{
    const user = await db.query("SELECT * FROM users WHERE email = $1",[username]);
    if (user.rows.length > 0){
        console.log('You re already registered.');
        res.redirect("/login");
    }else{
        bcrypt.hash(password.trim(),10, async (err,hash)=>{
            const user = await db.query("INSERT INTO users(email,password,admin) VALUES($1,$2,$3) RETURNING *",[username,hash.trim(),"N"]);
            console.log(user.rows[0]);
            res.render("index.ejs");
        });
    }}
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
               return cb(null,false);
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

