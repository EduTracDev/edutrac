import React, { useState } from "react";

interface BulkSMSData {
  recipientGroup: string;
  message: string;
}

interface BulkSMSProps {
  onClose: () => void;
  onSend: (data: BulkSMSData) => void;
}

export const BulkSMSModal = ({ onClose, onSend }: BulkSMSProps) => {
  const [formData, setFormData] = useState<BulkSMSData>({
    recipientGroup: "All Parents & Staff",
    message: "",
  });

  const CHARACTER_LIMIT = 160;
  const messageUnits =
    Math.ceil(formData.message.length / CHARACTER_LIMIT) || 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-2xl font-black text-slate-900">
              Broadcast SMS
            </h3>
            <p className="text-sm text-slate-500">
              Instantly reach your school community.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                Target Recipients
              </label>
              <select
                value={formData.recipientGroup}
                onChange={(e) =>
                  setFormData({ ...formData, recipientGroup: e.target.value })
                }
                className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                <option>All Parents & Staff</option>
                <option>Parents Only</option>
                <option>Staff Only</option>
                <option>JSS 1 Parents</option>
              </select>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Message
                </label>
                <span
                  className={`text-[10px] font-bold ${formData.message.length > CHARACTER_LIMIT ? "text-orange-500" : "text-slate-300"}`}
                >
                  {formData.message.length} / {CHARACTER_LIMIT} ({messageUnits}{" "}
                  Unit{messageUnits > 1 ? "s" : ""})
                </span>
              </div>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Type your emergency broadcast here..."
                className="w-full p-4 bg-slate-900 text-emerald-400 font-mono rounded-2xl text-sm h-32 resize-none focus:ring-2 focus:ring-emerald-500 outline-none shadow-inner"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-4 text-sm font-bold text-slate-400 transition-colors hover:text-slate-600"
            >
              Discard
            </button>
            <button
              onClick={() => onSend(formData)}
              disabled={!formData.message.trim()}
              className="flex-1 py-4 text-sm font-bold bg-[#25D366] text-white rounded-2xl hover:bg-[#128C7E] shadow-lg shadow-green-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Send via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
