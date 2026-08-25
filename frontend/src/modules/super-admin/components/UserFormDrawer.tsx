"use client";

import React, { useState } from "react";
import { SystemUser, GlobalRole } from "../types/rbac.types";

interface UserFormDrawerProps {
  onClose: () => void;
  onSave: (user: SystemUser) => void;
}

export function UserFormDrawer({ onClose, onSave }: UserFormDrawerProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<GlobalRole>("Support Engineer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const newUser: SystemUser = {
      id: `usr_${Date.now()}`,
      fullName,
      email,
      role,
      status: "Pending Setup",
      lastActive: "Never",
      mfaEnabled: false,
    };

    onSave(newUser);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-900">Grant System Access</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs flex-1 overflow-y-auto">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Samuel Adebayo"
              className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Corporate Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="s.adebayo@edutrac.io"
              className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Assigned Global Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as GlobalRole)}
              className="w-full p-2.5 border border-slate-300 rounded-lg outline-none font-semibold text-slate-800"
            >
              <option value="Super Admin">Super Admin (Full Platform Control)</option>
              <option value="Support Engineer">Support Engineer (Tenant Access & Logs)</option>
              <option value="Billing Manager">Billing Manager (Invoices & Licensing)</option>
              <option value="Auditor">Auditor (Read-Only Log Access)</option>
            </select>
          </div>

          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-800 text-[11px]">
            <p className="font-bold mb-1">Authentication Requirements:</p>
            An invite email with temporary login credentials will be dispatched. MFA configuration is strictly required upon first login.
          </div>
        </form>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-200 rounded-lg text-xs">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-xs"
          >
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
}