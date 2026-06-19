export interface LessonModule {
  id: string;
  title: string;
  description: string;
  progress: number;
  icon: string;
}

export interface PracticeCard {
  title: string;
  description: string;
  status: string;
}

export interface ChallengeCard {
  title: string;
  progress: string;
  badge: string;
}

export interface UserProfile {
  name: string;
  level: string;
  xp: number;
  streak: number;
  pronunciationScore: number;
  wordsLearned: number;
  lessonsCompleted: number;
  weeklyGoal: number;
  monthlyGoal: number;
  totalSessions: number;
  phonemeScores: {
    ழ: number;
    ள: number;
    ற: number;
    ண: number;
  };
  lastStreakDate: string;
  consecutiveStreakDays: number;
  bestScoreEver: number;
  accuracyAbove90Days: number;
}

export interface TaskAssignment {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  xpReward: number;
  completed: boolean;
  due: string;
  category: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "reminder";
  timestamp: string;
  read: boolean;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  xpReward: number;
  earned: boolean;
  earnedDate?: string;
  progress: number;
  requirement: number;
}

export interface SpeechSession {
  phrase: string;
  score: number;
  timestamp: Date;
  phoneme?: string;
}
