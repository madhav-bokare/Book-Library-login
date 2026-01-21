import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import loginConnectDB from "./MongoDB/loginConnnect.js";
import authRoutes from "./routes/login.js";

dotenv.config();
const app = express();

/* ================= CORS ================= */
app.use(
  cors({
    origin: "https://book-library-zoty.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ================= BODY PARSER ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= DB ================= */
loginConnectDB();

/* ================= ROUTES ================= */
app.use("/api", authRoutes);

/* ================= TEST ================= */
app.get("/", (req, res) => {
  res.send("Login backend running");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
