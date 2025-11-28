import { Users, Package, DollarSign, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Total Products", value: "124", icon: Package, color: "bg-blue-500" },
    { label: "Total Users", value: "8,245", icon: Users, color: "bg-green-500" },
    { label: "Total Revenue", value: "$45,231", icon: DollarSign, color: "bg-purple-500" },
    { label: "Growth", value: "+12.5%", icon: TrendingUp, color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your store's performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-200">
            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 text-${stat.color.replace('bg-', '')}`}>
              <stat.icon size={24} className={stat.color.replace('bg-', 'text-')} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Chart or Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
          Chart Placeholder
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
          Recent Activity Placeholder
        </div>
      </div>
    </div>
  );
}
