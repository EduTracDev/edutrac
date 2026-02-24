import DashboardPage from "@/modules/school-owner/page/DashboardPage/dashboardPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edutrac - School Owner Dashboard",
  description: "School Owner Dashboard",
};

export default function SchoolOwnerDashboardPage() {
  return <DashboardPage />;
}
