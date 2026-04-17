// @/modules/shared/components/settings/SettingsLayout.tsx
"use client";

import { User, Bell, Shield, Globe } from "lucide-react";

// Define a literal type for the tabs to replace 'any'
export type SettingsTab = "profile" | "security" | "notifications";

interface SettingsLayoutProps {
  children: React.ReactNode;
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export const SettingsLayout = ({
  children,
  activeTab,
  onTabChange,
}: SettingsLayoutProps) => {
  const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "security", label: "Security", icon: <Shield size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto py-10 px-4">
      {/* Settings Sidebar */}
      <aside className="w-full md:w-64 space-y-2">
        <h1 className="text-2xl font-black text-slate-800 mb-6 px-4">
          Settings
        </h1>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#923CF9] text-white shadow-lg shadow-purple-200"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Settings Content Area */}
      <main className="flex-1 bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm min-h-[500px]">
        {children}
      </main>
    </div>
  );
};
