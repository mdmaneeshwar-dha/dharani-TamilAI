import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Task from "../models/Task";
import TaskAssignment from "../models/TaskAssignment";
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

const defaultTasks = [
  {
    title: "Learn 5 Tamil vowels",
    description: "Review Uyir Ezhuthukkal and sound each vowel aloud.",
    category: "Lesson",
    difficulty: "Beginner",
    xpReward: 50,
  },
  {
    title: "Practice 3 Tamil words",
    description: "Speak basic words from daily conversation.",
    category: "Practice",
    difficulty: "Beginner",
    xpReward: 40,
  },
  {
    title: "Complete balloon pop challenge",
    description: "Complete the level 3 Balloon Pop task to unlock XP.",
    category: "Challenge",
    difficulty: "Beginner",
    xpReward: 60,
  },
  {
    title: "Review pronunciation score",
    description: "Check weak areas and repeat the tough sounds.",
    category: "Assessment",
    difficulty: "Beginner",
    xpReward: 30,
  },
];

const createAssignment = async (userId: Types.ObjectId, task: any) => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 1);
  return TaskAssignment.create({ userId, taskId: task._id, dueDate });
};

router.get("/", verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Invalid token." });
    }

    const tasks = await Task.find();
    if (!tasks.length) {
      await Task.insertMany(defaultTasks);
    }

    const assignments = await TaskAssignment.find({
      userId: new Types.ObjectId(userId),
    }).populate("taskId");
    if (!assignments.length) {
      const seededTasks = await Task.find().limit(4);
      const created = await Promise.all(
        seededTasks.map((task) =>
          createAssignment(new Types.ObjectId(userId), task),
        ),
      );
      return res.json({ assignments: created, tasks: seededTasks });
    }

    res.json({ assignments, tasks });
  } catch (error) {
    res.status(500).json({ message: "Unable to load tasks.", error });
  }
});

router.post(
  "/:taskId/complete",
  verifyToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Invalid token." });
      }

      const { taskId } = req.params;
      const assignment = await TaskAssignment.findOne({
        userId: new Types.ObjectId(userId),
        taskId: new Types.ObjectId(taskId),
      }).populate("taskId");

      if (!assignment) {
        return res.status(404).json({ message: "Task assignment not found." });
      }

      assignment.completed = true;
      await assignment.save();

      res.json({ message: "Task completed.", assignment });
    } catch (error) {
      res.status(500).json({ message: "Unable to complete task.", error });
    }
  },
);

export default router;
