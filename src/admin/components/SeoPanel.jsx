import React from 'react';
import { Search } from 'lucide-react';
import ImageUpload from './ImageUpload';

const SeoPanel = ({ seoData, setSeoData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeoData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[#0B1220]/80 backdrop-blur-xl border border-gray-800 rounded-xl p-6 shadow-lg space-y-6">
      <h3 className="font-semibold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
        <Search size={18} className="text-[#0B79BF]" /> Search Engine Optimization
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Meta Title</label>
          <input
            type="text"
            name="meta_title"
            value={seoData.meta_title || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors"
            placeholder="Max 60 characters"
            maxLength={60}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {(seoData.meta_title || '').length}/60
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Meta Description</label>
          <textarea
            name="meta_description"
            value={seoData.meta_description || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors resize-none"
            placeholder="Max 160 characters"
            maxLength={160}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {(seoData.meta_description || '').length}/160
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Keywords</label>
          <input
            type="text"
            name="keywords"
            value={seoData.keywords || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors"
            placeholder="Comma separated"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Canonical URL</label>
          <input
            type="text"
            name="canonical_url"
            value={seoData.canonical_url || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors"
            placeholder="https://bichuten.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">OG Image (Social Share)</label>
          <ImageUpload 
            value={seoData.og_image} 
            onChange={(url) => setSeoData(prev => ({ ...prev, og_image: url }))} 
            label="Upload OG Image"
          />
        </div>
      </div>

      {/* Google Preview */}
      <div className="mt-6 pt-4 border-t border-gray-800">
        <label className="block text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">Search Preview</label>
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="text-[#1a0dab] text-lg font-medium truncate">
            {seoData.meta_title || 'Enter a meta title'}
          </div>
          <div className="text-[#006621] text-sm mb-1 truncate">
            https://bichuten.com › {seoData.canonical_url?.split('/').pop() || '...'}
          </div>
          <div className="text-[#545454] text-sm line-clamp-2 leading-snug">
            {seoData.meta_description || 'Provide a meta description to see how this page might appear in search engine results.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoPanel;
