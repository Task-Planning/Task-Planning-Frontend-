"use client";
import { useState, useEffect } from "react";
import { User, Sun, Moon, Bell, Tag, Plus } from "lucide-react";

export default function SettingsPage() {
  const [categories, setCategories] = useState([
    "Study",
    "Work",
    "Personal",
    "Project",
    "Meeting",
  ]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 px-10 py-8 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-extrabold text-slate-900">Settings</h1>
        <p className="text-slate-400 font-medium">
          Manage your account settings and preferences
        </p>
      </header>

      {/* Profile Section */}
      <section className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6 font-bold text-slate-800">
          <div className="p-2 bg-blue-50 rounded-lg">
            <User size={18} className="text-blue-500" />
          </div>
          Profile Information
        </div>

        <div className="space-y-5 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">
                Username
              </label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-3"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="john@example.com"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-3"
              />
            </div>
          </div>

          <button className="bg-blue-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600">
            Save Changes
          </button>
        </div>
      </section>

      {/* Appearance */}
      <section className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-3 font-bold text-slate-800">
          <div className="p-2 bg-amber-50 rounded-lg">
            <Sun size={18} className="text-amber-500" />
          </div>
          Appearance
        </div>

        <div className="flex gap-4 p-2 bg-slate-50 rounded-2xl w-fit">
          <button
            onClick={() => handleThemeChange("light")}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl ${
              theme === "light"
                ? "bg-white shadow text-blue-600"
                : "text-slate-500"
            }`}
          >
            <Sun size={18} /> Light
          </button>

          <button
            onClick={() => handleThemeChange("dark")}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl ${
              theme === "dark"
                ? "bg-slate-800 text-white"
                : "text-slate-500"
            }`}
          >
            <Moon size={18} /> Dark
          </button>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6 font-bold text-slate-800">
          <div className="p-2 bg-rose-50 rounded-lg">
            <Bell size={18} className="text-rose-500" />
          </div>
          Notification Preferences
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <ToggleOption
            title="Email Notifications"
            desc="Updates sent to your inbox"
            defaultChecked={true}
          />
          <ToggleOption
            title="Push Notifications"
            desc="Real-time alerts on your device"
            defaultChecked={false}
          />
          <ToggleOption
            title="Task Reminders"
            desc="Deadlines and schedule alerts"
            defaultChecked={true}
          />
          <ToggleOption
            title="Team Updates"
            desc="Activity from shared projects"
            defaultChecked={true}
          />
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6 font-bold text-slate-800">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <Tag size={18} className="text-emerald-500" />
          </div>
          Manage Categories
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <div
              key={cat}
              className="px-4 py-2 bg-white border rounded-xl text-sm font-bold text-slate-600"
            >
              {cat}
            </div>
          ))}
        </div>

        <div className="flex gap-3 max-w-md">
          <input
            type="text"
            placeholder="Create a new category..."
            className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl p-3"
          />

          <button className="p-3 bg-slate-900 text-white rounded-2xl">
            <Plus size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

function ToggleOption({
  title,
  desc,
  defaultChecked,
}: {
  title: string;
  desc: string;
  defaultChecked: boolean;
}) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border">
      <div>
        <p className="font-bold text-slate-800">{title}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-11 h-6 rounded-full relative ${
          enabled ? "bg-blue-500" : "bg-slate-300"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}