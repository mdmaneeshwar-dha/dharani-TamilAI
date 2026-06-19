import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

interface RouteItem {
  id: string;
  title: string;
  path: string;
}

interface SidebarProps {
  routes: RouteItem[];
}

export function Sidebar({ routes }: SidebarProps) {
  return (
    <aside className="w-full border-b border-slate-200 bg-indigo-50 px-4 py-6 lg:w-[320px] lg:border-r lg:border-b-0 lg:px-6 lg:py-8">
      <div className="mb-10 flex items-center gap-3 rounded-3xl bg-white px-5 py-4 shadow-soft">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl font-bold text-white">
          த
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
            TamilSpeak AI
          </p>
          <h1 className="text-xl font-semibold text-slate-900">
            Tamil Learning
          </h1>
        </div>
      </div>
      <div className="space-y-3">
        {routes.map((route) => (
          <NavLink
            key={route.id}
            to={route.path}
            className={({ isActive }) =>
              `flex w-full items-center justify-between rounded-3xl border px-5 py-4 text-left text-sm font-semibold transition ${
                isActive
                  ? "border-indigo-200 bg-indigo-100 text-indigo-700"
                  : "border-transparent bg-white text-slate-700 shadow-sm hover:border-slate-200 hover:bg-slate-50"
              }`
            }
          >
            {route.title}
            <span className="text-xs text-slate-400">›</span>
          </NavLink>
        ))}
      </div>
      <div className="mt-10 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-500 p-5 text-white shadow-soft">
        <p className="text-sm uppercase tracking-[0.24em] opacity-80">
          Daily Goal
        </p>
        <h2 className="mt-4 text-2xl font-semibold">Stay on track</h2>
        <p className="mt-3 text-sm text-slate-100/90">
          Complete 1 lesson, 1 practice exercise and 1 challenge today to retain
          momentum.
        </p>
      </div>
    </aside>
  );
}
