import { WardProvider } from "@/modules/context/WardContext";
import ParentLayout from "@/modules/parent/layout/ParentLayout";
import { Ward } from "@/modules/types/dashboard";

//  (This would eventually come from an API)
const MOCK_WARDS: Ward[] = [
  {
    id: "1",
    name: "Adebayo Johnson",
    class: "JSS 2 Gold",
    gender: "male",
  },
  {
    id: "2",
    name: "Chidi Johnson",
    class: "SS 1 Science",
    gender: "male",
  },
];

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WardProvider initialWards={MOCK_WARDS}>
      <ParentLayout>{children}</ParentLayout>
    </WardProvider>
  );
}
