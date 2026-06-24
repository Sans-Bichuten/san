import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Landmark, Shield, Cpu, Server, Activity, Building2, Globe, Database } from 'lucide-react';

const Reveal = ({ children, delay = 0, className = '' }) => {
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

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const mockLogos = [
  { name: "Global Finance", icon: Landmark },
  { name: "GovCloud Systems", icon: Shield },
  { name: "TechCorp Nepal", icon: Cpu },
  { name: "Enterprise Data", icon: Server },
  { name: "National Bank", icon: Building2 },
  { name: "Global Connect", icon: Globe },
  { name: "HealthNet IT", icon: Activity },
  { name: "DataCore", icon: Database },
];

const TrustedBrands = () => {
  return (
    <section className="py-24 bg-white font-helvetica border-t border-gray-100 relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header Block */}
        <Reveal>
          <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">
            Trusted By
          </p>
          <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
            Trusted by Organizations Building Critical Systems
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mb-16">
            From enterprises to institutions, Bichuten powers secure and reliable digital operations across Nepal.
          </p>
        </Reveal>

        {/* Categories */}
        <Reveal delay={100}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-bold tracking-widest text-gray-400 uppercase mb-12">
            <span>Enterprise</span>
            <span className="hidden sm:inline text-gray-200">|</span>
            <span>Financial</span>
            <span className="hidden sm:inline text-gray-200">|</span>
            <span>Government</span>
            <span className="hidden sm:inline text-gray-200">|</span>
            <span>Technology</span>
          </div>
        </Reveal>

        {/* Logo Grid */}
        <Reveal delay={200}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center opacity-80 mb-16">
            {mockLogos.map((logo, index) => {
              const Icon = logo.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:text-[#0B79BF] hover:scale-105 transition-all duration-500 cursor-default"
                >
                  <Icon className="w-8 h-8" />
                  <span className="font-bold text-lg tracking-tight whitespace-nowrap">{logo.name}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Bottom Trust Line */}
        <Reveal delay={300}>
          <div className="border-t border-gray-100 pt-12 pb-8">
            <p className="text-xl font-bebas text-gray-700 tracking-wide mb-8">
              Supporting mission-critical infrastructure across industries.
            </p>

            {/* Micro Stats */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-bold text-gray-600">99.99% uptime architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-bold text-gray-600">Multi-region infrastructure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-bold text-gray-600">Enterprise-grade deployments</span>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default TrustedBrands;