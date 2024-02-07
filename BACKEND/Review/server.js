import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("hello,world!")
});

app.listen(()=>{
    console.log(`Running in ${port}`);
})