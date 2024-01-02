import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "brbr109br",
  port: 5432,
});
db.connect();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

async function getItems(){
  let items = await db.query("SELECT * FROM items")
  return items
}

app.get("/", async (req, res) => {
  
  const data = await getItems()
  const items = data.rows
  
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

async function addNew(item){
  await db.query("INSERT INTO items (title) VALUES ($1)",[item])
}

app.post("/add", async(req, res) => {
  const item = req.body.newItem;
  addNew(item)
  res.redirect("/");
});

async function edit(name,id){
  await db.query("UPDATE items SET title = $2 WHERE id = $1",[id,name]
  )

}
app.post("/edit", async(req, res) => {
  try{
  const nameEdit = req.body.updatedItemTitle
  const idEdit = req.body.updatedItemId
  console.log(nameEdit);
  console.log(idEdit);
  await edit(nameEdit,idEdit)
  res.redirect("/")
}catch(err){
  console.log(err);
}
});

async function deleteId(id){
  await db.query("DELETE FROM items WHERE id = $1",[id])  
}

app.post("/delete", async (req, res) => {
  let id = Number(req.body.deleteItemId)
  await deleteId(id)
  res.redirect("/")
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
