const settingsOptions = [
  {
    title: "Notification preferences",
    description:
      "Set reminders for daily lessons, practice sessions, and pronunciation checks.",
  },
  {
    title: "Language support",
    description: "Tamil & English UI with voice coaching tips for beginners.",
  },
  {
    title: "Privacy",
    description: "Manage saved progress and voice practice data.",
  },
];

export function Settings() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-slate-900 p-8 text-white shadow-soft">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-300">
          Settings
        </p>
        <h1 className="mt-4 text-4xl font-semibold">
          Customize your Tamil learning experience.
        </h1>
        <p className="mt-4 max-w-3xl text-slate-300/90">
          Choose the pace, audio feedback, and reminders that suit your study
          habits. Privacy controls let you manage your saved progress.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {settingsOptions.map((option) => (
          <div
            key={option.title}
            className="rounded-[28px] bg-white p-6 shadow-soft"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              {option.title}
            </h2>
            <p className="mt-3 text-sm text-slate-500">{option.description}</p>
          </div>
        ))}
      </div>

      <section className="rounded-[32px] bg-slate-50 p-6 shadow-soft">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Security
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Secure your account and voice practice data.
            </h2>
          </div>
          <button className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Review privacy
          </button>
        </div>
      </section>
    </div>
  );
}
