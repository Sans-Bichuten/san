import React, { useEffect, useRef, useState } from 'react';
import {
  ShieldCheck, Globe, Database, Target, Compass,
  Layers, Lock, CheckCircle, ArrowRight, Building2,
  Landmark, Wifi, Briefcase, Activity, MapPin,
  Cpu, FileSearch, Server, AlertTriangle, User, FileCheck, ShieldAlert, XCircle, Zap, Wind, Network, Cloud
} from 'lucide-react';

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
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${translateClasses[direction]} scale-95`
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">

      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          .pattern-grid-light {
            background-image: radial-gradient(rgba(11, 121, 191, 0.15) 1px, transparent 1px);
            background-size: 32px 32px;
          }
          .light-glass {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 1);
            box-shadow: 0 10px 40px -10px rgba(20, 71, 123, 0.08);
          }
          @keyframes floatSoft {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
          .animate-float-soft {
            animation: floatSoft 6s ease-in-out infinite;
          }
          .gradient-text-blue {
            background: linear-gradient(to right, #14477B, #0B79BF, #4da6e7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION (Enterprise Dark) ================= */}
      <section className="relative pt-40 pb-32 min-h-[90vh] flex flex-col justify-center bg-[#040814] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity animate-[scale_20s_ease-in-out_infinite_alternate]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#040814]/80 via-[#040814]/95 to-[#040814]"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0B79BF]/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#14477B]/20 rounded-full blur-[150px] pointer-events-none"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">

            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm">
                <Globe className="w-4 h-4 text-[#0B79BF]" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300">About Bichuten Data Vault</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bebas tracking-wider text-white mb-6 leading-[1.05] drop-shadow-lg">
                Building Nepal’s Sovereign <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] to-[#4da6e7]">Digital Infrastructure</span>
              </h1>
              <div className="inline-block px-6 py-2 bg-[#0B79BF]/10 border border-[#0B79BF]/20 rounded-full mb-10">
                <span className="text-[#0B79BF] font-bold tracking-widest uppercase text-sm">
                  Secure. Controlled. Built for mission-critical operations.
                </span>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg md:text-xl text-gray-300 mb-4 leading-relaxed max-w-3xl mx-auto font-light">
                Bichuten Data Vault is a sovereign digital infrastructure platform enabling organizations to operate securely, compliantly, and independently within Nepal.
              </p>
              <p className="text-sm text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto">
                Designed for governments, financial institutions, and enterprises managing critical systems and sensitive data.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <button className="w-full sm:w-auto px-8 py-4 bg-[#0B79BF] hover:bg-[#14477B] text-white rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(11,121,191,0.3)] flex items-center justify-center gap-2">
                  Explore Platform <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/20 hover:border-white/50 text-white rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/5">
                  Contact Sales
                </button>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 border-t border-white/10 pt-8 max-w-2xl mx-auto">
                <ShieldCheck className="w-5 h-5 text-[#34A853] flex-shrink-0" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  For environments where control, security, and compliance are non-negotiable.
                </span>
              </div>
            </Reveal>

          </div>
        </div>

        <style>{`
          @keyframes scale {
            from { transform: scale(1); }
            to { transform: scale(1.05); }
          }
        `}</style>
      </section>

      {/* ================= 2. WHO WE ARE ================= */}
      <section className="py-24 md:py-32 relative bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
                Who We Are
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Bichuten Data Vault is building a sovereign digital infrastructure ecosystem designed for secure, compliant, and high-performance operations.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

            <Reveal delay={100} className="h-full">
              <div className="h-full bg-slate-50 border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-[#0B79BF]/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#0B79BF]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-[#0B79BF]" />
                </div>
                <h3 className="text-lg font-bold text-[#14477B] mb-3 uppercase tracking-wide">
                  Sovereign Infrastructure
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Enabling organizations to store and operate data within national boundaries with full control.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200} className="h-full">
              <div className="h-full bg-slate-50 border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-[#34A853]/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#34A853]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-[#34A853]" />
                </div>
                <h3 className="text-lg font-bold text-[#14477B] mb-3 uppercase tracking-wide">
                  Compliance-First Design
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Built to support regulatory, governance, and audit requirements from the ground up.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300} className="h-full">
              <div className="h-full bg-slate-50 border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-[#FBBC05]/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#FBBC05]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6 text-[#FBBC05]" />
                </div>
                <h3 className="text-lg font-bold text-[#14477B] mb-3 uppercase tracking-wide">
                  Integrated Platform
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Combining infrastructure, communication, identity, and security into a unified system.
                </p>
              </div>
            </Reveal>

            <Reveal delay={400} className="h-full">
              <div className="h-full bg-slate-50 border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-[#EA4335]/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#EA4335]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6 text-[#EA4335]" />
                </div>
                <h3 className="text-lg font-bold text-[#14477B] mb-3 uppercase tracking-wide">
                  Enterprise Focused
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Designed for governments, financial institutions, and mission-critical organizations.
                </p>
              </div>
            </Reveal>

          </div>

          <Reveal delay={500}>
            <div className="text-center">
              <div className="inline-flex flex-col md:flex-row items-center justify-center gap-3 px-6 py-3 bg-[#14477B]/5 border border-[#14477B]/10 rounded-full">
                <Lock className="w-4 h-4 text-[#0B79BF] flex-shrink-0" />
                <span className="text-xs md:text-sm font-bold text-[#14477B] uppercase tracking-widest">
                  Engineered for environments where reliability, control, and security are essential.
                </span>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 3. WHY WE EXIST ================= */}
      <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#14477B]/5 to-transparent rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#34A853]/5 to-transparent rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-4xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
                Why We Exist
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
                Digital infrastructure is no longer just a technology layer—it is a foundation of national control, security, and growth.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">

            {/* BLOCK 1 - THE PROBLEM */}
            <Reveal delay={100} className="h-full">
              <div className="h-full bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative group">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#EA4335]/50 to-[#EA4335] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <AlertTriangle className="w-12 h-12 text-[#EA4335] mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">The Challenge</h3>
                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                  Organizations across Nepal depend heavily on external infrastructure, limiting control over data, increasing compliance complexity, and exposing critical systems to external risks.
                </p>
              </div>
            </Reveal>

            {/* BLOCK 2 - THE VISION */}
            <Reveal delay={200} className="h-full">
              <div className="h-full bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative group">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0B79BF]/50 to-[#0B79BF] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Globe className="w-12 h-12 text-[#0B79BF] mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Our Vision</h3>
                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                  To establish Nepal as a global hub for sovereign, sustainable, and high-performance digital infrastructure.
                </p>
              </div>
            </Reveal>

            {/* BLOCK 3 - THE MISSION */}
            <Reveal delay={300} className="h-full">
              <div className="h-full bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative group">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#14477B]/50 to-[#14477B] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Target className="w-12 h-12 text-[#14477B] mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Our Mission</h3>
                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                  To build a unified digital infrastructure ecosystem that enables organizations to operate securely, compliantly, and independently—powered by Nepal’s natural and strategic advantages.
                </p>
              </div>
            </Reveal>

          </div>

          <Reveal delay={400}>
            <div className="text-center max-w-3xl mx-auto border-t border-gray-200 pt-10">
              <p className="text-[#14477B] font-bebas text-2xl md:text-3xl tracking-widest">
                We are building infrastructure that supports not just systems—but national digital independence.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 4. WHAT WE DO (PLATFORM OVERVIEW) ================= */}
      <section className="py-24 md:py-32 bg-[#040814] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0B79BF]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-4xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">
                What We Do
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-8">
                Bichuten delivers a unified digital infrastructure platform that integrates all critical systems required to operate securely and efficiently.
              </p>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#EA4335]/10 border border-[#EA4335]/20 rounded-full">
                <ShieldAlert className="w-5 h-5 text-[#EA4335] flex-shrink-0" />
                <span className="text-sm font-bold text-[#EA4335] uppercase tracking-widest">
                  Instead of managing multiple fragmented systems, organizations operate through one integrated ecosystem.
                </span>
              </div>
            </Reveal>
          </div>

          {/* Visual Horizontal Flow (System Layers) */}
          <div className="relative mb-20">
            {/* Connection Line (Desktop) */}
            <div className="hidden lg:block absolute top-[40%] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-[#0B79BF]/30 to-transparent -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
              {[
                { icon: Server, title: "Infrastructure", desc: "Secure, sovereign data centers and cloud infrastructure within Nepal." },
                { icon: Wifi, title: "Communication", desc: "Encrypted email, messaging, and collaboration systems." },
                { icon: User, title: "Identity", desc: "Centralized identity and access management across systems." },
                { icon: ShieldCheck, title: "Security", desc: "End-to-end protection, encryption, and monitoring." },
                { icon: FileCheck, title: "Compliance", desc: "Audit-ready systems aligned with regulatory requirements." }
              ].map((layer, idx) => (
                <Reveal key={idx} delay={idx * 100} className="h-full">
                  <div className="h-full bg-[#0A0E17] border border-white/10 rounded-2xl p-8 hover:border-[#0B79BF]/50 hover:bg-white/5 transition-all duration-300 group flex flex-col items-center text-center relative">
                    <div className="w-16 h-16 bg-[#14477B]/20 rounded-full border border-[#14477B]/40 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0B79BF]/30 transition-all shadow-[0_0_15px_rgba(20,71,123,0.5)]">
                      <layer.icon className="w-7 h-7 text-[#0B79BF]" />
                    </div>
                    <h3 className="text-white font-bebas text-xl tracking-wider mb-4 group-hover:text-[#4da6e7] transition-colors">{layer.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {layer.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <Reveal delay={500}>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Each layer is designed to work together—eliminating gaps, reducing risk, and improving operational efficiency.
              </p>

              <div className="inline-block px-10 py-5 bg-gradient-to-r from-[#14477B] to-[#0B79BF] text-white rounded-full shadow-xl">
                <span className="font-bebas text-3xl tracking-widest">
                  One platform. Complete control.
                </span>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ================= 5. WHY NEPAL (STRATEGIC ADVANTAGE) ================= */}
      <section className="py-24 md:py-32 bg-[#040814] relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#040814] via-transparent to-[#040814] z-0 pointer-events-none"></div>
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#34A853]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0B79BF]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header */}
          <div className="max-w-3xl mb-16 relative z-20">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#34A853]/10 border border-[#34A853]/30 rounded text-xs font-bold uppercase tracking-widest text-[#34A853] mb-6">
                <MapPin className="w-4 h-4" /> The Strategic Advantage
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas text-white tracking-wide mb-6">
                Why Nepal is a Strategic Advantage
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed font-light mb-6">
                Nepal offers unique environmental, geographic, and regulatory advantages that enable more efficient, secure, and sustainable digital infrastructure.
              </p>
              <div className="inline-block border-l-4 border-[#0B79BF] pl-4">
                <p className="text-[#4da6e7] font-medium text-lg">
                  Location directly impacts performance, control, and long-term sustainability.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20 relative z-20">

            {/* Left: Advantage Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Zap, title: "Clean Energy", desc: "Hydroelectric power enables sustainable, cost-efficient infrastructure operations.", color: "text-[#FBBC05]", bg: "bg-[#FBBC05]/10" },
                { icon: Wind, title: "Natural Cooling", desc: "Cool climate reduces energy consumption and improves data center efficiency.", color: "text-[#4da6e7]", bg: "bg-[#4da6e7]/10" },
                { icon: Network, title: "Strategic Location", desc: "Positioned to support regional infrastructure connectivity and growth.", color: "text-[#0B79BF]", bg: "bg-[#0B79BF]/10" },
                { icon: ShieldCheck, title: "Data Sovereignty", desc: "Supports national control over data, compliance, and governance.", color: "text-[#34A853]", bg: "bg-[#34A853]/10" }
              ].map((card, i) => (
                <Reveal key={i} delay={i * 100} className="h-full">
                  <div className="bg-[#0A0E17] border border-white/10 p-6 rounded-2xl h-full hover:border-white/20 transition-colors group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${card.bg} group-hover:scale-110 transition-transform`}>
                      <card.icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                    <h3 className="text-white font-bold tracking-wide uppercase text-sm mb-3">{card.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Right: Visual Node Map */}
            <Reveal direction="left" className="relative h-[400px] w-full rounded-3xl border border-white/10 bg-black/50 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

              {/* Central Hub */}
              <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-[#14477B]/40 border border-[#0B79BF] shadow-[0_0_30px_rgba(11,121,191,0.5)] animate-pulse">
                <MapPin className="w-10 h-10 text-[#4da6e7]" />
              </div>

              {/* Connecting Nodes */}
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Lines radiating from center */}
                <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="#0B79BF" strokeWidth="1" strokeDasharray="4 4" className="opacity-50 animate-[dash_20s_linear_infinite]" />
                <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#0B79BF" strokeWidth="1" strokeDasharray="4 4" className="opacity-50 animate-[dash_15s_linear_infinite]" />
                <line x1="50%" y1="50%" x2="30%" y2="80%" stroke="#34A853" strokeWidth="1" strokeDasharray="4 4" className="opacity-50 animate-[dash_25s_linear_infinite]" />
                <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="#34A853" strokeWidth="1" strokeDasharray="4 4" className="opacity-50 animate-[dash_18s_linear_infinite]" />
              </svg>

              {/* Node Endpoints */}
              <div className="absolute top-[30%] left-[20%] w-3 h-3 bg-[#0B79BF] rounded-full shadow-[0_0_10px_#0B79BF]"></div>
              <div className="absolute top-[20%] left-[80%] w-3 h-3 bg-[#0B79BF] rounded-full shadow-[0_0_10px_#0B79BF]"></div>
              <div className="absolute top-[80%] left-[30%] w-3 h-3 bg-[#34A853] rounded-full shadow-[0_0_10px_#34A853]"></div>
              <div className="absolute top-[70%] left-[80%] w-3 h-3 bg-[#34A853] rounded-full shadow-[0_0_10px_#34A853]"></div>

              <div className="absolute bottom-6 text-center w-full">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B79BF]">Sovereign Digital Ecosystem</span>
              </div>
            </Reveal>

          </div>

          <Reveal delay={400} className="relative z-20">
            <div className="bg-[#0A0E17] border border-white/10 rounded-2xl p-8 mb-16 text-center max-w-4xl mx-auto shadow-2xl">
              <p className="text-[#4da6e7] font-bold tracking-widest uppercase text-sm mb-2">Business Impact</p>
              <h4 className="text-2xl md:text-3xl font-bebas text-white tracking-wider">
                These advantages translate into lower operational costs, higher efficiency, and stronger control.
              </h4>
            </div>

            {/* Trust Strip */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 py-8 border-t border-b border-white/10">
              {["Sustainable Infrastructure", "Efficient Operations", "Sovereign Control"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#34A853]" />
                  <span className="text-gray-300 font-bold uppercase tracking-widest text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <h3 className="text-3xl md:text-4xl font-bebas text-white tracking-widest">
                Nepal is not just a location—it is a foundation for next-generation digital infrastructure.
              </h3>
            </div>
          </Reveal>

        </div>

        <style>{`
          @keyframes dash {
            to { stroke-dashoffset: -1000; }
          }
        `}</style>
      </section>

      {/* ================= 6. HOW WE ARE DIFFERENT ================= */}
      <section className="py-24 md:py-32 bg-slate-50 relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">How We Are Different</h2>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Most infrastructure providers offer fragmented services. Bichuten delivers a unified, sovereign platform built for control, security, and compliance.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">

            {/* Traditional Providers */}
            <Reveal delay={100} className="h-full">
              <div className="h-full bg-white p-10 md:p-12 rounded-3xl border border-gray-200 shadow-sm opacity-80 filter grayscale-[30%] flex flex-col">
                <div className="mb-8 pb-6 border-b border-gray-100">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-500 uppercase tracking-wide">Traditional Infrastructure Providers</h3>
                </div>
                <ul className="space-y-6 flex-grow">
                  {[
                    "Multiple disconnected systems",
                    "External dependency",
                    "Security as an add-on",
                    "Compliance handled separately",
                    "Limited control over data"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <XCircle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-500 font-medium text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Bichuten Data Vault */}
            <Reveal delay={200} className="h-full">
              <div className="h-full bg-[#040814] p-10 md:p-12 rounded-3xl border-2 border-[#0B79BF]/50 shadow-[0_0_40px_rgba(11,121,191,0.15)] flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0B79BF]/10 rounded-full blur-[80px]"></div>
                <div className="mb-8 pb-6 border-b border-white/10 relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide flex items-center gap-3">
                    <ShieldCheck className="w-7 h-7 text-[#34A853]" />
                    Bichuten Data Vault
                  </h3>
                </div>
                <ul className="space-y-6 flex-grow relative z-10">
                  {[
                    "Fully integrated platform",
                    "Sovereign infrastructure within Nepal",
                    "Security built into every layer",
                    "Compliance-first architecture",
                    "Complete control over data and systems"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-[#34A853] flex-shrink-0" />
                      <span className="text-gray-200 font-medium text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

          </div>

          <Reveal delay={300}>
            <div className="text-center max-w-4xl mx-auto">
              <div className="bg-white px-8 py-8 rounded-2xl border border-gray-200 shadow-sm inline-block w-full max-w-3xl mb-8">
                <h4 className="text-xl md:text-2xl font-bold text-[#14477B]">
                  Bichuten replaces fragmented infrastructure with a unified, controlled ecosystem.
                </h4>
              </div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                Not an upgrade—an entirely new approach to digital infrastructure.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 8. INDUSTRIES (CRITICAL) ================= */}
      <section className="py-24 md:py-32 bg-slate-50 relative border-b border-gray-200">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-4xl mx-auto mb-20">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#14477B]/10 border border-[#14477B]/20 rounded text-xs font-bold uppercase tracking-widest text-[#14477B] mb-6">
                <ShieldCheck className="w-4 h-4" /> Built for environments where failure is not an option
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas text-[#14477B] tracking-wide mb-6">
                Designed for Critical Industries
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light mb-8">
                Bichuten supports organizations where data sensitivity, compliance, and uptime are essential.
              </p>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                Supporting mission-critical operations across industries.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Landmark,
                title: "Banking & Financial Services",
                desc: "Secure, compliant infrastructure for financial operations and regulatory systems.",
                apps: ["Core banking systems", "KYC and transaction data storage", "Disaster recovery"]
              },
              {
                icon: Building2,
                title: "Government & Public Sector",
                desc: "Digital infrastructure for governance, public services, and national systems.",
                apps: ["Citizen data platforms", "E-governance systems", "Data archiving"]
              },
              {
                icon: Wifi,
                title: "Telecom & ISPs",
                desc: "High-availability infrastructure for network and communication systems.",
                apps: ["Network core systems", "Data routing", "Connectivity platforms"]
              },
              {
                icon: Briefcase,
                title: "Enterprise Organizations",
                desc: "Reliable infrastructure for large-scale business operations.",
                apps: ["Enterprise applications", "Internal systems", "Data protection"]
              },
              {
                icon: Cpu,
                title: "Digital & Tech Platforms",
                desc: "Scalable infrastructure for modern applications and digital platforms.",
                apps: ["SaaS hosting", "Application infrastructure", "Data management"]
              },
              {
                icon: Globe,
                title: "International Companies",
                desc: "Compliant infrastructure for organizations operating in or expanding into Nepal.",
                apps: ["Local hosting", "Regulatory compliance", "Regional deployment"]
              }
            ].map((industry, idx) => (
              <Reveal key={idx} delay={idx * 100} className="h-full">
                <div className="bg-white border border-gray-200 rounded-3xl p-8 h-full hover:border-[#0B79BF] hover:shadow-[0_10px_40px_rgba(11,121,191,0.1)] transition-all duration-300 group flex flex-col relative overflow-hidden">

                  {/* Static Header Info */}
                  <div className="mb-6 relative z-10 flex-grow transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="w-14 h-14 bg-blue-50 text-[#0B79BF] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-blue-100">
                      <industry.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#14477B] mb-3">{industry.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{industry.desc}</p>
                  </div>

                  {/* Hover Reveal Applications */}
                  <div className="relative z-10 bg-slate-50 rounded-xl p-5 border border-gray-100 transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 group-hover:border-[#0B79BF]/30 transition-all duration-300">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#0B79BF] mb-3">Key Applications</p>
                    <ul className="space-y-2">
                      {industry.apps.map((app, appIdx) => (
                        <li key={appIdx} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Abstract Corner Glow */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="text-center mt-12">
              <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#14477B] font-bold uppercase tracking-widest text-sm rounded-full border-2 border-gray-200 hover:border-[#0B79BF] hover:text-[#0B79BF] transition-all shadow-sm hover:shadow-md overflow-hidden">
                <span className="relative z-10">Not sure where you fit? Talk to our team</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 7. TRUST & INFRASTRUCTURE ================= */}
      <section className="py-24 md:py-32 bg-white relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-4xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas text-[#14477B] tracking-wide mb-6">
                Built for Mission-Critical Operations
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                Our infrastructure is designed to support systems where reliability, performance, and security are essential.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">

            {/* Visual Column */}
            <div className="lg:col-span-5 relative h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Reveal className="h-full w-full absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop"
                  alt="Enterprise Data Center"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/40 to-transparent"></div>

                {/* Floating Metric Strip */}
                <div className="absolute bottom-8 left-0 right-0 px-8">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center">
                    <p className="text-white font-bold tracking-widest uppercase text-sm mb-2 opacity-80">Infrastructure Baseline</p>
                    <p className="text-[#4da6e7] font-bebas text-2xl md:text-3xl tracking-widest leading-relaxed">
                      99.995% Uptime • 24/7 Monitoring • Enterprise-Grade Security
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Trust Grid */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "High Availability", desc: "Engineered for continuous uptime and fault tolerance.", icon: Activity },
                  { title: "Security by Design", desc: "Security is embedded across every layer of the system.", icon: ShieldCheck },
                  { title: "24/7 Monitoring", desc: "Continuous system monitoring and real-time alerts.", icon: Target },
                  { title: "Tier-Grade Infrastructure", desc: "Enterprise-grade data center standards and architecture.", icon: Database },
                  { title: "Compliance Ready", desc: "Built to meet regulatory and audit requirements.", icon: FileCheck },
                  { title: "Resilience & Recovery", desc: "Systems designed to withstand disruptions and recover quickly.", icon: Layers }
                ].map((item, idx) => (
                  <Reveal key={idx} delay={idx * 100}>
                    <div className="bg-slate-50 border border-gray-200 p-6 rounded-2xl hover:border-[#0B79BF]/50 hover:shadow-lg transition-all group h-full">
                      <item.icon className="w-8 h-8 text-[#0B79BF] mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-[#14477B] font-bold uppercase tracking-wide text-sm mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

          </div>

          <Reveal delay={400}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 border-t border-gray-200 pt-12 max-w-4xl mx-auto text-center md:text-left">
              <div className="w-16 h-16 bg-[#14477B] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[#14477B] mb-2">Trusted infrastructure for critical operations.</h4>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                  Designed for banking, government, and enterprise systems.
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 9. FUTURE & VISION ================= */}
      <section className="py-24 md:py-32 bg-[#040814] relative overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent via-[#0B79BF]/5 to-[#040814] pointer-events-none"></div>

        {/* Abstract Network Overlay */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute w-[800px] h-[800px] border border-[#0B79BF]/10 rounded-full top-[-400px] left-[-200px] animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute w-[1200px] h-[1200px] border border-white/5 rounded-full top-[-600px] left-[-400px] animate-[spin_90s_linear_infinite_reverse]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-4xl mx-auto mb-24">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4da6e7]/10 border border-[#4da6e7]/30 rounded text-xs font-bold uppercase tracking-widest text-[#4da6e7] mb-6">
                <Compass className="w-4 h-4" /> Future Roadmap
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas text-white tracking-wide mb-6">
                Building the Future of Digital Infrastructure
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-8">
                Bichuten is continuously expanding its platform to support evolving technologies, increasing demand, and future digital ecosystems.
              </p>
              <div className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full">
                <p className="text-[#4da6e7] font-bold uppercase tracking-widest text-sm">
                  Designed not just for today—but for the next generation of infrastructure.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Roadmap Progression */}
          <div className="relative mb-24 max-w-6xl mx-auto">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-[#0B79BF] to-transparent opacity-50 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { phase: "Phase 01", icon: Cpu, title: "AI-Ready Infrastructure", desc: "Secure and governed environments for AI, data analytics, and advanced workloads." },
                { phase: "Phase 02", icon: Cloud, title: "Hybrid Cloud Ecosystem", desc: "Seamless integration between sovereign infrastructure and global cloud platforms." },
                { phase: "Phase 03", icon: MapPin, title: "Expanding Data Center Network", desc: "Growth across multiple regions to enhance availability, performance, and resilience." },
                { phase: "Phase 04", icon: Lock, title: "Advanced Security & Trust", desc: "Next-generation encryption, identity, and compliance frameworks." }
              ].map((block, idx) => (
                <Reveal key={idx} delay={idx * 150} className="relative group">
                  {/* Timeline Node */}
                  <div className="w-14 h-14 bg-[#0A0E17] border-2 border-[#0B79BF] rounded-full flex items-center justify-center mx-auto mb-8 relative shadow-[0_0_20px_rgba(11,121,191,0.4)] group-hover:scale-110 group-hover:bg-[#0B79BF]/20 transition-all z-10">
                    <block.icon className="w-6 h-6 text-[#4da6e7]" />
                  </div>

                  {/* Card Content */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 hover:bg-white/10 transition-colors h-full">
                    <span className="text-[#4da6e7] font-bold text-xs uppercase tracking-widest block mb-4">{block.phase}</span>
                    <h3 className="text-white font-bebas text-xl tracking-wide mb-3">{block.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{block.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Trust Statement */}
          <Reveal delay={400}>
            <div className="text-center max-w-4xl mx-auto">
              <div className="bg-[#0B79BF]/10 border border-[#0B79BF]/30 px-8 py-8 rounded-3xl inline-block w-full mb-8 backdrop-blur-sm">
                <h4 className="text-2xl md:text-3xl font-bebas text-white tracking-widest">
                  Bichuten is building infrastructure that evolves with technology, scale, and global demand.
                </h4>
              </div>
              <p className="text-[#4da6e7] font-bold uppercase tracking-[0.2em] text-sm">
                Future-ready. Scalable. Built for long-term growth.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 10. FINAL CTA ================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#14477B] via-[#0B79BF] to-[#040814] p-10 md:p-20 overflow-hidden shadow-2xl">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/40 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <Reveal>
                <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
                  <ShieldCheck className="w-4 h-4 text-[#4da6e7]" />
                  <span className="text-white font-bold uppercase tracking-widest text-xs">
                    From infrastructure to security, we provide everything required to operate with confidence.
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bebas text-white tracking-wide mb-8 drop-shadow-lg">
                  Build Your Digital Infrastructure with Confidence
                </h2>

                <p className="text-lg md:text-2xl text-blue-100 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                  Partner with Bichuten to deploy secure, compliant, and high-performance infrastructure designed for long-term control and reliability.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#14477B] font-bold uppercase tracking-widest rounded-full hover:bg-gray-100 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300">
                    Request a Consultation
                  </button>
                  <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/40 text-white font-bold uppercase tracking-widest rounded-full hover:bg-white/10 hover:border-white transition-all duration-300">
                    Talk to Our Team
                  </button>
                  <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-blue-200 font-bold uppercase tracking-widest rounded-full hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group">
                    Explore Platform <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"></div>

                {/* Support Line */}
                <p className="text-blue-200 text-lg mb-12">
                  Our team will guide you through planning, deployment, and long-term infrastructure strategy.
                </p>

                {/* Trust Elements */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-12">
                  {[
                    "No obligation consultation",
                    "Enterprise-grade infrastructure",
                    "Built for mission-critical operations"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#34A853]" />
                      <span className="text-white font-medium text-sm tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Final Reassurance Line */}
                <div className="inline-block border border-white/20 bg-black/20 backdrop-blur-sm px-8 py-3 rounded-full shadow-inner">
                  <span className="text-white font-bebas text-xl md:text-2xl tracking-widest">
                    Secure. Compliant. Always in control.
                  </span>
                </div>

              </Reveal>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutUs;