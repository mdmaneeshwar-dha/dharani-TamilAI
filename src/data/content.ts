import type { ChallengeCard, LessonModule, PracticeCard } from "../types";

export const lessons: LessonModule[] = [
  {
    id: "vowels",
    title: "Tamil Vowels",
    description: "Understand Uyir Ezhuthukkal with audio and flashcards.",
    progress: 45,
    icon: "அ",
  },
  {
    id: "consonants",
    title: "Tamil Consonants",
    description: "Practice Mei Ezhuthukkal with pronunciation drills.",
    progress: 20,
    icon: "க்",
  },
  {
    id: "uyirmei",
    title: "Uyirmei Letters",
    description: "Build combined letters using interactive exercises.",
    progress: 8,
    icon: "கா",
  },
  {
    id: "words",
    title: "Basic Words",
    description: "Learn useful words like வணக்கம் and நன்றி.",
    progress: 0,
    icon: "வ",
  },
];

export const practiceItems: PracticeCard[] = [
  {
    title: "Pronunciation Coach",
    description: "Speak and improve Tamil sounds in real time.",
    status: "Ready",
  },
  {
    title: "Phoneme Heatmap",
    description: "See which Tamil sounds need more practice.",
    status: "Live",
  },
  {
    title: "Accent Guide",
    description: "Compare your voice with native Tamil pronunciation.",
    status: "New",
  },
];

export const challenges: ChallengeCard[] = [
  { title: "Fill-in-the-blank", progress: "2/5 completed", badge: "Quick Win" },
  {
    title: "Balloon Pop Quiz",
    progress: "1/3 completed",
    badge: "Phoneme Fun",
  },
  {
    title: "Conversation Roleplay",
    progress: "0/1 completed",
    badge: "Speech Hero",
  },
];
