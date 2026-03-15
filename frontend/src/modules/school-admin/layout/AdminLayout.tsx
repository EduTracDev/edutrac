"use client";

import { useState } from "react";
import AdminSidebar from "@/modules/school-admin/components/AdminSidebar";
import AdminTopbar from "@/modules/school-admin/components/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1">
        <AdminTopbar setSidebarOpen={setSidebarOpen} />

        <main
          className="flex-1 p-6 md:p-10"
          role="main"
          aria-label="School admin dashboard content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
