import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Notification from "../models/Notification";
import {
  sendEmailNotification,
  sendSmsNotification,
  sendPushNotification,
} from "../services/notificationService";
import { Types } from "mongoose";

const router = Router();
const jwtSecret = process.env.JWT_SECRET || "tamilai-secret";

interface AuthRequest extends Request {
  user?: { userId: string };
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Missing authorization header." });
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, jwtSecret) as { userId: string };
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

router.get("/", verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Invalid token." });
    }

    const notifications = await Notification.find({
      userId: new Types.ObjectId(userId),
    }).sort({ createdAt: -1 });
    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ message: "Unable to load notifications.", error });
  }
});

router.post("/send-email", async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    const result = await sendEmailNotification(to, subject, body);
    const io = req.app.get("io");
    if (io) {
      io.emit("notification", { title: subject, message: body, type: "info" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Email send failed.", error });
  }
});

router.post("/send-sms", async (req, res) => {
  try {
    const { to, body } = req.body;
    const result = await sendSmsNotification(to, body);
    const io = req.app.get("io");
    if (io) {
      io.emit("notification", {
        title: "SMS reminder",
        message: body,
        type: "reminder",
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "SMS send failed.", error });
  }
});

router.post("/send-push", async (req, res) => {
  try {
    const { deviceToken, title, body } = req.body;
    const result = await sendPushNotification(deviceToken, title, body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Push notification failed.", error });
  }
});

export default router;
