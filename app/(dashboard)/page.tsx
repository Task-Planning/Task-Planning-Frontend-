// app/dashboard/page.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { CalendarDays, CheckCircle2, Clock, AlertCircle, BarChart3 } from "lucide-react";

// ─── Sample Data ───────────────────────────────
const categoryData = [
  { name: "Work", value: 2 },
  { name: "Study", value: 1 },
  { name: "Meeting", value: 1 },
  { name: "Personal", value: 1 },
];

const statusData = [
  { name: "Completed", value: 1, color: "#10b981" },
  { name: "Pending", value: 3, color: "#f59e0b" },
  { name: "Overdue", value: 0, color: "#ef4444" },
];

const weeklyProgress = 50;

// ─── Dashboard Page ───────────────────────────────
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome back, John Doe!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1.5">
            Here's what's happening with your tasks today.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            icon={BarChart3}
            title="Total Tasks"
            value={5}
            subtitle="All your tasks"
            color="text-indigo-600"
            bg="bg-indigo-50 dark:bg-indigo-950/30"
            border="border-indigo-500"
          />
          <StatCard
            icon={CheckCircle2}
            title="Completed"
            value={1}
            subtitle="Tasks finished"
            color="text-emerald-600"
            bg="bg-emerald-50 dark:bg-emerald-950/30"
            border="border-emerald-500"
          />
          <StatCard
            icon={Clock}
            title="Pending"
            value={3}
            subtitle="In progress"
            color="text-amber-600"
            bg="bg-amber-50 dark:bg-amber-950/30"
            border="border-amber-500"
          />
          <StatCard
            icon={AlertCircle}
            title="Overdue"
            value={0}
            subtitle="Need attention"
            color="text-red-600"
            bg="bg-red-50 dark:bg-red-950/30"
            border="border-red-500"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Progress */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 size={20} className="text-indigo-500" />
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                Weekly Progress
              </h3>
            </div>
            <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">
              {weeklyProgress}%
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              Tasks completed this week
            </p>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-4 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full"
                style={{ width: `${weeklyProgress}%` }}
              />
            </div>
          </div>

          {/* Task Status Distribution */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle2 size={20} className="text-emerald-500" />
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                Task Status Distribution
              </h3>
            </div>
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} layout="vertical" margin={{ left: 80 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30,41,59,0.95)",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <LegendItem color="bg-emerald-500" label="Completed" />
              <LegendItem color="bg-amber-500" label="Pending" />
              <LegendItem color="bg-red-500" label="Overdue" />
            </div>
          </div>
        </div>

        {/* Tasks by Category */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={20} className="text-indigo-500" />
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
              Tasks by Category
            </h3>
          </div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{ left: 60, right: 20 }}
              >
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30,41,59,0.95)",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 6, 6]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <CalendarDays size={20} className="text-indigo-500" />
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                Upcoming Deadlines
              </h3>
            </div>
            <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
              View all
            </button>
          </div>
          <div className="space-y-4">
            <DeadlineItem
              title="Grocery Shopping"
              date="15/03/2026"
              category="Personal"
              priority="medium"
            />
            <DeadlineItem
              title="Complete React Project"
              date="17/03/2026"
              category="Work"
              priority="high"
            />
            <DeadlineItem
              title="Study for Final Exam"
              date="20/03/2026"
              category="Study"
              priority="high"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── StatCard Component ─────────────────────────────
function StatCard({ icon: Icon, title, value, subtitle, color, bg, border }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className={`border-l-4 ${border} p-6`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{title}</p>
            <p className="text-4xl font-bold text-slate-900 dark:text-white">{value}</p>
          </div>
          <div className={`p-3 rounded-xl ${bg} ${color}`}>
            <Icon size={28} />
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}

// ─── DeadlineItem Component ─────────────────────────────
function DeadlineItem({ title, date, category, priority }: any) {
  const priorityStyles: any = {
    high: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-500",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-500",
    low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-500",
  };
  const borderClass = priorityStyles[priority].match(/border-\S+/)?.[0];
  const textBgClasses = priorityStyles[priority].split(" ").slice(0, 2).join(" ");

  return (
    <div
      className={`p-5 rounded-xl border-l-4 ${borderClass} bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
            <CalendarDays size={14} />
            <span>{date}</span>
            <span className="bg-slate-200 dark:bg-slate-700 px-2.5 py-0.5 rounded-full text-xs">{category}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`text-xs font-semibold uppercase px-3 py-1 rounded-full ${textBgClasses}`}>{priority}</span>
          <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">View Details</button>
        </div>
      </div>
    </div>
  );
}

// ─── Legend Item ─────────────────────────────
function LegendItem({ color, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-slate-600 dark:text-slate-300">{label}</span>
    </div>
  );
}