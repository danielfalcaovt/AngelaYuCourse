import express from "express";
import bodyparser from "body-parser"


const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({extended:true}))

app.use((req,res,next)=>{
  console.log(req.url + req.method)
   next()
})



app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
