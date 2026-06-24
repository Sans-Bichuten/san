import React, { useEffect, useRef, useState } from 'react';
import { 
  FileSearch, ShieldCheck, Database, Activity, 
  Layers, Lock, CheckCircle, ArrowRight, Eye, 
  Server, FileText, AlertCircle, RefreshCw, MapPin
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

const ComplianceAuditLayer = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          @keyframes scanner {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(200%); opacity: 0; }
          }
          .animate-scan-line {
            position: absolute;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, transparent, #34A853, transparent);
            box-shadow: 0 0 15px #34A853;
            animation: scanner 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          @keyframes ledgerBlock {
            0% { transform: translateY(10px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-ledger > div {
            animation: ledgerBlock 0.5s ease-out forwards;
            opacity: 0;
          }
          .dark-glass {
            background: rgba(4, 8, 20, 0.85);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          }
          .light-glass {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(11, 121, 191, 0.1);
            box-shadow: 0 10px 30px rgba(20, 71, 123, 0.05);
          }
          .pattern-grid-light {
            background-image: radial-gradient(#0B79BF 1px, transparent 1px);
            background-size: 30px 30px;
            opacity: 0.1;
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION (Light Theme with Dark Accents) ================= */}
      <section className="relative pt-40 pb-32 min-h-[90vh] flex flex-col justify-center border-b border-gray-200 bg-gradient-to-br from-white via-blue-50 to-slate-100 overflow-hidden">
        <div className="absolute inset-0 pattern-grid-light z-0"></div>
        
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#34A853]/10 via-[#4285F4]/10 to-transparent rounded-full blur-[80px]"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="max-w-2xl">
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-2 light-glass rounded-full mb-8">
                  <FileSearch className="w-4 h-4 text-[#34A853]" />
                  <span className="text-xs font-bold tracking-widest uppercase text-[#14477B]">Layer 5: Compliance & Audit</span>
                </div>
              </Reveal>
              
              <Reveal delay={150}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bebas tracking-wide text-[#14477B] mb-6 leading-[1]">
                  Continuous Compliance. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] to-[#34A853]">
                    Complete Visibility.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={300}>
                <p className="text-lg md:text-xl font-light text-gray-600 mb-6 leading-relaxed">
                  Bichuten’s Compliance and Audit Layer ensures that every system, transaction, and interaction is monitored, recorded, and aligned with regulatory requirements—enabling organizations to operate with full transparency.
                </p>
                <p className="text-sm font-bold text-[#EA4335] uppercase tracking-wider mb-10 border-l-4 border-[#EA4335] pl-4 py-1">
                  Designed for environments where audit readiness, governance, and traceability are essential.
                </p>
              </Reveal>

              <Reveal delay={450}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group bg-[#14477B] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#0B79BF] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 rounded">
                    Request Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a href="/platform/overview" className="light-glass text-[#14477B] px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:border-[#0B79BF] hover:text-[#0B79BF] rounded flex items-center justify-center">
                    Explore Platform
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Visual: Audit Ledger & Scanning Graphic */}
            <Reveal direction="left" delay={300} className="hidden lg:flex relative h-[500px] items-center justify-center">
              <div className="relative w-full max-w-md dark-glass rounded-2xl p-6 shadow-2xl overflow-hidden animate-ledger">
                <div className="absolute inset-0 bg-[#040814]/50 z-0"></div>
                <div className="animate-scan-line z-20"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                    <h3 className="text-white font-bebas tracking-widest text-xl">System Audit Ledger</h3>
                    <div className="flex gap-2">
                       <span className="w-2 h-2 rounded-full bg-[#FBBC05] animate-pulse"></span>
                       <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" style={{animationDelay: '0.5s'}}></span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { time: "10:42:01", event: "User Auth", user: "Admin_01", status: "Verified", color: "text-[#34A853]", bg: "bg-[#34A853]/10" },
                      { time: "10:42:05", event: "Data Access", user: "System", status: "Logged", color: "text-[#4285F4]", bg: "bg-[#4285F4]/10" },
                      { time: "10:43:12", event: "Policy Update", user: "Admin_02", status: "Archived", color: "text-[#FBBC05]", bg: "bg-[#FBBC05]/10" },
                      { time: "10:45:00", event: "Threat Block", user: "Firewall", status: "Intercept", color: "text-[#EA4335]", bg: "bg-[#EA4335]/10" }
                    ].map((log, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5" style={{ animationDelay: `${i * 150}ms` }}>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-gray-500 font-mono">{log.time}</span>
                          <span className="text-xs font-bold text-gray-200">{log.event}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-gray-400">{log.user}</span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${log.color} ${log.bg}`}>
                            {log.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 2 & 3. OVERVIEW & CORE CAPABILITIES (Dark Cards on Light Bg) ================= */}
      <section className="py-24 relative bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">Compliance Built Into the Infrastructure</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                In regulated industries, compliance is not optional—it is a continuous requirement. Bichuten embeds compliance mechanisms directly into the platform, ensuring real-time traceability and audit readiness.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Archival (Green Accent) */}
            <Reveal delay={0} className="dark-glass p-8 rounded-2xl text-white hover:-translate-y-2 transition-transform">
              <Database className="w-10 h-10 text-[#34A853] mb-6" />
              <h3 className="text-2xl font-bebas tracking-wider mb-4">Regulatory Archival & E-Discovery</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-grow">Secure and structured storage of data for compliance, audit, and legal requirements.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full mt-1.5 flex-shrink-0"></div> Immutable, tamper-proof storage</li>
                <li className="flex items-start gap-3 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full mt-1.5 flex-shrink-0"></div> Rapid retrieval for investigations</li>
                <li className="flex items-start gap-3 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full mt-1.5 flex-shrink-0"></div> Long-term retention management</li>
              </ul>
            </Reveal>

            {/* Monitoring (Yellow Accent) */}
            <Reveal delay={150} className="dark-glass p-8 rounded-2xl text-white hover:-translate-y-2 transition-transform">
              <Activity className="w-10 h-10 text-[#FBBC05] mb-6" />
              <h3 className="text-2xl font-bebas tracking-wider mb-4">Security Monitoring & Reporting</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-grow">Continuous monitoring of systems and activities to ensure alignment with compliance standards.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#FBBC05] rounded-full mt-1.5 flex-shrink-0"></div> Real-time activity monitoring</li>
                <li className="flex items-start gap-3 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#FBBC05] rounded-full mt-1.5 flex-shrink-0"></div> Anomaly & policy violation detection</li>
                <li className="flex items-start gap-3 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#FBBC05] rounded-full mt-1.5 flex-shrink-0"></div> Automated compliance reporting</li>
              </ul>
            </Reveal>

            {/* Traceability (Blue Accent) */}
            <Reveal delay={300} className="dark-glass p-8 rounded-2xl text-white hover:-translate-y-2 transition-transform">
              <Eye className="w-10 h-10 text-[#4285F4] mb-6" />
              <h3 className="text-2xl font-bebas tracking-wider mb-4">Audit Trails & Traceability</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-grow">Complete visibility into all system interactions and operations.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#4285F4] rounded-full mt-1.5 flex-shrink-0"></div> Detailed logs of user/system actions</li>
                <li className="flex items-start gap-3 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#4285F4] rounded-full mt-1.5 flex-shrink-0"></div> Traceability of data modifications</li>
                <li className="flex items-start gap-3 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#4285F4] rounded-full mt-1.5 flex-shrink-0"></div> Historical records for review</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 4 & 5. IMMUTABILITY & CONTINUOUS MONITORING (Dark Theme Section) ================= */}
      <section className="py-24 relative bg-[#040814] text-gray-300">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual: Dashboard Mockup */}
            <Reveal direction="right" className="relative h-[550px] w-full">
              <div className="absolute inset-0 bg-[#0a1426] rounded-2xl border border-gray-700 shadow-2xl p-6 flex flex-col">
                 <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                   <h4 className="font-bebas text-white tracking-widest text-xl">Governance Dashboard</h4>
                   <div className="bg-[#34A853]/20 text-[#34A853] px-3 py-1 rounded text-xs font-bold uppercase flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></span> System Secure
                   </div>
                 </div>

                 {/* Grid of Stats */}
                 <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-[#040814] p-4 rounded-lg border border-gray-800">
                     <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Active Policies</p>
                     <p className="text-2xl font-bold text-white">1,248</p>
                   </div>
                   <div className="bg-[#040814] p-4 rounded-lg border border-gray-800">
                     <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Anomalies (24h)</p>
                     <p className="text-2xl font-bold text-[#FBBC05]">0</p>
                   </div>
                 </div>

                 {/* Chart Mockup */}
                 <div className="flex-grow bg-[#040814] rounded-lg border border-gray-800 p-4 relative overflow-hidden flex items-end gap-2">
                    {[40, 60, 45, 80, 55, 90, 65, 100, 75, 85].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-[#0B79BF] to-[#4285F4] rounded-t-sm opacity-80" style={{ height: `${height}%` }}></div>
                    ))}
                    <div className="absolute top-4 left-4 text-xs font-bold text-[#4285F4] uppercase">Real-Time Event Volume</div>
                 </div>
              </div>
            </Reveal>

            {/* Text Content */}
            <div className="space-y-16">
              <Reveal direction="left">
                <div className="flex items-center gap-4 mb-4">
                  <Lock className="w-8 h-8 text-[#34A853]" />
                  <h2 className="text-3xl font-bebas text-white tracking-wide">Tamper-Proof Data & Reliable Records</h2>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Data integrity is critical for compliance and trust. The platform ensures that all stored data remains accurate, consistent, and mathematically protected against unauthorized modification.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded border border-white/10"><CheckCircle className="w-4 h-4 text-[#34A853] mb-2"/> <span className="text-sm font-medium text-white">Immutable Storage</span></div>
                  <div className="bg-white/5 p-4 rounded border border-white/10"><CheckCircle className="w-4 h-4 text-[#34A853] mb-2"/> <span className="text-sm font-medium text-white">Integrity Verification</span></div>
                </div>
              </Reveal>

              <Reveal direction="left" delay={200}>
                <div className="flex items-center gap-4 mb-4">
                  <Activity className="w-8 h-8 text-[#4285F4]" />
                  <h2 className="text-3xl font-bebas text-white tracking-wide">Real-Time Oversight of Activities</h2>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  The Compliance Layer continuously monitors infrastructure, applications, and user activities to proactively ensure adherence to policies and regulations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#4285F4] rounded-full"></div> Continuous system monitoring & alerting</li>
                  <li className="flex items-center gap-3 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#4285F4] rounded-full"></div> Policy enforcement across all layers</li>
                  <li className="flex items-center gap-3 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#4285F4] rounded-full"></div> Integration with security and identity systems</li>
                </ul>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 6 & 7. AUDIT READINESS & CYBER RESILIENCE (Split Layout) ================= */}
      <section className="py-24 bg-[#0a1426] relative border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Audit Readiness */}
            <Reveal direction="up" className="bg-[#040814] p-10 rounded-2xl border border-white/10 hover:border-[#FBBC05]/50 transition-colors">
              <FileText className="w-12 h-12 text-[#FBBC05] mb-6" />
              <h3 className="text-3xl font-bebas text-white tracking-wider mb-4">Always Prepared for Audit</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                The platform is designed to ensure that organizations are always ready for internal and external audits, reducing preparation time and improving compliance efficiency.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle className="w-5 h-5 text-[#FBBC05]"/> Structured and accessible audit logs</li>
                <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle className="w-5 h-5 text-[#FBBC05]"/> Automated reporting for compliance reviews</li>
                <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle className="w-5 h-5 text-[#FBBC05]"/> Rapid retrieval of required data</li>
                <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle className="w-5 h-5 text-[#FBBC05]"/> Alignment with governance frameworks</li>
              </ul>
            </Reveal>

            {/* Cyber Resilience */}
            <Reveal direction="up" delay={150} className="bg-[#040814] p-10 rounded-2xl border border-white/10 hover:border-[#EA4335]/50 transition-colors">
              <AlertCircle className="w-12 h-12 text-[#EA4335] mb-6" />
              <h3 className="text-3xl font-bebas text-white tracking-wider mb-4">Resilience Against Disruptions</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                The Compliance Layer supports resilience by ensuring that data and systems remain recoverable and protected during incidents, preserving critical records.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle className="w-5 h-5 text-[#EA4335]"/> Isolated and secure backup environments</li>
                <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle className="w-5 h-5 text-[#EA4335]"/> Ransomware-resistant storage systems</li>
                <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle className="w-5 h-5 text-[#EA4335]"/> Rapid recovery for critical operations</li>
                <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle className="w-5 h-5 text-[#EA4335]"/> Continuity under all conditions</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 8. INTEGRATION (Light Theme Flow Diagram) ================= */}
      <section className="py-32 bg-slate-50 relative overflow-hidden border-y border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Compliance Across the Entire Platform</h2>
              <p className="text-gray-600">The Compliance and Audit Layer integrates with all other platform components, ensuring consistent governance across systems.</p>
            </Reveal>
          </div>

          <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* The Left Side (Other Layers) */}
            <div className="flex flex-col gap-6 w-full md:w-1/3 relative z-10">
               <Reveal delay={100} className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded text-[#4285F4]"><Lock className="w-6 h-6"/></div>
                  <div><h4 className="font-bold text-sm text-gray-900">Identity Layer</h4><p className="text-[10px] text-gray-500">Tracks user access & activity</p></div>
               </Reveal>
               <Reveal delay={200} className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center gap-4">
                  <div className="p-2 bg-red-50 rounded text-[#EA4335]"><ShieldCheck className="w-6 h-6"/></div>
                  <div><h4 className="font-bold text-sm text-gray-900">Security Layer</h4><p className="text-[10px] text-gray-500">Monitors threats & enforcement</p></div>
               </Reveal>
               <Reveal delay={300} className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center gap-4">
                  <div className="p-2 bg-yellow-50 rounded text-[#FBBC05]"><Server className="w-6 h-6"/></div>
                  <div><h4 className="font-bold text-sm text-gray-900">Infrastructure</h4><p className="text-[10px] text-gray-500">Ensures system compliance</p></div>
               </Reveal>
               <Reveal delay={400} className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center gap-4">
                  <div className="p-2 bg-green-50 rounded text-[#34A853]"><Activity className="w-6 h-6"/></div>
                  <div><h4 className="font-bold text-sm text-gray-900">Communication</h4><p className="text-[10px] text-gray-500">Archives & audits messages</p></div>
               </Reveal>
            </div>

            {/* Connecting Arrows (Hidden on Mobile) */}
            <div className="hidden md:flex flex-col gap-10 w-1/6 items-center justify-center relative z-0">
               <ArrowRight className="w-8 h-8 text-gray-300 animate-pulse" />
               <ArrowRight className="w-8 h-8 text-gray-300 animate-pulse" style={{animationDelay: '0.2s'}} />
               <ArrowRight className="w-8 h-8 text-gray-300 animate-pulse" style={{animationDelay: '0.4s'}} />
               <ArrowRight className="w-8 h-8 text-gray-300 animate-pulse" style={{animationDelay: '0.6s'}} />
            </div>

            {/* The Right Side (Compliance Layer Hub) */}
            <div className="w-full md:w-1/3 relative z-10">
               <Reveal delay={500} className="bg-[#14477B] rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden border-4 border-[#0B79BF]/30">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <RefreshCw className="w-16 h-16 text-white mx-auto mb-4 animate-[spin_10s_linear_infinite]" />
                  <h3 className="text-2xl font-bebas tracking-widest text-white mb-2">Unified Compliance Framework</h3>
                  <p className="text-xs text-blue-100/80">All digital operations are governed centrally.</p>
               </Reveal>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 9 & 10. SOVEREIGNTY & USE CASES (Light Theme Grid) ================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Sovereignty */}
            <Reveal direction="right" className="light-glass p-10 rounded-2xl border-t-4 border-t-[#0B79BF]">
              <MapPin className="w-10 h-10 text-[#0B79BF] mb-6" />
              <h3 className="text-3xl font-bebas text-[#14477B] tracking-wider mb-4">Compliance Within Nepal’s Jurisdiction</h3>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                By operating within Nepal, the platform ensures that all compliance processes align perfectly with national regulations and data policies.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-gray-800 font-medium"><div className="w-2 h-2 bg-[#0B79BF] rounded-full"></div> Data residency guaranteed within Nepal</li>
                <li className="flex items-center gap-3 text-sm text-gray-800 font-medium"><div className="w-2 h-2 bg-[#0B79BF] rounded-full"></div> Alignment with national governance requirements</li>
                <li className="flex items-center gap-3 text-sm text-gray-800 font-medium"><div className="w-2 h-2 bg-[#0B79BF] rounded-full"></div> Reduced exposure to foreign regulatory risks</li>
                <li className="flex items-center gap-3 text-sm text-gray-800 font-medium"><div className="w-2 h-2 bg-[#0B79BF] rounded-full"></div> Greater control over compliance processes</li>
              </ul>
            </Reveal>

            {/* Use Cases */}
            <Reveal direction="left" delay={150} className="light-glass p-10 rounded-2xl border-t-4 border-t-[#14477B]">
              <Layers className="w-10 h-10 text-[#14477B] mb-6" />
              <h3 className="text-3xl font-bebas text-[#14477B] tracking-wider mb-4">Supporting Compliance Across Industries</h3>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                The Compliance Layer is expertly designed for industries where governance, transparency, and strict auditability are critical.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-gray-800 font-medium"><div className="w-2 h-2 bg-[#14477B] rounded-full"></div> Regulatory reporting for financial institutions</li>
                <li className="flex items-center gap-3 text-sm text-gray-800 font-medium"><div className="w-2 h-2 bg-[#14477B] rounded-full"></div> Government audit and data governance systems</li>
                <li className="flex items-center gap-3 text-sm text-gray-800 font-medium"><div className="w-2 h-2 bg-[#14477B] rounded-full"></div> Telecom compliance and communication monitoring</li>
                <li className="flex items-center gap-3 text-sm text-gray-800 font-medium"><div className="w-2 h-2 bg-[#14477B] rounded-full"></div> Legal and investigative data retrieval (E-Discovery)</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 11. DIFFERENTIATION (Dark Theme Standout) ================= */}
      <section className="py-24 bg-[#040814] relative">
        <div className="absolute inset-0 pattern-grid-light opacity-10"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">Beyond Traditional Compliance Systems</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
              Unlike standalone compliance tools that create operational silos, Bichuten’s Compliance Layer is integrated directly into the platform, ensuring that compliance is continuous, automated, and invisible to end-users.
            </p>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {[
              "Embedded across all platform layers",
              "Real-time monitoring and automated reporting",
              "Immutable data storage for audit reliability",
              "Integrated governance with identity and security"
            ].map((diff, i) => (
              <Reveal key={i} delay={i * 100} className="dark-glass border border-[#34A853]/40 rounded-full px-6 py-4 flex items-center gap-3 shadow-[0_0_15px_rgba(52,168,83,0.1)]">
                <CheckCircle className="w-5 h-5 text-[#34A853]" />
                <span className="text-sm font-bold text-white tracking-wide">{diff}</span>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 12. TRANSITION SECTION (Light Theme Grid) ================= */}
      <section className="py-24 relative bg-slate-50 border-t border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Explore the Complete Platform</h2>
              <p className="text-gray-600">The Compliance and Audit Layer completes the Bichuten platform by ensuring governance and accountability across all systems.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Infrastructure Layer", href: "/platform/infrastructure" },
              { title: "Communication Layer", href: "/platform/communication" },
              { title: "Identity and Access", href: "/platform/identity" },
              { title: "Security & Encryption", href: "/platform/security" }
            ].map((link, i) => (
              <Reveal key={i} delay={i * 100}>
                <a 
                  href={link.href} 
                  className="group block h-full bg-white border border-gray-200 shadow-sm p-6 text-center hover:border-[#0B79BF] hover:shadow-md transition-all duration-300 rounded-xl"
                >
                  <h4 className="font-bold text-gray-800 group-hover:text-[#14477B] text-sm tracking-wide uppercase transition-colors">
                    {link.title}
                  </h4>
                  <ArrowRight className="w-5 h-5 mx-auto mt-4 text-[#0B79BF] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      

    </div>
  );
};

export default ComplianceAuditLayer;