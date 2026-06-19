import { motion } from "framer-motion";

const practicePrompts = [
  {
    phrase: "வணக்கம்",
    description: "Practice a warm Tamil greeting with proper cadence.",
  },
  {
    phrase: "எப்படி இருக்கிறீர்கள்?",
    description: "Practice a complete question with natural Tamil rhythm.",
  },
  {
    phrase: "நன்றி",
    description: "Practice a polite thank you with clear diction.",
  },
];

const features = [
  {
    title: "AI pronunciation feedback",
    caption: "Receive suggestions on Tamil sounds and rhythm.",
  },
  {
    title: "Pronunciation coach",
    caption: "See targeted tips for retroflex Tamil letters.",
  },
  {
    title: "Weak area trainer",
    caption: "The tutor highlights which sounds need more repetition.",
  },
];

export function Practice() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-gradient-to-r from-slate-900 to-indigo-700 p-8 text-white shadow-soft">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-300">
            Practice Lab
          </p>
          <h1 className="mt-4 text-4xl font-semibold">
            Train Tamil pronunciation with AI coaching.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-200/90">
            Speak each phrase aloud and receive detailed Tamil pronunciation
            feedback that helps you improve fast.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            whileHover={{ y: -4 }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              {feature.title}
            </h2>
            <p className="mt-3 text-sm text-slate-500">{feature.caption}</p>
          </motion.div>
        ))}
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        {practicePrompts.map((prompt) => (
          <div
            key={prompt.phrase}
            className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-soft"
          >
            <h2 className="text-2xl font-semibold text-slate-900">
              {prompt.phrase}
            </h2>
            <p className="mt-3 text-sm text-slate-500">{prompt.description}</p>
            <button className="mt-6 inline-flex rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
              Practice now
            </button>
          </div>
        ))}
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Speaking assessment
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Evaluate pronunciation with Tamil-specific scoring.
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Record a Tamil phrase and get voice-based recommendations for the
              sounds you should practice next.
            </p>
          </div>
          <button className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Start assessment
          </button>
        </div>
      </section>
    </div>
  );
}
