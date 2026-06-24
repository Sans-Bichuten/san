import React, { useEffect, useRef, useState } from 'react';
import { 
  Shield, Lock, Key, Database, Layers, Activity, 
  Wifi, Server, AlertTriangle, ArrowRight, ShieldCheck, 
  FileLock, CheckCircle, MapPin, Eye, Cpu,Network
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

const SecurityEncryptionLayer = () => {
  // Google Brand Colors mapped for UI accents
  const gColors = {
    blue: '#4285F4',
    red: '#EA4335',
    yellow: '#FBBC05',
    green: '#34A853'
  };

  return (
    <div className="min-h-screen bg-[#040814] text-gray-300 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          @keyframes encryptionFlow {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          .animate-encryption {
            background: linear-gradient(90deg, transparent, rgba(66, 133, 244, 0.4), rgba(52, 168, 83, 0.4), transparent);
            background-size: 200% 200%;
            animation: encryptionFlow 3s infinite linear;
          }
          @keyframes radarSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-radar {
            animation: radarSpin 4s linear infinite;
            transform-origin: center;
          }
          .glass-panel {
            background: rgba(20, 71, 123, 0.1);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(11, 121, 191, 0.2);
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
          }
          .glass-panel-hover {
            transition: all 0.3s ease;
          }
          .glass-panel-hover:hover {
            background: rgba(20, 71, 123, 0.2);
            box-shadow: 0 10px 40px -10px rgba(11, 121, 191, 0.3);
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-40 pb-32 min-h-[90vh] flex flex-col justify-center border-b border-white/5">
        {/* Background Imagery */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2000&auto=format&fit=crop" 
            alt="Encryption Abstract" 
            className="w-full h-full object-cover object-center opacity-10 mix-blend-screen grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040814]/80 via-[#040814]/90 to-[#040814]"></div>
        </div>

        {/* Google-colored glowing orbs for tech ambiance */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#4285F4]/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#EA4335]/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 glass-panel rounded-full mb-8 border border-[#4285F4]/30">
              <Shield className="w-4 h-4 text-[#4285F4]" />
              <span className="text-xs font-bold tracking-widest uppercase text-blue-200">Layer 4: Security & Encryption</span>
            </div>
          </Reveal>
          
          <Reveal delay={150}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-white mb-6 leading-[0.9] drop-shadow-2xl">
              Security Embedded <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] via-[#4285F4] to-[#34A853]">
                Across Every Layer
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-xl md:text-2xl font-light text-blue-100/80 max-w-4xl mx-auto mb-6 leading-relaxed">
              Bichuten’s Security and Encryption Layer delivers end-to-end protection for data, systems, and communications—ensuring that every interaction within your infrastructure is secured, encrypted, and controlled.
            </p>
            <p className="text-sm font-bold text-[#EA4335] uppercase tracking-wider mb-10 max-w-2xl mx-auto">
              Designed for environments where security is not an add-on, but a foundational requirement.
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="group bg-[#4285F4] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blue-600 hover:shadow-[0_0_30px_rgba(66,133,244,0.5)] flex items-center justify-center gap-3 rounded">
                Request Security Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="/platform/architecture" className="glass-panel glass-panel-hover text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 rounded flex items-center justify-center">
                Explore Architecture
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 2. OVERVIEW ================= */}
      <section className="py-24 relative bg-[#070e20]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <Reveal direction="right">
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">A Security-First Infrastructure Model</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                In modern digital environments, security cannot be implemented as an isolated function. It must be embedded across every layer of the infrastructure.
              </p>
              
              <div className="space-y-4 mb-8">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-white/10 pb-2">Risks of Fragmented Security</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#EA4335] rounded-full"></div> Inconsistent protection across systems</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#EA4335] rounded-full"></div> Gaps in visibility and monitoring</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#EA4335] rounded-full"></div> Difficulty in enforcing security policies</li>
                </ul>
              </div>

              <div className="p-6 bg-[#34A853]/10 border-l-4 border-[#34A853] rounded-r-xl">
                <p className="text-sm text-[#34A853] font-medium leading-relaxed">
                  Bichuten addresses these challenges by integrating security directly into the platform architecture. Every component—data, communication, identity, and infrastructure—is protected through a unified framework.
                </p>
              </div>
            </Reveal>

            {/* Abstract Graphic: Unified Shield */}
            <Reveal direction="left" delay={200} className="relative h-[450px] glass-panel rounded-2xl flex items-center justify-center overflow-hidden p-8 border border-white/5">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              
              {/* Surrounding Fragmented Pieces converging */}
              <div className="absolute inset-0 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                 <div className="w-64 h-64 border border-dashed border-[#EA4335]/30 rounded-full"></div>
                 <div className="absolute w-80 h-80 border border-dotted border-[#FBBC05]/30 rounded-full"></div>
              </div>

              {/* Central Unified Shield */}
              <div className="relative z-10 w-48 h-48 bg-[#040814] rounded-full border-4 border-[#34A853] flex flex-col items-center justify-center shadow-[0_0_50px_rgba(52,168,83,0.3)]">
                 <ShieldCheck className="w-16 h-16 text-[#34A853] mb-2" />
                 <span className="font-bebas text-lg tracking-widest text-white">Unified Security</span>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 3. CORE SECURITY CAPABILITIES (Google Color Accents) ================= */}
      <section className="py-24 bg-[#040814] relative border-y border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bebas text-center text-white tracking-wide mb-4">
              Comprehensive Protection Across Systems
            </h2>
            <p className="text-center text-gray-500 text-sm font-bold tracking-widest uppercase mb-16">
              A secure environment where data is protected at every stage.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* End-to-End Encryption */}
            <Reveal delay={0} className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col border-t-4 border-t-[#4285F4]">
              <FileLock className="w-10 h-10 text-[#4285F4] mb-6" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-3">End-to-End Encryption</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-grow">All data is encrypted throughout its lifecycle, ensuring confidentiality and integrity.</p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-[#4285F4] rounded-full flex-shrink-0"></div> Encryption at rest and in transit</li>
                <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-[#4285F4] rounded-full flex-shrink-0"></div> Secure communication channels</li>
                <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-[#4285F4] rounded-full flex-shrink-0"></div> Protection against interception</li>
              </ul>
            </Reveal>

            {/* Key Management */}
            <Reveal delay={100} className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col border-t-4 border-t-[#FBBC05]">
              <Key className="w-10 h-10 text-[#FBBC05] mb-6" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-3">Key Management Systems</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-grow">Centralized control and lifecycle management of cryptographic keys.</p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-[#FBBC05] rounded-full flex-shrink-0"></div> Secure key generation & storage</li>
                <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-[#FBBC05] rounded-full flex-shrink-0"></div> Key rotation lifecycle management</li>
                <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-[#FBBC05] rounded-full flex-shrink-0"></div> Integration with platform policies</li>
              </ul>
            </Reveal>

            {/* HSM */}
            <Reveal delay={200} className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col border-t-4 border-t-[#EA4335]">
              <Cpu className="w-10 h-10 text-[#EA4335] mb-6" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-3">Hardware Security Modules</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-grow">Dedicated hardware-based protection for sensitive cryptographic operations.</p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-[#EA4335] rounded-full flex-shrink-0"></div> Tamper-resistant hardware</li>
                <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-[#EA4335] rounded-full flex-shrink-0"></div> Secure key storage & processing</li>
                <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-[#EA4335] rounded-full flex-shrink-0"></div> High-assurance for finance tasks</li>
              </ul>
            </Reveal>

            {/* Data Protection Frameworks */}
            <Reveal delay={300} className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col border-t-4 border-t-[#34A853]">
              <Database className="w-10 h-10 text-[#34A853] mb-6" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-3">Data Protection Frameworks</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-grow">Comprehensive mechanisms to safeguard data across systems.</p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-[#34A853] rounded-full flex-shrink-0"></div> Data integrity verification</li>
                <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-[#34A853] rounded-full flex-shrink-0"></div> Protection against modification</li>
                <li className="flex items-start gap-2"><div className="mt-1 w-1 h-1 bg-[#34A853] rounded-full flex-shrink-0"></div> Controlled data access architectures</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 4. DEFENSE-IN-DEPTH ARCHITECTURE (Visual) ================= */}
      <section className="py-24 relative bg-[#070e20] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Diagram: Concentric Shields using Google Colors */}
            <Reveal direction="right" className="relative h-[500px] flex items-center justify-center">
               <div className="absolute inset-0 flex items-center justify-center">
                  {/* Layer 1: Network (Red) */}
                  <div className="absolute w-96 h-96 rounded-full border border-[#EA4335]/30 flex items-start justify-center shadow-[inset_0_0_20px_rgba(234,67,53,0.1)]">
                     <span className="bg-[#070e20] px-2 text-[10px] text-[#EA4335] uppercase tracking-widest mt-[-8px]">Network Layer</span>
                  </div>
                  {/* Layer 2: Infrastructure (Yellow) */}
                  <div className="absolute w-72 h-72 rounded-full border border-[#FBBC05]/40 flex items-start justify-center shadow-[inset_0_0_20px_rgba(251,188,5,0.1)]">
                     <span className="bg-[#070e20] px-2 text-[10px] text-[#FBBC05] uppercase tracking-widest mt-[-8px]">Infrastructure Layer</span>
                  </div>
                  {/* Layer 3: Identity (Green) */}
                  <div className="absolute w-48 h-48 rounded-full border border-[#34A853]/50 flex items-start justify-center shadow-[inset_0_0_20px_rgba(52,168,83,0.1)]">
                     <span className="bg-[#070e20] px-2 text-[10px] text-[#34A853] uppercase tracking-widest mt-[-8px]">Identity Layer</span>
                  </div>
                  {/* Core: Application/Data (Blue) */}
                  <div className="absolute w-24 h-24 rounded-full bg-[#4285F4]/20 border border-[#4285F4] flex items-center justify-center shadow-[0_0_30px_rgba(66,133,244,0.4)]">
                     <Database className="w-8 h-8 text-[#4285F4]" />
                  </div>
               </div>
            </Reveal>

            {/* Text Content */}
            <Reveal direction="left" className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">Defense-In-Depth Architecture</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                The Bichuten platform follows a defense-in-depth approach, where multiple layers of security controls work together to protect systems and data.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   { name: "Infrastructure Protection", color: "text-[#FBBC05]" },
                   { name: "Network Segmentation", color: "text-[#EA4335]" },
                   { name: "Identity-Based Access", color: "text-[#34A853]" },
                   { name: "Application Security", color: "text-[#4285F4]" },
                   { name: "Continuous Monitoring", color: "text-white" }
                 ].map((layer, i) => (
                   <div key={i} className="glass-panel p-4 rounded flex items-center gap-3">
                     <Layers className={`w-5 h-5 ${layer.color}`} />
                     <span className="text-sm font-medium text-gray-200">{layer.name}</span>
                   </div>
                 ))}
              </div>

              <div className="mt-8 p-4 bg-white/5 border-l-2 border-[#4285F4] rounded-r text-sm text-blue-100">
                <strong>Outcome:</strong> Even if one layer is compromised, additional robust layers continue to protect the core system.
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 5 & 6. ENCRYPTION FLOW & THREAT DETECTION ================= */}
      <section className="py-24 bg-[#040814] relative border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Encryption Flow Diagram */}
          <div className="mb-24">
            <Reveal>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bebas text-white tracking-wider mb-2">Securing Data Across Its Lifecycle</h2>
                <p className="text-sm text-gray-400">Data is protected from creation to transmission, storage, and retrieval.</p>
              </div>
            </Reveal>

            <Reveal delay={200} className="glass-panel p-8 rounded-2xl relative overflow-hidden">
               {/* Animated Flow Background */}
               <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 animate-encryption opacity-30"></div>
               
               <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
                 {[
                   { step: 1, title: "Creation", desc: "Encrypted at source" },
                   { step: 2, title: "Transmission", desc: "Secure network channels" },
                   { step: 3, title: "Storage", desc: "Encrypted infrastructure" },
                   { step: 4, title: "Access", desc: "Identity-based policies" },
                   { step: 5, title: "Audit", desc: "Continuous monitoring" },
                 ].map((item, i) => (
                   <div key={i} className="bg-[#070e20] p-6 rounded-xl border border-white/10 flex flex-col items-center text-center hover:border-[#4285F4] transition-colors shadow-lg">
                      <div className="w-8 h-8 rounded-full bg-[#14477B] text-white flex items-center justify-center font-bold text-sm mb-4 border border-[#0B79BF]">
                        {item.step}
                      </div>
                      <h4 className="font-bold text-gray-200 text-sm mb-2">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                   </div>
                 ))}
               </div>
            </Reveal>
          </div>

          {/* Threat Protection & Network Security */}
          <div className="grid lg:grid-cols-2 gap-8">
            
            <Reveal direction="up" delay={0} className="glass-panel p-10 rounded-2xl relative overflow-hidden group">
              <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="w-64 h-64 border border-[#EA4335] rounded-full animate-radar flex items-center justify-center">
                  <div className="w-1/2 h-1/2 bg-gradient-to-tr from-[#EA4335] to-transparent rounded-full opacity-50"></div>
                </div>
              </div>
              <Activity className="w-10 h-10 text-[#EA4335] mb-6" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Continuous Threat Detection</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Security systems continuously monitor infrastructure and activities to proactively detect and respond to potential threats.
              </p>
              <ul className="space-y-3 relative z-10">
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#EA4335]"/> Real-time system activity monitoring</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#EA4335]"/> Anomaly & suspicious behavior detection</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#EA4335]"/> Integration with incident response</li>
              </ul>
            </Reveal>

            <Reveal direction="up" delay={150} className="glass-panel p-10 rounded-2xl relative overflow-hidden group">
              <Wifi className="absolute -right-4 -top-4 w-48 h-48 text-[#34A853] opacity-5 group-hover:opacity-10 transition-opacity" />
              <Network className="w-10 h-10 text-[#34A853] mb-6 relative z-10" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-4 relative z-10">Secure Network Environments</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed relative z-10">
                Network-level security ensures that data flows are protected and completely isolated across systems to prevent lateral movement.
              </p>
              <ul className="space-y-3 relative z-10">
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#34A853]"/> Network segmentation & isolation</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#34A853]"/> Secure communication protocols</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#34A853]"/> Controlled inter-system connectivity</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 8, 9, 10, 11. INTEGRATION, RESILIENCE, SOVEREIGNTY, COMPLIANCE ================= */}
      <section className="py-24 relative bg-[#070e20] border-t border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Reveal delay={0} className="glass-panel p-6 rounded-2xl border-b-4 border-b-[#4285F4] hover:-translate-y-2 transition-transform">
              <Layers className="w-8 h-8 text-[#4285F4] mb-4" />
              <h3 className="text-lg font-bebas text-white tracking-widest mb-3">Identity & Compliance Integration</h3>
              <p className="text-xs text-gray-400 mb-4">Works in close coordination with Identity and Compliance layers to ensure consistent enforcement.</p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>• Identity-based authentication</li>
                <li>• Unified logging mechanisms</li>
              </ul>
            </Reveal>

            <Reveal delay={100} className="glass-panel p-6 rounded-2xl border-b-4 border-b-[#EA4335] hover:-translate-y-2 transition-transform">
              <AlertTriangle className="w-8 h-8 text-[#EA4335] mb-4" />
              <h3 className="text-lg font-bebas text-white tracking-widest mb-3">Cyber Resilience Preparedness</h3>
              <p className="text-xs text-gray-400 mb-4">Designed to withstand and rapidly recover from cyber incidents, including ransomware.</p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>• Isolated backup environments</li>
                <li>• Ransomware-resistant storage</li>
              </ul>
            </Reveal>

            <Reveal delay={200} className="glass-panel p-6 rounded-2xl border-b-4 border-b-[#FBBC05] hover:-translate-y-2 transition-transform">
              <MapPin className="w-8 h-8 text-[#FBBC05] mb-4" />
              <h3 className="text-lg font-bebas text-white tracking-widest mb-3">Sovereign Security Advantage</h3>
              <p className="text-xs text-gray-400 mb-4">Architecture operates within Nepal, ensuring all data and systems remain under local control.</p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>• Reduced foreign surveillance risks</li>
                <li>• Alignment with national policies</li>
              </ul>
            </Reveal>

            <Reveal delay={300} className="glass-panel p-6 rounded-2xl border-b-4 border-b-[#34A853] hover:-translate-y-2 transition-transform">
              <FileLock className="w-8 h-8 text-[#34A853] mb-4" />
              <h3 className="text-lg font-bebas text-white tracking-widest mb-3">Compliance Regulatory Support</h3>
              <p className="text-xs text-gray-400 mb-4">Mechanisms are aligned with compliance requirements to meet stringent regulatory standards.</p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>• Audit-ready security logs</li>
                <li>• Data protection frameworks</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 13. TRANSITION SECTION ================= */}
      <section className="py-24 relative bg-[#040814]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">Explore the Platform Layers</h2>
              <p className="text-gray-400">The Security and Encryption Layer operates as part of the broader Bichuten platform.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Infrastructure Layer", href: "/platform/infrastructure" },
              { title: "Communication Layer", href: "/platform/communication" },
              { title: "Identity and Access", href: "/platform/identity" },
              { title: "Compliance and Audit", href: "/platform/audit" }
            ].map((link, i) => (
              <Reveal key={i} delay={i * 100}>
                <a 
                  href={link.href} 
                  className="group block h-full glass-panel p-6 text-center hover:border-[#4285F4] hover:shadow-[0_0_15px_rgba(66,133,244,0.3)] transition-all duration-300"
                >
                  <h4 className="font-bold text-gray-300 group-hover:text-white text-sm tracking-wide uppercase transition-colors">
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

export default SecurityEncryptionLayer;