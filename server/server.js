import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

import authRoutes from "./Routes/authRoutes/auth.routes.js";
import userRoutes from "./Routes/protectedRoute/user.routes.js";
import profileRoutes from "./Routes/User/profile.routes.js";

import postRoutes from "./Routes/postRoutes/post.routes.js";
import commentRoutes from "./Routes/postRoutes/comment.routes.js";
import likeRoutes from "./Routes/postRoutes/like.routes.js";

import { startServer } from "./startServer/startServer.js";

dotenv.config();

const app = express();

// ===============================
// Middleware
// ===============================

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true, // allow cookies (refresh token)
  })
);
app.use(express.json());
app.use(cookieParser());

// ===============================
// Swagger
// ===============================

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// ===============================
// Routes
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/profile", profileRoutes);

app.use("/Uploads", express.static("uploads"));

app.use("/api/posts", postRoutes);

app.use("/api", commentRoutes);

app.use("/api", likeRoutes);

// Health Check


app.get("/", (req, res) => {
  res.json({
    message: "Techlink API is running",
  });
});


// Server
startServer(app);