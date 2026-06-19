const profileDetails = [
  { label: "Current level", value: "Beginner" },
  { label: "Preferred pace", value: "Daily 20 min" },
  { label: "Learning goal", value: "Speak Tamil fluently" },
  { label: "Learning style", value: "Audio + practice" },
];

export function Profile() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
              Your profile
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">
              Keep your Tamil learning profile handy.
            </h1>
          </div>
          <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Edit profile
          </button>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {profileDetails.map((item) => (
          <div
            key={item.label}
            className="rounded-[28px] bg-slate-50 p-6 shadow-soft"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              {item.label}
            </p>
            <p className="mt-3 text-xl font-semibold text-slate-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <section className="rounded-[32px] bg-indigo-600 p-8 text-white shadow-soft">
        <h2 className="text-2xl font-semibold">Study reminders</h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-200/90">
          Receive habit prompts, practice reminders, and pronunciation tips to
          stay consistent while learning Tamil.
        </p>
      </section>
    </div>
  );
}
