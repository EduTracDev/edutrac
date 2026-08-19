"use client";

import React, { useState, useMemo } from "react";
import { UserFilterBar } from "@/modules/super-admin/components/UserFilterBar";
import { UserFormModal } from "@/modules/super-admin/components/UserFormModal";
import { UserFormData, UserRole, UserStatus } from "@/modules/super-admin/types/userForm.types";

const MOCK_SCHOOLS = [
  { id: "sch_1", name: "Greenwood High" },
  { id: "sch_2", name: "St. Jude Grammar" },
  { id: "sch_3", name: "Apex International" },
];

const MOCK_USERS: UserFormData[] = [
  {
    id: "usr_1",
    firstName: "Marcus",
    lastName: "Vance",
    email: "m.vance@greenwood.edu",
    phone: "+1 555-0192",
    role: "Teacher",
    status: "Active",
    schoolId: "sch_1",
    employeeId: "EMP-4011",
  },
  {
    id: "usr_2",
    firstName: "Sophia",
    lastName: "Chen",
    email: "sophia.c@stjude.edu",
    phone: "+1 555-0841",
    role: "Student",
    status: "Active",
    schoolId: "sch_2",
    studentIdNumber: "STU-2026-04",
    gradeLevel: "Grade 11",
  },
  {
    id: "usr_3",
    firstName: "David",
    lastName: "Okafor",
    email: "d.okafor@apex.edu",
    phone: "+1 555-3921",
    role: "School Admin",
    status: "Pending",
    schoolId: "sch_3",
    employeeId: "ADM-1002",
  },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserFormData[]>(MOCK_USERS);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserFormData | null>(null);

  // Filter Computation
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        !searchQuery ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.employeeId && user.employeeId.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.studentIdNumber && user.studentIdNumber.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRole = !selectedRole || user.role === selectedRole;
      const matchesSchool = !selectedSchool || user.schoolId === selectedSchool;
      const matchesStatus = !selectedStatus || user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesSchool && matchesStatus;
    });
  }, [users, searchQuery, selectedRole, selectedSchool, selectedStatus]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedRole("");
    setSelectedSchool("");
    setSelectedStatus("");
  };

  const handleOpenCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: UserFormData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData: UserFormData) => {
    await new Promise((res) => setTimeout(res, 600));

    if (selectedUser?.id) {
      setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? { ...formData, id: u.id } : u)));
    } else {
      setUsers((prev) => [{ ...formData, id: `usr_${Date.now()}` }, ...prev]);
    }
  };

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus: UserStatus = u.status === "Active" ? "Suspended" : "Active";
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const handleResetPassword = (email: string) => {
    alert(`Password reset link dispatched to: ${email}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Primary Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500">
            Provision, filter, and audit user accounts across all EduTrac institutions.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm shadow-sm transition-colors flex items-center gap-2"
        >
          <span>+ Add New User</span>
        </button>
      </div>

      {/* Filter Component */}
      <UserFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        selectedSchool={selectedSchool}
        onSchoolChange={setSelectedSchool}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        schools={MOCK_SCHOOLS}
        onResetFilters={handleResetFilters}
      />

      {/* User Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="p-4">User Details</th>
              <th className="p-4">Role</th>
              <th className="p-4">Assigned Institution</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const schoolObj = MOCK_SCHOOLS.find((s) => s.id === user.schoolId);
                return (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <p className="font-semibold text-slate-800">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-slate-400">
                        {user.email} {user.employeeId ? `• ${user.employeeId}` : ""}{" "}
                        {user.studentIdNumber ? `• ${user.studentIdNumber}` : ""}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-slate-100 border text-slate-700 text-xs rounded font-medium">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      {user.role === "Super Admin" ? "Global Scope" : schoolObj?.name || "Unassigned"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === "Active"
                            ? "bg-emerald-100 text-emerald-800"
                            : user.status === "Pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <button
                        onClick={() => handleResetPassword(user.email)}
                        className="text-slate-500 hover:text-slate-700 text-xs font-medium"
                        title="Dispatch Reset Link"
                      >
                        Reset Password
                      </button>
                      <button
                        onClick={() => user.id && handleToggleStatus(user.id)}
                        className="text-amber-600 hover:text-amber-800 text-xs font-medium"
                      >
                        {user.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleOpenEdit(user)}
                        className="text-indigo-600 font-medium hover:underline text-sm"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">
                  No users found matching the current filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Form Modal */}
      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedUser}
        schools={MOCK_SCHOOLS}
      />
    </div>
  );
}