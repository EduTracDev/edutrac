"use client";
import { useState, useMemo, useEffect } from "react";
import TeacherLayout from "@/modules/teacher/layout/TeacherLayout";
import { studentData } from "@/modules/constants/dashboard";
import { StudentTable } from "@/modules/school-admin/components/students/StudentTable";
import { ClassFilterBar } from "@/modules/school-admin/components/classes/ClassFilterBar";
import { ClassCardSkeleton } from "@/modules/school-admin/components/classes/ClassCardSkeleton";
import { ClassCard } from "@/modules/school-admin/components/classes/ClassCard";
import Modal from "@/modules/school-admin/components/dashboard/Modal";

type ClassCategory = "All" | "Junior" | "Senior" | "Primary";

export default function Page() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [category, setCategory] = useState<ClassCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // 1. First, define the source of truth: ONLY classes assigned to this teacher
  const assignedClasses = useMemo(() => {
    return Array.from(new Set(studentData.map((s) => s.class)))
      .filter((className): className is string => Boolean(className))
      .filter((name) => name.includes("Gold") || name.includes("Silver"));
  }, []);

  // 2. Filter the assigned classes based on UI inputs (Search/Category)
  const filteredTeacherClasses = useMemo(() => {
    return assignedClasses.filter((className) => {
      const matchesSearch = className
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      if (category === "All") return matchesSearch;
      if (category === "Junior")
        return matchesSearch && className.startsWith("JSS");
      if (category === "Senior")
        return (
          matchesSearch &&
          (className.startsWith("SS") || className.startsWith("SSS"))
        );

      return matchesSearch;
    });
  }, [assignedClasses, category, searchQuery]);

  const studentsInSelectedClass = useMemo(() => {
    if (!selectedClass) return [];
    return studentData.filter((s) => s.class === selectedClass);
  }, [selectedClass]);

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800">
              My Assigned Classes
            </h1>
            <p className="text-slate-500">
              Manage students and track performance for your current sessions.
            </p>
          </div>
        </header>

        {/* Reusing your Filter Bar */}
        <ClassFilterBar
          activeCategory={category}
          onCategoryChange={setCategory}
        />

        <div className="mb-6">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search my classes..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#923CF9] focus:ring-2 focus:ring-[#923CF9]/10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ClassCardSkeleton key={i} />
              ))
            : filteredTeacherClasses.map((name) => (
                <ClassCard
                  key={name}
                  className={name}
                  studentCount={
                    studentData.filter((s) => s.class === name).length
                  }
                  onViewStudents={(className) => setSelectedClass(className)}
                />
              ))}
        </div>

        <Modal
          isOpen={!!selectedClass}
          onClose={() => setSelectedClass(null)}
          title={`Class Roster: ${selectedClass}`}
        >
          <div className="mt-4">
            <StudentTable
              students={studentsInSelectedClass}
              onReset={() => {}}
              parentData={[]}
              studentParentLink={[]}
            />
          </div>
        </Modal>
      </div>
    </TeacherLayout>
  );
}
