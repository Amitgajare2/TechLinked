import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
import cookieParser from "cookie-parser";


app.use(cors());
app.use(express.json());
app.use(cookieParser());

import authRoutes from "./Routes/authRoutes/auth.routes.js";
app.use("/api/auth", authRoutes);


import userRoutes from "./Routes/protectedRoute/user.routes.js";
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "Techlink API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});