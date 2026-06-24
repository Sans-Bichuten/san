import React, { useEffect, useRef, useState } from 'react';
import { 
  Network, Link2, ShieldCheck, Server, Cpu, 
  ArrowRight, CheckCircle, Globe, Building2, 
  Landmark, Activity, PlusCircle, Hexagon, Zap,
  Briefcase
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

const PartnersEcosystem = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          .pattern-hex-light {
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0.03' fill='%2314477B' fill-rule='evenodd'/%3E%3C/svg%3E");
          }
          .glass-light {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(11, 121, 191, 0.15);
            box-shadow: 0 10px 40px -10px rgba(20, 71, 123, 0.08);
          }
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spinSlow 30s linear infinite;
          }
          @keyframes orbitOrbit {
            0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
          }
          .animate-orbit-1 { animation: orbitOrbit 15s linear infinite; }
          .animate-orbit-2 { animation: orbitOrbit 15s linear infinite; animation-delay: -5s; }
          .animate-orbit-3 { animation: orbitOrbit 15s linear infinite; animation-delay: -10s; }
        `}
      </style>

      {/* ================= 1. HERO SECTION (Light & Connected Theme) ================= */}
      <section className="relative pt-40 pb-32 min-h-[85vh] flex flex-col justify-center border-b border-gray-200 bg-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pattern-hex-light z-0"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-blue-100/60 via-white to-transparent rounded-full blur-[100px] z-0 pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full mb-8">
                <Network className="w-4 h-4 text-[#0B79BF]" />
                <span className="text-xs font-bold tracking-widest uppercase text-gray-700">Partner Ecosystem</span>
              </div>
            </Reveal>
            
            <Reveal delay={150}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-[#14477B] mb-6 leading-[1.05]">
                Building a Strong Digital <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] to-[#34A853]">
                  Infrastructure Ecosystem
                </span>
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-lg md:text-xl font-light text-gray-600 mb-8 leading-relaxed">
                Bichuten collaborates with technology providers, infrastructure partners, and enterprise organizations to deliver secure, scalable, and compliant digital infrastructure solutions.
              </p>
              <div className="inline-block bg-blue-50 border border-blue-100 px-8 py-3 rounded-lg mb-10 shadow-sm">
                <p className="text-sm font-bold text-[#14477B] uppercase tracking-wider">
                  A connected ecosystem designed to enable innovation, performance, and long-term digital growth.
                </p>
              </div>
            </Reveal>

            {/* Placeholder Partner Logos Array */}
            <Reveal delay={450} className="pt-8 border-t border-gray-100 flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className="h-10 w-32 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-400 border border-gray-300">
                   PARTNER LOGO
                 </div>
               ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= 2. OVERVIEW (Split Layout) ================= */}
      <section className="py-24 relative bg-slate-50 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <Reveal direction="right" className="relative h-[500px] w-full hidden lg:block">
              {/* Abstract Interactive Ecosystem Graphic */}
              <div className="absolute inset-0 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 flex items-center justify-center">
                 <div className="absolute inset-0 pattern-hex-light opacity-30"></div>
                 
                 <div className="relative w-full h-full flex items-center justify-center">
                    {/* Central Node */}
                    <div className="absolute w-24 h-24 bg-[#14477B] rounded-full z-20 flex items-center justify-center shadow-xl border-4 border-white">
                      <Hexagon className="w-10 h-10 text-white" />
                    </div>
                    {/* Orbit Ring */}
                    <div className="absolute w-64 h-64 border-2 border-dashed border-gray-300 rounded-full animate-spin-slow"></div>
                    
                    {/* Orbiting Nodes */}
                    <div className="absolute w-12 h-12 bg-[#0B79BF] rounded-full shadow-lg z-30 flex items-center justify-center animate-orbit-1 border-2 border-white">
                      <Cpu className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute w-12 h-12 bg-[#34A853] rounded-full shadow-lg z-30 flex items-center justify-center animate-orbit-2 border-2 border-white">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute w-12 h-12 bg-[#EA4335] rounded-full shadow-lg z-30 flex items-center justify-center animate-orbit-3 border-2 border-white">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                 </div>
              </div>
              <div className="absolute -bottom-8 -right-8 glass-light p-6 rounded-2xl z-20 shadow-xl border-t-4 border-t-[#0B79BF]">
                 <Link2 className="w-10 h-10 text-[#0B79BF] mb-2" />
                 <p className="font-bebas text-2xl text-gray-900 tracking-wider">Interconnected</p>
                 <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Robust Infrastructure</p>
              </div>
            </Reveal>

            <Reveal direction="left">
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">A Collaborative Approach to Infrastructure</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Modern digital infrastructure cannot operate in isolation. It requires a resilient network of partners across technology, connectivity, security, and operations.
              </p>
              
              <div className="space-y-6 mb-8">
                 <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2">Bichuten Ecosystem Enables:</h4>
                 <ul className="space-y-4">
                   <li className="flex items-center gap-3 text-sm text-gray-700 bg-white p-3 rounded-lg shadow-sm border border-gray-100"><div className="p-1.5 bg-blue-50 rounded-full"><Cpu className="w-4 h-4 text-[#0B79BF]"/></div> Integration with leading technologies</li>
                   <li className="flex items-center gap-3 text-sm text-gray-700 bg-white p-3 rounded-lg shadow-sm border border-gray-100"><div className="p-1.5 bg-green-50 rounded-full"><Zap className="w-4 h-4 text-[#34A853]"/></div> Reliable connectivity & infra support</li>
                   <li className="flex items-center gap-3 text-sm text-gray-700 bg-white p-3 rounded-lg shadow-sm border border-gray-100"><div className="p-1.5 bg-red-50 rounded-full"><ShieldCheck className="w-4 h-4 text-[#EA4335]"/></div> Enhanced security & compliance capabilities</li>
                   <li className="flex items-center gap-3 text-sm text-gray-700 bg-white p-3 rounded-lg shadow-sm border border-gray-100"><div className="p-1.5 bg-yellow-50 rounded-full"><Activity className="w-4 h-4 text-[#FBBC05]"/></div> Continuous innovation and scalability</li>
                 </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-[#14477B] font-medium">
                This approach ensures organizations benefit from a robust, interconnected environment.
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 3. ECOSYSTEM FRAMEWORK (Layered Visual Grid) ================= */}
      <section className="py-24 bg-white relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">A Multi-Layered Partner Network</h2>
              <p className="text-gray-600 text-lg">Bichuten’s ecosystem is precisely structured across multiple layers, each contributing natively to the overall strength of the platform.</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cpu, title: "Technology Partners", desc: "Providers of infrastructure technologies, cloud platforms, and enterprise solutions.", color: "text-[#0B79BF]", border: "border-[#0B79BF]" },
              { icon: Network, title: "Network & Connectivity", desc: "Telecom operators and network providers enabling high-speed and reliable connectivity.", color: "text-[#34A853]", border: "border-[#34A853]" },
              { icon: ShieldCheck, title: "Security & Compliance", desc: "Organizations supporting cybersecurity, encryption, and strict regulatory alignment.", color: "text-[#EA4335]", border: "border-[#EA4335]" },
              { icon: Building2, title: "Enterprise & Industry", desc: "Organizations leveraging Bichuten infrastructure to deliver critical services across industries.", color: "text-[#FBBC05]", border: "border-[#FBBC05]" }
            ].map((layer, i) => (
              <Reveal key={i} delay={i * 100} className="bg-slate-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all text-center flex flex-col items-center group relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${layer.bg} group-hover:h-2 transition-all`}></div>
                <div className={`w-14 h-14 rounded-full bg-white shadow-sm border ${layer.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                   <layer.icon className={`w-6 h-6 ${layer.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{layer.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow">{layer.desc}</p>
                <div className="w-full flex justify-center gap-2 mt-auto opacity-50 grayscale">
                   {/* Mini placeholder logos for each card */}
                   <div className="w-12 h-6 bg-gray-200 rounded text-[8px] flex items-center justify-center font-bold text-gray-400">LOGO</div>
                   <div className="w-12 h-6 bg-gray-200 rounded text-[8px] flex items-center justify-center font-bold text-gray-400">LOGO</div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 4, 5, 6. DETAILED PARTNER LAYERS (Bento Layout) ================= */}
      <section className="py-24 bg-slate-50 relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Tech Partners */}
            <Reveal direction="up" delay={0} className="lg:col-span-8 bg-white p-10 rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow border-t-4 border-t-[#0B79BF]">
              <div className="flex items-center gap-4 mb-6">
                <Cpu className="w-10 h-10 text-[#0B79BF]" />
                <h2 className="text-3xl font-bebas text-[#14477B] tracking-wide">Technology Partners</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Technology partnerships enable Bichuten to deliver modern, scalable, and secure infrastructure solutions.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                 <ul className="space-y-3">
                   <li className="flex items-center gap-3 text-sm font-medium text-gray-800"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Cloud and virtualization technologies</li>
                   <li className="flex items-center gap-3 text-sm font-medium text-gray-800"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Data storage and compute systems</li>
                 </ul>
                 <ul className="space-y-3">
                   <li className="flex items-center gap-3 text-sm font-medium text-gray-800"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Automation & orchestration platforms</li>
                   <li className="flex items-center gap-3 text-sm font-medium text-gray-800"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Enterprise software integration</li>
                 </ul>
              </div>
            </Reveal>

            {/* Network Partners */}
            <Reveal direction="up" delay={150} className="lg:col-span-4 bg-white p-10 rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow border-t-4 border-t-[#34A853]">
              <Network className="w-10 h-10 text-[#34A853] mb-6" />
              <h2 className="text-3xl font-bebas text-[#14477B] tracking-wide mb-4">Network & Connectivity</h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Collaborating with network providers to ensure absolute reliability and high-speed data transmission.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-medium text-gray-800"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full"></div> High-speed transmission</li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-800"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full"></div> Redundant network paths</li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-800"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full"></div> Low-latency connectivity</li>
              </ul>
            </Reveal>

            {/* Security Partners */}
            <Reveal direction="up" delay={0} className="lg:col-span-5 bg-white p-10 rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow border-t-4 border-t-[#EA4335]">
              <ShieldCheck className="w-10 h-10 text-[#EA4335] mb-6" />
              <h2 className="text-3xl font-bebas text-[#14477B] tracking-wide mb-4">Security & Compliance</h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Security and compliance are critical for operating in regulated environments. We integrate with leaders to enhance protection.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-medium text-gray-800"><div className="w-1.5 h-1.5 bg-[#EA4335] rounded-full"></div> Advanced cybersecurity solutions</li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-800"><div className="w-1.5 h-1.5 bg-[#EA4335] rounded-full"></div> Encryption & key management</li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-800"><div className="w-1.5 h-1.5 bg-[#EA4335] rounded-full"></div> Compliance frameworks</li>
              </ul>
            </Reveal>

            {/* Enterprise Partners */}
            <Reveal direction="up" delay={150} className="lg:col-span-7 bg-white p-10 rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow border-t-4 border-t-[#FBBC05] bg-[url('https://www.transparenttextures.com/patterns/connected.png')] bg-opacity-5">
              <div className="flex items-center gap-4 mb-6">
                <Building2 className="w-10 h-10 text-[#FBBC05]" />
                <h2 className="text-3xl font-bebas text-[#14477B] tracking-wide">Enterprise & Industry Ecosystem</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed max-w-xl">
                Bichuten directly collaborates with enterprise organizations and industry stakeholders to deliver highly tailored infrastructure solutions.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Banking & Finance", "Government", "Telecom & ISPs", "Enterprise Orgs", "Digital Platforms"].map((ind, i) => (
                  <span key={i} className="bg-[#FBBC05]/10 border border-[#FBBC05]/30 text-gray-800 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-sm">
                    {ind}
                  </span>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 8 & 9. INTEGRATION & BENEFITS (Dark Corporate Theme) ================= */}
      <section className="py-0 flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Seamless Integration */}
        <div className="w-full lg:w-1/2 bg-[#14477B] p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden shadow-xl z-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <Reveal className="relative z-10">
            <Server className="w-10 h-10 text-[#4da6e7] mb-6" />
            <h2 className="text-4xl font-bebas text-white tracking-wide mb-6">Seamless Integration Across the Ecosystem</h2>
            <p className="text-blue-100 mb-8 leading-relaxed text-sm">
              All partners and ecosystem components are integrated deeply into the Bichuten platform, ensuring consistent performance, security, and governance without operational silos.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-sm text-white"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Infrastructure and cloud environments</li>
              <li className="flex items-center gap-4 text-sm text-white"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Secure communication systems</li>
              <li className="flex items-center gap-4 text-sm text-white"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Identity and access management</li>
              <li className="flex items-center gap-4 text-sm text-white"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Compliance and proactive monitoring</li>
            </ul>
          </Reveal>
        </div>

        {/* Partner Benefits */}
        <div className="w-full lg:w-1/2 bg-[#040814] p-12 lg:p-24 flex flex-col justify-center relative">
          <Reveal className="relative z-10" delay={200}>
            <Briefcase className="w-10 h-10 text-[#0B79BF] mb-6" />
            <h2 className="text-4xl font-bebas text-white tracking-wide mb-6">Creating Value Through Collaboration</h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-sm">
              Bichuten’s ecosystem approach delivers compound benefits to both technological partners and end customers.
            </p>
            <div className="space-y-8">
               <div>
                 <h4 className="text-xs font-bold text-[#0B79BF] uppercase tracking-widest border-b border-white/10 pb-2 mb-3">For Partners</h4>
                 <ul className="space-y-2 text-sm text-gray-300">
                   <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Access to a sovereign infrastructure platform</li>
                   <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Opportunities for deep technical integration</li>
                 </ul>
               </div>
               <div>
                 <h4 className="text-xs font-bold text-[#0B79BF] uppercase tracking-widest border-b border-white/10 pb-2 mb-3">For Customers</h4>
                 <ul className="space-y-2 text-sm text-gray-300">
                   <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Access to a broader range of enterprise capabilities</li>
                   <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Faster deployment and enhanced security</li>
                 </ul>
               </div>
            </div>
          </Reveal>
        </div>

      </section>

      {/* ================= 10. FUTURE VISION (Clean Centered Layout) ================= */}
      <section className="py-24 bg-white relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <Reveal>
            <Globe className="w-16 h-16 text-[#0B79BF] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">Expanding the Infrastructure Network</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Bichuten continues to rapidly expand its ecosystem to support emerging technologies and future digital requirements. An evolving ecosystem that supports long-term digital transformation.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {["AI & Data-Driven Infra", "Advanced Cyber Frameworks", "Cross-Border Digital Infra", "Scalable Hybrid Environments"].map((item, i) => (
              <Reveal key={i} delay={i * 100} className="bg-slate-50 border border-gray-200 p-6 rounded-2xl shadow-sm hover:border-[#0B79BF] transition-colors">
                <span className="font-bold text-gray-900 text-sm">{item}</span>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

     

    </div>
  );
};

export default PartnersEcosystem;