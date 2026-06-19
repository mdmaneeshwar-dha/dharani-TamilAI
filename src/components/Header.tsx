import type { UserProfile } from "../types";

interface HeaderProps {
  title: string;
  profile: UserProfile;
}

export function Header({ title, profile }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-slate-50 px-6 py-6 lg:px-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Welcome back, {profile.name}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            {title}
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-full bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
            XP {profile.xp}
          </div>
          <div className="rounded-full bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
            Streak {profile.streak} days
          </div>
          <div className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
            Level {profile.level}
          </div>
        </div>
      </div>
    </header>
  );
}
