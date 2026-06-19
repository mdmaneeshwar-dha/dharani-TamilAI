import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth";
import learningRoutes from "./routes/learning";
import taskRoutes from "./routes/tasks";
import notificationRoutes from "./routes/notifications";
import challengeRoutes from "./routes/challenges";
import leaderboardRoutes from "./routes/leaderboard";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/tamilai";

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "TamilAI backend" });
});

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);
  socket.on("joinRoom", (room) => {
    socket.join(room);
  });
  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
    httpServer.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
