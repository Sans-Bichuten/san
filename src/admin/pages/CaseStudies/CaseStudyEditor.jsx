import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { apiFetch } from '../../services/api';
import RichTextEditor from '../../components/RichTextEditor';
import SeoPanel from '../../components/SeoPanel';
import ImageUpload from '../../components/ImageUpload';

const CaseStudyEditor = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    industry: '',
    client_name: '',
    overview: '',
    challenge: '',
    solution: '',
    results: '',
    featured_image: '',
    status: 'Draft',
    gallery: [],
    metrics: []
  });

  const [seoData, setSeoData] = useState({
    meta_title: '',
    meta_description: '',
    keywords: '',
    og_image: '',
    canonical_url: ''
  });

  useEffect(() => {
    if (isEdit) fetchCaseStudy();
  }, [id]);

  const fetchCaseStudy = async () => {
    try {
      const data = await apiFetch(`/case-studies/get-case-study.php?id=${id}`);
      const c = data.caseStudy;
      let galleryParsed = [];
      try {
        if (c.gallery) galleryParsed = JSON.parse(c.gallery);
      } catch (e) {}

      setFormData({
        title: c.title || '',
        slug: c.slug || '',
        industry: c.industry || '',
        client_name: c.client_name || '',
        overview: c.overview || '',
        challenge: c.challenge || '',
        solution: c.solution || '',
        results: c.results || '',
        featured_image: c.featured_image || '',
        status: c.status || 'Draft',
        gallery: galleryParsed,
        metrics: c.metrics || []
      });
      setSeoData({
        meta_title: c.meta_title || '',
        meta_description: c.meta_description || '',
        keywords: c.keywords || '',
        og_image: c.og_image || '',
        canonical_url: c.canonical_url || ''
      });
    } catch (err) {
      alert('Failed to load case study');
      navigate('/admin/case-studies');
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => {
      const newState = { ...prev, title };
      if (!isEdit) {
        newState.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      return newState;
    });
  };

  const addMetric = () => {
    setFormData(prev => ({
      ...prev,
      metrics: [...prev.metrics, { metric_name: '', metric_value: '' }]
    }));
  };

  const updateMetric = (index, field, value) => {
    setFormData(prev => {
      const newMetrics = [...prev.metrics];
      newMetrics[index][field] = value;
      return { ...prev, metrics: newMetrics };
    });
  };

  const removeMetric = (index) => {
    setFormData(prev => {
      const newMetrics = [...prev.metrics];
      newMetrics.splice(index, 1);
      return { ...prev, metrics: newMetrics };
    });
  };

  const handleSave = async (statusOverride = null) => {
    setSaving(true);
    const finalStatus = statusOverride || formData.status;
    
    const payload = {
      ...formData,
      ...seoData,
      status: finalStatus
    };

    if (isEdit) payload.id = id;

    try {
      const endpoint = isEdit ? '/case-studies/update-case-study.php' : '/case-studies/create-case-study.php';
      await apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      navigate('/admin/case-studies');
    } catch (err) {
      alert(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse text-[#0B79BF]">Loading editor...</div>;

  return (
    <div className="max-w-7xl mx-auto font-helvetica pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/admin/case-studies')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={18} /> Back to Case Studies
        </button>
        <div className="flex gap-3">
          <button 
            onClick={() => handleSave('Draft')}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 border border-gray-700 hover:border-gray-500 text-gray-300 rounded-lg transition-colors"
          >
            <Save size={16} /> Save Draft
          </button>
          <button 
            onClick={() => handleSave('Published')}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#14477B] hover:bg-[#0B79BF] text-white rounded-lg transition-colors shadow-lg"
          >
            <CheckCircle size={16} /> Publish Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0B1220]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-6 shadow-lg">
            <input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Case Study Title"
              className="w-full text-3xl font-bold bg-transparent border-none text-white focus:outline-none placeholder-gray-600 mb-2"
            />
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <span>https://bichuten.com/resources/case-studies/</span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                className="bg-transparent border-b border-gray-700 focus:border-[#0B79BF] focus:outline-none text-gray-300 w-full"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Industry</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors"
                  placeholder="e.g. Financial Services"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Client Name (Optional)</label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                  className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors"
                  placeholder="e.g. Global Bank Corp"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Overview</label>
                <textarea
                  value={formData.overview}
                  onChange={(e) => setFormData({...formData, overview: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors resize-none"
                  placeholder="Brief summary of the case study..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">The Challenge</label>
                <RichTextEditor 
                  value={formData.challenge} 
                  onChange={(content) => setFormData({...formData, challenge: content})} 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">The Solution</label>
                <RichTextEditor 
                  value={formData.solution} 
                  onChange={(content) => setFormData({...formData, solution: content})} 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">The Results</label>
                <RichTextEditor 
                  value={formData.results} 
                  onChange={(content) => setFormData({...formData, results: content})} 
                />
              </div>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="bg-[#0B1220]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-white">Key Metrics & Results</h3>
              <button onClick={addMetric} className="text-sm text-[#0B79BF] hover:text-white flex items-center gap-1 transition-colors">
                <Plus size={14} /> Add Metric
              </button>
            </div>
            
            {formData.metrics.length === 0 ? (
              <div className="text-sm text-gray-500 text-center py-4 border border-dashed border-gray-700 rounded-lg">
                No metrics added yet. Add quantitative results here.
              </div>
            ) : (
              <div className="space-y-3">
                {formData.metrics.map((metric, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={metric.metric_value}
                        onChange={(e) => updateMetric(idx, 'metric_value', e.target.value)}
                        placeholder="Value (e.g. 99.99%)"
                        className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white text-lg font-bold focus:outline-none focus:border-[#0B79BF]"
                      />
                    </div>
                    <div className="flex-2 w-1/2">
                      <input
                        type="text"
                        value={metric.metric_name}
                        onChange={(e) => updateMetric(idx, 'metric_name', e.target.value)}
                        placeholder="Metric Name (e.g. Uptime SLA)"
                        className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF]"
                      />
                    </div>
                    <button onClick={() => removeMetric(idx)} className="p-2 text-gray-500 hover:text-red-400 mt-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-[#0B1220]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-6 shadow-lg space-y-4">
            <h3 className="font-semibold text-white border-b border-gray-800 pb-3">Publish Settings</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 mt-4 border-t border-gray-800 pt-4">Featured Image</label>
              <ImageUpload 
                value={formData.featured_image} 
                onChange={(url) => setFormData(prev => ({ ...prev, featured_image: url }))} 
              />
            </div>
          </div>

          <SeoPanel seoData={seoData} setSeoData={setSeoData} />
        </div>
      </div>
    </div>
  );
};

export default CaseStudyEditor;
