"use client";

import React, { useState } from "react";
import { SupportTicket, TicketStatus, TicketPriority } from "../types/support.types";

interface TicketDetailDrawerProps {
  ticket: SupportTicket;
  onClose: () => void;
  onUpdateTicket: (updated: SupportTicket) => void;
}

export function TicketDetailDrawer({ ticket, onClose, onUpdateTicket }: TicketDetailDrawerProps) {
  const [replyText, setReplyText] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = (newStatus: TicketStatus) => {
    onUpdateTicket({
      ...ticket,
      status: newStatus,
      updatedAt: "Just now",
    });
  };

  const handlePriorityChange = (newPriority: TicketPriority) => {
    onUpdateTicket({
      ...ticket,
      priority: newPriority,
      updatedAt: "Just now",
    });
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 500));

    const newMessage = {
      id: `msg_${Date.now()}`,
      senderName: "Super Admin Support",
      senderRole: "Super Admin" as const,
      message: replyText,
      timestamp: "Just now",
      isInternalNote: isInternal,
    };

    onUpdateTicket({
      ...ticket,
      status: ticket.status === "Open" ? "In Progress" : ticket.status,
      updatedAt: "Just now",
      messages: [...ticket.messages, newMessage],
    });

    setReplyText("");
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-400">{ticket.ticketNumber}</span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-200 text-slate-700">
                {ticket.category}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 line-clamp-1">{ticket.subject}</h2>
            <p className="text-xs text-slate-500">School: <strong className="text-slate-800">{ticket.schoolName}</strong></p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 font-bold">
            ✕
          </button>
        </div>

        {/* Ticket Metadata Controls */}
        <div className="px-6 py-3 bg-slate-100/70 border-b border-slate-200 grid grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase">Status</label>
            <select
              value={ticket.status}
              onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
              className="mt-1 w-full bg-white border border-slate-300 rounded p-1.5 font-bold text-slate-800 outline-none"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase">Priority</label>
            <select
              value={ticket.priority}
              onChange={(e) => handlePriorityChange(e.target.value as TicketPriority)}
              className="mt-1 w-full bg-white border border-slate-300 rounded p-1.5 font-bold text-slate-800 outline-none"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Message Thread */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4 bg-slate-50/50">
          {ticket.messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-xl border space-y-2 text-xs ${
                msg.isInternalNote
                  ? "bg-amber-50/80 border-amber-200 text-amber-900"
                  : msg.senderRole === "Super Admin"
                  ? "bg-indigo-50/80 border-indigo-200 text-slate-800"
                  : "bg-white border-slate-200 text-slate-800 shadow-sm"
              }`}
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{msg.senderName}</span>
                  {msg.isInternalNote && (
                    <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase bg-amber-200 text-amber-800 rounded">
                      Internal Note
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
              </div>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>

        {/* Reply Form Footer */}
        <form onSubmit={handleSendReply} className="p-4 border-t border-slate-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <span>Post as internal team note (hidden from school)</span>
            </label>
          </div>

          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={isInternal ? "Write an internal note for super admins..." : "Type your official reply to the school..."}
            rows={3}
            className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              disabled={isSubmitting || !replyText.trim()}
              className={`px-4 py-2 text-xs font-bold text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 ${
                isInternal ? "bg-amber-600 hover:bg-amber-700" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isSubmitting && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {isInternal ? "Save Internal Note" : "Send Reply"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}