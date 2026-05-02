import express from "express";
let app = express();
import dotenv from "dotenv";
import connectDb from "./config/db.js";

dotenv.config();

let port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`sever is running on ${port} port`);
  connectDb();
});
