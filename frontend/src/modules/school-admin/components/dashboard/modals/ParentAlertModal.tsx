"use client";
import { useState, useMemo, useEffect } from "react";
import { Send, Phone, Mail, AlertTriangle, X, Users } from "lucide-react";
import { Student, Parent } from "@/modules/types/dashboard";
import Modal from "../Modal";

interface ParentAlertModalProps {
  isOpen: boolean;
  student: Student;
  parent: Parent;
  onClose: () => void;
  onSend: (message: string, method: "sms" | "email") => void;
}

export const ParentAlertModal = ({
  isOpen,
  student,
  parent,
  onClose,
  onSend,
}: ParentAlertModalProps) => {
  const [method, setMethod] = useState<"sms" | "email">("sms");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Auto-generate the message template
  const messageTemplate = useMemo(() => {
    // Check if data exists; if not, return empty so it doesn't crash
    if (!student || !parent) return "";
    const greeting = `Dear ${parent.fullName},`;
    const body = `This is to inform you that ${student.firstName} ${student.lastName} was marked ABSENT from school today, ${new Date().toLocaleDateString()}.`;
    return `${greeting} ${body} Please contact the office if this is an error.`;
  }, [student, parent]);

  useEffect(() => {
    if (isOpen && messageTemplate) setMessage(messageTemplate);
  }, [isOpen, messageTemplate]);

  const handleSend = () => {
    if (!message.trim()) return;
    setIsLoading(true);
    onSend(message, method);
  };

  return (
    <Modal isOpen={isOpen} title="Notify Parent" onClose={onClose}>
      <div className="p-1 space-y-5">
        {/* Recipient Card */}
        {parent && student && (
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm shrink-0">
              <Users size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black text-slate-800 truncate">
                {parent?.fullName}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Parent of {student?.firstName}
              </p>
            </div>
          </div>
        )}

        {/* Delivery Method Toggle */}
        <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setMethod("sms")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-black transition-all ${method === "sms" ? "bg-white text-[#923CF9] shadow-sm" : "text-slate-400 hover:text-slate-500"}`}
          >
            <Phone size={14} /> SMS Alert
          </button>
          <button
            type="button"
            onClick={() => setMethod("email")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-black transition-all ${method === "email" ? "bg-white text-[#923CF9] shadow-sm" : "text-slate-400 hover:text-slate-500"}`}
          >
            <Mail size={14} /> Email Alert
          </button>
        </div>

        {/* Message Area */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
            Message Preview
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
            className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-3xl text-sm text-slate-700 focus:ring-2 focus:ring-[#923CF9]/30 focus:border-transparent resize-none font-medium leading-relaxed disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            placeholder="Message will be composed and sent to the parent..."
          />
        </div>

        {/* Warning Footer */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
          <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
            Note: Sending via SMS will consume 1 credit from the school wallet.
            Verify the parent&apos;s number:
            <span className="font-black"> {parent?.phoneNumber}</span>
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 pt-4 flex gap-3 border-t border-slate-100 bg-slate-50/50">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="flex-1 py-3 text-sm font-black text-slate-400 hover:text-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSend}
          disabled={isLoading || !message.trim()}
          className="flex-2 bg-[#923CF9] text-white py-3 rounded-2xl font-black text-sm shadow-lg shadow-[#923CF9]/20 flex items-center justify-center gap-2 hover:shadow-[#923CF9]/30 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          <Send size={18} />
          {isLoading ? "Sending..." : "Confirm & Send"}
        </button>
      </div>
    </Modal>
  );
};
