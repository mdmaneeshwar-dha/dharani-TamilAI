import { motion } from "framer-motion";

export function FloatingTutor() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-30 max-w-xs rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-600 text-xl font-bold text-white">
          த
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
            AI Tutor
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            Ask me anything about Tamil.
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Need a lesson summary, pronunciation tip, or next step? I can help.
          </p>
          <button className="mt-4 inline-flex rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Ask tutor
          </button>
        </div>
      </div>
    </motion.div>
  );
}
