import React, { useState, useEffect } from 'react';
import { Users, Search, Mail, Trash2, CheckCircle, Download, MessageCircle } from 'lucide-react';
import { apiFetch } from '../services/api';

const statusBadge = (isRead) => isRead
  ? <span className="px-2 py-0.5 rounded-full text-xs bg-gray-700 text-gray-400 border border-gray-600">Read</span>
  : <span className="px-2 py-0.5 rounded-full text-xs bg-[#0B79BF]/20 text-[#0B79BF] border border-[#0B79BF]/30 font-semibold">New</span>;

const exportCSV = (leads) => {
  const headers = ['ID', 'Name', 'Email', 'Phone', 'Organization', 'Industry', 'Service', 'Message', 'Submitted At'];
  const rows = leads.map(l => [
    l.id, l.name, l.email, l.phone || '', l.organization || '',
    l.industry || '', l.service || '',
    (l.message || '').replace(/"/g, '""'),
    new Date(l.submitted_at).toLocaleString()
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `bichuten-leads-${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
};

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/leads/get-leads.php');
      setLeads(data.leads);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const markRead = async (id, is_read) => {
    try {
      await apiFetch('/leads/update-lead.php', { method: 'POST', body: JSON.stringify({ id, is_read: is_read ? 0 : 1 }) });
      setLeads(prev => prev.map(l => l.id === id ? { ...l, is_read: l.is_read ? 0 : 1 } : l));
      if (selected?.id === id) setSelected(prev => ({ ...prev, is_read: prev.is_read ? 0 : 1 }));
    } catch (e) { alert(e.message); }
  };

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await apiFetch('/leads/delete-lead.php', { method: 'POST', body: JSON.stringify({ id }) });
      setLeads(prev => prev.filter(l => l.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (e) { alert(e.message); }
  };

  const filtered = leads.filter(l =>
    [l.name, l.email, l.organization, l.industry].some(f => f?.toLowerCase().includes(search.toLowerCase()))
  );

  const unread = leads.filter(l => !l.is_read).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-helvetica">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Leads</h1>
          <p className="text-sm text-gray-400">Contact form submissions from your website.</p>
        </div>
        <div className="flex items-center gap-3">
          {unread > 0 && (
            <div className="px-4 py-2 bg-[#0B79BF]/10 border border-[#0B79BF]/30 rounded-lg text-[#0B79BF] text-sm font-semibold">
              {unread} unread lead{unread !== 1 ? 's' : ''}
            </div>
          )}
          <button
            onClick={() => exportCSV(filtered)}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-[#14477B]/30 hover:bg-[#14477B]/60 border border-[#14477B]/50 text-[#4da6e7] rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download size={15} /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[70vh]">
        {/* List Panel */}
        <div className="bg-[#0B1220]/80 border border-gray-800 rounded-xl overflow-hidden flex flex-col shadow-lg">
          <div className="p-3 border-b border-gray-800 bg-[#071120]">
            <div className="flex items-center bg-[#020817] rounded-lg border border-gray-800 px-3 py-1.5">
              <Search size={15} className="text-gray-500 mr-2 flex-shrink-0" />
              <input type="text" placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-sm text-white focus:outline-none w-full" />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-gray-800">
            {loading ? (
              <div className="p-6 text-center text-[#0B79BF] animate-pulse">Loading leads...</div>
            ) : filtered.map(lead => (
              <div
                key={lead.id}
                onClick={() => { setSelected(lead); if (!lead.is_read) markRead(lead.id, lead.is_read); }}
                className={`p-4 cursor-pointer hover:bg-[#14477B]/10 transition-colors ${selected?.id === lead.id ? 'bg-[#14477B]/20 border-l-2 border-[#0B79BF]' : ''} ${!lead.is_read ? 'bg-[#0B79BF]/5' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-white text-sm">{lead.name}</p>
                  {statusBadge(lead.is_read)}
                </div>
                <p className="text-xs text-gray-400">{lead.organization} · {lead.industry}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(lead.submitted_at).toLocaleDateString()}</p>
              </div>
            ))}
            {!loading && filtered.length === 0 && <div className="p-6 text-center text-gray-500">No leads found.</div>}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="bg-[#0B1220]/80 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
          {selected ? (
            <div className="h-full flex flex-col">
              <div className="p-5 border-b border-gray-800 bg-[#071120] flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-white">{selected.name}</h2>
                  <p className="text-sm text-gray-400">{selected.organization}</p>
                </div>
                <div className="flex gap-2 flex-wrap justify-end">
                  {/* WhatsApp Quick Reply */}
                  {selected.phone && (
                    <a
                      href={`https://wa.me/${selected.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(selected.name)}%2C%20this%20is%20Bichuten%20Data%20Vault%20team%20reaching%20out%20regarding%20your%20inquiry.`}
                      target="_blank" rel="noreferrer"
                      title="Reply via WhatsApp"
                      className="p-2 text-gray-400 hover:text-[#25D366] transition-colors border border-gray-700 rounded-lg hover:border-[#25D366]/50"
                    >
                      <MessageCircle size={16} />
                    </a>
                  )}
                  {/* Email Quick Reply */}
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your Inquiry - Bichuten Data Vault&body=Dear ${selected.name},%0A%0AThank you for reaching out to Bichuten Data Vault.%0A%0AKind regards,%0ABichuten Team`}
                    title="Reply via Email"
                    className="p-2 text-gray-400 hover:text-[#0B79BF] transition-colors border border-gray-700 rounded-lg hover:border-[#0B79BF]/50"
                  >
                    <Mail size={16} />
                  </a>
                  <button onClick={() => markRead(selected.id, selected.is_read)} title={selected.is_read ? 'Mark unread' : 'Mark read'}
                    className="p-2 text-gray-400 hover:text-[#0B79BF] transition-colors border border-gray-700 rounded-lg hover:border-[#0B79BF]/50">
                    <CheckCircle size={16} />
                  </button>
                  <button onClick={() => deleteLead(selected.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors border border-gray-700 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-5 space-y-4 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Email</p>
                    <a href={`mailto:${selected.email}`} className="text-[#0B79BF] hover:text-white transition-colors break-all">{selected.email}</a>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-gray-300">{selected.phone || '—'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Industry</p>
                    <p className="text-gray-300 capitalize">{selected.industry}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Service Interest</p>
                    <p className="text-gray-300 capitalize">{selected.service}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Message</p>
                  <div className="bg-[#020817] border border-gray-800 rounded-lg p-4 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {selected.message || 'No message provided.'}
                  </div>
                </div>
                <p className="text-xs text-gray-600">Submitted: {new Date(selected.submitted_at).toLocaleString()}</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-600">
              <div className="text-center">
                <Users size={40} className="mx-auto mb-3 opacity-30" />
                <p>Select a lead to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leads;
