"use client"; // <--- Add this line at the very top

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

// 1. Define the structure for a single task
interface Task {
  title: string;
  category: string;
  priority: string;
  status: string;
  description: string;
  color: string; 
}

// 2. Define the tasks object
const TASKS_DATA: Record<number, Task> = {
  14: { 
    title: "Team Meeting", 
    category: "Work", 
    priority: "high", 
    status: "complete", 
    description: "Weekly sync with the development team.",
    color: "bg-yellow-100 text-yellow-700"
  },
  15: {
    title: "Grocery Shopping",
    category: "Personal",
    priority: "medium",
    status: "incomplete",
    description: "Buy groceries for the week",
    color: "bg-yellow-100 text-yellow-700" 
  },
  17: { 
    title: "Complete Report", 
    category: "Work", 
    priority: "high", 
    status: "incomplete", 
    description: "Finalize the monthly financial report.",
    color: "bg-red-100 text-red-600"
  },
  20: { 
    title: "Study for Finals", 
    category: "School", 
    priority: "high", 
    status: "incomplete", 
    description: "Review chapters 5 through 10.",
    color: "bg-red-100 text-red-600"
  },
  22: { 
    title: "Update Docs", 
    category: "Work", 
    priority: "low", 
    status: "incomplete", 
    description: "Update the project README and API docs.",
    color: "bg-green-100 text-green-600"
  }
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<number>(15);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const activeTask = TASKS_DATA[selectedDate];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        
        {/* Main Calendar Grid */}
        <div className="flex-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Calendar</h1>
              <p className="text-slate-500 text-sm">View and manage your tasks by date</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  <ChevronLeft size={20} className="text-slate-600" />
                </button>
                <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  <ChevronRight size={20} className="text-slate-600" />
                </button>
              </div>
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                <Plus size={18} />
                Add Task
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">March 2026</h2>
          </div>

          <div className="grid grid-cols-7 gap-4">
            {weekDays.map(day => (
              <div key={day} className="text-center text-slate-400 font-medium text-sm mb-2">{day}</div>
            ))}
            
            {days.map(date => {
              const task = TASKS_DATA[date];
              const isSelected = selectedDate === date;

              return (
                <div 
                  key={date} 
                  onClick={() => setSelectedDate(date)}
                  className={`aspect-square border rounded-2xl p-3 relative transition-all cursor-pointer group
                    ${isSelected 
                      ? 'border-indigo-500 ring-2 ring-indigo-50 shadow-sm' 
                      : 'border-slate-100 hover:border-indigo-200'}`}
                >
                  <span className={`text-sm font-bold ${isSelected ? 'text-indigo-600' : 'text-slate-700'}`}>
                    {date}
                  </span>
                  
                  {task && (
                    <div className={`mt-1 px-2 py-1 text-[10px] font-bold rounded-md truncate ${task.color}`}>
                      {task.title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Details Panel */}
        <div className="w-full lg:w-96 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-900 mb-6 text-lg">
            March {selectedDate}, 2026
          </h3>

          {activeTask ? (
            <div className="border border-slate-100 rounded-2xl p-6 shadow-sm bg-white">
              <h4 className="font-bold text-slate-800 text-xl mb-3">{activeTask.title}</h4>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-slate-50 text-slate-500 text-xs font-bold rounded-lg border border-slate-100">
                  {activeTask.category}
                </span>
                <span className="px-3 py-1 bg-yellow-50 text-yellow-600 text-xs font-bold rounded-lg border border-yellow-100">
                  {activeTask.priority}
                </span>
                <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-lg border border-orange-100">
                  {activeTask.status}
                </span>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed">
                {activeTask.description}
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Plus className="text-slate-300" />
              </div>
              <p className="text-slate-400 text-sm">No tasks for this day.<br/>Click "Add Task" to start.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}