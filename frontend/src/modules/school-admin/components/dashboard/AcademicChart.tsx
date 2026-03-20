"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AcademicDataPoint } from "@/modules/types/dashboard";

interface AcademicChartProps {
  data: AcademicDataPoint[];
}

const ACADEMIC_COLORS = {
  exceeding: "#923CF9", // Bright Purple
  meeting: "#0D9488", // Dark Teal
  below: "#1E293B", // Deep Slate
};

export default function AcademicChart({ data }: AcademicChartProps) {
  return (
    <div className="h-full w-full min-h-75">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#F1F5F9"
          />
          <XAxis
            dataKey="gradeLevel"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748B", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748B", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "#F8FAFC" }}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ paddingBottom: "20px", fontSize: "12px" }}
          />

          {/* Stacked Bars */}
          <Bar
            name="Exceeding"
            dataKey="exceeding"
            stackId="a"
            fill={ACADEMIC_COLORS.exceeding}
          />
          <Bar
            name="Meeting"
            dataKey="meeting"
            stackId="a"
            fill={ACADEMIC_COLORS.meeting}
            stroke="#fff"
            strokeWidth={1}
          />
          <Bar
            name="Below"
            dataKey="below"
            stackId="a"
            fill={ACADEMIC_COLORS.below}
            stroke="#fff"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
