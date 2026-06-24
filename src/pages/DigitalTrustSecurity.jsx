import React, { useEffect, useRef, useState } from 'react';
import { 
  ShieldCheck, FileSignature, Database, Lock, Key, 
  CheckCircle, AlertTriangle, ArrowRight, UserCheck, 
  Eye, FileText, Server, Building2, Landmark, Scale,
  Briefcase, Activity, Shield,Layers
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

const DigitalTrustSecurity = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          @keyframes drawSignature {
            0% { stroke-dashoffset: 100; opacity: 0; }
            50% { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          .animate-signature {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: drawSignature 3s ease-in-out infinite alternate;
          }
          @keyframes popBadge {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-badge {
            animation: popBadge 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
          @keyframes trustFlow {
            100% { stroke-dashoffset: -100; }
          }
          .animate-trust-flow {
            stroke-dasharray: 6 6;
            animation: trustFlow 1.5s linear infinite;
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
        `}
      </style>

      {/* ================= 1. HERO SECTION (Dark/Trusted Theme) ================= */}
      <section className="relative pt-40 pb-32 min-h-[90vh] flex flex-col justify-center bg-[#040814] overflow-hidden">
        {/* Background Imagery */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2000&auto=format&fit=crop" 
            alt="Digital Trust and Security" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/80 to-[#14477B]/40"></div>
        </div>

        {/* Abstract Verification Rings */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] border border-[#0B79BF]/10 rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite] pointer-events-none">
          <div className="w-[400px] h-[400px] border border-[#34A853]/20 rounded-full flex items-center justify-center">
             <div className="w-[200px] h-[200px] bg-[#0B79BF]/10 rounded-full blur-[50px]"></div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 dark-glass rounded-full mb-8 border-[#0B79BF]/40 text-[#0B79BF]">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Solution 05: Digital Trust & Security</span>
            </div>
          </Reveal>
          
          <Reveal delay={150}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-white mb-6 leading-[0.9]">
              Build Trust into <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] via-blue-400 to-[#34A853]">
                Every Digital Interaction
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-xl font-light text-blue-100/90 mb-6 leading-relaxed max-w-3xl mx-auto">
              Bichuten enables organizations to secure data, verify identities, and establish trusted digital workflows through integrated storage, encryption, and authentication systems.
            </p>
            <div className="inline-block border-l-4 border-[#34A853] pl-4 py-1 mb-10 bg-white/5 rounded-r">
              <p className="text-sm font-bold text-gray-200 uppercase tracking-wider">
                Designed for environments where data integrity, authenticity, and trust are essential.
              </p>
            </div>
          </Reveal>

          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="group bg-[#0B79BF] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#14477B] shadow-[0_0_20px_rgba(11,121,191,0.4)] flex items-center justify-center gap-3 rounded">
                Request Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="/contact" className="dark-glass text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:border-white/30 hover:bg-white/10 rounded flex items-center justify-center">
                Speak with an Expert
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 2 & 3. CHALLENGE VS NEED (Light Corporate Split) ================= */}
      <section className="py-24 relative bg-slate-50 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* The Challenge (Red Warning Theme) */}
            <Reveal direction="right" className="bg-white p-10 rounded-2xl border border-red-100 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-0"></div>
              <AlertTriangle className="w-12 h-12 text-[#EA4335] mb-6 relative z-10" />
              <h2 className="text-3xl font-bebas text-gray-900 tracking-wide mb-4 relative z-10">The Growing Need for Digital Trust</h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed relative z-10">
                As organizations digitize operations, the need to ensure trust in data, documents, and interactions becomes critical. Without a structured framework, digital systems face severe risks:
              </p>
              <ul className="space-y-4 mb-8 relative z-10">
                {[
                  "Inability to ensure the authenticity of digital documents",
                  "Vulnerability of sensitive data to unauthorized access",
                  "Weak verification of identities in digital transactions",
                  "Compromised integrity of stored information",
                  "Unmanaged access to critical enterprise assets"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                    <div className="w-1.5 h-1.5 bg-[#EA4335] rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-red-50 text-red-900 rounded text-sm font-medium border border-red-100 relative z-10">
                These risks lead directly to fraud, data manipulation, and catastrophic loss of confidence.
              </div>
            </Reveal>

            {/* The Need (Blue/Green Trust Theme) */}
            <Reveal direction="left" delay={150} className="bg-[#14477B] text-white p-10 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#34A853]/20 rounded-full blur-[60px] -z-0"></div>
              <ShieldCheck className="w-12 h-12 text-[#34A853] mb-6 relative z-10" />
              <h2 className="text-3xl font-bebas text-white tracking-wide mb-4 relative z-10">From Data Security to Trusted Ecosystems</h2>
              <p className="text-sm text-blue-100 mb-6 leading-relaxed relative z-10">
                Organizations require more than basic perimeter security—they need robust, integrated systems that definitively ensure:
              </p>
              <ul className="space-y-4 mb-8 relative z-10">
                {[
                  "Absolute data integrity and verified authenticity",
                  "Mathematically verified and trusted interactions",
                  "Secure immutable storage with strictly controlled access",
                  "Indisputable traceability and accountability"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white font-medium">
                    <CheckCircle className="w-5 h-5 text-[#34A853] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-white/10 text-white rounded text-sm font-medium border border-white/20 relative z-10">
                Digital trust is essential for enabling secure transactions, regulatory compliance, and long-term reliability.
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 4 & 5. THE SOLUTION & HOW IT WORKS (Animated Flow) ================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-10"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">A Unified Framework for Security & Trust</h2>
              <p className="text-gray-600 text-lg">
                Bichuten delivers a comprehensive digital trust solution that combines secure storage, identity verification, encryption, and authentication into a unified system.
              </p>
            </Reveal>
          </div>

          {/* SVG Animated Flow Diagram: Digital Verification Flow */}
          <Reveal delay={200} className="relative max-w-5xl mx-auto bg-slate-50 p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-center font-bold text-[#0B79BF] uppercase tracking-widest text-sm mb-12">Securing and Verifying Digital Assets</h3>
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 z-10">
               
               {/* 1. Identity */}
               <div className="flex flex-col items-center w-full md:w-1/4 relative">
                  <div className="w-16 h-16 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center mb-4 z-10 relative">
                    <UserCheck className="w-8 h-8 text-[#4285F4]" />
                    {/* Tiny auth success badge */}
                    <div className="absolute -bottom-2 -right-2 bg-[#34A853] rounded-full p-1 border-2 border-white">
                       <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">1. Identity</h4>
                  <p className="text-xs text-center text-gray-500 mt-1">Access controlled & verified</p>
               </div>

               {/* Connecting Line */}
               <svg className="hidden md:block absolute top-8 left-[15%] w-[70%] h-8 overflow-visible z-0 pointer-events-none">
                  <path d="M 0 0 L 100 0" fill="none" stroke="#0B79BF" strokeWidth="2" className="animate-trust-flow opacity-40" />
               </svg>

               {/* 2. Sign & Verify */}
               <div className="flex flex-col items-center w-full md:w-1/4">
                  <div className="w-16 h-16 rounded-full bg-[#14477B] border-4 border-[#0B79BF] flex items-center justify-center mb-4 z-10 shadow-lg relative">
                    <FileSignature className="w-8 h-8 text-white" />
                    {/* Animated drawing line over icon */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                       <path d="M 20 40 Q 30 30 40 50 T 60 20" fill="none" stroke="#34A853" strokeWidth="3" strokeLinecap="round" className="animate-signature" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">2. Sign & Verify</h4>
                  <p className="text-xs text-center text-gray-500 mt-1">Documents digitally signed</p>
               </div>

               {/* 3. Audit Log */}
               <div className="flex flex-col items-center w-full md:w-1/4">
                  <div className="w-16 h-16 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center mb-4 z-10">
                    <Activity className="w-8 h-8 text-[#FBBC05]" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">3. Traceability</h4>
                  <p className="text-xs text-center text-gray-500 mt-1">Interactions logged</p>
               </div>

               {/* 4. Secure Vault */}
               <div className="flex flex-col items-center w-full md:w-1/4">
                  <div className="w-16 h-16 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center mb-4 z-10 relative">
                    <Database className="w-8 h-8 text-[#34A853]" />
                    <div className="absolute inset-0 border-2 border-[#34A853]/50 rounded-full animate-pulse"></div>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">4. Secure Vault</h4>
                  <p className="text-xs text-center text-gray-500 mt-1">Data securely stored</p>
               </div>

            </div>

            <div className="mt-12 text-center">
              <span className="inline-block bg-[#14477B] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                Outcome: Every digital asset and interaction is secure, authentic, and verifiable.
              </span>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 6. KEY CAPABILITIES (UI Mockups & Bento Grid) ================= */}
      <section className="py-24 bg-[#040814] relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bebas text-center text-white tracking-wide mb-16">
              Core Components of Digital Trust
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            
            {/* Secure Document Vault (with Mockup) */}
            <Reveal delay={0} className="dark-glass rounded-2xl border-t-4 border-t-[#0B79BF] overflow-hidden flex flex-col group">
              <div className="h-48 bg-[#0a1426] p-6 relative overflow-hidden border-b border-white/10 flex justify-center items-center">
                 {/* Vault UI Mockup */}
                 <div className="relative w-48 h-32">
                    {/* Layered blocks simulating encrypted storage */}
                    <div className="absolute top-4 left-4 right-0 bottom-0 bg-gray-800 rounded border border-gray-600 opacity-30 transform group-hover:translate-x-2 transition-transform"></div>
                    <div className="absolute top-2 left-2 right-2 bottom-2 bg-gray-800 rounded border border-gray-500 opacity-60 transform group-hover:translate-x-1 transition-transform"></div>
                    <div className="absolute inset-0 bg-[#060d1a] rounded border border-[#0B79BF] flex flex-col items-center justify-center shadow-lg">
                       <Lock className="w-8 h-8 text-[#0B79BF] mb-2" />
                       <div className="h-1.5 w-1/2 bg-gray-700 rounded mb-1"></div>
                       <div className="h-1.5 w-1/3 bg-gray-700 rounded"></div>
                    </div>
                 </div>
              </div>
              <div className="p-8 flex-grow">
                <Database className="w-8 h-8 text-[#0B79BF] mb-4" />
                <h3 className="text-2xl font-bebas text-white tracking-wider mb-3">Secure Document Vault</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">A protected, sovereign environment for storing sensitive and critical organizational data.</p>
                <ul className="space-y-2 text-xs font-bold text-gray-300 mt-auto uppercase tracking-wide">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Encrypted & tamper-proof storage</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Controlled access & permissions</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Immutable audit trails</li>
                </ul>
              </div>
            </Reveal>

            {/* Digital Signature & Attestation (with Mockup) */}
            <Reveal delay={150} className="dark-glass rounded-2xl border-t-4 border-t-[#34A853] overflow-hidden flex flex-col group">
              <div className="h-48 bg-[#0a1426] p-6 relative overflow-hidden border-b border-white/10 flex justify-center items-center">
                 {/* Signature Verification UI */}
                 <div className="bg-white rounded p-4 w-48 shadow-lg relative transform group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="h-2 w-3/4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                    <div className="h-2 w-5/6 bg-gray-100 rounded mb-4"></div>
                    <div className="border-t border-dashed border-gray-300 pt-2 flex justify-between items-center">
                       <div className="text-[8px] text-gray-400 font-mono">Sign: 0x9A...</div>
                       {/* Animated Verified Badge */}
                       <div className="bg-green-100 text-green-700 px-1 py-0.5 rounded text-[8px] font-bold flex items-center gap-1 opacity-0 group-hover:animate-badge" style={{animationFillMode: 'forwards'}}>
                         <CheckCircle className="w-2 h-2" /> Verified
                       </div>
                    </div>
                 </div>
              </div>
              <div className="p-8 flex-grow">
                <FileSignature className="w-8 h-8 text-[#34A853] mb-4" />
                <h3 className="text-2xl font-bebas text-white tracking-wider mb-3">Digital Signature & Attestation</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">Systems for cryptographically verifying the authenticity and integrity of digital documents.</p>
                <ul className="space-y-2 text-xs font-bold text-gray-300 mt-auto uppercase tracking-wide">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full"></div> Secure digital signatures</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full"></div> Document validation & verification</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full"></div> Trusted digital workflows</li>
                </ul>
              </div>
            </Reveal>

          </div>

          {/* Lower Row (Identity & Encryption) */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal delay={0} className="dark-glass p-8 rounded-2xl flex flex-col group border border-white/5 hover:border-[#4285F4]/50 transition-colors">
              <UserCheck className="w-8 h-8 text-[#4285F4] mb-4 group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-3">Identity-Based Access Control</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-grow">Ensures that only strictly authorized and verified users can access sensitive data.</p>
              <ul className="space-y-2 text-xs font-bold text-gray-300 mt-auto uppercase tracking-wide">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#4285F4] rounded-full"></div> Role-based access controls</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#4285F4] rounded-full"></div> Multi-factor authentication</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#4285F4] rounded-full"></div> Identity verification mechanisms</li>
              </ul>
            </Reveal>

            <Reveal delay={150} className="dark-glass p-8 rounded-2xl flex flex-col group border border-white/5 hover:border-[#EA4335]/50 transition-colors">
              <Key className="w-8 h-8 text-[#EA4335] mb-4 group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-3">Key Management & Encryption</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-grow">Protects critical data through secure, centrally managed cryptographic systems.</p>
              <ul className="space-y-2 text-xs font-bold text-gray-300 mt-auto uppercase tracking-wide">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#EA4335] rounded-full"></div> Encryption of stored & transmitted data</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#EA4335] rounded-full"></div> Secure key lifecycle management</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#EA4335] rounded-full"></div> Hardware-based security mechanisms</li>
              </ul>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ================= 7. BUSINESS BENEFITS (Light Corporate Grid) ================= */}
      <section className="py-24 bg-slate-50 relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Strengthening Trust & Security</h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: "Data Integrity", desc: "Ensures data remains accurate, consistent, and protected from tampering.", color: "text-[#0B79BF]" },
              { title: "Verified Interactions", desc: "All digital transactions and communications are authenticated and traceable.", color: "text-[#34A853]" },
              { title: "Enhanced Security", desc: "Strong encryption and access controls protect sensitive organizational assets.", color: "text-[#EA4335]" },
              { title: "Regulatory Compliance", desc: "Supports strict governance, audit, and compliance requirements continuously.", color: "text-[#FBBC05]" },
              { title: "Stakeholder Confidence", desc: "Builds unshakeable trust among customers, partners, and critical regulators.", color: "text-[#14477B]" },
            ].map((benefit, i) => (
              <Reveal key={i} delay={i * 100} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[#14477B] hover:shadow-md transition-all text-center flex flex-col items-center">
                <CheckCircle className={`w-8 h-8 ${benefit.color} mb-4`} />
                <h3 className="text-sm font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{benefit.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 8. INDUSTRY USE CASES (Elegant Hover Cards) ================= */}
      <section className="py-24 bg-white relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-16 text-center">Digital Trust Across Critical Sectors</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Landmark, title: "Banking & Finance", items: ["Secure financial transactions", "Document verification & auth", "Protection of sensitive data"] },
              { icon: Building2, title: "Gov & Public Sector", items: ["Citizen identity verification", "Secure document management", "Trusted digital services"] },
              { icon: Scale, title: "Legal & Compliance", items: ["Document authenticity/validation", "Secure storage of legal records", "Audit-ready documentation"] },
              { icon: Briefcase, title: "Enterprise Orgs", items: ["Secure internal data mgmt", "Controlled access to info", "Trusted collaboration workflows"] }
            ].map((industry, i) => (
              <Reveal key={i} delay={i * 100} className="light-glass p-8 rounded-2xl flex flex-col group border-t-4 border-[#14477B] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
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

      {/* ================= 9 & 10. INTEGRATION & SOVEREIGNTY (Split Dark Theme) ================= */}
      <section className="py-0 flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Integration */}
        <div className="w-full lg:w-1/2 bg-[#040814] p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <Reveal className="relative z-10">
            <Layers className="w-10 h-10 text-[#0B79BF] mb-6" />
            <h2 className="text-4xl font-bebas text-white tracking-wide mb-6">Trust Built Across All Layers</h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-sm">
              The Digital Trust Solution seamlessly integrates directly with the Bichuten platform to ensure consistent, unbroken security and governance.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-sm text-gray-300"><div className="p-2 bg-white/5 rounded text-[#34A853]"><Server className="w-4 h-4"/></div> <strong>Infrastructure</strong> for secure storage</li>
              <li className="flex items-center gap-4 text-sm text-gray-300"><div className="p-2 bg-white/5 rounded text-[#4285F4]"><UserCheck className="w-4 h-4"/></div> <strong>Identity Layer</strong> for authentication</li>
              <li className="flex items-center gap-4 text-sm text-gray-300"><div className="p-2 bg-white/5 rounded text-[#EA4335]"><Shield className="w-4 h-4"/></div> <strong>Security Layer</strong> for encryption</li>
              <li className="flex items-center gap-4 text-sm text-gray-300"><div className="p-2 bg-white/5 rounded text-[#FBBC05]"><FileText className="w-4 h-4"/></div> <strong>Compliance</strong> for monitoring</li>
            </ul>
          </Reveal>
        </div>

        {/* Sovereignty */}
        <div className="w-full lg:w-1/2 bg-[#14477B] p-12 lg:p-24 flex flex-col justify-center relative shadow-xl">
          <Reveal className="relative z-10" delay={200}>
            <ShieldCheck className="w-10 h-10 text-white mb-6" />
            <h2 className="text-4xl font-bebas text-white tracking-wide mb-6">Trust Anchored Within Nepal</h2>
            <p className="text-blue-100 mb-8 leading-relaxed text-sm">
              All data and digital trust mechanisms operate strictly within Nepal’s jurisdiction, ensuring absolute control, legal certainty, and regulatory alignment.
            </p>
            <div className="space-y-4">
               {[
                 "Data residency guaranteed within Nepal",
                 "Eliminated exposure to external legal risks",
                 "Total alignment with national data policies",
                 "Complete sovereignty over digital trust systems"
               ].map((adv, i) => (
                 <div key={i} className="flex items-center gap-3 bg-white/10 p-3 rounded shadow-sm border border-white/20">
                   <CheckCircle className="w-5 h-5 text-[#34A853] flex-shrink-0" />
                   <span className="text-sm font-bold text-white">{adv}</span>
                 </div>
               ))}
            </div>
          </Reveal>
        </div>

      </section>

      {/* ================= 11 & 12. DIFFERENTIATION & STRATEGIC IMPACT (Light Corporate) ================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            <Reveal direction="up" className="light-glass p-10 rounded-2xl border-t-4 border-t-[#0B79BF]">
              <h3 className="text-2xl font-bebas text-gray-900 tracking-wider mb-4">Beyond Basic Data Security</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Traditional systems focus merely on protecting data at rest. Bichuten goes further by enabling verifiable trust in every single interaction.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-700 font-medium"><CheckCircle className="w-4 h-4 text-[#0B79BF] mt-0.5"/> Integrated digital trust framework</li>
                <li className="flex items-start gap-2 text-sm text-gray-700 font-medium"><CheckCircle className="w-4 h-4 text-[#0B79BF] mt-0.5"/> Secure document vault & signatures</li>
                <li className="flex items-start gap-2 text-sm text-gray-700 font-medium"><CheckCircle className="w-4 h-4 text-[#0B79BF] mt-0.5"/> Identity-driven access control architecture</li>
              </ul>
            </Reveal>

            <Reveal direction="up" delay={150} className="bg-slate-50 border border-gray-200 p-10 rounded-2xl shadow-sm border-t-4 border-t-[#34A853]">
              <h3 className="text-2xl font-bebas tracking-wider text-gray-900 mb-4">From Protection to Digital Trust</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                By adopting a comprehensive digital trust framework, organizations fundamentally upgrade their operational reliability.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-700 font-medium"><CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5"/> Enable mathematically trusted transactions</li>
                <li className="flex items-start gap-2 text-sm text-gray-700 font-medium"><CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5"/> Improve overall compliance and governance</li>
                <li className="flex items-start gap-2 text-sm text-gray-700 font-medium"><CheckCircle className="w-4 h-4 text-[#34A853] mt-0.5"/> Build long-term stakeholder confidence</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

    

    </div>
  );
};

export default DigitalTrustSecurity;