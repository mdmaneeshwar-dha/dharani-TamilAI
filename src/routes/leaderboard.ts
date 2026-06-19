import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    leaderboard: [
      { rank: 1, name: "Arun", xp: 2650, streak: 14 },
      { rank: 2, name: "Priya", xp: 2480, streak: 12 },
      { rank: 3, name: "Sakthi", xp: 2330, streak: 10 },
      { rank: 4, name: "You", xp: 2100, streak: 8 },
    ],
  });
});

export default router;
