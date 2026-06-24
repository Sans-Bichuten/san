import React, { useState, useEffect } from 'react';
import { Settings2, Save, CheckCircle } from 'lucide-react';
import { apiFetch } from '../services/api';

const SETTING_GROUPS = [
  {
    title: 'General',
    fields: [
      { key: 'site_name', label: 'Website Name', placeholder: 'Bichuten Data Vault' },
      { key: 'site_tagline', label: 'Tagline', placeholder: 'Nepal\'s Sovereign Digital Infrastructure Platform' },
      { key: 'contact_email', label: 'Contact Email', placeholder: 'info@bichuten.com' },
      { key: 'contact_phone', label: 'Contact Phone', placeholder: '+977 9714509070' },
    ]
  },
  {
    title: 'Address',
    fields: [
      { key: 'address_line1', label: 'Address Line 1', placeholder: 'Kathmandu' },
      { key: 'address_city', label: 'City', placeholder: 'Kathmandu' },
      { key: 'address_state', label: 'State', placeholder: 'Bagmati Province' },
      { key: 'address_country', label: 'Country', placeholder: 'Nepal' },
    ]
  },
  {
    title: 'Social Media',
    fields: [
      { key: 'social_linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/company/bichuten' },
      { key: 'social_twitter', label: 'Twitter/X URL', placeholder: 'https://twitter.com/bichuten' },
      { key: 'social_instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/bichuten' },
      { key: 'social_youtube', label: 'YouTube URL', placeholder: 'https://youtube.com/@bichuten' },
    ]
  },
];

const Settings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await apiFetch('/settings/get-settings.php');
        setSettings(data.settings || {});
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchSettings();
  }, []);

  const handleChange = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    const allKeys = SETTING_GROUPS.flatMap(g => g.fields.map(f => f.key));
    const updatedSettings = {};
    allKeys.forEach(k => { updatedSettings[k] = settings[k] || ''; });
    try {
      await apiFetch('/settings/update-settings.php', { method: 'POST', body: JSON.stringify({ settings: updatedSettings }) });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) { alert(e.message); } finally { setSaving(false); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-helvetica pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
          <p className="text-sm text-gray-400">Global website configuration.</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#14477B] to-[#0B79BF] text-white rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(11,121,191,0.3)] disabled:opacity-60">
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}</>}
        </button>
      </div>

      {loading ? <div className="text-center py-8 text-[#0B79BF] animate-pulse">Loading settings...</div> : (
        <div className="space-y-6">
          {SETTING_GROUPS.map(group => (
            <div key={group.title} className="bg-[#0B1220]/80 border border-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-white flex items-center gap-2 border-b border-gray-800 pb-3 mb-5">
                <Settings2 size={18} className="text-[#0B79BF]" /> {group.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.fields.map(field => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-400 mb-1">{field.label}</label>
                    <input type="text" value={settings[field.key] || ''} onChange={e => handleChange(field.key, e.target.value)} placeholder={field.placeholder}
                      className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors text-sm" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Settings;
