import React, { useEffect, useRef, useState } from 'react';
import { 
  Server, Shield, Lock, Layers, Network, FileText, 
  CheckCircle, ArrowRight, Activity, Zap, Globe, 
  MapPin, Cpu, Database, SplitSquareHorizontal
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

const PlatformOverview = () => {
  return (
    <div className="min-h-screen bg-[#060d1a] text-gray-300 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS --- */}
      <style>
        {`
          @keyframes slideBg {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
          }
          .bg-tech-pattern {
            background-image: radial-gradient(rgba(11, 121, 191, 0.15) 1px, transparent 1px);
            background-size: 30px 30px;
            animation: slideBg 20s linear infinite;
          }
          @keyframes pulseCore {
            0%, 100% { box-shadow: 0 0 20px rgba(11,121,191,0.2), inset 0 0 20px rgba(11,121,191,0.2); }
            50% { box-shadow: 0 0 50px rgba(11,121,191,0.6), inset 0 0 40px rgba(11,121,191,0.5); }
          }
          .core-node { animation: pulseCore 4s ease-in-out infinite; }
          
          @keyframes circuitFlow {
            to { stroke-dashoffset: -100; }
          }
          .circuit-line {
            stroke-dasharray: 10 10;
            animation: circuitFlow 3s linear infinite;
          }
          
          .glass-card {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-40 pb-32 min-h-[80vh] flex flex-col justify-center border-b border-white/5">
        <div className="absolute inset-0 bg-tech-pattern opacity-50 z-0"></div>
        
        {/* Dynamic Light Beams */}
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0B79BF]/50 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#0B79BF]/50 to-transparent"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 glass-card rounded-full mb-8">
                <div className="w-2 h-2 rounded-full bg-[#0B79BF] animate-ping"></div>
                <span className="text-xs font-bold tracking-widest uppercase text-blue-200">Platform Overview</span>
              </div>
            </Reveal>
            
            <Reveal delay={150}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-white mb-6 leading-[0.9]">
                A Unified Platform for <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] to-[#4da6e7]">
                  Secure & Sovereign
                </span><br/>
                Digital Operations
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-xl md:text-2xl font-light text-blue-100/80 mb-8 leading-relaxed max-w-3xl">
                Bichuten Data Vault brings together infrastructure, communication, identity, security, and compliance into a single, integrated platform—enabling organizations to operate with complete control, visibility, and trust.
              </p>
              <p className="text-sm font-bold text-[#0B79BF] uppercase tracking-wider mb-10 max-w-2xl">
                Designed for regulated environments, mission-critical systems, and organizations that require secure, compliant, and locally controlled digital infrastructure.
              </p>
            </Reveal>

            <Reveal delay={450}>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group bg-[#0B79BF] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(11,121,191,0.5)] flex items-center justify-center gap-3">
                  Explore Architecture <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="glass-card hover:bg-white/10 text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 border border-white/20 hover:border-white/40">
                  Request a Demo
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= 2 & 3. WHAT IS IT & WHY UNIFIED (Comparison) ================= */}
      <section className="py-24 relative bg-[#0a1426]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">Moving Beyond Fragmented Infrastructure</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                The Bichuten Digital Infrastructure Platform is a comprehensive system that combines all essential components required to run modern digital operations within a secure and controlled environment.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* The Problem: Fragmented */}
            <Reveal direction="right" className="glass-card p-10 rounded-2xl border-t-4 border-t-red-900/50 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity"><SplitSquareHorizontal className="w-64 h-64 text-red-500" /></div>
              <h3 className="text-2xl font-bebas text-red-400 tracking-wider mb-6">Challenges with Traditional Models</h3>
              <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                Traditionally, organizations rely on multiple external vendors for hosting, communication, identity, and security. This fragmented approach increases complexity, introduces security risks, and limits control over data.
              </p>
              <ul className="space-y-4">
                {[
                  "Multiple vendors and tools with limited integration",
                  "Inconsistent security and access controls",
                  "Difficulty in meeting regulatory and audit requirements",
                  "Limited visibility across systems",
                  "Increased dependency on foreign infrastructure"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500/50 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* The Solution: Unified */}
            <Reveal direction="left" delay={200} className="bg-gradient-to-br from-[#14477B] to-[#0a1628] p-10 rounded-2xl border border-[#0B79BF]/30 relative overflow-hidden shadow-[0_0_40px_rgba(11,121,191,0.1)]">
              <div className="absolute -right-10 -bottom-10 opacity-10"><Layers className="w-64 h-64 text-[#0B79BF]" /></div>
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-6">Benefits of a Unified Approach</h3>
              <p className="text-blue-100/80 mb-8 text-sm leading-relaxed relative z-10">
                Bichuten replaces this model with a unified ecosystem. By integrating all critical functions, organizations operate within a single environment that ensures centralized management, built-in compliance, and reduced complexity.
              </p>
              <ul className="space-y-4 relative z-10">
                {[
                  "Single platform for all critical operations",
                  "Consistent security and governance policies",
                  "Improved visibility and control",
                  "Simplified management and operations",
                  "Reduced dependency on external systems"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white font-medium">
                    <CheckCircle className="w-5 h-5 text-[#0B79BF] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ================= 4. PLATFORM COMPONENTS OVERVIEW ================= */}
      <section className="py-24 relative bg-[#060d1a] border-y border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bebas text-center text-white tracking-wide mb-4">
              All Critical Layers, Integrated into One System
            </h2>
            <p className="text-center text-[#0B79BF] text-sm font-bold uppercase tracking-widest max-w-2xl mx-auto mb-16">
              Together, these layers create a cohesive system where every function is aligned with the same standards of security, compliance, and performance.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Server, name: "Infrastructure Layer", desc: "Provides compute, storage, and networking capabilities, forming the foundation for all digital operations." },
              { icon: Globe, name: "Communication Layer", desc: "Enables secure email, messaging, file exchange, and collaboration within a controlled environment." },
              { icon: Lock, name: "Identity & Access Layer", desc: "Manages user identities, authentication, and access control across all connected systems." },
              { icon: Shield, name: "Security & Encryption", desc: "Protects data and systems through encryption, key management, and advanced security mechanisms." },
              { icon: FileText, name: "Compliance & Audit", desc: "Ensures regulatory alignment through continuous monitoring, reporting, archival, and audit capabilities." }
            ].map((layer, i) => (
              <Reveal key={i} delay={i * 100} className="glass-card p-6 rounded-xl hover:bg-[#0B79BF]/10 hover:border-[#0B79BF]/50 transition-all duration-300 group flex flex-col h-full">
                <layer.icon className="w-8 h-8 text-[#0B79BF] mb-6 group-hover:-translate-y-1 transition-transform" />
                <h4 className="font-bebas text-xl text-white tracking-wider mb-3">{layer.name}</h4>
                <p className="text-xs text-gray-400 leading-relaxed flex-grow">{layer.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. HOW THE PLATFORM WORKS (Visual Node Map) ================= */}
      <section className="py-32 relative bg-[#0a1426] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">A Connected & Controlled Digital Environment</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                The Bichuten platform operates as a fully integrated ecosystem. Data flows seamlessly across infrastructure, applications, and communication systems while being continuously governed by identity, security, and compliance controls.
              </p>
              
              <div className="space-y-6">
                <h4 className="text-[#0B79BF] font-bebas tracking-widest text-xl border-b border-white/10 pb-2">Key Operational Characteristics</h4>
                {[
                  "Centralized identity governs access across all systems",
                  "Security and encryption are applied consistently at every level",
                  "Communication systems operate within the same secure environment",
                  "Compliance mechanisms monitor and record all activities",
                  "Infrastructure ensures performance, availability, and scalability"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 glass-card px-4 py-3 rounded-lg">
                    <Activity className="w-4 h-4 text-[#0B79BF]" />
                    <span className="text-sm text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-[#14477B]/20 border-l-4 border-[#0B79BF] rounded-r-lg">
                <p className="text-sm text-blue-100 font-medium">
                  <span className="font-bold uppercase tracking-wider text-white">Outcome:</span> Organizations gain a digital environment where operations are not only efficient but also secure, traceable, and fully controlled.
                </p>
              </div>
            </Reveal>

            {/* CSS Interactive Node Visualization */}
            <Reveal delay={300} className="relative h-[500px] flex items-center justify-center hidden lg:flex">
              {/* Central Hub */}
              <div className="absolute z-20 w-32 h-32 rounded-full bg-[#14477B] border-2 border-[#0B79BF] flex items-center justify-center core-node backdrop-blur-xl">
                <Shield className="w-12 h-12 text-white" />
                <div className="absolute -bottom-8 text-xs font-bold text-[#0B79BF] tracking-widest whitespace-nowrap">Unified Governance</div>
              </div>

              {/* Connecting Lines SVG */}
              <svg className="absolute inset-0 w-full h-full z-10">
                <circle cx="50%" cy="50%" r="140" fill="none" stroke="rgba(11,121,191,0.2)" strokeWidth="1" />
                <circle cx="50%" cy="50%" r="200" fill="none" stroke="rgba(11,121,191,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                {/* Lines connecting to nodes */}
                <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="#0B79BF" strokeWidth="2" className="circuit-line" />
                <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="#0B79BF" strokeWidth="2" className="circuit-line" />
                <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="#0B79BF" strokeWidth="2" className="circuit-line" />
                <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="#0B79BF" strokeWidth="2" className="circuit-line" />
              </svg>

              {/* Orbiting Nodes */}
              <div className="absolute top-[10%] z-20 glass-card p-4 rounded-xl flex flex-col items-center border-[#0B79BF]/40 shadow-[0_0_15px_rgba(11,121,191,0.2)]">
                <Database className="w-6 h-6 text-white mb-1" /> <span className="text-[10px] uppercase tracking-wider text-gray-400">Data</span>
              </div>
              <div className="absolute bottom-[10%] z-20 glass-card p-4 rounded-xl flex flex-col items-center border-[#0B79BF]/40 shadow-[0_0_15px_rgba(11,121,191,0.2)]">
                <Network className="w-6 h-6 text-white mb-1" /> <span className="text-[10px] uppercase tracking-wider text-gray-400">Comms</span>
              </div>
              <div className="absolute left-[10%] z-20 glass-card p-4 rounded-xl flex flex-col items-center border-[#0B79BF]/40 shadow-[0_0_15px_rgba(11,121,191,0.2)]">
                <Lock className="w-6 h-6 text-white mb-1" /> <span className="text-[10px] uppercase tracking-wider text-gray-400">Identity</span>
              </div>
              <div className="absolute right-[10%] z-20 glass-card p-4 rounded-xl flex flex-col items-center border-[#0B79BF]/40 shadow-[0_0_15px_rgba(11,121,191,0.2)]">
                <FileText className="w-6 h-6 text-white mb-1" /> <span className="text-[10px] uppercase tracking-wider text-gray-400">Audit</span>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 6, 7, 8, 9. CORE ADVANTAGES GRID ================= */}
      <section className="py-24 bg-[#060d1a] border-t border-white/5 relative">
        <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#0B79BF] to-transparent opacity-50"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Sovereign Advantage */}
            <Reveal direction="up" className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 group-hover:bg-blue-500/20 transition-colors"></div>
              <MapPin className="w-10 h-10 text-[#0B79BF] mb-6" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Sovereign Infrastructure Advantage</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                All data and systems are hosted within Nepal, ensuring full jurisdictional control and alignment with national policies.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#0B79BF] rounded-full"></div> Assurance of data residency within Nepal</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#0B79BF] rounded-full"></div> Reduced exposure to foreign regulatory risks</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#0B79BF] rounded-full"></div> Greater control over access and governance</li>
              </ul>
            </Reveal>

            {/* Performance & Reliability */}
            <Reveal direction="up" delay={150} className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full -z-10 group-hover:bg-green-500/20 transition-colors"></div>
              <Zap className="w-10 h-10 text-green-400 mb-6" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Performance and Reliability</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Engineered to support mission-critical workloads that require consistent performance and uninterrupted availability.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-400 rounded-full"></div> High-performance compute and storage systems</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-400 rounded-full"></div> Low-latency access through local infrastructure</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-400 rounded-full"></div> Integrated disaster recovery & real-time failover</li>
              </ul>
            </Reveal>

            {/* Security & Compliance */}
            <Reveal direction="up" delay={300} className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -z-10 group-hover:bg-purple-500/20 transition-colors"></div>
              <Shield className="w-10 h-10 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Security and Compliance Embedded</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Security and compliance are not separate features but foundational elements embedded at every layer of the platform.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400 rounded-full"></div> End-to-end encryption & Multi-factor authentication</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400 rounded-full"></div> Continuous monitoring and threat detection</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400 rounded-full"></div> Immutable data storage and audit trails</li>
              </ul>
            </Reveal>

            {/* Scalability */}
            <Reveal direction="up" delay={450} className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full -z-10 group-hover:bg-orange-500/20 transition-colors"></div>
              <Cpu className="w-10 h-10 text-orange-400 mb-6" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Scalability and Future Readiness</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Built to evolve with your organization, supporting workload growth without needing to redesign infrastructure.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-orange-400 rounded-full"></div> Scalable infrastructure aligned with workload growth</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-orange-400 rounded-full"></div> Integration with hybrid and multi-environments</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-orange-400 rounded-full"></div> Support for AI and data-intensive workloads</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 10. BUSINESS IMPACT ================= */}
      <section className="py-24 bg-[#14477B] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">Delivering Measurable Value Across Operations</h2>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto mb-16">
              By adopting the Bichuten platform, organizations transition from fragmented systems to a structured, secure, and scalable digital environment.
            </p>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {[
              "Greater control over data and infrastructure",
              "Improved security and reduced risk exposure",
              "Simplified operations and reduced complexity",
              "Faster response times and improved performance",
              "Enhanced compliance and audit readiness"
            ].map((impact, i) => (
              <Reveal key={i} delay={i * 100} className="bg-[#0B79BF]/20 border border-[#0B79BF]/50 rounded-full px-6 py-4 flex items-center gap-3 backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white tracking-wide">{impact}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 11. TRANSITION SECTION ================= */}
      <section className="py-32 relative bg-[#0a1426]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">Explore the Platform in Depth</h2>
              <p className="text-gray-400">The Bichuten platform is built on a modular architecture with clearly defined layers and components. Explore the sections below:</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Technology Architecture", href: "/platform/architecture" },
              { title: "Infrastructure Layer", href: "/platform/infrastructure" },
              { title: "Communication Layer", href: "/platform/communication" },
              { title: "Identity and Access", href: "/platform/identity" },
              { title: "Security & Encryption", href: "/platform/security" },
              { title: "Compliance and Audit", href: "/platform/audit" },
              { title: "Integrated Ecosystem", href: "/platform/ecosystem" }
            ].map((link, i) => (
              <Reveal key={i} delay={i * 50}>
                <a 
                  href={link.href} 
                  className="group block h-full glass-panel p-6 text-center hover:bg-[#0B79BF]/20 hover:border-[#0B79BF]/50 transition-all duration-300"
                >
                  <h4 className="font-bold text-gray-300 group-hover:text-white text-sm tracking-wide uppercase transition-colors">{link.title}</h4>
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

export default PlatformOverview;