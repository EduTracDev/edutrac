"use client";

import React, { useState } from "react";
import { AnnouncementFormModal } from "@/modules/super-admin/components/AnnouncementFormModal";
import { AnnouncementFormData } from "@/modules/super-admin/types/announcement.types";

const MOCK_SCHOOLS = [
  { id: "sch_1", name: "Greenwood High" },
  { id: "sch_2", name: "St. Jude Grammar" },
  { id: "sch_3", name: "Apex International" },
];

const INITIAL_ANNOUNCEMENTS: AnnouncementFormData[] = [
  {
    id: "anc_1",
    title: "System Update v2.4 Release Notes",
    content: "We have deployed new grading features and enhanced report card templates.",
    priority: "Normal",
    targetType: "All",
    selectedSchoolIds: [],
    targetRoles: ["School Admins", "Teachers"],
    scheduleType: "Immediate",
    status: "Published",
    createdAt: "Aug 15, 2026",
  },
  {
    id: "anc_2",
    title: "Emergency Maintenance Notice",
    content: "Platform will undergo routine maintenance on Sunday from 2 AM to 4 AM UTC.",
    priority: "Urgent",
    targetType: "All",
    selectedSchoolIds: [],
    targetRoles: ["School Admins", "Teachers", "Parents", "Students"],
    scheduleType: "Immediate",
    status: "Published",
    createdAt: "Aug 18, 2026",
  },
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementFormData[]>(INITIAL_ANNOUNCEMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const handleCreateSubmit = async (data: AnnouncementFormData) => {
    await new Promise((res) => setTimeout(res, 600));

    const newEntry: AnnouncementFormData = {
      ...data,
      id: `anc_${Date.now()}`,
      status: data.scheduleType === "Scheduled" ? "Scheduled" : "Published",
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    setAnnouncements((prev) => [newEntry, ...prev]);
  };

  const handleArchive = (id?: string) => {
    if (!id) return;
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Archived" } : a))
    );
  };

  const filteredAnnouncements = announcements.filter((a) =>
    filterStatus === "All" ? true : a.status === filterStatus
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Platform Announcements</h1>
          <p className="text-sm text-slate-500">
            Broadcast platform updates, alerts, and notices across EduTrac schools.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm shadow-sm transition-colors flex items-center gap-2"
        >
          <span>📢 Create Announcement</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        {["All", "Published", "Scheduled", "Archived"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filterStatus === status
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* List Feed */}
      <div className="space-y-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded ${
                      item.priority === "Urgent"
                        ? "bg-red-100 text-red-800 border border-red-200"
                        : item.priority === "Important"
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {item.priority}
                  </span>
                  <h2 className="text-base font-bold text-slate-900">{item.title}</h2>
                </div>

                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    item.status === "Published"
                      ? "bg-emerald-100 text-emerald-800"
                      : item.status === "Scheduled"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-sm text-slate-600">{item.content}</p>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                <div className="flex gap-4">
                  <span>Target: {item.targetType === "All" ? "All Schools" : `${item.selectedSchoolIds.length} Schools`}</span>
                  <span>Roles: {item.targetRoles.join(", ")}</span>
                  <span>Created: {item.createdAt}</span>
                </div>

                {item.status !== "Archived" && (
                  <button
                    onClick={() => handleArchive(item.id)}
                    className="text-slate-500 hover:text-red-600 font-medium"
                  >
                    Archive
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-400 text-sm">
            No announcements found under this status filter.
          </div>
        )}
      </div>

      {/* Creation Modal */}
      <AnnouncementFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSubmit}
        schools={MOCK_SCHOOLS}
      />
    </div>
  );
}