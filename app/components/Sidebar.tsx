import { LayoutDashboard, CheckSquare, Calendar, Users, UserCircle, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { icon: <LayoutDashboard size={20}/>, label: "Dashboard", href: "/" },
  { icon: <CheckSquare size={20}/>, label: "My Tasks", href: "/my-tasks" },
  { icon: <Calendar size={20}/>, label: "Calendar", href: "/calendar" },
  { icon: <Users size={20}/>, label: "Teams", href: "/teams" },
  { icon: <UserCircle size={20}/>, label: "Assigned to Me", href: "/assigned" },
  { icon: <Settings size={20}/>, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
          <CheckSquare size={20} />
        </div>
        <span className="text-xl font-bold tracking-tight">TaskPlanner</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href} className="flex items-center gap-3 p-3 rounded-xl text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
            {item.icon}
            <span className="font-medium text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 p-3 w-full text-gray-500 hover:text-red-500 transition-colors">
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}