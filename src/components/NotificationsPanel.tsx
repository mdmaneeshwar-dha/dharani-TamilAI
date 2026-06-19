import { motion } from "framer-motion";
import type { NotificationItem } from "../types";

interface NotificationsPanelProps {
  items: NotificationItem[];
  onMarkRead: (id: string) => void;
}

export function NotificationsPanel({
  items,
  onMarkRead,
}: NotificationsPanelProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Notifications</h2>
        <span className="text-sm text-slate-500">Latest updates</span>
      </div>
      <div className="mt-6 space-y-4">
        {items.slice(0, 3).map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -2 }}
            className={`rounded-3xl border p-4 transition ${item.read ? "border-slate-200 bg-slate-50" : "border-indigo-100 bg-indigo-50"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-600">{item.message}</p>
              </div>
              <button
                onClick={() => onMarkRead(item.id)}
                className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm"
              >
                Mark read
              </button>
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-400">
              {item.timestamp}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
