"use client";

import { useState } from "react";
import ParentSidebar from "@/modules/parent/components/ParentSidebar";
import ParentTopbar from "@/modules/parent/components/ParentTopbar";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 animate-in fade-in duration-500">
      <ParentSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex flex-col flex-1">
        <ParentTopbar setSidebarOpen={setSidebarOpen} />
        <main
          className="flex-1 p-6 md:p-10"
          role="main"
          aria-label="Parent dashboard content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
