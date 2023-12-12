import express from 'express'
import bodyParser from "body-parser"
import ejs from "ejs"
const port = 3000
const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
    let date = new Date()
    let day = date.getDay()
    let daymessage = ""
    if (day >= 1 && day <= 5){
        daymessage = `${day}°th weekday, lets work`
    }else{
        daymessage = `${day} the weekend, lets have fun`
    }

    res.render("index",
    { day: daymessage}
    )
})

app.listen(port,()=>{
    console.log("Server running")
})