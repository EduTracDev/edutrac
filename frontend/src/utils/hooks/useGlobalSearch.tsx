import { useState, useMemo, useEffect, useRef } from "react";
import {
  studentData,
  parentData,
  teacherData,
} from "@/modules/constants/dashboard";

export type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  type: "Student" | "Parent" | "Teacher";
  href: string;
};

export const useGlobalSearch = () => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Keyboard Shortcut Listener (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const searchStr = query.toLowerCase();

    // Mapping logic for students, parents, and teachers
    const students = studentData
      .filter((s) =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchStr),
      )
      .map((s) => ({
        id: s.id,
        title: `${s.firstName} ${s.lastName}`,
        subtitle: `Student • ID: ${s.id}`,
        type: "Student" as const,
        href: `/school-admin/students/${s.id}`,
      }));

    const parents = parentData
      .filter((p) => p.fullName.toLowerCase().includes(searchStr))
      .map((p) => ({
        id: p.id,
        title: p.fullName,
        subtitle: `Parent • ${p.phoneNumber}`,
        type: "Parent" as const,
        href: `/school-admin/parents/${p.id}`,
      }));

    const teachers = teacherData
      .filter((t) => t.name.toLowerCase().includes(searchStr))
      .map((t) => ({
        id: t.id,
        title: t.name,
        subtitle: `Teacher • ${t.subject}`,
        type: "Teacher" as const,
        href: `/school-admin/teachers/${t.id}`,
      }));

    return [...students, ...parents, ...teachers].slice(0, 6);
  }, [query]);

  return { query, setQuery, results, inputRef };
};
