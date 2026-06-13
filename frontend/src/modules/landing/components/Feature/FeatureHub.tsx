"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, BookOpen, ClipboardList, Calendar, CheckCircle2, ChevronDown } from "lucide-react";


function StudentMockup() {
  const courses = [
    { name: "Science", color: "bg-purple-100", dot: "bg-purple-400", hours: "5:30hrs", lessons: "05 Lessons", isActive: true },
    { name: "Design and Branding", color: "bg-orange-100", dot: "bg-orange-400", hours: "4:00hrs", lessons: "03 Lessons", isActive: false },
    { name: "AI and Robotics", color: "bg-blue-100", dot: "bg-blue-400", hours: "4:00hrs", lessons: "03 Lessons", isActive: false },
  ];

  return (
    <img src="/students-img.png" alt="students Mockup" className="" />
  );
}

function TeacherMockup() {
  const rows = [
    { date: "Jan 01, 2022", amount: "$2,000.00", status: "Completed", color: "bg-green-500" },
    { date: "Jan 04, 2022", amount: "$2,000.00", status: "Pending", color: "bg-yellow-400" },
    { date: "Jan 06, 2022", amount: "$2,000.00", status: "On Hold", color: "bg-red-500" },
  ];

  return (
    <img src="/teachers-img.png" alt="teachers Mockup" className="" />
  );
}

function ParentMockup() {
  const tasks = [
    { name: "Agossou Semilnko", task: "Analyze content for media social", section: "PLANNING" },
    { name: "Prosper Sossou", task: "Make a complex styleguide", section: null },
    { name: "Melchior Houessou", task: "Research UX for new landing page", section: null },
    { name: "Bernard Agbahounde", task: "Development new landing page", section: "DEVELOPMENT" },
    { name: "Henry Mooney", task: "Responsive new landing page", section: null },
  ];

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const avatarColors = [
    "bg-purple-200 text-purple-700",
    "bg-green-200 text-green-700",
    "bg-blue-200 text-blue-700",
    "bg-orange-200 text-orange-700",
    "bg-pink-200 text-pink-700",
  ];

  const grouped: { section: string | null; items: typeof tasks }[] = [];
  tasks.forEach((t) => {
    if (t.section) grouped.push({ section: t.section, items: [t] });
    else grouped[grouped.length - 1]?.items.push(t);
  });

  return (
    <img src="/parents-img.png" alt="parents Mockup" className="" />
  );
}

function AdminMockup() {
  const rows = [
    { date: "Jan 01, 2022", amount: "$2,000.00", status: "Completed", color: "bg-green-500" },
    { date: "Jan 04, 2022", amount: "$2,000.00", status: "Pending", color: "bg-yellow-400" },
    { date: "Jan 06, 2022", amount: "$2,000.00", status: "On Hold", color: "bg-red-500" },
  ];

  return (
    <img src="/admins-img.png" alt="admins Mockup" className="" />
  );
}

// ─── Feature Row ──────────────────────────────────────────────────────────────

interface RoleFeature {
  badge: string;
  title: string;
  description: string;
  mockup: React.ReactNode;
  isReversed: boolean;
}

function FeatureRow({ badge, title, description, mockup, isReversed }: RoleFeature) {
  return (
    <div
      className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"
        } items-center gap-10 md:gap-16 mb-12 last:mb-0`}
    >
      {/* Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex-1 flex justify-center w-full"
      >
        {mockup}
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 24 : -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex-1 space-y-4"
      >
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-600">
          {badge}
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
          {title}
        </h3>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-md">
          {description}
        </p>
      </motion.div>


    </div>
  );
}

export default function FeatureHub() {
  const rows: RoleFeature[] = [
    {
      badge: "For Students",
      title: "Access Your Classes, Homework & Grades—Always at Your Fingertips, Stay on Track, Stay Ahead",
      description:
        "Stay on top of school life with ease. Students can quickly check classes, homework, grades, and attendance—all in one simple, user-friendly space.",
      mockup: <StudentMockup />,
      isReversed: false,
    },
    {
      badge: "For Teachers",
      title: "Classroom Management, Simplified, Stop spending hours on paperwork.",
      description:
        "EduTrac's intuitive dashboard lets you manage student records, track attendance, update grades in just a few clicks. Automate routine tasks and feedback for common assessments, giving you more time to focus on what matters most—teaching.",
      mockup: <TeacherMockup />,
      isReversed: true,
    },
    {
      badge: "For Parents",
      title: "Get real-time updates on your child's progress, attendance, and grades.",
      description:
        "EduTrac's platform ensures education continues seamlessly whether students are in the classroom, at home, or on the go—making learning accessible to everyone.",
      mockup: <ParentMockup />,
      isReversed: false,
    },
    {
      badge: "For Admins",
      title: "Manage student data, monitor staff activity, and generate reports with ease.",
      description:
        "EduTrac's intuitive dashboard lets you manage student records, track attendance, and grade assessments in just a few clicks. Automate routine tasks and feedback for common assessments, giving you more time to focus on what matters most—teaching.",
      mockup: <AdminMockup />,
      isReversed: true,
    },
  ];

  return (
    <section className="py-12 bg-white" aria-label="Role Features">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Better Learning Journeys for Everywhere
          </h2>
          <p className="mt-3 text-base text-slate-400">Students, Teachers, and Parents</p>
        </div>

        {rows.map((row, i) => (
          <FeatureRow key={i} {...row} />
        ))}
      </div>
    </section>
  );
}