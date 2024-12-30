import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoute.js";

dotenv.config();

const app = express();

console.log(process.env.MONGO_URI);
app.use(express.json());

app.use("/api/blog", blogRoutes);


app.listen(5000, () => {
    connectDB();
    console.log("Server started on http://localhost:5000");
})