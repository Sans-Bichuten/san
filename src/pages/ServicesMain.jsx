import React, { useEffect, useRef, useState } from 'react';
import { 
  Server, ShieldCheck, MessageSquare, Database, Activity, 
  ArrowRight, CheckCircle, Layers, Settings, Globe, Lock, 
  FileSearch, CreditCard, Building2, Cpu, FileSignature, AlertTriangle
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

const ServicesMain = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          @keyframes drawPath {
            0% { stroke-dashoffset: 1000; }
            100% { stroke-dashoffset: 0; }
          }
          .animate-draw-path {
            stroke-dasharray: 10 10;
            animation: drawPath 40s linear infinite;
          }
          @keyframes floatIcon {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float-icon {
            animation: floatIcon 4s ease-in-out infinite;
          }
          .dark-glass {
            background: rgba(4, 8, 20, 0.7);
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
          /* Isometric Stack */
          .iso-stack-container { perspective: 1000px; transform-style: preserve-3d; }
          .iso-layer {
            transform: rotateX(60deg) rotateZ(-45deg);
            transition: all 0.5s ease;
          }
          .iso-container:hover .iso-layer-1 { transform: rotateX(60deg) rotateZ(-45deg) translateZ(120px); }
          .iso-container:hover .iso-layer-2 { transform: rotateX(60deg) rotateZ(-45deg) translateZ(60px); }
          .iso-container:hover .iso-layer-3 { transform: rotateX(60deg) rotateZ(-45deg) translateZ(0px); }
        `}
      </style>

      {/* ================= 1. HERO SECTION (Dark Corporate Theme) ================= */}
      <section className="relative pt-40 pb-32 min-h-[90vh] flex flex-col justify-center bg-[#040814] overflow-hidden">
        {/* Background Imagery */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" 
            alt="Global Infrastructure Services" 
            className="w-full h-full object-cover opacity-20 mix-blend-screen grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/80 to-[#14477B]/40"></div>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#0B79BF]/20 rounded-full blur-[100px] z-0 animate-pulse"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 dark-glass rounded-full mb-8 border-[#0B79BF]/40 text-[#0B79BF]">
              <Settings className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Bichuten Services Portfolio</span>
            </div>
          </Reveal>
          
          <Reveal delay={150}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-white mb-6 leading-[0.9] drop-shadow-2xl">
              Comprehensive Services for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] via-blue-400 to-[#34A853]">
                Secure Digital Operations
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-xl font-light text-blue-100/90 mb-6 leading-relaxed max-w-4xl mx-auto">
              Bichuten delivers end-to-end infrastructure services covering compute, communication, security, identity, and compliance—designed specifically for organizations operating in regulated and mission-critical environments.
            </p>
            <div className="inline-block border-l-4 border-[#34A853] pl-4 py-1 mb-10 bg-white/5 rounded-r">
              <p className="text-sm font-bold text-gray-200 uppercase tracking-wider">
                From deployment to security management, all services are delivered within a unified, sovereign platform.
              </p>
            </div>
          </Reveal>

          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="group bg-[#0B79BF] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#14477B] shadow-[0_0_20px_rgba(11,121,191,0.4)] flex items-center justify-center gap-3 rounded">
                Explore Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="/contact" className="dark-glass text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:border-white/30 hover:bg-white/10 rounded flex items-center justify-center">
                Request Consultation
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 2. OVERVIEW (Light Corporate Split) ================= */}
      <section className="py-24 relative bg-slate-50 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* The Problem & Solution Text */}
            <Reveal direction="right">
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">End-to-End Infrastructure Services</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Modern digital operations require a combination of infrastructure, communication systems, security controls, and compliance frameworks.
              </p>
              
              <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500"/> Traditional Fragmented Approach
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Fragmented systems & operational complexity</li>
                  <li>• Inconsistent security and governance</li>
                  <li>• Increased costs and management overhead</li>
                  <li>• Limited visibility across systems</li>
                </ul>
              </div>

              <div className="bg-[#14477B] p-6 rounded-xl shadow-lg relative overflow-hidden text-white">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#34A853]"></div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#34A853]"/> The Bichuten Unified Suite
                </h4>
                <p className="text-sm text-blue-100 mb-3 leading-relaxed">
                  We provide a complete suite of integrated services designed to work seamlessly together, ensuring:
                </p>
                <ul className="grid grid-cols-2 gap-2 text-xs font-medium text-white">
                  <li className="bg-white/10 p-2 rounded">Consistent security</li>
                  <li className="bg-white/10 p-2 rounded">Simplified operations</li>
                  <li className="bg-white/10 p-2 rounded">Scalable performance</li>
                  <li className="bg-white/10 p-2 rounded">Full data control</li>
                </ul>
              </div>
            </Reveal>

            {/* Visual Graphic: Disconnected vs Connected */}
            <Reveal direction="left" delay={200} className="relative h-[500px] flex items-center justify-center">
               <div className="relative w-full max-w-md h-full flex flex-col justify-center">
                  
                  {/* Disconnected Nodes */}
                  <div className="flex justify-between items-center mb-8 opacity-50">
                     <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center"><Server className="text-gray-400 w-6 h-6"/></div>
                     <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center"><Lock className="text-gray-400 w-6 h-6"/></div>
                     <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center"><Database className="text-gray-400 w-6 h-6"/></div>
                  </div>

                  {/* Down Arrow Indicator */}
                  <div className="flex justify-center mb-8">
                     <ArrowRight className="w-8 h-8 text-[#0B79BF] rotate-90 animate-bounce" />
                  </div>

                  {/* Connected Core */}
                  <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 flex items-center justify-center h-64">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-10"></div>
                     <div className="relative z-10 flex gap-4">
                       <div className="w-20 h-20 rounded-full bg-[#14477B] text-white flex items-center justify-center shadow-lg transform translate-x-4 animate-float-icon">
                          <Server className="w-8 h-8" />
                       </div>
                       <div className="w-24 h-24 rounded-full bg-[#0B79BF] text-white flex items-center justify-center shadow-xl z-10 animate-float-icon" style={{animationDelay: '1s'}}>
                          <Layers className="w-10 h-10" />
                       </div>
                       <div className="w-20 h-20 rounded-full bg-[#34A853] text-white flex items-center justify-center shadow-lg transform -translate-x-4 animate-float-icon" style={{animationDelay: '2s'}}>
                          <ShieldCheck className="w-8 h-8" />
                       </div>
                     </div>
                     <div className="absolute bottom-4 font-bold text-xs uppercase tracking-widest text-gray-400">Integrated Services Stack</div>
                  </div>

               </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 3. SERVICE CATEGORIES (Dark Theme Grid with Google Colors) ================= */}
      <section className="py-32 bg-[#040814] relative border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">Integrated Services Across the Stack</h2>
              <p className="text-gray-400">A comprehensive suite covering every critical aspect of your digital operations.</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* A. Infrastructure */}
            <Reveal delay={0} className="dark-glass p-8 rounded-2xl flex flex-col group border-t-4 border-t-[#4285F4] hover:shadow-[0_0_30px_rgba(66,133,244,0.15)] transition-all">
              <Server className="w-10 h-10 text-[#4285F4] mb-6 group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-2">A. Infrastructure Services</h3>
              <p className="text-xs text-gray-400 mb-6 flex-grow">Core infrastructure services that provide compute, storage, networking, and hosting capabilities.</p>
              <ul className="space-y-2 text-sm text-gray-300 mb-6">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#4285F4] rounded-full"></div> Colocation & sovereign cloud</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#4285F4] rounded-full"></div> Disaster recovery & continuity</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#4285F4] rounded-full"></div> Managed infra services</li>
              </ul>
              <div className="mt-auto bg-[#4285F4]/10 text-[#4285F4] text-xs font-bold p-3 rounded">
                Outcome: Reliable & scalable foundation.
              </div>
            </Reveal>

            {/* B. Communication */}
            <Reveal delay={100} className="dark-glass p-8 rounded-2xl flex flex-col group border-t-4 border-t-[#34A853] hover:shadow-[0_0_30px_rgba(52,168,83,0.15)] transition-all">
              <MessageSquare className="w-10 h-10 text-[#34A853] mb-6 group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-2">B. Communication Services</h3>
              <p className="text-xs text-gray-400 mb-6 flex-grow">Secure communication systems for email, messaging, file exchange, and collaboration.</p>
              <ul className="space-y-2 text-sm text-gray-300 mb-6">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full"></div> Secure sovereign email</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full"></div> Encrypted messaging & files</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full"></div> Encrypted video & collaboration</li>
              </ul>
              <div className="mt-auto bg-[#34A853]/10 text-[#34A853] text-xs font-bold p-3 rounded">
                Outcome: Controlled & encrypted comms.
              </div>
            </Reveal>

            {/* C. Identity & Security */}
            <Reveal delay={200} className="dark-glass p-8 rounded-2xl flex flex-col group border-t-4 border-t-[#EA4335] hover:shadow-[0_0_30px_rgba(234,67,53,0.15)] transition-all">
              <ShieldCheck className="w-10 h-10 text-[#EA4335] mb-6 group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-2">C. Identity & Security</h3>
              <p className="text-xs text-gray-400 mb-6 flex-grow">Centralized identity management and advanced security systems to protect users and data.</p>
              <ul className="space-y-2 text-sm text-gray-300 mb-6">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#EA4335] rounded-full"></div> Identity & Access Management</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#EA4335] rounded-full"></div> Multi-factor authentication</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#EA4335] rounded-full"></div> Key management & HSM</li>
              </ul>
              <div className="mt-auto bg-[#EA4335]/10 text-[#EA4335] text-xs font-bold p-3 rounded">
                Outcome: Secure & controlled access.
              </div>
            </Reveal>

            {/* D. Compliance & Cyber Resilience */}
            <Reveal delay={300} className="dark-glass p-8 rounded-2xl flex flex-col group border-t-4 border-t-[#FBBC05] hover:shadow-[0_0_30px_rgba(251,188,5,0.15)] transition-all md:col-span-2 lg:col-span-1">
              <Activity className="w-10 h-10 text-[#FBBC05] mb-6 group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-2">D. Compliance & Resilience</h3>
              <p className="text-xs text-gray-400 mb-6 flex-grow">Monitoring, audit, and recovery systems to ensure compliance and operational continuity.</p>
              <ul className="space-y-2 text-sm text-gray-300 mb-6">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#FBBC05] rounded-full"></div> Regulatory archival & E-Discovery</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#FBBC05] rounded-full"></div> Security monitoring & reports</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#FBBC05] rounded-full"></div> Cyber recovery vault</li>
              </ul>
              <div className="mt-auto bg-[#FBBC05]/10 text-[#FBBC05] text-xs font-bold p-3 rounded">
                Outcome: Continuous compliance.
              </div>
            </Reveal>

            {/* E. Digital Trust & Storage */}
            <Reveal delay={400} className="dark-glass p-8 rounded-2xl flex flex-col group border-t-4 border-t-[#0B79BF] hover:shadow-[0_0_30px_rgba(11,121,191,0.15)] transition-all lg:col-span-2">
              <FileSignature className="w-10 h-10 text-[#0B79BF] mb-6 group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-2">E. Digital Trust & Storage Services</h3>
              <p className="text-xs text-gray-400 mb-6 max-w-xl">Secure storage and verification systems designed specifically for data, documents, and digital interactions in high-trust environments.</p>
              <div className="grid md:grid-cols-2 gap-4 flex-grow mb-6">
                 <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Secure document vault</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Digital signature & attestation</li>
                 </ul>
                 <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Controlled data storage</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Immutable activity records</li>
                 </ul>
              </div>
              <div className="mt-auto bg-[#0B79BF]/10 text-[#4da6e7] text-xs font-bold p-3 rounded text-center md:text-left">
                Outcome: Trusted digital operations with secure and verifiable data.
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 4. HOW SERVICES ARE DELIVERED (Animated Process Flow) ================= */}
      <section className="py-24 bg-white relative border-b border-gray-200 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">A Structured & Integrated Delivery Model</h2>
              <p className="text-gray-600 text-lg">Bichuten follows a strict process to deliver infrastructure services, ensuring absolute alignment with business, technical, and compliance requirements.</p>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative max-w-5xl mx-auto">
            {/* Background connecting line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden md:block"></div>
            <svg className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 hidden md:block z-0 overflow-visible">
               <path d="M 0 0 L 100% 0" fill="none" stroke="#0B79BF" strokeWidth="3" className="animate-draw-path" />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
               {[
                 { step: "01", title: "Assess & Design", desc: "Requirement assessment and solution architecture." },
                 { step: "02", title: "Deploy & Secure", desc: "Infrastructure deployment and access configuration." },
                 { step: "03", title: "Migrate", desc: "Integration and migration of data and applications." },
                 { step: "04", title: "Operate", desc: "Continuous monitoring, support, and DR optimization." }
               ].map((item, i) => (
                 <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center relative group hover:-translate-y-2 transition-transform">
                    <div className="w-12 h-12 rounded-full bg-[#14477B] text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md group-hover:bg-[#0B79BF] transition-colors">
                      {item.step}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>

            <div className="mt-16 text-center">
               <div className="inline-block px-8 py-3 bg-[#34A853]/10 border border-[#34A853]/30 text-[#2b8a44] font-bold text-sm uppercase tracking-widest rounded-full">
                 Outcome: Seamless transition to fully operational infrastructure
               </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 5. SERVICE DELIVERY MODELS (Comparison Cards) ================= */}
      <section className="py-24 bg-slate-50 relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Flexible Engagement Models</h2>
              <p className="text-gray-600">Bichuten offers flexible service models to meet different organizational needs and investment strategies.</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* DCaaS / Opex */}
            <Reveal direction="up" className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-[#0B79BF] transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>
              <CreditCard className="w-12 h-12 text-[#0B79BF] mb-6 relative z-10" />
              <h3 className="text-3xl font-bebas text-gray-900 tracking-wider mb-2 relative z-10">Data Center as a Service</h3>
              <p className="text-xs font-bold text-[#0B79BF] uppercase tracking-widest mb-6 relative z-10">Opex Model</p>
              
              <ul className="space-y-4 mb-8 relative z-10">
                <li className="flex items-center gap-3 text-sm text-gray-700"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Subscription-based infrastructure</li>
                <li className="flex items-center gap-3 text-sm text-gray-700"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Predictable pay-as-you-use pricing</li>
                <li className="flex items-center gap-3 text-sm text-gray-700"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Zero upfront capital investment</li>
                <li className="flex items-center gap-3 text-sm text-gray-700"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Fully managed by Bichuten experts</li>
              </ul>
            </Reveal>

            {/* Capex */}
            <Reveal direction="up" delay={150} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-[#14477B] transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>
              <Building2 className="w-12 h-12 text-[#14477B] mb-6 relative z-10" />
              <h3 className="text-3xl font-bebas text-gray-900 tracking-wider mb-2 relative z-10">Infrastructure Development</h3>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 relative z-10">Capex Model</p>
              
              <ul className="space-y-4 mb-8 relative z-10">
                <li className="flex items-center gap-3 text-sm text-gray-700"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Custom-built infrastructure environments</li>
                <li className="flex items-center gap-3 text-sm text-gray-700"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Full ownership and asset control</li>
                <li className="flex items-center gap-3 text-sm text-gray-700"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Designed for large enterprises</li>
                <li className="flex items-center gap-3 text-sm text-gray-700"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Specialized government project alignment</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 6. PLATFORM INTEGRATION (Isometric Stack) ================= */}
      <section className="py-32 bg-[#040814] relative overflow-hidden border-t border-[#0B79BF]/30">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <Reveal direction="right">
              <Layers className="w-12 h-12 text-[#0B79BF] mb-6" />
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">Services Powered by a Unified Platform</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                All services are built natively on the Bichuten Digital Infrastructure Platform. This guarantees seamless integration across systems rather than patching together third-party vendor software.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Infrastructure", color: "text-[#4285F4]" },
                  { name: "Communication", color: "text-[#34A853]" },
                  { name: "Identity & Access", color: "text-[#EA4335]" },
                  { name: "Security & Encryption", color: "text-[#FBBC05]" },
                  { name: "Compliance & Audit", color: "text-[#0B79BF]" }
                ].map((layer, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-3 rounded flex items-center gap-3">
                    <CheckCircle className={`w-4 h-4 ${layer.color}`} />
                    <span className="text-sm font-medium text-gray-200">{layer.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Isometric Visual Stack */}
            <Reveal direction="left" delay={200} className="iso-stack-container h-[500px] flex justify-center items-center iso-container">
               <div className="relative w-full max-w-sm">
                  {[
                    { text: "Compliance Services", bg: "bg-[#0B79BF]/80", border: "border-[#0B79BF]", z: "z-50", offset: "-translate-y-24", class: "iso-layer-1" },
                    { text: "Security Services", bg: "bg-[#EA4335]/80", border: "border-[#EA4335]", z: "z-40", offset: "-translate-y-12", class: "iso-layer-2" },
                    { text: "Identity Services", bg: "bg-[#FBBC05]/80", border: "border-[#FBBC05]", z: "z-30", offset: "translate-y-0", class: "iso-layer-3" },
                    { text: "Communication Services", bg: "bg-[#34A853]/80", border: "border-[#34A853]", z: "z-20", offset: "translate-y-12", class: "iso-layer-2" },
                    { text: "Infrastructure Services", bg: "bg-[#4285F4]/80", border: "border-[#4285F4]", z: "z-10", offset: "translate-y-24", class: "iso-layer-1" },
                  ].map((layer, i) => (
                    <div key={i} className={`absolute inset-0 flex justify-center items-center ${layer.z} ${layer.offset}`}>
                      <div className={`iso-layer ${layer.class} w-full h-24 ${layer.bg} border border-white/50 shadow-[0_10px_20px_rgba(0,0,0,0.3)] flex items-center justify-center backdrop-blur-sm`}>
                        <span className="font-bebas text-xl text-white tracking-widest">{layer.text}</span>
                      </div>
                    </div>
                  ))}
               </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 7. BUSINESS VALUE ================= */}
      <section className="py-24 bg-white relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">From Services to Operational Excellence</h2>
              <p className="text-gray-600">Bichuten services deliver measurable, bottom-line value across your entire digital operation.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Settings, text: "Simplified infrastructure management" },
              { icon: Activity, text: "Reduced operational complexity" },
              { icon: ShieldCheck, text: "Enhanced security and compliance" },
              { icon: Server, text: "Improved performance and reliability" },
              { icon: Lock, text: "Greater control over systems and data" },
            ].map((benefit, i) => (
              <Reveal key={i} delay={i * 100} className="bg-slate-50 p-6 rounded-xl border border-gray-100 text-center hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <benefit.icon className="w-8 h-8 text-[#0B79BF] mx-auto mb-4" />
                <p className="text-sm font-bold text-gray-800 leading-snug">{benefit.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 8. TRANSITION TO SUBPAGES (Light Theme Grid) ================= */}
      <section className="py-32 bg-slate-50 relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Explore Services in Detail</h2>
              <p className="text-gray-600">Each service category provides specialized capabilities designed to address specific operational needs.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[
              { title: "Infrastructure Services", href: "/services/infrastructure", color: "hover:border-[#4285F4]" },
              { title: "Communication Services", href: "/services/communication", color: "hover:border-[#34A853]" },
              { title: "Identity & Security", href: "/services/security", color: "hover:border-[#EA4335]" },
              { title: "Compliance & Resilience", href: "/services/compliance", color: "hover:border-[#FBBC05]" },
              { title: "Digital Trust & Storage", href: "/services/trust", color: "hover:border-[#0B79BF]" }
            ].map((link, i) => (
              <Reveal key={i} delay={i * 100}>
                <a 
                  href={link.href} 
                  className={`group block h-full bg-white border border-gray-200 shadow-sm p-6 text-center transition-all duration-300 rounded-xl ${link.color}`}
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

export default ServicesMain;