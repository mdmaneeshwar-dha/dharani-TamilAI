import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Achievement,
  NotificationItem,
  SpeechSession,
  TaskAssignment,
  UserProfile,
} from "../types";

const initialProfile: UserProfile = {
  name: "Anu",
  level: "Beginner",
  xp: 1540,
  streak: 8,
  pronunciationScore: 84,
  wordsLearned: 47,
  lessonsCompleted: 18,
  weeklyGoal: 5,
  monthlyGoal: 20,
  totalSessions: 52,
  phonemeScores: {
    ழ: 72,
    ள: 65,
    ற: 58,
    ண: 69,
  },
  lastStreakDate: new Date().toISOString(),
  consecutiveStreakDays: 8,
  bestScoreEver: 98,
  accuracyAbove90Days: 3,
};

const initialTasks: TaskAssignment[] = [
  {
    id: "task-1",
    title: "Practice Tamil phonemes",
    description:
      "Use the live coach to refine challenging sounds like ழ, ள, ற, and ண.",
    difficulty: "Beginner",
    xpReward: 50,
    completed: false,
    due: "Today",
    category: "Lesson",
  },
  {
    id: "task-2",
    title: "Record a pronunciation sample",
    description: "Try a short Tamil phrase and see instant feedback.",
    difficulty: "Beginner",
    xpReward: 40,
    completed: false,
    due: "Today",
    category: "Practice",
  },
  {
    id: "task-3",
    title: "Complete Balloon Pop",
    description: "Finish level 3 and earn bonus XP.",
    difficulty: "Beginner",
    xpReward: 60,
    completed: false,
    due: "Today",
    category: "Challenge",
  },
];

const initialNotifications: NotificationItem[] = [
  {
    id: "note-1",
    title: "Daily tasks are ready",
    message: "Your TamilSpeak AI daily learning plan has been generated.",
    type: "reminder",
    timestamp: "8:00 AM",
    read: false,
  },
  {
    id: "note-2",
    title: "Live pronunciation coach ready",
    message: "Open Practice and record a phrase to get instant Tamil feedback.",
    type: "info",
    timestamp: "2:00 PM",
    read: false,
  },
];

const createInitialAchievements = (): Achievement[] => [
  {
    id: "zzh-master",
    icon: "🏆",
    title: "ழ Master",
    description: "Achieve 80% on ழ phoneme",
    xpReward: 500,
    earned: true,
    earnedDate: new Date().toISOString(),
    progress: 80,
    requirement: 80,
  },
  {
    id: "tamil-speaker",
    icon: "🎤",
    title: "Tamil Speaker",
    description: "Complete 50 voice sessions",
    xpReward: 300,
    earned: true,
    earnedDate: new Date().toISOString(),
    progress: 52,
    requirement: 50,
  },
  {
    id: "streak-hero",
    icon: "🔥",
    title: "Streak Hero",
    description: "14-day practice streak",
    xpReward: 200,
    earned: true,
    earnedDate: new Date().toISOString(),
    progress: 8,
    requirement: 14,
  },
  {
    id: "fluent-voice",
    icon: "⭐",
    title: "Fluent Voice",
    description: "Score 90+ three times",
    xpReward: 400,
    earned: false,
    progress: 2,
    requirement: 3,
  },
  {
    id: "word-wizard",
    icon: "📚",
    title: "Word Wizard",
    description: "Master 100 words",
    xpReward: 600,
    earned: false,
    progress: 47,
    requirement: 100,
  },
  {
    id: "perfect-score",
    icon: "🎯",
    title: "Perfect Score",
    description: "Score 100/100 on any word",
    xpReward: 250,
    earned: true,
    earnedDate: new Date().toISOString(),
    progress: 1,
    requirement: 1,
  },
  {
    id: "daily-champion",
    icon: "🌟",
    title: "Daily Champion",
    description: "Complete 7 daily challenges",
    xpReward: 150,
    earned: true,
    earnedDate: new Date().toISOString(),
    progress: 7,
    requirement: 7,
  },
  {
    id: "tamil-scholar",
    icon: "🧠",
    title: "Tamil Scholar",
    description: "Finish all phoneme modules",
    xpReward: 700,
    earned: false,
    progress: 2,
    requirement: 5,
  },
  {
    id: "speed-learner",
    icon: "🚀",
    title: "Speed Learner",
    description: "Level up 3× in one week",
    xpReward: 350,
    earned: true,
    earnedDate: new Date().toISOString(),
    progress: 3,
    requirement: 3,
  },
  {
    id: "global-tamil",
    icon: "🌍",
    title: "Global Tamil",
    description: "Practice 3 different accents",
    xpReward: 200,
    earned: false,
    progress: 1,
    requirement: 3,
  },
  {
    id: "diamond-tongue",
    icon: "💎",
    title: "Diamond Tongue",
    description: "Maintain 90% for 30 days",
    xpReward: 1000,
    earned: false,
    progress: 0,
    requirement: 30,
  },
  {
    id: "graduation",
    icon: "🎓",
    title: "Graduation",
    description: "Complete all levels",
    xpReward: 2000,
    earned: false,
    progress: 1,
    requirement: 5,
  },
];

