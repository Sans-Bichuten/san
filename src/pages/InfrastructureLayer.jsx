import React, { useEffect, useRef, useState } from 'react';
import { 
  Server, Shield, Cloud, ArrowRight, Activity, Database, 
  Network, Cpu, Zap, MapPin, CheckCircle, Repeat,
  Lock, Settings, Gauge, Building2, HardDrive
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

const InfrastructureLayer = () => {
  return (
    <div className="min-h-screen bg-[#060d1a] text-gray-300 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          @keyframes flowData {
            0% { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
          }
          .animate-flow {
            stroke-dasharray: 10 10;
            animation: flowData 2s linear infinite;
          }
          @keyframes pulseSoft {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          .animate-pulse-soft {
            animation: pulseSoft 4s ease-in-out infinite;
          }
          .glass-panel {
            background: rgba(20, 71, 123, 0.05);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(11, 121, 191, 0.15);
            box-shadow: inset 0 0 20px rgba(11, 121, 191, 0.02);
          }
          .tech-grid {
            background-image: 
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 50px 50px;
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION (WITH BG IMAGE SIMULATING VIDEO) ================= */}
      <section className="relative pt-40 pb-32 min-h-[90vh] flex flex-col justify-center border-b border-white/10 overflow-hidden">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop" 
            alt="Data Center Server Rack" 
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060d1a] via-[#060d1a]/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a] to-transparent"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 glass-panel rounded-full mb-8 border border-[#0B79BF]/30 backdrop-blur-md">
                <Server className="w-4 h-4 text-[#0B79BF]" />
                <span className="text-xs font-bold tracking-widest uppercase text-blue-200">Layer 1: Core Foundation</span>
              </div>
            </Reveal>
            
            <Reveal delay={150}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-white mb-6 leading-[0.9] drop-shadow-xl">
                Enterprise-Grade Infrastructure <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] to-[#4da6e7]">
                  Built for Sovereign Control
                </span>
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-xl md:text-2xl font-light text-blue-100/90 max-w-3xl mb-6 leading-relaxed">
                Bichuten’s Infrastructure Layer delivers high-performance, secure, and jurisdiction-controlled compute, storage, and networking—designed to support mission-critical workloads within Nepal.
              </p>
              <div className="border-l-4 border-[#0B79BF] pl-4 py-1 mb-10">
                <p className="text-sm font-bold text-white uppercase tracking-wider">
                  A resilient foundation for digital operations where performance, availability, and compliance are non-negotiable.
                </p>
              </div>
            </Reveal>

            <Reveal delay={450}>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group bg-[#0B79BF] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(11,121,191,0.5)] flex items-center justify-center gap-3">
                  Request Infrastructure Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="/platform/architecture" className="glass-panel hover:bg-white/10 text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 border border-[#0B79BF]/30 hover:border-[#0B79BF]/60 flex items-center justify-center backdrop-blur-md">
                  Explore Architecture
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= 2. OVERVIEW & 12. WHY IT MATTERS ================= */}
      <section className="py-24 relative bg-[#0a1426]">
        <div className="absolute inset-0 tech-grid opacity-50 z-0"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <Reveal direction="right">
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">The Foundation of Secure Digital Operations</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                The Infrastructure Layer forms the core of the Bichuten Platform, providing the physical and virtual resources required to power all applications, services, and systems.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "High availability and uptime",
                  "Low-latency performance",
                  "Secure and controlled environments",
                  "Compliance with regulatory requirements"
                ].map((req, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-[#0B79BF] flex-shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-[#14477B]/20 border border-[#0B79BF]/30 rounded-lg">
                <p className="text-sm text-blue-100 leading-relaxed">
                  Unlike traditional hosting models, Bichuten’s infrastructure is built as part of a sovereign ecosystem, ensuring that all compute and data operations remain strictly within Nepal’s jurisdiction.
                </p>
              </div>
            </Reveal>

            {/* Why it Matters Card */}
            <Reveal direction="left" delay={200} className="glass-panel p-10 rounded-2xl relative overflow-hidden border-t-4 border-t-[#0B79BF]">
              <div className="absolute -right-10 -bottom-10 opacity-10"><Building2 className="w-64 h-64 text-[#0B79BF]" /></div>
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-6">From Dependency to Control</h3>
              <p className="text-gray-400 mb-8 text-sm leading-relaxed relative z-10">
                Traditional infrastructure models often rely on external providers, leading to limited control, higher latency, and increased risk. Bichuten enables organizations to:
              </p>
              <ul className="space-y-4 relative z-10">
                {[
                  "Maintain full control over infrastructure and data",
                  "Reduce reliance on foreign cloud platforms",
                  "Improve performance through localized deployment",
                  "Ensure strict compliance with national regulatory requirements"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white font-medium">
                    <div className="w-1.5 h-1.5 mt-1.5 bg-[#0B79BF] rounded-full shadow-[0_0_8px_#0B79BF]"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 3. CORE INFRASTRUCTURE CAPABILITIES ================= */}
      <section className="py-32 relative bg-[#060d1a] border-y border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">Built for Performance, Reliability, and Scale</h2>
              <p className="text-[#0B79BF] font-bold tracking-widest uppercase text-sm mb-6">A high-performance environment capable of supporting critical operations without compromise.</p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: "High-Performance Compute",
                desc: "Advanced compute environments designed to support enterprise applications, financial systems, and data-intensive workloads.",
                features: ["Dedicated and virtualized compute", "Optimized processing for high-demand", "Support for AI & analytics workloads"]
              },
              {
                icon: HardDrive,
                title: "Scalable Storage Systems",
                desc: "Secure and flexible storage solutions designed for maximum performance, durability, and immutable archiving.",
                features: ["Structured and unstructured data", "High-speed access with low latency", "Redundant storage architecture"]
              },
              {
                icon: Network,
                title: "Advanced Networking",
                desc: "A robust networking backbone enabling secure, encrypted, and highly efficient data transfer across regions.",
                features: ["High-speed 100G connectivity", "Redundant network paths", "Optimized BGP routing for low latency"]
              }
            ].map((cap, i) => (
              <Reveal key={i} delay={i * 150} className="glass-panel p-8 rounded-2xl group hover:bg-[#0B79BF]/5 transition-all duration-300">
                <cap.icon className="w-12 h-12 text-[#0B79BF] mb-6 transform group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">{cap.title}</h3>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed">{cap.desc}</p>
                <ul className="space-y-3">
                  {cap.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="w-1 h-1 bg-[#0B79BF] rounded-full"></div> {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 4. DATA CENTER INFRASTRUCTURE (VISUAL FEATURE) ================= */}
      <section className="py-24 relative bg-[#0a1426] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop" 
              alt="Hardware Circuit" 
              className="w-full h-full object-cover opacity-10 mix-blend-color-dodge"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#060d1a] to-transparent"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <Reveal direction="right">
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">Tier-Grade, Secure & Energy-Efficient Facilities</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Bichuten’s infrastructure is deployed across strategically located data centers in Nepal, designed to meet the highest standards of reliability, performance, and sustainability.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Tier-grade architecture",
                  "Redundant power & cooling",
                  "24/7 monitoring & operations",
                  "Strict physical access control"
                ].map((feature, i) => (
                  <div key={i} className="glass-panel p-4 rounded flex items-center gap-3 border-l-2 border-[#0B79BF]">
                    <Shield className="w-5 h-5 text-[#0B79BF]" />
                    <span className="text-sm font-bold text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Nepal Advantage Highlight */}
            <Reveal direction="left" delay={200} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-[#0B79BF]/20 rounded-2xl blur-xl animate-pulse-soft"></div>
              <div className="glass-panel p-10 rounded-2xl relative border border-green-500/30 bg-[#060d1a]/80 backdrop-blur-xl">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50">
                       <Zap className="w-7 h-7 text-green-400" />
                    </div>
                    <div>
                       <h3 className="text-3xl font-bebas text-white tracking-widest">The Nepal Advantage</h3>
                       <p className="text-green-400 text-xs font-bold tracking-widest uppercase">100% Renewable Energy</p>
                    </div>
                 </div>
                 <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    By leveraging Nepal's unique geographical and resource advantages, we deliver world-class infrastructure that is environmentally optimized.
                 </p>
                 <ul className="space-y-3">
                   <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle className="w-4 h-4 text-green-400"/> Powered exclusively by hydroelectric energy</li>
                   <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle className="w-4 h-4 text-green-400"/> Naturally cool climate drastically increases efficiency</li>
                   <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle className="w-4 h-4 text-green-400"/> Reduced operational costs and environmental impact</li>
                 </ul>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 6. DISASTER RECOVERY (WITH ANIMATED SVG FLOW) ================= */}
      <section className="py-32 relative bg-[#060d1a]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">Designed for Resilience & Uninterrupted Operations</h2>
              <p className="text-gray-400">The Infrastructure Layer includes built-in disaster recovery and business continuity capabilities to ensure that systems remain operational under all conditions.</p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* SVG DR Flow Diagram */}
            <Reveal delay={200} className="lg:col-span-8 relative h-[400px] glass-panel rounded-2xl flex items-center justify-center p-8 overflow-hidden">
               <svg viewBox="0 0 400 400" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px rgba(11,121,191,0.5))' }}>
  <path d="M 80 80 Q 200 200 320 80" fill="none" stroke="#0B79BF" strokeWidth="2" className="animate-dash-flow opacity-60" />
  <path d="M 80 320 Q 200 200 320 320" fill="none" stroke="#0B79BF" strokeWidth="2" className="animate-dash-flow opacity-60" />
  <path d="M 200 40 L 200 360" fill="none" stroke="#34A853" strokeWidth="2" className="animate-dash-flow opacity-80" />
  <path d="M 40 200 L 360 200" fill="none" stroke="#34A853" strokeWidth="2" className="animate-dash-flow opacity-80" />
</svg>
               
               <div className="w-full flex justify-between items-center relative z-10 px-10">
                 {/* Primary DC */}
                 <div className="text-center">
                   <div className="w-32 h-32 rounded-full border-2 border-[#0B79BF] bg-[#14477B]/40 backdrop-blur-md flex items-center justify-center mb-4 mx-auto relative">
                     <div className="absolute inset-0 rounded-full bg-[#0B79BF]/20 animate-ping" style={{ animationDuration: '3s' }}></div>
                     <Server className="w-12 h-12 text-white relative z-10" />
                   </div>
                   <h4 className="font-bold text-white text-sm tracking-wide uppercase">Primary Zone</h4>
                   <p className="text-xs text-[#0B79BF]">Kathmandu Hub</p>
                 </div>

                 {/* Sync Icon */}
                 <div className="bg-[#060d1a] p-3 rounded-full border border-white/10 z-10">
                    <Repeat className="w-6 h-6 text-gray-400" />
                 </div>

                 {/* DR DC */}
                 <div className="text-center">
                   <div className="w-32 h-32 rounded-full border-2 border-gray-600 bg-gray-800/40 backdrop-blur-md flex items-center justify-center mb-4 mx-auto">
                     <Server className="w-12 h-12 text-gray-400" />
                   </div>
                   <h4 className="font-bold text-white text-sm tracking-wide uppercase">DR / Failover</h4>
                   <p className="text-xs text-gray-500">Pokhara Node</p>
                 </div>
               </div>
               
               <div className="absolute bottom-6 text-center w-full">
                 <p className="text-xs font-bold tracking-widest text-[#0B79BF] uppercase bg-[#060d1a] inline-block px-4 py-1 rounded-full border border-[#0B79BF]/30">Active-Standby Geo-Replication</p>
               </div>
            </Reveal>

            {/* DR Text */}
            <Reveal direction="left" className="lg:col-span-4 space-y-6">
              <div className="glass-panel p-6 rounded-xl border-l-4 border-[#0B79BF]">
                <Activity className="w-6 h-6 text-[#0B79BF] mb-3" />
                <h4 className="font-bold text-white mb-2">Real-Time Data Replication</h4>
                <p className="text-xs text-gray-400">Continuous sync ensures zero data loss between primary and disaster recovery environments.</p>
              </div>
              <div className="glass-panel p-6 rounded-xl border-l-4 border-[#4da6e7]">
                <Settings className="w-6 h-6 text-[#4da6e7] mb-3" />
                <h4 className="font-bold text-white mb-2">Automated Failover</h4>
                <p className="text-xs text-gray-400">Instant routing of traffic to the backup node during primary infrastructure disruption.</p>
              </div>
              <div className="glass-panel p-6 rounded-xl border-l-4 border-gray-600">
                <Shield className="w-6 h-6 text-gray-400 mb-3" />
                <h4 className="font-bold text-white mb-2">Crisis-Ready Environments</h4>
                <p className="text-xs text-gray-400">Isolated backup systems completely resilient to ransomware and physical disasters.</p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 5, 7, 8, 9, 10. CAPABILITIES GRID ================= */}
      <section className="py-24 relative bg-[#0a1426] border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Colocation & Cloud */}
            <Reveal delay={0} className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
              <Cloud className="w-8 h-8 text-[#0B79BF] mb-6 group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-4">Colocation & Sovereign Cloud</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-3">Secure hosting of customer-owned infrastructure or locally hosted scalable cloud environments designed for regulated workloads.</p>
              <span className="text-xs font-bold text-[#0B79BF] uppercase tracking-wider">Flexible Deployment →</span>
            </Reveal>

            {/* Managed Services */}
            <Reveal delay={100} className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
              <Settings className="w-8 h-8 text-[#0B79BF] mb-6 group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-4">Managed Infrastructure Services</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-3">End-to-end management including provisioning, 24/7 monitoring, optimization, and security, reducing your operational burden.</p>
              <span className="text-xs font-bold text-[#0B79BF] uppercase tracking-wider">Turnkey Operations →</span>
            </Reveal>

            {/* Performance & Latency */}
            <Reveal delay={200} className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
              <Gauge className="w-8 h-8 text-[#0B79BF] mb-6 group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-4">Performance & Latency Advantage</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-3">Local deployment within Nepal drastically reduces latency, enabling faster data processing and superior UX compared to offshore systems.</p>
              <span className="text-xs font-bold text-[#0B79BF] uppercase tracking-wider">Optimized Speed →</span>
            </Reveal>

            {/* Security */}
            <Reveal delay={300} className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
              <Lock className="w-8 h-8 text-[#0B79BF] mb-6 group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-4">Security at the Base Level</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-3">Physical and network security by design. Controlled data center access, network segmentation, and continuous infrastructure monitoring.</p>
              <span className="text-xs font-bold text-[#0B79BF] uppercase tracking-wider">Protected Foundation →</span>
            </Reveal>

            {/* Scalability */}
            <Reveal delay={400} className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
              <Activity className="w-8 h-8 text-[#0B79BF] mb-6 group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-4">Scalability and Flexibility</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-3">Dynamically scales based on organizational needs. On-demand resource allocation supports growing workloads without physical limitations.</p>
              <span className="text-xs font-bold text-[#0B79BF] uppercase tracking-wider">Grow Without Limits →</span>
            </Reveal>

             {/* Use Cases Summary */}
             <Reveal delay={500} className="bg-gradient-to-br from-[#14477B] to-[#0a1628] p-8 rounded-2xl border border-[#0B79BF]/30 shadow-lg group">
              <Building2 className="w-8 h-8 text-white mb-6 group-hover:-translate-y-1 transition-transform" />
              <h3 className="text-xl font-bebas text-white tracking-wider mb-4">Mission-Critical Use Cases</h3>
              <ul className="space-y-2 text-xs text-blue-100/90 font-medium">
                 <li>• Banking & Financial Transactions</li>
                 <li>• Government Citizen Services</li>
                 <li>• Telecom Backend Systems</li>
                 <li>• Enterprise ERP Systems</li>
                 <li>• AI & Data Analytics Workloads</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 13. TRANSITION SECTION ================= */}
      <section className="py-32 relative bg-[#060d1a]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">Explore the Platform Layers</h2>
              <p className="text-gray-400">The Infrastructure Layer is part of a broader integrated platform designed to deliver secure and compliant digital operations.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Communication Layer", href: "/platform/communication" },
              { title: "Identity and Access", href: "/platform/identity" },
              { title: "Security & Encryption", href: "/platform/security" },
              { title: "Compliance and Audit", href: "/platform/audit" }
            ].map((link, i) => (
              <Reveal key={i} delay={i * 100}>
                <a 
                  href={link.href} 
                  className="group block h-full glass-panel p-6 text-center hover:bg-[#0B79BF]/20 hover:border-[#0B79BF]/50 transition-all duration-300"
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

export default InfrastructureLayer;