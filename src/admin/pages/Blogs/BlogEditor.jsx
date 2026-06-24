import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, CheckCircle, ExternalLink } from 'lucide-react';
import { apiFetch } from '../../services/api';
import RichTextEditor from '../../components/RichTextEditor';
import SeoPanel from '../../components/SeoPanel';
import ImageUpload from '../../components/ImageUpload';

const BlogEditor = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category_id: '',
    author: '',
    read_time: 5,
    status: 'Draft'
  });

  const [seoData, setSeoData] = useState({
    meta_title: '',
    meta_description: '',
    keywords: '',
    og_image: '',
    canonical_url: ''
  });

  useEffect(() => {
    fetchCategories();
    if (isEdit) fetchBlog();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const data = await apiFetch('/blogs/get-categories.php');
      setCategories(data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBlog = async () => {
    try {
      const data = await apiFetch(`/blogs/get-blog.php?id=${id}`);
      const b = data.blog;
      setFormData({
        title: b.title || '',
        slug: b.slug || '',
        excerpt: b.excerpt || '',
        content: b.content || '',
        featured_image: b.featured_image || '',
        category_id: b.category_id || '',
        author: b.author || '',
        read_time: b.read_time || 5,
        status: b.status || 'Draft'
      });
      setSeoData({
        meta_title: b.meta_title || '',
        meta_description: b.meta_description || '',
        keywords: b.keywords || '',
        og_image: b.og_image || '',
        canonical_url: b.canonical_url || ''
      });
    } catch (err) {
      alert('Failed to load blog');
      navigate('/admin/blogs');
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
      const endpoint = isEdit ? '/blogs/update-blog.php' : '/blogs/create-blog.php';
      await apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      navigate('/admin/blogs');
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
        <button onClick={() => navigate('/admin/blogs')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={18} /> Back to Blogs
        </button>
        <div className="flex gap-3">
          {/* Preview live page — only when editing a published blog with a slug */}
          {isEdit && formData.slug && formData.status === 'Published' && (
            <a
              href={`/resources/blog/${formData.slug}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-700 hover:border-[#0B79BF]/60 text-gray-400 hover:text-[#0B79BF] rounded-lg transition-colors"
            >
              <ExternalLink size={15} /> Preview
            </a>
          )}
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
              placeholder="Blog Title"
              className="w-full text-3xl font-bold bg-transparent border-none text-white focus:outline-none placeholder-gray-600 mb-2"
            />
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <span>https://bichuten.com/resources/blog/</span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                className="bg-transparent border-b border-gray-700 focus:border-[#0B79BF] focus:outline-none text-gray-300 w-full"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Short Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors resize-none"
                placeholder="A brief summary for blog listings..."
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Content</label>
              <RichTextEditor 
                value={formData.content} 
                onChange={(content) => setFormData({...formData, content})} 
              />
            </div>
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
              <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors"
              >
                <option value="">Select Category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Read Time (min)</label>
              <input
                type="number"
                value={formData.read_time}
                onChange={(e) => setFormData({...formData, read_time: e.target.value})}
                className="w-full px-3 py-2 bg-[#020817] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0B79BF] transition-colors"
              />
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

export default BlogEditor;
