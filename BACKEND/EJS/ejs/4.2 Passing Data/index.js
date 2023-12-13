import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render('index.ejs',{
      result:"Enter your name below:"
    })
});

app.post("/submit", (req, res) => {
    res.render("index.ejs",{
      name:req.body.fName,
      result:`Your name have ${req.body.fName.length + req.body.lName.length} letters`
    })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
