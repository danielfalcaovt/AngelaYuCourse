import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  hostname: "localhost",
  database: "worldwide",
  password: "brbr109br",
  port: "5432",
});

db.connect();

async function checkVisited(){

  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries
}


app.get("/", async (req, res) => {
  const countries = await checkVisited()
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
  });
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
app.post("/add", async (req, res) => {
  const request = req.body.country.trim();
  const country = capitalizeFirstLetter(request)
  console.log(country);
  const c_code = await db.query(`SELECT country_code FROM countries WHERE country_name LIKE '${country}%'`);
  if (c_code.rows.length !== 0){
  const code = c_code.rows["0"].country_code
  await db.query(`INSERT INTO visited_countries (country_code)
                  VALUES ($1)`,[code]);
             
                  res.redirect("/");
}else{
  

    res.redirect("/")
}
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
