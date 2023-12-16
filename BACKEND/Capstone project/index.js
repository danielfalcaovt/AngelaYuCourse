import express from "express";
import axios from 'axios';
import bodyParser from "body-parser";

const app = express()
const port = 3000

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req, res)=>{
    res.render("index.ejs",{
      welcome:"Welcome to my backend capstone!"
    })
})
app.post("/weather", async (req,res)=>{
    try{
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=-10&longitude=-55&hourly=temperature_2m`)
        const temp = response.data.hourly.temperature_2m
        
        const result = temp
        const tamanho = result.length
        res.render("index.ejs",{
            choice:result[tamanho-1],
            welcome:"Temperature in C°:"
        })}catch(error){
            res.render("index.ejs",{
                choice:error.message,
            })
        }})
app.post("/",(req,res)=>{
    res.render("index.ejs",{
        user:req.body.username,
        welcome:`Welcome ${req.body.username}!`
    })
})
app.listen(port,()=>{
    console.log(`Server is running in ${port}.`);
})