import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoute from "./routes/Auth.route.js";
import UserRoute from "./routes/User.route.js";
import CategoryRoute from "./routes/Category.route.js";
import BlogRoute from "./routes/Blog.route.js";
import CommentRoute from "./routes/Comment.Route.js";
import BlogLikeRoute from "./routes/Bloglike.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL; // Ensure this is set in Vercel
const app = express();

app.use(cookieParser());
app.use(express.json());

// ✅ CORS FIX: Properly Configure CORS Middleware
app.use(
  cors({
    origin: FRONTEND_URL, // Only allow requests from your frontend
    credentials: true, // Allow cookies, authentication, etc.
  })
);

// ✅ CORS FIX: Explicitly Set Headers for All Requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

//Route setup
app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/blog", BlogRoute);
app.use("/api/comment", CommentRoute);
app.use("/api/blog-like", BlogLikeRoute);

// Routes
mongoose
  .connect(process.env.MONGODB_CONN, { dbName: "MERN-BLOG-DB" })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Database connection failed", err));

//

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ sucess: false, statusCode, message: message });
});
