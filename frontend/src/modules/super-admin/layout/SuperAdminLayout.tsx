import React from "react";
import { SuperAdminSidebar } from "@/modules/super-admin/components/SuperAdminSidebar";
import { SuperAdminTopbar } from "@/modules/super-admin/components/SuperAdminTopbar";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <SuperAdminTopbar />
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}