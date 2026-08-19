import Link from "next/link";
import { SuperAdminRoutes } from "@/routes/superAdmin.routes";

export default function SuperAdminDashboardPage() {
  const stats = [
    { label: "Total Schools", value: "128", change: "+12 this month", color: "border-indigo-500" },
    { label: "Active Schools", value: "114", change: "89% active rate", color: "border-emerald-500" },
    { label: "Pending/Inactive", value: "14", change: "Requires review", color: "border-amber-500" },
    { label: "Total Students", value: "48,250", change: "+2.4% vs last mo", color: "border-blue-500" },
    { label: "Total Teachers", value: "3,120", change: "15:1 ratio", color: "border-purple-500" },
    { label: "Total Parents", value: "38,900", change: "80% active app users", color: "border-sky-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
        <p className="text-sm text-slate-500">Real-time stats and metrics across all registered schools on EduTrac.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-white p-4 rounded-xl border-t-4 ${stat.color} border-x border-b border-slate-200 shadow-sm`}>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            <p className="text-[11px] text-slate-500 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Platform Activity</h2>
          <div className="space-y-4">
            {[
              { text: "St. Mary's Academy activated subscription (Pro Plan)", time: "10 mins ago", icon: "💳" },
              { text: "New school 'Greenwood High' requested registration", time: "1 hour ago", icon: "🏫" },
              { text: "System announcement dispatched to 128 School Admins", time: "3 hours ago", icon: "📢" },
              { text: "Role permission updated for 'Teacher' role", time: "1 day ago", icon: "🛡️" },
            ].map((act, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 text-sm">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-slate-100 rounded-lg">{act.icon}</span>
                  <span className="text-slate-700 font-medium">{act.text}</span>
                </div>
                <span className="text-xs text-slate-400">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
          <div className="flex flex-col gap-2">
            <Link href={SuperAdminRoutes.schools} className="p-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium rounded-lg text-sm flex items-center justify-between transition-colors">
              <span>➕ Add / Register New School</span>
              <span>→</span>
            </Link>
            <Link href={SuperAdminRoutes.users} className="p-3 bg-slate-50 text-slate-700 hover:bg-slate-100 font-medium rounded-lg text-sm flex items-center justify-between transition-colors">
              <span>👥 Manage Platform Users</span>
              <span>→</span>
            </Link>
            <Link href={SuperAdminRoutes.announcements} className="p-3 bg-slate-50 text-slate-700 hover:bg-slate-100 font-medium rounded-lg text-sm flex items-center justify-between transition-colors">
              <span>📢 Send Global Announcement</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}