"use client";
import { useState, useMemo } from "react";
import { CheckCircle, Clock, AlertCircle, Send } from "lucide-react";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import { Student, Parent } from "@/modules/types/dashboard";
import {
  studentData,
  studentParentLink,
  parentData,
  mockAttendanceData,
} from "@/modules/constants/dashboard";
import { ParentAlertModal } from "@/modules/school-admin/components/dashboard/modals/ParentAlertModal";

// 1. Define the Interface to fix 'any'
interface ClassRegisterStatus {
  id: string;
  name: string;
  teacherName: string;
  isSubmitted: boolean;
  submissionTime?: string;
}

const AttendanceStatusItem = ({ cls }: { cls: ClassRegisterStatus }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <div className="flex items-center gap-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          cls.isSubmitted
            ? "bg-emerald-100 text-emerald-600"
            : "bg-amber-100 text-amber-600"
        }`}
      >
        {cls.isSubmitted ? <CheckCircle size={20} /> : <Clock size={20} />}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-800">{cls.name}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase">
          {cls.teacherName}
        </p>
      </div>
    </div>
    <div className="text-right">
      {cls.isSubmitted ? (
        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase">
          Submitted {cls.submissionTime}
        </span>
      ) : (
        <button className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-1 rounded-md uppercase hover:bg-rose-100 transition-all">
          Send Reminder
        </button>
      )}
    </div>
  </div>
);

export default function Page() {
  const classes: ClassRegisterStatus[] = [
    {
      id: "1",
      name: "SS 3 Science",
      teacherName: "Adebayo Samuel",
      isSubmitted: true,
      submissionTime: "08:30 AM",
    },
    {
      id: "2",
      name: "JSS 2 Gold",
      teacherName: "Chinedu Okoro",
      isSubmitted: false,
    },
  ];

  // State to control the modal visibility and data
  const [selectedStudentForAlert, setSelectedStudentForAlert] = useState<{
    student: Student;
    parent: Parent;
  } | null>(null);

  const handleOpenAlert = (studentId: string) => {
    // Find the specific student from your master studentData
    const student = studentData.find((s) => s.id === studentId);

    // Find the link between this student and their parent
    const link = studentParentLink.find((l) => l.studentId === studentId);

    // Find the actual parent object using the parentId from the link
    const parent = parentData.find((p) => p.id === link?.parentId);

    if (student && parent) {
      setSelectedStudentForAlert({ student, parent });
    } else {
      // Optional: Add a toast notification here if data is missing
      console.error(
        `Missing data for ${studentId}. Student: ${!!student}, Parent: ${!!parent}`,
      );
    }
  };

  const handleSendAlert = (message: string, method: "sms" | "email") => {
    console.log(
      `Sending ${method} to ${selectedStudentForAlert?.parent.fullName}: ${message}`,
    );
    // Add your API call here (e.g., axios.post('/api/notifications', ...))
    setSelectedStudentForAlert(null); // Close modal on success
  };

  const todayAbsentees = useMemo(() => {
    return studentData.filter((s) => {
      const record = mockAttendanceData.find((a) => a.studentId === s.id);
      return record?.status === "absent";
    });
  }, []);
  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-black text-slate-800">
            Attendance Overview
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Monitor register submissions and manage student absences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1 & 2: Main Monitoring (The Classes) */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-800">
                Class Submissions
              </h2>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase">
                12/15 Complete
              </span>
            </div>

            <div className="grid gap-4">
              {classes.map((cls) => (
                <AttendanceStatusItem key={cls.id} cls={cls} />
              ))}
            </div>
          </section>

          {/* Column 3: The Action Sidebar (Unresolved Absences) */}
          <section className="bg-rose-50/50 rounded-[32px] border border-rose-100 p-6 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
                <AlertCircle size={20} />
              </div>
              <h2 className="text-lg font-black text-slate-800">
                Urgent: Absent
              </h2>
            </div>

            <div className="space-y-3">
              {todayAbsentees.length > 0 ? (
                todayAbsentees.map((student) => (
                  <div
                    key={student.id}
                    className="p-4 bg-white rounded-2xl border border-slate-100 flex justify-between items-center group hover:border-[#923CF9]/30 transition-all shadow-sm"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-black text-slate-800 truncate">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        JSS 2 Gold
                      </p>
                    </div>
                    <button
                      onClick={() => handleOpenAlert(student.id)}
                      className="shrink-0 bg-slate-900 text-white p-2 rounded-xl hover:bg-[#923CF9] transition-all"
                      title="Notify Parent"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-xs font-bold text-slate-400 italic">
                    No unresolved absences today.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {selectedStudentForAlert && (
          <ParentAlertModal
            isOpen={Boolean(selectedStudentForAlert)}
            student={selectedStudentForAlert.student}
            parent={selectedStudentForAlert.parent}
            onClose={() => setSelectedStudentForAlert(null)}
            onSend={handleSendAlert}
          />
        )}
      </div>
    </AdminLayout>
  );
}
