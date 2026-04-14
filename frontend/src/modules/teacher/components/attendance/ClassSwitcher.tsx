import React from "react";

interface ClassSwitcherProps {
  classes: string[];
  activeClass: string;
  onClassChange: (className: string) => void;
}

export default function ClassSwitcher({
  classes,
  activeClass,
  onClassChange,
}: ClassSwitcherProps) {
  return (
    <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-[20px] w-fit">
      {classes.map((cls) => (
        <button
          key={cls}
          onClick={() => onClassChange(cls)}
          className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all ${
            activeClass === cls
              ? "bg-white text-[#923CF9] shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {cls}
        </button>
      ))}
    </div>
  );
}
