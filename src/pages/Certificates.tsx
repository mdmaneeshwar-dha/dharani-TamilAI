const certificates = [
  { title: "Tamil Basics", status: "Earned", date: "2026-06-12" },
  { title: "Pronunciation Coach", status: "In progress", date: "—" },
  { title: "Conversation Starter", status: "Locked", date: "—" },
];

export function Certificates() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-slate-900 p-8 text-white shadow-soft">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-300">
          Certificates
        </p>
        <h1 className="mt-4 text-4xl font-semibold">
          Validate your Tamil speaking milestones.
        </h1>
        <p className="mt-4 max-w-3xl text-slate-300/90">
          Earn certificates for pronunciation achievements, voice practice
          skills, and milestone progress in TamilSpeak AI.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        {certificates.map((cert) => (
          <div
            key={cert.title}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              {cert.status}
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">
              {cert.title}
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              {cert.status === "Locked"
                ? "Unlock this certificate by completing the pronunciation module."
                : `Completed: ${cert.date}`}
            </p>
            <button className="mt-6 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
              {cert.status === "Locked" ? "Unlock soon" : "Download"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
