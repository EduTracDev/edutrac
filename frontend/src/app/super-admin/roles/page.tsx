"use client";

import React, { useState } from "react";
import { INITIAL_ROLES, RoleDefinition, RoleType } from "@/modules/super-admin/types/roles.types";
import { PermissionsMatrix } from "@/modules/super-admin/components/PermissionsMatrix";

export default function RolesPermissionsPage() {
  const [roles, setRoles] = useState<RoleDefinition[]>(INITIAL_ROLES);
  const [activeRoleType, setActiveRoleType] = useState<RoleType>("School Admin");
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeRole = roles.find((r) => r.id === activeRoleType) || roles[0];

  const handlePermissionToggle = (permissionId: string) => {
    if (activeRole.isSystem) return; // Prevent modifying Super Admin permissions

    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id === activeRoleType) {
          const exists = role.permissions.includes(permissionId);
          const updatedPermissions = exists
            ? role.permissions.filter((p) => p !== permissionId)
            : [...role.permissions, permissionId];

          return { ...role, permissions: updatedPermissions };
        }
        return role;
      })
    );
  };

  const handleSavePolicy = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 600));
    setIsSaving(false);

    setToastMessage(`Permissions policy updated for '${activeRole.name}'`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Roles & Permissions</h1>
        <p className="text-sm text-slate-500">
          Configure MVP access control policies for School Admins, Teachers, Parents, and Students.
        </p>
      </div>

      {/* Success Toast */}
      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-medium flex items-center gap-2">
          <span>✅</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Grid Layout: Left Role Selection Cards, Right Permissions Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Role Selection Column */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Platform Roles ({roles.length})
          </h2>

          <div className="space-y-2">
            {roles.map((role) => {
              const isActive = role.id === activeRoleType;
              return (
                <div
                  key={role.id}
                  onClick={() => setActiveRoleType(role.id)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-sm">{role.name}</p>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {role.userCount.toLocaleString()} Users
                    </span>
                  </div>
                  <p
                    className={`text-xs mt-1 line-clamp-2 ${
                      isActive ? "text-indigo-100" : "text-slate-500"
                    }`}
                  >
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Permissions Editor Column */}
        <div className="lg:col-span-2">
          <PermissionsMatrix
            selectedRole={activeRole}
            onPermissionToggle={handlePermissionToggle}
            onSave={handleSavePolicy}
            isSaving={isSaving}
          />
        </div>
      </div>
    </div>
  );
}