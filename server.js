import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import loginConnectDB from "./MongoDB/loginConnect.js";
import authRoutes from "./routes/login.js";

dotenv.config();
const app = express();

// ===== Middleware =====
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use(
  cors({
    origin: "https://book-library-zoty.vercel.app",
    credentials: true,
  })
);

// ===== Start server AFTER DB connection =====
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await loginConnectDB();

    app.use("/api", authRoutes);

    // Optional browser-friendly GET routes
    app.get("/api/login", (req, res) => {
      res.send("Use POST /api/login with JSON body");
    });

    app.get("/api/signup", (req, res) => {
      res.send("Use POST /api/signup with JSON body");
    });

    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Server failed to start:", err.message);
  }
};

startServer();
