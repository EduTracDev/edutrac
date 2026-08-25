"use client";

import React, { useState } from "react";
import SuperAdminLayout from "@/modules/super-admin/layout/SuperAdminLayout";
import {
  MOCK_TICKETS,
  SupportTicket,
  TicketStatus,
  TicketPriority,
} from "@/modules/super-admin/types/support.types";
import { TicketDetailDrawer } from "@/modules/super-admin/components/TicketDetailDrawer";

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_TICKETS);
  const [activeStatus, setActiveStatus] = useState<string>("All");
  const [activePriority, setActivePriority] = useState<string>("All");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null,
  );

  const handleUpdateTicket = (updated: SupportTicket) => {
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setSelectedTicket(updated);
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesStatus = activeStatus === "All" || t.status === activeStatus;
    const matchesPriority =
      activePriority === "All" || t.priority === activePriority;
    return matchesStatus && matchesPriority;
  });

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Support & Issue Resolution
            </h1>
            <p className="text-sm text-slate-500">
              Manage incoming inquiries, technical bug reports, and billing
              issues from school administrators.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Status:
            </span>
            {["All", "Open", "In Progress", "Resolved", "Closed"].map((st) => (
              <button
                key={st}
                onClick={() => setActiveStatus(st)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeStatus === st
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Priority:
            </span>
            {["All", "Urgent", "High", "Medium", "Low"].map((pr) => (
              <button
                key={pr}
                onClick={() => setActivePriority(pr)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activePriority === pr
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {pr}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="p-3">Ticket ID</th>
                  <th className="p-3">School</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Last Updated</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="p-3 font-mono font-bold text-indigo-600">
                        {t.ticketNumber}
                      </td>
                      <td className="p-3 font-bold text-slate-900">
                        {t.schoolName}
                      </td>
                      <td className="p-3 font-medium text-slate-800 max-w-xs truncate">
                        {t.subject}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                          {t.category}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            t.priority === "Urgent"
                              ? "bg-red-100 text-red-800"
                              : t.priority === "High"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {t.priority}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                            t.status === "Open"
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : t.status === "In Progress"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{t.updatedAt}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedTicket(t)}
                          className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded transition-colors"
                        >
                          Open Ticket
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      No tickets match the selected status or priority filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ticket Drawer */}
        {selectedTicket && (
          <TicketDetailDrawer
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
            onUpdateTicket={handleUpdateTicket}
          />
        )}
      </div>
    </SuperAdminLayout>
  );
}
