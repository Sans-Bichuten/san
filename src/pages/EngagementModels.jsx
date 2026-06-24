import React, { useEffect, useRef, useState } from 'react';
import { 
  CreditCard, Building2, Layers, RefreshCw, CheckCircle, 
  ArrowRight, ShieldCheck, Zap, Server, Activity, 
  ArrowUpRight, BarChart, SplitSquareHorizontal, ToggleLeft, ToggleRight
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

const EngagementModels = () => {
  const [compareMode, setCompareMode] = useState('all'); // 'all', 'opex', 'capex'

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          .glass-dark {
            background: rgba(4, 8, 20, 0.8);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .glass-light {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(11, 121, 191, 0.15);
          }
          @keyframes floatBalance {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(2deg); }
          }
          .animate-balance {
            animation: floatBalance 6s ease-in-out infinite;
          }
          .bg-grid-pattern {
            background-image: radial-gradient(rgba(11, 121, 191, 0.15) 1px, transparent 1px);
            background-size: 30px 30px;
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION (Mixed Dark/Light Aesthetic) ================= */}
      <section className="relative pt-40 pb-32 min-h-[90vh] flex flex-col justify-center bg-[#040814] overflow-hidden">
        {/* Background Imagery & Split Gradients */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" 
            alt="Data Analytics and Strategy" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040814] via-[#040814]/90 to-[#14477B]/60"></div>
        </div>

        {/* Floating Accent Orbs for Opex (Green) & Capex (Red) */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#34A853]/20 rounded-full blur-[100px] z-0 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#EA4335]/20 rounded-full blur-[100px] z-0 animate-pulse" style={{animationDelay: '1s'}}></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 glass-dark rounded-full mb-8 border-[#0B79BF]/40 text-[#4da6e7]">
              <SplitSquareHorizontal className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Engagement Models</span>
            </div>
          </Reveal>
          
          <Reveal delay={150}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-white mb-6 leading-[0.9]">
              Flexible Engagement Models <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34A853] via-[#0B79BF] to-[#EA4335]">
                For Modern Infrastructure
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-xl font-light text-blue-100/90 mb-6 leading-relaxed max-w-3xl mx-auto">
              Bichuten offers flexible infrastructure engagement models that align seamlessly with your financial strategy, operational requirements, and long-term digital goals.
            </p>
            <div className="inline-block border-x-4 border-[#0B79BF] px-6 py-2 mb-10 bg-white/5 rounded">
              <p className="text-sm font-bold text-gray-200 uppercase tracking-wider">
                Choose between fully managed service models or dedicated infrastructure ownership.
              </p>
            </div>
          </Reveal>

          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="group bg-[#0B79BF] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#14477B] shadow-[0_0_20px_rgba(11,121,191,0.4)] flex items-center justify-center gap-3 rounded">
                Request Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="/contact" className="glass-dark text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:border-white/30 hover:bg-white/10 rounded flex items-center justify-center">
                Speak with an Expert
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 2. OVERVIEW (Light Corporate Split) ================= */}
      <section className="py-24 relative bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Align Infrastructure with Your Business Strategy</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Organizations have different approaches to adopting digital infrastructure depending on their financial models, operational needs, and long-term objectives.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Opex Needs */}
            <Reveal direction="right" className="bg-slate-50 border border-gray-200 p-10 rounded-2xl relative overflow-hidden group hover:shadow-xl transition-all">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#34A853]"></div>
              <div className="flex justify-between items-center mb-6">
                 <CreditCard className="w-10 h-10 text-[#34A853]" />
                 <span className="text-[#34A853] text-xs font-bold uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full border border-green-200">Some Require:</span>
              </div>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium"><div className="w-2 h-2 bg-[#34A853] rounded-full"></div> Flexible, subscription-based infrastructure</li>
                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium"><div className="w-2 h-2 bg-[#34A853] rounded-full"></div> Minimal upfront investment</li>
                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium"><div className="w-2 h-2 bg-[#34A853] rounded-full"></div> Fully managed services and support</li>
              </ul>
            </Reveal>

            {/* Capex Needs */}
            <Reveal direction="left" delay={150} className="bg-slate-50 border border-gray-200 p-10 rounded-2xl relative overflow-hidden group hover:shadow-xl transition-all">
              <div className="absolute top-0 right-0 w-2 h-full bg-[#EA4335]"></div>
              <div className="flex justify-between items-center mb-6">
                 <Building2 className="w-10 h-10 text-[#EA4335]" />
                 <span className="text-[#EA4335] text-xs font-bold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-200">Others Require:</span>
              </div>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium"><div className="w-2 h-2 bg-[#EA4335] rounded-full"></div> Dedicated infrastructure environments</li>
                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium"><div className="w-2 h-2 bg-[#EA4335] rounded-full"></div> Full ownership and complete control</li>
                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium"><div className="w-2 h-2 bg-[#EA4335] rounded-full"></div> Long-term strategic asset investment</li>
              </ul>
            </Reveal>

          </div>

          <Reveal delay={300}>
            <div className="mt-12 text-center bg-[#14477B] text-white p-6 rounded-xl shadow-lg border border-[#0B79BF]/50 max-w-4xl mx-auto">
              <p className="text-lg font-medium">Bichuten provides both models, enabling organizations to choose the approach that best fits their absolute requirements.</p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 3. DCAAS / OPEX (Light, Agile Theme) ================= */}
      <section className="py-24 bg-white relative border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50 z-0"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Flow Graphic */}
            <Reveal direction="right" className="relative h-[500px] flex items-center justify-center lg:order-2">
               <div className="relative w-full max-w-md h-full flex flex-col justify-center animate-balance">
                  <div className="glass-light p-6 rounded-2xl shadow-2xl border-t-4 border-t-[#34A853] z-20 relative">
                     <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                       <h4 className="font-bebas text-2xl tracking-widest text-[#14477B]">DCaaS Dashboard</h4>
                       <div className="bg-[#34A853]/10 text-[#34A853] px-2 py-1 rounded text-xs font-bold uppercase">Active</div>
                     </div>
                     <div className="space-y-4">
                       <div className="flex justify-between items-center"><span className="text-xs text-gray-500 font-bold uppercase">Compute Load</span><span className="text-sm font-bold text-gray-900">Auto-Scaling</span></div>
                       <div className="w-full bg-gray-100 h-2 rounded"><div className="bg-[#4285F4] w-3/4 h-2 rounded animate-pulse"></div></div>
                       
                       <div className="flex justify-between items-center pt-2"><span className="text-xs text-gray-500 font-bold uppercase">Monthly Opex</span><span className="text-sm font-bold text-[#34A853]">Pay-as-you-go</span></div>
                       <div className="w-full bg-gray-100 h-2 rounded"><div className="bg-[#34A853] w-1/3 h-2 rounded"></div></div>
                     </div>
                  </div>
                  {/* Floating abstract elements */}
                  <div className="absolute top-10 -left-10 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 z-30">
                     <Zap className="w-6 h-6 text-[#FBBC05]"/> <span className="text-xs font-bold">Rapid Deployment</span>
                  </div>
                  <div className="absolute bottom-10 -right-10 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 z-30">
                     <Layers className="w-6 h-6 text-[#4285F4]"/> <span className="text-xs font-bold">Fully Managed</span>
                  </div>
               </div>
            </Reveal>

            {/* Text Content */}
            <Reveal direction="left" className="lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center"><CreditCard className="w-6 h-6 text-[#34A853]"/></div>
                <div>
                  <h3 className="text-xs font-bold text-[#34A853] uppercase tracking-widest">DCaaS (Opex Model)</h3>
                  <h2 className="text-4xl font-bebas text-gray-900 tracking-wide">Flexible & Fully Managed</h2>
                </div>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                DCaaS is a subscription-based model where organizations consume infrastructure as a service, eliminating large upfront capital investments. Bichuten manages the entire infrastructure lifecycle, freeing you to focus on core operations.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">Key Characteristics</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#34A853]"/> Pay-as-you-use pricing</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#34A853]"/> No upfront capital expense</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#34A853]"/> Scalable resources on demand</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#34A853]"/> Rapid deployment</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">Included Services</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><Layers className="w-4 h-4 text-[#0B79BF]"/> Compute, storage & network</li>
                    <li className="flex items-center gap-2"><Layers className="w-4 h-4 text-[#0B79BF]"/> Secure communication</li>
                    <li className="flex items-center gap-2"><Layers className="w-4 h-4 text-[#0B79BF]"/> Security & encryption</li>
                    <li className="flex items-center gap-2"><Layers className="w-4 h-4 text-[#0B79BF]"/> Compliance monitoring</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-gray-200">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Best Suited For:</span>
                <span className="text-sm font-medium text-[#14477B]">Growing enterprises, Digital platforms & startups, Businesses with dynamic workloads.</span>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 4. CAPEX MODEL (Dark, Structured Theme) ================= */}
      <section className="py-24 bg-[#040814] relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Blueprint Graphic */}
            <Reveal direction="right" className="relative h-[500px] flex items-center justify-center">
               <div className="relative w-full max-w-md h-full flex flex-col justify-center">
                  <div className="glass-dark p-6 rounded-2xl shadow-2xl border-t-4 border-t-[#EA4335] z-20 relative">
                     <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                       <h4 className="font-bebas text-2xl tracking-widest text-white">Dedicated Architecture</h4>
                       <div className="bg-[#EA4335]/20 text-[#EA4335] px-2 py-1 rounded text-xs font-bold uppercase border border-[#EA4335]/50">Owned</div>
                     </div>
                     {/* Blueprint diagram representation */}
                     <div className="space-y-3">
                       <div className="w-full h-12 border-2 border-dashed border-[#0B79BF]/50 rounded flex items-center justify-center">
                         <span className="text-xs font-mono text-[#0B79BF]">Custom Server Rack A</span>
                       </div>
                       <div className="flex gap-3">
                         <div className="flex-1 h-16 border-2 border-dashed border-[#EA4335]/50 rounded flex items-center justify-center">
                           <span className="text-xs font-mono text-[#EA4335]">HSM Node</span>
                         </div>
                         <div className="flex-1 h-16 border-2 border-dashed border-[#34A853]/50 rounded flex items-center justify-center">
                           <span className="text-xs font-mono text-[#34A853]">Private Storage</span>
                         </div>
                       </div>
                     </div>
                  </div>
                  {/* Floating abstract elements */}
                  <div className="absolute top-10 -right-10 glass-dark p-4 rounded-xl shadow-lg flex items-center gap-3 z-30">
                     <ShieldCheck className="w-6 h-6 text-[#EA4335]"/> <span className="text-xs font-bold text-white">Maximum Control</span>
                  </div>
               </div>
            </Reveal>

            {/* Text Content */}
            <Reveal direction="left">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-red-900/30 border border-red-500/50 flex items-center justify-center"><Building2 className="w-6 h-6 text-[#EA4335]"/></div>
                <div>
                  <h3 className="text-xs font-bold text-[#EA4335] uppercase tracking-widest">Capex Model</h3>
                  <h2 className="text-4xl font-bebas text-white tracking-wide">Dedicated Infrastructure</h2>
                </div>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                The Capex model enables organizations to build and own dedicated infrastructure environments tailored to their specific requirements. Designed for maximum control, deep customization, and long-term strategic investment.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-sm font-bold text-white border-b border-white/10 pb-2 mb-3">Key Characteristics</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#EA4335]"/> Upfront capital investment</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#EA4335]"/> Dedicated environments</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#EA4335]"/> Full ownership & control</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#EA4335]"/> Long-term planning</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white border-b border-white/10 pb-2 mb-3">Included Capabilities</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2"><Server className="w-4 h-4 text-[#0B79BF]"/> Custom data centers</li>
                    <li className="flex items-center gap-2"><Server className="w-4 h-4 text-[#0B79BF]"/> Dedicated compute/storage</li>
                    <li className="flex items-center gap-2"><Server className="w-4 h-4 text-[#0B79BF]"/> Private infra deployment</li>
                    <li className="flex items-center gap-2"><Server className="w-4 h-4 text-[#0B79BF]"/> Legacy system integration</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Best Suited For:</span>
                <span className="text-sm font-medium text-blue-200">Government & public sector, Large enterprises with long-term planning, Financial institutions with strict compliance rules.</span>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 5. COMPARISON SECTION (Interactive UX Toggle) ================= */}
      <section className="py-32 bg-slate-100 relative border-b border-gray-200">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Choosing the Right Model</h2>
              <p className="text-gray-600 mb-8">Organizations should select a model based on financial strategy, required control, and scalability needs.</p>
              
              {/* Interactive Toggle */}
              <div className="inline-flex bg-white p-1 rounded-full border border-gray-200 shadow-sm mb-8">
                 <button 
                   onClick={() => setCompareMode('all')}
                   className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${compareMode === 'all' ? 'bg-[#14477B] text-white shadow' : 'text-gray-500 hover:text-gray-900'}`}
                 >
                   Compare Both
                 </button>
                 <button 
                   onClick={() => setCompareMode('opex')}
                   className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${compareMode === 'opex' ? 'bg-[#34A853] text-white shadow' : 'text-gray-500 hover:text-gray-900'}`}
                 >
                   Focus Opex
                 </button>
                 <button 
                   onClick={() => setCompareMode('capex')}
                   className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${compareMode === 'capex' ? 'bg-[#EA4335] text-white shadow' : 'text-gray-500 hover:text-gray-900'}`}
                 >
                   Focus Capex
                 </button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr>
                     <th className="p-6 bg-gray-50 text-sm font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200 w-1/3">Feature</th>
                     
                     <th className={`p-6 border-b border-gray-200 transition-all ${compareMode === 'capex' ? 'hidden' : 'bg-green-50/50 w-1/3'}`}>
                        <div className="flex items-center gap-2 mb-1"><CreditCard className="w-5 h-5 text-[#34A853]"/> <span className="font-bebas text-xl text-gray-900 tracking-wider">DCaaS (Opex)</span></div>
                     </th>
                     
                     <th className={`p-6 border-b border-gray-200 transition-all ${compareMode === 'opex' ? 'hidden' : 'bg-red-50/50 w-1/3'}`}>
                        <div className="flex items-center gap-2 mb-1"><Building2 className="w-5 h-5 text-[#EA4335]"/> <span className="font-bebas text-xl text-gray-900 tracking-wider">Capex Model</span></div>
                     </th>
                   </tr>
                 </thead>
                 <tbody className="text-sm">
                   {[
                     { feature: "Investment Type", opex: "Operational Expense", capex: "Capital Expense" },
                     { feature: "Upfront Cost", opex: "Minimal", capex: "High" },
                     { feature: "Ownership", opex: "Managed by Bichuten", capex: "Owned by Client" },
                     { feature: "Scalability", opex: "High (On-demand)", capex: "Planned Scaling" },
                     { feature: "Deployment Speed", opex: "Fast", capex: "Moderate" },
                     { feature: "Flexibility", opex: "High", capex: "Moderate" },
                     { feature: "Control Level", opex: "Shared", capex: "Full & Absolute" }
                   ].map((row, i) => (
                     <tr key={i} className="border-b border-gray-100 last:border-none hover:bg-slate-50 transition-colors">
                       <td className="p-6 font-bold text-gray-700">{row.feature}</td>
                       
                       <td className={`p-6 text-gray-600 transition-all ${compareMode === 'capex' ? 'hidden' : 'bg-green-50/30'}`}>
                         <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#34A853]"/> {row.opex}</div>
                       </td>
                       
                       <td className={`p-6 text-gray-600 transition-all ${compareMode === 'opex' ? 'hidden' : 'bg-red-50/30'}`}>
                         <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#EA4335]"/> {row.capex}</div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 6 & 7. HYBRID APPROACH & WHY BICHUTEN (Mixed Gradient Theme) ================= */}
      <section className="py-24 bg-gradient-to-br from-[#14477B] to-[#040814] relative border-b border-white/10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-10"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Hybrid Approach */}
            <Reveal direction="up" className="glass-dark p-10 rounded-2xl border-t-4 border-t-[#FBBC05]">
              <div className="flex items-center gap-4 mb-6">
                <RefreshCw className="w-10 h-10 text-[#FBBC05]" />
                <h3 className="text-3xl font-bebas text-white tracking-wider">The Hybrid Approach</h3>
              </div>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Organizations may also adopt a hybrid approach, strategically combining elements of both models to achieve a perfect balance of flexibility and control.
              </p>
              <div className="space-y-4 mb-6">
                 <div className="bg-white/5 p-4 rounded border border-white/10 flex items-center justify-between">
                   <span className="text-xs font-bold text-gray-400 uppercase">Core Infrastructure</span>
                   <span className="text-sm font-bold text-[#EA4335]">Capex Ownership</span>
                 </div>
                 <div className="bg-white/5 p-4 rounded border border-white/10 flex items-center justify-between">
                   <span className="text-xs font-bold text-gray-400 uppercase">Scalable Workloads</span>
                   <span className="text-sm font-bold text-[#34A853]">DCaaS (Opex)</span>
                 </div>
                 <div className="bg-white/5 p-4 rounded border border-white/10 flex items-center justify-between">
                   <span className="text-xs font-bold text-gray-400 uppercase">Disaster Recovery</span>
                   <span className="text-sm font-bold text-[#0B79BF]">Managed Services</span>
                 </div>
              </div>
            </Reveal>

            {/* Why Bichuten */}
            <Reveal direction="up" delay={150} className="glass-dark p-10 rounded-2xl border-t-4 border-t-[#4285F4]">
              <div className="flex items-center gap-4 mb-6">
                <ShieldCheck className="w-10 h-10 text-[#4285F4]" />
                <h3 className="text-3xl font-bebas text-white tracking-wider">Why Bichuten Models Work</h3>
              </div>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Bichuten’s engagement models are designed to adapt to evolving business needs while maintaining rigorous, consistent standards across the board.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center gap-3 text-sm text-gray-300 font-medium"><div className="w-2 h-2 bg-[#4285F4] rounded-full"></div> Unified platform across both models</li>
                <li className="flex items-center gap-3 text-sm text-gray-300 font-medium"><div className="w-2 h-2 bg-[#4285F4] rounded-full"></div> Sovereign infrastructure hosted fully within Nepal</li>
                <li className="flex items-center gap-3 text-sm text-gray-300 font-medium"><div className="w-2 h-2 bg-[#4285F4] rounded-full"></div> Integrated native security and compliance</li>
                <li className="flex items-center gap-3 text-sm text-gray-300 font-medium"><div className="w-2 h-2 bg-[#4285F4] rounded-full"></div> Scalable, future-ready operational environments</li>
              </ul>
              <div className="mt-auto bg-[#4285F4]/10 text-[#4da6e7] text-xs font-bold p-4 rounded border border-[#4285F4]/30">
                Outcome: The freedom to choose and evolve your strategy over time.
              </div>
            </Reveal>

          </div>
        </div>
      </section>

     
    </div>
  );
};

export default EngagementModels;