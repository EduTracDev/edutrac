import React from "react";
interface PTAMeetingData {
  date: string;
  time: string;
  agenda: string;
}

// 2. Update the Props to use that type instead of any
interface PTAModalProps {
  onClose: () => void;
  onSubmit: (data: PTAMeetingData) => void;
}

export const SchedulePTAModal = ({ onClose, onSubmit }: PTAModalProps) => {
  // To make this fully functional, we should track the local state
  const [formData, setFormData] = React.useState<PTAMeetingData>({
    date: "",
    time: "",
    agenda: "",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-2xl font-black text-slate-900">Schedule PTA</h3>
            <p className="text-sm text-slate-500">
              Send meeting invites to all parents.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                Agenda / Brief
              </label>
              <textarea
                value={formData.agenda}
                onChange={(e) =>
                  setFormData({ ...formData, agenda: e.target.value })
                }
                placeholder="Discussing Term 2 performance..."
                className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm h-24 resize-none focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(formData)} // Now correctly typed!
              disabled={!formData.date || !formData.agenda} // Basic validation
              className="flex-1 py-4 text-sm font-bold bg-[#923CF9] text-white rounded-2xl shadow-lg shadow-purple-100 hover:bg-[#8126e8] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Schedule & Notify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
