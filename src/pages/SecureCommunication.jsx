import React, { useEffect, useRef, useState } from 'react';
import { 
  MessageSquare, Shield, Globe, Lock, CheckCircle, 
  AlertTriangle, ArrowRight, Video, Mail, Users, 
  Activity, Key, FileText, Server, MapPin, RefreshCw, Landmark, Building2, Wifi, Briefcase, Layers,
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

const SecureCommunication = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          @keyframes packetFlow {
            0% { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
          }
          .animate-packet {
            stroke-dasharray: 6 12;
            animation: packetFlow 1.5s linear infinite;
          }
          @keyframes pulseSoft {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          .animate-pulse-soft {
            animation: pulseSoft 4s ease-in-out infinite;
          }
          .dark-glass {
            background: rgba(4, 8, 20, 0.8);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
          .light-glass {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 1);
            box-shadow: 0 10px 30px rgba(20, 71, 123, 0.08);
          }
          @keyframes floatUI {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float-ui {
            animation: floatUI 6s ease-in-out infinite;
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION (Dark / Encrypted Theme) ================= */}
      <section className="relative pt-40 pb-32 min-h-[90vh] flex flex-col justify-center bg-[#040814] overflow-hidden">
        {/* Background Imagery */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2000&auto=format&fit=crop" 
            alt="Secure Enterprise Communication" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040814] via-[#040814]/80 to-[#14477B]/40"></div>
        </div>

        {/* Floating Encrypted Nodes */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#34A853]/20 rounded-full blur-[100px] z-0 animate-pulse-soft"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="max-w-2xl">
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-2 dark-glass rounded-full mb-8 border-[#34A853]/40 text-[#34A853]">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-widest uppercase">Solution 04: Secure Communication</span>
                </div>
              </Reveal>
              
              <Reveal delay={150}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bebas tracking-wide text-white mb-6 leading-[1]">
                  Communicate Securely. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] to-[#34A853]">
                    Stay in Control.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={300}>
                <p className="text-lg md:text-xl font-light text-blue-100/90 mb-6 leading-relaxed">
                  Bichuten enables organizations to operate email, messaging, file exchange, and collaboration systems within a secure, encrypted, and sovereign environment—without relying on external platforms.
                </p>
                <div className="inline-block border-l-4 border-[#34A853] pl-4 py-1 mb-10 bg-white/5 rounded-r">
                  <p className="text-sm font-bold text-gray-200 uppercase tracking-wider">
                    Designed for organizations where communication confidentiality, control, and compliance are critical.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={450}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group bg-[#34A853] text-[#040814] px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#2b8a44] shadow-[0_0_20px_rgba(52,168,83,0.4)] flex items-center justify-center gap-3 rounded">
                    Request a Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a href="/contact" className="dark-glass text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:border-white/30 hover:bg-white/10 rounded flex items-center justify-center">
                    Speak with an Expert
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Hero Visual: Chat/Comms Mockup UI */}
            <Reveal direction="left" delay={300} className="hidden lg:block relative h-[500px]">
              <div className="absolute inset-0 flex justify-center items-center">
                 {/* Messaging Window Mockup */}
                 <div className="relative w-full max-w-sm dark-glass rounded-2xl border border-[#34A853]/30 p-4 shadow-2xl animate-float-ui z-20">
                   {/* Header */}
                   <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-4">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="ml-auto flex items-center gap-2 bg-[#34A853]/20 text-[#34A853] px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                        <Lock className="w-3 h-3" /> E2E Encrypted
                      </div>
                   </div>
                   {/* Chat Bubbles */}
                   <div className="space-y-4">
                     <div className="flex gap-3 items-end">
                       <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                       <div className="bg-gray-800 text-gray-300 text-xs p-3 rounded-2xl rounded-bl-none max-w-[80%] border border-gray-700">Project specifications attached. Awaiting approval.</div>
                     </div>
                     <div className="flex gap-3 items-end flex-row-reverse">
                       <div className="w-8 h-8 rounded-full bg-[#14477B] flex items-center justify-center text-[10px] font-bold text-white">ME</div>
                       <div className="bg-[#0B79BF] text-white text-xs p-3 rounded-2xl rounded-br-none max-w-[80%] shadow-lg">Received securely. Decrypting now.</div>
                     </div>
                     <div className="flex gap-3 items-end">
                       <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                       <div className="bg-gray-800 text-gray-300 text-xs p-3 rounded-2xl rounded-bl-none flex items-center gap-2 border border-gray-700">
                         <div className="p-2 bg-gray-700 rounded"><FileText className="w-4 h-4 text-white"/></div>
                         <span>specs_q4_secure.pdf</span>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Floating Email Notification */}
                 <div className="absolute -left-12 top-20 dark-glass p-3 rounded-xl border border-white/10 shadow-xl z-30 animate-float-ui" style={{animationDelay: '1s'}}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#4285F4]/20 rounded-full"><Mail className="w-5 h-5 text-[#4285F4]"/></div>
                      <div>
                        <p className="text-white text-xs font-bold">Secure Mail Received</p>
                        <p className="text-gray-400 text-[10px]">Board of Directors</p>
                      </div>
                    </div>
                 </div>

              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 2 & 3. CHALLENGE VS NEED (Light Split Section) ================= */}
      <section className="py-24 relative bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* The Challenge (Red Warning Theme) */}
            <Reveal direction="right" className="bg-slate-50 p-10 rounded-2xl border border-red-100 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-0"></div>
              <Globe className="w-12 h-12 text-[#EA4335] mb-6 relative z-10" />
              <h2 className="text-3xl font-bebas text-gray-900 tracking-wide mb-4 relative z-10">The Risks of External Platforms</h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed relative z-10">
                Modern organizations depend on multiple communication tools for daily operations. However, most of these platforms are hosted externally, introducing significant risks:
              </p>
              <ul className="space-y-4 mb-8 relative z-10">
                {[
                  "Data stored outside organizational control",
                  "Exposure to foreign jurisdictions and policies",
                  "Limited visibility into data access and usage",
                  "Increased risk of data leakage and unauthorized access",
                  "Severe challenges in meeting compliance and audit demands"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                    <AlertTriangle className="w-5 h-5 text-[#EA4335] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-red-50 text-red-900 rounded text-sm font-medium border border-red-100 relative z-10">
                As communication becomes central to operations, these risks directly impact security, governance, and trust.
              </div>
            </Reveal>

            {/* The Need (Blue Secure Theme) */}
            <Reveal direction="left" delay={150} className="bg-[#14477B] text-white p-10 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0B79BF]/30 rounded-full blur-[60px] -z-0"></div>
              <Shield className="w-12 h-12 text-[#0B79BF] mb-6 relative z-10" />
              <h2 className="text-3xl font-bebas text-white tracking-wide mb-4 relative z-10">From Convenience to Control</h2>
              <p className="text-sm text-blue-100 mb-6 leading-relaxed relative z-10">
                Organizations must move beyond convenience-driven public communication tools and adopt secure, internal systems that provide:
              </p>
              <ul className="space-y-4 mb-8 relative z-10">
                {[
                  "Absolute full control over all communication data",
                  "Secure and uncompromisingly encrypted channels",
                  "Strict compliance with national regulatory requirements",
                  "100% traceability and auditability of interactions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white font-medium">
                    <CheckCircle className="w-5 h-5 text-[#34A853] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-xl font-bebas tracking-widest text-[#34A853] relative z-10">
                Secure communication is no longer optional—it is essential.
              </h3>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 4 & 5. THE BICHUTEN SOLUTION & HOW IT WORKS (Animated Flow) ================= */}
      <section className="py-24 bg-slate-50 relative overflow-hidden border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">A Fully Controlled Communication Environment</h2>
              <p className="text-gray-600 text-lg">
                Bichuten delivers a secure communication solution that integrates email, messaging, file exchange, and collaboration tools within a unified and locally hosted infrastructure.
              </p>
            </Reveal>
          </div>

          {/* SVG Animated Flow Diagram: The Closed Ecosystem */}
          <Reveal delay={200} className="relative max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-center font-bold text-gray-500 uppercase tracking-widest text-sm mb-12">Secure Ecosystem Flow</h3>
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 z-10">
               
               {/* 1. User & Auth */}
               <div className="flex flex-col items-center w-full md:w-1/4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-[#4285F4] flex items-center justify-center mb-4 z-10">
                    <Key className="w-8 h-8 text-[#4285F4]" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">1. Authenticate</h4>
                  <p className="text-xs text-center text-gray-500 mt-1">Identity Layer verified</p>
               </div>

               {/* Connecting Line */}
               <svg className="hidden md:block absolute top-8 left-[15%] w-[70%] h-8 overflow-visible z-0 pointer-events-none">
                  <path d="M 0 0 L 100 0" fill="none" stroke="#0B79BF" strokeWidth="2" className="animate-packet" />
               </svg>

               {/* 2. Encryption Engine */}
               <div className="flex flex-col items-center w-full md:w-1/4">
                  <div className="w-16 h-16 rounded-full bg-[#14477B] border-4 border-[#0B79BF] flex items-center justify-center mb-4 z-10 shadow-[0_0_20px_rgba(11,121,191,0.3)]">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">2. Encrypt</h4>
                  <p className="text-xs text-center text-gray-500 mt-1">End-to-End protection</p>
               </div>

               {/* 3. Transmit */}
               <div className="flex flex-col items-center w-full md:w-1/4">
                  <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-[#34A853] flex items-center justify-center mb-4 z-10">
                    <Activity className="w-8 h-8 text-[#34A853]" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">3. Transmit & Monitor</h4>
                  <p className="text-xs text-center text-gray-500 mt-1">Audit logs & tracking</p>
               </div>

               {/* 4. Secure Storage */}
               <div className="flex flex-col items-center w-full md:w-1/4">
                  <div className="w-16 h-16 rounded-full bg-yellow-50 border-2 border-[#FBBC05] flex items-center justify-center mb-4 z-10">
                    <Server className="w-8 h-8 text-[#FBBC05]" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">4. Vault</h4>
                  <p className="text-xs text-center text-gray-500 mt-1">Stored in jurisdiction</p>
               </div>

            </div>

            <div className="mt-12 p-4 bg-[#34A853]/10 border border-[#34A853]/30 rounded-lg text-center text-sm font-bold text-[#2b8a44] uppercase tracking-wider">
               Outcome: Every communication is secure, traceable, and governed by policy.
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 6. KEY CAPABILITIES (UI Mockup Cards) ================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-16 text-center">
              Integrated Communication Systems
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Email Mockup */}
            <Reveal delay={0} className="light-glass rounded-2xl border border-gray-200 overflow-hidden flex flex-col group hover:border-[#14477B] hover:shadow-xl transition-all">
              <div className="h-48 bg-slate-100 p-6 relative overflow-hidden border-b border-gray-200">
                 {/* Email App UI */}
                 <div className="w-full bg-white rounded-md shadow p-3 border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex gap-2 items-center"><div className="w-5 h-5 rounded-full bg-blue-100 text-[#14477B] flex justify-center items-center text-[8px] font-bold">HR</div> <span className="text-[10px] font-bold text-gray-700">HR Dept</span></div>
                      <Lock className="w-3 h-3 text-[#34A853]"/>
                    </div>
                    <div className="h-2 w-3/4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 w-1/2 bg-gray-100 rounded"></div>
                 </div>
                 <div className="w-full bg-white/50 rounded-md shadow-sm p-3 border border-gray-200 mt-2 opacity-50 transform translate-y-1">
                    <div className="h-2 w-1/2 bg-gray-200 rounded mb-2"></div>
                 </div>
              </div>
              <div className="p-8 flex-grow bg-white">
                <Mail className="w-8 h-8 text-[#14477B] mb-4" />
                <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-3">Secure Sovereign Email</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">A locally hosted email system designed for confidential and highly regulated corporate communication.</p>
                <ul className="space-y-2 text-xs font-bold text-gray-700 mt-auto uppercase tracking-wide">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> End-to-end encryption</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Local data residency</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Controlled access & audit logs</li>
                </ul>
              </div>
            </Reveal>

            {/* Messaging Mockup */}
            <Reveal delay={150} className="light-glass rounded-2xl border border-gray-200 overflow-hidden flex flex-col group hover:border-[#0B79BF] hover:shadow-xl transition-all">
              <div className="h-48 bg-blue-50 p-6 relative overflow-hidden border-b border-blue-100 flex flex-col justify-end">
                 {/* Chat App UI */}
                 <div className="bg-white border border-gray-200 p-2 rounded-xl rounded-bl-none w-2/3 mb-2 shadow-sm"><div className="h-2 w-full bg-gray-200 rounded mb-1"></div><div className="h-2 w-1/2 bg-gray-200 rounded"></div></div>
                 <div className="bg-[#0B79BF] border border-[#0B79BF] p-2 rounded-xl rounded-br-none w-3/4 self-end shadow-md"><div className="h-2 w-full bg-blue-200 rounded mb-1"></div><div className="h-2 w-2/3 bg-blue-200 rounded"></div></div>
              </div>
              <div className="p-8 flex-grow bg-white">
                <MessageSquare className="w-8 h-8 text-[#0B79BF] mb-4" />
                <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-3">Messaging & File Exchange</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">A real-time communication platform built for secure data sharing and instant internal collaboration.</p>
                <ul className="space-y-2 text-xs font-bold text-gray-700 mt-auto uppercase tracking-wide">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Encrypted messaging channels</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Controlled file sharing</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Activity tracking & monitoring</li>
                </ul>
              </div>
            </Reveal>

            {/* Video Mockup */}
            <Reveal delay={300} className="light-glass rounded-2xl border border-gray-200 overflow-hidden flex flex-col group hover:border-[#34A853] hover:shadow-xl transition-all">
              <div className="h-48 bg-gray-900 p-4 relative overflow-hidden border-b border-gray-800 grid grid-cols-2 gap-2">
                 {/* Video Grid UI */}
                 <div className="bg-gray-800 rounded relative"><div className="absolute bottom-1 left-1 w-4 h-1 bg-gray-600 rounded"></div></div>
                 <div className="bg-gray-800 rounded relative border border-[#34A853]"><div className="absolute top-1 right-1 w-2 h-2 bg-[#34A853] rounded-full"></div></div>
                 <div className="bg-gray-800 rounded col-span-2 flex items-center justify-center gap-3">
                   <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center"><div className="w-3 h-0.5 bg-red-500 rotate-45"></div></div>
                   <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                 </div>
              </div>
              <div className="p-8 flex-grow bg-white">
                <Video className="w-8 h-8 text-[#34A853] mb-4" />
                <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-3">Encrypted Video Collaboration</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">Secure tools for board meetings, confidential discussions, and enterprise team collaboration.</p>
                <ul className="space-y-2 text-xs font-bold text-gray-700 mt-auto uppercase tracking-wide">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Encrypted voice & video</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Secure meeting environments</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> No external dependencies</li>
                </ul>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 7. BUSINESS BENEFITS (Masonry/Grid Style) ================= */}
      <section className="py-24 bg-slate-50 relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Operational and Security Advantages</h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: "Data Control", desc: "Communication data stays within your jurisdiction.", color: "text-[#14477B]" },
              { title: "Enhanced Security", desc: "Encryption protects against data leakage.", color: "text-[#34A853]" },
              { title: "Regulatory Compliance", desc: "Aligned with audit and governance rules.", color: "text-[#FBBC05]" },
              { title: "Reduced Dependency", desc: "Eliminate reliance on foreign platforms.", color: "text-[#EA4335]" },
              { title: "Improved Trust", desc: "Strengthens confidence among stakeholders.", color: "text-[#4285F4]" },
            ].map((benefit, i) => (
              <Reveal key={i} delay={i * 100} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[#14477B] transition-colors text-center flex flex-col items-center">
                <CheckCircle className={`w-8 h-8 ${benefit.color} mb-4`} />
                <h3 className="text-sm font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-xs text-gray-600">{benefit.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 8. INDUSTRY USE CASES (Bento Box) ================= */}
      <section className="py-24 bg-white relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-16 text-center">Secure Communication Across Industries</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Landmark, title: "Banking & Finance", items: ["Confidential financial comms", "Secure sharing of sensitive data", "Compliance with banking regs"] },
              { icon: Building2, title: "Gov & Public Sector", items: ["Secure internal communication", "Confidential handling of citizen data", "Controlled collaboration systems"] },
              { icon: Wifi, title: "Telecom & ISPs", items: ["Secure operational communication", "Data protection for network mgmt", "Controlled information exchange"] },
              { icon: Briefcase, title: "Enterprise Orgs", items: ["Secure corporate messaging", "Protected file sharing", "Controlled board-level meetings"] }
            ].map((industry, i) => (
              <Reveal key={i} delay={i * 100} className="bg-slate-50 p-8 rounded-2xl flex flex-col group border border-gray-200 hover:border-[#14477B] shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all">
                <industry.icon className="w-10 h-10 text-[#0B79BF] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bebas text-2xl tracking-wider text-gray-900 mb-4">{industry.title}</h3>
                <ul className="space-y-2 text-sm text-gray-600 flex-grow">
                  {industry.items.map((item, j) => (
                     <li key={j} className="flex items-start gap-2">
                       <div className="mt-1.5 w-1 h-1 bg-[#14477B] rounded-full flex-shrink-0"></div> {item}
                     </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 9, 10, 11. INTEGRATION, SOVEREIGNTY, DIFFERENTIATION (Dark & Light Split) ================= */}
      <section className="py-0 flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Differentiation & Sovereignty (Light Left Side) */}
        <div className="w-full lg:w-1/2 bg-blue-50 p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
          <Reveal className="relative z-10">
            <Globe className="w-10 h-10 text-[#14477B] mb-6" />
            <h2 className="text-4xl font-bebas text-[#14477B] tracking-wide mb-6">Beyond Conventional Tools</h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
              Unlike commonly used communication platforms hosted globally, Bichuten provides a legally sovereign and fully integrated alternative designed for secure environments within Nepal.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-sm text-gray-800 font-medium"><div className="w-2 h-2 rounded-full bg-[#14477B]"/> Sovereign hosting entirely within Nepal</li>
              <li className="flex items-center gap-4 text-sm text-gray-800 font-medium"><div className="w-2 h-2 rounded-full bg-[#14477B]"/> Reduced exposure to foreign regulatory risks</li>
              <li className="flex items-center gap-4 text-sm text-gray-800 font-medium"><div className="w-2 h-2 rounded-full bg-[#14477B]"/> Compliance-ready communication systems</li>
            </ul>
          </Reveal>
        </div>

        {/* Integration (Dark Right Side) */}
        <div className="w-full lg:w-1/2 bg-[#040814] p-12 lg:p-24 flex flex-col justify-center relative shadow-xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <Reveal className="relative z-10" delay={200}>
            <Layers className="w-10 h-10 text-[#0B79BF] mb-6" />
            <h2 className="text-4xl font-bebas text-white tracking-wide mb-6">Integrated with Core Security</h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-sm">
              The Secure Communication Solution is tightly integrated with other platform layers to ensure consistent, unbreakable governance across your organization.
            </p>
            <div className="space-y-4">
               {[
                 { name: "Identity Layer", desc: "For authentication & access control", color: "text-[#4285F4]" },
                 { name: "Security Layer", desc: "For end-to-end encryption & protection", color: "text-[#EA4335]" },
                 { name: "Compliance Layer", desc: "For activity monitoring & audit logs", color: "text-[#FBBC05]" },
                 { name: "Infrastructure Layer", desc: "For high availability & performance", color: "text-[#34A853]" }
               ].map((layer, i) => (
                 <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded shadow-sm border border-white/10">
                   <Shield className={`w-5 h-5 ${layer.color} flex-shrink-0`} />
                   <span className="text-sm text-gray-300"><strong>{layer.name}</strong> - {layer.desc}</span>
                 </div>
               ))}
            </div>
          </Reveal>
        </div>

      </section>

      {/* ================= 12. STRATEGIC IMPACT (Before vs After Concept) ================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            <Reveal direction="up" className="bg-slate-50 p-10 rounded-2xl border border-gray-200 border-t-4 border-t-gray-400">
              <h3 className="text-2xl font-bebas text-gray-500 tracking-wider mb-4">External Dependency</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-gray-500"><AlertTriangle className="w-5 h-5 text-gray-400 mt-0.5"/> Data exposed to third-party providers</li>
                <li className="flex items-start gap-3 text-sm text-gray-500"><AlertTriangle className="w-5 h-5 text-gray-400 mt-0.5"/> Weak governance and poor oversight</li>
                <li className="flex items-start gap-3 text-sm text-gray-500"><AlertTriangle className="w-5 h-5 text-gray-400 mt-0.5"/> Non-compliant with strict local laws</li>
              </ul>
            </Reveal>

            <Reveal direction="up" delay={150} className="bg-[#14477B] text-white p-10 rounded-2xl shadow-xl border-t-4 border-t-[#0B79BF]">
              <h3 className="text-2xl font-bebas tracking-wider mb-4">Controlled Sovereign Communication</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-blue-100"><CheckCircle className="w-5 h-5 text-[#34A853] mt-0.5"/> Absolute protection of sensitive information</li>
                <li className="flex items-start gap-3 text-sm text-blue-100"><CheckCircle className="w-5 h-5 text-[#34A853] mt-0.5"/> Complete governance, auditability, and oversight</li>
                <li className="flex items-start gap-3 text-sm text-blue-100"><CheckCircle className="w-5 h-5 text-[#34A853] mt-0.5"/> Uncompromised operational security and trust</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

     

    </div>
  );
};

export default SecureCommunication;