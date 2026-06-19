import { motion } from "framer-motion";
import { useLearning } from "../context/LearningContext";

function getWidthClass(progress: number, requirement: number): string {
  const percentage = Math.min((progress / requirement) * 100, 100);
  if (percentage === 0) return "w-0";
  if (percentage <= 12.5) return "w-1/8";
  if (percentage <= 25) return "w-1/4";
  if (percentage <= 37.5) return "w-3/8";
  if (percentage <= 50) return "w-1/2";
  if (percentage <= 62.5) return "w-5/8";
  if (percentage <= 75) return "w-3/4";
  if (percentage <= 87.5) return "w-7/8";
  return "w-full";
}

export function BadgesXP() {
  const { profile, achievements } = useLearning();
  const earnedAchievements = achievements.filter((a) => a.earned);
  const lockedAchievements = achievements.filter((a) => !a.earned);

  const totalXPReward = earnedAchievements.reduce(
    (sum, a) => sum + a.xpReward,
    0,
  );

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] bg-gradient-to-r from-yellow-500 to-amber-600 p-8 text-white shadow-soft">
        <p className="text-sm uppercase tracking-[0.28em] opacity-90">
          Your Achievements
        </p>
        <h1 className="mt-4 text-4xl font-semibold">Badges & XP</h1>
        <p className="mt-4 max-w-2xl text-sm text-white/90">
          Earn rewards and badges as you improve Tamil pronunciation with
          AI-powered practice and phoneme coaching.
        </p>
      </section>

      <section className="rounded-[32px] bg-slate-900 p-8 text-white shadow-soft">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] opacity-80">
              Current Rank
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Level {profile.level} – Tamil Speaker
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              550 XP to Level 9 – Fluent Voice
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-300">
                Total XP Earned
              </p>
              <p className="mt-3 text-3xl font-semibold">
                {totalXPReward.toLocaleString()}
              </p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-300">
                Badges Earned
              </p>
              <p className="mt-3 text-3xl font-semibold">
                {earnedAchievements.length}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-700">
          <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 w-1/2" />
        </div>
        <p className="mt-3 text-sm text-slate-300">{profile.xp} / 3,000 XP</p>
      </section>

      <div>
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">
          Earned Badges ({earnedAchievements.length})
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {earnedAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ y: -8 }}
              className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-yellow-50 to-amber-50 p-6 shadow-soft"
            >
              <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-to-br from-yellow-200 to-amber-200 opacity-50" />
              <div className="relative">
                <div className="mb-4 text-5xl">{achievement.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {achievement.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {achievement.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    ✓ Earned
                  </span>
                  <span className="text-sm font-semibold text-amber-600">
                    +{achievement.xpReward} XP
                  </span>
                </div>
                {achievement.earnedDate && (
                  <p className="mt-3 text-xs text-slate-500">
                    Earned on{" "}
                    {new Date(achievement.earnedDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">
          Locked Badges ({lockedAchievements.length})
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lockedAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-soft opacity-75"
            >
              <div className="absolute right-0 top-0 h-24 w-24 bg-slate-100 opacity-30" />
              <div className="relative">
                <div className="mb-4 text-5xl opacity-50">
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {achievement.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {achievement.description}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Progress</span>
                    <span>
                      {achievement.progress}/{achievement.requirement}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r from-slate-400 to-slate-500 ${getWidthClass(
                        achievement.progress,
                        achievement.requirement,
                      )}`}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                    🔒 Locked
                  </span>
                  <span className="text-sm font-semibold text-slate-500">
                    +{achievement.xpReward} XP
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="rounded-[32px] bg-indigo-50 p-8 shadow-soft">
        <h2 className="text-2xl font-semibold text-slate-900">
          How to earn badges
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">
              Daily practice
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Complete voice sessions to earn badges like Tamil Speaker and
              Daily Champion.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">
              High scores
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Achieve scores above 90% to unlock Fluent Voice and Diamond Tongue
              badges for Tamil pronunciation excellence.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">
              Phoneme mastery
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Master Tamil sounds like ழ, ள, ற, and ண to earn phoneme-specific
              badges.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
