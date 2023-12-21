import pg from "pg";

const db = new pg.Client({
    user:"postgres",
    hostname:"localhost",
    database:"worldwide",
    password:"brbr109br",
    port:"5432"
});

db.connect()

db.query("SELECT * FROM capitals", (err,res)=>{
    if(err){
        console.error("Error executing query", err.stack);
    }else{
        quiz = res.rows;
    }
    db.end();
})


