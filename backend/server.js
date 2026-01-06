import express from "express";
import cors from "cors";
import { processRequest } from "./processRequest.js";

const app = express();

/**
 * Allow ONLY Next.js frontend
 */
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await processRequest(prompt);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});
