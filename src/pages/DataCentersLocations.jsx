import React, { useEffect, useRef, useState } from 'react';
import { 
  Server, MapPin, Activity, Shield, Zap, RefreshCw, 
  ArrowRight, CheckCircle, AlertTriangle, Cpu, Globe, 
  Network, Database, Layers, Navigation, Box, Lock 
} from 'lucide-react';
import FreeInfrastructureMap from "../components/FreeInfrastructureMap";

// --- Scroll Reveal Helper ---
const Reveal = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const translateClasses = {
    up: 'translate-y-12',
    down: '-translate-y-12',
    left: 'translate-x-12',
    right: '-translate-x-12',
    none: ''
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${translateClasses[direction]} scale-95`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const DataCentersLocations = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Handle sticky tab scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'infrastructure', 'locations', 'resilience'];
      const scrollY = window.scrollY + 200; // Offset for sticky headers
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveTab(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          @keyframes radarPing {
            0% { transform: scale(0.5); opacity: 0.8; }
            100% { transform: scale(2.5); opacity: 0; }
          }
          .animate-radar {
            animation: radarPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          @keyframes dashFlow {
            to { stroke-dashoffset: -20; }
          }
          .animate-dash-flow {
            stroke-dasharray: 5 5;
            animation: dashFlow 1s linear infinite;
          }
          .dark-glass {
            background: rgba(4, 8, 20, 0.85);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
          .light-glass {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(11, 121, 191, 0.1);
            box-shadow: 0 10px 30px rgba(20, 71, 123, 0.08);
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION (Dark/Performance Theme) ================= */}
      <section className="relative pt-40 pb-32 min-h-[85vh] flex flex-col justify-center bg-[#040814] overflow-hidden">
        {/* Background Imagery */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop" 
            alt="Data Center Aisles" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/80 to-[#14477B]/40"></div>
        </div>

        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-[#0B79BF]/20 rounded-full blur-[100px] z-0 animate-pulse"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 dark-glass rounded-full mb-8 border-[#0B79BF]/40 text-[#0B79BF]">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Infrastructure Footprint</span>
            </div>
          </Reveal>
          
          <Reveal delay={150}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-white mb-6 leading-[0.9]">
              Strategically Located. Secure.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] via-blue-400 to-[#34A853]">
                Built for Performance.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-xl font-light text-blue-100/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Enterprise-grade data centers designed for reliability, control, and continuous operations.
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <a href="/contact" className="group bg-[#0B79BF] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#14477B] shadow-[0_0_20px_rgba(11,121,191,0.4)] flex items-center justify-center gap-3 rounded">
                Request Infrastructure Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#locations" className="dark-glass text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:border-white/30 hover:bg-white/10 rounded flex items-center justify-center">
                Explore Network
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-bold text-gray-300 flex-wrap">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#34A853]"/> Tier-grade infrastructure</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#34A853]"/> Geo-distributed network</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#34A853]"/> Sovereign control</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= UX TIP: STICKY ANCHOR TABS ================= */}
      <div className="sticky top-20 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm hidden md:block">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-12 h-14">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'infrastructure', label: 'Data Centers' },
              { id: 'locations', label: 'Locations' },
              { id: 'resilience', label: 'Resilience' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollTo(tab.id)}
                className={`text-sm font-bold tracking-widest uppercase transition-colors h-full border-b-2 ${
                  activeTab === tab.id ? 'border-[#0B79BF] text-[#14477B]' : 'border-transparent text-gray-500 hover:text-[#0B79BF]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 2. OVERVIEW ================= */}
      <section id="overview" className="py-24 relative bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <Reveal direction="right">
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">A National Infrastructure Backbone</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Modern digital systems require infrastructure that is secure, resilient, and strategically distributed. Bichuten’s data center network is designed to deliver consistent performance, operational continuity, and full control within Nepal.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  { text: "Tier-grade data center infrastructure", color: "bg-[#0B79BF]" },
                  { text: "Geographic distribution for resilience", color: "bg-[#34A853]" },
                  { text: "High availability and redundancy", color: "bg-[#FBBC05]" },
                  { text: "Optimized proximity for performance", color: "bg-[#EA4335]" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-base text-gray-800 font-medium bg-slate-50 p-4 rounded-lg border border-gray-100">
                    <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              
              <div className="p-5 bg-blue-50 text-[#14477B] rounded-lg text-sm font-bold tracking-wide border-l-4 border-[#0B79BF] mb-6">
                Infrastructure that supports performance, continuity, and control—without compromise.
              </div>
              
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Built for mission-critical systems across industries.
              </p>
            </Reveal>

            <Reveal direction="left" delay={200} className="relative h-[500px]">
              <div className="absolute inset-0 bg-slate-50 rounded-3xl overflow-hidden border border-gray-100 flex items-center justify-center">
                 {/* Subtle glowing background */}
                 <div className="absolute w-[400px] h-[400px] bg-[#0B79BF]/10 rounded-full blur-[80px]"></div>
                 
                 {/* Central Abstract Hub Graphic */}
                 <div className="relative w-full h-full flex items-center justify-center">
                    {/* Clean single animated ring */}
                    <div className="w-80 h-80 border border-[#0B79BF]/20 rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite]"></div>
                    
                    {/* Glowing Center Node */}
                    <div className="absolute w-28 h-28 bg-white shadow-[0_0_40px_rgba(11,121,191,0.2)] rounded-full flex items-center justify-center border-4 border-[#14477B] z-10">
                       <Server className="w-12 h-12 text-[#0B79BF]" />
                    </div>
                    
                    {/* Floating connected nodes - spaced out and uncluttered */}
                    <div className="absolute top-20 left-20 bg-white p-4 rounded-full shadow-md border border-gray-100 text-[#34A853]"><Activity className="w-7 h-7"/></div>
                    <div className="absolute bottom-20 right-20 bg-white p-4 rounded-full shadow-md border border-gray-100 text-[#EA4335]"><Shield className="w-7 h-7"/></div>
                    <div className="absolute top-24 right-24 bg-white p-4 rounded-full shadow-md border border-gray-100 text-[#FBBC05]"><Network className="w-7 h-7"/></div>
                 </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 3. CORE CAPABILITIES ================= */}
      <section id="infrastructure" className="py-24 bg-[#040814] relative border-y border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">
                Designed for Performance, Security, and Continuity
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
                Bichuten’s infrastructure is engineered to deliver consistent performance, strong security, and uninterrupted operations across all environments.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            
            {/* COLUMN 1 — PERFORMANCE */}
            <Reveal delay={0} className="dark-glass p-10 rounded-2xl flex flex-col border-t-4 border-t-[#0B79BF] hover:border-t-blue-400 transition-all duration-300">
              <Zap className="w-10 h-10 text-[#0B79BF] mb-6" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-2">Performance</h3>
              <p className="text-sm text-gray-400 mb-6 font-medium tracking-wide">Built for speed and efficiency.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#0B79BF]"/> Low latency architecture</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#0B79BF]"/> Optimized workload distribution</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#0B79BF]"/> High-speed data processing</li>
              </ul>
            </Reveal>

            {/* COLUMN 2 — SECURITY */}
            <Reveal delay={150} className="dark-glass p-10 rounded-2xl flex flex-col border-t-4 border-t-[#FBBC05] hover:border-t-yellow-400 transition-all duration-300">
              <Shield className="w-10 h-10 text-[#FBBC05] mb-6" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-2">Security</h3>
              <p className="text-sm text-gray-400 mb-6 font-medium tracking-wide">Designed to protect critical systems.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#FBBC05]"/> Multi-layer physical security</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#FBBC05]"/> Controlled access systems</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#FBBC05]"/> Continuous monitoring</li>
              </ul>
            </Reveal>

            {/* COLUMN 3 — RESILIENCE */}
            <Reveal delay={300} className="dark-glass p-10 rounded-2xl flex flex-col border-t-4 border-t-[#34A853] hover:border-t-green-400 transition-all duration-300">
              <RefreshCw className="w-10 h-10 text-[#34A853] mb-6" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-2">Resilience</h3>
              <p className="text-sm text-gray-400 mb-6 font-medium tracking-wide">Ensures continuity under all conditions.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#34A853]"/> Geo-distributed infrastructure</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#34A853]"/> Real-time replication</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#34A853]"/> Automated failover</li>
              </ul>
            </Reveal>

          </div>

          <Reveal delay={400}>
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bebas tracking-widest text-[#0B79BF] uppercase">
                Infrastructure that performs under pressure—without compromise.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 5. STRATEGIC LOCATIONS (Interactive Map) ================= */}
      <section id="locations" className="py-32 bg-slate-50 relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Nationwide Infrastructure Network</h2>
              <p className="text-gray-600 text-lg">
                Our infrastructure spans multiple strategic locations across Nepal, ensuring high availability, low latency, and operational resilience.
              </p>
            </Reveal>
          </div>

          <Reveal className="mb-12 relative z-0">
             <FreeInfrastructureMap />
          </Reveal>

          <Reveal direction="up" delay={150}>
             <div className="text-center max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl font-bebas tracking-widest text-[#14477B] mb-8">
                  Distributed infrastructure designed for continuous operations across regions.
                </p>
                
                {/* Inline Trust Strip */}
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                   <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm">
                      <Globe className="w-4 h-4 text-[#14477B]"/>
                      Multi-region deployment
                   </div>
                   <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm">
                      <RefreshCw className="w-4 h-4 text-[#34A853]"/>
                      Disaster recovery ready
                   </div>
                   <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm">
                      <Zap className="w-4 h-4 text-[#0B79BF]"/>
                      Low latency performance
                   </div>
                </div>
             </div>
          </Reveal>
        </div>
      </section>

      {/* ================= SOVEREIGN ADVANTAGE ================= */}
      <section className="py-24 bg-white relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="right">
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">Full Control. Built Within Nepal.</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Operate your infrastructure within Nepal’s jurisdiction, ensuring complete control over data, compliance, and access.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-base text-gray-800 font-medium bg-slate-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-[#34A853] flex-shrink-0"/>
                  <span>Data remains within Nepal</span>
                </li>
                <li className="flex items-center gap-3 text-base text-gray-800 font-medium bg-slate-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-[#34A853] flex-shrink-0"/>
                  <span>Full jurisdictional control</span>
                </li>
                <li className="flex items-center gap-3 text-base text-gray-800 font-medium bg-slate-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-[#34A853] flex-shrink-0"/>
                  <span>Compliance with local regulations</span>
                </li>
                <li className="flex items-center gap-3 text-base text-gray-800 font-medium bg-slate-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-[#34A853] flex-shrink-0"/>
                  <span>Reduced dependency on foreign providers</span>
                </li>
              </ul>
              
              <div className="p-5 bg-blue-50 text-[#14477B] rounded-lg text-sm font-bold tracking-wide border-l-4 border-[#0B79BF] shadow-sm mb-6">
                Control is not a feature—it is a requirement.
              </div>
            </Reveal>

            <Reveal direction="left" delay={200} className="relative">
              <div className="bg-slate-50 border border-gray-200 rounded-2xl p-10 shadow-xl relative overflow-hidden">
                {/* Subtle highlight box */}
                <div className="absolute top-0 right-0 w-2 h-full bg-[#14477B]"></div>
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-[#0B79BF]/5"></div>

                <Shield className="w-16 h-16 text-[#14477B] mb-8 relative z-10" />
                
                <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-4 relative z-10">The Sovereign Advantage</h3>
                
                <p className="text-gray-600 mb-8 leading-relaxed relative z-10">
                  Unlike global cloud providers, Bichuten ensures your infrastructure operates within national boundaries.
                </p>

                <div className="pt-8 border-t border-gray-200 relative z-10">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                    Designed for government, financial institutions, and regulated industries.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ================= PERFORMANCE & DISASTER RECOVERY ================= */}
      <section className="py-24 bg-[#f8fafc] relative border-b border-gray-200 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Built for Performance and Continuity</h2>
              <p className="text-gray-600 text-lg">
                Designed to maintain performance and ensure continuity even in the event of infrastructure disruption.
              </p>
            </Reveal>
          </div>

          <div className="relative max-w-5xl mx-auto">
            
            {/* Animated Flow Diagram Background */}
            <div className="hidden lg:flex absolute top-1/2 left-0 w-full -translate-y-1/2 justify-center items-center z-0 opacity-30 pointer-events-none">
              <svg className="w-[120%] h-32 absolute" viewBox="0 0 1000 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50 L900 50" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="8 8" className="animate-dash-flow" />
                <circle cx="100" cy="50" r="10" fill="#0B79BF" />
                <circle cx="500" cy="50" r="16" fill="#14477B" className="animate-pulse" />
                <circle cx="900" cy="50" r="10" fill="#34A853" />
                <text x="300" y="30" fill="#94a3b8" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="2">PRIMARY WORKLOAD</text>
                <text x="700" y="30" fill="#94a3b8" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="2">FAILOVER & REPLICATION</text>
              </svg>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 relative z-10">
              
              {/* PERFORMANCE BLOCK */}
              <Reveal direction="up" delay={0}>
                <div className="bg-white p-10 rounded-2xl shadow-xl border-t-4 border-t-[#0B79BF] h-full flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0B79BF]/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
                  
                  <Zap className="w-12 h-12 text-[#0B79BF] mb-6" />
                  <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-6">High-Performance Infrastructure</h3>
                  
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#0B79BF]"></div>
                      Low latency network architecture
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#0B79BF]"></div>
                      Optimized workload distribution
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#0B79BF]"></div>
                      High-speed data processing
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#0B79BF]"></div>
                      Scalable compute and storage
                    </li>
                  </ul>
                  
                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-sm font-bold text-[#0B79BF] tracking-wide">
                      Ensures consistent performance under all workloads.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* DISASTER RECOVERY BLOCK */}
              <Reveal direction="up" delay={200}>
                <div className="bg-white p-10 rounded-2xl shadow-xl border-t-4 border-t-[#34A853] h-full flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#34A853]/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
                  
                  <RefreshCw className="w-12 h-12 text-[#34A853] mb-6" />
                  <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-6">Resilient Disaster Recovery</h3>
                  
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#34A853]"></div>
                      Real-time data replication
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#34A853]"></div>
                      Geo-distributed failover
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#34A853]"></div>
                      Automated recovery systems
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#34A853]"></div>
                      Minimal downtime architecture
                    </li>
                  </ul>
                  
                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-sm font-bold text-[#34A853] tracking-wide">
                      Ensures continuity even during system failures.
                    </p>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>

          <Reveal delay={400}>
            <div className="mt-16 text-center max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl font-bebas tracking-widest text-[#14477B] mb-6 uppercase">
                Your systems remain operational—even when infrastructure is under stress.
              </p>
              <div className="inline-block bg-[#14477B] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full shadow-md">
                Designed for mission-critical environments requiring zero compromise.
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 9. PLATFORM INTEGRATION ================= */}
      <section className="py-24 bg-[#040814] text-white relative border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas tracking-wide mb-6">Integrated Infrastructure Platform</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Bichuten’s data center infrastructure is part of a unified platform that connects cloud, identity, communication, and security into a single ecosystem.
              </p>
              <p className="text-[#0B79BF] font-bold tracking-wide">
                All components work together to deliver secure, scalable, and controlled digital environments.
              </p>
            </Reveal>
          </div>

          <div className="max-w-4xl mx-auto relative">
            
            {/* Background connection line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0B79BF] via-[#34A853] to-[#4285F4] -translate-x-1/2 opacity-20"></div>

            <div className="flex flex-col items-center gap-6 relative z-10">
              
              {/* TOP LAYER */}
              <Reveal direction="up" delay={0} className="w-full max-w-xl">
                <div className="bg-[#0B79BF]/10 border border-[#0B79BF]/30 backdrop-blur-sm p-6 rounded-2xl text-center transform hover:-translate-y-1 transition-transform">
                  <Globe className="w-8 h-8 text-[#0B79BF] mx-auto mb-3" />
                  <h3 className="font-bebas text-2xl tracking-widest text-white mb-1">Applications & Workloads</h3>
                  <p className="text-xs text-blue-200 uppercase tracking-wider font-bold">Top Layer</p>
                </div>
              </Reveal>

              {/* Arrow Down */}
              <Reveal direction="up" delay={100}>
                <ArrowRight className="w-6 h-6 text-gray-500 rotate-90" />
              </Reveal>

              {/* MIDDLE LAYERS */}
              <Reveal direction="up" delay={150} className="w-full max-w-3xl">
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-2xl">
                  <p className="text-center text-xs text-gray-400 uppercase tracking-widest font-bold mb-6">Platform Services (Middle Layer)</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#14477B]/40 p-4 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center gap-2 hover:bg-[#14477B]/60 transition-colors">
                      <Network className="w-6 h-6 text-blue-400" />
                      <span className="text-xs font-bold tracking-wide">Cloud Infrastructure</span>
                    </div>
                    <div className="bg-[#EA4335]/20 p-4 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center gap-2 hover:bg-[#EA4335]/40 transition-colors">
                      <Lock className="w-6 h-6 text-red-400" />
                      <span className="text-xs font-bold tracking-wide">Identity & Access</span>
                    </div>
                    <div className="bg-[#FBBC05]/20 p-4 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center gap-2 hover:bg-[#FBBC05]/40 transition-colors">
                      <Activity className="w-6 h-6 text-yellow-400" />
                      <span className="text-xs font-bold tracking-wide">Communication Systems</span>
                    </div>
                    <div className="bg-[#34A853]/20 p-4 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center gap-2 hover:bg-[#34A853]/40 transition-colors">
                      <Shield className="w-6 h-6 text-green-400" />
                      <span className="text-xs font-bold tracking-wide">Security & Compliance</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Arrow Down */}
              <Reveal direction="up" delay={200}>
                <ArrowRight className="w-6 h-6 text-gray-500 rotate-90" />
              </Reveal>

              {/* BOTTOM LAYER */}
              <Reveal direction="up" delay={250} className="w-full max-w-4xl">
                <div className="bg-[#4285F4]/20 border-2 border-[#4285F4] shadow-[0_0_30px_rgba(66,133,244,0.2)] backdrop-blur-sm p-8 rounded-2xl text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:animate-[shimmer_2s_infinite]"></div>
                  <Database className="w-10 h-10 text-white mx-auto mb-4" />
                  <h3 className="font-bebas text-3xl tracking-widest text-white mb-2">Data Center Infrastructure</h3>
                  <p className="text-sm text-blue-200 font-bold uppercase tracking-widest">The Foundation</p>
                </div>
              </Reveal>

            </div>
          </div>

          <Reveal delay={400}>
            <div className="mt-20 text-center">
              <p className="text-xl md:text-2xl font-bebas tracking-widest text-white mb-8">
                Infrastructure is not standalone—it is the foundation of a connected digital ecosystem.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full border border-white/10 text-sm font-bold tracking-wide text-gray-300">
                  <Layers className="w-4 h-4 text-[#0B79BF]" /> Unified control
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full border border-white/10 text-sm font-bold tracking-wide text-gray-300">
                  <RefreshCw className="w-4 h-4 text-[#34A853]" /> Seamless integration
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full border border-white/10 text-sm font-bold tracking-wide text-gray-300">
                  <Zap className="w-4 h-4 text-[#FBBC05]" /> Consistent performance
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 10. WHY THIS MATTERS (Centralized vs Distributed) ================= */}
      <section className="py-24 bg-white relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">
                Why Distributed Infrastructure Matters
              </h2>
              <p className="text-gray-600 text-lg">
                Traditional centralized systems create risk. Distributed infrastructure ensures resilience, performance, and continuity.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
            
            {/* LEFT: WEAK (Centralized) */}
            <Reveal direction="up" className="bg-gray-50 p-10 rounded-2xl border border-gray-200 relative overflow-hidden h-full flex flex-col opacity-80">
              <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><Box className="w-6 h-6 text-gray-500"/></div>
                <h3 className="text-2xl font-bebas text-gray-600 tracking-wider">Centralized Infrastructure</h3>
              </div>
              <ul className="space-y-4 flex-grow">
                <li className="flex items-center gap-3 text-sm text-gray-500 font-medium"><AlertTriangle className="w-4 h-4 text-gray-400" /> Single point of failure</li>
                <li className="flex items-center gap-3 text-sm text-gray-500 font-medium"><AlertTriangle className="w-4 h-4 text-gray-400" /> Higher latency</li>
                <li className="flex items-center gap-3 text-sm text-gray-500 font-medium"><AlertTriangle className="w-4 h-4 text-gray-400" /> Risk concentration</li>
                <li className="flex items-center gap-3 text-sm text-gray-500 font-medium"><AlertTriangle className="w-4 h-4 text-gray-400" /> Limited scalability</li>
              </ul>
            </Reveal>

            {/* RIGHT: STRONG (Distributed) */}
            <Reveal direction="up" delay={150} className="bg-blue-50 p-10 rounded-2xl border-2 border-[#0B79BF] shadow-xl relative overflow-hidden h-full flex flex-col transform md:scale-105 z-10">
              <div className="absolute top-0 right-0 w-2 h-full bg-[#0B79BF]"></div>
              <div className="flex items-center gap-4 mb-8 border-b border-blue-200 pb-4">
                <div className="w-12 h-12 rounded-full bg-[#14477B] flex items-center justify-center"><Network className="w-6 h-6 text-white"/></div>
                <h3 className="text-2xl font-bebas text-[#14477B] tracking-wider">Distributed Infrastructure</h3>
              </div>
              <ul className="space-y-4 flex-grow">
                <li className="flex items-center gap-3 text-sm text-[#14477B] font-bold"><CheckCircle className="w-5 h-5 text-[#34A853]" /> High resilience</li>
                <li className="flex items-center gap-3 text-sm text-[#14477B] font-bold"><CheckCircle className="w-5 h-5 text-[#34A853]" /> Low latency</li>
                <li className="flex items-center gap-3 text-sm text-[#14477B] font-bold"><CheckCircle className="w-5 h-5 text-[#34A853]" /> Continuous availability</li>
                <li className="flex items-center gap-3 text-sm text-[#14477B] font-bold"><CheckCircle className="w-5 h-5 text-[#34A853]" /> Scalable architecture</li>
              </ul>
            </Reveal>

          </div>

          <Reveal delay={300}>
            <div className="mt-20 text-center max-w-4xl mx-auto">
              <p className="text-2xl font-bebas tracking-widest text-[#14477B] mb-8 uppercase border-y border-gray-200 py-6">
                Modern infrastructure requires distribution—not concentration.
              </p>
              <a href="#locations" className="inline-block bg-[#14477B] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#0B79BF] hover:-translate-y-1 hover:shadow-xl rounded-xl">
                Explore Our Infrastructure Network
              </a>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-[#f8fafc] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(11,121,191,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal direction="up">
            <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">Build Infrastructure That Performs Under Pressure</h2>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
              Partner with Bichuten to design and deploy secure, resilient, and high-performance infrastructure tailored to your organization.
            </p>
            <p className="text-lg font-bold text-[#0B79BF] mb-10">
              Designed for reliability. Built for continuity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href="/contact" className="group bg-[#14477B] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#0B79BF] hover:-translate-y-1 hover:shadow-xl rounded-xl w-full sm:w-auto border border-transparent">
                Request Infrastructure Consultation
              </a>
              <a href="/contact" className="group bg-white text-[#14477B] px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-md rounded-xl border border-gray-200 w-full sm:w-auto">
                Talk to an Expert
              </a>
              <a href="/platform" className="group bg-transparent text-gray-600 px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:text-[#0B79BF] hover:bg-blue-50/50 rounded-xl border border-transparent w-full sm:w-auto">
                Explore Platform
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-bold text-gray-700 mb-8 flex-wrap">
              <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#34A853]"/> No obligation consultation</span>
              <span className="flex items-center gap-2"><Lock className="w-5 h-5 text-[#34A853]"/> Secure and confidential discussion</span>
              <span className="flex items-center gap-2"><Server className="w-5 h-5 text-[#34A853]"/> Enterprise-grade infrastructure</span>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-2">Our team will guide you from planning to deployment with clarity and precision.</p>
              <p className="text-xs text-[#14477B] uppercase tracking-widest font-bold">Reliable systems. Trusted infrastructure. Long-term confidence.</p>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default DataCentersLocations;