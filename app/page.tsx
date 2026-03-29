import { Plus } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, John Doe!</h1>
        <p className="text-gray-500">Here's what's happening with your tasks today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Tasks" value="5" sub="All tasks" color="blue" />
        <StatCard label="Completed" value="1" sub="Tasks finished" color="green" />
        <StatCard label="Pending" value="3" sub="In progress" color="orange" />
        <StatCard label="Overdue" value="0" sub="Need attention" color="red" />
      </div>

      {/* Progress & Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-6">Weekly Progress</h3>
          <div className="text-4xl font-bold mb-2">50%</div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div className="bg-slate-900 h-3 rounded-full w-1/2"></div>
          </div>
        </div>
        {/* Add your Chart component here */}
      </div>

      <button className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
        <Plus size={28} />
      </button>
    </div>
  );
}

function StatCard({ label, value, sub, color }: any) {
  const colors: any = {
    blue: "border-blue-500",
    green: "border-green-500",
    orange: "border-orange-400",
    red: "border-red-500"
  };
  return (
    <div className={`bg-white p-6 rounded-2xl border-l-4 ${colors[color]} shadow-sm`}>
      <p className="text-gray-500 text-sm font-semibold">{label}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
      <p className="text-gray-400 text-xs mt-1">{sub}</p>
    </div>
  );
}