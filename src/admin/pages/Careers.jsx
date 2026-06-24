import React, { useState, useEffect } from 'react';
import { Briefcase, Search, Mail, Trash2, CheckCircle, Download, FileText, Phone, MapPin, Award, DollarSign, Calendar, ExternalLink } from 'lucide-react';
import { apiFetch } from '../services/api';

const statusBadge = (status) => {
  const styles = {
    immediate: 'bg-green-500/20 text-green-400 border-green-500/30',
    notice: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    employed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    fresher: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    freelancer: 'bg-teal-500/20 text-teal-400 border-teal-500/30'
  };

  const labels = {
    immediate: 'Immediate',
    notice: 'Notice Period',
    employed: 'Employed',
    fresher: 'Fresher',
    freelancer: 'Freelancer'
  };

  const styleClass = styles[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  const label = labels[status] || status;

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs border font-semibold ${styleClass}`}>
      {label}
    </span>
  );
};

const exportCSV = (careers) => {
  const headers = ['ID', 'Name', 'Email', 'Phone', 'Role Applied For', 'Current Job Profile', 'Employment Status', 'Expected Salary', 'Notice Period', 'LinkedIn', 'Address', 'Education', 'Experience', 'Message', 'Submitted At'];
  const rows = careers.map(c => [
    c.id, c.name, c.email, c.phone, c.expected_role, c.current_job_profile || '',
    c.employment_status, c.expected_salary || '', c.notice_period || '',
    c.linkedin || '', c.address || '', c.last_education || '',
    (c.experience || '').replace(/"/g, '""'),
    (c.message || '').replace(/"/g, '""'),
    new Date(c.submitted_at).toLocaleString()
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `bichuten-careers-${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
};

const Careers = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchCareers(); }, []);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/careers/get-careers.php');
      setCandidates(data.careers || []);
      if (data.careers && data.careers.length > 0) {
        setSelected(data.careers[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this career application? This will permanently remove their details and resume.')) return;
    try {
      await apiFetch('/careers/delete-career.php', {
        method: 'POST',
        body: JSON.stringify({ id })
      });
      setCandidates(prev => prev.filter(c => c.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (e) {
      alert(e.message);
    }
  };

  const filtered = candidates.filter(c =>
    [c.name, c.email, c.expected_role, c.current_job_profile, c.last_education].some(f =>
      f?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-helvetica text-gray-300">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Career Applications</h1>
          <p className="text-sm text-gray-400">Job applications and candidate profile submissions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-[#0B79BF]/10 border border-[#0B79BF]/30 rounded-lg text-[#0B79BF] text-sm font-semibold">
            {candidates.length} total applicant{candidates.length !== 1 ? 's' : ''}
          </div>
          <button
            onClick={() => exportCSV(filtered)}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-[#14477B]/30 hover:bg-[#14477B]/60 border border-[#14477B]/50 text-[#4da6e7] rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Download size={15} /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[72vh]">
        {/* List Panel (5 columns) */}
        <div className="lg:col-span-5 bg-[#0B1220]/80 border border-gray-800 rounded-xl overflow-hidden flex flex-col shadow-lg">
          <div className="p-3 border-b border-gray-800 bg-[#071120]">
            <div className="flex items-center bg-[#020817] rounded-lg border border-gray-800 px-3 py-1.5">
              <Search size={15} className="text-gray-500 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-sm text-white focus:outline-none w-full placeholder:text-gray-600"
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-gray-800">
            {loading ? (
              <div className="p-6 text-center text-[#0B79BF] animate-pulse">Loading applications...</div>
            ) : filtered.map(cand => (
              <div
                key={cand.id}
                onClick={() => setSelected(cand)}
                className={`p-4 cursor-pointer hover:bg-[#14477B]/10 transition-colors ${
                  selected?.id === cand.id ? 'bg-[#14477B]/20 border-l-2 border-[#0B79BF]' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-white text-sm">{cand.name}</p>
                  {statusBadge(cand.employment_status)}
                </div>
                <p className="text-xs text-gray-400">
                  <strong className="text-[#0B79BF]">{cand.expected_role}</strong>
                  {cand.current_job_profile && ` (Currently: ${cand.current_job_profile})`}
                </p>
                <div className="flex justify-between items-center mt-2 text-[10px] text-gray-500">
                  <span>{cand.email}</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    {new Date(cand.submitted_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {!loading && filtered.length === 0 && (
              <div className="p-6 text-center text-gray-500">No applications found.</div>
            )}
          </div>
        </div>

        {/* Detail Panel (7 columns) */}
        <div className="lg:col-span-7 bg-[#0B1220]/80 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
          {selected ? (
            <div className="h-full flex flex-col">
              <div className="p-5 border-b border-gray-800 bg-[#071120] flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-white">{selected.name}</h2>
                  <p className="text-xs text-[#0B79BF] font-semibold uppercase tracking-wider mt-0.5">
                    {selected.expected_role} Applicant
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/bichuten_backend/admin/careers/download-resume.php?id=${selected.id}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Download Candidate Resume"
                    className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-[#0B79BF] text-white border border-transparent rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Download size={14} /> Resume
                  </a>
                  <button
                    onClick={() => deleteApplication(selected.id)}
                    className="p-2 text-gray-400 hover:text-red-400 border border-gray-700 rounded-lg hover:border-red-900/30 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm">
                
                {/* Profile Grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-gray-800 pb-5">
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Current Job Profile</p>
                    <p className="text-gray-200">{selected.current_job_profile || 'None Specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Employment Status</p>
                    <p className="text-gray-200 capitalize">{selected.employment_status}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Expected Salary / CTC</p>
                    <p className="text-gray-200">{selected.expected_salary || 'Negotiable / Not Specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Notice Period</p>
                    <p className="text-gray-200">{selected.notice_period || 'Not Specified'}</p>
                  </div>
                </div>

                {/* Contact details */}
                <div className="space-y-3 border-b border-gray-800 pb-5">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-4 h-4 text-[#0B79BF]" />
                    <a href={`mailto:${selected.email}`} className="hover:text-white hover:underline">{selected.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-4 h-4 text-[#0B79BF]" />
                    <a href={`tel:${selected.phone}`} className="hover:text-white hover:underline">{selected.phone}</a>
                  </div>
                  {selected.linkedin && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <ExternalLink className="w-4 h-4 text-[#0B79BF]" />
                      <a
                        href={selected.linkedin.startsWith('http') ? selected.linkedin : `https://${selected.linkedin}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white hover:underline"
                      >
                        {selected.linkedin}
                      </a>
                    </div>
                  )}
                  {selected.address && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin className="w-4 h-4 text-[#0B79BF]" />
                      <span>{selected.address}</span>
                    </div>
                  )}
                </div>

                {/* Education */}
                {selected.last_education && (
                  <div className="border-b border-gray-800 pb-5 space-y-1">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1.5">Education & Certifications</p>
                    <p className="text-gray-200 leading-relaxed font-semibold">{selected.last_education}</p>
                  </div>
                )}

                {/* Experience */}
                {selected.experience && (
                  <div className="border-b border-gray-800 pb-5 space-y-2">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Professional Experience</p>
                    <div className="bg-[#020817] border border-gray-800 rounded-lg p-4 text-gray-300 text-xs leading-relaxed font-mono whitespace-pre-wrap">
                      {selected.experience}
                    </div>
                  </div>
                )}

                {/* Message */}
                {selected.message && (
                  <div className="space-y-2">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Cover Note / Comments</p>
                    <p className="text-gray-300 leading-relaxed bg-[#020817]/40 border border-gray-800/60 p-3.5 rounded-lg">
                      {selected.message}
                    </p>
                  </div>
                )}

                <div className="text-[10px] text-gray-600 pt-2 flex items-center justify-between">
                  <span>Resume stored as: <span className="font-mono">{selected.resume_path}</span></span>
                  <span>Submitted: {new Date(selected.submitted_at).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-600">
              <div className="text-center">
                <FileText size={40} className="mx-auto mb-3 opacity-30" />
                <p>Select a candidate to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Careers;
