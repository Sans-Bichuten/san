import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Clock, Calendar, User, Search, 
  BookOpen, Filter, ChevronRight, Sparkles,
  ArrowUpRight, Tag
} from 'lucide-react';

/* ── Reveal-on-scroll helper ─────────────────────────── */
const Reveal = ({ children, delay = 0, className = '' }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

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

/* ── Blog Page ────────────────────────────────────────── */
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    document.title = 'Insights & Publications | Bichuten Data Vault';
    fetchBlogs();
    return () => { document.title = 'Bichuten'; };
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/bichuten_backend/public/get-blogs.php');
      const data = await response.json();
      if (data.status === 'success') setBlogs(data.blogs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* derive categories from blog data */
  const categories = ['All', ...new Set(blogs.map(b => b.category_name).filter(Boolean))];

  /* filter */
  const filtered = blogs.filter(b => {
    const matchCat  = activeCategory === 'All' || b.category_name === activeCategory;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase())
                                || (b.excerpt && b.excerpt.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  /* ─── featured blog (first in list) ─── */
  const featured = filtered.length > 0 ? filtered[0] : null;
  const rest     = filtered.length > 1 ? filtered.slice(1) : [];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-inter overflow-hidden">

      {/* ────── Inline styles ────── */}
      <style>{`
        .pattern-dots {
          background-image: radial-gradient(rgba(11,121,191,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .blog-card-img {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .blog-card:hover .blog-card-img {
          transform: scale(1.06);
        }
        .blog-card {
          transition: box-shadow 0.35s ease, transform 0.35s ease;
        }
        .blog-card:hover {
          box-shadow: 0 20px 60px -12px rgba(11,121,191,0.12), 0 8px 24px -8px rgba(0,0,0,0.06);
          transform: translateY(-4px);
        }
        .featured-card {
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }
        .featured-card:hover {
          box-shadow: 0 30px 80px -16px rgba(11,121,191,0.15), 0 12px 32px -8px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }
        .category-pill {
          transition: all 0.25s ease;
        }
        .category-pill:hover {
          transform: translateY(-1px);
        }
      `}</style>

      {/* ────── HERO SECTION ────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-60 z-0"></div>
        <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-bl from-blue-100/50 via-white to-transparent rounded-full blur-[120px] z-0 pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-8%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-50/60 via-transparent to-transparent rounded-full blur-[100px] z-0 pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200/60 shadow-sm rounded-full mb-6 text-[#0B79BF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Insights & Intelligence</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bebas tracking-wide text-[#14477B] mb-5 leading-[1.05]">
              Knowledge{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14477B] to-[#0B79BF]">
                Hub
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
              Deep dives into digital sovereignty, infrastructure architecture, enterprise security, and the future of technology.
            </p>
          </Reveal>

          {/* Search + Filter Bar */}
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B79BF]/20 focus:border-[#0B79BF] shadow-sm transition-all"
                />
              </div>
            </div>
          </Reveal>

          {/* Category Pills */}
          {categories.length > 1 && (
            <Reveal delay={350}>
              <div className="flex flex-wrap gap-2 mb-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`category-pill px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                      activeCategory === cat
                        ? 'bg-[#14477B] text-white border-[#14477B] shadow-md shadow-[#14477B]/20'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#0B79BF] hover:text-[#0B79BF]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>


      {/* ────── CONTENT ────── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-28">

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-3 border-gray-200 border-t-[#0B79BF] rounded-full animate-spin mb-5"></div>
            <p className="text-sm text-gray-400 font-medium tracking-wide">Loading insights...</p>
          </div>
        ) : filtered.length > 0 ? (
          <>
            {/* ── Featured Post ─── */}
            {featured && (
              <Reveal className="mb-14">
                <Link to={`/resources/blog/${featured.slug}`} className="block group">
                  <div className="featured-card bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                    <div className="grid md:grid-cols-2 gap-0">

                      {/* Image */}
                      <div className="relative h-64 md:h-[420px] overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100">
                        {featured.featured_image ? (
                          <img
                            src={getImageUrl(featured.featured_image)}
                            alt={featured.title}
                            className="blog-card-img w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = getFallbackUrl(featured.featured_image);
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#14477B]/10 to-[#0B79BF]/5 flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-[#0B79BF]/20" />
                          </div>
                        )}
                        {/* Featured badge */}
                        <div className="absolute top-5 left-5 bg-[#14477B] text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase shadow-lg">
                          Featured
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        {featured.category_name && (
                          <div className="inline-flex items-center gap-1.5 text-[#0B79BF] mb-4">
                            <Tag className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold tracking-[0.12em] uppercase">{featured.category_name}</span>
                          </div>
                        )}

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[#14477B] transition-colors duration-300">
                          {featured.title}
                        </h2>

                        <p className="text-gray-500 text-[15px] leading-relaxed mb-6 line-clamp-3">
                          {featured.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-5 text-xs text-gray-400 mb-8">
                          <span className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#14477B] to-[#0B79BF] flex items-center justify-center text-white text-[10px] font-bold">
                              {featured.author?.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-600">{featured.author}</span>
                          </span>
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(featured.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured.read_time} min read</span>
                        </div>

                        <div className="inline-flex items-center gap-2 text-[#14477B] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                          Read Article <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )}

            {/* ── Grid of remaining posts ─── */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {rest.map((blog, i) => (
                  <Reveal key={blog.id} delay={i * 80} className="flex">
                    <Link to={`/resources/blog/${blog.slug}`} className="blog-card group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm w-full">

                      {/* Image */}
                      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100">
                        {blog.featured_image ? (
                          <img
                            src={getImageUrl(blog.featured_image)}
                            alt={blog.title}
                            className="blog-card-img w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = getFallbackUrl(blog.featured_image);
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#14477B]/8 to-[#0B79BF]/4 flex items-center justify-center">
                            <BookOpen className="w-10 h-10 text-[#0B79BF]/15" />
                          </div>
                        )}
                        {blog.category_name && (
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#14477B] tracking-wide uppercase shadow-sm border border-gray-100/50">
                            {blog.category_name}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-3 font-medium">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.read_time} min</span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2.5 leading-snug group-hover:text-[#14477B] transition-colors duration-300 line-clamp-2">
                          {blog.title}
                        </h3>

                        <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2 flex-1">
                          {blog.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#14477B] to-[#0B79BF] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                              {blog.author?.charAt(0)}
                            </div>
                            <span className="text-xs font-medium text-gray-600">{blog.author}</span>
                          </div>
                          <span className="flex items-center gap-1 text-[#0B79BF] text-xs font-semibold group-hover:gap-2 transition-all duration-300">
                            Read <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </>
        ) : (
          /* ── Empty State (Coming Soon style) ─── */
          <Reveal>
            <div className="text-center py-24 px-6">
              <div className="relative w-full max-w-sm mx-auto mb-10">
                {/* Floating Card Mockup */}
                <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative z-10" style={{animation: 'floatSoft 6s ease-in-out infinite'}}>
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 border border-blue-100">
                    <BookOpen className="w-7 h-7 text-[#0B79BF]" />
                  </div>
                  <div className="w-3/4 h-5 bg-gray-200 rounded mb-3"></div>
                  <div className="w-full h-3 bg-gray-100 rounded mb-2"></div>
                  <div className="w-full h-3 bg-gray-100 rounded mb-2"></div>
                  <div className="w-5/6 h-3 bg-gray-100 rounded mb-5"></div>
                  <div className="flex gap-2">
                    <div className="bg-slate-100 px-3 py-1 rounded text-[9px] font-bold text-gray-500 uppercase">Architecture</div>
                    <div className="bg-slate-100 px-3 py-1 rounded text-[9px] font-bold text-gray-500 uppercase">Security</div>
                  </div>
                </div>

                {/* Accent dots */}
                <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-[#0B79BF]/10 to-transparent rounded-full blur-xl z-0"></div>
                <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-gradient-to-tr from-[#14477B]/10 to-transparent rounded-full blur-xl z-0"></div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {search ? 'No articles found' : 'Coming Soon'}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                {search
                  ? `No articles match "${search}". Try a different search term.`
                  : 'We are preparing a centralized hub for deep dives into digital sovereignty, infrastructure architecture, and enterprise security.'
                }
              </p>
            </div>
          </Reveal>
        )}
      </section>

      <style>{`
        @keyframes floatSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
};

export default Blog;
