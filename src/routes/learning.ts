import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const router = Router();
const jwtSecret = process.env.JWT_SECRET || "tamilai-secret";

interface AuthRequest extends Request {
  user?: unknown;
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Missing authorization header." });
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

router.get("/progress", verifyToken, (_req, res) => {
  res.json({
    level: "Beginner",
    lessonsCompleted: 12,
    streakDays: 8,
    pronunciationScore: 84,
    learnedWords: 74,
  });
});

router.get("/challenges", verifyToken, (_req, res) => {
  res.json([
    { id: "challenge-1", title: "Balloon Pop Quiz", status: "Ready" },
    { id: "challenge-2", title: "Fill in the Blank", status: "Locked" },
    { id: "challenge-3", title: "Roleplay Sprint", status: "Locked" },
  ]);
});

router.post("/progress", verifyToken, (req, res) => {
  const updates = req.body;
  res.json({ message: "Progress updated.", updates });
});

router.get("/certificate", verifyToken, (_req, res) => {
  res.json({
    certificateId: "CERT-2026-0001",
    title: "Tamil Basics",
    issuedOn: new Date().toISOString(),
  });
});

export default router;
