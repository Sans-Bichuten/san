import React, { useEffect, useRef, useState } from 'react';
import { 
  BookOpen, Terminal, Shield, ArrowRight, 
  Send, BellRing, Cpu, Globe
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

const BlogComingSoon = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden relative flex flex-col justify-center pt-20">
      
      <style>
        {`
          .pattern-grid-light {
            background-image: radial-gradient(rgba(11, 121, 191, 0.15) 1px, transparent 1px);
            background-size: 32px 32px;
          }
          @keyframes floatSoft {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: floatSoft 6s ease-in-out infinite;
          }
        `}
      </style>

      <div className="absolute inset-0 pattern-grid-light opacity-50 z-0"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-bl from-blue-100/60 via-white to-transparent rounded-full blur-[100px] z-0 pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Left */}
          <div className="max-w-xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 shadow-sm rounded-full mb-8 text-[#0B79BF]">
                <BellRing className="w-4 h-4 animate-bounce" style={{animationDuration: '3s'}} />
                <span className="text-xs font-bold tracking-widest uppercase">Launch Sequence Initiated</span>
              </div>
            </Reveal>
            
            <Reveal delay={150}>
              <h1 className="text-5xl md:text-7xl font-bebas tracking-wide text-[#14477B] mb-6 leading-[1.05]">
                Insights & Engineering <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14477B] to-[#0B79BF]">
                  Coming Soon
                </span>
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We are preparing a centralized hub for deep dives into digital sovereignty, infrastructure architecture, enterprise security, and the future of tech in Nepal.
              </p>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Get Notified on Launch</h3>
                <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Enter your professional email..." 
                    className="flex-grow bg-slate-50 border border-gray-200 text-sm text-gray-800 px-4 py-3 rounded-l-lg focus:outline-none focus:border-[#0B79BF] transition-colors"
                    required
                  />
                  <button type="submit" className="bg-[#14477B] hover:bg-[#0B79BF] px-6 py-3 rounded-r-lg transition-colors flex items-center justify-center group text-white font-bold text-sm tracking-wide">
                    Subscribe <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
                <p className="text-xs text-gray-400 mt-3 flex items-center gap-1"><Shield className="w-3 h-3"/> No spam. Only high-signal engineering updates.</p>
              </div>
            </Reveal>
          </div>

          {/* Graphic Right */}
          <Reveal direction="left" delay={200} className="relative h-[500px] w-full hidden lg:flex items-center justify-center">
             <div className="relative w-full max-w-md h-full flex flex-col justify-center animate-float">
                {/* Abstract Article/Blog Post Mockup */}
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-t-4 border-t-[#0B79BF] z-20 relative transform rotate-2 hover:rotate-0 transition-transform duration-500">
                   <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                     <BookOpen className="w-8 h-8 text-[#0B79BF]" />
                   </div>
                   <div className="w-3/4 h-6 bg-gray-200 rounded mb-4"></div>
                   <div className="w-full h-3 bg-gray-100 rounded mb-2"></div>
                   <div className="w-full h-3 bg-gray-100 rounded mb-2"></div>
                   <div className="w-5/6 h-3 bg-gray-100 rounded mb-6"></div>
                   
                   <div className="flex gap-2">
                     <div className="bg-slate-100 px-3 py-1 rounded text-[10px] font-bold text-gray-500 uppercase">Architecture</div>
                     <div className="bg-slate-100 px-3 py-1 rounded text-[10px] font-bold text-gray-500 uppercase">Sovereignty</div>
                   </div>
                </div>
                
                {/* Floating Category Badges */}
                <div className="absolute top-10 -left-8 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 z-30">
                   <Shield className="w-6 h-6 text-[#EA4335]"/> <span className="text-xs font-bold">Cyber Security</span>
                </div>
                <div className="absolute bottom-20 -right-8 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 z-30">
                   <Terminal className="w-6 h-6 text-[#34A853]"/> <span className="text-xs font-bold">Tech Engineering</span>
                </div>
             </div>
          </Reveal>

        </div>
      </div>
    </div>
  );
};

export default BlogComingSoon;