import express from "express"

const app = express()
const port = 3000

let data =[
    "daniel",
    "mathew"
]

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        data:data
    })

})

app.listen(port,()=>{
    console.log("Server is running")
})