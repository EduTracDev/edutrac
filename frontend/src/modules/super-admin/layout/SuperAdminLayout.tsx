"use client";

import React, { useState } from "react";
import SuperAdminSidebar from "@/modules/super-admin/components/SuperAdminSidebar";
import SuperAdminTopbar from "@/modules/super-admin/components/SuperAdminTopbar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 animate-in fade-in duration-500">
      <SuperAdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex flex-col flex-1">
        <SuperAdminTopbar setSidebarOpen={setSidebarOpen} />
        <main
          className="flex-1 p-6 md:p-10"
          role="main"
          aria-label="Super Admin dashboard content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
