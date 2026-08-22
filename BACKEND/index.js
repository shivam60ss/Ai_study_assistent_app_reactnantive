import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './Routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── MIDDLEWARES ────────────────────────────────────────
app.use(cors());
app.use(express.json());                        // ✅ replaces bodyParser
app.use(express.urlencoded({ extended: true }));

// ── TEST ROUTE ─────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Server is running ✅" });
});

// ── ROUTES ─────────────────────────────────────────────
app.use('/api/auth', authRoutes);

// ── ERROR HANDLER ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.message || "Server Error" });
});

// ── START SERVER AFTER DB CONNECTS ─────────────────────
connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} ✅`);
    console.log(`URL: http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to DB:", error);
  process.exit(1);
});