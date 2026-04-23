"use client";
import { useState, useMemo, useEffect } from "react";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import { studentData } from "@/modules/constants/dashboard";
import { StudentTable } from "@/modules/school-admin/components/students/StudentTable";
import { ClassFilterBar } from "@/modules/school-admin/components/classes/ClassFilterBar";
import { ClassCardSkeleton } from "@/modules/school-admin/components/classes/ClassCardSkeleton";
import { ClassCard } from "@/modules/school-admin/components/classes/ClassCard";
import Modal from "@/modules/shared/component/Modal";

// Define local type
type ClassCategory = "All" | "Junior" | "Senior" | "Primary";

export default function Page() {
  const [category, setCategory] = useState<ClassCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // Simulate a loading state for smooth UI
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  //  Get the students for the specific class selected
  const studentsInSelectedClass = useMemo(() => {
    if (!selectedClass) return [];
    return studentData.filter((s) => s.class === selectedClass);
  }, [selectedClass]);

  // Get unique classes and filter them for the Directory view
  const filteredClasses = useMemo(() => {
    const allUniqueClasses = Array.from(
      new Set(
        studentData
          .map((s) => s.class)
          .filter((className): className is string => Boolean(className)),
      ),
    );

    return allUniqueClasses.filter((className) => {
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
  }, [category, searchQuery]);

  return (
    <AdminLayout>
      <section className="bg-slate-50/50 px-8 py-4 rounded-[40px] border border-slate-100">
        <header className="mb-8">
          <h2 className="text-2xl font-black text-slate-800">
            Class Directory
          </h2>
          <p className="text-slate-500 text-sm">
            Jump to other classes in the system.
          </p>
        </header>

        <ClassFilterBar
          activeCategory={category}
          onCategoryChange={setCategory}
        />

        <div className="mb-6">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search classes"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#923CF9] focus:ring-2 focus:ring-[#923CF9]/10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? // Render 6 skeleton cards while "loading"
              Array.from({ length: 6 }).map((_, i) => (
                <ClassCardSkeleton key={i} />
              ))
            : // Render the actual cards
              filteredClasses.map((name) => (
                <ClassCard
                  key={name}
                  className={name}
                  studentCount={
                    studentData.filter((s) => s.class === name).length
                  }
                  onViewStudents={(name) => setSelectedClass(name)}
                />
              ))}
        </div>
        {/*  The "Quick View" Modal */}
        {selectedClass && (
          <Modal
            isOpen={!!selectedClass}
            onClose={() => setSelectedClass(null)}
            title={`Students in ${selectedClass}`}
          >
            <div className="mt-4">
              <div className="mb-4 p-4 bg-[#923CF9]/5 rounded-2xl flex justify-between items-center">
                <span className="text-xs font-bold text-[#923CF9] uppercase tracking-widest">
                  Roster Summary
                </span>
                <span className="text-sm font-black text-slate-700">
                  {studentsInSelectedClass.length} Enrolled
                </span>
              </div>

              <StudentTable
                students={studentsInSelectedClass}
                onReset={() => {}}
                parentData={[]}
                studentParentLink={[]}
              />
            </div>
          </Modal>
        )}
      </section>
    </AdminLayout>
  );
}
