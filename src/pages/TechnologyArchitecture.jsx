import React, { useEffect, useRef, useState } from 'react';
import { 
  Server, Shield, Key, Cloud, AppWindow, ArrowRight, 
  Activity, Database, Network, Cpu, Zap, MapPin, 
  CheckCircle, Lock, Repeat
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

const TechnologyArchitecture = () => {
  return (
    <div className="min-h-screen bg-[#060d1a] text-gray-300 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          @keyframes circuitFlow {
            0% { stroke-dashoffset: 1000; }
            100% { stroke-dashoffset: 0; }
          }
          .animate-circuit {
            stroke-dasharray: 20 15;
            animation: circuitFlow 40s linear infinite;
          }
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float { animation: floatSlow 6s ease-in-out infinite; }
          
          /* Isometric 3D Layer Styling */
          .perspective-container { perspective: 1200px; transform-style: preserve-3d; }
          .iso-layer {
            transform: rotateX(55deg) rotateZ(-45deg);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            transform-style: preserve-3d;
          }
          .iso-group:hover .iso-layer-1 { transform: rotateX(55deg) rotateZ(-45deg) translateZ(160px); }
          .iso-group:hover .iso-layer-2 { transform: rotateX(55deg) rotateZ(-45deg) translateZ(80px); }
          .iso-group:hover .iso-layer-3 { transform: rotateX(55deg) rotateZ(-45deg) translateZ(0px); }
          .iso-group:hover .iso-layer-4 { transform: rotateX(55deg) rotateZ(-45deg) translateZ(-80px); }
          .iso-group:hover .iso-layer-5 { transform: rotateX(55deg) rotateZ(-45deg) translateZ(-160px); }
          
          .glass-panel {
            background: rgba(20, 71, 123, 0.05);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(11, 121, 191, 0.15);
            box-shadow: inset 0 0 20px rgba(11, 121, 191, 0.02);
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-40 pb-32 min-h-[85vh] flex flex-col justify-center border-b border-white/5 overflow-hidden">
        {/* Animated Background Grid & Glows */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#0B79BF]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 glass-panel rounded-full mb-8 border border-[#0B79BF]/30">
              <Cpu className="w-4 h-4 text-[#0B79BF] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-blue-200">Technology Architecture</span>
            </div>
          </Reveal>
          
          <Reveal delay={150}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-white mb-6 leading-[0.9]">
              A Modular, Layered Architecture for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] to-[#4da6e7]">
                Secure & Sovereign Infrastructure
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-xl md:text-2xl font-light text-blue-100/80 max-w-4xl mx-auto mb-6 leading-relaxed">
              The Bichuten Digital Infrastructure Platform is built on a structured, multi-layered architecture that integrates compute, security, identity, communication, and compliance into a unified and scalable system.
            </p>
            <p className="text-sm font-bold text-[#0B79BF] uppercase tracking-wider mb-10">
              Designed to deliver high performance, strong security, and regulatory alignment across mission-critical environments.
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="group bg-[#0B79BF] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(11,121,191,0.5)] flex items-center justify-center gap-3">
                Request Technical Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="/platform/overview" className="glass-panel hover:bg-white/10 text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 border border-[#0B79BF]/30 hover:border-[#0B79BF]/60 flex items-center justify-center">
                Explore Platform Overview
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 2 & 3. OVERVIEW & 3D ARCHITECTURE DIAGRAM ================= */}
      <section className="py-32 relative bg-[#0a1426]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid xl:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <Reveal direction="right">
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">A Unified and Layered System Architecture</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                The Bichuten platform is designed using a modular, layered architecture that separates critical functions into distinct layers while maintaining tight integration across the system.
              </p>
              <div className="glass-panel p-6 rounded-xl mb-8">
                <p className="text-sm text-blue-100/90 leading-relaxed">
                  Each layer is responsible for a specific capability and operates within a controlled framework that ensures:
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Isolation of workloads and functions",
                    "Consistent enforcement of security policies",
                    "Scalable deployment across environments",
                    "Seamless communication between layers"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                      <div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full shadow-[0_0_8px_#0B79BF]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-gray-400">
                This architecture enables organizations to deploy, manage, and scale their digital infrastructure without compromising on security, compliance, or performance.
              </p>
            </Reveal>

            {/* Interactive 3D Diagram */}
            <Reveal direction="left" delay={200} className="perspective-container h-[600px] flex items-center justify-center group iso-group cursor-crosshair">
              <div className="relative w-full max-w-lg">
                {[
                  { name: "Application Layer", icon: AppWindow, class: "iso-layer-1", color: "border-blue-300", bg: "bg-blue-400/10" },
                  { name: "Identity & Access Layer", icon: Key, class: "iso-layer-2", color: "border-[#4da6e7]", bg: "bg-[#4da6e7]/10" },
                  { name: "Security & Encryption", icon: Shield, class: "iso-layer-3", color: "border-purple-500", bg: "bg-purple-500/10" },
                  { name: "Cloud & Virtualization", icon: Cloud, class: "iso-layer-4", color: "border-[#0B79BF]", bg: "bg-[#0B79BF]/10" },
                  { name: "Infrastructure Layer", icon: Server, class: "iso-layer-5", color: "border-[#14477B]", bg: "bg-[#14477B]/30" },
                ].map((layer, i) => (
                  <div key={i} className={`absolute inset-0 flex items-center justify-center iso-layer ${layer.class}`}>
                    <div className={`w-full h-40 ${layer.bg} border-2 ${layer.color} backdrop-blur-md flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors hover:bg-white/10`}>
                       <layer.icon className={`w-8 h-8 mb-2 opacity-80 text-white`} />
                       <span className="font-bebas text-2xl tracking-widest text-white drop-shadow-md">
                         {layer.name}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Hint text */}
              <div className="absolute bottom-0 right-0 text-[#0B79BF] text-xs font-bold tracking-widest uppercase flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 animate-pulse" /> Hover to expand layers
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 4-8. THE 5 LAYERS DEEP DIVE (CASCADING GRID) ================= */}
      <section className="py-24 bg-[#060d1a] relative border-y border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-8">
            {[
              {
                title: "Infrastructure Foundation",
                icon: Server,
                desc: "Provides the physical and virtual foundation of the platform, including compute, storage, and networking resources.",
                components: ["High-performance compute clusters", "Scalable storage systems", "Redundant networking architecture", "Energy-efficient data centers"],
                capabilities: ["High availability & uptime", "Low latency for local workloads", "Geo-distributed deployment", "Fault tolerance & redundancy"],
                outcome: "A stable and scalable foundation capable of supporting mission-critical applications and high-volume data processing."
              },
              {
                title: "Cloud & Virtualization",
                icon: Cloud,
                desc: "Abstracts the underlying infrastructure, enabling flexible deployment of workloads across private and hybrid environments.",
                components: ["Virtual machines & containers", "Private & hybrid cloud environments", "Resource orchestration", "Multi-environment deployment"],
                capabilities: ["Dynamic resource allocation", "Workload portability", "Scalability based on demand", "External environment integration"],
                outcome: "Organizations gain flexibility in deploying applications while maintaining control over infrastructure and data."
              },
              {
                title: "Security & Encryption",
                icon: Shield,
                desc: "Implemented as a dedicated layer that operates across all components, ensuring data and systems remain protected at all times.",
                components: ["End-to-end encryption mechanisms", "Key management systems", "Hardware Security Modules (HSM)", "Data protection frameworks"],
                capabilities: ["Encryption at rest and in transit", "Secure key storage lifecycle", "Protection against unauthorized access", "Defense against cyber threats"],
                outcome: "A secure digital environment where all data and interactions are protected through consistent security controls."
              },
              {
                title: "Identity & Access Control",
                icon: Key,
                desc: "Governs how users, systems, and applications interact with the platform.",
                components: ["Identity & Access Management (IAM)", "Multi-factor authentication (MFA)", "Role-based access control (RBAC)", "Privileged access management"],
                capabilities: ["Centralized identity governance", "Controlled access across layers", "Secure authentication mechanisms", "Audit trails for all access events"],
                outcome: "Every interaction within the platform is authenticated, authorized, and traceable."
              },
              {
                title: "Application Environment",
                icon: AppWindow,
                desc: "Hosts enterprise, government, and SaaS applications that operate on top of the platform.",
                components: ["Enterprise applications", "Government systems", "Financial platforms", "SaaS environments"],
                capabilities: ["High availability for workloads", "Integration with platform services", "Secure execution environments", "Scalable application deployment"],
                outcome: "Applications operate within a secure, high-performance environment aligned with compliance requirements."
              }
            ].map((layer, index) => (
              <Reveal key={index} delay={index * 100} className="glass-panel p-8 md:p-10 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0B79BF]/5 rounded-bl-[100%] pointer-events-none group-hover:bg-[#0B79BF]/10 transition-colors"></div>
                
                <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">
                  {/* Title & Desc */}
                  <div className="xl:w-1/3">
                    <layer.icon className="w-12 h-12 text-[#0B79BF] mb-6" />
                    <h3 className="text-3xl font-bebas text-white tracking-wide mb-4">{layer.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{layer.desc}</p>
                    <div className="bg-[#14477B]/30 border-l-2 border-[#0B79BF] p-4 text-xs text-blue-100">
                      <strong className="text-white tracking-widest uppercase mb-1 block">Outcome:</strong>
                      {layer.outcome}
                    </div>
                  </div>

                  {/* Components & Capabilities */}
                  <div className="xl:w-2/3 grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-[#0B79BF] text-sm tracking-widest uppercase mb-4 border-b border-white/10 pb-2">Key Components</h4>
                      <ul className="space-y-3">
                        {layer.components.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                            <div className="mt-1.5 w-1 h-1 bg-white/50 rounded-full flex-shrink-0"></div> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0B79BF] text-sm tracking-widest uppercase mb-4 border-b border-white/10 pb-2">Capabilities</h4>
                      <ul className="space-y-3">
                        {layer.capabilities.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-[#0B79BF] flex-shrink-0" /> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 9 & 10. CROSS-LAYER INTEGRATION & DATA FLOW (VISUAL) ================= */}
      <section className="py-32 relative bg-[#0a1426] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* SVG Interactive Data Flow Diagram */}
            <Reveal direction="right" className="relative h-[600px] hidden lg:block border border-white/5 rounded-2xl bg-[#060d1a] p-8 shadow-2xl">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px rgba(11,121,191,0.5))' }}>
                {/* Horizontal Flow Lines */}
                <path d="M 100 150 Q 250 150 400 300 T 700 450" fill="none" stroke="#0B79BF" strokeWidth="2" className="animate-circuit opacity-50" />
                <path d="M 100 450 Q 250 450 400 300 T 700 150" fill="none" stroke="#4da6e7" strokeWidth="2" className="animate-circuit opacity-50" />
                {/* Vertical Governance Lines */}
                <line x1="400" y1="100" x2="400" y2="500" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="5 5" />
              </svg>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-48 h-48 rounded-full border border-[#0B79BF] flex items-center justify-center bg-[#14477B]/20 backdrop-blur-md animate-float">
                 <div className="text-center">
                   <Lock className="w-8 h-8 text-white mx-auto mb-2" />
                   <p className="text-[10px] font-bold text-[#0B79BF] tracking-widest uppercase">Governance Engine</p>
                 </div>
              </div>

              <div className="absolute top-10 left-10 glass-panel p-4 rounded text-center"><Database className="w-6 h-6 text-[#0B79BF] mx-auto mb-1"/><span className="text-xs">Storage</span></div>
              <div className="absolute bottom-10 left-10 glass-panel p-4 rounded text-center"><Server className="w-6 h-6 text-[#0B79BF] mx-auto mb-1"/><span className="text-xs">Compute</span></div>
              <div className="absolute top-10 right-10 glass-panel p-4 rounded text-center"><Network className="w-6 h-6 text-[#0B79BF] mx-auto mb-1"/><span className="text-xs">Network</span></div>
              <div className="absolute bottom-10 right-10 glass-panel p-4 rounded text-center"><AppWindow className="w-6 h-6 text-[#0B79BF] mx-auto mb-1"/><span className="text-xs">Application</span></div>
            </Reveal>

            {/* Text Content */}
            <div className="space-y-16">
              <Reveal direction="left">
                <h2 className="text-4xl font-bebas text-white tracking-wide mb-6">Seamless Interaction Across All Layers</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  A key strength of the architecture is the integration between layers. Each layer communicates through controlled interfaces, ensuring consistent policies and secure data flow.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-300">
                  <div className="glass-panel p-4 rounded border-l-2 border-[#0B79BF]">Unified policy enforcement</div>
                  <div className="glass-panel p-4 rounded border-l-2 border-[#0B79BF]">Secure data flow</div>
                  <div className="glass-panel p-4 rounded border-l-2 border-[#0B79BF]">Centralized monitoring</div>
                  <div className="glass-panel p-4 rounded border-l-2 border-[#0B79BF]">Standardized interfaces</div>
                </div>
              </Reveal>

              <Reveal direction="left" delay={200}>
                <h2 className="text-4xl font-bebas text-white tracking-wide mb-6">Controlled Data Movement & Governance</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Data flows through defined pathways governed strictly by identity, security, and compliance controls. Organizations maintain full visibility over how data is accessed, processed, and stored.
                </p>
                <ul className="space-y-3">
                  {[
                    "Data is encrypted during transmission and storage",
                    "Access is controlled through identity-based policies",
                    "Activities are continuously monitored and logged",
                    "Data remains strictly within jurisdictional boundaries"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-blue-100/80">
                      <Activity className="w-4 h-4 text-[#0B79BF]" /> {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 11, 12, 13. RESILIENCE, SCALABILITY & SOVEREIGNTY (GRID) ================= */}
      <section className="py-24 bg-[#060d1a] relative border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Resilience */}
            <Reveal delay={0} className="glass-panel p-8 rounded-2xl flex flex-col hover:bg-white/5 transition-colors group">
              <div className="flex justify-between items-center mb-6">
                <Repeat className="w-10 h-10 text-red-400" />
                <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                   <div className="w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
                   <div className="w-3 h-3 bg-red-400 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Designed for Continuity</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6">
                Built-in resilience mechanisms ensure operations remain uninterrupted during failures, cyber incidents, or infrastructure disruptions.
              </p>
              <ul className="space-y-2 text-xs font-medium text-gray-300">
                <li className="border-b border-white/5 pb-2">Geo-distributed infrastructure</li>
                <li className="border-b border-white/5 pb-2">Real-time data replication</li>
                <li className="border-b border-white/5 pb-2">Automated failover systems</li>
                <li className="pt-1">Isolated recovery environments</li>
              </ul>
            </Reveal>

            {/* Scalability */}
            <Reveal delay={150} className="glass-panel p-8 rounded-2xl flex flex-col hover:bg-white/5 transition-colors group">
              <div className="flex justify-between items-center mb-6">
                <Zap className="w-10 h-10 text-green-400" />
                <div className="flex items-end gap-1 h-8 opacity-50 group-hover:opacity-100 transition-opacity">
                   <div className="w-2 h-4 bg-green-400 rounded-t"></div>
                   <div className="w-2 h-6 bg-green-400 rounded-t"></div>
                   <div className="w-2 h-8 bg-green-400 rounded-t"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Built for Growth</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6">
                The modular architecture allows organizations to scale infrastructure and services dynamically based on workload demand.
              </p>
              <ul className="space-y-2 text-xs font-medium text-gray-300">
                <li className="border-b border-white/5 pb-2">Horizontal and vertical scaling</li>
                <li className="border-b border-white/5 pb-2">Optimized resource utilization</li>
                <li className="border-b border-white/5 pb-2">Low-latency local infrastructure</li>
                <li className="pt-1">Support for high-throughput workloads</li>
              </ul>
            </Reveal>

            {/* Sovereignty */}
            <Reveal delay={300} className="glass-panel p-8 rounded-2xl flex flex-col hover:bg-white/5 transition-colors group">
              <div className="flex justify-between items-center mb-6">
                <MapPin className="w-10 h-10 text-[#0B79BF]" />
                <Shield className="w-8 h-8 text-[#0B79BF] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Jurisdiction-Controlled</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6">
                Unlike global cloud models, the architecture operates exclusively within Nepal’s jurisdiction, ensuring high trust and operational control.
              </p>
              <ul className="space-y-2 text-xs font-medium text-gray-300">
                <li className="border-b border-white/5 pb-2">Strict Data residency within Nepal</li>
                <li className="border-b border-white/5 pb-2">Reduced foreign regulatory risks</li>
                <li className="border-b border-white/5 pb-2">Alignment with national policies</li>
                <li className="pt-1">Greater control over operations</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      

    </div>
  );
};

export default TechnologyArchitecture;