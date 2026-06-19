import { useMemo, useState } from "react";

const availableCharacters = [
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

function getRandomQuestion() {
  const correct =
    availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
  const options = new Set([correct]);
  while (options.size < 4) {
    options.add(
      availableCharacters[
        Math.floor(Math.random() * availableCharacters.length)
      ],
    );
  }
  return {
    prompt: "Identify the correct Tamil character shown below",
    correctAnswer: correct,
    options: Array.from(options).sort(() => Math.random() - 0.5),
  };
}

export function DailyChallenges() {
  const [question, setQuestion] = useState(() => getRandomQuestion());
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [message, setMessage] = useState("Select the right balloon to begin.");
  const [completed, setCompleted] = useState(false);

  const canContinue = score < 40 && lives > 0;

  const handleAnswer = (selectedAnswer: string) => {
    if (completed || !canContinue) return;

    if (selectedAnswer === question.correctAnswer) {
      const nextScore = score + 10;
      setScore(nextScore);
      setMessage("Great job! You popped the correct balloon.");
      if (nextScore >= 40) {
        setCompleted(true);
        setMessage(
          "Challenge complete! You unlocked the next level and earned 40 XP.",
        );
      } else {
        setQuestion(getRandomQuestion());
      }
    } else {
      const nextLives = Math.max(lives - 1, 0);
      setLives(nextLives);
      setMessage("Oops — wrong balloon. Try again before your lives run out.");
    }
  };

  const progressWidthClass = useMemo(() => {
    const percent = Math.min((score / 40) * 100, 100);
    if (percent >= 100) return "w-full";
    if (percent >= 75) return "w-3/4";
    if (percent >= 50) return "w-1/2";
    if (percent >= 25) return "w-1/4";
    return "w-0";
  }, [score]);

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
              Daily challenges
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">
              Level 3 Balloon Pop
            </h1>
          </div>
          <button className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            View leaderboard
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[32px] bg-slate-50 p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                Balloon Pop
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                Pop the correct character
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-4 text-center shadow-sm">
                <p className="text-sm text-slate-500">Score</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {score} XP
                </p>
              </div>
              <div className="rounded-3xl bg-white p-4 text-center shadow-sm">
                <p className="text-sm text-slate-500">Lives</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {lives}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[28px] bg-white p-6 text-center shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              {question.prompt}
            </p>
            <div className="mt-6 rounded-[24px] bg-indigo-600 p-8 text-5xl font-semibold text-white shadow-soft">
              {question.correctAnswer}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {question.options.map((option) => (
                <button
                  key={option}
                  disabled={!canContinue}
                  onClick={() => handleAnswer(option)}
                  className={`rounded-3xl border px-5 py-4 text-lg font-semibold transition ${
                    canContinue
                      ? "border-slate-200 bg-white text-slate-900 hover:border-indigo-300 hover:bg-indigo-50"
                      : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 ${progressWidthClass}`}
              />
            </div>
            <p className="mt-4 text-sm text-slate-500">{message}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] bg-white p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Challenge guide
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              How this game works
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• A Tamil character appears in the center balloon.</li>
              <li>• Choose the matching letter among four options.</li>
              <li>• Correct answers award +10 XP.</li>
              <li>• Wrong answers cost one life.</li>
              <li>• Reach 40 XP to complete the challenge.</li>
            </ul>
          </div>
          <div className="rounded-[28px] bg-slate-900 p-6 text-white shadow-soft">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-300">
              Rewards
            </p>
            <div className="mt-4 space-y-4 rounded-3xl bg-white/10 p-4">
              <div>
                <p className="text-sm text-slate-300">XP bonus</p>
                <p className="mt-1 text-2xl font-semibold">40 XP</p>
              </div>
              <div>
                <p className="text-sm text-slate-300">Unlock</p>
                <p className="mt-1 text-2xl font-semibold">Next challenge</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
