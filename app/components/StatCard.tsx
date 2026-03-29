// components/StatCard.tsx

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number | string;
  subtitle: string;
  color: string;          // text color for icon & value (e.g. "text-indigo-600")
  bg: string;             // background for icon container (e.g. "bg-indigo-50")
  borderColor: string;    // left border color (e.g. "border-indigo-500")
}

export default function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  color,
  bg,
  borderColor,
}: StatCardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-slate-900 
        rounded-2xl 
        border border-slate-200 dark:border-slate-800 
        shadow-sm 
        overflow-hidden 
        hover:shadow-md 
        transition-all duration-200
        flex flex-col
      `}
    >
      {/* Colored left border strip + content */}
      <div className={`border-l-4 ${borderColor} flex-1 p-6`}>
        {/* Icon + Title + Value */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
              {title}
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {value}
            </p>
          </div>

          <div className={`p-3 rounded-xl ${bg} ${color} bg-opacity-10 flex-shrink-0`}>
            <Icon size={28} strokeWidth={1.8} />
          </div>
        </div>

        {/* Subtitle */}
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
}