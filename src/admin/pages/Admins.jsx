import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { apiFetch } from '../services/api';

const ROLE_COLORS = {
  super_admin: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  admin: 'bg-[#0B79BF]/10 text-[#0B79BF] border-[#0B79BF]/20',
};
const STATUS_COLORS = {
  active: 'bg-green-500/10 text-green-400 border-green-500/20',
  inactive: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const AdminModal = ({ admin, onClose, onSave }) => {
  const isEdit = Boolean(admin?.id);
  const [form, setForm] = useState({ name: admin?.name || '', email: admin?.email || '', role: admin?.role || 'admin', status: admin?.status || 'active', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { alert('Name and email are required.'); return; }
    if (!isEdit && !form.password) { alert('Password is required.'); return; }
    onSave({ ...form, ...(isEdit ? { id: admin.id } : {}) });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0B1220] border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white">{isEdit ? 'Edit Admin' : 'Add New Admin'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {[
            { label: 'Full Name', key: 'name', type: 'text', placeholder: 'John Doe' },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'admin@bichuten.com' },
            { label: isEdit ? 'New Password (blank = keep)' : 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-400 mb-1">{f.label}</label>
              <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] text-sm" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
              <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] text-sm">
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] text-sm">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 border border-gray-700 text-gray-400 rounded-lg hover:border-gray-500 transition-colors text-sm">Cancel</button>
            <button type="submit" className="flex-1 py-2 bg-[#14477B] hover:bg-[#0B79BF] text-white rounded-lg flex items-center justify-center gap-2 text-sm">
              <Save size={15} /> {isEdit ? 'Save Changes' : 'Create Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  useEffect(() => { fetchAdmins(); }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/admins/get-admins.php');
      setAdmins(data.admins);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleSave = async (form) => {
    const endpoint = form.id ? '/admins/update-admin.php' : '/admins/create-admin.php';
    try {
      await apiFetch(endpoint, { method: 'POST', body: JSON.stringify(form) });
      setModal(null); fetchAdmins();
    } catch (e) { alert(e.message); }
  };

  const deleteAdmin = async (id) => {
    if (!window.confirm('Delete this admin?')) return;
    try { await apiFetch('/admins/delete-admin.php', { method: 'POST', body: JSON.stringify({ id }) }); fetchAdmins(); }
    catch (e) { alert(e.message); }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-helvetica">
      {modal !== null && <AdminModal admin={modal === 'create' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Admin Users</h1>
          <p className="text-sm text-gray-400">{admins.length} admin{admins.length !== 1 ? 's' : ''} registered.</p>
        </div>
        <button onClick={() => setModal('create')} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#14477B] to-[#0B79BF] text-white rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(11,121,191,0.3)]">
          <Plus size={18} /> Add Admin
        </button>
      </div>
      <div className="bg-[#0B1220]/80 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-[#0B1220] border-b border-gray-800">
            <tr>
              <th className="px-6 py-4">Admin</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {loading ? (
              <tr><td colSpan="5" className="px-6 py-8 text-center text-[#0B79BF] animate-pulse">Loading...</td></tr>
            ) : admins.map(admin => (
              <tr key={admin.id} className="hover:bg-[#14477B]/10 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#14477B] to-[#0B79BF] flex items-center justify-center text-white font-bold text-sm">{admin.name.charAt(0)}</div>
                    <div><p className="font-medium text-white">{admin.name}</p><p className="text-xs text-gray-500">{admin.email}</p></div>
                  </div>
                </td>
                <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${ROLE_COLORS[admin.role] || ROLE_COLORS.admin}`}>{admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}</span></td>
                <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${STATUS_COLORS[admin.status] || STATUS_COLORS.active}`}>{admin.status}</span></td>
                <td className="px-6 py-4 text-gray-400 text-xs">{new Date(admin.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => setModal(admin)} className="text-gray-400 hover:text-white transition-colors"><Edit size={16} /></button>
                    <button onClick={() => deleteAdmin(admin.id)} className="text-gray-400 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admins;
