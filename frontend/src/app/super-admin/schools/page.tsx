"use client";

import React, { useState } from "react";
import SuperAdminLayout from "@/modules/super-admin/layout/SuperAdminLayout";
import { SchoolFormModal } from "@/modules/super-admin/components/SchoolFormModal";
import { SchoolFormData } from "@/modules/super-admin/types/schoolForm.types";

export default function SchoolManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<SchoolFormData | null>(
    null,
  );

  // Mock initial school data
  const [schools, setSchools] = useState<SchoolFormData[]>([
    {
      name: "Greenwood High",
      code: "GWD-01",
      email: "contact@greenwood.edu",
      phone: "+1 555-0192",
      address: "100 Greenwood Lane",
      adminName: "Sarah Jenkins",
      adminEmail: "s.jenkins@greenwood.edu",
      plan: "Enterprise",
      maxStudents: 2000,
      status: "Active",
    },
    {
      name: "St. Jude Grammar",
      code: "SJG-02",
      email: "admin@stjude.edu",
      phone: "+1 555-0841",
      address: "45 Church Street",
      adminName: "Michael Chang",
      adminEmail: "m.chang@stjude.edu",
      plan: "Pro",
      maxStudents: 850,
      status: "Active",
    },
  ]);

  const handleOpenCreate = () => {
    setSelectedSchool(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (school: SchoolFormData) => {
    setSelectedSchool(school);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData: SchoolFormData) => {
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (selectedSchool) {
      // Update existing record
      setSchools((prev) =>
        prev.map((s) => (s.code === formData.code ? formData : s)),
      );
    } else {
      // Create new record
      setSchools((prev) => [formData, ...prev]);
    }
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              School Management
            </h1>
            <p className="text-sm text-slate-500">
              Register, inspect, and configure schools across the system.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm shadow-sm transition-colors flex items-center gap-2"
          >
            <span>+ Add New School</span>
          </button>
        </div>

        {/* School Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-4">School & Code</th>
                <th className="p-4">Primary Admin</th>
                <th className="p-4">Plan & Capacity</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schools.map((school) => (
                <tr key={school.code} className="hover:bg-slate-50">
                  <td className="p-4">
                    <p className="font-semibold text-slate-800">
                      {school.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {school.code} • {school.email}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-slate-700">{school.adminName}</p>
                    <p className="text-xs text-slate-400">
                      {school.adminEmail}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-slate-100 border text-slate-700 text-xs rounded font-medium">
                      {school.plan}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">
                      Cap: {school.maxStudents} students
                    </p>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        school.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : school.status === "Pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {school.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenEdit(school)}
                      className="text-indigo-600 font-medium hover:underline text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form Modal Component */}
        <SchoolFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={selectedSchool}
        />
      </div>
    </SuperAdminLayout>
  );
}
