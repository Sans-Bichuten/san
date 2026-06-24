import React, { useEffect, useRef, useState } from 'react';
import { 
  Server, MapPin, Activity, Wifi, Leaf, ShieldCheck, 
  Layers, Zap, CheckCircle, ArrowRight, Database, 
  CloudLightning, Lock, ArrowUpRight,Settings
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

const Infrastructure = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Handle sticky tab scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'data-centers', 'locations', 'network', 'sustainability'];
      const scrollY = window.scrollY + 250; // Offset for sticky headers
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveTab(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          @keyframes dashFlow {
            to { stroke-dashoffset: -40; }
          }
          .animate-dash-flow {
            stroke-dasharray: 10 10;
            animation: dashFlow 2s linear infinite;
          }
          @keyframes floatIcon {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: floatIcon 6s ease-in-out infinite;
          }
          .dark-glass {
            background: rgba(4, 8, 20, 0.85);
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
          .pattern-grid-light {
            background-image: radial-gradient(#0B79BF 1px, transparent 1px);
            background-size: 30px 30px;
            opacity: 0.1;
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION (Dark Corporate Theme) ================= */}
      <section className="relative pt-40 pb-32 min-h-[90vh] flex flex-col justify-center bg-[#040814] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop" 
            alt="Data Center Racks" 
            className="w-full h-full object-cover opacity-20 mix-blend-screen grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/80 to-[#14477B]/40"></div>
        </div>

        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#0B79BF]/20 rounded-full blur-[100px] z-0 animate-pulse"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 dark-glass rounded-full mb-8 border-[#0B79BF]/40 text-[#0B79BF]">
              <Server className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Bichuten Infrastructure</span>
            </div>
          </Reveal>
          
          <Reveal delay={150}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-white mb-6 leading-[0.9] drop-shadow-2xl">
              Infrastructure Built for Performance, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] via-blue-400 to-[#34A853]">
                Resilience & Sovereign Control
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-xl font-light text-blue-100/90 mb-6 leading-relaxed max-w-4xl mx-auto">
              Bichuten’s infrastructure is designed to deliver secure, high-performance, and reliable digital operations through strategically located data centers, advanced networking, and sustainable energy systems.
            </p>
            <div className="inline-block border-l-4 border-[#34A853] pl-4 py-1 mb-10 bg-white/5 rounded-r">
              <p className="text-sm font-bold text-gray-200 uppercase tracking-wider">
                A physical and digital foundation built to support mission-critical workloads within Nepal.
              </p>
            </div>
          </Reveal>

          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => scrollTo('data-centers')} className="group bg-[#0B79BF] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#14477B] shadow-[0_0_20px_rgba(11,121,191,0.4)] flex items-center justify-center gap-3 rounded">
                Explore Infrastructure <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="/contact" className="dark-glass text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:border-white/30 hover:bg-white/10 rounded flex items-center justify-center">
                Request Consultation
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= STICKY ANCHOR NAVIGATION ================= */}
      <div className="sticky top-20 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm hidden md:block">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-10 h-14">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'data-centers', label: 'Data Centers', icon: Database },
              { id: 'locations', label: 'Locations', icon: MapPin },
              { id: 'network', label: 'Network', icon: Wifi },
              { id: 'sustainability', label: 'Sustainability', icon: Leaf },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollTo(tab.id)}
                className={`text-xs font-bold tracking-widest uppercase transition-colors h-full border-b-2 flex items-center gap-2 ${
                  activeTab === tab.id ? 'border-[#0B79BF] text-[#14477B]' : 'border-transparent text-gray-500 hover:text-[#0B79BF]'
                }`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 2. OVERVIEW (Light Theme) ================= */}
      <section id="overview" className="py-24 relative bg-slate-50 border-b border-gray-200">
        <div className="absolute inset-0 pattern-grid-light"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <Reveal direction="right">
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">The Backbone of Digital Infrastructure in Nepal</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Infrastructure is the foundation of secure and reliable digital systems. Organizations require environments that ensure performance, availability, and absolute control over data and operations.
              </p>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                <h4 className="text-sm font-bold text-[#14477B] uppercase tracking-widest mb-4">A Fully Integrated Ecosystem</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 font-medium">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Tier-grade data centers</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Strategic geographic deployment</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> High-speed secure connectivity</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0B79BF] rounded-full"></div> Energy-efficient operations</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-[#0B79BF] rounded-r-lg text-sm text-gray-800 font-medium">
                This approach ensures that infrastructure is not only reliable but strictly aligned with national and organizational requirements.
              </div>
            </Reveal>

            {/* Abstract Overview Graphic */}
            <Reveal direction="left" delay={200} className="relative h-[450px] flex items-center justify-center">
               <div className="absolute w-full h-full light-glass rounded-full opacity-50 animate-pulse"></div>
               
               <div className="z-10 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-[#14477B] rounded-2xl shadow-xl flex items-center justify-center border-4 border-white transform rotate-45 z-20 relative">
                       <Server className="w-12 h-12 text-white -rotate-45" />
                    </div>
                    {/* Orbiting Elements */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#34A853] rounded-full shadow-lg flex items-center justify-center z-30 animate-float">
                       <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#0B79BF] rounded-full shadow-lg flex items-center justify-center z-30 animate-float" style={{animationDelay: '1s'}}>
                       <Wifi className="w-6 h-6 text-white" />
                    </div>
                  </div>
               </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 3. DATA CENTERS (Dark Blue Theme) ================= */}
      <section id="data-centers" className="py-24 bg-[#040814] relative border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">Tier-Grade Data Center Infrastructure</h2>
              <p className="text-gray-400 text-lg">
                Bichuten’s data centers are designed to meet the highest global standards of reliability, security, and operational efficiency.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            
            {/* Key Features */}
            <Reveal delay={0} className="dark-glass p-10 rounded-2xl border-t-4 border-t-[#0B79BF] flex flex-col h-full group hover:bg-white/5 transition-colors">
              <Settings className="w-10 h-10 text-[#0B79BF] mb-6 group-hover:rotate-90 transition-transform duration-700" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-6">Key Features</h3>
              <ul className="space-y-4 flex-grow">
                {[
                  "Tier-grade infrastructure design",
                  "Redundant power supply and backup systems",
                  "Advanced cooling systems for extreme efficiency",
                  "24/7 monitoring and full operational control",
                  "Physical security with strictly controlled access"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-5 h-5 text-[#0B79BF] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Capabilities */}
            <Reveal delay={150} className="dark-glass p-10 rounded-2xl border-t-4 border-t-[#34A853] flex flex-col h-full group hover:bg-white/5 transition-colors">
              <Activity className="w-10 h-10 text-[#34A853] mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-6">Capabilities</h3>
              <ul className="space-y-4 flex-grow">
                {[
                  "Uncompromising high availability and uptime",
                  "Resilient fault-tolerant systems",
                  "Highly secure hosting for critical workloads",
                  "Dynamically scalable infrastructure environments"
                ].map((cap, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-5 h-5 text-[#34A853] flex-shrink-0" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

          </div>
          
          <Reveal delay={300}>
            <div className="bg-[#14477B]/40 border border-[#0B79BF]/50 rounded-xl p-6 text-center shadow-lg">
              <p className="text-sm font-bold text-white uppercase tracking-widest"><span className="text-[#0B79BF]">Outcome:</span> A secure and reliable physical environment for hosting mission-critical systems.</p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 4. STRATEGIC LOCATIONS (Light Theme with Map Graphic) ================= */}
      <section id="locations" className="py-24 bg-white relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <Reveal direction="right">
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">Geographically Distributed Across Nepal</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Bichuten’s infrastructure is strategically deployed across key regions in Nepal to ensure absolute high availability, exceptionally low latency, and unshakeable operational resilience.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                 <div>
                   <h4 className="text-sm font-bold text-[#14477B] uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">Primary Locations</h4>
                   <ul className="space-y-2 text-sm text-gray-700 font-medium">
                     <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#EA4335]"/> Kathmandu (Primary Hub)</li>
                     <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#0B79BF]"/> Pokhara</li>
                     <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#0B79BF]"/> Lalitpur</li>
                     <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#0B79BF]"/> Nepalgunj</li>
                     <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#0B79BF]"/> Bhairahawa</li>
                     <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#0B79BF]"/> Biratnagar</li>
                   </ul>
                 </div>
                 <div>
                   <h4 className="text-sm font-bold text-[#14477B] uppercase tracking-widest border-b border-gray-200 pb-2 mb-4">Geographic Advantages</h4>
                   <ul className="space-y-2 text-sm text-gray-700 font-medium">
                     <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full mt-1.5"></div> Reduced latency through proximity</li>
                     <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full mt-1.5"></div> Resilience via geographic distribution</li>
                     <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full mt-1.5"></div> Enhanced disaster recovery potential</li>
                     <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-[#34A853] rounded-full mt-1.5"></div> Coverage across major economic zones</li>
                   </ul>
                 </div>
              </div>
            </Reveal>

            {/* Visual: Stylized Map Graphic */}
            <Reveal direction="left" delay={200} className="relative h-[450px] bg-blue-50 rounded-2xl border border-blue-100 shadow-inner flex items-center justify-center p-8 overflow-hidden">
               <svg viewBox="0 0 1000 500" className="w-full h-full drop-shadow-md">
                  <path 
                    d="M100,250 Q200,200 300,280 T500,250 T700,300 T900,250 L950,300 L850,400 Q700,450 500,400 T300,450 T150,350 Z" 
                    fill="#ffffff" 
                    stroke="#cbd5e1" 
                    strokeWidth="3" 
                  />
                  {/* Location Nodes */}
                  <g transform="translate(600, 320)">
                    <circle cx="0" cy="0" r="16" fill="rgba(234, 67, 53, 0.2)" className="animate-ping" />
                    <circle cx="0" cy="0" r="8" fill="#EA4335" />
                    <text x="-40" y="-15" fill="#14477B" fontSize="14" fontWeight="bold">KATHMANDU</text>
                  </g>
                  <g transform="translate(450, 300)">
                    <circle cx="0" cy="0" r="6" fill="#0B79BF" />
                    <text x="-25" y="-10" fill="#0B79BF" fontSize="12" fontWeight="bold">POKHARA</text>
                  </g>
                  <g transform="translate(620, 340)">
                    <circle cx="0" cy="0" r="5" fill="#0B79BF" />
                    <text x="10" y="5" fill="#0B79BF" fontSize="10" fontWeight="bold">LALITPUR</text>
                  </g>
                  <g transform="translate(250, 350)">
                    <circle cx="0" cy="0" r="6" fill="#0B79BF" />
                    <text x="-30" y="-10" fill="#0B79BF" fontSize="12" fontWeight="bold">NEPALGUNJ</text>
                  </g>
                  <g transform="translate(350, 400)">
                    <circle cx="0" cy="0" r="6" fill="#0B79BF" />
                    <text x="-35" y="-10" fill="#0B79BF" fontSize="12" fontWeight="bold">BHAIRAHAWA</text>
                  </g>
                  <g transform="translate(800, 380)">
                    <circle cx="0" cy="0" r="6" fill="#0B79BF" />
                    <text x="-30" y="-10" fill="#0B79BF" fontSize="12" fontWeight="bold">BIRATNAGAR</text>
                  </g>
               </svg>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 5. NETWORK & CONNECTIVITY (Dark Blue Theme + Animated SVG) ================= */}
      <section id="network" className="py-24 bg-[#040814] relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">High-Speed, Secure & Reliable Connectivity</h2>
              <p className="text-gray-400 text-lg">Bichuten’s network infrastructure is engineered to support fast, secure, and highly efficient data transfer across systems and regions.</p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Animated Routing Graphic */}
            <Reveal delay={200} className="lg:col-span-7 relative h-[400px] dark-glass rounded-2xl border border-white/10 flex items-center justify-center p-8 overflow-hidden shadow-2xl">
               <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px rgba(11,121,191,0.5))' }}>
                 <path d="M 20 20 Q 50 50 80 20" fill="none" stroke="#0B79BF" strokeWidth="2" className="animate-dash-flow opacity-60" />
                 <path d="M 20 80 Q 50 50 80 80" fill="none" stroke="#0B79BF" strokeWidth="2" className="animate-dash-flow opacity-60" />
                 <path d="M 50 10 L 50 90" fill="none" stroke="#34A853" strokeWidth="2" className="animate-dash-flow opacity-80" />
                 <path d="M 10 50 L 90 50" fill="none" stroke="#34A853" strokeWidth="2" className="animate-dash-flow opacity-80" />
               </svg>
               
               {/* Core Router */}
               <div className="relative z-10 w-24 h-24 bg-[#14477B] rounded-xl shadow-lg border-2 border-[#0B79BF] flex items-center justify-center animate-float">
                  <Wifi className="w-10 h-10 text-white" />
                  <div className="absolute inset-0 rounded-xl border-2 border-[#0B79BF] animate-ping opacity-50"></div>
               </div>

               {/* Edge Nodes */}
               <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-gray-800 rounded-lg border border-gray-600 flex items-center justify-center"><Server className="w-5 h-5 text-gray-400"/></div>
               <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-gray-800 rounded-lg border border-gray-600 flex items-center justify-center"><Server className="w-5 h-5 text-gray-400"/></div>
               <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-gray-800 rounded-lg border border-gray-600 flex items-center justify-center"><Server className="w-5 h-5 text-gray-400"/></div>
               <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gray-800 rounded-lg border border-gray-600 flex items-center justify-center"><Server className="w-5 h-5 text-gray-400"/></div>
            </Reveal>

            {/* Key Features & Capabilities */}
            <div className="lg:col-span-5 space-y-6">
              <Reveal direction="left" delay={100} className="dark-glass p-6 rounded-xl border-l-4 border-l-[#0B79BF]">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2"><Zap className="w-5 h-5 text-[#0B79BF]"/> Key Features</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• High-speed network backbone</li>
                  <li>• Redundant network paths for reliability</li>
                  <li>• Secure data transmission protocols</li>
                  <li>• Optimized BGP routing for low latency</li>
                </ul>
              </Reveal>
              <Reveal direction="left" delay={200} className="dark-glass p-6 rounded-xl border-l-4 border-l-[#34A853]">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2"><CloudLightning className="w-5 h-5 text-[#34A853]"/> Capabilities</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Seamless connectivity between data centers</li>
                  <li>• Reliable communication across all systems</li>
                  <li>• Direct support for high-volume data transfer</li>
                  <li>• Integration with enterprise & telecom networks</li>
                </ul>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 6. SUSTAINABILITY (Light/Green Nature Theme) ================= */}
      <section id="sustainability" className="py-32 relative bg-white overflow-hidden">
        {/* Abstract Nature background element */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-green-50 to-transparent rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Graphic */}
            <Reveal direction="right" className="relative h-[500px]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-green-100 z-10">
                 <img 
                   src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2000&auto=format&fit=crop" 
                   alt="Sustainable Hydroelectric Dam" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#14477B]/60 to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 light-glass p-6 rounded-2xl z-20 shadow-xl border-t-4 border-t-[#34A853] animate-float">
                 <Leaf className="w-10 h-10 text-[#34A853] mb-2" />
                 <p className="font-bebas text-2xl text-gray-900 tracking-wider">100% Green Energy</p>
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Hydroelectric Advantage</p>
              </div>
            </Reveal>

            {/* Text Content */}
            <Reveal direction="left">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-green-200">
                <Leaf className="w-4 h-4" /> Sustainable Operations
              </div>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">Sustainable Infrastructure Powered by Nature</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Bichuten directly leverages Nepal’s natural resources to deliver environmentally responsible, zero-emission infrastructure solutions without sacrificing performance.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                 <div>
                   <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3 border-b border-gray-200 pb-2">Key Elements</h4>
                   <ul className="space-y-2 text-sm text-gray-600">
                     <li>• Hydroelectric operations</li>
                     <li>• Energy-efficient designs</li>
                     <li>• Reduced carbon footprint</li>
                     <li>• Natural climate cooling</li>
                   </ul>
                 </div>
                 <div>
                   <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3 border-b border-gray-200 pb-2">Business Benefits</h4>
                   <ul className="space-y-2 text-sm text-gray-600">
                     <li>• Lower environmental impact</li>
                     <li>• Improved operational efficiency</li>
                     <li>• Cost-effective operations</li>
                     <li>• ESG Goal Alignment</li>
                   </ul>
                 </div>
              </div>

              <div className="bg-[#34A853]/10 border border-[#34A853]/30 p-4 rounded-lg text-sm text-[#2b8a44] font-medium">
                <strong>Outcome:</strong> A sustainable model that balances peak performance with deep environmental responsibility.
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 7. INFRASTRUCTURE ADVANTAGE (Grid) ================= */}
      <section className="py-24 bg-slate-50 relative border-y border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Why Infrastructure Matters</h2>
              <p className="text-gray-600 text-lg">Infrastructure is more than physical systems—it defines the reliability, security, and performance of all your digital operations.</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Lock, title: "Full Control", desc: "Absolute authority over data and internal systems.", color: "text-[#14477B]" },
              { icon: Activity, title: "High Availability", desc: "Always-on architecture for mission-critical workloads.", color: "text-[#34A853]" },
              { icon: ShieldCheck, title: "Strong Security", desc: "Deep protection at both physical and network levels.", color: "text-[#EA4335]" },
              { icon: Layers, title: "Scalable Growth", desc: "Flexible environments designed for future expansion.", color: "text-[#0B79BF]" }
            ].map((adv, i) => (
              <Reveal key={i} delay={i * 100} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-[#0B79BF] transition-all text-center group">
                <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <adv.icon className={`w-8 h-8 ${adv.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{adv.title}</h3>
                <p className="text-sm text-gray-600">{adv.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 8. INTEGRATION WITH PLATFORM (Dark Stack) ================= */}
      <section className="py-32 bg-[#040814] text-white relative border-b border-[#0B79BF]/30 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <Reveal direction="right">
              <Layers className="w-12 h-12 text-[#0B79BF] mb-6" />
              <h2 className="text-4xl md:text-5xl font-bebas tracking-wide mb-6">Infrastructure as Part of a Unified Platform</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Bichuten’s infrastructure is not a standalone product; it is fully integrated natively with our digital platform, ensuring seamless interaction across all specialized layers.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { name: "Identity & Access Control", color: "text-[#4285F4]" },
                   { name: "Security & Encryption", color: "text-[#EA4335]" },
                   { name: "Communication Systems", color: "text-[#FBBC05]" },
                   { name: "Compliance & Monitoring", color: "text-[#34A853]" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition-colors">
                     <CheckCircle className={`w-5 h-5 ${item.color} flex-shrink-0`} />
                     <span className="text-sm font-medium text-gray-200">{item.name}</span>
                   </div>
                 ))}
              </div>
            </Reveal>

            <Reveal direction="left" delay={200} className="relative h-[450px] flex items-center justify-center">
               {/* 3D Integration Stack Concept */}
               <div className="relative w-full max-w-sm">
                  <div className="absolute inset-0 flex justify-center items-center z-40 transform -translate-y-24 transition-transform hover:-translate-y-28">
                    <div className="w-full h-20 bg-[#040814]/90 border-2 border-white/20 shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex items-center justify-center transform rotate-x-12 backdrop-blur-sm rounded-xl">
                      <span className="font-bebas text-lg text-white tracking-widest opacity-50">Platform Services</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex justify-center items-center z-30 transform -translate-y-12 transition-transform hover:-translate-y-16">
                    <div className="w-full h-20 bg-[#040814]/90 border-2 border-[#0B79BF]/50 shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex items-center justify-center transform rotate-x-12 backdrop-blur-sm rounded-xl">
                      <span className="font-bebas text-lg text-[#0B79BF] tracking-widest opacity-80">Software Layers</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex justify-center items-center z-20 transition-transform hover:translate-y-4">
                    <div className="w-full h-24 bg-[#14477B] border-2 border-[#4da6e7] shadow-[0_20px_50px_rgba(11,121,191,0.6)] flex items-center justify-center transform rotate-x-12 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Database className="w-6 h-6 text-white" />
                        <span className="font-bebas text-2xl text-white tracking-widest">Base Infrastructure</span>
                      </div>
                    </div>
                  </div>
               </div>
            </Reveal>

          </div>
        </div>
      </section>


    </div>
  );
};

export default Infrastructure;