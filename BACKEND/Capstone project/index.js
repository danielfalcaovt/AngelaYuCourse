import express from "express";
import axios from 'axios';
import bodyParser from "body-parser";

const app = express()
const port = 3000

app.use(express.static("public"))
app.use()