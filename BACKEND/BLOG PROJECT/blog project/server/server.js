import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express()
const port = 5000

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.get("/",(req,res)=>{
    res.json({
        posts:{
        postusername:"XLR-8",
        postuserimg:"../src/assets/FlockLogo.png",
        posttext:"I love Banana."
    }})
})

app.listen(port, ()=>{
    console.log(`Server is running in port: ${port}.`);
})
