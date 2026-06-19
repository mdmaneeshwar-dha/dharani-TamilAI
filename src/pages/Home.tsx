import { motion } from "framer-motion";
import { useLearning } from "../context/LearningContext";
import { NotificationsPanel } from "../components/NotificationsPanel";
import { FloatingTutor } from "../components/FloatingTutor";

export function Home() {
  const { profile, tasks, notifications, completeTask, markNotificationRead } =
    useLearning();
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-gradient-to-r from-slate-900 to-indigo-700 p-8 text-white shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-300">
              TamilSpeak AI
            </p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
              Personalized Tamil pronunciation coaching for every learner.
            </h1>
            <p className="mt-4 max-w-2xl text-slate-200/90">
              TamilSpeak AI helps learners master Tamil sounds such as ழ, ள, ற,
              and ண through intelligent speech analysis, meaningful feedback,
              and adaptive practice.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-5 shadow-soft backdrop-blur">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-200">
                Live coach
              </p>
              <p className="mt-4 text-3xl font-semibold">AI powered</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 shadow-soft backdrop-blur">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-200">
                Pronunciation focus
              </p>
              <p className="mt-4 text-3xl font-semibold">Tamil phonemes</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[28px] bg-white p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
            Problem Statement
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            Pronunciation remains the toughest part of Tamil learning.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Many Tamil learners can read or write words, but they still struggle
            to produce accurate sounds. Existing apps often stop at
            speech-to-text and fail to provide the detailed pronunciation
            guidance learners need.
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "Lack of Tamil-specific pronunciation analysis.",
              "Inability to detect individual sound-level mistakes.",
              "Limited personalized feedback for each learner.",
              "No intelligent tracking of pronunciation progress.",
              "Absence of adaptive practice based on learner performance.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] bg-indigo-600 p-6 text-white shadow-soft">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-200">
              Proposed solution
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              AI-powered Tamil pronunciation coaching.
            </h2>
            <p className="mt-3 text-sm text-slate-200/90">
              TamilSpeak AI listens, evaluates, and guides learners through
              targeted pronunciation correction for Tamil-specific sounds.
            </p>
          </div>
          <div className="rounded-[28px] bg-slate-100 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Learning outcomes
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>
                Improve Tamil pronunciation accuracy with real-time coaching.
              </p>
              <p>Receive personalized feedback based on your voice patterns.</p>
              <p>Monitor progress through phoneme heat maps and badges.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] bg-slate-50 p-8 shadow-soft">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
            System Workflow
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            How TamilSpeak AI works
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Voice Input",
              description:
                "Record a Tamil word, phrase, or sentence using the microphone.",
            },
            {
              title: "Speech Processing",
              description:
                "Analyze audio features like pitch, intonation, and phoneme patterns.",
            },
            {
              title: "Pronunciation Evaluation",
              description:
                "Compare spoken output with Tamil pronunciation models.",
            },
            {
              title: "Score & Feedback",
              description:
                "Generate a pronunciation score and show targeted improvement tips.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-indigo-600">
                {step.title}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[28px] bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
            Current level
          </p>
          <h3 className="mt-3 text-3xl font-semibold text-slate-900">
            {profile.level}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Designed to help you move from beginner to confident Tamil speaker.
          </p>
        </div>
        <div className="rounded-[28px] bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
            Pronunciation score
          </p>
          <h3 className="mt-3 text-3xl font-semibold text-slate-900">
            {profile.pronunciationScore}%
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            See how close your pronunciation is to the Tamil standard.
          </p>
        </div>
        <div className="rounded-[28px] bg-white p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
            Daily focus
          </p>
          <h3 className="mt-3 text-3xl font-semibold text-slate-900">
            {pendingTasks.length} practice items
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Adaptive tasks tailored to your pronunciation needs.
          </p>
        </div>
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Recent achievements
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Unlock badges as you improve.
            </h2>
          </div>
          <button className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            View badges
          </button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Words learned</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {profile.wordsLearned}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Lessons completed</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {profile.lessonsCompleted}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Pronunciation strength</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              ழ, ள, ற, ண
            </p>
          </div>
        </div>
      </section>

      <FloatingTutor />
    </div>
  );
}
