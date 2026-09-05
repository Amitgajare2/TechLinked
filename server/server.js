import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();


const app = express();
import cookieParser from "cookie-parser";


app.use(cors());
app.use(express.json());
app.use(cookieParser());

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

import authRoutes from "./Routes/authRoutes/auth.routes.js";
app.use("/api/auth", authRoutes);


import userRoutes from "./Routes/protectedRoute/user.routes.js";
app.use("/api/users", userRoutes);

import profileRoutes from "./Routes/User/profile.routes.js";
app.use("/api/profile", profileRoutes);

app.use("/Uploads", express.static("uploads"));

import postRoutes from "./Routes/postRoutes/post.routes.js"; 
import commentRoutes from "./Routes/postRoutes/comment.routes.js"; 

app.use("/api/posts", postRoutes); 
app.use("/api", commentRoutes);

import likeRoutes from "./Routes/postRoutes/like.routes.js";
app.use("/api", likeRoutes);
  
app.get("/", (req, res) => {
  res.json({
    message: "Techlink API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});