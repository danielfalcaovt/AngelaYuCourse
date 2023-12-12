import express from "express";
import bodyparser from "body-parser"


const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({extended:true}))

function logger(req,res,next){
  console.log(req.method)
  console.log(req.url)
  next()
}
app.use(logger)

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
