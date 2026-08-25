"use client";

import React, { useState } from "react";
import SuperAdminLayout from "@/modules/super-admin/layout/SuperAdminLayout";
import {
  MOCK_SYSTEM_USERS,
  SystemUser,
} from "@/modules/super-admin/types/rbac.types";
import PermissionsMatrix from "@/modules/super-admin/components/PermissionsMatrix";
import { UserFormDrawer } from "@/modules/super-admin/components/UserFormDrawer";

export default function UserManagementPage() {
  const [users, setUsers] = useState<SystemUser[]>(MOCK_SYSTEM_USERS);
  const [activeTab, setActiveTab] = useState<"users" | "permissions">("users");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddUser = (newUser: SystemUser) => {
    setUsers([newUser, ...users]);
    setIsDrawerOpen(false);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === "Active" ? "Suspended" : "Active";
          return { ...u, status: nextStatus };
        }
        return u;
      }),
    );
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              User Management & Global RBAC
            </h1>
            <p className="text-sm text-slate-500">
              Control administrative user accounts, configure system roles, and
              define permission limits.
            </p>
          </div>
          {activeTab === "users" && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors"
            >
              + Invite Admin Staff
            </button>
          )}
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-slate-200 flex gap-6">
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-3 text-xs font-bold transition-colors border-b-2 ${
              activeTab === "users"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Staff Accounts ({users.length})
          </button>
          <button
            onClick={() => setActiveTab("permissions")}
            className={`pb-3 text-xs font-bold transition-colors border-b-2 ${
              activeTab === "permissions"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Role Permissions Matrix
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="p-3">User Name</th>
                    <th className="p-3">Assigned Role</th>
                    <th className="p-3">MFA Status</th>
                    <th className="p-3">Last Active</th>
                    <th className="p-3">Account Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-3">
                        <p className="font-bold text-slate-900">
                          {user.fullName}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {user.email}
                        </p>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-100 text-slate-800 border border-slate-200">
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-semibold ${
                            user.mfaEnabled
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }`}
                        >
                          {user.mfaEnabled ? "✓ Enforced" : "⚠ Not Setup"}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{user.lastActive}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            user.status === "Active"
                              ? "bg-emerald-100 text-emerald-800"
                              : user.status === "Pending Setup"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className="text-slate-600 hover:text-slate-900 font-bold"
                        >
                          {user.status === "Active" ? "Suspend" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Permissions Matrix Tab */}
        {activeTab === "permissions" && <PermissionsMatrix />}

        {/* Drawer */}
        {isDrawerOpen && (
          <UserFormDrawer
            onClose={() => setIsDrawerOpen(false)}
            onSave={handleAddUser}
          />
        )}
      </div>
    </SuperAdminLayout>
  );
}
