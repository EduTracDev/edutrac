export const ClassCardSkeleton = () => {
  return (
    <div className="bg-slate-50 border border-slate-100 p-6 rounded-[32px] min-h-[200px] animate-pulse">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-slate-200 rounded-2xl" />
        <div className="w-8 h-8 bg-slate-200 rounded-full" />
      </div>

      <div className="h-6 bg-slate-200 rounded-lg w-3/4 mb-2" />
      <div className="h-3 bg-slate-100 rounded-lg w-1/2" />

      <div className="mt-auto pt-4 border-t border-slate-100 space-y-3">
        <div className="h-3 bg-slate-100 rounded-lg w-full" />
        <div className="flex justify-between">
          <div className="h-4 bg-slate-200 rounded-lg w-1/3" />
          <div className="h-4 bg-slate-100 rounded-full w-1/4" />
        </div>
      </div>
    </div>
  );
};
