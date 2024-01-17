import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express()
const port = 3000

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs")
});

app.post("/",(req,res)=>{
    const numberOne = req.body.num1
    const numberTwo = req.body.num2
    const result = Number(numberOne + numberTwo)
    res.render("index.ejs",{
     calc:result   
    })
});

app.listen(port,()=>{
    console.log(`Server is running in ${port}.`);
});