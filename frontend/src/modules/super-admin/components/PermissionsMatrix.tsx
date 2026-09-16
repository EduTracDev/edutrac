"use client";

import React, { useState } from "react";
import { SYSTEM_PERMISSIONS, GlobalRole } from "../types/rbac.types";

const ROLE_PERMISSIONS_MAP: Record<GlobalRole, string[]> = {
  "Super Admin": ["p1", "p2", "p3", "p4", "p5", "p6"],
  "Support Engineer": ["p1", "p5"],
  "Billing Manager": ["p3", "p4"],
  Auditor: ["p5"],
};

export default function PermissionsMatrix() {
  const [matrix, setMatrix] =
    useState<Record<GlobalRole, string[]>>(ROLE_PERMISSIONS_MAP);
  const roles: GlobalRole[] = [
    "Super Admin",
    "Support Engineer",
    "Billing Manager",
    "Auditor",
  ];

  const togglePermission = (role: GlobalRole, permId: string) => {
    if (role === "Super Admin") return; // Super admin permissions remain locked
    setMatrix((prev) => {
      const current = prev[role] || [];
      const updated = current.includes(permId)
        ? current.filter((id) => id !== permId)
        : [...current, permId];
      return { ...prev, [role]: updated };
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Global System Permissions Matrix
          </h3>
          <p className="text-xs text-slate-500">
            Configure feature access boundaries for platform staff roles.
          </p>
        </div>
        <button
          onClick={() => alert("Role permissions matrix saved successfully.")}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors"
        >
          Save Changes
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold">
              <th className="p-3 w-1/3">Permission Scope</th>
              {roles.map((r) => (
                <th key={r} className="p-3 text-center w-1/6">
                  {r}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {SYSTEM_PERMISSIONS.map((perm) => (
              <tr
                key={perm.id}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <td className="p-3">
                  <p className="font-bold text-slate-900">{perm.name}</p>
                  <p className="text-[10px] text-slate-500">
                    {perm.description}
                  </p>
                </td>
                {roles.map((r) => {
                  const isChecked = matrix[r]?.includes(perm.id);
                  const isLocked = r === "Super Admin";
                  return (
                    <td key={r} className="p-3 text-center align-middle">
                      <input
                        type="checkbox"
                        disabled={isLocked}
                        checked={isChecked}
                        onChange={() => togglePermission(r, perm.id)}
                        className="rounded text-indigo-600 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
