"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideSidebar = pathname === "/login";

  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen">
        <div className="flex">
          {!hideSidebar && <Sidebar />}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}