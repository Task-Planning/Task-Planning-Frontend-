// app/dashboard/layout.tsx
import Sidebar from '../components/Sidebar';
import { Bell, Moon } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-end px-8 gap-4 bg-white/50 backdrop-blur-md sticky top-0 z-10">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><Moon size={20}/></button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><Bell size={20}/></button>
          <div className="flex items-center gap-2 ml-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs">J</div>
            <span className="font-medium text-sm">John Doe</span>
          </div>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );

  
}

