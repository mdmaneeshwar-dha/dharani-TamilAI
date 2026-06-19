import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();
const jwtSecret = process.env.JWT_SECRET || "tamilai-secret";
const tamilCharacters = [
  "அ",
  "ஆ",
  "இ",
  "ஈ",
  "உ",
  "ஊ",
  "எ",
  "ஏ",
  "ஐ",
  "ஒ",
  "ஓ",
  "ஔ",
  "க",
  "ச",
  "ட",
  "த",
  "ப",
  "ம",
  "ய",
  "ர",
  "ல",
  "வ",
  "ழ",
  "ள",
  "ற",
  "ன",
];

const verifyToken = (req, res, next) => {
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

const shuffle = <T>(array: T[]) => array.sort(() => Math.random() - 0.5);

const createBalloonQuestion = () => {
  const correctIndex = Math.floor(Math.random() * tamilCharacters.length);
  const correctValue = tamilCharacters[correctIndex];
  const options = new Set([correctValue]);
  while (options.size < 4) {
    const candidate =
      tamilCharacters[Math.floor(Math.random() * tamilCharacters.length)];
    options.add(candidate);
  }
  return {
    prompt: "Tap the balloon containing the correct Tamil character.",
    character: correctValue,
    options: shuffle(Array.from(options)),
  };
};

router.get("/", verifyToken, (_req, res) => {
  res.json({
    challenges: [
      {
        id: "balloon-pop",
        title: "Balloon Pop",
        status: "Live",
        reward: 40,
        description: "Pop the right Tamil sound and earn XP.",
      },
      {
        id: "fill-blank",
        title: "Fill-in-the-blank",
        status: "Unlocked",
        reward: 30,
        description: "Complete the sentence using the right letter.",
      },
      {
        id: "roleplay",
        title: "Conversation Roleplay",
        status: "Locked",
        reward: 70,
        description: "Practice speaking in a short dialogue.",
      },
    ],
  });
});

router.get("/balloon-pop", verifyToken, (_req, res) => {
  res.json({ question: createBalloonQuestion(), targetScore: 40, lives: 3 });
});

router.post("/balloon-pop/answer", verifyToken, (req, res) => {
  const { selectedAnswer, correctAnswer, currentScore, lives } = req.body;
  if (typeof selectedAnswer !== "string" || typeof correctAnswer !== "string") {
    return res.status(400).json({ message: "Invalid payload." });
  }

  const isCorrect = selectedAnswer === correctAnswer;
  const newScore = isCorrect ? (currentScore ?? 0) + 10 : (currentScore ?? 0);
  const newLives = isCorrect ? lives : Math.max((lives ?? 0) - 1, 0);
  const complete = newScore >= 40;

  res.json({
    isCorrect,
    newScore,
    newLives,
    complete,
    nextQuestion: createBalloonQuestion(),
    message: isCorrect
      ? "Great job! You popped the right balloon."
      : "Oops — try the next round before your lives run out.",
  });
});

export default router;
