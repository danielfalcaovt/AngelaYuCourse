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
  // Get em todos os paises ja inseridos no banco de dados.
  const countries = await checkVisited()
  // Pegar o REQ do usuario, Capitalizar para procurar dentro do banco de dados de paises
  const request = req.body.country.trim();
  const country = request.toLowerCase()
  console.log(country);
  try{
  // Se o pais for encontrado dentro do banco de dados de paises, o codigo do pais sera retornado
  const c_code = await db.query(`SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%'|| $1 || '%'`,[country]);
  const code = c_code.rows["0"].country_code
  console.log(code);
  try{
  await db.query(`INSERT INTO visited_countries (country_code)
                  VALUES ($1)`,[code]);
                  res.redirect("/")
     }catch(err){
      console.log(err);
       res.render("index.ejs",{
        error:"Country has already been added.",
        countries: countries,
        total: countries.length
      })
     }   
    }catch(err){
      console.log(err);
  res.render("index.ejs",{
    error:"Country could not found.",
    countries: countries,
    total: countries.length
  })
}
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
