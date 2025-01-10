import express from "express";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import blogRoutes from "../routes/blogRoute.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
console.log(process.env.SUPABASE_KEY);
app.use(express.json());

app.use("/api/blogs", blogRoutes);


app.listen(5000, () => {
    connectDB();
    console.log("Server started on http://localhost:5000");
})