import React, { useEffect, useRef, useState } from 'react';
import { 
  Shield, Globe, MessageSquare, Video, Mail, 
  ArrowRight, Lock, CheckCircle, AlertTriangle, 
  FileText, Users, Activity, Key, Server
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

const CommunicationLayer = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES FOR LIGHT THEME --- */}
      <style>
        {`
          @keyframes dataStream {
            to { stroke-dashoffset: -100; }
          }
          .animate-stream {
            stroke-dasharray: 8 8;
            animation: dataStream 2s linear infinite;
          }
          .bg-dot-pattern {
            background-image: radial-gradient(#0B79BF 1px, transparent 1px);
            background-size: 24px 24px;
            opacity: 0.1;
          }
          .light-glass {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 10px 40px -10px rgba(20, 71, 123, 0.08);
          }
          @keyframes floatUI {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(1deg); }
          }
          .animate-float-ui {
            animation: floatUI 8s ease-in-out infinite;
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-40 pb-32 min-h-[90vh] flex flex-col justify-center border-b border-gray-200 bg-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-dot-pattern z-0"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-[100px] opacity-70"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="max-w-2xl">
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-8">
                  <MessageSquare className="w-4 h-4 text-[#0B79BF]" />
                  <span className="text-xs font-bold tracking-widest uppercase text-[#14477B]">Layer 2: Communication</span>
                </div>
              </Reveal>
              
              <Reveal delay={150}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bebas tracking-wide text-[#14477B] mb-6 leading-[1]">
                  Secure Communication Without <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] to-[#4da6e7]">
                    External Dependencies
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={300}>
                <p className="text-lg md:text-xl font-light text-gray-600 mb-6 leading-relaxed">
                  Bichuten’s Communication Layer enables organizations to communicate, collaborate, and exchange data within a fully secure and sovereign environment—eliminating reliance on foreign platforms.
                </p>
                <p className="text-sm font-bold text-[#0B79BF] uppercase tracking-wider mb-10">
                  Designed for organizations where confidentiality, control, and compliance are critical.
                </p>
              </Reveal>

              <Reveal delay={450}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group bg-[#14477B] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#0B79BF] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 rounded">
                    Request a Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a href="/platform/overview" className="bg-white text-[#14477B] px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 border border-gray-200 hover:border-[#0B79BF] hover:text-[#0B79BF] shadow-sm flex items-center justify-center rounded">
                    Explore Platform
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Hero Visual: Abstract Secure UI Graphic */}
            <Reveal direction="left" delay={300} className="hidden lg:block relative h-[600px]">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Main Dashboard Mockup */}
                <div className="relative w-full max-w-lg light-glass rounded-2xl border border-gray-100 p-4 shadow-2xl animate-float-ui z-20">
                  <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="ml-auto flex items-center gap-2 text-xs font-bold text-[#0B79BF] bg-blue-50 px-2 py-1 rounded">
                      <Lock className="w-3 h-3" /> End-to-End Encrypted
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-end">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                      <div className="bg-gray-100 rounded-2xl rounded-bl-none p-4 w-3/4"><div className="h-2 bg-gray-300 rounded w-full mb-2"></div><div className="h-2 bg-gray-300 rounded w-2/3"></div></div>
                    </div>
                    <div className="flex gap-4 items-end flex-row-reverse">
                      <div className="w-10 h-10 rounded-full bg-[#14477B] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">ME</div>
                      <div className="bg-[#0B79BF] text-white rounded-2xl rounded-br-none p-4 w-2/3 shadow-md"><div className="h-2 bg-white/50 rounded w-full mb-2"></div><div className="h-2 bg-white/50 rounded w-1/2"></div></div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements representing Email & Video */}
                <div className="absolute top-10 -left-10 w-48 light-glass p-4 rounded-xl shadow-xl z-30 animate-float-ui" style={{animationDelay: '1s'}}>
                  <Mail className="w-6 h-6 text-[#14477B] mb-2" />
                  <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                </div>
                
                <div className="absolute bottom-20 -right-12 w-56 light-glass p-4 rounded-xl shadow-xl z-30 animate-float-ui" style={{animationDelay: '2s'}}>
                  <Video className="w-6 h-6 text-green-600 mb-2" />
                  <div className="h-24 bg-gray-900 rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-2 left-2 flex gap-1">
                       <div className="w-4 h-4 rounded-full bg-red-500"></div><div className="w-4 h-4 rounded-full bg-gray-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 2 & 4. OVERVIEW & WHY IT MATTERS (Contrasting Cards) ================= */}
      <section className="py-24 relative bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">A Controlled Environment for Digital Communication</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Modern organizations depend heavily on communication tools. However, hosting these on external platforms exposes sensitive data to foreign jurisdictions and cybersecurity risks.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* The Risk (External) */}
            <Reveal direction="right" className="bg-white border border-gray-200 p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-red-500"></div>
              <Globe className="w-10 h-10 text-red-500 mb-6" />
              <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-4">The Risk of External Platforms</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Relying on global communication platforms that store and process data outside your control creates significant vulnerabilities.
              </p>
              <ul className="space-y-3">
                {["Limited control over sensitive data", "Exposure to foreign jurisdictions", "Increased cybersecurity risks", "Compliance and audit challenges"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                    <AlertTriangle className="w-4 h-4 text-red-500" /> {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* The Solution (Sovereign) */}
            <Reveal direction="left" delay={150} className="bg-[#14477B] text-white p-10 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-[#0B79BF]"></div>
              <Shield className="w-10 h-10 text-[#0B79BF] mb-6" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">The Sovereign Communication Advantage</h3>
              <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                Bichuten provides a fully integrated communication environment hosted within Nepal, ensuring data remains protected and compliant.
              </p>
              <ul className="space-y-3">
                {["Full control over communication data", "Elimination of foreign dependency", "Compliance with regulatory requirements", "Reduced external cyber exposure"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white font-medium">
                    <CheckCircle className="w-4 h-4 text-[#0B79BF]" /> {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ================= 3. CORE COMMUNICATION CAPABILITIES (UI Features Grid) ================= */}
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bebas text-center text-[#14477B] tracking-wide mb-16">
              Integrated Systems for Secure Collaboration
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Capability 1: Email */}
            <Reveal delay={0} className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden flex flex-col group">
              <div className="h-48 bg-blue-50 relative p-6 border-b border-gray-100 overflow-hidden">
                {/* Abstract Email UI */}
                <div className="w-full bg-white rounded shadow-sm border border-gray-200 p-3 transform group-hover:translate-y-1 transition-transform">
                  <div className="flex justify-between items-center mb-2"><div className="h-2 w-1/3 bg-gray-200 rounded"></div><Lock className="w-3 h-3 text-[#0B79BF]"/></div>
                  <div className="h-2 w-full bg-gray-100 rounded mb-1"></div>
                  <div className="h-2 w-4/5 bg-gray-100 rounded"></div>
                </div>
                <div className="w-full bg-white/50 rounded shadow-sm border border-gray-200 p-3 mt-2 transform translate-x-4 opacity-50">
                  <div className="h-2 w-1/4 bg-gray-200 rounded mb-2"></div>
                </div>
              </div>
              <div className="p-8 flex-grow">
                <Mail className="w-8 h-8 text-[#14477B] mb-4" />
                <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-3">Secure Sovereign Email</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">A fully encrypted, locally hosted email platform designed for sensitive and regulated communication.</p>
                <ul className="space-y-2 mt-auto">
                  {["End-to-end encrypted", "Local hosting (Data residency)", "Controlled access & audit logging"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wide">
                      <div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Capability 2: Messaging */}
            <Reveal delay={150} className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden flex flex-col group">
              <div className="h-48 bg-slate-50 relative p-6 border-b border-gray-100 overflow-hidden flex flex-col justify-end gap-2">
                {/* Abstract Chat UI */}
                <div className="self-start bg-gray-200 rounded-2xl rounded-bl-none px-4 py-2 w-2/3 transform group-hover:translate-x-1 transition-transform"></div>
                <div className="self-end bg-[#0B79BF] rounded-2xl rounded-br-none px-4 py-2 w-3/4 shadow-sm transform group-hover:-translate-x-1 transition-transform"></div>
                <div className="self-start bg-gray-200 rounded-2xl rounded-bl-none px-4 py-2 w-1/2"></div>
              </div>
              <div className="p-8 flex-grow">
                <MessageSquare className="w-8 h-8 text-[#14477B] mb-4" />
                <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-3">Messaging & File Exchange</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">A secure platform for real-time messaging and controlled file sharing within organizations.</p>
                <ul className="space-y-2 mt-auto">
                  {["Encrypted messaging channels", "Secure file transfer controls", "Activity tracking & audit logs"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wide">
                      <div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Capability 3: Video */}
            <Reveal delay={300} className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden flex flex-col group">
              <div className="h-48 bg-gray-900 relative p-4 border-b border-gray-800 overflow-hidden grid grid-cols-2 gap-2">
                {/* Abstract Video UI */}
                <div className="bg-gray-800 rounded-lg relative"><div className="absolute bottom-2 left-2 w-6 h-2 bg-gray-700 rounded"></div></div>
                <div className="bg-gray-800 rounded-lg relative border-2 border-[#0B79BF]"><div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div></div>
                <div className="bg-gray-800 rounded-lg col-span-2 relative flex items-center justify-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-gray-700"></div><div className="w-6 h-6 rounded-full bg-red-500"></div>
                </div>
              </div>
              <div className="p-8 flex-grow">
                <Video className="w-8 h-8 text-[#14477B] mb-4" />
                <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-3">Encrypted Video Collaboration</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">Secure voice and video communication tools designed for confidential discussions and enterprise collaboration.</p>
                <ul className="space-y-2 mt-auto">
                  {["Encrypted video conferencing", "Secure voice communication", "No external platform dependency"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wide">
                      <div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 5 & 6. SECURITY & COMPLIANCE (Feature List) ================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Security */}
            <Reveal direction="right">
              <div className="flex items-center gap-4 mb-6">
                 <div className="p-3 bg-blue-50 rounded-lg text-[#14477B]"><Lock className="w-8 h-8" /></div>
                 <h2 className="text-3xl font-bebas text-gray-900 tracking-wide">Built-In Security Across All Channels</h2>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Security is embedded across every communication channel within the platform, ensuring that all interactions remain protected.
              </p>
              <div className="space-y-4">
                {[
                  { title: "End-to-End Encryption", desc: "Data is encrypted in transit and at rest." },
                  { title: "Secure Access Controls", desc: "Identity and role-based authentication." },
                  { title: "Continuous Monitoring", desc: "Logging of all communication activities." },
                  { title: "Data Leakage Prevention", desc: "Protection against unauthorized sharing." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#0B79BF]/30 hover:bg-blue-50/30 transition-colors">
                    <CheckCircle className="w-5 h-5 text-[#0B79BF] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Compliance */}
            <Reveal direction="left" delay={150}>
              <div className="flex items-center gap-4 mb-6">
                 <div className="p-3 bg-blue-50 rounded-lg text-[#14477B]"><FileText className="w-8 h-8" /></div>
                 <h2 className="text-3xl font-bebas text-gray-900 tracking-wide">Designed for Regulatory Environments</h2>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Organizations operating in regulated industries require communication systems that support strict compliance and audit requirements.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Full Audit Trails", desc: "Comprehensive records of communication activities." },
                  { title: "Regulatory Archival", desc: "Immutable storage of emails and messages." },
                  { title: "Compliance-Ready Reporting", desc: "Automated report generation for auditors." },
                  { title: "Strict Data Retention", desc: "Policies aligned with national and industry laws." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#0B79BF]/30 hover:bg-blue-50/30 transition-colors">
                    <CheckCircle className="w-5 h-5 text-[#0B79BF] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 7. INTEGRATION (Animated SVG Graph) ================= */}
      <section className="py-24 bg-blue-50 relative overflow-hidden border-y border-blue-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Seamlessly Integrated Platform</h2>
              <p className="text-gray-600">The Communication Layer is tightly integrated with other platform components, ensuring consistent policies and controls.</p>
            </Reveal>
          </div>

          <div className="relative h-[400px] max-w-4xl mx-auto flex items-center justify-center">
             {/* Background SVG Lines */}
             <svg viewBox="0 0 400 400" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-0">
  <path d="M 200 200 L 80 200" fill="none" stroke="#0B79BF" strokeWidth="2" className="animate-flow opacity-50" />
  <path d="M 200 200 L 320 200" fill="none" stroke="#0B79BF" strokeWidth="2" className="animate-flow opacity-50" />
  <path d="M 200 200 L 200 80" fill="none" stroke="#0B79BF" strokeWidth="2" className="animate-flow opacity-50" />
  <path d="M 200 200 L 200 320" fill="none" stroke="#0B79BF" strokeWidth="2" className="animate-flow opacity-50" />
</svg>
             {/* Center Node: Communication */}
             <Reveal className="absolute z-20">
               <div className="w-40 h-40 bg-white rounded-full border-4 border-[#14477B] flex flex-col items-center justify-center shadow-2xl relative">
                  <div className="absolute inset-0 rounded-full border-2 border-[#0B79BF]/30 animate-ping"></div>
                  <MessageSquare className="w-10 h-10 text-[#14477B] mb-2" />
                  <span className="font-bebas text-lg tracking-wider text-gray-900">Communication</span>
               </div>
             </Reveal>

             {/* Satellite Nodes */}
             <Reveal delay={200} className="absolute left-[10%] z-10 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 w-64">
                <div className="p-2 bg-blue-50 rounded text-[#0B79BF]"><Key className="w-6 h-6"/></div>
                <div><h4 className="font-bold text-sm text-gray-900">Identity Layer</h4><p className="text-[10px] text-gray-500">Controls user access & auth</p></div>
             </Reveal>

             <Reveal delay={300} className="absolute right-[10%] z-10 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 w-64">
                <div className="p-2 bg-blue-50 rounded text-[#0B79BF]"><Shield className="w-6 h-6"/></div>
                <div><h4 className="font-bold text-sm text-gray-900">Security Layer</h4><p className="text-[10px] text-gray-500">Ensures encryption & protection</p></div>
             </Reveal>

             <Reveal delay={400} className="absolute top-[10%] z-10 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 w-64">
                <div className="p-2 bg-blue-50 rounded text-[#0B79BF]"><FileText className="w-6 h-6"/></div>
                <div><h4 className="font-bold text-sm text-gray-900">Compliance Layer</h4><p className="text-[10px] text-gray-500">Monitors & archives activity</p></div>
             </Reveal>
          </div>

        </div>
      </section>

      {/* ================= 8, 9, 10. USE CASES & DIFFERENTIATION (Grid) ================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Use Cases */}
            <Reveal delay={0} className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-md transition-shadow">
              <Users className="w-8 h-8 text-[#14477B] mb-6" />
              <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-4">Supporting Secure Communication</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">Designed for organizations that require secure and controlled communication environments.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-700 font-medium"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full mt-1.5 flex-shrink-0"></div> Financial institutions</li>
                <li className="flex items-start gap-2 text-sm text-gray-700 font-medium"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full mt-1.5 flex-shrink-0"></div> Government internal collaboration</li>
                <li className="flex items-start gap-2 text-sm text-gray-700 font-medium"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full mt-1.5 flex-shrink-0"></div> Board-level meetings</li>
                <li className="flex items-start gap-2 text-sm text-gray-700 font-medium"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full mt-1.5 flex-shrink-0"></div> Secure enterprise document sharing</li>
              </ul>
            </Reveal>

            {/* Performance */}
            <Reveal delay={150} className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-md transition-shadow">
              <Activity className="w-8 h-8 text-[#14477B] mb-6" />
              <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-4">Reliable & High-Performance</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">Local deployment ensures that communication systems deliver high performance without delays.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-700 font-medium"><div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div> Low latency for real-time comms</li>
                <li className="flex items-start gap-2 text-sm text-gray-700 font-medium"><div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div> High availability of services</li>
                <li className="flex items-start gap-2 text-sm text-gray-700 font-medium"><div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div> Consistent localized performance</li>
                <li className="flex items-start gap-2 text-sm text-gray-700 font-medium"><div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div> Reliable critical connectivity</li>
              </ul>
            </Reveal>

            {/* Differentiation */}
            <Reveal delay={300} className="bg-[#14477B] text-white p-8 rounded-2xl shadow-xl">
              <Server className="w-8 h-8 text-[#0B79BF] mb-6" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">A Secure Sovereign Alternative</h3>
              <p className="text-sm text-blue-100 mb-6 leading-relaxed">Unlike widely used tools on global infrastructure, Bichuten provides a locally controlled alternative.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-white font-medium"><CheckCircle className="w-4 h-4 text-[#0B79BF] flex-shrink-0" /> Locally hosted systems</li>
                <li className="flex items-start gap-2 text-sm text-white font-medium"><CheckCircle className="w-4 h-4 text-[#0B79BF] flex-shrink-0" /> Full data sovereignty in Nepal</li>
                <li className="flex items-start gap-2 text-sm text-white font-medium"><CheckCircle className="w-4 h-4 text-[#0B79BF] flex-shrink-0" /> Integrated security controls</li>
                <li className="flex items-start gap-2 text-sm text-white font-medium"><CheckCircle className="w-4 h-4 text-[#0B79BF] flex-shrink-0" /> Unified platform infrastructure</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 11. TRANSITION SECTION ================= */}
      <section className="py-24 relative bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Explore the Platform Layers</h2>
              <p className="text-gray-600">The Communication Layer works in conjunction with other components of the Bichuten platform.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Infrastructure Layer", href: "/platform/infrastructure" },
              { title: "Identity and Access", href: "/platform/identity" },
              { title: "Security & Encryption", href: "/platform/security" },
              { title: "Compliance and Audit", href: "/platform/audit" }
            ].map((link, i) => (
              <Reveal key={i} delay={i * 100}>
                <a 
                  href={link.href} 
                  className="group block h-full bg-white border border-gray-200 shadow-sm p-6 text-center hover:border-[#0B79BF] hover:shadow-md transition-all duration-300 rounded"
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

export default CommunicationLayer;