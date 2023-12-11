import express from "express"
const app = express()
const port = 3005

app.get("/", (req,res)=>{
    res.send("<h1>Hello people here is me</h1>")
})
app.get("/about", (req,res)=>{
    res.send("I ma gay")
})
app.get("/contact", (req,res)=>{
    res.send("Can find me in a gay party")
})
app.listen(port,()=>{
    console.log(`Server is running in port ${port}`)
})