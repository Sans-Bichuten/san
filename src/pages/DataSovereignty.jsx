import React, { useEffect, useRef, useState } from 'react';
import { 
  Globe, Shield, Database, Lock, MapPin, CheckCircle, 
  AlertTriangle, ArrowRight, Zap, RefreshCw, Layers, 
  Building2, Landmark, Wifi, Briefcase, Server, FileText, Eye, Cloud, Activity
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

const DataSovereignty = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          @keyframes borderFlow {
            100% { stroke-dashoffset: -100; }
          }
          .animate-border-flow {
            stroke-dasharray: 8 8;
            animation: borderFlow 2s linear infinite;
          }
          @keyframes radarPing {
            0% { transform: scale(0.5); opacity: 0.8; }
            100% { transform: scale(2.5); opacity: 0; }
          }
          .animate-radar-ping {
            animation: radarPing 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
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

      {/* ================= 1. HERO SECTION (Dark/Sovereignty Theme) ================= */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 min-h-[85vh] flex flex-col justify-center bg-[#040814] overflow-hidden border-b border-white/10">
        
        {/* Abstract Data Flow Visualizer (Background) */}
        <div className="absolute inset-0 z-0">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]"></div>
          
          {/* Glowing central orb (Nepal) */}
          <div className="absolute top-1/2 right-0 md:right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#14477B]/30 blur-[120px] mix-blend-screen pointer-events-none"></div>
          <div className="absolute top-1/2 right-0 md:right-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#34A853]/10 blur-[80px] mix-blend-screen pointer-events-none"></div>
          
          {/* SVG Map Visualization (Right Side) */}
          <div className="absolute top-1/2 right-0 md:right-[5%] lg:right-[10%] -translate-y-1/2 w-[800px] h-[800px] md:w-[600px] md:h-[600px] opacity-40 md:opacity-80 translate-x-1/4 md:translate-x-0 pointer-events-none">
             <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
               {/* Outer Boundary (World) */}
               <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="1 2" />
               <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="1 2" />
               
               {/* Nepal Sovereign Boundary */}
               <circle cx="50" cy="50" r="20" fill="rgba(11, 121, 191, 0.05)" stroke="rgba(52, 168, 83, 0.6)" strokeWidth="0.5" className="shadow-[0_0_20px_rgba(52,168,83,0.5)]" />
               <circle cx="50" cy="50" r="19" fill="none" stroke="rgba(52, 168, 83, 0.3)" strokeWidth="0.5" strokeDasharray="2 1" />
               
               {/* Internal Nodes (Inside Nepal) */}
               <circle cx="45" cy="45" r="1" fill="#34A853" className="animate-pulse" />
               <circle cx="55" cy="48" r="1" fill="#34A853" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
               <circle cx="50" cy="55" r="1.5" fill="#0B79BF" className="animate-pulse" style={{ animationDelay: '1s' }} />
               <circle cx="42" cy="52" r="0.8" fill="#fff" className="animate-pulse opacity-50" style={{ animationDelay: '0.2s' }} />
               <circle cx="56" cy="54" r="0.8" fill="#fff" className="animate-pulse opacity-50" style={{ animationDelay: '0.7s' }} />
               
               {/* Internal Flow lines */}
               <path d="M45 45 L50 55 L55 48 L42 52 L56 54 Z" fill="none" stroke="rgba(11, 121, 191, 0.4)" strokeWidth="0.2" className="animate-pulse" />
               
               {/* External Threats / Data packets blocked */}
               <g className="animate-[spin_10s_linear_infinite_reverse]" style={{ transformOrigin: '50px 50px' }}>
                 <circle cx="20" cy="50" r="0.5" fill="#EA4335" />
                 <line x1="20" y1="50" x2="28" y2="50" stroke="rgba(234, 67, 53, 0.5)" strokeWidth="0.2" />
                 {/* Blocked at border */}
                 <path d="M29 48 L29 52" stroke="#EA4335" strokeWidth="0.5" />
               </g>

               <g className="animate-[spin_15s_linear_infinite_reverse]" style={{ transformOrigin: '50px 50px' }}>
                 <circle cx="50" cy="80" r="0.5" fill="#EA4335" />
                 <line x1="50" y1="80" x2="50" y2="72" stroke="rgba(234, 67, 53, 0.5)" strokeWidth="0.2" />
                 <path d="M48 71 L52 71" stroke="#EA4335" strokeWidth="0.5" />
               </g>

               <g className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: '50px 50px' }}>
                 <circle cx="80" cy="50" r="0.5" fill="#EA4335" />
                 <line x1="80" y1="50" x2="72" y2="50" stroke="rgba(234, 67, 53, 0.5)" strokeWidth="0.2" />
                 <path d="M71 48 L71 52" stroke="#EA4335" strokeWidth="0.5" />
               </g>
             </svg>

             {/* Lock Icon over Sovereign Zone */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#34A853] opacity-80 flex flex-col items-center">
                <Shield className="w-10 h-10 animate-pulse" />
             </div>
          </div>
        </div>

        {/* Real-time Status Card (Floating Glass UI) */}
        <Reveal delay={600} direction="left" className="absolute top-32 right-8 lg:right-16 z-20 hidden lg:block">
          <div className="dark-glass border border-white/10 rounded-xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-4 min-w-[220px]">
            <div className="flex items-center justify-between gap-6">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Data Location</span>
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse"></span><span className="text-xs text-white font-bold tracking-wide">NEPAL</span></div>
            </div>
            <div className="h-[1px] w-full bg-white/5"></div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Jurisdiction</span>
              <span className="text-xs text-blue-300 font-bold tracking-wide">LOCAL</span>
            </div>
            <div className="h-[1px] w-full bg-white/5"></div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Compliance</span>
              <span className="text-xs text-[#34A853] font-bold tracking-wide flex items-center gap-1"><CheckCircle className="w-3 h-3" /> ACTIVE</span>
            </div>
          </div>
        </Reveal>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col justify-center">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8 shadow-sm group cursor-default">
                <Globe className="w-4 h-4 text-[#0B79BF] group-hover:rotate-180 transition-transform duration-700" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-300">Solution 01: Data Sovereignty</span>
              </div>
            </Reveal>
            
            <Reveal delay={150}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bebas tracking-wide text-white mb-6 lg:leading-[1.1]">
                Take Absolute Control of Your Data<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] to-[#34A853]">
                  Within Nepal's Sovereign Infrastructure
                </span>
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-xl font-medium text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Store, manage, and govern your data entirely within Nepal—ensuring full jurisdictional control, regulatory alignment, and enterprise-grade security.
              </p>
              
              {/* Trust Strip */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 text-sm font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-[#34A853]" /> Fully Controlled</span>
                <span className="hidden sm:inline-block text-gray-600">•</span>
                <span className="flex items-center gap-2"><Database className="w-4 h-4 text-[#0B79BF]" /> Locally Hosted</span>
                <span className="hidden sm:inline-block text-gray-600">•</span>
                <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-blue-400" /> Compliance Ready</span>
              </div>
            </Reveal>

            <Reveal delay={450}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact" className="group bg-[#14477B] border border-[#14477B] text-white px-8 py-4 font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#0B79BF] hover:shadow-[0_0_30px_rgba(11,121,191,0.4)] flex items-center justify-center rounded">
                  Request Consultation
                </a>
                <a href="#architecture" className="group bg-transparent border border-white/20 text-white px-8 py-4 font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:border-white/50 hover:bg-white/5 rounded flex items-center justify-center gap-2">
                  View Architecture <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <Reveal delay={800} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors cursor-pointer group">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-white transition-colors">Explore How It Works</span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <div className="w-1 h-2 bg-current rounded-full animate-bounce"></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= 2. THE PROBLEM (Risk Block) ================= */}
      <section className="py-24 md:py-32 relative bg-white border-b border-gray-200 overflow-hidden">
        {/* Subtle red warning glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded text-xs font-bold uppercase tracking-widest border border-red-100 mb-6">
                <AlertTriangle className="w-4 h-4" /> Risk Awareness
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas text-gray-900 tracking-wide mb-6">
                The Hidden Risks of External Data Dependency
              </h2>
              <p className="text-xl text-red-600/80 font-bold tracking-wide">
                Most organizations don’t realize these risks until it’s too late.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {[
              { title: "Data Outside Control", icon: Globe, desc: "Data stored beyond national jurisdiction can be accessed or governed by external entities.", impact: "Jurisdictional Loss" },
              { title: "Limited Governance", icon: Eye, desc: "Lack of direct control over access, visibility, and policy enforcement.", impact: "Audit Failures" },
              { title: "Foreign Regulatory Exposure", icon: Landmark, desc: "Subject to foreign laws, government requests, and unknown compliance risks.", impact: "Regulatory Penalty Risk" },
              { title: "Compliance Complexity", icon: FileText, desc: "Audits and regulatory alignment become harder across distributed systems.", impact: "Operational Overhead" },
              { title: "Security Vulnerability", icon: Shield, desc: "Increased exposure due to multiple vendors and external dependencies.", impact: "Data Breach Exposure" }
            ].map((risk, i) => (
              <Reveal key={i} delay={i * 100} className={`bg-slate-50 border border-gray-200 p-8 rounded-2xl relative group transition-all duration-300 hover:bg-white hover:shadow-[0_15px_40px_rgba(234,67,53,0.08)] hover:border-red-200 ${i === 4 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}>
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="w-14 h-14 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0 border border-red-100 group-hover:bg-[#EA4335] group-hover:text-white transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(234,67,53,0.3)]">
                    <risk.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-gray-900 mb-3 tracking-wide">{risk.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">{risk.desc}</p>
                    
                    {/* Hover Impact Label */}
                    <div className="mt-4 h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EA4335] uppercase tracking-wider bg-red-50 px-3 py-1.5 rounded-md border border-red-100">
                        <AlertTriangle className="w-3.5 h-3.5" /> Potential Impact: {risk.impact}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="bg-red-50/80 border-l-4 border-[#EA4335] p-6 rounded-r-xl flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left relative overflow-hidden group">
              <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors"></div>
              <AlertTriangle className="w-8 h-8 text-[#EA4335] shrink-0 animate-pulse" />
              <p className="text-[#EA4335] font-bold text-lg tracking-wide relative z-10">
                These risks directly impact trust, compliance, and operational stability.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 3. WHY DATA SOVEREIGNTY MATTERS ================= */}
      <section className="py-24 md:py-32 relative bg-[#14477B] text-white overflow-hidden border-b border-white/10">
        {/* Abstract Background */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0B79BF]/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas tracking-wide mb-6">
                Data Sovereignty is No Longer Optional
              </h2>
              <div className="inline-block mt-2 mb-6">
                <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#34A853] bg-green-900/40 px-5 py-2.5 rounded-full border border-green-800/50">
                  For organizations handling critical data, control is not a feature—it is a requirement.
                </span>
              </div>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            
            {/* LEFT: Explanation */}
            <Reveal direction="right">
              <div className="space-y-6">
                <p className="text-xl font-light text-blue-100 leading-relaxed">
                  Data sovereignty ensures that your data is stored, processed, and governed within a defined jurisdiction—giving you full control over access, compliance, and security.
                </p>
                <p className="text-xl font-light text-blue-100 leading-relaxed mb-10">
                  In regulated and high-trust environments, this control is essential to maintain operational integrity and regulatory alignment.
                </p>
                
                <div className="bg-white/5 border-l-4 border-[#34A853] p-6 rounded-r-xl mt-8">
                  <p className="text-lg font-medium text-white tracking-wide">
                    Bichuten enables true data sovereignty—not partial control or hybrid compromise.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* RIGHT: Visual Concept */}
            <Reveal direction="left" delay={200}>
              <div className="relative w-full aspect-square md:aspect-video lg:aspect-square max-w-lg mx-auto bg-[#040814] rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-8 shadow-2xl">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Outer Environment (Red/Uncontrolled) */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#EA4335]/40 animate-[spin_40s_linear_infinite]"></div>
                  <div className="absolute top-4 left-0 w-full text-center text-[#EA4335]/70 text-xs font-bold uppercase tracking-widest">External Environment</div>
                  
                  {/* Inner Environment (Green/Controlled) */}
                  <div className="relative w-3/4 h-3/4 rounded-full bg-[#14477B] border-2 border-[#34A853] shadow-[0_0_50px_rgba(52,168,83,0.15)] flex flex-col items-center justify-center z-10 group">
                    <Shield className="w-12 h-12 text-[#34A853] mb-3 group-hover:scale-110 transition-transform duration-500" />
                    <span className="text-sm font-bold text-white uppercase tracking-widest">Controlled</span>
                    <span className="text-[10px] text-blue-300 uppercase tracking-widest mt-1">Environment</span>
                    
                    {/* Data Nodes inside */}
                    <Database className="absolute top-1/4 left-1/4 w-4 h-4 text-blue-400 opacity-50 animate-pulse" />
                    <Lock className="absolute bottom-1/4 right-1/4 w-4 h-4 text-[#34A853] opacity-80" />
                  </div>

                  {/* Flow lines blocked */}
                  <div className="absolute top-1/2 left-0 w-[12.5%] h-[2px] bg-gradient-to-r from-[#EA4335] to-transparent -translate-y-1/2 opacity-60"></div>
                  <div className="absolute top-1/2 right-0 w-[12.5%] h-[2px] bg-gradient-to-l from-[#EA4335] to-transparent -translate-y-1/2 opacity-60"></div>
                </div>
              </div>
            </Reveal>

          </div>

          {/* KEY PRINCIPLES (Card Grid) */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-24 relative z-10">
            {[
              { title: "Full Jurisdictional Control", icon: MapPin, text: "Your data remains within Nepal, governed by local laws and policies." },
              { title: "Complete Visibility", icon: Eye, text: "Full insight into where data resides and how it is accessed." },
              { title: "Regulatory Alignment", icon: Landmark, text: "Built to meet compliance and audit requirements from the ground up." },
              { title: "Secure Access Control", icon: Lock, text: "Define and enforce access across systems, users, and environments." }
            ].map((principle, i) => (
              <Reveal key={i} delay={i * 100} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors flex flex-col sm:flex-row items-start gap-6 group">
                <div className="w-14 h-14 bg-[#0B79BF]/20 border border-[#0B79BF]/30 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#0B79BF]/40 transition-colors">
                  <principle.icon className="w-7 h-7 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-3 tracking-wide">{principle.title}</h4>
                  <p className="text-sm text-blue-100/80 leading-relaxed font-medium">{principle.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="text-center pt-10 border-t border-white/10">
              <p className="text-lg md:text-xl text-blue-200/80 tracking-wide font-medium mb-3 uppercase">
                Not all infrastructure claiming control actually provides sovereignty.
              </p>
              <h3 className="text-2xl md:text-4xl font-light text-white tracking-wide">
                With Bichuten, sovereignty is built into the foundation—<strong className="text-[#34A853] font-bold">not added later.</strong>
              </h3>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 4. HOW IT DELIVERS SOVEREIGNTY (System Flow) ================= */}
      <section className="py-24 md:py-32 relative bg-slate-50 border-b border-gray-200 overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-[0.03]"></div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas text-[#14477B] tracking-wide mb-6">
                How Bichuten Delivers Sovereign Infrastructure
              </h2>
              <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-6">
                Data sovereignty is not achieved through a single feature—it is delivered through an integrated system designed for control, security, and compliance.
              </p>
              <div className="inline-block px-4 py-1.5 bg-blue-50 text-[#0B79BF] text-xs font-bold uppercase tracking-widest rounded border border-blue-100">
                Built as a unified system—not assembled from multiple vendors.
              </div>
            </Reveal>
          </div>

          <div className="relative max-w-4xl mx-auto">
            
            {/* SVG Connecting Vertical Line */}
            <div className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#14477B] via-[#0B79BF] to-[#34A853] opacity-30 -translate-x-1/2 z-0 hidden sm:block"></div>
            
            {/* Animated Flow Packet */}
            <div className="absolute left-[38px] md:left-1/2 top-0 w-1.5 h-32 bg-gradient-to-b from-transparent via-[#0B79BF] to-transparent blur-[1px] -translate-x-1/2 z-0 hidden sm:block animate-[pulse_3s_infinite]"></div>

            <div className="space-y-6 md:space-y-12 relative z-10">
              {[
                { title: "Local Infrastructure", icon: Server, desc: "Data stored and processed entirely within Nepal", detail: "Physical hardware residency ensures that no foreign entities can seize or mandate access to server racks." },
                { title: "Secure Communication", icon: Wifi, desc: "Controlled data exchange across systems and users", detail: "Encrypted transit pathways prevent interception during data movement between internal nodes." },
                { title: "Identity & Access", icon: Eye, desc: "Strict access governance across all touchpoints", detail: "Zero-Trust architecture ensures only explicitly verified entities can interact with the environment." },
                { title: "Security & Encryption", icon: Lock, desc: "End-to-end protection of data and systems", detail: "Military-grade encryption at rest and in transit blocks unauthorized external extraction attempts." },
                { title: "Compliance & Monitoring", icon: Activity, desc: "Continuous tracking, reporting, and audit readiness", detail: "Real-time telemetry continuously proves adherence to local and industry regulations." }
              ].map((step, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className={`relative flex flex-col sm:flex-row items-center gap-6 group ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    
                    {/* Center Node (Hidden on mobile for better stacking) */}
                    <div className="hidden sm:flex absolute left-[38px] md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-slate-50 border-[3px] border-[#0B79BF] z-10 group-hover:scale-125 group-hover:border-[#34A853] group-hover:bg-[#34A853] transition-all duration-300"></div>

                    {/* Content Card */}
                    <div className={`w-full sm:w-[calc(100%-80px)] md:w-[calc(50%-40px)] bg-white border border-gray-200 p-6 lg:p-8 rounded-2xl shadow-sm hover:shadow-[0_15px_40px_rgba(20,71,123,0.08)] hover:border-[#0B79BF]/40 transition-all duration-300 relative overflow-hidden ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      {/* Subtle hover background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0B79BF]/0 to-[#0B79BF]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className={`flex items-center gap-4 mb-3 relative z-10 ${i % 2 === 0 ? 'md:justify-end md:flex-row-reverse' : 'md:justify-start'}`}>
                        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-[#14477B]/5 flex items-center justify-center shrink-0 text-[#14477B] group-hover:bg-[#14477B] group-hover:text-white transition-colors duration-300">
                          <step.icon className="w-6 h-6 lg:w-7 lg:h-7" />
                        </div>
                        <h4 className="text-xl lg:text-2xl font-bold text-[#14477B] tracking-wide">{step.title}</h4>
                      </div>
                      
                      <p className="text-sm lg:text-base font-bold text-gray-800 mb-2 relative z-10">{step.desc}</p>
                      
                      {/* Advanced Interaction: What happens here */}
                      <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 relative z-10 transform translate-y-2 group-hover:translate-y-0">
                        <div className={`p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-900 font-medium ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          <span className="text-[#0B79BF] font-bold block mb-1 uppercase tracking-widest text-[10px]">What happens here:</span>
                          {step.detail}
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Continuous Control Cycle (Side Loop Visual for Desktop) */}
            <div className="hidden lg:flex absolute top-[10%] bottom-[10%] -left-16 xl:-left-32 w-16 xl:w-24 border-l-2 border-y-2 border-dashed border-[#34A853]/40 rounded-l-3xl items-center pointer-events-none opacity-50">
               <div className="absolute top-1/2 -left-4 xl:-left-8 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-[#34A853] uppercase tracking-widest whitespace-nowrap bg-slate-50 px-2 shadow-[0_0_10px_white]">
                 Continuous Control Cycle
               </div>
               {/* Arrow head */}
               <div className="absolute -top-[1px] right-0 w-3 h-3 border-t-2 border-r-2 border-[#34A853]/40 rotate-45"></div>
            </div>

          </div>

          {/* OUTCOME BLOCK */}
          <Reveal delay={300}>
            <div className="mt-24 max-w-4xl mx-auto bg-white border border-[#34A853]/30 rounded-2xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(52,168,83,0.08)] relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-3 h-full bg-[#34A853]"></div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#34A853]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#34A853]/10 transition-colors"></div>
               
               <div className="text-center mb-8 relative z-10">
                 <h4 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">System Outcome</h4>
                 <h3 className="text-3xl md:text-4xl font-bebas tracking-wide text-[#14477B]">Complete Sovereign Control</h3>
               </div>
               
               <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 relative z-10 max-w-2xl mx-auto">
                 {[
                   "Data never leaves jurisdiction",
                   "Full visibility across systems",
                   "Unified governance and control",
                   "No external dependency"
                 ].map((outcome, i) => (
                   <div key={i} className="flex items-center gap-4 bg-slate-50 border border-gray-100 p-4 rounded-xl">
                     <CheckCircle className="w-6 h-6 text-[#34A853] shrink-0" />
                     <span className="text-sm md:text-base font-bold text-gray-800">{outcome}</span>
                   </div>
                 ))}
               </div>
            </div>
          </Reveal>

          {/* Optional: Data Lifecycle Inline Strip */}
          <Reveal delay={500}>
            <div className="mt-16 pt-8 border-t border-gray-200/60 flex flex-wrap items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              <span className="text-[#14477B]">Create</span>
              <ArrowRight className="w-4 h-4 text-gray-300" />
              <span className="text-[#14477B]">Store</span>
              <ArrowRight className="w-4 h-4 text-gray-300" />
              <span className="text-[#14477B]">Access</span>
              <ArrowRight className="w-4 h-4 text-gray-300" />
              <span className="text-[#14477B]">Monitor</span>
              <ArrowRight className="w-4 h-4 text-gray-300" />
              <span className="text-[#34A853]">Archive</span>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 6. EXECUTIVE OUTCOMES (Value Block) ================= */}
      <section className="py-24 md:py-32 bg-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#14477B]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas text-[#14477B] tracking-wide mb-6">
                What Data Sovereignty Delivers
              </h2>
              <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-6">
                Implementing sovereign infrastructure is not just a technical upgrade—it is a strategic shift in control, security, and long-term operational stability.
              </p>
              <div className="inline-block px-4 py-1.5 bg-white text-[#14477B] text-xs font-bold uppercase tracking-widest rounded border border-gray-200 shadow-sm">
                Designed for regulated and mission-critical environments.
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { title: "Full Control Over Data", icon: Globe, desc: "Maintain complete control over where your data resides, how it is accessed, and how it is governed—within Nepal." },
              { title: "Reduced Regulatory Risk", icon: AlertTriangle, desc: "Align with local compliance requirements and reduce exposure to foreign legal and jurisdictional risks." },
              { title: "Stronger Security Posture", icon: Shield, desc: "Protect critical systems with integrated encryption, access control, and continuous monitoring." },
              { title: "Simplified Compliance", icon: Lock, desc: "Streamline audits and reporting with infrastructure designed for regulatory environments." },
              { title: "Improved Performance", icon: Activity, desc: "Achieve faster response times and operational efficiency with locally hosted infrastructure." },
              { title: "Long-Term Stability", icon: Server, desc: "Build a future-ready foundation that supports growth, evolving technologies, and regulatory changes." }
            ].map((outcome, i) => (
              <Reveal key={i} delay={i * 100} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-[0_20px_40px_rgba(20,71,123,0.08)] hover:border-[#0B79BF]/40 transition-all duration-300 group flex flex-col">
                <div className="w-14 h-14 bg-slate-50 border border-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#14477B] transition-colors duration-300">
                  <outcome.icon className="w-7 h-7 text-[#14477B] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-wide mb-3">{outcome.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium flex-grow">{outcome.desc}</p>
                <div className="mt-6 w-8 h-1 bg-gray-200 rounded group-hover:bg-[#34A853] group-hover:w-16 transition-all duration-300"></div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="text-center">
              <p className="text-lg md:text-xl text-[#14477B] font-bold tracking-wide max-w-2xl mx-auto border-t border-gray-200 pt-10">
                "This is not just about data location—it is about control, accountability, and long-term resilience."
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 7. SOVEREIGN ADVANTAGE OF NEPAL (Photographic / Dark Theme) ================= */}
      <section className="relative py-32 bg-[#040814] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2000&auto=format&fit=crop" 
            alt="Nepal Hydro Dam" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040814] via-[#040814]/80 to-transparent"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <Reveal direction="right">
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">Leveraging Nepal’s Natural & Strategic Strengths</h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-8">
                Bichuten’s infrastructure is built physically within Nepal, providing unique environmental and strategic advantages that foreign clouds cannot replicate.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: "Powered entirely by clean hydroelectric energy" },
                  { icon: Cloud, text: "Naturally cool climate drastically increases efficiency" },
                  { icon: MapPin, text: "Strategic regional positioning" },
                  { icon: Shield, text: "Total alignment with national digital growth initiatives" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 dark-glass p-4 rounded-xl border border-white/10">
                    <item.icon className="w-6 h-6 text-[#34A853]" />
                    <span className="text-sm font-medium text-white">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 inline-block px-6 py-2 bg-[#34A853]/20 border border-[#34A853] text-[#34A853] rounded text-sm font-bold uppercase tracking-widest">
                Sustainable • Cost-Efficient • Secure
              </div>
            </Reveal>

            {/* Geographic Radar Graphic */}
            <Reveal direction="left" delay={200} className="hidden lg:flex relative h-[500px] justify-center items-center">
               <div className="relative w-96 h-96 border border-[#0B79BF]/30 rounded-full flex justify-center items-center">
                  <div className="absolute w-full h-full border border-[#34A853]/50 rounded-full animate-radar-ping"></div>
                  <div className="absolute w-2/3 h-2/3 border border-[#0B79BF]/50 rounded-full animate-radar-ping" style={{animationDelay: '0.8s'}}></div>
                  
                  {/* Abstract Nepal Map Shape SVG Placeholder */}
                  <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full opacity-40 drop-shadow-xl z-10 text-[#0B79BF]">
                     <path d="M20,60 L50,40 L100,50 L160,30 L180,60 L140,80 L80,90 Z" fill="currentColor" />
                  </svg>
                  
                  <div className="relative z-20 flex flex-col items-center">
                    <MapPin className="w-10 h-10 text-[#34A853] mb-2" />
                    <span className="bg-[#040814] px-3 py-1 rounded border border-[#34A853] font-bold text-white text-xs uppercase tracking-widest">Nepal Data Vault</span>
                  </div>
               </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 8. USE CASES (Tab Layout) ================= */}
      <section className="py-24 md:py-32 bg-white relative border-y border-gray-200 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#14477B]/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#34A853]/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas text-[#14477B] tracking-wide mb-6">
                Where Data Sovereignty Matters Most
              </h2>
              <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-8">
                Bichuten enables secure and controlled infrastructure across industries where data sensitivity, compliance, and operational reliability are critical.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-[#14477B] text-sm font-bold tracking-wide rounded-lg border border-gray-200 shadow-sm">
                <Shield className="w-4 h-4 text-[#34A853]" /> Used in environments where data security and reliability are mission-critical.
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_20px_40px_rgba(20,71,123,0.05)] overflow-hidden min-h-[500px]">
              {/* Tab Navigation */}
              <div className="flex flex-wrap md:flex-nowrap border-b border-gray-200 bg-slate-50 overflow-x-auto custom-scrollbar">
                {[
                  { name: "Banking", icon: Landmark },
                  { name: "Government", icon: Building2 },
                  { name: "Telecom", icon: Wifi },
                  { name: "Enterprise", icon: Briefcase },
                  { name: "Digital Platforms", icon: Layers }
                ].map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`flex-1 min-w-[150px] flex items-center justify-center gap-3 py-5 px-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${activeTab === idx ? 'text-[#14477B] bg-white' : 'text-gray-500 hover:text-gray-800 hover:bg-white/50'}`}
                  >
                    <tab.icon className={`w-5 h-5 ${activeTab === idx ? 'text-[#0B79BF]' : 'text-gray-400'}`} />
                    {tab.name}
                    {activeTab === idx && (
                      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#34A853]"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content Panels */}
              <div className="relative">
                {[
                  {
                    title: "Banking & Financial Services",
                    context: "Secure infrastructure for regulated financial operations",
                    icon: Landmark,
                    apps: ["Core banking systems", "Transaction processing", "Regulatory compliance & audit"],
                    color: "border-[#14477B]",
                    bg: "bg-[#14477B]"
                  },
                  {
                    title: "Government & Public Sector",
                    context: "National data systems with full sovereignty and control",
                    icon: Building2,
                    apps: ["Citizen data systems", "E-governance platforms", "Public digital infrastructure"],
                    color: "border-[#0B79BF]",
                    bg: "bg-[#0B79BF]"
                  },
                  {
                    title: "Telecom & ISPs",
                    context: "High-performance infrastructure for network operations",
                    icon: Wifi,
                    apps: ["Network data management", "Routing and infrastructure backbone", "Data exchange systems"],
                    color: "border-[#FBBC05]",
                    bg: "bg-[#FBBC05]"
                  },
                  {
                    title: "Enterprise Organizations",
                    context: "Reliable infrastructure for internal and operational systems",
                    icon: Briefcase,
                    apps: ["ERP systems", "Internal data environments", "Business-critical applications"],
                    color: "border-[#4285F4]",
                    bg: "bg-[#4285F4]"
                  },
                  {
                    title: "Digital & Tech Platforms",
                    context: "Scalable backend infrastructure for modern digital services",
                    icon: Layers,
                    apps: ["SaaS platforms", "Application data systems", "Scalable architectures"],
                    color: "border-[#34A853]",
                    bg: "bg-[#34A853]"
                  }
                ].map((panel, idx) => (
                  <div
                    key={idx}
                    className={`p-8 lg:p-16 transition-all duration-500 ${activeTab === idx ? 'opacity-100 relative translate-y-0 z-10 block' : 'opacity-0 absolute inset-0 pointer-events-none translate-y-4 -z-10 hidden'} flex-col md:flex-row items-center gap-10 md:gap-16`}
                    style={{ display: activeTab === idx ? 'flex' : 'none' }}
                  >
                    <div className="md:w-1/2 w-full">
                      <div className={`w-20 h-20 rounded-2xl bg-white border-2 ${panel.color} flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] relative overflow-hidden group`}>
                         <div className={`absolute inset-0 ${panel.bg} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                         <panel.icon className="w-10 h-10 text-gray-800 relative z-10" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bebas text-[#14477B] tracking-wide mb-4">{panel.title}</h3>
                      <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed">{panel.context}</p>
                    </div>

                    <div className="md:w-1/2 w-full bg-slate-50 border border-gray-100 rounded-2xl p-8 shadow-inner relative overflow-hidden">
                      <div className={`absolute top-0 right-0 w-32 h-32 ${panel.bg} opacity-[0.03] rounded-bl-full`}></div>
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-[0.15em] mb-6 border-b border-gray-200 pb-3">Key Applications</h4>
                      <ul className="space-y-5">
                        {panel.apps.map((app, appIdx) => (
                          <li key={appIdx} className="flex items-center gap-4 group">
                            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-[#34A853] transition-colors duration-300 shrink-0">
                              <CheckCircle className="w-4 h-4 text-gray-400 group-hover:text-[#34A853] transition-colors" />
                            </div>
                            <span className="text-gray-700 font-bold tracking-wide group-hover:text-gray-900 transition-colors">{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* CTA Button */}
          <Reveal delay={400} className="mt-16 text-center">
             <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#14477B] text-white rounded-lg font-bold tracking-wide hover:bg-[#0a2c50] transition-all shadow-[0_10px_20px_rgba(20,71,123,0.2)] hover:shadow-[0_15px_30px_rgba(20,71,123,0.4)] hover:-translate-y-1">
               Explore Solutions by Industry
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
          </Reveal>

        </div>
      </section>

      {/* ================= 10. DIFFERENTIATION (Local vs Foreign Cloud Comparison) ================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Beyond Traditional Cloud Models</h2>
              <p className="text-gray-600">Global cloud providers prioritize reach, often operating outside local jurisdictions. Bichuten offers a fundamentally different, locally-rooted approach.</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Global Cloud (Red/Gray Theme) */}
            <Reveal direction="right" className="bg-gray-50 border border-gray-200 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 rounded-lg"><Globe className="w-6 h-6 text-[#EA4335]" /></div>
                <h3 className="text-2xl font-bebas text-gray-800 tracking-wider">Global Cloud Providers</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-gray-600"><AlertTriangle className="w-5 h-5 text-gray-400"/> Data spread across unknown borders</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><AlertTriangle className="w-5 h-5 text-gray-400"/> Subject to foreign government access requests</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><AlertTriangle className="w-5 h-5 text-gray-400"/> Fragmented security across multiple vendors</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><AlertTriangle className="w-5 h-5 text-gray-400"/> Focus on horizontal scalability, not local control</li>
              </ul>
            </Reveal>

            {/* Sovereign Cloud (Blue/Green Theme) */}
            <Reveal direction="left" delay={150} className="bg-[#14477B] border border-[#0B79BF] p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-[#34A853]"></div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#0B79BF]/30 border border-[#0B79BF] rounded-lg"><Shield className="w-6 h-6 text-white" /></div>
                <h3 className="text-2xl font-bebas text-white tracking-wider">Bichuten Sovereign Model</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-blue-100"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Fully sovereign infrastructure within Nepal</li>
                <li className="flex items-center gap-3 text-sm text-blue-100"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Integrated platform with native security</li>
                <li className="flex items-center gap-3 text-sm text-blue-100"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Designed specifically for regulated environments</li>
                <li className="flex items-center gap-3 text-sm text-blue-100"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Absolute focus on data control and privacy</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA (High Conversion Block) ================= */}
      <section className="py-24 md:py-32 bg-[#040814] relative overflow-hidden border-t border-[#0B79BF]/30">
        {/* Advanced Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#14477B]/20 to-[#34A853]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]"></div>

        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EA4335]/10 text-[#EA4335] text-xs font-bold uppercase tracking-widest rounded border border-[#EA4335]/20 mb-8 shadow-[0_0_15px_rgba(234,67,53,0.1)]">
              <AlertTriangle className="w-4 h-4" /> Delaying control increases risk
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bebas text-white tracking-wide mb-6">
              Take Control of Your Data <span className="text-[#0B79BF]">Today</span>
            </h2>
            
            <p className="text-blue-100/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
              Move your infrastructure into a secure, compliant, and fully controlled environment within Nepal. Our team will guide you through infrastructure planning, compliance alignment, and deployment.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              {/* Primary CTA */}
              <button className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#34A853] text-white rounded-lg font-bold tracking-wide hover:bg-[#2b8a44] transition-all shadow-[0_0_20px_rgba(52,168,83,0.3)] hover:shadow-[0_0_30px_rgba(52,168,83,0.5)] hover:-translate-y-1">
                Request Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-white border border-white/20 rounded-lg font-bold tracking-wide hover:bg-white/10 hover:border-white/40 transition-all hover:-translate-y-1">
                Talk to an Expert
              </button>

              {/* Tertiary CTA */}
              <button className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-4 text-blue-300 hover:text-white font-medium transition-colors">
                <FileText className="w-5 h-5" /> View Architecture
              </button>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="border-t border-white/10 pt-10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-sm font-medium text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#34A853]" /> No obligation consultation
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#34A853]" /> Enterprise-grade infrastructure
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#34A853]" /> Built for regulated environments
                </div>
              </div>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#0B79BF]">
                Secure. Compliant. Fully Controlled.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      

    </div>
  );
};

export default DataSovereignty;