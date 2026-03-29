"use client";
import { useState } from 'react';
import { X, Clock, Calendar, Bell, ChevronDown, Plus, Trash2, History, Tag, Mail, BellRing } from 'lucide-react';

export default function CreateTaskModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('Details');
  const [taskType, setTaskType] = useState<'Personal' | 'Team'>('Personal');
  const [enableReminder, setEnableReminder] = useState(false); // Default to off

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#0f1117] w-full max-w-[500px] rounded-[32px] shadow-2xl overflow-hidden flex flex-col border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
        
        {/* HEADER */}
        <div className="px-8 py-6 flex justify-between items-center border-b border-slate-50 dark:border-slate-800/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New Task</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <X size={24}/>
          </button>
        </div>

        {/* TAB NAVIGATION */}
        <div className="px-8 pt-6">
          <div className="flex bg-slate-100 dark:bg-slate-900/80 p-1 rounded-2xl">
            {['Details', 'Subtasks', 'Activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
                  activeTab === tab 
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* SCROLLABLE FORM */}
        <div className="p-8 overflow-y-auto max-h-[60vh] custom-scrollbar">
          
          {activeTab === 'Details' && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Task Title */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Task Title *</label>
                <input type="text" placeholder="Enter task title" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white" />
              </div>
              
              {/* Status */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Status</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-4 text-sm appearance-none dark:text-white outline-none">
                    <option>Incomplete</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>On Hold</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Task Type Switcher */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Task Type *</label>
                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl">
                  {['Personal', 'Team'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setTaskType(type as any)}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                        taskType === type 
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm' 
                        : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional Team Selector */}
              {taskType === 'Team' && (
                <div className="space-y-2 animate-in slide-in-from-top-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Choose a team</label>
                  <div className="relative">
                    <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-4 text-sm appearance-none dark:text-white outline-none">
                      <option disabled selected>Select Team</option>
                      <option>Development</option>
                      <option>Design Team</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Category & Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Category *</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-4 text-sm dark:text-white outline-none">
                    <option>Work</option>
                    <option>Study</option>
                    <option>Personal</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Priority *</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-4 text-sm dark:text-white outline-none">
                    <option>Medium</option>
                    <option>High</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              {/* Time Range and Duration */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <Clock size={14} /> Time Range
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="time" defaultValue="08:00" className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-4 text-sm dark:text-white outline-none" />
                  <input type="time" defaultValue="16:00" className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-4 text-sm dark:text-white outline-none" />
                </div>
                <p className="text-[11px] font-bold text-slate-500 uppercase">Duration: 8h 0m</p>
              </div>

              {/* Reminder Block */}
              <div className={`p-5 rounded-[28px] border transition-all ${enableReminder ? 'bg-indigo-50/50 border-indigo-100 dark:bg-indigo-500/5 dark:border-indigo-500/30' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${enableReminder ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400 dark:bg-slate-800'}`}>
                      <Bell size={22} />
                    </div>
                    <div>
                      <p className="text-sm font-bold dark:text-white">Get notified before the due date</p>
                      {enableReminder && <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5 font-bold">You will be notified at 08:00</p>}
                    </div>
                  </div>
                  <button 
                    onClick={() => setEnableReminder(!enableReminder)}
                    className={`w-12 h-6 rounded-full relative transition-all ${enableReminder ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${enableReminder ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>

                {/* UPDATED: Added Conditional Fields for Reminder details */}
                {enableReminder && (
                  <div className="mt-5 pl-5 border-l-2 border-indigo-600 space-y-5 animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase text-slate-400">Reminder Time</label>
                      <div className="relative">
                         <input type="time" defaultValue="08:00" className="w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm outline-none dark:text-white" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-bold uppercase text-slate-400">Notification Type</label>
                      <div className="flex flex-col gap-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-indigo-600" />
                          <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2"><BellRing size={14}/> Push Notification</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600" />
                          <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2"><Mail size={14}/> Email Reminder</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ACTIVITY TAB */}
          {activeTab === 'Activity' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 font-bold text-xs shrink-0">JD</div>
                <div className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold dark:text-white mb-1">John Doe <span className="font-normal text-slate-400 ml-2">Just now</span></p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Created this task and assigned it to the <span className="text-indigo-500 font-bold inline-flex items-center gap-1"><Tag size={12}/> Design</span> category.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-8 bg-slate-50 dark:bg-slate-900/50 flex gap-4 border-t border-slate-100 dark:border-slate-800">
          <button onClick={onClose} className="flex-1 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 transition-colors">Cancel</button>
          <button className="flex-1 py-4 text-sm font-bold bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 dark:shadow-none transition-all active:scale-95">
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}