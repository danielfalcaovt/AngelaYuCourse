import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

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
const saltRounds = 3;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs", {});
});
let attempt = 0
app.post("/login", async (req, res) => {
    bcrypt.hash(password,saltRounds, async(err,hash)=>{
        if (err){
            console.log(err);
        }else{
            try {
            const user = req.body.username;
            const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [
              user,
            ]);
            if (checkUser.rows.length >= 1) {
              const pass = req.body.password;
              const userData = checkUser.rows[0];
              if (userData.password === pass) {
                res.render("secrets.ejs");
                attempt = 0;
              } else {
                attempt++
                console.log(attempt);
                if (attempt === 5){
                    res.render("home.ejs");
                }else{
                    res.render("login.ejs");
                }
            }
            } else {
              res.send("You might not registered.");
            }
          } catch (err) {
            res.render("login.ejs");
            console.log(err);
          }

        }
    });
});

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
      const password = req.body.password;
      const register = await db.query(
        "INSERT INTO users(email,password) VALUES($1,$2)",
        [email, password]
      );
      console.log(register);
      res.render("secrets.ejs");
    }
  } catch (err) {
    res.render("register.ejs");
  }
});

app.listen(port, (req, res) => {
  console.log("Server is running in " + port);
});
