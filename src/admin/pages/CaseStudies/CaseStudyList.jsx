import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Trash2, ExternalLink } from 'lucide-react';
import { apiFetch } from '../../services/api';

const CaseStudyList = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const data = await apiFetch('/case-studies/get-case-studies.php');
      setCaseStudies(data.caseStudies);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      try {
        await apiFetch('/case-studies/delete-case-study.php', {
          method: 'POST',
          body: JSON.stringify({ id })
        });
        fetchCaseStudies();
      } catch (err) {
        alert(err.message || 'Failed to delete');
      }
    }
  };

  const filtered = caseStudies.filter(cs => 
    cs.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (cs.client_name && cs.client_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-gray-300 font-helvetica">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Case Studies</h1>
          <p className="text-sm text-gray-400">Manage your enterprise success stories.</p>
        </div>
        <Link 
          to="/admin/case-studies/create" 
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#14477B] to-[#0B79BF] hover:from-[#0B79BF] hover:to-[#14477B] text-white rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(11,121,191,0.3)]"
        >
          <Plus size={18} /> New Case Study
        </Link>
      </div>

      <div className="bg-[#0B1220]/80 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#071120]">
          <div className="flex items-center bg-[#020817] rounded-lg border border-gray-800 px-3 py-1.5 w-80">
            <Search size={16} className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search case studies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-sm text-white focus:outline-none w-full"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white border border-gray-700 rounded bg-[#0B1220] transition-colors">
            <Filter size={16} /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-[#0B1220] border-b border-gray-800">
              <tr>
                <th className="px-6 py-4 font-medium">Title & Client</th>
                <th className="px-6 py-4 font-medium">Industry</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Published Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-8 text-[#0B79BF] animate-pulse">Loading case studies...</td></tr>
              ) : filtered.length > 0 ? (
                filtered.map((cs) => (
                  <tr key={cs.id} className="hover:bg-[#14477B]/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white mb-1">{cs.title}</div>
                      <div className="text-xs text-gray-500">Client: {cs.client_name || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{cs.industry || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        cs.status === 'Published' 
                          ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                          : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }`}>
                        {cs.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {cs.published_at ? new Date(cs.published_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {cs.status === 'Published' && (
                          <a href={`/resources/case-studies/${cs.slug}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0B79BF] transition-colors" title="View Public">
                            <ExternalLink size={16} />
                          </a>
                        )}
                        <Link to={`/admin/case-studies/edit/${cs.id}`} className="text-gray-400 hover:text-white transition-colors" title="Edit">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => handleDelete(cs.id)} className="text-gray-400 hover:text-red-400 transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No case studies found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyList;
