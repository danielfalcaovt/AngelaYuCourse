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

app.use(bodyParser.urlencoded({ extended: true }));
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

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/secrets", (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req,res)=>{
  res.render("login.ejs");
});
app.post("/login", passport.authenticate("local",{
  successRedirect: "/secrets",
  failureRedirect: "/login"
}));

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const email = req.body.username;
    const checkValue = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkValue.rows.length >= 1) {
      res.send("You're already registered. Try logging in.");
    } else {
      const password = String(req.body.password.trim());
      bcrypt.hash("123", 10, async function (err, hash) {
        const hashedPassword = hash.trim();
        if (err) {
          console.log("Error hashing password: ", err);
          res.send(500);
        } else {
          await db.query("INSERT INTO users(email,password) VALUES ($1,$2)", [
            email,
            hashedPassword,
          ]);
          res.render("secrets.ejs");
        }
      });
    }
  } catch (err) {
    res.render("register.ejs");
  }
});

var strategy = new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPasword = user.password.trim();
        bcrypt.compare(password, storedHashedPasword, (err, result) => {
          if (err) {
            return cb(err);
          } else {
            if (result === true) {
              return cb(null,user);
            } else {
              return cb(null,false);
            }
          }
        });
      }else{
        return cb('User not found.')
      }
    } catch (err) {
      return cb(err);
    }
  })

passport.use(strategy);
passport.serializeUser((user,cb)=>{
  cb(null, user);
});

passport.deserializeUser((user,cb)=>{
  cb(null, user);
});

app.listen(port, (req, res) => {
  console.log("Server is running in " + port);
});