interface LearningContextValue {
  profile: UserProfile;
  tasks: TaskAssignment[];
  notifications: NotificationItem[];
  achievements: Achievement[];
  completeTask: (taskId: string) => void;
  markNotificationRead: (notificationId: string) => void;
  recordSpeechSession: (session: SpeechSession) => void;
  getAchievementProgress: () => Achievement[];
}

const LearningContext = createContext<LearningContextValue | undefined>(
  undefined,
);

export function LearningProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [tasks, setTasks] = useState<TaskAssignment[]>(initialTasks);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);
  const [achievements, setAchievements] = useState<Achievement[]>(
    createInitialAchievements(),
  );
  const [speechSessions, setSpeechSessions] = useState<SpeechSession[]>([]);

  const recordSpeechSession = (session: SpeechSession) => {
    setSpeechSessions((current) => [...current, session]);

    setProfile((current) => {
      let updatedProfile = {
        ...current,
        totalSessions: current.totalSessions + 1,
      };

      // Update phoneme scores
      if (session.phoneme) {
        const phonemeKey =
          session.phoneme as keyof typeof current.phonemeScores;
        updatedProfile.phonemeScores = {
          ...current.phonemeScores,
          [phonemeKey]: Math.max(
            current.phonemeScores[phonemeKey],
            session.score,
          ),
        };
      }

      // Update best score ever
      if (session.score > current.bestScoreEver) {
        updatedProfile.bestScoreEver = session.score;
      }

      // Track accuracy above 90
      if (session.score >= 90) {
        updatedProfile.accuracyAbove90Days = current.accuracyAbove90Days + 1;
      }

      return updatedProfile;
    });

    // Update achievements based on session performance
    setAchievements((current) =>
      current.map((achievement) => {
        if (achievement.earned) return achievement;

        // Tamil Speaker: 50 voice sessions
        if (
          achievement.id === "tamil-speaker" &&
          speechSessions.length + 1 >= 50
        ) {
          return {
            ...achievement,
            earned: true,
            earnedDate: new Date().toISOString(),
            progress: 50,
          };
        }

        // Fluent Voice: Score 90+ three times
        if (achievement.id === "fluent-voice" && session.score >= 90) {
          const newProgress = achievement.progress + 1;
          return {
            ...achievement,
            earned: newProgress >= 3,
            earnedDate: newProgress >= 3 ? new Date().toISOString() : undefined,
            progress: newProgress,
          };
        }

        // Perfect Score: Score 100 on any word
        if (achievement.id === "perfect-score" && session.score === 100) {
          return {
            ...achievement,
            earned: true,
            earnedDate: new Date().toISOString(),
            progress: 1,
          };
        }

        // Phoneme-specific achievements (ழ Master, etc)
        if (
          achievement.id === "zzh-master" &&
          session.phoneme === "ழ" &&
          session.score >= 80
        ) {
          return {
            ...achievement,
            earned: true,
            earnedDate: new Date().toISOString(),
            progress: 80,
          };
        }

        return achievement;
      }),
    );
  };

  const completeTask = (taskId: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task,
      ),
    );
    setProfile((current) => ({ ...current, xp: current.xp + 20 }));
    setNotifications((current) => [
      {
        id: `note-${current.length + 1}`,
        title: "Task completed",
        message: "Nice work! XP has been added to your account.",
        type: "success",
        timestamp: "Now",
        read: false,
      },
      ...current,
    ]);
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  const getAchievementProgress = () => achievements;

  useEffect(() => {
    const reminderTimer = setTimeout(() => {
      setNotifications((current) => [
        {
          id: `note-${current.length + 1}`,
          title: "Afternoon reminder",
          message:
            "Keep going—complete one more practice activity to keep your streak.",
          type: "reminder",
          timestamp: "2:00 PM",
          read: false,
        },
        ...current,
      ]);
    }, 12000);

    const alertTimer = setTimeout(() => {
      setNotifications((current) => [
        {
          id: `note-${current.length + 1}`,
          title: "Evening follow-up",
          message:
            "Your Tamil learning tasks await. Finish them now for extra XP.",
          type: "reminder",
          timestamp: "7:00 PM",
          read: false,
        },
        ...current,
      ]);
    }, 22000);

    return () => {
      clearTimeout(reminderTimer);
      clearTimeout(alertTimer);
    };
  }, []);

  const value = useMemo(
    () => ({
      profile,
      tasks,
      notifications,
      achievements,
      completeTask,
      markNotificationRead,
      recordSpeechSession,
      getAchievementProgress,
    }),
    [profile, tasks, notifications, achievements],
  );

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error("useLearning must be used within LearningProvider");
  }
  return context;
}
