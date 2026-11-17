import express from "express";
import v1Routes from "./api/v1/routes/index.js";

const app = express();

app.use(express.json());

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

app.use("/api/v1", v1Routes);

export default app;
