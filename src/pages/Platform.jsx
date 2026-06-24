import React, { useEffect, useRef, useState } from 'react';
import { 
  Server, Shield, Lock, Layers, Network, FileText, 
  CheckCircle, ArrowRight, Activity, Database, Key, Box, Cpu
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
    right: '-translate-x-12'
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${translateClasses[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Platform = () => {
  return (
    <div className="min-h-screen bg-[#060d1a] text-gray-300 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS --- */}
      <style>
        {`
          @keyframes dataFlow {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
          }
          .bg-animated-grid {
            background-image: 
              linear-gradient(to right, rgba(11, 121, 191, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(11, 121, 191, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
            animation: dataFlow 15s linear infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-delayed { animation: float 7s ease-in-out 2s infinite; }
          
          /* Isometric 3D Layer Styling */
          .perspective-container { perspective: 1000px; }
          .iso-layer {
            transform: rotateX(60deg) rotateZ(-45deg);
            transition: all 0.5s ease;
            transform-style: preserve-3d;
          }
          .iso-group:hover .iso-layer {
            transform: rotateX(50deg) rotateZ(-40deg) translateZ(20px);
          }
          
          /* Glassmorphism utility */
          .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-40 pb-32 min-h-[85vh] flex items-center border-b border-white/10">
        <div className="absolute inset-0 bg-animated-grid z-0"></div>
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#0B79BF] rounded-full blur-[180px] opacity-20 z-0 animate-pulse"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-8">
              <Layers className="w-4 h-4 text-[#0B79BF]" />
              <span className="text-xs font-bold tracking-widest uppercase text-blue-200">
                Core Architecture
              </span>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-white mb-6 leading-[0.9]">
              A Unified Platform for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] to-[#4da6e7]">
                Sovereign Digital Infrastructure
              </span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-xl md:text-2xl font-light text-blue-100/80 max-w-4xl mx-auto mb-8 leading-relaxed">
              Bichuten Data Vault delivers a fully integrated platform that combines infrastructure, communication, identity, security, and compliance into a single, secure ecosystem—built for organizations operating in regulated and mission-critical environments.
            </p>
            <p className="text-sm font-medium text-[#0B79BF] max-w-2xl mx-auto mb-12 tracking-wide uppercase">
              Designed to eliminate fragmentation, reduce dependency on external platforms, and enable complete control over digital operations within Nepal.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-[#0B79BF] hover:bg-blue-500 text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(11,121,191,0.4)] hover:shadow-[0_0_40px_rgba(11,121,191,0.6)]">
                Explore Architecture
              </button>
              <button className="glass-panel hover:bg-white/10 text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300">
                Request a Demo
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 2. PLATFORM OVERVIEW & 8. WHY IT MATTERS ================= */}
      <section className="py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <Reveal direction="right">
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">
                One Platform. <span className="text-[#0B79BF]">Complete Digital Control.</span>
              </h2>
              <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                <p>
                  Modern organizations rely on multiple systems to manage infrastructure, communication, security, and compliance. This fragmented approach creates complexity, increases risk, and limits visibility.
                </p>
                <p>
                  Bichuten Data Vault addresses these challenges by delivering a unified platform where all critical components are integrated into a single, cohesive system.
                </p>
              </div>
              <ul className="mt-8 space-y-4">
                {[
                  "End-to-end visibility across systems",
                  "Centralized control over data and access",
                  "Consistent security and compliance enforcement",
                  "Seamless integration between infrastructure layers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-[#0B79BF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Interactive "Fragmentation vs Unified" Graphic */}
            <Reveal direction="left" delay={200} className="relative h-[500px]">
              {/* Fragmented background nodes */}
              <div className="absolute inset-0 opacity-20">
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className={`absolute w-16 h-16 border border-red-500/50 rounded flex items-center justify-center top-[${Math.random()*80}%] left-[${Math.random()*80}%]`}>
                     <Box className="w-6 h-6 text-red-500" />
                   </div>
                 ))}
              </div>
              
              {/* Unified Core Graphic */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative w-80 h-80 glass-panel rounded-full flex items-center justify-center animate-float shadow-[0_0_50px_rgba(11,121,191,0.2)]">
                  <div className="absolute inset-2 border border-[#0B79BF]/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-8 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                  <Shield className="w-20 h-20 text-[#0B79BF] drop-shadow-[0_0_15px_rgba(11,121,191,0.8)]" />
                  
                  {/* Orbiting Elements */}
                  <div className="absolute top-0 -mt-6 bg-[#14477B] p-3 rounded-xl border border-[#0B79BF]/50"><Server className="w-6 h-6 text-white"/></div>
                  <div className="absolute bottom-0 -mb-6 bg-[#14477B] p-3 rounded-xl border border-[#0B79BF]/50"><Key className="w-6 h-6 text-white"/></div>
                  <div className="absolute left-0 -ml-6 bg-[#14477B] p-3 rounded-xl border border-[#0B79BF]/50"><Activity className="w-6 h-6 text-white"/></div>
                  <div className="absolute right-0 -mr-6 bg-[#14477B] p-3 rounded-xl border border-[#0B79BF]/50"><FileText className="w-6 h-6 text-white"/></div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 3. CORE PLATFORM CAPABILITIES ================= */}
      <section className="py-24 bg-[#0a1426] border-y border-white/5 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">Built to Power Secure Operations</h2>
              <p className="text-gray-400">The Bichuten platform integrates multiple layers that work together to deliver a complete digital infrastructure solution.</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Server, title: "Infrastructure", desc: "High-performance compute, storage, and networking environments designed for reliability and jurisdiction-controlled operations." },
              { icon: Network, title: "Communication", desc: "Secure encrypted communication systems including email, messaging, and collaboration tools, hosted fully within a controlled environment." },
              { icon: Key, title: "Identity & Access", desc: "Centralized identity management with multi-factor authentication, RBAC, and strict governance of user interactions." },
              { icon: Lock, title: "Security & Encryption", desc: "End-to-end encryption, key management systems, and hardware security modules to protect sensitive data." },
              { icon: FileText, title: "Compliance & Audit", desc: "Integrated monitoring, reporting, archival, and audit systems to ensure continuous regulatory alignment and traceability." },
              { icon: Activity, title: "Resilience", desc: "Integrated disaster recovery, backup systems, and failover environments ensuring uninterrupted operations." }
            ].map((cap, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="glass-panel p-8 rounded-xl h-full hover:bg-white/5 transition-all duration-300 group border-t-4 border-t-transparent hover:border-t-[#0B79BF]">
                  <cap.icon className="w-10 h-10 text-[#0B79BF] mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bebas text-white tracking-wider mb-3">{cap.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{cap.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. PLATFORM ARCHITECTURE (CSS 3D LAYERS) ================= */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-[#060d1a] to-[#0a1628]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid xl:grid-cols-2 gap-16 items-center">
            
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">Modular, Layered, and Scalable by Design</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                The Bichuten platform is built on a modular architecture that allows organizations to scale and adapt. The architecture is structured into distinct layers, each responsible for a specific function, while remaining tightly integrated.
              </p>
              <div className="space-y-4 mb-8">
                {["Flexibility in deployment", "Scalability across workloads", "Isolation of critical functions", "Enhanced security through controlled interaction"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#0B79BF] rounded-full"></div>
                    <span className="text-sm font-bold tracking-wide text-gray-300 uppercase">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* CSS Isometric 3D Layer Visual */}
            <Reveal delay={300} className="perspective-container h-[600px] flex items-center justify-center group iso-group">
              <div className="relative w-full max-w-md">
                
                {[
                  { name: "Application Layer", color: "border-blue-300", bg: "bg-blue-400/10", z: "z-50", offset: "-translate-y-48 group-hover:-translate-y-64" },
                  { name: "Identity & Access Layer", color: "border-[#4da6e7]", bg: "bg-[#4da6e7]/10", z: "z-40", offset: "-translate-y-24 group-hover:-translate-y-32" },
                  { name: "Security & Encryption Layer", color: "border-[#0B79BF]", bg: "bg-[#0B79BF]/10", z: "z-30", offset: "translate-y-0" },
                  { name: "Cloud & Virtualization", color: "border-[#14477B]", bg: "bg-[#14477B]/20", z: "z-20", offset: "translate-y-24 group-hover:translate-y-32" },
                  { name: "Infrastructure Layer", color: "border-gray-600", bg: "bg-gray-800/40", z: "z-10", offset: "translate-y-48 group-hover:translate-y-64" },
                ].map((layer, i) => (
                  <div key={i} className={`absolute inset-0 flex items-center justify-center iso-layer ${layer.z} ${layer.offset}`}>
                    <div className={`w-full h-48 ${layer.bg} border-2 ${layer.color} backdrop-blur-md flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}>
                       <span className="font-bebas text-2xl tracking-widest text-white drop-shadow-md">
                         {layer.name}
                       </span>
                    </div>
                  </div>
                ))}
                
              </div>
            </Reveal>
            
          </div>
        </div>
      </section>

      {/* ================= 6. SOVEREIGN DESIGN PRINCIPLES ================= */}
      <section className="py-24 bg-[#0a1426] border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bebas text-center text-white tracking-wide mb-16">
              Designed for Control, Compliance, and Continuity
            </h2>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Data Sovereignty", desc: "All data is hosted and managed within Nepal, ensuring jurisdictional control and alignment with national policies." },
              { title: "Compliance-First Approach", desc: "Designed to meet regulatory, audit, and governance requirements from the ground up, not as an afterthought." },
              { title: "Security by Design", desc: "Security is embedded across every layer of the platform, from infrastructure to application-level access." },
              { title: "Performance Optimization", desc: "Local infrastructure and optimized architecture deliver low latency and high availability for critical systems." }
            ].map((prin, i) => (
              <Reveal key={i} delay={i * 100} className="flex gap-6 glass-panel p-6 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#14477B] flex items-center justify-center border border-[#0B79BF]">
                    <Shield className="w-6 h-6 text-[#0B79BF]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bebas text-white tracking-wider mb-2">{prin.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{prin.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    {/* ================= 9. TRANSITION TO SUBPAGES (LINK GRID) ================= */}
      <section className="py-32 relative bg-[#060d1a]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">Explore the Platform in Detail</h2>
              <p className="text-gray-400">The Bichuten Platform is structured across multiple layers. Dive deeper to understand specific capabilities.</p>
            </Reveal>
          </div>
 
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Platform Overview", href: "/platform/overview" },
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

export default Platform;