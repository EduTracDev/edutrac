"use client";
import { useState, useMemo, ReactNode } from "react";
import { Check, X, Clock, Save, Users, Search } from "lucide-react";
import TeacherLayout from "@/modules/teacher/layout/TeacherLayout";
import { studentData } from "@/modules/constants/dashboard";
import ClassSwitcher from "@/modules/teacher/components/attendance/ClassSwitcher";

type AttendanceStatus = "present" | "absent" | "late" | null;

interface AttendanceRecord {
  [studentId: string]: AttendanceStatus;
}

export default function Page() {
  const [attendance, setAttendance] = useState<AttendanceRecord>({});
  const myAssignedClasses = useMemo(() => ["JSS 2 Gold", "SS 3 Science"], []);
  //  Initialize with the first available class
  const [selectedClass, setSelectedClass] = useState(myAssignedClasses[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Robust Filter Logic
  const filteredStudents = useMemo(() => {
    return studentData.filter((s) => {
      // Case-insensitive class match
      const classMatch =
        s.class?.toLowerCase().trim() === selectedClass.toLowerCase().trim();

      // Search match
      const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
      const searchMatch = fullName.includes(searchQuery.toLowerCase());

      return classMatch && searchMatch;
    });
  }, [selectedClass, searchQuery]);

  //  "Mark All Present" Logic
  const markAllPresent = () => {
    const bulkUpdate: AttendanceRecord = {};
    filteredStudents.forEach((s) => (bulkUpdate[s.id] = "present"));
    setAttendance((prev) => ({ ...prev, ...bulkUpdate }));
  };

  const updateStatus = (id: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  return (
    <TeacherLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-4">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
              Select Class to Mark
            </label>
            <ClassSwitcher
              classes={myAssignedClasses}
              activeClass={selectedClass}
              onClassChange={setSelectedClass}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={markAllPresent}
              className="px-4 py-2 bg-emerald-50 text-emerald-600 text-xs font-black rounded-xl hover:bg-emerald-100 transition-all flex items-center gap-2"
            >
              <Check size={14} /> Mark All Present
            </button>
            <button className="px-6 py-2 bg-[#923CF9] text-white text-xs font-black rounded-xl shadow-lg shadow-purple-200 flex items-center gap-2 hover:bg-[#8126e8]">
              <Save size={14} /> Submit Register
            </button>
          </div>
        </header>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search student name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl outline-none focus:border-[#923CF9] transition-all"
            />
          </div>
          {/* Class Switcher would go here */}
        </div>

        {/* The Attendance List */}
        <section className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Student
                </th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="group hover:bg-slate-50/30 transition-colors"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                        {student.firstName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">
                          {student.firstName} {student.lastName}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          ID: {student.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-center gap-2">
                      <StatusToggle
                        active={attendance[student.id] === "present"}
                        onClick={() => updateStatus(student.id, "present")}
                        variant="present"
                        icon={<Check size={16} />}
                      />
                      <StatusToggle
                        active={attendance[student.id] === "late"}
                        onClick={() => updateStatus(student.id, "late")}
                        variant="late"
                        icon={<Clock size={16} />}
                      />
                      <StatusToggle
                        active={attendance[student.id] === "absent"}
                        onClick={() => updateStatus(student.id, "absent")}
                        variant="absent"
                        icon={<X size={16} />}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStudents.length === 0 && !isLoading && (
            <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">
                No students found in {selectedClass}
              </p>
              <p className="text-[10px] text-slate-300 uppercase mt-1">
                Check your data constants for naming mismatches
              </p>
            </div>
          )}
        </section>
      </div>
    </TeacherLayout>
  );
}

// Helper Component for the Toggle Buttons
type AttendanceVariant = "present" | "late" | "absent";
interface StatusToggleProps {
  active: boolean;
  onClick: () => void;
  variant: AttendanceVariant;
  icon: ReactNode;
}
const StatusToggle = ({
  active,
  onClick,
  variant,
  icon,
}: StatusToggleProps) => {
  const styles = {
    present: active
      ? "bg-emerald-500 text-white"
      : "bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500",
    late: active
      ? "bg-amber-500 text-white"
      : "bg-slate-50 text-slate-400 hover:bg-amber-50 hover:text-amber-500",
    absent: active
      ? "bg-rose-500 text-white"
      : "bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500",
  };

  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={`Mark as ${variant}`}
      aria-pressed={active}
      className={`p-3 rounded-xl transition-all duration-200 ${styles[variant as keyof typeof styles]}`}
    >
      {icon}
    </button>
  );
};
