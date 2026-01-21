import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import loginConnectDB from "./MongoDB/loginConnnect.js";
import authRoutes from "./routes/login.js";

dotenv.config();
const app = express();

// CORS for frontend port
app.use(
  cors({
    origin: "https://book-library-zoty.vercel.app/login",
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB
loginConnectDB();

// Routes
app.use("/api", authRoutes);

// Optional browser-friendly GET routes
app.get("/api/login", (req, res) => {
  res.send("Use POST /api/login with JSON body");
});

app.get("/api/signup", (req, res) => {
  res.send("Use POST /api/signup with JSON body");
});

// Server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
