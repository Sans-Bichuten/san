import React, { useState, useEffect } from 'react';
import { Activity, Search, RefreshCw, ShieldCheck, User } from 'lucide-react';
import { apiFetch } from '../services/api';

const ACTION_COLORS = {
  login: 'bg-green-500/10 text-green-400 border-green-500/20',
  logout: 'bg-gray-500/10 text-gray-400 border-gray-600/20',
  delete: 'bg-red-500/10 text-red-400 border-red-500/20',
  create: 'bg-[#0B79BF]/10 text-[#0B79BF] border-[#0B79BF]/20',
  update: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  default: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const getActionColor = (action = '') => {
  const a = action.toLowerCase();
  if (a.includes('login')) return ACTION_COLORS.login;
  if (a.includes('logout')) return ACTION_COLORS.logout;
  if (a.includes('delet')) return ACTION_COLORS.delete;
  if (a.includes('creat') || a.includes('add')) return ACTION_COLORS.create;
  if (a.includes('updat') || a.includes('edit') || a.includes('save')) return ACTION_COLORS.update;
  return ACTION_COLORS.default;
};

const getActionIcon = (action = '') => {
  const a = action.toLowerCase();
  if (a.includes('login') || a.includes('logout')) return ShieldCheck;
  return Activity;
};

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterAdmin, setFilterAdmin] = useState('');

  useEffect(() => { fetchLogs(); }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/activity-logs/get-logs.php');
      setLogs(data.logs || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const admins = [...new Set(logs.map(l => l.admin_name).filter(Boolean))];

  const filtered = logs.filter(log => {
    const matchSearch = !search || [log.action, log.admin_name, log.admin_email, log.ip_address]
      .some(f => f?.toLowerCase().includes(search.toLowerCase()));
    const matchAdmin = !filterAdmin || log.admin_name === filterAdmin;
    return matchSearch && matchAdmin;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-helvetica">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Activity Logs</h1>
          <p className="text-sm text-gray-400">Full audit trail of admin actions — last 200 events.</p>
        </div>
        <button
          onClick={fetchLogs}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors disabled:opacity-60"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: logs.length },
          { label: 'Admins Active', value: admins.length },
          { label: 'Logins', value: logs.filter(l => l.action?.toLowerCase().includes('login')).length },
          { label: 'Deletions', value: logs.filter(l => l.action?.toLowerCase().includes('delet')).length },
        ].map(stat => (
          <div key={stat.label} className="bg-[#0B1220]/80 border border-gray-800 rounded-xl p-4 shadow-lg">
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center bg-[#0B1220] rounded-lg border border-gray-800 px-3 py-1.5 flex-1 min-w-[200px] max-w-md">
          <Search size={15} className="text-gray-500 mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search actions, admins, IPs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-white focus:outline-none w-full"
          />
        </div>
        <select
          value={filterAdmin}
          onChange={e => setFilterAdmin(e.target.value)}
          className="px-3 py-1.5 bg-[#0B1220] border border-gray-800 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-[#0B79BF]"
        >
          <option value="">All Admins</option>
          {admins.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        {(search || filterAdmin) && (
          <button
            onClick={() => { setSearch(''); setFilterAdmin(''); }}
            className="text-xs text-gray-500 hover:text-white transition-colors px-2"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Log Table */}
      <div className="bg-[#0B1220]/80 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-8 text-center text-[#0B79BF] animate-pulse">Loading activity logs...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Activity size={36} className="mx-auto mb-3 opacity-30" />
            <p>No activity logs found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800/60">
            {filtered.map((log, idx) => {
              const ActionIcon = getActionIcon(log.action);
              const colorClass = getActionColor(log.action);
              return (
                <div key={log.id || idx} className="flex items-start gap-4 px-5 py-4 hover:bg-[#14477B]/5 transition-colors">
                  {/* Icon */}
                  <div className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${colorClass}`}>
                    <ActionIcon size={14} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
                        {log.action}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User size={11} />
                        {log.admin_name || 'Unknown'} {log.admin_email ? `· ${log.admin_email}` : ''}
                      </span>
                      <span>IP: {log.ip_address || '—'}</span>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-500">
                      {new Date(log.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-gray-600">
                      {new Date(log.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!loading && filtered.length > 0 && (
        <p className="text-xs text-gray-600 text-center">
          Showing {filtered.length} of {logs.length} events
        </p>
      )}
    </div>
  );
};

export default ActivityLogs;
