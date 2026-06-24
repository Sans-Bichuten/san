import React, { useEffect, useRef, useState } from 'react';
import { 
  Briefcase, ShieldCheck, Database, RefreshCw, 
  MessageSquare, Lock, CheckCircle, ArrowRight, 
  Building2, Landmark, Wifi, Cpu, Layers, Activity,
  Globe, LayoutGrid
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
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${translateClasses[direction]} scale-95`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Solutions = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          .pattern-grid-light {
            background-image: radial-gradient(rgba(11, 121, 191, 0.15) 1px, transparent 1px);
            background-size: 32px 32px;
          }
          .glass-card-light {
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
            background: linear-gradient(to right, #14477B, #0B79BF, #4285F4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION (Light & Vibrant) ================= */}
      <section className="relative pt-32 pb-16 lg:min-h-[80vh] flex flex-col justify-center border-b border-gray-200 bg-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pattern-grid-light opacity-60 z-0"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-gradient-to-bl from-blue-100 via-white to-transparent rounded-full blur-[100px] z-0"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-tr from-green-50 via-white to-transparent rounded-full blur-[100px] z-0"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="max-w-2xl">
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full mb-6">
                  <Briefcase className="w-4 h-4 text-[#EA4335]" />
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-800">Business Solutions</span>
                </div>
              </Reveal>
              
              <Reveal delay={150}>
                <h1 className="text-4xl lg:text-5xl font-bebas tracking-wide text-[#14477B] mb-4 leading-[1.05]">
                  Sovereign Infrastructure Solutions <br/>
                  <span className="gradient-text-blue">for Mission-Critical Operations</span>
                </h1>
              </Reveal>

              <Reveal delay={300}>
                <p className="text-base md:text-lg font-light text-gray-600 mb-6 leading-relaxed">
                  Built for organizations that cannot compromise on control, compliance, and security. Bichuten delivers integrated infrastructure solutions designed for regulated, high-trust environments.
                </p>
                <div className="mb-6">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                    Trusted by Government • Financial Institutions • Critical Infrastructure
                  </p>
                </div>
              </Reveal>

              <Reveal delay={450}>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <button className="group bg-[#14477B] text-white px-8 py-3.5 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#0B79BF] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 rounded">
                    Explore Solutions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a href="/contact" className="bg-transparent text-[#14477B] px-8 py-3.5 font-bold text-sm tracking-wider uppercase transition-all duration-300 border-2 border-[#14477B] hover:bg-[#14477B] hover:text-white shadow-sm hover:shadow-md flex items-center justify-center rounded">
                    Talk to an Expert
                  </a>
                </div>
                <p className="text-xs text-gray-500 font-medium mb-6">
                  Purpose-built for regulated and mission-critical operations
                </p>
                
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#34A853]" />
                    <span className="text-sm font-medium text-gray-700">Data hosted within Nepal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#34A853]" />
                    <span className="text-sm font-medium text-gray-700">99.995% uptime infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#34A853]" />
                    <span className="text-sm font-medium text-gray-700">Compliance-ready by design</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Hero Visual: Corporate Tech Image */}
            <Reveal direction="left" delay={300} className="hidden lg:block relative h-[420px] xl:h-[480px]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10">
                 <img 
                   src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop" 
                   alt="Business Meeting" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#14477B]/80 via-transparent to-transparent"></div>
                 {/* Top Left Label */}
                 <div className="absolute top-6 left-6 bg-[#040814]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 z-20">
                   <span className="text-xs font-bold text-white uppercase tracking-widest">Sovereign Infrastructure</span>
                 </div>
              </div>
              {/* Floating Solution Badges */}
              <div className="absolute -right-8 bottom-32 glass-card-light p-4 rounded-xl z-20 animate-float-soft flex items-center gap-3" style={{animationDelay: '1s'}}>
                 <div className="p-2 bg-green-100 rounded-full text-[#34A853]"><ShieldCheck className="w-5 h-5"/></div>
                 <span className="font-bold text-sm text-gray-900">Compliance-Ready</span>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 2. STRATEGIC NARRATIVE (PROBLEM & POSITIONING) ================= */}
      <section className="py-24 md:py-32 relative bg-slate-50 border-b border-gray-200 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* HEADER & INTRO */}
          <Reveal>
            <div className="max-w-4xl mx-auto text-center mb-24">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas text-[#14477B] tracking-wide mb-8 leading-[1.1]">
                Why Traditional Infrastructure Fails<br className="hidden md:block"/> in Regulated Environments
              </h2>
              <div className="text-gray-600 text-lg md:text-xl leading-relaxed space-y-6">
                <p>
                  As organizations scale digitally, infrastructure is no longer just a technical decision—it is a matter of control, compliance, and risk.
                </p>
                <p className="font-medium text-gray-800">
                  Yet most systems today are built on fragmented, offshore, and externally dependent architectures that were never designed for regulated environments.
                </p>
              </div>
            </div>
          </Reveal>

          {/* PROBLEM CARDS (2 Column Grid) */}
          <div className="grid md:grid-cols-2 gap-6 mb-32 max-w-5xl mx-auto">
            <Reveal delay={100} className="bg-white border border-gray-200 p-8 rounded-xl hover:border-red-200 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="bg-red-50 p-3 rounded-lg border border-red-100 shrink-0">
                  <Database className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xl mb-2">Limited Control</h4>
                  <p className="text-gray-600 leading-relaxed">No direct control over data location and infrastructure.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200} className="bg-white border border-gray-200 p-8 rounded-xl hover:border-red-200 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="bg-red-50 p-3 rounded-lg border border-red-100 shrink-0">
                  <ShieldCheck className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xl mb-2">Compliance Risk</h4>
                  <p className="text-gray-600 leading-relaxed">Increasing audit complexity and regulatory exposure.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300} className="bg-white border border-gray-200 p-8 rounded-xl hover:border-red-200 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="bg-red-50 p-3 rounded-lg border border-red-100 shrink-0">
                  <Globe className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xl mb-2">Foreign Dependency</h4>
                  <p className="text-gray-600 leading-relaxed">Reliance on external providers and jurisdictions.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={400} className="bg-white border border-gray-200 p-8 rounded-xl hover:border-red-200 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="bg-red-50 p-3 rounded-lg border border-red-100 shrink-0">
                  <Lock className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xl mb-2">Security Gaps</h4>
                  <p className="text-gray-600 leading-relaxed">Distributed systems increase vulnerability surface.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={500} className="bg-white border border-gray-200 p-8 rounded-xl hover:border-red-200 hover:shadow-lg transition-all duration-300 md:col-span-2 lg:col-span-1 lg:col-start-1 lg:translate-x-1/2">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="bg-red-50 p-3 rounded-lg border border-red-100 shrink-0">
                  <Activity className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xl mb-2">Performance Issues</h4>
                  <p className="text-gray-600 leading-relaxed">Latency and inefficiencies from offshore hosting.</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* CONTRAST BLOCK (HERO ELEMENT) */}
          <Reveal>
            <div className="max-w-5xl mx-auto mb-32 relative">
              {/* Optional Visual Enhancements behind the table */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-[#14477B]/5 via-[#0B79BF]/10 to-transparent blur-3xl -z-10 pointer-events-none"></div>

              <div className="text-center mb-10">
                <h3 className="text-3xl md:text-4xl font-bebas tracking-wide text-gray-900">Traditional Infrastructure vs Bichuten Model</h3>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col md:flex-row relative z-10">
                
                {/* Visual VS Badge */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white border border-gray-200 rounded-full items-center justify-center z-20 shadow-md text-sm font-black tracking-widest text-gray-400">
                  VS
                </div>

                {/* Traditional Side */}
                <div className="flex-1 p-8 md:p-14 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50/80">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-10 text-center md:text-left">Traditional</h4>
                  <ul className="space-y-8">
                    <li className="flex items-center gap-5">
                      <div className="bg-gray-200 rounded-full p-2 flex-shrink-0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-500"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>
                      <span className="text-gray-600 font-medium text-lg">Fragmented tools</span>
                    </li>
                    <li className="flex items-center gap-5">
                      <div className="bg-gray-200 rounded-full p-2 flex-shrink-0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-500"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>
                      <span className="text-gray-600 font-medium text-lg">Offshore data dependency</span>
                    </li>
                    <li className="flex items-center gap-5">
                      <div className="bg-gray-200 rounded-full p-2 flex-shrink-0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-500"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>
                      <span className="text-gray-600 font-medium text-lg">Reactive security</span>
                    </li>
                    <li className="flex items-center gap-5">
                      <div className="bg-gray-200 rounded-full p-2 flex-shrink-0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-500"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>
                      <span className="text-gray-600 font-medium text-lg">Complex compliance</span>
                    </li>
                    <li className="flex items-center gap-5">
                      <div className="bg-gray-200 rounded-full p-2 flex-shrink-0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-500"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>
                      <span className="text-gray-600 font-medium text-lg">High latency</span>
                    </li>
                  </ul>
                </div>

                {/* Bichuten Side */}
                <div className="flex-1 p-8 md:p-14 bg-blue-50/80 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#0B79BF]/10 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none"></div>
                  <h4 className="text-sm font-bold text-[#14477B] uppercase tracking-[0.2em] mb-10 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
                     <ShieldCheck className="w-5 h-5 text-[#0B79BF]" />
                     <span>Bichuten Model</span>
                  </h4>
                  <ul className="space-y-8 relative z-10">
                    <li className="flex items-center gap-5">
                      <div className="bg-[#34A853]/20 rounded-full p-2 flex-shrink-0"><CheckCircle className="w-3.5 h-3.5 text-[#34A853] stroke-[3]" /></div>
                      <span className="text-gray-900 font-bold text-lg">Unified platform</span>
                    </li>
                    <li className="flex items-center gap-5">
                      <div className="bg-[#34A853]/20 rounded-full p-2 flex-shrink-0"><CheckCircle className="w-3.5 h-3.5 text-[#34A853] stroke-[3]" /></div>
                      <span className="text-gray-900 font-bold text-lg">Data hosted in Nepal</span>
                    </li>
                    <li className="flex items-center gap-5">
                      <div className="bg-[#34A853]/20 rounded-full p-2 flex-shrink-0"><CheckCircle className="w-3.5 h-3.5 text-[#34A853] stroke-[3]" /></div>
                      <span className="text-gray-900 font-bold text-lg">Security by design</span>
                    </li>
                    <li className="flex items-center gap-5">
                      <div className="bg-[#34A853]/20 rounded-full p-2 flex-shrink-0"><CheckCircle className="w-3.5 h-3.5 text-[#34A853] stroke-[3]" /></div>
                      <span className="text-gray-900 font-bold text-lg">Compliance-ready</span>
                    </li>
                    <li className="flex items-center gap-5">
                      <div className="bg-[#34A853]/20 rounded-full p-2 flex-shrink-0"><CheckCircle className="w-3.5 h-3.5 text-[#34A853] stroke-[3]" /></div>
                      <span className="text-gray-900 font-bold text-lg">Low latency</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </Reveal>

          {/* POSITIONING STATEMENT (STRONG BLOCK) */}
          <Reveal delay={150}>
            <div className="max-w-4xl mx-auto bg-[#14477B] rounded-2xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden mb-20 border border-blue-800">
              {/* Layer visualization/ambient light behind statement */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#0B79BF] rounded-full blur-[100px] opacity-40 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4285F4] rounded-full blur-[100px] opacity-30 pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed relative z-10">
                Bichuten replaces fragmented infrastructure with a <strong className="font-bold">unified, sovereign system</strong> designed for mission-critical and regulated operations.
              </h3>
            </div>
          </Reveal>

          {/* TRANSITION LINE */}
          <Reveal delay={300}>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-[0.15em]">
                Instead of adapting infrastructure to your needs,<br className="hidden md:block" /> Bichuten is designed around them.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 3. SOLUTION CATEGORIES (Enterprise Catalog) ================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
                Solutions Designed for Control, Compliance, and Scale
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Each solution is built to address critical infrastructure challenges across regulated and high-trust environments.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            
            {/* 1. Data Sovereignty */}
            <Reveal delay={0} className="group bg-white border border-gray-200 p-8 rounded-2xl flex flex-col hover:border-[#0B79BF] hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#14477B] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">Core Solution</div>
              <Globe className="w-10 h-10 text-[#14477B] mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-2 group-hover:text-[#14477B] transition-colors">Data Sovereignty</h3>
              <p className="text-[15px] font-medium text-gray-600 mb-6 flex-grow leading-relaxed">
                Ensure full control over where your data is stored and accessed.
              </p>
              
              <div className="mb-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">Local data residency</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">Regulatory alignment</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">Reduced foreign dependency</span>
                </div>
              </div>

              <div className="mb-8 pt-4 border-t border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Best For:</span>
                <span className="text-sm text-gray-600 font-medium">Banks • Government • Regulated Enterprises</span>
              </div>

              <a href="/contact" className="inline-flex items-center text-sm font-bold text-[#14477B] tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity mt-auto">
                Explore Solution <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Reveal>

            {/* 2. Compliance */}
            <Reveal delay={100} className="group bg-white border border-gray-200 p-8 rounded-2xl flex flex-col hover:border-[#0B79BF] hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">Regulated Use</div>
              <ShieldCheck className="w-10 h-10 text-[#14477B] mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-2 group-hover:text-[#14477B] transition-colors">Compliance & Regulatory</h3>
              <p className="text-[15px] font-medium text-gray-600 mb-6 flex-grow leading-relaxed">
                Meet regulatory requirements with integrated, audit-ready systems.
              </p>
              
              <div className="mb-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">Continuous monitoring</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">Audit-ready infrastructure</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">Structured compliance reporting</span>
                </div>
              </div>

              <div className="mb-8 pt-4 border-t border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Best For:</span>
                <span className="text-sm text-gray-600 font-medium">Financial Institutions • Healthcare • Public Sector</span>
              </div>

              <a href="/contact" className="inline-flex items-center text-sm font-bold text-[#14477B] tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity mt-auto">
                Explore Solution <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Reveal>

            {/* 3. Cyber Resilience */}
            <Reveal delay={200} className="group bg-white border border-gray-200 p-8 rounded-2xl flex flex-col hover:border-[#0B79BF] hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#EA4335] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">High Demand</div>
              <RefreshCw className="w-10 h-10 text-[#14477B] mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-2 group-hover:text-[#14477B] transition-colors">Cyber Resilience & DR</h3>
              <p className="text-[15px] font-medium text-gray-600 mb-6 flex-grow leading-relaxed">
                Ensure business continuity with automated failover and recovery.
              </p>
              
              <div className="mb-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">Ransomware-resistant backups</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">Real-time data replication</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">Automated failover systems</span>
                </div>
              </div>

              <div className="mb-8 pt-4 border-t border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Best For:</span>
                <span className="text-sm text-gray-600 font-medium">Critical Infrastructure • Large Enterprises</span>
              </div>

              <a href="/contact" className="inline-flex items-center text-sm font-bold text-[#14477B] tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity mt-auto">
                Explore Solution <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Reveal>

            {/* 4. Secure Communication */}
            <Reveal delay={300} className="group bg-white border border-gray-200 p-8 rounded-2xl flex flex-col hover:border-[#0B79BF] hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <MessageSquare className="w-10 h-10 text-[#14477B] mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-2 group-hover:text-[#14477B] transition-colors">Secure Communication</h3>
              <p className="text-[15px] font-medium text-gray-600 mb-6 flex-grow leading-relaxed">
                Operate internal communications within a fully controlled environment.
              </p>
              
              <div className="mb-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">End-to-end encryption</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">On-premise or local hosting</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">Compliance-ready channels</span>
                </div>
              </div>

              <div className="mb-8 pt-4 border-t border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Best For:</span>
                <span className="text-sm text-gray-600 font-medium">Defense • Government • Executive Teams</span>
              </div>

              <a href="/contact" className="inline-flex items-center text-sm font-bold text-[#14477B] tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity mt-auto">
                Explore Solution <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Reveal>

            {/* 5. Digital Trust */}
            <Reveal delay={400} className="group bg-white border border-gray-200 p-8 rounded-2xl flex flex-col hover:border-[#0B79BF] hover:shadow-xl transition-all duration-300 relative overflow-hidden md:col-span-2 lg:col-span-1">
              <Lock className="w-10 h-10 text-[#14477B] mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-2 group-hover:text-[#14477B] transition-colors">Digital Trust & Security</h3>
              <p className="text-[15px] font-medium text-gray-600 mb-6 flex-grow leading-relaxed">
                Secure document storage and identity verification frameworks.
              </p>
              
              <div className="mb-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">Secure document vaults</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">Digital signature integration</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5 shrink-0"/> 
                  <span className="text-sm text-gray-700">Identity-based access</span>
                </div>
              </div>

              <div className="mb-8 pt-4 border-t border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Best For:</span>
                <span className="text-sm text-gray-600 font-medium">Legal • Finance • Central Authorities</span>
              </div>

              <a href="/contact" className="inline-flex items-center text-sm font-bold text-[#14477B] tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity mt-auto">
                Explore Solution <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 4. INDUSTRY-ALIGNED SOLUTIONS (Enterprise Trust Block) ================= */}
      <section className="py-24 md:py-32 bg-slate-50 relative border-y border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <Reveal>
              <div className="inline-block mb-4">
                <span className="bg-red-50 text-red-600 text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-red-100">
                  Used in environments where failure is not an option
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
                Built for Industries Where Reliability is Critical
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Bichuten powers infrastructure for sectors where data security, compliance, and uptime are non-negotiable.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            
            {/* 1. Banking & Financial Services */}
            <Reveal delay={0} className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-[#0B79BF] hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col h-full cursor-pointer">
              <div className="absolute top-4 right-4 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gray-200">Regulated Industry</div>
              <Landmark className="w-10 h-10 text-[#14477B] mb-5 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Banking & Financial Services</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Secure transactions and regulatory compliance infrastructure
              </p>
              
              <div className="mt-auto pt-0 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:pt-6 transition-all duration-500 overflow-hidden">
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[13px] font-medium text-[#14477B] leading-relaxed">
                    Core banking systems, payment processing, audit-ready environments
                  </p>
                </div>
              </div>
            </Reveal>

            {/* 2. Government & Public Sector */}
            <Reveal delay={100} className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-[#0B79BF] hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col h-full cursor-pointer">
              <div className="absolute top-4 right-4 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gray-200">Critical Infrastructure</div>
              <Building2 className="w-10 h-10 text-[#14477B] mb-5 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Government & Public Sector</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                National data systems with full sovereignty and control
              </p>
              
              <div className="mt-auto pt-0 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:pt-6 transition-all duration-500 overflow-hidden">
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[13px] font-medium text-[#14477B] leading-relaxed">
                    E-governance platforms, citizen data, secure digital services
                  </p>
                </div>
              </div>
            </Reveal>

            {/* 3. Telecom & ISPs */}
            <Reveal delay={200} className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-[#0B79BF] hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col h-full cursor-pointer">
              <div className="absolute top-4 right-4 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gray-200">Critical Infrastructure</div>
              <Wifi className="w-10 h-10 text-[#14477B] mb-5 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Telecom & ISPs</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                High-performance infrastructure for network and data delivery
              </p>
              
              <div className="mt-auto pt-0 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:pt-6 transition-all duration-500 overflow-hidden">
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[13px] font-medium text-[#14477B] leading-relaxed">
                    Core network systems, data routing, infrastructure backbone
                  </p>
                </div>
              </div>
            </Reveal>

            {/* 4. Enterprise Organizations */}
            <Reveal delay={300} className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-[#0B79BF] hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col h-full cursor-pointer md:col-span-2 lg:col-span-1 lg:col-start-1 lg:translate-x-1/2">
              <Briefcase className="w-10 h-10 text-[#14477B] mb-5 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise Organizations</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Reliable infrastructure for mission-critical business systems
              </p>
              
              <div className="mt-auto pt-0 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:pt-6 transition-all duration-500 overflow-hidden">
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[13px] font-medium text-[#14477B] leading-relaxed">
                    ERP, internal systems, operational data environments
                  </p>
                </div>
              </div>
            </Reveal>

            {/* 5. Digital & Tech Platforms */}
            <Reveal delay={400} className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-[#0B79BF] hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col h-full cursor-pointer md:col-span-2 lg:col-span-1 lg:col-start-2 lg:translate-x-1/2">
              <Globe className="w-10 h-10 text-[#14477B] mb-5 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital & Tech Platforms</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Scalable backend infrastructure for modern applications
              </p>
              
              <div className="mt-auto pt-0 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:pt-6 transition-all duration-500 overflow-hidden">
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[13px] font-medium text-[#14477B] leading-relaxed">
                    SaaS platforms, data systems, scalable architectures
                  </p>
                </div>
              </div>
            </Reveal>

          </div>

          <Reveal delay={200}>
            <div className="text-center">
              <a href="/industries" className="inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 text-gray-900 font-bold uppercase tracking-wider text-sm rounded-lg hover:border-[#14477B] hover:text-[#14477B] hover:shadow-lg transition-all duration-300 group">
                Explore Industry Solutions 
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 5. PLATFORM INTEGRATION ================= */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-gray-200">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-4xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas text-[#14477B] tracking-wide mb-6">
                One Integrated Platform.<br className="hidden sm:block"/> Not Fragmented Systems.
              </h2>
              <p className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed mb-4">
                Every solution is built on a unified architecture—ensuring seamless performance, security, and compliance across your entire infrastructure.
              </p>
              <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Unlike traditional setups that rely on multiple disconnected tools, Bichuten operates as a fully integrated system.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
            
            {/* Left: The Flow / Diagram */}
            <Reveal direction="right" className="relative">
              {/* Connecting vertical line (hidden on very small screens) */}
              <div className="absolute top-10 bottom-10 left-[39px] w-0.5 bg-gradient-to-b from-[#14477B] via-[#4285F4] to-[#34A853] hidden sm:block opacity-20"></div>

              <div className="space-y-6 relative">
                
                {/* Infrastructure */}
                <div className="flex gap-6 group">
                  <div className="w-20 h-20 shrink-0 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center relative z-10 group-hover:border-[#14477B] group-hover:shadow-md transition-all">
                    <Database className="w-8 h-8 text-[#14477B]" />
                  </div>
                  <div className="flex-1 pt-3">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">Infrastructure</h4>
                    <p className="text-sm text-gray-600">Compute, storage, and physical infrastructure within Nepal</p>
                  </div>
                </div>

                {/* Communication */}
                <div className="flex gap-6 group">
                  <div className="w-20 h-20 shrink-0 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center relative z-10 group-hover:border-[#0B79BF] group-hover:shadow-md transition-all">
                    <MessageSquare className="w-8 h-8 text-[#0B79BF]" />
                  </div>
                  <div className="flex-1 pt-3">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">Communication</h4>
                    <p className="text-sm text-gray-600">Secure data exchange across systems and users</p>
                  </div>
                </div>

                {/* Identity & Access */}
                <div className="flex gap-6 group">
                  <div className="w-20 h-20 shrink-0 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center relative z-10 group-hover:border-[#4285F4] group-hover:shadow-md transition-all">
                    <Lock className="w-8 h-8 text-[#4285F4]" />
                  </div>
                  <div className="flex-1 pt-3">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">Identity & Access</h4>
                    <p className="text-sm text-gray-600">Control who can access what, and how</p>
                  </div>
                </div>

                {/* Security */}
                <div className="flex gap-6 group">
                  <div className="w-20 h-20 shrink-0 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center relative z-10 group-hover:border-[#EA4335] group-hover:shadow-md transition-all">
                    <ShieldCheck className="w-8 h-8 text-[#EA4335]" />
                  </div>
                  <div className="flex-1 pt-3">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">Security</h4>
                    <p className="text-sm text-gray-600">Encryption, protection, and threat prevention</p>
                  </div>
                </div>

                {/* Compliance */}
                <div className="flex gap-6 group">
                  <div className="w-20 h-20 shrink-0 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center relative z-10 group-hover:border-[#34A853] group-hover:shadow-md transition-all">
                    <Activity className="w-8 h-8 text-[#34A853]" />
                  </div>
                  <div className="flex-1 pt-3">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">Compliance</h4>
                    <p className="text-sm text-gray-600">Monitoring, reporting, and audit readiness</p>
                  </div>
                </div>

              </div>
            </Reveal>

            {/* Right: Why This Matters / Outcomes */}
            <Reveal direction="left" delay={200} className="lg:pt-12">
              <div className="bg-slate-50 border border-gray-200 rounded-3xl p-10 md:p-12 shadow-sm relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#14477B]/5 rounded-full blur-[40px] pointer-events-none"></div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <Layers className="w-6 h-6 text-[#14477B]" /> Why This Matters
                </h3>
                
                <ul className="space-y-6 mb-12 relative z-10">
                  <li className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-full shrink-0"><CheckCircle className="w-5 h-5 text-green-600 stroke-[3]" /></div>
                    <span className="text-lg text-gray-800 font-medium tracking-wide">No integration complexity</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-full shrink-0"><CheckCircle className="w-5 h-5 text-green-600 stroke-[3]" /></div>
                    <span className="text-lg text-gray-800 font-medium tracking-wide">No vendor fragmentation</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-full shrink-0"><CheckCircle className="w-5 h-5 text-green-600 stroke-[3]" /></div>
                    <span className="text-lg text-gray-800 font-medium tracking-wide">Faster deployment</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-full shrink-0"><CheckCircle className="w-5 h-5 text-green-600 stroke-[3]" /></div>
                    <span className="text-lg text-gray-800 font-medium tracking-wide">Unified control and visibility</span>
                  </li>
                </ul>

                <div className="pt-8 border-t border-gray-200 relative z-10">
                  <p className="text-sm font-bold text-[#14477B] uppercase tracking-[0.15em] leading-relaxed">
                    Built as one system—<br className="hidden sm:block" />not assembled from multiple vendors.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 6. BUSINESS OUTCOMES (Executive Value Block) ================= */}
      <section className="py-24 md:py-32 bg-[#14477B] text-white relative overflow-hidden">
        {/* Subtle texture/background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0B79BF]/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-4xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas tracking-wide mb-6">
                What This Means for Your Organization
              </h2>
              <p className="text-blue-100 text-lg md:text-xl font-medium leading-relaxed mb-6">
                Beyond infrastructure, Bichuten delivers measurable impact across control, compliance, performance, and long-term operational stability.
              </p>
              <div className="inline-block mt-2">
                <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#0B79BF] bg-blue-900/40 px-5 py-2.5 rounded-full border border-blue-800/50">
                  Designed for organizations operating in regulated and high-trust environments
                </span>
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
            
            {/* 1 */}
            <Reveal delay={0} className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/15 transition-colors h-full flex flex-col">
              <div className="bg-[#0B79BF]/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-[#0B79BF]/30 shrink-0">
                <Globe className="w-6 h-6 text-blue-300" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-wide">Full Control Over Data</h4>
              <p className="text-blue-100/80 font-medium leading-relaxed flex-grow">
                Maintain complete control over where your data resides, how it is accessed, and how it is governed—within Nepal.
              </p>
            </Reveal>

            {/* 2 */}
            <Reveal delay={100} className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/15 transition-colors h-full flex flex-col">
              <div className="bg-[#0B79BF]/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-[#0B79BF]/30 shrink-0">
                <Lock className="w-6 h-6 text-blue-300" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-wide">Simplified Compliance</h4>
              <p className="text-blue-100/80 font-medium leading-relaxed flex-grow">
                Reduce audit complexity with infrastructure designed to meet regulatory requirements from day one.
              </p>
            </Reveal>

            {/* 3 */}
            <Reveal delay={200} className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/15 transition-colors h-full flex flex-col">
              <div className="bg-[#0B79BF]/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-[#0B79BF]/30 shrink-0">
                <ShieldCheck className="w-6 h-6 text-blue-300" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-wide">Enhanced Security Posture</h4>
              <p className="text-blue-100/80 font-medium leading-relaxed flex-grow">
                Protect critical systems with integrated security, encryption, and access control built into every layer.
              </p>
            </Reveal>

            {/* 4 */}
            <Reveal delay={300} className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/15 transition-colors h-full flex flex-col">
              <div className="bg-[#0B79BF]/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-[#0B79BF]/30 shrink-0">
                <Activity className="w-6 h-6 text-blue-300" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-wide">Improved Performance</h4>
              <p className="text-blue-100/80 font-medium leading-relaxed flex-grow">
                Achieve faster response times and system efficiency through locally hosted infrastructure.
              </p>
            </Reveal>

            {/* 5 */}
            <Reveal delay={400} className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/15 transition-colors h-full flex flex-col">
              <div className="bg-[#0B79BF]/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-[#0B79BF]/30 shrink-0">
                <RefreshCw className="w-6 h-6 text-blue-300" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-wide">Reduced Operational Risk</h4>
              <p className="text-blue-100/80 font-medium leading-relaxed flex-grow">
                Minimize dependency on external platforms and reduce exposure to jurisdictional and third-party risks.
              </p>
            </Reveal>

            {/* 6 */}
            <Reveal delay={500} className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/15 transition-colors h-full flex flex-col">
              <div className="bg-[#0B79BF]/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-[#0B79BF]/30 shrink-0">
                <Layers className="w-6 h-6 text-blue-300" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-wide">Long-Term Scalability</h4>
              <p className="text-blue-100/80 font-medium leading-relaxed flex-grow">
                Build infrastructure that grows with your organization, supporting future technologies and expansion.
              </p>
            </Reveal>

          </div>

          <Reveal delay={300}>
            <div className="text-center pt-8 border-t border-blue-800/50">
              <p className="text-xl md:text-2xl font-light text-white tracking-wide">
                This is not just infrastructure—<strong className="text-[#0B79BF] font-bold">it is a strategic foundation for digital operations.</strong>
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 7. FINAL CTA (Conversion Block) ================= */}
      <section className="py-32 relative overflow-hidden bg-white border-t border-gray-200">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#14477B]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="mb-6">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#0B79BF] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                  Designed for organizations that cannot afford compromise.
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas text-[#14477B] tracking-wide mb-6">
                Start Building Sovereign Infrastructure Today
              </h2>
              
              <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Take control of your data, compliance, and infrastructure before it becomes a risk.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                {/* Primary CTA */}
                <a href="/contact" className="w-full sm:w-auto px-8 py-4 bg-[#14477B] text-white font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-[#0B79BF] hover:shadow-[0_8px_20px_rgba(20,71,123,0.3)] hover:-translate-y-1 transition-all duration-300">
                  Request Demo
                </a>
                
                {/* Secondary CTA */}
                <a href="/contact" className="w-full sm:w-auto px-8 py-4 bg-white text-[#14477B] border-2 border-[#14477B] font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-slate-50 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  Talk to Expert
                </a>

                {/* Tertiary CTA */}
                <a href="#" className="w-full sm:w-auto px-6 py-4 text-gray-500 font-bold uppercase tracking-wider text-xs hover:text-[#0B79BF] transition-colors underline underline-offset-4 decoration-gray-300 hover:decoration-[#0B79BF]">
                  Download Architecture Brief
                </a>
              </div>

              {/* Trust Elements */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-16 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#34A853]" />
                  <span className="text-sm font-medium text-gray-700">No obligation consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#34A853]" />
                  <span className="text-sm font-medium text-gray-700">Enterprise-grade security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#34A853]" />
                  <span className="text-sm font-medium text-gray-700">Built for regulated environments</span>
                </div>
              </div>

              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
                Secure. Compliant. Built for long-term reliability.
              </p>

            </Reveal>
          </div>
        </div>
      </section>

    

    </div>
  );
};

export default Solutions;