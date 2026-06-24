import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Building, Search, Sparkles,
  Briefcase, TrendingUp, BookOpen, Filter
} from 'lucide-react';

/* ── Reveal-on-scroll ────────────────────────────── */
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

/* ── Case Studies Page ───────────────────────────── */
const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeIndustry, setActiveIndustry] = useState('All');

  useEffect(() => {
    document.title = 'Case Studies | Bichuten Enterprise Solutions';
    fetchCaseStudies();
    return () => { document.title = 'Bichuten'; };
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch('/bichuten_backend/public/get-case-studies.php');
      const data = await response.json();
      if (data.status === 'success') setCaseStudies(data.caseStudies);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* derive industries from data */
  const industries = ['All', ...new Set(caseStudies.map(cs => cs.industry).filter(Boolean))];

  /* filter */
  const filtered = caseStudies.filter(cs => {
    const matchInd = activeIndustry === 'All' || cs.industry === activeIndustry;
    const matchSearch = !search
      || cs.title.toLowerCase().includes(search.toLowerCase())
      || (cs.overview && cs.overview.toLowerCase().includes(search.toLowerCase()))
      || (cs.client_name && cs.client_name.toLowerCase().includes(search.toLowerCase()));
    return matchInd && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-inter overflow-hidden">

      <style>{`
        .pattern-dots {
          background-image: radial-gradient(rgba(11,121,191,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .cs-card {
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }
        .cs-card:hover {
          box-shadow: 0 24px 64px -16px rgba(11,121,191,0.13), 0 10px 28px -8px rgba(0,0,0,0.06);
          transform: translateY(-4px);
        }
        .cs-card .cs-img {
          transition: transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .cs-card:hover .cs-img {
          transform: scale(1.05);
        }
        .industry-pill {
          transition: all 0.25s ease;
        }
        .industry-pill:hover {
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
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Proven Impact</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bebas tracking-wide text-[#14477B] mb-5 leading-[1.05]">
              Case{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14477B] to-[#0B79BF]">
                Studies
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
              Real-world deployments of our infrastructure solutions, demonstrating tangible operational superiority and measurable results.
            </p>
          </Reveal>

          {/* Search */}
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search case studies..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B79BF]/20 focus:border-[#0B79BF] shadow-sm transition-all"
                />
              </div>
            </div>
          </Reveal>

          {/* Industry Filter Pills */}
          {industries.length > 1 && (
            <Reveal delay={350}>
              <div className="flex flex-wrap gap-2 mb-2">
                {industries.map(ind => (
                  <button
                    key={ind}
                    onClick={() => setActiveIndustry(ind)}
                    className={`industry-pill px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                      activeIndustry === ind
                        ? 'bg-[#14477B] text-white border-[#14477B] shadow-md shadow-[#14477B]/20'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#0B79BF] hover:text-[#0B79BF]'
                    }`}
                  >
                    {ind}
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
            <p className="text-sm text-gray-400 font-medium tracking-wide">Loading case studies...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-10">
            {filtered.map((cs, idx) => (
              <Reveal key={cs.id} delay={idx * 100}>
                <Link to={`/resources/case-studies/${cs.slug}`} className="block group">
                  <div className="cs-card bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                    <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

                      {/* Image */}
                      <div className="lg:w-[45%] relative h-64 lg:h-auto lg:min-h-[380px] overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100">
                        {cs.featured_image ? (
                          <img
                            src={getImageUrl(cs.featured_image)}
                            alt={cs.title}
                            className="cs-img w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = getFallbackUrl(cs.featured_image);
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#14477B]/8 to-[#0B79BF]/4 flex items-center justify-center">
                            <Briefcase className="w-16 h-16 text-[#0B79BF]/15" />
                          </div>
                        )}

                        {/* Number badge */}
                        <div className="absolute top-5 left-5 w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-sm border border-gray-100/50">
                          <span className="text-sm font-bold text-[#14477B]">{String(idx + 1).padStart(2, '0')}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="lg:w-[55%] p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                          {cs.industry && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-bold text-[#0B79BF] tracking-[0.08em] uppercase">
                              <Building className="w-3 h-3" /> {cs.industry}
                            </span>
                          )}
                          {cs.client_name && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-[11px] font-bold text-gray-600 tracking-[0.08em] uppercase">
                              {cs.client_name}
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[#14477B] transition-colors duration-300">
                          {cs.title}
                        </h3>

                        <p className="text-gray-500 text-[15px] leading-relaxed mb-8 line-clamp-3">
                          {cs.overview}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                          {cs.published_at && (
                            <span className="text-xs text-gray-400 font-medium">
                              {new Date(cs.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-2 text-[#14477B] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                            View Case Study <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          /* ── Empty State ─── */
          <Reveal>
            <div className="text-center py-24 px-6">
              <div className="relative w-full max-w-sm mx-auto mb-10">
                <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative z-10" style={{ animation: 'floatSoft 6s ease-in-out infinite' }}>
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 border border-blue-100">
                    <Briefcase className="w-7 h-7 text-[#0B79BF]" />
                  </div>
                  <div className="w-3/4 h-5 bg-gray-200 rounded mb-3"></div>
                  <div className="w-full h-3 bg-gray-100 rounded mb-2"></div>
                  <div className="w-full h-3 bg-gray-100 rounded mb-2"></div>
                  <div className="w-5/6 h-3 bg-gray-100 rounded mb-5"></div>
                  <div className="flex gap-2">
                    <div className="bg-slate-100 px-3 py-1 rounded text-[9px] font-bold text-gray-500 uppercase">Enterprise</div>
                    <div className="bg-slate-100 px-3 py-1 rounded text-[9px] font-bold text-gray-500 uppercase">Infrastructure</div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-[#0B79BF]/10 to-transparent rounded-full blur-xl z-0"></div>
                <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-gradient-to-tr from-[#14477B]/10 to-transparent rounded-full blur-xl z-0"></div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {search ? 'No case studies found' : 'Coming Soon'}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                {search
                  ? `No case studies match "${search}". Try a different search.`
                  : 'We are compiling real-world deployment stories showcasing enterprise-grade infrastructure solutions.'
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

export default CaseStudies;
