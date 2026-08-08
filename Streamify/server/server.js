import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

app.listen(8080, ()=>{
    console.log("Streamify server is running...");
    
});

