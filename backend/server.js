import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(5000, () => {
    connectDB();
    console.log("Server started on http://localhost:5000");
})