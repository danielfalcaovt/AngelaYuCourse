import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/",(req,res)=>{
    const userRes = req.body.text;
    let finalRes;
    let resError;
    if (userRes.length > 2) {
        finalRes = userRes
    }else{
        resError = "You can not use less than 2 length name."
    };
    res.render("index.ejs",{
        userResponse:finalRes,
        error:resError
    });
});

app.listen(port,()=>{
    console.log(`Server is running in ${port}.`);
});
