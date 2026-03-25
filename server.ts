import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3001;

  app.use(express.json());

  // API Routes (Proxied to Laravel or handled directly)
  app.post("/api/leads", (req, res) => {
    console.log("Received lead data:", req.body);
    // In a real setup, this would proxy to the Laravel backend at http://localhost:8000/api/leads
    res.json({ success: true, message: "Lead received successfully!" });
  });

  app.get("/api/venues", (req, res) => {
    res.json([
      { id: 1, name: "Palace & Heritage", description: "Aspiration and inspiration for your dream day." },
      { id: 2, name: "Five Star Hotels", description: "Luxury and comfort in the heart of the city." },
      { id: 3, name: "Beach Resorts", description: "Serene views and ocean breezes." },
    ]);
  });

  app.get("/api/weddings", (req, res) => {
    res.json([
      { id: 1, couple: "Sarah & Mark", location: "Bali", type: "Beach Wedding" },
      { id: 2, couple: "Priya & Rahul", location: "Bengaluru", type: "Royal Palace" },
    ]);
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "ShaadiMe API is healthy" });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ShaadiMe Backend Server running on http://localhost:${PORT}`);
  });
}

startServer();
