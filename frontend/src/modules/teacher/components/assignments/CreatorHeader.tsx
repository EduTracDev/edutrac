"use client";

import { Edit3, Eye } from "lucide-react";

interface HeaderProps {
  activeTab: "edit" | "preview";
  setActiveTab: (tab: "edit" | "preview") => void;
  targetClass?: string;
}

export const CreatorHeader = ({
  activeTab,
  setActiveTab,
  targetClass,
}: HeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
      <div>
        <h2 className="text-2xl font-black text-slate-800">New Assignment</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
            Drafting for{" "}
            <span className="text-[#923CF9]">
              {targetClass || "Unassigned Class"}
            </span>
          </span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl">
        <TabButton
          active={activeTab === "edit"}
          onClick={() => setActiveTab("edit")}
          icon={<Edit3 size={14} />}
          label="Edit"
        />
        <TabButton
          active={activeTab === "preview"}
          onClick={() => setActiveTab("preview")}
          icon={<Eye size={14} />}
          label="Student Preview"
        />
      </div>
    </div>
  );
};

const TabButton = ({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
      active
        ? "bg-white text-[#923CF9] shadow-md shadow-purple-100/50"
        : "text-slate-400 hover:text-slate-600"
    }`}
  >
    {icon} {label}
  </button>
);
