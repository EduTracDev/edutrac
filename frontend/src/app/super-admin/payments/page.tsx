"use client";

import React, { useState, useMemo } from "react";
import SuperAdminLayout from "@/modules/super-admin/layout/SuperAdminLayout";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  Filter,
} from "lucide-react";

type PaymentStatus = "Successful" | "Pending" | "Failed" | "Refunded";
type PaymentMethod = "Card" | "Bank Transfer" | "USSD";

interface Transaction {
  id: string;
  reference: string;
  tenantName: string;
  planName: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  date: string;
  customerEmail: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx_101",
    reference: "EDT-20260824-8841",
    tenantName: "Greenwood International Academy",
    planName: "Enterprise Tier (Annual)",
    amount: 1500000,
    currency: "NGN",
    status: "Successful",
    method: "Bank Transfer",
    date: "2026-08-24 14:32",
    customerEmail: "billing@greenwood.edu.ng",
  },
  {
    id: "tx_102",
    reference: "EDT-20260824-7712",
    tenantName: "St. Gregory College",
    planName: "Pro Tier (Monthly)",
    amount: 180000,
    currency: "NGN",
    status: "Successful",
    method: "Card",
    date: "2026-08-24 11:15",
    customerEmail: "bursar@stgregory.edu.ng",
  },
  {
    id: "tx_103",
    reference: "EDT-20260823-4109",
    tenantName: "Crown Heights Grammar School",
    planName: "Starter Tier (Monthly)",
    amount: 75000,
    currency: "NGN",
    status: "Failed",
    method: "Card",
    date: "2026-08-23 18:45",
    customerEmail: "accounts@crownheights.sch.ng",
  },
  {
    id: "tx_104",
    reference: "EDT-20260822-9011",
    tenantName: "Apex Model Schools",
    planName: "Enterprise Tier (Annual)",
    amount: 1500000,
    currency: "NGN",
    status: "Pending",
    method: "Bank Transfer",
    date: "2026-08-22 09:10",
    customerEmail: "finance@apexmodelschools.org",
  },
  {
    id: "tx_105",
    reference: "EDT-20260820-1120",
    tenantName: "Meadow Hall School",
    planName: "Pro Tier (Annual)",
    amount: 1950000,
    currency: "NGN",
    status: "Refunded",
    method: "Bank Transfer",
    date: "2026-08-20 16:00",
    customerEmail: "admin@meadowhall.sch.ng",
  },
];

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((tx) => {
      const matchesSearch =
        tx.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" || tx.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const handleExportStatement = () => {
    const headers = [
      "Reference",
      "Date",
      "Tenant Name",
      "Customer Email",
      "Plan Name",
      "Amount (NGN)",
      "Payment Method",
      "Status",
    ];

    const rows = filteredTransactions.map((tx) => [
      `"${tx.reference}"`,
      `"${tx.date}"`,
      `"${tx.tenantName.replace(/"/g, '""')}"`,
      `"${tx.customerEmail}"`,
      `"${tx.planName.replace(/"/g, '""')}"`,
      tx.amount,
      `"${tx.method}"`,
      `"${tx.status}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    const currentDate = new Date().toISOString().split("T")[0];

    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `EduTrac_Payments_Statement_${currentDate}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case "Successful":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Failed":
        return "bg-red-50 text-red-700 border-red-200";
      case "Refunded":
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case "Successful":
        return <CheckCircle2 size={14} className="text-emerald-600" />;
      case "Pending":
        return <Clock size={14} className="text-amber-600" />;
      case "Failed":
        return <XCircle size={14} className="text-red-600" />;
      case "Refunded":
        return <RefreshCw size={14} className="text-slate-600" />;
    }
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Payments & Revenue
            </h1>
            <p className="text-sm text-slate-500">
              Monitor platform subscription revenue, transaction histories, and
              financial logs.
            </p>
          </div>
          <button
            onClick={handleExportStatement}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl shadow-md hover:bg-brand/90 transition-all self-start md:self-auto cursor-pointer"
          >
            <Download size={16} />
            Export Statement
          </button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Revenue (YTD)
              </span>
              <div className="p-2.5 bg-brand/10 text-brand rounded-xl">
                <DollarSign size={18} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">
                ₦42,850,000
              </h3>
              <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                <ArrowUpRight size={14} /> +18.4% vs last month
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Monthly Rec. Revenue (MRR)
              </span>
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <TrendingUp size={18} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">₦5,400,000</h3>
              <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                <ArrowUpRight size={14} /> +6.2% net expansion
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Successful Payments
              </span>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">98.2%</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                1,420 completed transactions
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Pending / Failed
              </span>
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <CreditCard size={18} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">₦255,000</h3>
              <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
                <ArrowDownRight size={14} /> 3 failed attempts today
              </p>
            </div>
          </div>
        </div>

        {/* Table & Controls Container */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Table Filters Header */}
          <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-80">
              <Search
                size={16}
                className="absolute left-3.5 top-3 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reference, tenant, or email..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                <Filter size={14} /> Status:
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="ALL">All Statuses</option>
                <option value="Successful">Successful</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="p-4">Reference & Date</th>
                  <th className="p-4">School / Tenant</th>
                  <th className="p-4">Plan</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-mono font-bold text-slate-900">
                        {tx.reference}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {tx.date}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-slate-800">
                        {tx.tenantName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {tx.customerEmail}
                      </p>
                    </td>
                    <td className="p-4 font-medium text-slate-600">
                      {tx.planName}
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900">
                      ₦{tx.amount.toLocaleString()}
                    </td>
                    <td className="p-4 font-medium text-slate-600">
                      {tx.method}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                          tx.status,
                        )}`}
                      >
                        {getStatusIcon(tx.status)}
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedTx(tx)}
                        className="px-3 py-1.5 font-bold text-brand hover:bg-brand/10 rounded-lg transition-colors"
                      >
                        View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction Details Modal */}
        {selectedTx && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 text-sm">
                  Transaction Receipt
                </h3>
                <button
                  onClick={() => setSelectedTx(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-4 text-xs">
                <div className="text-center pb-4 border-b border-slate-100 space-y-1">
                  <span className="text-slate-400 uppercase text-[10px] font-bold">
                    Total Paid
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 font-mono">
                    ₦{selectedTx.amount.toLocaleString()}
                  </h2>
                  <div className="pt-2 flex justify-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold ${getStatusBadge(
                        selectedTx.status,
                      )}`}
                    >
                      {getStatusIcon(selectedTx.status)}
                      {selectedTx.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 font-medium">
                  <div className="flex justify-between text-slate-500">
                    <span>Reference</span>
                    <span className="font-mono font-bold text-slate-800">
                      {selectedTx.reference}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Tenant</span>
                    <span className="font-bold text-slate-800">
                      {selectedTx.tenantName}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Plan Purchased</span>
                    <span className="text-slate-800">
                      {selectedTx.planName}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Payment Method</span>
                    <span className="text-slate-800">{selectedTx.method}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Date & Time</span>
                    <span className="font-mono text-slate-800">
                      {selectedTx.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedTx(null)}
                  className="px-4 py-2 font-bold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SuperAdminLayout>
  );
}
