import React, { useEffect, useRef, useState } from 'react';
import { 
  Building2, Landmark, Wifi, Briefcase, 
  ShieldCheck, Lock, CheckCircle, ArrowRight, Server, Globe, Activity
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

const Industries = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL STYLES --- */}
      <style>
        {`
          .pattern-grid-light {
            background-image: radial-gradient(rgba(11, 121, 191, 0.15) 1px, transparent 1px);
            background-size: 32px 32px;
          }
          .glass-card-light {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 1);
            box-shadow: 0 10px 40px -10px rgba(20, 71, 123, 0.08);
          }
          @keyframes floatSoft {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
          .animate-float-soft {
            animation: floatSoft 6s ease-in-out infinite;
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-32 pb-24 lg:min-h-[70vh] flex flex-col justify-center border-b border-gray-200 bg-white overflow-hidden">
        <div className="absolute inset-0 pattern-grid-light opacity-60 z-0"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-gradient-to-bl from-blue-100 via-white to-transparent rounded-full blur-[100px] z-0 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-tr from-green-50 via-white to-transparent rounded-full blur-[100px] z-0 pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full mb-8">
                <Building2 className="w-4 h-4 text-[#EA4335]" />
                <span className="text-xs font-bold tracking-widest uppercase text-gray-800">Industries We Serve</span>
              </div>
            </Reveal>
            
            <Reveal delay={150}>
              <h1 className="text-5xl lg:text-7xl font-bebas tracking-wide text-[#14477B] mb-6 leading-[1.05]">
                Infrastructure Built for <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14477B] via-[#0B79BF] to-[#4285F4]">Critical Industries</span>
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-lg md:text-xl font-light text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                Delivering sovereign, compliant, and high-performance solutions for sectors where reliability is non-negotiable.
              </p>
            </Reveal>

            <Reveal delay={450}>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#34A853]" />
                  <span className="text-sm font-bold text-gray-700">Financial Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#34A853]" />
                  <span className="text-sm font-bold text-gray-700">Government</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#34A853]" />
                  <span className="text-sm font-bold text-gray-700">Telecommunications</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#34A853]" />
                  <span className="text-sm font-bold text-gray-700">Enterprise</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= 2. INDUSTRY GRID ================= */}
      <section className="py-24 bg-slate-50 relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-16 lg:space-y-24">
            
            {/* 1. Banking & Finance */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal direction="right" className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0B79BF] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  <Landmark className="w-4 h-4"/> Regulated Sector
                </div>
                <h2 className="text-3xl lg:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
                  Banking & Financial Services
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Financial institutions require infrastructure that guarantees zero data leakage, absolute sovereignty, and compliance with strict national regulations. We provide environments purpose-built for core banking systems, payment gateways, and high-frequency transactions.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#34A853] mt-1 shrink-0"/>
                    <span className="text-gray-700 font-medium">Audit-ready infrastructure compliant with NRB regulations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-[#34A853] mt-1 shrink-0"/>
                    <span className="text-gray-700 font-medium">End-to-end encryption for transactional data.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Server className="w-5 h-5 text-[#34A853] mt-1 shrink-0"/>
                    <span className="text-gray-700 font-medium">High-availability Disaster Recovery (DR) centers.</span>
                  </li>
                </ul>
                <a href="/contact" className="inline-flex items-center gap-2 font-bold text-[#14477B] hover:text-[#0B79BF] uppercase tracking-wider text-sm transition-colors group">
                  Discuss Financial Infrastructure <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Reveal>
              <Reveal direction="left" delay={200} className="order-1 lg:order-2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 aspect-[4/3]">
                  <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop" alt="Banking Infrastructure" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14477B]/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                     <p className="text-white font-medium italic">"Ensuring absolute security and uptime for core banking operations."</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* 2. Government & Public Sector */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal direction="right" className="order-1 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 aspect-[4/3]">
                  <img src="https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?q=80&w=1200&auto=format&fit=crop" alt="Government Infrastructure" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14477B]/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                     <p className="text-white font-medium italic">"Protecting citizen data through absolute national sovereignty."</p>
                  </div>
                </div>
              </Reveal>
              <Reveal direction="left" delay={200} className="order-2 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#EA4335] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  <Building2 className="w-4 h-4"/> Public Sector
                </div>
                <h2 className="text-3xl lg:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
                  Government & Defense
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  National security and citizen data require infrastructure that is fully sovereign, secure, and resilient. Bichuten provides the localized environments necessary to run e-governance platforms, intelligence systems, and public records.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-[#34A853] mt-1 shrink-0"/>
                    <span className="text-gray-700 font-medium">100% data sovereignty and localized hosting.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#34A853] mt-1 shrink-0"/>
                    <span className="text-gray-700 font-medium">Protection against foreign surveillance and data extraction.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-[#34A853] mt-1 shrink-0"/>
                    <span className="text-gray-700 font-medium">Secure, air-gapped communication systems.</span>
                  </li>
                </ul>
                <a href="/contact" className="inline-flex items-center gap-2 font-bold text-[#14477B] hover:text-[#0B79BF] uppercase tracking-wider text-sm transition-colors group">
                  Discuss Sovereign Hosting <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Reveal>
            </div>

            {/* 3. Telecom & ISPs */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal direction="right" className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0B79BF] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  <Wifi className="w-4 h-4"/> Critical Backbone
                </div>
                <h2 className="text-3xl lg:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
                  Telecommunications & ISPs
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  As the backbone of connectivity, telecom providers require ultra-low latency, vast bandwidth, and absolute uptime. We offer the physical and network infrastructure required to route data efficiently and scale seamlessly.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-[#34A853] mt-1 shrink-0"/>
                    <span className="text-gray-700 font-medium">Ultra-low latency network configurations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Server className="w-5 h-5 text-[#34A853] mt-1 shrink-0"/>
                    <span className="text-gray-700 font-medium">High-density colocation for core routing equipment.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#34A853] mt-1 shrink-0"/>
                    <span className="text-gray-700 font-medium">Redundant power and cooling systems (99.995% uptime).</span>
                  </li>
                </ul>
                <a href="/contact" className="inline-flex items-center gap-2 font-bold text-[#14477B] hover:text-[#0B79BF] uppercase tracking-wider text-sm transition-colors group">
                  Discuss Network Infrastructure <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Reveal>
              <Reveal direction="left" delay={200} className="order-1 lg:order-2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 aspect-[4/3]">
                  <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop" alt="Telecom Infrastructure" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14477B]/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                     <p className="text-white font-medium italic">"Powering the backbone of national connectivity."</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* 4. Enterprise Organizations */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal direction="right" className="order-1 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 aspect-[4/3]">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" alt="Enterprise Corporate" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14477B]/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                     <p className="text-white font-medium italic">"Reliable foundations for massive enterprise scale."</p>
                  </div>
                </div>
              </Reveal>
              <Reveal direction="left" delay={200} className="order-2 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-[#34A853] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  <Briefcase className="w-4 h-4"/> Scale & Growth
                </div>
                <h2 className="text-3xl lg:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
                  Enterprise Organizations
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Large-scale enterprises need a dependable foundation for ERP systems, customer databases, and daily operations. Bichuten ensures that enterprise IT teams can focus on growth rather than managing physical infrastructure.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Server className="w-5 h-5 text-[#34A853] mt-1 shrink-0"/>
                    <span className="text-gray-700 font-medium">Scalable environments for large ERP and CRM systems.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-[#34A853] mt-1 shrink-0"/>
                    <span className="text-gray-700 font-medium">Secure backup and disaster recovery planning.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#34A853] mt-1 shrink-0"/>
                    <span className="text-gray-700 font-medium">Dedicated support and operational SLAs.</span>
                  </li>
                </ul>
                <a href="/contact" className="inline-flex items-center gap-2 font-bold text-[#14477B] hover:text-[#0B79BF] uppercase tracking-wider text-sm transition-colors group">
                  Discuss Enterprise Solutions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Reveal>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 3. VALUE PROPOSITION ================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-4xl mx-auto bg-[#14477B] rounded-3xl p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0B79BF] rounded-full blur-[120px] opacity-40 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
              
              <h3 className="text-3xl md:text-5xl font-bebas tracking-wide text-white mb-6 relative z-10">
                Why Industry Leaders Choose Bichuten
              </h3>
              <p className="text-blue-100 text-lg leading-relaxed mb-12 max-w-2xl mx-auto relative z-10">
                We don't just provide space; we provide certainty. Our infrastructure is engineered to remove risk from your operations.
              </p>

              <div className="grid md:grid-cols-3 gap-8 relative z-10 text-left">
                <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <Globe className="w-8 h-8 text-[#34A853] mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Zero Foreign Dependency</h4>
                  <p className="text-sm text-blue-100 leading-relaxed">Operate without the risks of offshore providers, ensuring full control.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <ShieldCheck className="w-8 h-8 text-[#34A853] mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Compliance-Ready</h4>
                  <p className="text-sm text-blue-100 leading-relaxed">Built from day one to align with strict national and industry standards.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <Server className="w-8 h-8 text-[#34A853] mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Mission-Critical Uptime</h4>
                  <p className="text-sm text-blue-100 leading-relaxed">Redundant systems ensuring 99.995% availability for critical workloads.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 4. FINAL CTA ================= */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-[#f8fafc] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(11,121,191,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal direction="up">
            <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">Discuss Your Industry Requirements</h2>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
              Partner with Bichuten to design, deploy, and scale secure infrastructure tailored to your sector's regulatory and operational needs.
            </p>
            <p className="text-lg font-bold text-[#0B79BF] mb-10">
              Led by expertise. Built for long-term reliability.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href="/contact" className="group bg-[#14477B] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#0B79BF] hover:-translate-y-1 hover:shadow-xl rounded-xl w-full sm:w-auto border border-transparent">
                Request a Consultation
              </a>
              <a href="/contact" className="group bg-white text-[#14477B] px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-md rounded-xl border border-gray-200 w-full sm:w-auto">
                Talk to an Expert
              </a>
              <a href="/platform" className="group bg-transparent text-gray-600 px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:text-[#0B79BF] hover:-translate-y-1 rounded-xl border border-transparent w-full sm:w-auto">
                Explore Platform
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-bold text-gray-700 mb-8 flex-wrap">
              <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#34A853]"/> Specialized industry expertise</span>
              <span className="flex items-center gap-2"><Lock className="w-5 h-5 text-[#34A853]"/> Secure discussion</span>
              <span className="flex items-center gap-2"><Server className="w-5 h-5 text-[#34A853]"/> Enterprise-grade systems</span>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-2">Our team will guide you from planning to deployment with clarity and precision.</p>
              <p className="text-xs text-[#14477B] uppercase tracking-widest font-bold">Reliable systems. Trusted leadership. Long-term confidence.</p>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default Industries;
