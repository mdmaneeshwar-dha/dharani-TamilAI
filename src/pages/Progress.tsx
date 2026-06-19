import { useLearning } from "../context/LearningContext";

export function Progress() {
  const { profile } = useLearning();

  const progressItems = [
    { label: "Lessons Completed", value: `${profile.lessonsCompleted} / 48` },
    { label: "Words Learned", value: `${profile.wordsLearned}` },
    { label: "Pronunciation Score", value: `${profile.pronunciationScore}%` },
    { label: "Daily Streak", value: `${profile.streak} days` },
  ];

  const heatmap = [
    { phoneme: "ழ", value: "72%", width: "w-3/4" },
    { phoneme: "ள", value: "65%", width: "w-2/3" },
    { phoneme: "ற", value: "58%", width: "w-3/5" },
    { phoneme: "ண", value: "69%", width: "w-2/3" },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-violet-600 p-8 text-white shadow-soft">
        <p className="text-sm uppercase tracking-[0.28em] opacity-80">
          Progress dashboard
        </p>
        <h1 className="mt-4 text-4xl font-semibold">
          Track your Tamil pronunciation progress.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-slate-100/90">
          Monitor lessons, practice scores, phoneme accuracy, and streaks in one
          place. The dashboard helps you stay on track toward Tamil speaking
          confidence.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {progressItems.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[32px] bg-white p-6 shadow-soft"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              {stat.label}
            </p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <section className="rounded-[32px] bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Pronunciation heatmap
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Identify sounds that need the most practice.
            </h2>
          </div>
          <button className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            View analysis
          </button>
        </div>
        <div className="mt-6 grid gap-4">
          {heatmap.map((item) => (
            <div key={item.phoneme} className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    {item.phoneme}
                  </p>
                  <p className="text-sm text-slate-500">Accuracy</p>
                </div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                  {item.value}
                </span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 ${item.width}`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
