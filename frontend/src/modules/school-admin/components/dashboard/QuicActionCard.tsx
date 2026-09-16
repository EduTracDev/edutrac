"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, LucideIcon, Plus } from "lucide-react";

export interface QuickActionMenuItem {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface QuickActionProps {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
  description?: string;
  menuItems?: QuickActionMenuItem[];
}

export default function QuickActionCard({
  title,
  icon: Icon,
  onClick,
  description,
  menuItems,
}: QuickActionProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeMenu = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  if (menuItems?.length) {
    return (
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-haspopup="menu"
          className="group flex w-full items-center gap-3 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-4 text-left shadow-sm transition-all duration-200 hover:border-violet-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
        >
          <div className="rounded-xl bg-[#923CF9] p-3 text-white shadow-sm shadow-violet-200">
            <Icon size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-800">{title}</p>
            {description && (
              <p className="mt-0.5 text-xs text-slate-500">{description}</p>
            )}
          </div>
          <ChevronDown
            size={18}
            className={`text-[#923CF9] transition-transform duration-200 ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isMenuOpen && (
          <div
            role="menu"
            aria-label={`${title} actions`}
            className="absolute right-0 z-20 mt-2 w-full min-w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/60"
          >
            {menuItems.map(({ title: itemTitle, icon: ItemIcon, onClick: onItemClick }) => (
              <button
                key={itemTitle}
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsMenuOpen(false);
                  onItemClick();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-violet-50 hover:text-[#923CF9] focus:bg-violet-50 focus:outline-none"
              >
                <span className="rounded-lg bg-slate-50 p-2 text-slate-500">
                  <ItemIcon size={16} />
                </span>
                {itemTitle}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-4 text-left hover:border-[#923CF9] hover:bg-[#923CF9]/5 transition-all duration-200"
    >
      <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-[#923CF9] group-hover:text-white transition-colors">
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-slate-800 text-sm text-nowrap">
          {title}
        </h3>
      </div>
      <Plus size={16} className="text-slate-300 group-hover:text-[#923CF9]" />
    </button>
  );
}
