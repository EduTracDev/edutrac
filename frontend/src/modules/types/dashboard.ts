export interface AcademicDataPoint {
  gradeLevel: string;
  exceeding: number;
  meeting: number;
  below: number;
}

export interface ActivityItem {
  id: string;
  type: "payment" | "admission" | "academic";
  title: string;
  subtitle: string;
  time: string;
}

//  Define the shape of a single data point
export interface EnrollmentDataPoint {
  period: string;
  students: number;
}

//  Define the shape of the component's PROPS
export interface EnrollmentChartProps {
  data: EnrollmentDataPoint[];
}

export interface GenderDataPoint {
  name: string;
  value: number;
  fill: string;
}

interface GenderChartProps {
  data: GenderDataPoint[];
}

// Define the types of actions that can trigger a modal
export type ActiveModal =
  | "announcement"
  | "class"
  | "admission"
  | "teacher"
  | "student"
  | "parent"
  | "result"
  | null;
