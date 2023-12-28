import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "worldwide",
  password: "brbr109br",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Daniel", color: "teal" },
  { id: 2, name: "Isabella", color: "powderblue" },
];

async function checkVisisted(prop) {
  const result = await db.query(`
  SELECT *
  FROM visited_countries 
  JOIN whois 
  ON whois.id = ${prop} and whois.id = visited_countries.person
  `);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
app.get("/", async (req, res) => {
  const countries = await checkVisisted(currentUserId);
  let usercolor = ""
  for (let pos in users){
    if (users[pos].id == currentUserId){
      usercolor = users[pos].color;
    };
  };
  console.log(users);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: usercolor,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const username = Number(currentUserId)
  
  console.log(username);
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code,person) VALUES ($1,$2)",
        [countryCode, username]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  currentUserId = Number(req.body.user);
  console.log(currentUserId);
  let usercolor = ""
  for (let pos in users){
    if (users[pos].id == currentUserId){
      usercolor = users[pos].color;
    };
  };
  const countries = await checkVisisted(currentUserId);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: usercolor,
  });
});

app.post("/new", async (req, res) => {
  try{
    const color = req.body.color
    const name = req.body.name
    const newuser = await db.query(`INSERT INTO whois (first_name) VALUES ($1) RETURNING id`,[name])
    users.push({ id: newuser.rows["0"].id, name: String(name), color: String(color) });
    console.log(users);
    res.render("new.ejs")
  }catch(err){
    console.log(err);
  }
  

  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
