import React, { useState, useEffect } from 'react';
import { Mail, Trash2, ToggleLeft, ToggleRight, Search, Download } from 'lucide-react';
import { apiFetch } from '../services/api';

const Newsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchSubscribers(); }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/newsletter/get-subscribers.php');
      setSubscribers(data.subscribers);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const toggleStatus = async (id, is_active) => {
    try {
      await apiFetch('/newsletter/update-subscriber.php', { method: 'POST', body: JSON.stringify({ id, is_active: is_active ? 0 : 1 }) });
      setSubscribers(prev => prev.map(s => s.id === id ? { ...s, is_active: s.is_active ? 0 : 1 } : s));
    } catch (e) { alert(e.message); }
  };

  const deleteSubscriber = async (id) => {
    if (!window.confirm('Remove this subscriber?')) return;
    try {
      await apiFetch('/newsletter/delete-subscriber.php', { method: 'POST', body: JSON.stringify({ id }) });
      setSubscribers(prev => prev.filter(s => s.id !== id));
    } catch (e) { alert(e.message); }
  };

  const exportCSV = () => {
    const csv = ['Email,Subscribed At,Status', ...subscribers.map(s => `${s.email},${s.subscribed_at},${s.is_active ? 'Active' : 'Inactive'}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'subscribers.csv'; a.click();
  };

  const filtered = subscribers.filter(s => s.email.toLowerCase().includes(search.toLowerCase()));
  const active = subscribers.filter(s => s.is_active).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-helvetica">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Newsletter</h1>
          <p className="text-sm text-gray-400">Manage your subscriber base.</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Subscribers', value: subscribers.length },
          { label: 'Active', value: active },
          { label: 'Inactive', value: subscribers.length - active },
        ].map(stat => (
          <div key={stat.label} className="bg-[#0B1220]/80 border border-gray-800 rounded-xl p-5 shadow-lg">
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#0B1220]/80 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-gray-800 bg-[#071120]">
          <div className="flex items-center bg-[#020817] rounded-lg border border-gray-800 px-3 py-1.5 w-80">
            <Search size={15} className="text-gray-500 mr-2" />
            <input type="text" placeholder="Search emails..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-sm text-white focus:outline-none w-full" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-[#0B1220] border-b border-gray-800">
              <tr>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Subscribed</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-[#0B79BF] animate-pulse">Loading subscribers...</td></tr>
              ) : filtered.map(s => (
                <tr key={s.id} className="hover:bg-[#14477B]/10 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#14477B]/30 flex items-center justify-center text-[#0B79BF]">
                      <Mail size={14} />
                    </div>
                    <span className="text-gray-300">{s.email}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{new Date(s.subscribed_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${s.is_active ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                      {s.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => toggleStatus(s.id, s.is_active)} title="Toggle status" className="text-gray-400 hover:text-[#0B79BF] transition-colors">
                        {s.is_active ? <ToggleRight size={20} className="text-green-400" /> : <ToggleLeft size={20} />}
                      </button>
                      <button onClick={() => deleteSubscriber(s.id)} className="text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">No subscribers found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
