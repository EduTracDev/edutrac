// "use client";
// import { useState } from "react";
// import { CheckCircle2, Users, Save, ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import { studentData } from "@/modules/constants/dashboard";
// import { AttendanceRow } from "@/modules/shared/component/attendance/AttendanceRow";
// import { AttendanceStatus } from "@/modules/types/dashboard";
// import { mockAttendanceData } from "@/modules/constants/dashboard";

// export default function Page({ params }: { params: { classId: string } }) {
//   const [attendance, setAttendance] = useState<
//     Record<string, AttendanceStatus>
//   >({});

//   const markAllPresent = () => {
//     const allPresent = studentData.reduce(
//       (acc, student) => {
//         acc[student.id] = "present";
//         return acc;
//       },
//       {} as Record<string, AttendanceStatus>,
//     );
//     setAttendance(allPresent);
//   };

//   const handleStatusChange = (id: string, status: AttendanceStatus) => {
//     setAttendance((prev) => ({ ...prev, [id]: status }));
//   };

//   const [attendance, setAttendance] = useState<
//     Record<string, AttendanceStatus>
//   >(() => {
//     return mockAttendanceData.reduce(
//       (acc, curr) => {
//         acc[curr.studentId] = curr.status;
//         return acc;
//       },
//       {} as Record<string, AttendanceStatus>,
//     );
//   });

//   return (
//     <div className="min-h-screen bg-slate-50 pb-24">
//       {/* Mobile Sticky Header */}
//       <header className="sticky top-0 z-20 bg-white border-b border-slate-100 p-4 flex items-center justify-between">
//         <Link href="/dashboard/classes" className="p-2 -ml-2 text-slate-400">
//           <ArrowLeft size={20} />
//         </Link>
//         <div className="text-center">
//           <h1 className="text-sm font-black text-slate-800">
//             Attendance: SS 3
//           </h1>
//           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
//             Wednesday, April 1
//           </p>
//         </div>
//         <button
//           className="text-[#923CF9] font-bold text-xs"
//           onClick={markAllPresent}
//         >
//           All Present
//         </button>
//       </header>

//       <main className="p-4">
//         {/* Quick Stats */}
//         <div className="grid grid-cols-3 gap-3 mb-6">
//           <div className="bg-white p-3 rounded-2xl border border-slate-100 text-center">
//             <p className="text-[10px] font-bold text-slate-400 uppercase">
//               Present
//             </p>
//             <p className="text-lg font-black text-emerald-500">
//               {Object.values(attendance).filter((v) => v === "present").length}
//             </p>
//           </div>
//           {/* Repeat for Absent and Late */}
//         </div>

//         {/* Student List */}
//         <div className="space-y-1">
//           {studentData.map((student) => (
//             <AttendanceRow
//               key={student.id}
//               student={student}
//               status={attendance[student.id] || "unmarked"}
//               onStatusChange={handleStatusChange}
//             />
//           ))}
//         </div>
//       </main>

//       {/* Floating Action Footer */}
//       <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 flex gap-4">
//         <button className="flex-1 bg-[#923CF9] text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-[#923CF9]/20 flex items-center justify-center gap-2">
//           <Save size={18} />
//           Submit Registers
//         </button>
//       </div>
//     </div>
//   );
// }
