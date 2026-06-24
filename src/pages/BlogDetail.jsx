import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Tag, BookOpen, ArrowUpRight } from 'lucide-react';
import DOMPurify from 'dompurify';

const getImageUrl = (val) => {
  if (!val) return '';
  if (val.startsWith('http://') || val.startsWith('https://')) return val;
  if (val.startsWith('/bichuten_backend')) return val;
  return `/bichuten_backend${val}`;
};

const getFallbackUrl = (val) => {
  if (!val) return '';
  const cleanPath = val.replace(/^\/bichuten_backend/, '');
  return `http://localhost/Bichuten_Data_Vault/backend${cleanPath}`;
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const defaultTitle = "Bichuten Data Vault — Nepal's Sovereign Digital Infrastructure";
    const defaultDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || "";
    const defaultKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || "";
    const defaultOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || "";
    const defaultOgDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || "";
    const defaultOgImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || "";
    const defaultTwTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || "";
    const defaultTwDesc = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || "";
    const defaultTwImage = document.querySelector('meta[name="twitter:image"]')?.getAttribute('content') || "";

    const updateMetaTag = (name, content, attr = 'name') => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    const fetchBlog = async () => {
      try {
        const response = await fetch(`/bichuten_backend/public/get-blog.php?slug=${slug}`);
        const data = await response.json();

        if (data.status === 'success') {
          setBlog(data.blog);
          document.title = data.blog.meta_title || `${data.blog.title} | Bichuten`;
          
          updateMetaTag('description', data.blog.meta_description || data.blog.excerpt);
          updateMetaTag('keywords', data.blog.keywords);
          
          updateMetaTag('og:title', data.blog.meta_title || data.blog.title, 'property');
          updateMetaTag('og:description', data.blog.meta_description || data.blog.excerpt, 'property');
          if (data.blog.featured_image) {
            updateMetaTag('og:image', `https://bichuten.com/bichuten_backend${data.blog.featured_image}`, 'property');
          }
          
          updateMetaTag('twitter:title', data.blog.meta_title || data.blog.title);
          updateMetaTag('twitter:description', data.blog.meta_description || data.blog.excerpt);
          if (data.blog.featured_image) {
            updateMetaTag('twitter:image', `https://bichuten.com/bichuten_backend${data.blog.featured_image}`);
          }
        } else {
          setError(data.message || 'Blog not found');
        }
      } catch (err) {
        setError('Network connection failed');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    window.scrollTo(0, 0);

    return () => {
      document.title = 'Bichuten';
      updateMetaTag('description', defaultDesc);
      updateMetaTag('keywords', defaultKeywords);
      updateMetaTag('og:title', defaultOgTitle, 'property');
      updateMetaTag('og:description', defaultOgDesc, 'property');
      updateMetaTag('og:image', defaultOgImage, 'property');
      updateMetaTag('twitter:title', defaultTwTitle);
      updateMetaTag('twitter:description', defaultTwDesc);
      updateMetaTag('twitter:image', defaultTwImage);
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-3 border-gray-200 border-t-[#0B79BF] rounded-full animate-spin mb-4"></div>
        <p className="text-sm text-gray-400 font-medium">Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 text-center px-6">
        <div className="max-w-md mx-auto py-20">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100">
            <BookOpen className="w-8 h-8 text-[#0B79BF]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Article Not Found</h1>
          <p className="text-gray-500 mb-8">{error || 'The requested article does not exist in our archives.'}</p>
          <Link
            to="/resources/blog"
            className="inline-flex items-center gap-2 text-[#14477B] hover:text-[#0B79BF] transition-colors font-semibold text-sm"
          >
            <ArrowLeft size={16} /> Back to Knowledge Hub
          </Link>
        </div>
      </div>
    );
  }

  // Helper to enhance raw HTML content with stylized elements (callouts, drop caps, etc.)
  const enhanceContent = (htmlContent) => {
    if (!htmlContent) return '';
    let enhanced = htmlContent;

    // Convert question to a premium callout box
    const questionSearch = "However, this digital explosion raises a critical question: <strong>Where is our data being stored?</strong>";
    const questionReplacement = `
      <div class="blog-question-callout">
        <div class="blog-question-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
        </div>
        <div class="blog-question-content">
          <span class="blog-question-label">A Critical Inquiry</span>
          <p class="blog-question-text">Where is our data being stored?</p>
        </div>
      </div>
    `;

    if (enhanced.includes(questionSearch)) {
      enhanced = enhanced.replace(questionSearch, questionReplacement);
    } else {
      enhanced = enhanced.replace(
        "<strong>Where is our data being stored?</strong>",
        questionReplacement
      );
      enhanced = enhanced.replace(
        "However, this digital explosion raises a critical question:",
        ""
      );
    }

    return DOMPurify.sanitize(enhanced, { ADD_ATTR: ['style'] });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-inter">

      <style>{`
        .pattern-dots-subtle {
          background-image: radial-gradient(rgba(11,121,191,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* ─── Premium Blog Typography ─── */
        
        /* Base Prose Styling */
        .prose-content {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #374151;
          font-size: 1.0625rem;
          line-height: 1.85;
        }

        /* Drop cap for first paragraph */
        .prose-content > p:first-of-type::first-letter {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          float: left;
          line-height: 0.85;
          margin-right: 0.65rem;
          margin-top: 0.15rem;
          color: #14477B;
          text-shadow: 1px 1px 0px rgba(11, 121, 191, 0.12);
        }

        /* Paragraphs */
        .prose-content p {
          margin-bottom: 1.75rem;
          color: #4B5563;
        }

        /* Headings H2 & H3 */
        .prose-content h2 {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          color: #111827;
          line-height: 1.25;
          margin-top: 3.25rem;
          margin-bottom: 1.25rem;
          letter-spacing: -0.025em;
          border-left: 4px solid #0B79BF;
          padding-left: 1rem;
        }

        .prose-content h3 {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          font-size: 1.375rem;
          font-weight: 700;
          color: #14477B;
          line-height: 1.3;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.015em;
        }

        /* Inline formatting */
        .prose-content strong {
          color: #111827;
          font-weight: 700;
        }

        .prose-content a {
          color: #0B79BF;
          font-weight: 600;
          text-decoration: underline;
          text-decoration-color: rgba(11, 121, 191, 0.3);
          text-underline-offset: 4px;
          transition: all 0.2s ease;
        }

        .prose-content a:hover {
          color: #14477B;
          text-decoration-color: #14477B;
        }

        /* Blockquotes styled as gorgeous callout boxes */
        .prose-content blockquote {
          background: linear-gradient(135deg, rgba(11, 121, 191, 0.04) 0%, rgba(20, 71, 123, 0.03) 100%);
          border-left: 4px solid #0B79BF;
          padding: 1.5rem 1.75rem;
          border-radius: 0 12px 12px 0;
          font-style: italic;
          font-size: 1.125rem;
          color: #374151;
          margin: 2.25rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.01);
        }

        /* Lists styled as Premium cards */
        .prose-content ul {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding-left: 0;
          list-style: none;
          margin: 2.25rem 0;
        }

        .prose-content li {
          position: relative;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 1.25rem 1.5rem 1.25rem 3.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.015);
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }

        .prose-content li:hover {
          border-color: #0B79BF;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(11, 121, 191, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
        }

        .prose-content li::before {
          content: "✓";
          position: absolute;
          left: 1.25rem;
          top: 1.25rem;
          width: 1.5rem;
          height: 1.5rem;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #0B79BF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.825rem;
          font-weight: 800;
        }

        /* Question Callout Box */
        .blog-question-callout {
          display: flex;
          gap: 1.25rem;
          background: linear-gradient(135deg, #f0f7ff 0%, #e0f2fe 100%);
          border: 1px solid #bae6fd;
          border-left: 5px solid #0B79BF;
          padding: 1.5rem 1.75rem;
          border-radius: 12px;
          margin: 2.5rem 0;
          align-items: flex-start;
          box-shadow: 0 4px 12px -2px rgba(11, 121, 191, 0.08);
        }

        .blog-question-icon {
          background-color: #0B79BF;
          color: #ffffff;
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 8px -2px rgba(11, 121, 191, 0.3);
        }

        .blog-question-content {
          display: flex;
          flex-direction: column;
        }

        .blog-question-label {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #0B79BF;
          margin-bottom: 0.35rem;
        }

        .blog-question-text {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #1e3a8a;
          margin: 0 !important;
          line-height: 1.4 !important;
        }

        /* Conclusion Callout */
        .prose-content p:last-of-type {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 1.25rem;
          line-height: 1.8;
          font-weight: 700;
          color: #14477B;
          background: linear-gradient(135deg, rgba(20, 71, 123, 0.06) 0%, rgba(11, 121, 191, 0.04) 100%);
          border-left: 5px solid #14477B;
          padding: 2rem;
          border-radius: 0 16px 16px 0;
          margin-top: 3.5rem;
          margin-bottom: 0;
          box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.6);
        }
      `}</style>

      {/* ── Hero area with featured image ── */}
      <div className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 pattern-dots-subtle opacity-50 z-0"></div>
        <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/40 via-white to-transparent rounded-full blur-[120px] z-0"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <Link
            to="/resources/blog"
            className="inline-flex items-center gap-2 text-[#0B79BF] hover:text-[#14477B] transition-colors mb-8 text-sm font-semibold"
          >
            <ArrowLeft size={15} /> Knowledge Hub
          </Link>

          {/* Category */}
          {blog.category_name && (
            <div className="inline-flex items-center gap-1.5 text-[#0B79BF] mb-5 ml-1">
              <Tag className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-[0.12em] uppercase">{blog.category_name}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-jakarta font-bold text-gray-900 mb-7 leading-[1.15] tracking-tight">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 mb-10 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#14477B] to-[#0B79BF] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {blog.author?.charAt(0)}
              </div>
              <span className="font-semibold text-gray-700">{blog.author}</span>
            </div>
            <span className="flex items-center gap-1.5 text-gray-400">
              <Calendar size={15} />
              {new Date(blog.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <Clock size={15} />
              {blog.read_time} min read
            </span>
          </div>
        </div>
      </div>

      {/* ── Featured Image ── */}
      {blog.featured_image && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-4 mb-12">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-white">
            <img
              src={getImageUrl(blog.featured_image)}
              alt={blog.title}
              className="w-full h-auto max-h-[550px] object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = getFallbackUrl(blog.featured_image);
              }}
            />
          </div>
        </div>
      )}

      {/* ── Article Content ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <article
          className="prose-content max-w-none"
          dangerouslySetInnerHTML={{ __html: enhanceContent(blog.content) }}
        />

        {/* ── Footer ── */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            to="/resources/blog"
            className="inline-flex items-center gap-2 text-[#14477B] hover:text-[#0B79BF] transition-colors font-semibold text-sm"
          >
            <ArrowLeft size={15} /> More Articles
          </Link>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
            className="flex items-center gap-2 text-gray-400 hover:text-[#0B79BF] transition-colors text-sm font-medium bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md"
          >
            <Share2 size={15} /> Share Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
