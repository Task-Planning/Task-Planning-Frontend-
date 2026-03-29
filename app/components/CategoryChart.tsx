'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Work', tasks: 2 },
  { name: 'Study', tasks: 1 },
  { name: 'Meeting', tasks: 1 },
  { name: 'Personal', tasks: 1 },
];

export default function CategoryChart() {
  return (
    <div className="bg-white dark:bg-[#12141c] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm h-full min-h-[280px] flex flex-col">
      <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-6">
        Tasks by Category
      </h3>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30,41,59,0.95)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
              }}
            />
            <Bar dataKey="tasks" fill="#6366f1" radius={[4, 4, 4, 4]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}