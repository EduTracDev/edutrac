"use client";
import { useState } from "react";
import TeacherSidebar from "@/modules/teacher/components/TeacherSidebar";
import TeacherTopbar from "../components/TeacherTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 animate-in fade-in duration-500">
      <TeacherSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex flex-col flex-1">
        <TeacherTopbar setSidebarOpen={setSidebarOpen} />
        <main
          className="flex-1 p-6 md:p-10"
          role="main"
          aria-label="Teacher dashboard content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
