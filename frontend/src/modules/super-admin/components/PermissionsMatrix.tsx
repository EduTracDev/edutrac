"use client";

import React from "react";
import { RoleDefinition, PERMISSIONS_LIST, PermissionItem } from "../types/roles.types";

interface PermissionsMatrixProps {
  selectedRole: RoleDefinition;
  onPermissionToggle: (permissionId: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function PermissionsMatrix({
  selectedRole,
  onPermissionToggle,
  onSave,
  isSaving,
}: PermissionsMatrixProps) {
  // Group permissions by module
  const modules = Array.from(new Set(PERMISSIONS_LIST.map((p) => p.module)));

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">{selectedRole.name}</h2>
            {selectedRole.isSystem && (
              <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded border border-amber-200">
                Immutable System Role
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">{selectedRole.description}</p>
        </div>

        {!selectedRole.isSystem && (
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            Save Access Policy
          </button>
        )}
      </div>

      {/* Matrix Body */}
      <div className="p-6 space-y-6">
        {modules.map((moduleName) => {
          const modulePermissions = PERMISSIONS_LIST.filter((p) => p.module === moduleName);

          return (
            <div key={moduleName} className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {moduleName} Permissions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {modulePermissions.map((perm) => {
                  const isChecked = selectedRole.permissions.includes(perm.id);

                  return (
                    <label
                      key={perm.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedRole.isSystem ? "cursor-not-allowed opacity-80" : ""
                      } ${
                        isChecked
                          ? "bg-indigo-50/50 border-indigo-200"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={selectedRole.isSystem}
                        onChange={() => onPermissionToggle(perm.id)}
                        className="mt-1 h-4 w-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{perm.label}</p>
                        <p className="text-xs text-slate-500">{perm.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}