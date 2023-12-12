import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser"
const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended:true}))

/* function bandGenerator(req,res,next){
  let street = req.body.street
  let pet = req.body.pet
  let result = street + pet
  
  next()
}
 */
app.post("/submit", (req,res) =>{
  console.log(req.body);
  let street = req.body.street
  let pet = req.body.pet
  let result = street + pet
  res.send(`<h1>Your band name is:</h1><h2>${result}🎄</h2>`)
  res.sendStatus(201)
})

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/public/index.html")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
