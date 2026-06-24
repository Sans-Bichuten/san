import React, { useEffect, useRef, useState } from 'react';
import { 
  ShieldCheck, FileSearch, AlertTriangle, ArrowRight, 
  Activity, Database, Server, RefreshCw, FileText, 
  Lock, CheckCircle, MapPin, Eye, Building2, Landmark, 
  Wifi, Briefcase, Archive, Scale, Layers
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

const ComplianceRegulatorySolution = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          @keyframes slideRight {
            0% { transform: translateX(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
          }
          .animate-scan-horizontal {
            position: absolute;
            height: 100%;
            width: 4px;
            background: linear-gradient(180deg, transparent, #34A853, transparent);
            box-shadow: 0 0 15px #34A853;
            animation: slideRight 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          @keyframes pulseSoft {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          .animate-pulse-soft {
            animation: pulseSoft 4s ease-in-out infinite;
          }
          @keyframes dataFlow {
            100% { stroke-dashoffset: -100; }
          }
          .animate-flow {
            stroke-dasharray: 8 8;
            animation: dataFlow 1.5s linear infinite;
          }
          .dark-glass {
            background: rgba(4, 8, 20, 0.7);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          }
          .light-glass {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 1);
            box-shadow: 0 10px 30px rgba(20, 71, 123, 0.08);
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION (Real-Time Compliance Console) ================= */}
      <section className="relative pt-40 pb-32 min-h-[90vh] flex flex-col justify-center bg-[#040814] overflow-hidden">
        {/* Deep Governance Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#040814] via-[#040814]/90 to-[#14477B]/20"></div>
          
          {/* Subtle Scan Lines */}
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)', backgroundSize: '100% 4px' }}></div>
        </div>

        {/* Floating Governance Nodes */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#34A853]/10 rounded-full blur-[100px] z-0 animate-pulse-soft"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#14477B]/20 rounded-full blur-[120px] z-0 animate-pulse-soft" style={{animationDelay: '2s'}}></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Core Messaging */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-1.5 dark-glass rounded-full border border-[#34A853]/30 mb-8 shadow-[0_0_15px_rgba(52,168,83,0.15)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#34A853]/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="w-2 h-2 rounded-full bg-[#34A853] animate-ping absolute"></div>
                  <div className="w-2 h-2 rounded-full bg-[#34A853] relative"></div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#34A853]">Live Compliance Engine</span>
                </div>
              </Reveal>
              
              <Reveal delay={150}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-white mb-6 leading-[0.95]">
                  Continuous Compliance. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] to-[#34A853]">
                    Built Into Your Infrastructure.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={300}>
                <p className="text-xl font-light text-blue-100/80 mb-8 leading-relaxed max-w-2xl">
                  Monitor, enforce, and report compliance in real-time—through an integrated infrastructure designed for governance, visibility, and audit readiness.
                </p>
                
                {/* Real-Time Status Strip */}
                <div className="flex flex-wrap items-center gap-4 mb-10 dark-glass p-3 rounded-lg border-l-2 border-l-[#34A853]">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#34A853]/10 text-[#34A853] rounded text-sm font-bold tracking-wide">
                    <CheckCircle className="w-4 h-4" /> Compliance Status: Active
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#34A853]/10 text-[#34A853] rounded text-sm font-bold tracking-wide">
                    <ShieldCheck className="w-4 h-4" /> Audit Readiness: 100%
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#4285F4]/10 text-[#4285F4] rounded text-sm font-bold tracking-wide">
                    <Activity className="w-4 h-4 animate-pulse" /> Monitoring: Live
                  </div>
                </div>
              </Reveal>

              <Reveal delay={450}>
                <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
                  <button className="group bg-[#34A853] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#2b8a44] shadow-[0_0_20px_rgba(52,168,83,0.3)] hover:shadow-[0_0_30px_rgba(52,168,83,0.5)] flex items-center justify-center gap-3 rounded-lg hover:-translate-y-1">
                    Request Compliance Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a href="/architecture" className="dark-glass text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:border-white/30 hover:bg-white/10 rounded-lg flex items-center justify-center gap-2 hover:-translate-y-1">
                    <FileSearch className="w-5 h-5" /> View Compliance Architecture
                  </a>
                </div>
                
                {/* Trust Strip */}
                <div className="flex items-center gap-4 text-xs font-bold tracking-[0.15em] text-gray-500 uppercase">
                  <span>Always Monitoring</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  <span>Always Compliant</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  <span className="text-[#0B79BF]">Always Audit-Ready</span>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Live Activity Feed */}
            <Reveal direction="left" delay={600} className="lg:col-span-5 relative w-full perspective-1000">
              <div 
                className="w-full h-[450px] bg-[#02040A] rounded-xl border border-gray-800 shadow-[0_20px_60px_rgba(52,168,83,0.15)] relative overflow-hidden flex flex-col transition-transform duration-700 hover:transform-none"
                style={{ transform: 'rotateY(-5deg)' }}
              >
                
                {/* Console Header */}
                <div className="h-12 bg-[#0A0E17] border-b border-gray-800 flex items-center justify-between px-4 sticky top-0 z-20">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                   </div>
                   <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></span>
                     Live Governance Log
                   </div>
                </div>

                {/* Log Feed */}
                <div className="flex-1 p-5 font-mono text-[11px] sm:text-xs leading-relaxed overflow-hidden relative">
                   <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#02040A] to-transparent z-10"></div>
                   <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#02040A] to-transparent z-10"></div>
                   
                   <div className="space-y-3 text-gray-400 absolute bottom-6 left-5 right-5">
                      <div className="flex items-start gap-3 opacity-30">
                        <span className="text-gray-600">14:08:12</span>
                        <span className="text-[#34A853]">[OK]</span>
                        <span>Immutable lock applied to Snapshot 11B</span>
                      </div>
                      <div className="flex items-start gap-3 opacity-50">
                        <span className="text-gray-600">14:08:15</span>
                        <span className="text-[#0B79BF]">[INFO]</span>
                        <span>Policy 44A Match - Transaction Cleared</span>
                      </div>
                      <div className="flex items-start gap-3 opacity-70">
                        <span className="text-gray-600">14:08:22</span>
                        <span className="text-[#34A853]">[OK]</span>
                        <span>Auth Verified - User ID 492 [Access Granted]</span>
                      </div>
                      <div className="flex items-start gap-3 opacity-90">
                        <span className="text-gray-600">14:08:29</span>
                        <span className="text-[#0B79BF]">[INFO]</span>
                        <span>Archival: Snapshot generated and hashed</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-gray-600">14:08:31</span>
                        <span className="text-[#34A853]">[OK]</span>
                        <span className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">Data integrity check passed across all nodes</span>
                      </div>
                      <div className="flex items-start gap-3 mt-4">
                        <span className="w-2 h-4 bg-[#34A853] animate-pulse"></span>
                      </div>
                   </div>
                </div>

              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 2. PROBLEM: RISK & REGULATORY PRESSURE ================= */}
      <section className="py-24 md:py-32 relative bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">
                The Hidden Risks of Compliance Gaps
              </h2>
              <div className="inline-block px-4 py-1.5 bg-[#EA4335]/10 text-[#EA4335] text-sm font-bold tracking-wide rounded border border-[#EA4335]/20 mb-6">
                Most compliance failures are discovered only during audits—when it is already too late.
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                As regulatory requirements become more stringent, organizations face increasing pressure to maintain continuous compliance. Yet most systems are still built around fragmented tools, manual processes, and delayed reporting—creating hidden risks across operations.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            {[
              { 
                title: "Fragmented Systems", 
                icon: Layers, 
                desc: "Compliance tools and processes are disconnected, leading to inconsistent governance.", 
                impact: "Risk of audit failure"
              },
              { 
                title: "No Real-Time Visibility", 
                icon: Eye, 
                desc: "Lack of continuous monitoring prevents timely detection of issues and violations.", 
                impact: "Delayed incident response"
              },
              { 
                title: "Audit Readiness Gaps", 
                icon: FileSearch, 
                desc: "Difficulty in maintaining structured, accessible records for audits and investigations.", 
                impact: "Penalty exposure"
              },
              { 
                title: "Delayed Reporting", 
                icon: Activity, 
                desc: "Slow compliance reporting increases risk of non-compliance and penalties.", 
                impact: "Loss of regulatory trust"
              },
              { 
                title: "Regulatory Exposure", 
                icon: AlertTriangle, 
                desc: "Increased vulnerability to fines, penalties, and reputational damage.", 
                impact: "Severe financial & reputational damage"
              }
            ].map((risk, i) => (
              <Reveal key={i} delay={i * 100} className={`bg-slate-50 p-6 rounded-xl border border-gray-100 hover:border-[#EA4335]/30 hover:shadow-[0_10px_30px_rgba(234,67,53,0.05)] transition-all duration-300 group relative overflow-hidden ${i === 4 ? 'md:col-span-2 md:w-2/3 md:mx-auto' : ''}`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#EA4335]/5 rounded-bl-full translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-[#EA4335]/40 transition-colors">
                    <risk.icon className="w-6 h-6 text-gray-500 group-hover:text-[#EA4335] transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#EA4335] transition-colors">{risk.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{risk.desc}</p>
                    
                    {/* Hover Interactive Detail */}
                    <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-300 ease-in-out">
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                        <AlertTriangle className="w-4 h-4 text-[#EA4335]" />
                        <span className="text-xs font-bold text-[#EA4335] uppercase tracking-wider">Potential Impact: {risk.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500} className="max-w-4xl mx-auto">
            <div className="bg-[#EA4335]/5 border-l-4 border-[#EA4335] p-6 rounded-r-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#EA4335]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
              <div className="flex items-center gap-4 relative z-10">
                <AlertTriangle className="w-6 h-6 text-[#EA4335] flex-shrink-0" />
                <p className="text-gray-800 font-bold tracking-wide">
                  Compliance gaps directly impact operational trust, regulatory standing, and business continuity.
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 3. TRANSFORMATION (Old vs New Comparison) ================= */}
      <section className="py-24 md:py-32 relative bg-slate-50 border-b border-gray-200 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
                From Periodic Audits to Continuous Compliance
              </h2>
              <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed">
                Compliance is no longer a periodic activity—it must be continuous, automated, and embedded into infrastructure.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch mb-16">
            
            {/* Left Side: Traditional Compliance (Weak Model) */}
            <Reveal direction="right" className="bg-white p-10 rounded-2xl border border-gray-200 shadow-sm opacity-80 hover:opacity-100 transition-opacity duration-300 relative group">
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-red-50/50 rounded-bl-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bebas text-gray-800 tracking-wider">Traditional Compliance Approach</h3>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[
                    { text: "Periodic audits", detail: "Creates long blind spots between checks" },
                    { text: "Manual processes", detail: "Prone to delays and human error" },
                    { text: "Delayed reporting", detail: "Increases risk of non-compliance penalties" },
                    { text: "Fragmented tools", detail: "Leads to inconsistent governance" },
                    { text: "Reactive issue handling", detail: "Damage occurs before detection" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group/item relative">
                      <div className="mt-1 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                         <div className="w-2 h-0.5 bg-red-400"></div>
                      </div>
                      <span className="text-gray-600 font-medium">{item.text}</span>
                      
                      {/* Interactive Tooltip */}
                      <div className="absolute left-8 -top-8 bg-gray-900 text-white text-xs px-3 py-1.5 rounded opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 whitespace-nowrap shadow-lg z-20 pointer-events-none">
                        {item.detail}
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm font-bold text-red-500 uppercase tracking-widest">
                    Issues are discovered after they occur.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right Side: Continuous Compliance (Strong Model) */}
            <Reveal direction="left" delay={150} className="bg-[#14477B] text-white p-10 rounded-2xl border border-[#0B79BF]/50 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#34A853]/20 rounded-full blur-[60px] -z-0"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#34A853]/20 border border-[#34A853]/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(52,168,83,0.3)]">
                    <RefreshCw className="w-5 h-5 text-[#34A853]" />
                  </div>
                  <h3 className="text-2xl font-bebas tracking-wider text-white">Continuous Compliance Model</h3>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[
                    { text: "Real-time monitoring", detail: "Constant visibility into all operations" },
                    { text: "Automated enforcement", detail: "Policies applied without manual intervention" },
                    { text: "Instant reporting", detail: "Audit-ready data available instantly" },
                    { text: "Integrated system", detail: "Unified architecture for all compliance needs" },
                    { text: "Proactive governance", detail: "Issues prevented before they occur" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group/item relative">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-[#34A853]/20 flex items-center justify-center flex-shrink-0">
                         <CheckCircle className="w-3 h-3 text-[#34A853]" />
                      </div>
                      <span className="text-blue-50 font-medium">{item.text}</span>
                      
                      {/* Interactive Tooltip */}
                      <div className="absolute left-8 -top-8 bg-[#34A853] text-[#040814] font-bold text-xs px-3 py-1.5 rounded opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 whitespace-nowrap shadow-lg z-20 pointer-events-none">
                        {item.detail}
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm font-bold text-[#34A853] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></span>
                    Compliance is maintained at all times.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>

          <Reveal delay={400}>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xl text-[#14477B] font-bold tracking-wide mb-8">
                "Bichuten transforms compliance from a reactive burden into a continuous, system-driven capability."
              </p>
              
              {/* Micro Outcome Strip */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold tracking-[0.1em] uppercase text-gray-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#34A853]" /> Always audit-ready
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#34A853]" /> No compliance gaps
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#34A853]" /> No manual overhead
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 4. HOW COMPLIANCE WORKS (Merged System Flow) ================= */}
      <section className="py-24 md:py-32 relative bg-[#040814] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#34A853]/10 rounded-[100%] blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">
                How Bichuten Delivers Continuous Compliance
              </h2>
              <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed mb-6">
                Compliance is built into every layer of the system—ensuring real-time monitoring, reporting, and governance across your entire infrastructure.
              </p>
              <div className="inline-block border border-[#34A853]/40 bg-[#34A853]/10 text-[#34A853] px-4 py-1.5 rounded text-xs font-bold uppercase tracking-widest">
                Not added as a tool—built into the infrastructure.
              </div>
            </Reveal>
          </div>

          {/* System Flow Diagram */}
          <div className="relative max-w-6xl mx-auto mb-24">
            {/* SVG Connecting Path */}
            <svg className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 hidden md:block z-0" preserveAspectRatio="none">
              <line x1="0" y1="4" x2="100%" y2="4" stroke="#34A853" strokeWidth="2" strokeDasharray="4 4" className="opacity-30" />
              <line x1="0" y1="4" x2="100%" y2="4" stroke="#34A853" strokeWidth="2" strokeDasharray="4 4" className="animate-flow" />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {[
                { id: "STORE", icon: Database, desc: "Data securely stored with defined retention policies", impact: "Immutable architecture" },
                { id: "LOG", icon: FileText, desc: "Every system and user activity is recorded", impact: "100% Traceability" },
                { id: "MONITOR", icon: Activity, desc: "Real-time tracking and anomaly detection", impact: "Detects policy violations instantly" },
                { id: "REPORT", icon: FileSearch, desc: "Instant compliance and audit reporting", impact: "Automated transparency" },
                { id: "ARCHIVE", icon: Archive, desc: "Long-term, immutable data storage", impact: "Tamper-proof history" }
              ].map((step, i) => (
                <Reveal key={i} delay={i * 100} className="group cursor-default">
                  <div className="bg-[#0A0E17] border border-gray-800 p-6 rounded-xl flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:border-[#34A853]/50 hover:bg-[#0f1724] hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] h-full">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#34A853]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="w-16 h-16 rounded-full bg-[#040814] border border-gray-700 flex items-center justify-center mb-6 group-hover:border-[#34A853] group-hover:shadow-[0_0_15px_rgba(52,168,83,0.4)] transition-all duration-300 relative z-10">
                      <step.icon className="w-7 h-7 text-gray-500 group-hover:text-[#34A853] transition-colors" />
                    </div>
                    
                    <h4 className="text-xl font-bebas text-white tracking-widest mb-3 relative z-10">{step.id}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4 relative z-10 h-10">{step.desc}</p>
                    
                    {/* Hover Detail */}
                    <div className="w-full pt-3 border-t border-gray-800 relative z-10 overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 mt-auto">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#34A853]">{step.impact}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Integration Layers */}
          <div className="max-w-5xl mx-auto">
            <Reveal delay={200}>
              <h3 className="text-center text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-8">Integrated Across Platform Layers</h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { layer: "Identity", func: "Access tracking", icon: Lock, color: "text-[#4285F4]" },
                  { layer: "Security", func: "Threat monitoring", icon: ShieldCheck, color: "text-[#EA4335]" },
                  { layer: "Infrastructure", func: "System visibility", icon: Server, color: "text-[#FBBC05]" },
                  { layer: "Communication", func: "Data archival", icon: RefreshCw, color: "text-[#34A853]" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-[#0A0E17] border border-gray-800 p-4 rounded-lg hover:border-gray-600 transition-colors">
                    <div className={`p-2 bg-white/5 rounded-lg ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">{item.layer}</h4>
                      <p className="text-xs text-gray-400">{item.func}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Outcome Block */}
          <Reveal delay={400}>
            <div className="mt-20 text-center border-t border-gray-800 pt-10">
              <h4 className="text-xl font-bebas text-white tracking-widest mb-6">Result: Continuous Compliance Control</h4>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {[
                  "Full traceability",
                  "Always audit-ready",
                  "No compliance gaps",
                  "Unified governance"
                ].map((outcome, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#34A853]" />
                    <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 5. CAPABILITIES & GOVERNANCE DASHBOARD ================= */}
      <section className="py-32 bg-[#040814] relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#0B79BF]/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">
                Built-In Compliance & Audit Intelligence
              </h2>
              <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
                Everything required for monitoring, reporting, and governance is integrated directly into the system—eliminating the need for external tools.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Side: Capabilities Cards */}
            <div className="lg:col-span-5 space-y-6">
              {[
                {
                  title: "Regulatory Archival & E-Discovery",
                  icon: Archive,
                  desc: "Secure, structured storage designed for legal and regulatory requirements.",
                  points: ["Immutable, tamper-proof storage", "Long-term retention policies", "Rapid data retrieval"],
                  color: "text-[#34A853]",
                  borderColor: "hover:border-[#34A853]/50",
                  shadow: "hover:shadow-[0_0_30px_rgba(52,168,83,0.15)]"
                },
                {
                  title: "Security Monitoring & Reporting",
                  icon: Activity,
                  desc: "Continuous tracking of system activities with automated compliance reporting.",
                  points: ["Real-time monitoring", "Policy violation detection", "Automated reports"],
                  color: "text-[#FBBC05]",
                  borderColor: "hover:border-[#FBBC05]/50",
                  shadow: "hover:shadow-[0_0_30px_rgba(251,188,5,0.15)]"
                },
                {
                  title: "Audit Trails & Traceability",
                  icon: Eye,
                  desc: "Complete visibility into every system and user interaction.",
                  points: ["Detailed activity logs", "Data change traceability", "Historical audit records"],
                  color: "text-[#4285F4]",
                  borderColor: "hover:border-[#4285F4]/50",
                  shadow: "hover:shadow-[0_0_30px_rgba(66,133,244,0.15)]"
                }
              ].map((cap, i) => (
                <Reveal key={i} delay={i * 150} className={`dark-glass p-6 rounded-xl border border-gray-800 transition-all duration-300 transform hover:-translate-y-2 group ${cap.borderColor} ${cap.shadow}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                      <cap.icon className={`w-6 h-6 ${cap.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <h3 className="text-xl font-bebas text-white tracking-wider">{cap.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{cap.desc}</p>
                  <ul className="text-xs text-gray-500 space-y-2">
                    {cap.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle className={`w-3.5 h-3.5 mt-0.5 ${cap.color}`} />
                        <span className="text-gray-300">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            {/* Right Side: Live Governance Dashboard */}
            <Reveal direction="left" delay={300} className="lg:col-span-7 relative w-full">
              <div className="absolute -top-5 left-8 z-20 flex items-center gap-2 px-4 py-1.5 bg-[#040814] border border-[#34A853]/40 rounded-full shadow-[0_0_15px_rgba(52,168,83,0.2)]">
                <div className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></div>
                <span className="text-[10px] font-bold tracking-widest text-[#34A853] uppercase">Live System</span>
              </div>

              <div className="w-full h-[650px] bg-[#0A0E17] rounded-2xl border border-gray-700 shadow-[0_30px_60px_rgba(0,0,0,0.6)] p-1 flex flex-col relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                
                <div className="flex-grow bg-[#040814] rounded-xl flex flex-col overflow-hidden relative border border-gray-800/50 shadow-inner">
                  {/* Top Bar */}
                  <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0A0E17]/80 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-[#4285F4]" />
                      <h4 className="font-bebas text-white tracking-widest text-xl pt-1">Governance Console</h4>
                    </div>
                    <div className="flex items-center gap-3 hidden sm:flex">
                      <span className="px-2 py-1 bg-[#34A853]/10 text-[#34A853] border border-[#34A853]/30 rounded text-[10px] font-bold uppercase flex items-center gap-1.5"><CheckCircle className="w-3 h-3" /> Audit Ready</span>
                      <span className="px-2 py-1 bg-[#34A853]/10 text-[#34A853] border border-[#34A853]/30 rounded text-[10px] font-bold uppercase flex items-center gap-1.5"><CheckCircle className="w-3 h-3" /> Archived Records</span>
                      <span className="px-2 py-1 bg-[#4285F4]/10 text-[#4285F4] border border-[#4285F4]/30 rounded text-[10px] font-bold uppercase flex items-center gap-1.5"><Activity className="w-3 h-3 animate-pulse" /> Monitoring Active</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-1 bg-gray-900 border-b border-gray-800">
                    <div className="bg-[#040814] p-5">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Archived Records</p>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bebas tracking-wide text-white">4.2M</p>
                        <p className="text-[10px] text-[#34A853] font-bold mb-1">+12k today</p>
                      </div>
                      <div className="w-full bg-gray-800 h-1 mt-3 rounded overflow-hidden"><div className="w-[85%] bg-[#0B79BF] h-full rounded shadow-[0_0_10px_#0B79BF]"></div></div>
                    </div>
                    <div className="bg-[#040814] p-5 border-l border-gray-800">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Policy Violations</p>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bebas tracking-wide text-[#34A853]">0</p>
                        <p className="text-[10px] text-[#34A853] font-bold mb-1">Clear</p>
                      </div>
                      <div className="w-full bg-gray-800 h-1 mt-3 rounded overflow-hidden"><div className="w-0 bg-[#EA4335] h-full rounded"></div></div>
                    </div>
                    <div className="bg-[#040814] p-5 border-l border-gray-800">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Active Traces</p>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bebas tracking-wide text-[#4285F4] animate-pulse">LIVE</p>
                      </div>
                      <div className="w-full bg-gray-800 h-1 mt-3 rounded overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4285F4] to-transparent opacity-50 animate-scan-horizontal" style={{ animationDuration: '2s' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Terminal / Live Log Feed */}
                  <div className="flex-grow p-6 font-mono text-[11px] sm:text-xs leading-relaxed relative overflow-hidden bg-[#02040A]">
                    <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#02040A] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#02040A] via-[#02040A]/80 to-transparent z-10 pointer-events-none"></div>
                    
                    {/* Auto-scroll container simulation */}
                    <div className="absolute bottom-6 left-6 right-6 space-y-3">
                      {[
                        { time: "14:32:01", status: "OK", color: "text-[#34A853]", text: "Immutable lock applied to Snapshot 11B", tooltip: "Snapshot secured in cold storage.", op: "opacity-20" },
                        { time: "14:32:05", status: "INFO", color: "text-[#0B79BF]", text: "DB: Query Executed - Record 891A accessed", tooltip: "Authorized access via IAM role.", op: "opacity-40" },
                        { time: "14:32:10", status: "OK", color: "text-[#34A853]", text: "Policy 44A Match - Transaction Cleared", tooltip: "Policy 44A validated successfully.", op: "opacity-60" },
                        { time: "14:32:18", status: "LOG", color: "text-[#FBBC05]", text: "Archival: Snapshot generated and hashed", tooltip: "SHA-256 hash verified.", op: "opacity-80" },
                        { time: "14:32:22", status: "OK", color: "text-[#34A853]", text: "System: Auth Verified - User ID 492", tooltip: "MFA challenge completed.", op: "opacity-90" },
                        { time: "14:32:25", status: "INFO", color: "text-[#0B79BF]", text: "Network: Secure tunnel established to node X", tooltip: "TLS 1.3 encrypted tunnel active.", op: "opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" }
                      ].map((log, i) => (
                        <div key={i} className={`flex items-start gap-3 group/log relative p-1 rounded hover:bg-white/5 cursor-crosshair transition-colors ${log.op}`}>
                          <span className="text-gray-600 shrink-0">{log.time}</span>
                          <span className={`${log.color} shrink-0`}>[{log.status}]</span>
                          <span className="text-gray-400 group-hover/log:text-white transition-colors">{log.text}</span>
                          
                          {/* Tooltip */}
                          <div className="absolute left-1/2 -top-8 -translate-x-1/2 bg-[#14477B] text-white text-[10px] font-sans px-3 py-1.5 rounded opacity-0 invisible group-hover/log:opacity-100 group-hover/log:visible transition-all duration-200 whitespace-nowrap shadow-xl z-20 border border-[#0B79BF]">
                            {log.tooltip}
                          </div>
                        </div>
                      ))}
                      <div className="flex items-start gap-3 mt-4">
                        <span className="w-2.5 h-4 bg-[#34A853] animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Trust Line */}
          <Reveal delay={500}>
            <div className="mt-16 text-center border-t border-gray-800/50 pt-8">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center justify-center gap-3">
                <span className="w-12 h-[1px] bg-gray-700"></span>
                Designed for real-time governance and continuous audit readiness
                <span className="w-12 h-[1px] bg-gray-700"></span>
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 7. BUSINESS OUTCOMES (Executive Value) ================= */}
      <section className="py-24 md:py-32 bg-slate-50 relative border-b border-gray-200 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#14477B]/20 to-transparent"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">
                What Continuous Compliance Delivers
              </h2>
              <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed">
                Beyond regulatory alignment, Bichuten delivers measurable impact across control, risk reduction, operational efficiency, and long-term stability.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: ShieldCheck,
                title: "Always Audit-Ready",
                desc: "Maintain continuous readiness for audits with structured data, real-time reporting, and complete traceability.",
                accent: "#34A853",
                bg: "bg-[#34A853]/5",
                border: "hover:border-[#34A853]/40",
                glow: "hover:shadow-[0_20px_40px_rgba(52,168,83,0.10)]"
              },
              {
                icon: AlertTriangle,
                title: "Reduced Regulatory Risk",
                desc: "Minimize exposure to penalties, compliance failures, and regulatory uncertainty.",
                accent: "#EA4335",
                bg: "bg-[#EA4335]/5",
                border: "hover:border-[#EA4335]/40",
                glow: "hover:shadow-[0_20px_40px_rgba(234,67,53,0.10)]"
              },
              {
                icon: RefreshCw,
                title: "Operational Efficiency",
                desc: "Eliminate manual processes and reduce overhead through automation and system integration.",
                accent: "#0B79BF",
                bg: "bg-[#0B79BF]/5",
                border: "hover:border-[#0B79BF]/40",
                glow: "hover:shadow-[0_20px_40px_rgba(11,121,191,0.10)]"
              },
              {
                icon: Lock,
                title: "Full Governance Control",
                desc: "Gain complete visibility and control over data, systems, and compliance processes.",
                accent: "#14477B",
                bg: "bg-[#14477B]/5",
                border: "hover:border-[#14477B]/40",
                glow: "hover:shadow-[0_20px_40px_rgba(20,71,123,0.10)]"
              },
              {
                icon: Activity,
                title: "Faster Decision-Making",
                desc: "Access real-time insights and reporting to support faster, informed decisions.",
                accent: "#FBBC05",
                bg: "bg-[#FBBC05]/5",
                border: "hover:border-[#FBBC05]/40",
                glow: "hover:shadow-[0_20px_40px_rgba(251,188,5,0.10)]"
              },
              {
                icon: Server,
                title: "Long-Term Compliance Stability",
                desc: "Build a future-ready infrastructure aligned with evolving regulations and business needs.",
                accent: "#4285F4",
                bg: "bg-[#4285F4]/5",
                border: "hover:border-[#4285F4]/40",
                glow: "hover:shadow-[0_20px_40px_rgba(66,133,244,0.10)]"
              },
            ].map((outcome, i) => (
              <Reveal key={i} delay={i * 80} className="group">
                <div className={`bg-white p-8 rounded-2xl border border-gray-200 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 ${outcome.border} ${outcome.glow}`}>
                  <div className={`w-12 h-12 ${outcome.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <outcome.icon className="w-6 h-6" style={{ color: outcome.accent }} />
                  </div>
                  <h3 className="text-xl font-bebas tracking-wider text-gray-900 mb-3">{outcome.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-grow">{outcome.desc}</p>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: outcome.accent }}></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <div className="mt-20 text-center">
              <p className="text-2xl md:text-3xl font-bebas text-[#14477B] tracking-wide mb-3">
                "Compliance is no longer a cost—it is a strategic advantage."
              </p>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                Designed for regulated and high-trust environments.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 8. USE CASES (High-Stakes Applications) ================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">
                Where Continuous Compliance is Critical
              </h2>
              <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-6">
                Bichuten powers compliance infrastructure for industries where regulatory alignment, data governance, and operational trust are non-negotiable.
              </p>
              <div className="inline-block bg-[#EA4335]/5 border border-[#EA4335]/20 px-4 py-2 rounded">
                <p className="text-[#EA4335] text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Used in environments where failure is not an option
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { 
                icon: Landmark, 
                title: "Banking & Financial Services", 
                context: "Regulatory compliance for financial operations and transaction systems.",
                apps: ["Core banking systems", "Transaction monitoring", "Audit and reporting"],
                borderColor: "group-hover:border-[#0B79BF]"
              },
              { 
                icon: Building2, 
                title: "Government & Public Sector", 
                context: "Compliance infrastructure for national and public data systems.",
                apps: ["Citizen data management", "E-governance platforms", "Public digital services"],
                borderColor: "group-hover:border-[#14477B]"
              },
              { 
                icon: Wifi, 
                title: "Telecom & ISPs", 
                context: "Compliance and monitoring across network and data infrastructure.",
                apps: ["Network data logs", "Routing systems", "Infrastructure compliance"],
                borderColor: "group-hover:border-[#34A853]"
              },
              { 
                icon: Briefcase, 
                title: "Enterprise Organizations", 
                context: "Governance and compliance for internal business systems.",
                apps: ["ERP systems", "Internal data environments", "Business operations"],
                borderColor: "group-hover:border-[#FBBC05]"
              }
            ].map((industry, i) => (
              <Reveal key={i} delay={i * 100} className="h-full">
                <div className={`light-glass p-8 rounded-2xl flex flex-col group border-2 border-transparent hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 h-[280px] hover:h-[380px] overflow-hidden ${industry.borderColor}`}>
                  
                  {/* Top Visible Content */}
                  <div className="flex-shrink-0">
                    <industry.icon className="w-10 h-10 text-[#0B79BF] mb-6 group-hover:scale-110 group-hover:text-[#14477B] transition-transform duration-300" />
                    <h3 className="font-bebas text-2xl tracking-wider text-gray-900 mb-3">{industry.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed h-16">{industry.context}</p>
                  </div>
                  
                  {/* Expandable Content (Hidden by default, expands on hover) */}
                  <div className="mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-grow">
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Key Applications</p>
                    <ul className="space-y-3">
                      {industry.apps.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="mt-16 text-center max-w-xl mx-auto border-t border-gray-200 pt-10">
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-6">
                Designed for regulated and mission-critical environments.
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 text-[#0B79BF] font-bold hover:text-[#14477B] transition-colors group">
                Not sure where you fit? Talk to our team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 9. NEPAL ADVANTAGE (Infrastructure Positioning) ================= */}
      <section className="py-24 md:py-32 bg-[#040814] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#14477B]/20 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#34A853]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#34A853]/10 border border-[#34A853]/30 rounded text-[#34A853] text-xs font-bold uppercase tracking-widest mb-6">
                <MapPin className="w-3.5 h-3.5" /> Nepal Infrastructure
              </div>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">
                Built Within Nepal. Designed for Sovereign Control.
              </h2>
              <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed mb-6">
                Bichuten leverages Nepal's strategic, environmental, and regulatory advantages to deliver secure, compliant, and high-performance infrastructure.
              </p>
              <p className="text-sm font-bold text-gray-500 italic">
                "Location is not just geography—it defines control, compliance, and trust."
              </p>
            </Reveal>
          </div>

          {/* Main Split Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Advantage Cards */}
            <div className="space-y-4">
              {[
                { icon: Database, title: "Data Sovereignty", desc: "All data is stored and governed within Nepal's jurisdiction.", color: "text-[#34A853]", bg: "bg-[#34A853]/10", border: "hover:border-[#34A853]/40" },
                { icon: Scale, title: "Regulatory Alignment", desc: "Designed to meet local compliance and governance requirements.", color: "text-[#0B79BF]", bg: "bg-[#0B79BF]/10", border: "hover:border-[#0B79BF]/40" },
                { icon: Lock, title: "Reduced Foreign Dependency", desc: "No reliance on external infrastructure or foreign regulatory systems.", color: "text-[#FBBC05]", bg: "bg-[#FBBC05]/10", border: "hover:border-[#FBBC05]/40" },
                { icon: Activity, title: "Low Latency Performance", desc: "Faster response times through locally hosted infrastructure.", color: "text-[#4285F4]", bg: "bg-[#4285F4]/10", border: "hover:border-[#4285F4]/40" },
                { icon: RefreshCw, title: "Energy Advantage", desc: "Powered by clean hydroelectric energy for sustainable operations.", color: "text-[#34A853]", bg: "bg-[#34A853]/10", border: "hover:border-[#34A853]/40" },
              ].map((adv, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className={`flex items-start gap-5 p-5 bg-[#0A0E17] border border-gray-800 rounded-xl transition-all duration-300 hover:-translate-x-1 group ${adv.border}`}>
                    <div className={`w-12 h-12 ${adv.bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <adv.icon className={`w-5 h-5 ${adv.color}`} />
                    </div>
                    <div>
                      <h4 className="text-base font-bebas text-white tracking-wider mb-1">{adv.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{adv.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Trust Strip */}
              <Reveal delay={600}>
                <div className="flex flex-wrap items-center gap-4 pt-4 mt-2 border-t border-gray-800">
                  {["Locally Hosted", "Fully Controlled", "Compliance Ready"].map((tag, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#34A853]" />
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tag}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: Abstract Nepal Infrastructure Map */}
            <Reveal direction="left" delay={200}>
              <div className="relative w-full h-[480px] flex items-center justify-center">
                {/* Background glow */}
                <div className="absolute inset-0 bg-[#14477B]/10 rounded-3xl blur-[40px]"></div>

                {/* SVG Nepal Map – abstract node map */}
                <svg viewBox="0 0 400 260" className="w-full max-w-lg relative z-10" fill="none">
                  {/* Nepal silhouette - abstract simplified shape */}
                  <path
                    d="M 30 160 C 50 140 80 130 120 125 C 160 120 200 115 240 118 C 280 121 310 130 340 135 C 360 138 375 145 380 155 C 380 165 360 172 340 170 C 310 168 280 162 240 160 C 200 158 160 162 120 165 C 80 168 50 175 30 170 Z"
                    stroke="rgba(20,71,123,0.6)"
                    strokeWidth="1.5"
                    fill="rgba(20,71,123,0.08)"
                    strokeDasharray="4 4"
                  />

                  {/* Primary Hub - Kathmandu area */}
                  <circle cx="220" cy="140" r="14" fill="rgba(52,168,83,0.15)" stroke="#34A853" strokeWidth="1.5" />
                  <circle cx="220" cy="140" r="7" fill="#34A853" opacity="0.9" />
                  <circle cx="220" cy="140" r="14" fill="none" stroke="#34A853" strokeWidth="1" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: '10s', transformOrigin: '220px 140px' }} />

                  {/* Secondary Hub - East */}
                  <circle cx="310" cy="148" r="9" fill="rgba(11,121,191,0.15)" stroke="#0B79BF" strokeWidth="1.5" />
                  <circle cx="310" cy="148" r="5" fill="#0B79BF" opacity="0.8" />
                  <circle cx="310" cy="148" r="9" fill="none" stroke="#0B79BF" strokeWidth="0.8" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse', transformOrigin: '310px 148px' }} />

                  {/* Secondary Hub - West */}
                  <circle cx="100" cy="148" r="9" fill="rgba(251,188,5,0.15)" stroke="#FBBC05" strokeWidth="1.5" />
                  <circle cx="100" cy="148" r="5" fill="#FBBC05" opacity="0.8" />
                  <circle cx="100" cy="148" r="9" fill="none" stroke="#FBBC05" strokeWidth="0.8" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: '9s', transformOrigin: '100px 148px' }} />

                  {/* Tertiary - North */}
                  <circle cx="180" cy="115" r="6" fill="rgba(66,133,244,0.15)" stroke="#4285F4" strokeWidth="1" />
                  <circle cx="180" cy="115" r="3" fill="#4285F4" opacity="0.7" />

                  {/* Tertiary - South */}
                  <circle cx="260" cy="162" r="6" fill="rgba(52,168,83,0.15)" stroke="#34A853" strokeWidth="1" />
                  <circle cx="260" cy="162" r="3" fill="#34A853" opacity="0.7" />

                  {/* Connection lines */}
                  <line x1="220" y1="140" x2="310" y2="148" stroke="#0B79BF" strokeWidth="1" strokeDasharray="5 3" opacity="0.6">
                    <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="220" y1="140" x2="100" y2="148" stroke="#FBBC05" strokeWidth="1" strokeDasharray="5 3" opacity="0.6">
                    <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2.5s" repeatCount="indefinite" />
                  </line>
                  <line x1="220" y1="140" x2="180" y2="115" stroke="#4285F4" strokeWidth="1" strokeDasharray="5 3" opacity="0.5">
                    <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.8s" repeatCount="indefinite" />
                  </line>
                  <line x1="220" y1="140" x2="260" y2="162" stroke="#34A853" strokeWidth="1" strokeDasharray="5 3" opacity="0.5">
                    <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="3s" repeatCount="indefinite" />
                  </line>
                  <line x1="100" y1="148" x2="180" y2="115" stroke="#FBBC05" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3">
                    <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="3.5s" repeatCount="indefinite" />
                  </line>
                  <line x1="310" y1="148" x2="260" y2="162" stroke="#0B79BF" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3">
                    <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2.8s" repeatCount="indefinite" />
                  </line>

                  {/* Pulse rings on primary hub */}
                  <circle cx="220" cy="140" r="22" fill="none" stroke="#34A853" strokeWidth="0.5" opacity="0.4" className="animate-ping" style={{ animationDuration: '2s' }} />
                  <circle cx="220" cy="140" r="30" fill="none" stroke="#34A853" strokeWidth="0.3" opacity="0.2" className="animate-ping" style={{ animationDuration: '3s' }} />

                  {/* Labels */}
                  <text x="220" y="165" textAnchor="middle" fill="#34A853" fontSize="8" fontWeight="bold" fontFamily="monospace">PRIMARY HUB</text>
                  <text x="310" y="165" textAnchor="middle" fill="#0B79BF" fontSize="7" fontFamily="monospace">EAST NODE</text>
                  <text x="100" y="165" textAnchor="middle" fill="#FBBC05" fontSize="7" fontFamily="monospace">WEST NODE</text>
                </svg>

                {/* Status labels */}
                <div className="absolute top-6 right-6 space-y-2">
                  <div className="flex items-center gap-2 bg-[#0A0E17] border border-gray-800 px-3 py-1.5 rounded">
                    <div className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></div>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">3 Active Hubs</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#0A0E17] border border-gray-800 px-3 py-1.5 rounded">
                    <div className="w-2 h-2 rounded-full bg-[#0B79BF] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Nepal Jurisdiction</span>
                  </div>
                </div>

                {/* Strong statement */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    "Your infrastructure remains within your control—at all times."
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 10. DIFFERENTIATION (Bichuten vs Traditional) ================= */}
      <section className="py-24 md:py-32 bg-slate-50 relative border-y border-gray-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#14477B]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">
                Why Bichuten is Different
              </h2>
              <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed">
                Traditional compliance systems rely on fragmented tools and reactive processes. Bichuten delivers a unified, continuous compliance model built into infrastructure.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-14">

            {/* Left: Traditional (Weak / Muted) */}
            <Reveal direction="right">
              <div className="h-full bg-white border border-gray-200 rounded-2xl p-8 opacity-75 hover:opacity-90 transition-opacity duration-300 relative group">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-red-50/50 rounded-r-2xl -z-0"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Legacy Model</p>
                      <h3 className="text-2xl font-bebas text-gray-700 tracking-wider">Traditional Compliance Systems</h3>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {[
                      { label: "Fragmented tools", detail: "Multiple disconnected platforms with no unified view" },
                      { label: "Manual processes", detail: "Heavy reliance on human intervention and spreadsheets" },
                      { label: "Periodic audits", detail: "Compliance checked at intervals, not continuously" },
                      { label: "Delayed reporting", detail: "Reports generated after events, not in real-time" },
                      { label: "Limited visibility", detail: "No comprehensive view across all systems and data" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 group/row">
                        <div className="w-6 h-6 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2.5 h-0.5 bg-red-400 rounded-full"></div>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-gray-600 line-through decoration-red-300/60">{item.label}</span>
                          <p className="text-xs text-gray-400 mt-0.5 opacity-0 group-hover/row:opacity-100 transition-opacity duration-200">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-xs font-bold text-red-400 uppercase tracking-widest">Reactive. Fragmented. Inadequate.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: Bichuten (Strong / Glowing) */}
            <Reveal direction="left" delay={150}>
              <div className="h-full bg-[#14477B] rounded-2xl p-8 relative overflow-hidden shadow-[0_30px_60px_rgba(20,71,123,0.25)] border border-[#0B79BF]/30 group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-60 h-60 bg-[#34A853]/15 rounded-full blur-[60px]"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#0B79BF]/20 rounded-full blur-[80px]"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-[#34A853]/20 border border-[#34A853]/40 flex items-center justify-center shadow-[0_0_15px_rgba(52,168,83,0.3)]">
                      <ShieldCheck className="w-5 h-5 text-[#34A853]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#34A853] uppercase tracking-widest">Continuous Model</p>
                      <h3 className="text-2xl font-bebas text-white tracking-wider">Bichuten Compliance Platform</h3>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {[
                      { label: "Unified system", detail: "Single integrated platform across all compliance layers" },
                      { label: "Automated processes", detail: "Zero manual overhead through system-level automation" },
                      { label: "Continuous compliance", detail: "Always-on governance with no blind spots" },
                      { label: "Real-time reporting", detail: "Instant audit-ready reports generated automatically" },
                      { label: "Full visibility", detail: "Complete traceability across every system and operation" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 group/row">
                        <div className="w-6 h-6 rounded-full bg-[#34A853]/20 border border-[#34A853]/40 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/row:shadow-[0_0_10px_rgba(52,168,83,0.4)] transition-shadow">
                          <CheckCircle className="w-3.5 h-3.5 text-[#34A853]" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white">{item.label}</span>
                          <p className="text-xs text-blue-200/60 mt-0.5 opacity-0 group-hover/row:opacity-100 transition-opacity duration-200">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-xs font-bold text-[#34A853] uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></span>
                      Proactive. Unified. Always-On.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Bottom statements */}
          <Reveal delay={400}>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <p className="text-xl md:text-2xl font-bebas text-[#14477B] tracking-wide">
                "Bichuten replaces complexity with a unified, system-driven approach to compliance."
              </p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Not an upgrade—an entirely new way to manage compliance.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 11. FINAL CTA (Compliance Page) ================= */}
      <section className="py-32 md:py-40 bg-[#040814] relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '100% 4px' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#14477B]/25 rounded-[100%] blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#34A853]/10 rounded-[100%] blur-[80px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">

            {/* Status indicator */}
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#34A853]/10 border border-[#34A853]/30 rounded-full mb-10">
                <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest text-[#34A853] uppercase">Always Monitored. Always Compliant.</span>
              </div>
            </Reveal>

            {/* Main Heading */}
            <Reveal delay={100}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bebas text-white tracking-wide leading-tight mb-6">
                Build a Compliance-Ready Infrastructure Today
              </h2>
            </Reveal>

            {/* Subtext */}
            <Reveal delay={200}>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                Move from fragmented compliance processes to a unified, continuously monitored system designed for control, visibility, and audit readiness.
              </p>
            </Reveal>

            {/* Urgency Line */}
            <Reveal delay={250}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EA4335]/8 border border-[#EA4335]/20 rounded mb-12">
                <AlertTriangle className="w-4 h-4 text-[#EA4335]/80 flex-shrink-0" />
                <p className="text-[#EA4335]/80 text-sm font-bold">
                  Compliance gaps increase risk with every delay.
                </p>
              </div>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                {/* Primary */}
                <a
                  href="/contact"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#34A853] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_20px_40px_rgba(52,168,83,0.35)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-500 -translate-x-full"></div>
                  <ShieldCheck className="w-4 h-4" />
                  Request Compliance Consultation
                </a>

                {/* Secondary */}
                <a
                  href="/contact"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-bold text-sm uppercase tracking-wider rounded-xl border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <Activity className="w-4 h-4 text-[#0B79BF]" />
                  Talk to an Expert
                </a>

                {/* Tertiary */}
                <a
                  href="/infrastructure"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-gray-400 hover:text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-1"
                >
                  View Compliance Architecture
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </Reveal>

            {/* Trust Elements */}
            <Reveal delay={400}>
              <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                {[
                  { icon: CheckCircle, text: "No obligation consultation" },
                  { icon: ShieldCheck, text: "Enterprise-grade infrastructure" },
                  { icon: Lock, text: "Built for regulated environments" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-[#34A853]" />
                    <span className="text-sm text-gray-400 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Divider */}
            <Reveal delay={450}>
              <div className="w-16 h-[1px] bg-gray-700 mx-auto mb-8"></div>
            </Reveal>

            {/* Final Reassurance */}
            <Reveal delay={500}>
              <p className="text-2xl md:text-3xl font-bebas text-white tracking-wide mb-3">
                Always monitored. Always compliant. Always in control.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
                Our team will guide you through compliance planning, system integration, and deployment.
              </p>
            </Reveal>

          </div>
        </div>
      </section>


    </div>
  );
};

export default ComplianceRegulatorySolution;