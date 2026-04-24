export const ResultsTable = () => {
  const subjects = [
    { name: "Mathematics", ca: 28, exam: 62, total: 90, grade: "A1" },
    { name: "English Language", ca: 24, exam: 58, total: 82, grade: "B2" },
    { name: "Physics", ca: 20, exam: 55, total: 75, grade: "B3" },
    { name: "Further Mathematics", ca: 29, exam: 65, total: 94, grade: "A1" },
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-[40px] overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-50 flex justify-between items-center">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">
          Termly Grades
        </h3>
        <button className="text-[10px] font-black text-[#923CF9] uppercase border border-[#923CF9]/20 px-4 py-2 rounded-xl hover:bg-[#923CF9] hover:text-white transition-all">
          Download PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="p-6 text-[10px] font-black uppercase text-slate-400">
                Subject
              </th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400">
                CA (30)
              </th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400">
                Exam (70)
              </th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400">
                Total (100)
              </th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400">
                Grade
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub, i) => (
              <tr
                key={i}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-all group"
              >
                <td className="p-6">
                  <p className="text-sm font-black text-slate-800">
                    {sub.name}
                  </p>
                </td>
                <td className="p-6 text-sm font-bold text-slate-500">
                  {sub.ca}
                </td>
                <td className="p-6 text-sm font-bold text-slate-500">
                  {sub.exam}
                </td>
                <td className="p-6 text-sm font-black text-slate-800">
                  {sub.total}
                </td>
                <td className="p-6">
                  <span
                    className={`text-[10px] font-black px-3 py-1 rounded-lg border shadow-sm ${
                      sub.grade.startsWith("A")
                        ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                        : "bg-blue-50 border-blue-100 text-blue-600"
                    }`}
                  >
                    {sub.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
