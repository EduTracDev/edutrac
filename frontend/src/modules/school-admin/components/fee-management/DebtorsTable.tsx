// @/modules/school-admin/components/finance/DebtorsTable.tsx

import { FinancialRecord } from "@/modules/types/dashboard";
import { DebtorMobileCard } from "./DebtorMobileCard";
import { DebtorTableRow } from "./DebtorTableRow";

export const DebtorsTable = ({
  records,
  onViewDetails,
}: {
  records: FinancialRecord[];
  onViewDetails: (record: FinancialRecord) => void;
}) => {
  const handleRemind = (id: string) => {
    // This would eventually link to your WhatsApp/SMS Modal
    console.log("Reminding student:", id);
  };

  return (
    <div className="w-full">
      {/* Desktop Header & Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-400">
            <tr>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest">
                Student
              </th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest">
                Payment Status
              </th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest">
                Balance
              </th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest">
                Type
              </th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <DebtorTableRow
                key={rec.id}
                record={rec}
                onView={() => onViewDetails(rec)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stack */}
      <div className="md:hidden p-4 bg-slate-50/30">
        {records.map((rec) => (
          <DebtorMobileCard
            key={rec.id}
            record={rec}
            onRemind={handleRemind}
            onView={() => onViewDetails(rec)}
            onViewStatement={(id) => console.log("Statement for:", id)}
          />
        ))}
      </div>
    </div>
  );
};
