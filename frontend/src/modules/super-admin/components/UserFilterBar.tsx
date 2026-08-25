"use client";

import React from "react";

interface UserFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRole: string;
  onRoleChange: (role: string) => void;
  selectedSchool: string;
  onSchoolChange: (schoolId: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  schools: { id: string; name: string }[];
  onResetFilters: () => void;
}

export function UserFilterBar({
  searchQuery,
  onSearchChange,
  selectedRole,
  onRoleChange,
  selectedSchool,
  onSchoolChange,
  selectedStatus,
  onStatusChange,
  schools,
  onResetFilters,
}: UserFilterBarProps) {
  const hasActiveFilters =
    searchQuery || selectedRole || selectedSchool || selectedStatus;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Search Query */}
        <div className="relative col-span-1 md:col-span-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-xs">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, email, or ID..."
            className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Role Filter */}
        <div>
          <select
            value={selectedRole}
            onChange={(e) => onRoleChange(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          >
            <option value="">All Roles</option>
            <option value="School Admin">School Admins</option>
            <option value="Teacher">Teachers</option>
            <option value="Student">Students</option>
            <option value="Parent">Parents</option>
            <option value="Super Admin">Super Admins</option>
          </select>
        </div>

        {/* School Association Filter */}
        <div>
          <select
            value={selectedSchool}
            onChange={(e) => onSchoolChange(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          >
            <option value="">All Schools</option>
            {schools.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Account Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending Setup</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500">Filters active</span>
          <button
            onClick={onResetFilters}
            className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
