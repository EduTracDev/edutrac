import { PlusCircle } from "lucide-react";

interface ChartCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  loading?: boolean;
  isEmpty?: boolean;
  emptyActionText?: string;
  onEmptyAction?: () => void;
}

export function ChartCard({
  title,
  subtitle,
  children,
  loading,
  isEmpty,
  emptyActionText,
  onEmptyAction,
}: ChartCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-4xl p-6 lg:p-8 shadow-sm flex flex-col min-h-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      </div>

      <div className="flex-1 w-full flex items-center justify-center">
        {loading ? (
          // Skeleton Loader
          <div className="w-full h-full bg-slate-50 animate-pulse rounded-2xl" />
        ) : isEmpty ? (
          // Actionable Empty State
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
              <PlusCircle size={32} />
            </div>
            <p className="text-sm text-slate-500 mb-4 max-w-50">
              No data available to generate this report.
            </p>
            {onEmptyAction && (
              <button
                onClick={onEmptyAction}
                className="text-[#923CF9] text-sm font-bold hover:underline"
              >
                {emptyActionText || "Add Records"}
              </button>
            )}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
