const roadmap = [
  {
    title: "Beginner",
    subtitle: "Build Tamil fundamentals, letters, and daily vocabulary.",
    status: "Completed",
  },
  {
    title: "Tamil Vowels",
    subtitle: "Master Uyir Ezhuthukkal with pronunciation drills.",
    status: "In progress",
  },
  {
    title: "Tamil Consonants",
    subtitle: "Practice Mei letters and sound combinations.",
    status: "Next up",
  },
  {
    title: "Words",
    subtitle: "Learn the first 100 practical Tamil words.",
    status: "Locked",
  },
  {
    title: "Sentences",
    subtitle: "Combine words into meaningful sentences.",
    status: "Locked",
  },
  {
    title: "Conversations",
    subtitle: "Practice short roleplay dialogues.",
    status: "Locked",
  },
  {
    title: "Fluency",
    subtitle: "Build confidence for everyday Tamil conversations.",
    status: "Locked",
  },
];

export function Learn() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-slate-900 p-8 text-white shadow-soft">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-300">
            Learning journey
          </p>
          <h1 className="mt-4 text-4xl font-semibold">
            Follow a roadmap to Tamil fluency.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300/90">
            The roadmap helps you unlock lessons step-by-step, starting with
            letters, then words, phrases, and pronunciation practice for Tamil
            fluency.
          </p>
        </div>
      </section>

      <div className="space-y-6">
        {roadmap.map((item, index) => (
          <div
            key={item.title}
            className="flex gap-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-100 text-xl font-semibold text-indigo-700">
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">{item.subtitle}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "Completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : item.status === "In progress"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-[32px] bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Smart recommendations
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Next lesson: Tamil Consonants
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Continue with the next step on your roadmap to strengthen
              pronunciation and reading speed.
            </p>
          </div>
          <button className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Start next lesson
          </button>
        </div>
      </section>
    </div>
  );
}
