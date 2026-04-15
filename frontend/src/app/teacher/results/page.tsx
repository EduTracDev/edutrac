"use client";
import { useState, useMemo } from "react";
import { Save, Search, CheckCircle2 } from "lucide-react";
import TeacherLayout from "@/modules/teacher/layout/TeacherLayout";
import ClassSwitcher from "@/modules/teacher/components/attendance/ClassSwitcher";
import { studentData } from "@/modules/constants/dashboard";
import { ResultRow } from "@/modules/teacher/components/results/ResultRow";
import { ResultsStats } from "@/modules/teacher/components/results/ResultStats";
import { CSVImportSection } from "@/modules/teacher/components/results/CSVImportSection";
import { ImportValidationModal } from "@/modules/teacher/components/results/ImportValidationModal";

const mySubjects = ["Mathematics", "English Language", "Further Math"];

interface ScoreSet {
  ca1: string;
  ca2: string;
  exam: string;
}

interface CSVRow {
  student_id: string;
  full_name: string;
  ca1_score: string | number;
  ca2_score: string | number;
  exam_score: string | number;
}

interface ValidationSummary {
  totalRows: number;
  matchedStudents: number;
  missingScores: number;
  invalidIds: string[];
}

type ClassScores = Record<string, ScoreSet>;

export default function TeacherResultsPage() {
  const myClasses = ["JSS 2 Gold", "SS 2 Science", "SS 3 Art"];
  const [selectedClass, setSelectedClass] = useState(myClasses[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(mySubjects[0]);
  const [status, setStatus] = useState<"idle" | "saving" | "published">("idle");

  // Scoring & Import State
  const [allScores, setAllScores] = useState<ClassScores>({});
  const [pendingData, setPendingData] = useState<CSVRow[]>([]);
  const [isValidationOpen, setIsValidationOpen] = useState(false);
  const [summary, setSummary] = useState<ValidationSummary | null>(null);

  const handleScoreChange = (
    studentId: string,
    category: keyof ScoreSet,
    value: string,
  ) => {
    setAllScores((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || { ca1: "", ca2: "", exam: "" }),
        [category]: value,
      },
    }));
  };

  const processImport = (data: CSVRow[]) => {
    const invalid = data.filter(
      (row) => !studentData.find((s) => s.id === row.student_id),
    );
    const missing = data.filter(
      (row) => !row.ca1_score || !row.ca2_score || !row.exam_score,
    );

    setSummary({
      totalRows: data.length,
      matchedStudents: data.length - invalid.length,
      missingScores: missing.length,
      invalidIds: invalid.map((i) => i.student_id),
    });

    setPendingData(data);
    setIsValidationOpen(true);
  };

  const confirmUpload = () => {
    const newScores: ClassScores = { ...allScores };
    pendingData.forEach((row) => {
      newScores[row.student_id] = {
        ca1: String(row.ca1_score),
        ca2: String(row.ca2_score),
        exam: String(row.exam_score),
      };
    });
    setAllScores(newScores);
    setIsValidationOpen(false);
    setStatus("published");
    setTimeout(() => setStatus("idle"), 3000);
  };

  const filteredStudents = useMemo(() => {
    return studentData.filter(
      (s) =>
        s.class?.toLowerCase().trim() === selectedClass.toLowerCase().trim() &&
        `${s.firstName} ${s.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    );
  }, [selectedClass, searchQuery]);

  const handlePublish = () => {
    setStatus("saving");
    setTimeout(() => {
      setStatus("published");
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <TeacherLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-20">
        <header className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-md py-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <div>
            <h1 className="text-2xl font-black text-slate-800">
              Result Management
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-black text-[#923CF9] bg-[#923CF9]/10 px-2 py-0.5 rounded uppercase tracking-wider">
                {selectedSubject}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                • First Term 2025/2026
              </span>
            </div>
          </div>

          <button
            onClick={handlePublish}
            disabled={status !== "idle"}
            className={`w-full md:w-auto px-8 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl ${
              status === "published"
                ? "bg-emerald-500 text-white shadow-emerald-100"
                : "bg-[#923CF9] text-white shadow-purple-200 hover:bg-[#8126e8]"
            } disabled:opacity-90`}
          >
            {status === "saving" ? (
              "Saving..."
            ) : status === "published" ? (
              <>
                <CheckCircle2 size={18} /> Published
              </>
            ) : (
              <>
                <Save size={18} /> Publish Results
              </>
            )}
          </button>
        </header>

        <CSVImportSection
          students={filteredStudents}
          subject={selectedSubject}
          className={selectedClass}
          onImportParsed={processImport}
        />

        <ResultsStats students={filteredStudents} allScores={allScores} />

        <section className="flex flex-col gap-6 p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Current Class
            </label>
            <ClassSwitcher
              classes={myClasses}
              activeClass={selectedClass}
              onClassChange={setSelectedClass}
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Current Subject
            </label>
            <div className="flex flex-wrap gap-2" role="radiogroup">
              {mySubjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedSubject === subject
                      ? "bg-[#923CF9] text-white shadow-lg shadow-purple-100"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="search"
            placeholder={`Search students in ${selectedClass}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#923CF9]/20 transition-all"
          />
        </div>

        <div className="space-y-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <ResultRow
                key={`${selectedClass}-${selectedSubject}-${student.id}`}
                student={student}
                scores={allScores[student.id] || { ca1: "", ca2: "", exam: "" }}
                onScoreChange={(cat, val) =>
                  handleScoreChange(student.id, cat, val)
                }
              />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">
                No students found for this selection.
              </p>
            </div>
          )}
        </div>
      </div>

      <ImportValidationModal
        isOpen={isValidationOpen}
        onClose={() => setIsValidationOpen(false)}
        onConfirm={confirmUpload}
        summary={summary}
      />
    </TeacherLayout>
  );
}
