import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

const port = 3000
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("index.ejs")
})
let count = 0
app.post("/",(req,res)=>{
 
    if(req.body.password == "123"){
        res.render("correct.ejs")
    }else{
        count ++
        console.log(count);
        res.render("index.ejs",{
            wrong:count
        })
    }
})


app.listen(port,()=>{
    console.log(`Server is running in ${port}`);
})