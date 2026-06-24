import React, { useEffect, useRef, useState } from 'react';
import { 
  BarChart3, Target, ArrowUpRight, Building2, 
  Send, Landmark, ShieldCheck, PieChart
} from 'lucide-react';

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

const CaseStudiesComingSoon = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden relative flex flex-col justify-center pt-20">
      
      <style>
        {`
          .pattern-dots-light {
            background-image: radial-gradient(#34A853 1px, transparent 1px);
            background-size: 24px 24px;
            opacity: 0.1;
          }
          @keyframes floatChart {
            0%, 100% { transform: translateY(0) rotate(-2deg); }
            50% { transform: translateY(-15px) rotate(0deg); }
          }
          .animate-float-chart {
            animation: floatChart 6s ease-in-out infinite;
          }
        `}
      </style>

      <div className="absolute inset-0 pattern-dots-light z-0"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-green-50/80 via-white to-transparent rounded-full blur-[100px] z-0 pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Left */}
          <div className="max-w-xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 shadow-sm rounded-full mb-8 text-[#34A853]">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs font-bold tracking-widest uppercase">Case Studies In Progress</span>
              </div>
            </Reveal>
            
            <Reveal delay={150}>
              <h1 className="text-5xl md:text-7xl font-bebas tracking-wide text-[#14477B] mb-6 leading-[1.05]">
                Proven Infrastructure <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14477B] to-[#34A853]">
                  Success Stories
                </span>
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We are currently compiling in-depth analytics and performance reports detailing how leading organizations leverage Bichuten to secure, scale, and optimize their critical digital operations.
              </p>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Get Notified Upon Release</h3>
                <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Enter your professional email..." 
                    className="flex-grow bg-slate-50 border border-gray-200 text-sm text-gray-800 px-4 py-3 rounded-l-lg focus:outline-none focus:border-[#34A853] transition-colors"
                    required
                  />
                  <button type="submit" className="bg-[#14477B] hover:bg-[#0B79BF] px-6 py-3 rounded-r-lg transition-colors flex items-center justify-center group text-white font-bold text-sm tracking-wide">
                    Notify Me <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
                <p className="text-xs text-gray-400 mt-3 flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-[#34A853]"/> Learn how top enterprises achieve 99.99% uptime.</p>
              </div>
            </Reveal>
          </div>

          {/* Graphic Right */}
          <Reveal direction="left" delay={200} className="relative h-[500px] w-full hidden lg:flex items-center justify-center">
             <div className="relative w-full max-w-md h-full flex flex-col justify-center animate-float-chart">
                {/* Abstract Case Study Mockup */}
                <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-t-4 border-t-[#34A853] z-20 relative">
                   <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-[#14477B]" />
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Enterprise Client</p>
                          <p className="font-bebas text-xl text-[#14477B] tracking-wide">Infrastructure Migration</p>
                        </div>
                      </div>
                      <div className="bg-green-50 text-[#34A853] px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3"/> +300%
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                     <div>
                       <div className="flex justify-between text-xs font-bold text-gray-500 uppercase mb-1"><span>Data Sovereignty</span><span>100%</span></div>
                       <div className="w-full bg-gray-100 h-2 rounded"><div className="bg-[#0B79BF] w-full h-2 rounded"></div></div>
                     </div>
                     <div>
                       <div className="flex justify-between text-xs font-bold text-gray-500 uppercase mb-1"><span>Latency Reduction</span><span>-45%</span></div>
                       <div className="w-full bg-gray-100 h-2 rounded"><div className="bg-[#34A853] w-2/3 h-2 rounded"></div></div>
                     </div>
                   </div>
                </div>
                
                {/* Floating Sector Badges */}
                <div className="absolute top-4 -right-10 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 z-30">
                   <Landmark className="w-6 h-6 text-[#FBBC05]"/> <span className="text-xs font-bold">Banking & Finance</span>
                </div>
                <div className="absolute bottom-16 -left-10 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 z-30">
                   <PieChart className="w-6 h-6 text-[#0B79BF]"/> <span className="text-xs font-bold">Compliance Impact</span>
                </div>
             </div>
          </Reveal>

        </div>
      </div>
    </div>
  );
};

export default CaseStudiesComingSoon;