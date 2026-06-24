import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../services/api';
import { FileText, Briefcase, Users, Mail, Activity, Server, ShieldCheck, Clock, UserCheck } from 'lucide-react';

const DashboardCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-[#0B1220]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-6 shadow-lg relative overflow-hidden group">
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#0B79BF]/10 rounded-full blur-2xl group-hover:bg-[#0B79BF]/20 transition-all duration-500"></div>
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
      <div className="p-3 bg-[#14477B]/20 rounded-lg border border-[#14477B]/30 text-[#0B79BF]">
        <Icon size={20} />
      </div>
    </div>
    {trend && (
      <div className="mt-4 text-xs font-medium text-[#0B79BF] flex items-center gap-1 relative z-10">
        <Activity size={12} /> {trend}
      </div>
    )}
  </div>
);

const ActivityTable = ({ logs }) => (
  <div className="bg-[#0B1220]/80 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden shadow-lg">
    <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-[#071120]">
      <h3 className="font-semibold text-white flex items-center gap-2">
        <Clock size={16} className="text-[#0B79BF]" /> Recent Activity
      </h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-400 uppercase bg-[#0B1220] border-b border-gray-800">
          <tr>
            <th className="px-6 py-3 font-medium">Admin</th>
            <th className="px-6 py-3 font-medium">Action</th>
            <th className="px-6 py-3 font-medium">IP Address</th>
            <th className="px-6 py-3 font-medium">Timestamp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {logs.length > 0 ? logs.map((log, index) => (
            <tr key={index} className="hover:bg-[#14477B]/10 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-300">{log.admin_name}</td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  log.action.includes('Failed') ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  log.action.includes('Logout') ? 'bg-gray-500/10 text-gray-400 border border-gray-500/20' :
                  'bg-green-500/10 text-green-400 border border-green-500/20'
                }`}>
                  {log.action}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 font-mono text-xs">{log.ip_address}</td>
              <td className="px-6 py-4 text-gray-400">{new Date(log.created_at).toLocaleString()}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No recent activity found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const Dashboard = () => {
  const { admin } = useAuth();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalCaseStudies: 0,
    totalLeads: 0,
    unreadLeads: 0,
    newsletterSubscribers: 0,
    activeSubscribers: 0,
    activeAdmins: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiFetch('/dashboard/stats.php');
        setStats(data.stats);
        setRecentActivity(data.recentActivity);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="animate-pulse flex items-center justify-center h-full text-[#0B79BF]">Loading operations...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Operations Overview</h1>
          <p className="text-sm text-gray-400">Welcome back, {admin?.name}. Here is what's happening today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <DashboardCard title="Total Blogs" value={stats.totalBlogs} icon={FileText} trend="Published content" />
        <DashboardCard title="Case Studies" value={stats.totalCaseStudies} icon={Briefcase} trend="Published" />
        <DashboardCard title="Total Leads" value={stats.totalLeads} icon={Users} trend={stats.unreadLeads > 0 ? `${stats.unreadLeads} unread` : 'All read'} />
        <DashboardCard title="Subscribers" value={stats.newsletterSubscribers} icon={Mail} trend={`${stats.activeSubscribers} active`} />
        <DashboardCard title="Active Admins" value={stats.activeAdmins} icon={UserCheck} trend="Registered users" />
        <DashboardCard title="Unread Leads" value={stats.unreadLeads} icon={Activity} trend={stats.unreadLeads > 0 ? 'Action needed' : 'All caught up'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Main Activity Column */}
        <div className="lg:col-span-2">
          <ActivityTable logs={recentActivity} />
        </div>

        {/* System Status Column */}
        <div className="space-y-6">
          <div className="bg-[#0B1220]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
              <Server size={16} className="text-[#0B79BF]" /> Infrastructure Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Website Status</span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-500/10 px-2.5 py-1 rounded border border-green-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Online
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">API Gateway</span>
                <span className="text-xs font-medium text-green-400">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">SSL Certificate</span>
                <span className="text-xs font-medium text-[#0B79BF] flex items-center gap-1"><ShieldCheck size={14}/> Active</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-800">
              <button className="w-full py-2 bg-[#14477B]/20 hover:bg-[#14477B]/40 text-[#0B79BF] text-sm font-medium rounded-lg transition-colors border border-[#14477B]/30">
                Run System Diagnostics
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
