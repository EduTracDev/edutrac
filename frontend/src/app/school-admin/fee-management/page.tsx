"use client";
import { useState, useMemo } from "react";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import StatCard from "@/modules/school-admin/components/dashboard/StatCard";
import { DebtorsTable } from "@/modules/school-admin/components/fee-management/DebtorsTable";
import {
  mockDebtors,
  mockExpenses,
  paymentHistoryMock,
} from "@/modules/constants/dashboard";
import { formatCurrency } from "@/utils/currency";
import { Wallet, Users, AlertCircle, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import { FeeReminderModal } from "@/modules/school-admin/components/dashboard/modals/FeeReminderModal";
import ExpensesModal from "@/modules/school-admin/components/dashboard/modals/ExpensesModal";
import { FinancialRecord } from "@/modules/types/dashboard";
import { PaymentHistoryModal } from "@/modules/school-admin/components/dashboard/modals/PaymentHistoryModal";
import { ExpenseSummaryCard } from "@/modules/school-admin/components/dashboard/ExpensesSummaryCard";
import { useDashboardForms } from "@/utils/hooks/useDashboardForm";
import { ExpenseLedger } from "@/modules/school-admin/components/fee-management/ExpenseLedger";

export default function FeeManagementPage() {
  const [records] = useState(mockDebtors);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [viewingHistory, setViewingHistory] = useState<FinancialRecord | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // 2. Calculate summary stats dynamically
  const stats = useMemo(() => {
    const totalOutstanding = records.reduce((sum, r) => sum + r.balance, 0);
    const criticalDebtors = records.filter(
      (r) => r.status === "Overdue",
    ).length;

    return {
      totalOutstanding,
      debtorCount: records.length,
      criticalDebtors,
    };
  }, [records]);
  const totalExpenses = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalBudget = mockExpenses.reduce((sum, exp) => sum + exp.budget, 0);

  const handleExpenseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // API logic
    } finally {
      setIsSubmitting(false);
    }
  };

  const { closeModal, formErrors } = useDashboardForms();

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Fee Management
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Track student payments and outstanding balances.
            </p>
          </div>

          {/* Trigger Button */}
          <button
            onClick={() => setActiveModal("fee-reminder-preview")}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-[#923CF9] text-white rounded-[20px] font-bold shadow-lg shadow-[#923CF9]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Send size={18} strokeWidth={3} />
            Remind All Debtors
          </button>
        </div>
        {/*  Summary Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Outstanding"
            value={formatCurrency(stats.totalOutstanding)}
            icon={Wallet}
            color="text-red-600"
            bgColor="bg-red-50"
            description={
              <p className="text-[10px] font-bold text-slate-500">
                Uncollected revenue for this term
              </p>
            }
          />
          <StatCard
            title="Total Debtors"
            value={stats.debtorCount}
            icon={Users}
            color="text-[#923CF9]"
            bgColor="bg-[#923CF9]/5"
            description={
              <p className="text-[10px] font-bold text-slate-500">
                Students with unpaid balances
              </p>
            }
          />
          <StatCard
            title="Critical Overdue"
            value={stats.criticalDebtors}
            icon={AlertCircle}
            color="text-amber-600"
            bgColor="bg-amber-50"
            description={
              <p className="text-[10px] font-bold text-amber-700">
                Immediate attention required
              </p>
            }
          />
        </div>
        {/* 3. NEW: Cash Flow Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <>
            {" "}
            <ExpenseSummaryCard
              total={totalExpenses}
              budget={totalBudget}
              month="March"
              isExpanded={showDetails}
              onClick={() => setShowDetails(!showDetails)}
            />
            {showDetails && <ExpenseLedger />}
          </>

          {/* Optional: Add a "Quick Expense" trigger or a mini-chart here */}
          <div className="bg-[#923CF9] p-6 rounded-3xl text-white flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg">Expense Management</h3>
              <p className="text-white/70 text-xs">
                Record new outflows and school maintenance costs.
              </p>
            </div>
            <button
              onClick={() => setActiveModal("expenses")}
              className="w-full py-3 bg-white text-[#923CF9] font-bold rounded-2xl hover:bg-slate-50 transition-colors mt-4"
            >
              Log New Expense
            </button>
          </div>
        </div>
        {/* 4. The Debtors Table Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">
              Debtors List
            </h2>
          </div>

          <section className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
            {/* Pass the mock data records here */}
            <DebtorsTable
              records={records}
              onViewDetails={(record) => setViewingHistory(record)}
            />
          </section>
          {viewingHistory && (
            <PaymentHistoryModal
              isOpen={!!viewingHistory}
              onClose={() => setViewingHistory(null)}
              studentName={viewingHistory?.studentName || ""}
              history={paymentHistoryMock} // In real app, this would be viewingHistory.history
              totalPaid={viewingHistory?.amountPaid || 0}
            />
          )}
          {activeModal === "fee-reminder-preview" && (
            <FeeReminderModal
              debtorsCount={stats.debtorCount}
              totalAmount={stats.totalOutstanding}
              onClose={() => setActiveModal(null)}
              onConfirm={async () => {
                const t = toast.loading("Broadcasting reminders...");
                await new Promise((res) => setTimeout(res, 2000));
                toast.success("Reminders sent successfully!", { id: t });
                setActiveModal(null);
              }}
            />
          )}
          {activeModal === "expenses" && (
            <ExpensesModal
              isOpen={true}
              onClose={() => setActiveModal(null)}
              onSubmit={async (e) => {
                await handleExpenseSubmit(e);
                // Add any Fee-specific logic here (like refreshing the summary)
              }}
              errors={formErrors}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
