"use client";

import { useState } from "react";
import {
  Plus, Trash2, X, Tag, Clock, 
  ListChecks, History, ChevronDown, Moon, Bell, 
  ChevronLeft, ChevronRight, Mail, BellRing
} from "lucide-react";

// --- Types ---
type Subtask = { id: string; title: string; completed: boolean };

type Activity = { id: string; user: string; action: string; timestamp: string };

type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  date: string; 
  status: "Incomplete" | "In Progress" | "Completed";
  type: "Personal" | "Team";
  startTime: string;
  endTime: string;
  reminderEnabled: boolean;
  subtasks: Subtask[];
  activities: Activity[];
};

export default function TaskManager() {
  // --- Example Initial Data (CRUD Ready) ---
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete React Project",
      description: "Finish the task planner application with all required features",
      category: "Work",
      priority: "High",
      date: "2026-03-17",
      status: "In Progress",
      type: "Personal",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      reminderEnabled: true,
      subtasks: [{ id: "s1", title: "Build frontend", completed: false }],
      activities: [{ id: "a1", user: "John Doe", action: "Task created", timestamp: "16/03/2026, 00:08" }]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Details");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState("2026-03-15");
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  // --- CRUD Functions ---
  const handleSaveTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const taskData: Task = {
      id: editingTask?.id || Math.random().toString(36).substr(2, 9),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as any || "Incomplete",
      type: formData.get("taskType") as any || "Personal",
      category: formData.get("category") as string,
      priority: formData.get("priority") as any,
      date: formData.get("date") as string,
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
      reminderEnabled: formData.get("reminder") === "on",
      subtasks: editingTask?.subtasks || [],
      activities: editingTask?.activities || [{ 
        id: Date.now().toString(), 
        user: "John Doe", 
        action: "Task created", 
        timestamp: new Date().toLocaleString() 
      }]
    };

    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? taskData : t));
    } else {
      setTasks([...tasks, taskData]);
    }
    closeModal();
  };

  const addSubtask = () => {
    if (!newSubtaskTitle.trim() || !editingTask) return;
    const newSub: Subtask = { id: Date.now().toString(), title: newSubtaskTitle, completed: false };
    const updatedTask = { ...editingTask, subtasks: [...editingTask.subtasks, newSub] };
    setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
    setEditingTask(updatedTask);
    setNewSubtaskTitle("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setActiveTab("Details");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-800">
      {/* Navbar */}
      {/* <nav className="flex items-center justify-between px-10 py-4 bg-white border-b border-slate-50">
        <div className="flex items-center gap-6">
          <Moon size={20} className="text-slate-500 cursor-pointer" />
          <Bell size={20} className="text-slate-500 cursor-pointer" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">J</div>
            <span className="text-sm font-semibold">John Doe</span>
          </div>
        </div>
      </nav> */}

      <div className=" mx-auto">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h1 className="text-4xl font-extrabold text-slate-900">Task Overview</h1>
                <p className="text-slate-400 font-medium">View and manage your tasks by date</p>
            </div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg"
            >
                <Plus size={20} /> Add Task
            </button>
        </div>

        {/* Task List Table/Grid Placeholder */}
        <div className="space-y-4">
    {tasks.map((task) => (
      <div
        key={task.id}
        onClick={() => {
          setEditingTask(task);
          setIsModalOpen(true);
        }}
        className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 hover:border-violet-200 transition cursor-pointer"
      >
        {/* LEFT SIDE */}
        <div>
          <h3 className="font-bold text-lg text-slate-900">{task.title}</h3>
          <p className="text-sm text-slate-500">{task.description}</p>

          <div className="flex gap-3 text-xs mt-2 items-center">
            <span className="bg-slate-100 px-2 py-1 rounded">
              {task.category}
            </span>

            <span
              className={`px-2 py-1 rounded ${
                task.priority === "High"
                  ? "bg-red-100 text-red-600"
                  : task.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {task.priority}
            </span>

            <span className="flex items-center gap-1 text-slate-400">
              <Clock size={12} />
              {task.date}
            </span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="text-slate-400 text-sm font-medium">
          {task.status}
        </div>
      </div>
    ))}
  </div>
      </div>

      {/* --- CRUD MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeModal} />
          <form onSubmit={handleSaveTask} className="relative bg-white w-full max-w-xl rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            
            <div className="p-6 flex justify-between items-center sticky top-0 bg-white z-20">
              <h2 className="text-xl font-bold">{editingTask ? "Edit Task" : "Create New Task"}</h2>
              <button type="button" onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full"><X/></button>
            </div>

            {/* Tabs (image_528175.png) */}
            <div className="px-6 mb-6">
              <div className="flex bg-slate-50 p-1.5 rounded-2xl">
                {["Details", "Subtasks", "Activity"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all
                      ${activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-8 pb-8 space-y-5">
              {activeTab === "Details" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Task Title *</label>
                    <input name="title" defaultValue={editingTask?.title} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl" placeholder="Enter task title" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold">Description</label>
                    <textarea name="description" defaultValue={editingTask?.description} rows={2} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl" placeholder="Enter task description" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold">Status</label>
                    <select name="status" defaultValue={editingTask?.status} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl appearance-none">
                        <option value="Incomplete">● Incomplete</option>
                        <option value="In Progress">● In Progress</option>
                        <option value="Completed">● Completed</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Category *</label>
                        <select name="category" defaultValue={editingTask?.category || "Study"} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl">
                            <option>Study</option><option>Work</option><option>Personal</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Priority *</label>
                        <select name="priority" defaultValue={editingTask?.priority || "Medium"} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl">
                            <option>Low</option><option>Medium</option><option>High</option>
                        </select>
                    </div>
                  </div>

                  {/* Time Range & Reminders (image_5226fb.png) */}
                  <div className="pt-4 space-y-4">
                    <div className="flex items-center gap-2 font-bold text-sm"><Clock size={16}/> Time Range</div>
                    <div className="grid grid-cols-2 gap-4">
                        <input name="startTime" defaultValue={editingTask?.startTime || "09:00 AM"} className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm" />
                        <input name="endTime" defaultValue={editingTask?.endTime || "05:00 PM"} className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm" />
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                        <div className="flex items-center gap-3">
                            <BellRing size={20} className="text-blue-500" />
                            <div>
                                <p className="text-sm font-bold">Enable Reminder</p>
                                <p className="text-[10px] text-slate-400">Get notified before the due date</p>
                            </div>
                        </div>
                        <input type="checkbox" name="reminder" defaultChecked={editingTask?.reminderEnabled} className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-violet-600 transition-all cursor-pointer relative after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:w-3 after:h-3 after:rounded-full checked:after:translate-x-5 after:transition-all" />
                    </div>
                  </div>
                </>
              )}

              {/* Subtasks Tab (image_52277e.png) */}
              {activeTab === "Subtasks" && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Add Subtask</label>
                    <div className="flex gap-2">
                        <input 
                            value={newSubtaskTitle}
                            onChange={(e) => setNewSubtaskTitle(e.target.value)}
                            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl" 
                            placeholder="Enter subtask title" 
                        />
                        <button type="button" onClick={addSubtask} className="p-3 bg-slate-900 text-white rounded-xl"><Plus size={20}/></button>
                    </div>
                  </div>

                  {editingTask?.subtasks.length === 0 ? (
                    <div className="text-center py-10 opacity-40">
                        <ListChecks className="mx-auto mb-2" size={40} />
                        <p className="font-bold">No subtasks yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                        {editingTask?.subtasks.map(sub => (
                            <div key={sub.id} className="flex items-center gap-3 p-4 bg-white border border-slate-50 rounded-2xl shadow-sm">
                                <input type="checkbox" checked={sub.completed} readOnly className="w-5 h-5 accent-violet-600" />
                                <span className="font-bold text-slate-700">{sub.title}</span>
                            </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {/* Activity Tab (image_52275b.png) */}
              {activeTab === "Activity" && (
                <div className="text-center py-20 opacity-40">
                    <History className="mx-auto mb-2" size={48} />
                    <p className="font-bold">No activity yet</p>
                    <p className="text-xs">Activity history will appear here</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white">
              <button type="button" onClick={closeModal} className="px-6 py-3 border border-slate-200 rounded-2xl font-bold">Cancel</button>
              <button type="submit" className="px-8 py-3 bg-violet-600 text-white rounded-2xl font-bold shadow-lg shadow-violet-100">
                {editingTask ? "Update Task" : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}