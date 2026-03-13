"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

//  Define the shape of a single data point
export interface EnrollmentDataPoint {
  period: string;
  students: number;
}

//  Define the shape of the component's PROPS
interface EnrollmentChartProps {
  data: EnrollmentDataPoint[];
}
export default function EnrollmentChart({ data }: EnrollmentChartProps) {
  return (
    <div className="h-full w-full min-h-75 cursor-pointer">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#923CF9" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#923CF9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#F1F5F9"
          />
          <XAxis
            dataKey="period"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748B", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748B", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="students"
            stroke="#923CF9"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorStudents)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
