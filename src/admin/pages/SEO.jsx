import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Globe, Save, CheckCircle } from 'lucide-react';
import { apiFetch } from '../services/api';

const SEO_FIELDS = [
  { key: 'seo_default_title', label: 'Default Page Title', placeholder: 'Bichuten Data Vault | Sovereign Digital Infrastructure Platform', hint: 'Used when no specific page title is set. Max 60 chars.' },
  { key: 'seo_default_description', label: 'Default Meta Description', placeholder: 'Nepal\'s sovereign digital infrastructure platform delivering secure, compliant, and high-performance data center and security services.', hint: 'Default description for social sharing. Max 160 chars.', textarea: true },
  { key: 'seo_keywords', label: 'Global Keywords', placeholder: 'sovereign digital infrastructure Nepal, data vault Nepal, secure data center, data sovereignty', hint: 'Comma-separated global keywords.' },
  { key: 'seo_og_image', label: 'Default OG Image URL', placeholder: 'https://bichuten.com/og-default.jpg', hint: 'Default Open Graph image for social sharing (1200×630).' },
  { key: 'google_analytics_id', label: 'Google Analytics ID', placeholder: 'G-XXXXXXXXXX', hint: 'GA4 Measurement ID from Google Analytics.' },
  { key: 'google_tag_manager_id', label: 'Google Tag Manager ID', placeholder: 'GTM-XXXXXXX', hint: 'GTM Container ID.' },
  { key: 'robots_directive', label: 'Robots Directive', placeholder: 'index, follow', hint: 'Default robots meta directive for all pages.' },
];

const SEO = () => {
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
    const seoKeys = SEO_FIELDS.map(f => f.key);
    const seoSettings = {};
    seoKeys.forEach(k => { seoSettings[k] = settings[k] || ''; });
    try {
      await apiFetch('/settings/update-settings.php', { method: 'POST', body: JSON.stringify({ settings: seoSettings }) });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) { alert(e.message); } finally { setSaving(false); }
  };

  // Google Search Preview
  const previewTitle = settings['seo_default_title'] || 'Your Page Title';
  const previewDesc = settings['seo_default_description'] || 'Your page description will appear here.';

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-helvetica pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">SEO Settings</h1>
          <p className="text-sm text-gray-400">Global search engine optimization configuration.</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#14477B] to-[#0B79BF] text-white rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(11,121,191,0.3)] disabled:opacity-60">
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}</>}
        </button>
      </div>

      {loading ? <div className="text-center py-8 text-[#0B79BF] animate-pulse">Loading SEO settings...</div> : (
        <>
          <div className="bg-[#0B1220]/80 border border-gray-800 rounded-xl p-6 shadow-lg space-y-5">
            <h3 className="font-semibold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
              <SearchIcon size={18} className="text-[#0B79BF]" /> SEO Configuration
            </h3>
            {SEO_FIELDS.map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-300 mb-1">{field.label}</label>
                {field.textarea ? (
                  <textarea value={settings[field.key] || ''} onChange={e => handleChange(field.key, e.target.value)} rows={3} placeholder={field.placeholder}
                    className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors resize-none text-sm" />
                ) : (
                  <input type="text" value={settings[field.key] || ''} onChange={e => handleChange(field.key, e.target.value)} placeholder={field.placeholder}
                    className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors text-sm" />
                )}
                {field.hint && <p className="text-xs text-gray-500 mt-1">{field.hint}</p>}
              </div>
            ))}
          </div>

          {/* Search Preview */}
          <div className="bg-[#0B1220]/80 border border-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="font-semibold text-white flex items-center gap-2 border-b border-gray-800 pb-3 mb-4">
              <Globe size={18} className="text-[#0B79BF]" /> Google Search Preview
            </h3>
            <div className="bg-white rounded-xl p-5 shadow">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">B</div>
                <div><p className="text-xs text-gray-600 leading-none">Bichuten</p><p className="text-xs text-green-700">https://bichuten.com</p></div>
              </div>
              <p className="text-[#1a0dab] text-lg font-medium hover:underline cursor-pointer truncate">{previewTitle}</p>
              <p className="text-[#545454] text-sm mt-1 line-clamp-2">{previewDesc}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SEO;
