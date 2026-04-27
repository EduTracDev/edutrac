// @/modules/parent/components/dashboard/StaffWidget.tsx
import { MessageSquare, Phone, Star } from "lucide-react";

export const StaffWidget = () => {
  const staff = [
    {
      name: "Mr. Olumide",
      role: "Class Teacher",
      contact: "08012345678",
      isClassTeacher: true,
    },
    {
      name: "Mrs. Okonjo",
      role: "Principal",
      contact: "08087654321",
      isClassTeacher: false,
    },
  ];

  return (
    <div className="p-6 bg-white border border-slate-100 rounded-[32px] space-y-6">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">
        Contacts
      </h3>
      <div className="space-y-3">
        {staff.map((person) => (
          <div
            key={person.name}
            className={`p-4 rounded-2xl flex items-center justify-between transition-all ${
              person.isClassTeacher
                ? "bg-[#923CF9]/5 border border-[#923CF9]/10"
                : "hover:bg-slate-50"
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-black text-slate-800">
                  {person.name}
                </p>
                {person.isClassTeacher && (
                  <Star size={12} className="text-[#923CF9] fill-[#923CF9]" />
                )}
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                {person.role}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-white rounded-xl shadow-sm text-slate-400 hover:text-[#923CF9] transition-all">
                <Phone size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
