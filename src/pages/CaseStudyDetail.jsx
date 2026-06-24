import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Building, Activity, CheckCircle,
  Target, Zap, Share2, Briefcase, Calendar, Tag, TrendingUp
} from 'lucide-react';
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

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const [cs, setCs] = useState(null);
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

    const fetchCaseStudy = async () => {
      try {
        const response = await fetch(`/bichuten_backend/public/get-case-study.php?slug=${slug}`);
        const data = await response.json();

        if (data.status === 'success') {
          setCs(data.caseStudy);
          document.title = data.caseStudy.meta_title || `${data.caseStudy.title} | Bichuten Case Study`;
          
          updateMetaTag('description', data.caseStudy.meta_description || data.caseStudy.overview);
          updateMetaTag('keywords', data.caseStudy.keywords);
          
          updateMetaTag('og:title', data.caseStudy.meta_title || data.caseStudy.title, 'property');
          updateMetaTag('og:description', data.caseStudy.meta_description || data.caseStudy.overview, 'property');
          if (data.caseStudy.featured_image) {
            updateMetaTag('og:image', `https://bichuten.com/bichuten_backend${data.caseStudy.featured_image}`, 'property');
          }
          
          updateMetaTag('twitter:title', data.caseStudy.meta_title || data.caseStudy.title);
          updateMetaTag('twitter:description', data.caseStudy.meta_description || data.caseStudy.overview);
          if (data.caseStudy.featured_image) {
            updateMetaTag('twitter:image', `https://bichuten.com/bichuten_backend${data.caseStudy.featured_image}`);
          }
        } else {
          setError(data.message || 'Case study not found');
        }
      } catch (err) {
        setError('Network connection failed');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
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

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-3 border-gray-200 border-t-[#0B79BF] rounded-full animate-spin mb-4"></div>
        <p className="text-sm text-gray-400 font-medium">Loading case study...</p>
      </div>
    );
  }

  /* ── Error / 404 ── */
  if (error || !cs) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 text-center px-6">
        <div className="max-w-md mx-auto py-20">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100">
            <Briefcase className="w-8 h-8 text-[#0B79BF]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Case Study Not Found</h1>
          <p className="text-gray-500 mb-8">{error || 'This case study does not exist in our archives.'}</p>
          <Link
            to="/resources/case-studies"
            className="inline-flex items-center gap-2 text-[#14477B] hover:text-[#0B79BF] transition-colors font-semibold text-sm"
          >
            <ArrowLeft size={16} /> Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  /* ── Section Block helper ── */
  const Section = ({ number, title, icon: Icon, content }) => {
    if (!content) return null;
    return (
      <div className="relative">
        {/* Decorative icon */}
        <div className="absolute -left-4 md:-left-10 top-1 text-[#0B79BF]/8">
          <Icon size={72} strokeWidth={1} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-bold text-[#0B79BF] bg-blue-50 w-8 h-8 rounded-lg flex items-center justify-center border border-blue-100">
              {number}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {title}
            </h2>
          </div>
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-p:text-gray-600 prose-p:leading-[1.85]
              prose-a:text-[#0B79BF] prose-a:font-semibold hover:prose-a:text-[#14477B] prose-a:no-underline
              prose-strong:text-gray-900
              prose-li:text-gray-600
              prose-blockquote:border-l-[#0B79BF] prose-blockquote:bg-blue-50/50 prose-blockquote:p-5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
              prose-code:text-[#14477B] prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-inter">

      <style>{`
        .pattern-dots-subtle {
          background-image: radial-gradient(rgba(11,121,191,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      {/* ── Hero / Header ── */}
      <div className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 pattern-dots-subtle opacity-50 z-0"></div>
        <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/40 via-white to-transparent rounded-full blur-[120px] z-0"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <Link
            to="/resources/case-studies"
            className="inline-flex items-center gap-2 text-[#0B79BF] hover:text-[#14477B] transition-colors mb-8 text-sm font-semibold"
          >
            <ArrowLeft size={15} /> All Case Studies
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2.5 mb-5">
            {cs.industry && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-[#0B79BF] tracking-[0.08em] uppercase">
                <Building className="w-3 h-3" /> {cs.industry}
              </span>
            )}
            {cs.client_name && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-[11px] font-bold text-gray-600 tracking-[0.08em] uppercase">
                Client: {cs.client_name}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.12] tracking-tight mb-7">
            {cs.title}
          </h1>

          {/* Overview */}
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-4xl mb-8 pb-8 border-b border-gray-200">
            {cs.overview}
          </p>
        </div>
      </div>

      {/* ── Featured Image ── */}
      {cs.featured_image && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-2 mb-16">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-white">
            <img
              src={getImageUrl(cs.featured_image)}
              alt={cs.title}
              className="w-full h-auto max-h-[600px] object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = getFallbackUrl(cs.featured_image);
              }}
            />
          </div>
        </div>
      )}

      {/* ── Metrics Bar ── */}
      {cs.metrics && cs.metrics.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
            <h3 className="text-xs font-bold tracking-[0.15em] text-[#0B79BF] uppercase mb-8 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Key Metrics
            </h3>
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${cs.metrics.length >= 3 ? 'lg:grid-cols-' + Math.min(cs.metrics.length, 4) : ''} gap-8`}>
              {cs.metrics.map((metric, idx) => (
                <div key={idx} className={`${idx !== 0 ? 'sm:border-l border-gray-100 sm:pl-8' : ''}`}>
                  <div className="text-3xl md:text-4xl font-bold text-[#14477B] mb-2 tracking-tight">
                    {metric.metric_value}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {metric.metric_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Content Sections ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-20 pb-12">
        <Section number="01" title="The Challenge" icon={Target} content={cs.challenge} />
        <Section number="02" title="The Solution" icon={Zap} content={cs.solution} />
        <Section number="03" title="Impact & Results" icon={CheckCircle} content={cs.results} />
      </div>

      {/* ── Footer Bar ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            to="/resources/case-studies"
            className="inline-flex items-center gap-2 text-[#14477B] hover:text-[#0B79BF] transition-colors font-semibold text-sm"
          >
            <ArrowLeft size={15} /> More Case Studies
          </Link>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
            className="flex items-center gap-2 text-gray-400 hover:text-[#0B79BF] transition-colors text-sm font-medium bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md"
          >
            <Share2 size={15} /> Share Case Study
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
