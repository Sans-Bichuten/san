import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, Shield, Server, Lock, Activity, Cloud,
  MapPin, CheckCircle, Leaf, Globe, Zap, Cpu, Layers,
  Building2, Landmark, Wifi
} from 'lucide-react';
import TrustedBrands from '../components/TrustedBrands';
import FreeInfrastructureMap from '../components/FreeInfrastructureMap';
import datacenterHeroImg from '../assets/datacenter-hero.png';

// --- Helper Component for Scroll Animations ---
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

const Home = () => {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-helvetica overflow-hidden">
      {/* --- GLOBAL ANIMATION STYLES --- */}
      <style>
        {`
          @keyframes dataFlow {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
          }
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes drawLine {
            to { stroke-dashoffset: 0; }
          }
          .bg-animated-grid {
            background-image: 
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: dataFlow 20s linear infinite;
          }
          .tech-border {
            border: 1px solid rgba(11, 121, 191, 0.3);
            box-shadow: inset 0 0 20px rgba(11, 121, 191, 0.05);
          }
          .hover-glow:hover {
            box-shadow: 0 0 30px rgba(11, 121, 191, 0.3);
            border-color: rgba(11, 121, 191, 0.8);
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative bg-[#14477B] text-white pt-40 pb-32 overflow-hidden min-h-[90vh] flex items-center">

        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-animated-grid z-0"></div>

        {/* Right Side Image */}
        <div className="absolute inset-0 z-0">
          <div 
            ref={parallaxRef}
            className="absolute right-0 -top-[10%] h-[120%] w-full lg:w-[65%] will-change-transform"
            style={{ transform: 'translateY(0px)' }}
          >
            {/* Micro-label */}
            <div className="absolute top-[15%] left-8 z-20 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-xs text-white font-bold tracking-widest uppercase">Live Infrastructure Environment</span>
            </div>
            <img
              src={datacenterHeroImg}
              alt="Data Center"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Gradient Overlay (KEY PART) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r 
          from-[#14477B] via-[#14477B]/95 via-[#14477B]/85 
          to-transparent">
        </div>

        {/* Optional Glow Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(11,121,191,0.25),transparent_40%)] z-0"></div>

        {/* Floating Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0B79BF] rounded-full blur-[150px] opacity-30 animate-[pulseGlow_6s_ease-in-out_infinite] z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#14477B] rounded-full blur-[150px] opacity-50 animate-[pulseGlow_8s_ease-in-out_infinite_reverse] z-0"></div>

        {/* Content */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">

            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest uppercase text-blue-100">
                Nepal’s Sovereign Digital Infrastructure Platform
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bebas tracking-tight mb-6 leading-[1.05]">
              Sovereign Digital Infrastructure<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0B79BF]" style={{ WebkitTextStroke: '1px white' }}>
                for Nepal
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl font-light text-blue-100/90 mb-10 max-w-xl leading-relaxed backdrop-blur-[1px]">
              Secure, compliant, and fully controlled infrastructure for enterprise and government systems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <a
                href="/contact"
                className="group relative overflow-hidden bg-[#0B79BF] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(11,121,191,0.5)] inline-flex items-center gap-2"
              >
                Request Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/contact"
                className="group bg-transparent border border-white/30 text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all hover:bg-white/10 inline-flex items-center"
              >
                Talk to Expert
              </a>
            </div>

            {/* Trust Strip */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs font-bold tracking-widest uppercase text-blue-100">Tier-grade infrastructure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs font-bold tracking-widest uppercase text-blue-100">Geo-distributed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs font-bold tracking-widest uppercase text-blue-100">Sovereign control</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2 & 3. PROBLEM & SOLUTION (NARRATIVE) ================= */}
      <section className="py-24 bg-white relative z-20 border-b border-gray-100">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* PROBLEM SECTION */}
          <div className="text-center mb-20">
            <Reveal>
              <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-6">
                The Challenge
              </p>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
                Digital Growth Without Infrastructure Control
              </h2>
              <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
                Organizations operating in Nepal’s digital ecosystem face increasing risks due to dependence on external infrastructure, limited control over data, and rising compliance and security demands.
              </p>

              {/* Inline Problem Grid */}
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto text-left">
                {[
                  "Dependence on foreign infrastructure",
                  "Limited data sovereignty",
                  "Increasing compliance pressure",
                  "Rising cybersecurity risks",
                  "Latency and performance challenges"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-500 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* TRANSITION LINE */}
          <Reveal>
            <div className="text-center mb-20">
              <p className="text-2xl md:text-3xl font-bebas text-gray-800 tracking-wide border-y border-gray-100 py-8">
                Control over infrastructure is no longer optional—it is critical.
              </p>
            </div>
          </Reveal>

          {/* SOLUTION SECTION */}
          <Reveal delay={200}>
            <div className="bg-gradient-to-br from-blue-50/50 to-white p-10 md:p-16 rounded-[2rem] border border-blue-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0B79BF]/5 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
                  Sovereign Infrastructure. Built in Nepal.
                </h2>
                <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
                  Bichuten provides a unified, secure, and locally governed infrastructure platform designed to deliver control, compliance, and high performance.
                </p>

                {/* Inline Checklist */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
                  {[
                    "Hydroelectric-powered operations",
                    "Naturally efficient climate",
                    "Strategic regional positioning",
                    "Built for sovereignty"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#14477B] font-bold text-sm bg-white px-5 py-3 rounded-xl border border-blue-100/50 shadow-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Final Line */}
                <div className="pt-8 border-t border-blue-100/50">
                  <p className="text-[#0B79BF] font-bold tracking-widest uppercase text-sm">
                    Designed for control. Built for resilience.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 4. PLATFORM ECOSYSTEM ================= */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0B79BF]/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <p className="text-sm font-bold tracking-widest text-[#0B79BF] uppercase mb-4">
                Infrastructure Platform
              </p>
              <h2 className="text-4xl md:text-5xl font-bebas tracking-wide mb-6">
                A Unified Digital Infrastructure Platform
              </h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                All infrastructure components are integrated into a single ecosystem—designed to deliver control, security, and performance across every layer.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Stack (Left) */}
            <Reveal direction="up" className="relative">
              <div className="relative z-10 flex flex-col gap-4">
                
                {/* TOP LAYER */}
                <div className="bg-gray-800/80 border border-gray-700 p-6 rounded-xl text-center transform hover:-translate-y-1 transition-transform shadow-lg relative">
                  <h3 className="text-xl font-bebas tracking-wider text-white">Applications & Workloads</h3>
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-[#0B79BF]">
                  <ArrowRight className="w-6 h-6 transform rotate-90" />
                </div>

                {/* MIDDLE LAYER (Grid) */}
                <div className="bg-gray-800/60 border border-gray-700/50 p-6 rounded-xl relative shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700/50 p-4 rounded-lg text-center flex flex-col items-center justify-center gap-2">
                      <Cloud className="w-5 h-5 text-[#0B79BF]" />
                      <span className="text-sm font-bold text-gray-300">Cloud Infrastructure</span>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg text-center flex flex-col items-center justify-center gap-2">
                      <Lock className="w-5 h-5 text-[#0B79BF]" />
                      <span className="text-sm font-bold text-gray-300">Identity & Access</span>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg text-center flex flex-col items-center justify-center gap-2">
                      <Globe className="w-5 h-5 text-[#0B79BF]" />
                      <span className="text-sm font-bold text-gray-300">Communication</span>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg text-center flex flex-col items-center justify-center gap-2">
                      <Shield className="w-5 h-5 text-[#0B79BF]" />
                      <span className="text-sm font-bold text-gray-300">Security & Compliance</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-[#0B79BF]">
                  <ArrowRight className="w-6 h-6 transform rotate-90" />
                </div>

                {/* BOTTOM LAYER */}
                <div className="bg-[#14477B]/80 border-2 border-[#0B79BF]/50 p-6 rounded-xl text-center shadow-[0_0_30px_rgba(11,121,191,0.2)]">
                  <h3 className="text-xl font-bebas tracking-wider text-white mb-2">Data Center Infrastructure</h3>
                  <p className="text-xs text-blue-200 uppercase tracking-widest font-bold">The Foundation</p>
                </div>

              </div>
            </Reveal>

            {/* Content (Right) */}
            <Reveal delay={200} className="flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bebas tracking-wide mb-6 text-white border-l-4 border-[#0B79BF] pl-6 py-2 bg-gradient-to-r from-gray-800/50 to-transparent">
                Infrastructure is the foundation.<br/>
                <span className="text-[#0B79BF]">Platform is the advantage.</span>
              </h3>
              
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                Each layer works together to create a seamless, secure, and scalable digital environment.
              </p>

              <ul className="space-y-6">
                {[
                  "Unified control across systems",
                  "Seamless integration across services",
                  "Consistent performance across environments"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-300 font-medium text-lg">
                    <div className="w-10 h-10 rounded-full bg-[#0B79BF]/10 flex items-center justify-center border border-[#0B79BF]/30 flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#0B79BF]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Insert the Trusted Brands Component Here (Section 6 Context) */}
      <TrustedBrands />

      {/* ================= 6. INDUSTRIES ================= */}
      <section className="py-24 bg-gray-50 border-t border-gray-200 relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">
                Industries
              </p>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
                Infrastructure for Industries Where Reliability is Critical
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Designed to support organizations where performance, security, and compliance are non-negotiable.
              </p>
            </div>
          </Reveal>

          <div className="space-y-6 mb-16">
            {/* Top Row - Featured */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  title: "Banking & Financial Services", 
                  usecase: "Secure transaction processing and regulatory-compliant infrastructure.",
                  icon: Landmark
                },
                { 
                  title: "Government & Public Sector", 
                  usecase: "Citizen data systems and national digital infrastructure.",
                  icon: Building2
                }
              ].map((ind, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="group bg-white p-10 rounded-2xl border border-gray-200 hover:border-[#0B79BF] hover:shadow-[0_8px_30px_rgb(11,121,191,0.12)] transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-center cursor-default">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-[#0B79BF] transition-colors duration-300">
                        <ind.icon className="w-8 h-8 text-[#0B79BF] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-2xl font-bebas text-gray-900 tracking-wide">{ind.title}</h3>
                    </div>
                    <p className="text-gray-500 font-medium leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{ind.usecase}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Bottom Row - Secondary */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Telecom & ISPs", 
                  usecase: "High-availability network infrastructure.",
                  icon: Wifi
                },
                { 
                  title: "Enterprise & Corporates", 
                  usecase: "Secure environments for business-critical applications.",
                  icon: Server
                },
                { 
                  title: "Global Technology", 
                  usecase: "Localized hosting and cross-border infrastructure support.",
                  icon: Globe
                }
              ].map((ind, i) => (
                <Reveal key={i} delay={200 + (i * 100)}>
                  <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#0B79BF] hover:shadow-[0_8px_30px_rgb(11,121,191,0.12)] transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-center cursor-default">
                    <div className="flex items-center gap-3 mb-4">
                      <ind.icon className="w-6 h-6 text-gray-400 group-hover:text-[#0B79BF] transition-colors duration-300" />
                      <h4 className="text-xl font-bebas text-gray-900 tracking-wide">{ind.title}</h4>
                    </div>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{ind.usecase}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={500}>
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-[#14477B] font-bold tracking-widest uppercase text-sm">
                Built for industries where failure is not an option.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 7. INFRASTRUCTURE NETWORK ================= */}
      <section className="py-24 bg-white relative z-10 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">Nationwide Infrastructure Network</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Our infrastructure spans key locations across Nepal—designed for performance, resilience, and continuous operations.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            {/* FULL-WIDTH MAP COMPONENT */}
            <div className="w-full mb-16 shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
              <FreeInfrastructureMap />
            </div>

            {/* TRUST STRIP & STATEMENT */}
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bebas text-gray-800 tracking-wide mb-8">
                Distributed infrastructure designed for continuous operations across regions.
              </h3>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 border-t border-gray-200 pt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-bold text-gray-600 text-sm tracking-wide uppercase">Multi-region deployment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-bold text-gray-600 text-sm tracking-wide uppercase">Disaster recovery ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-bold text-gray-600 text-sm tracking-wide uppercase">Low latency</span>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 8. WHY BICHUTEN ================= */}
      <section className="py-24 bg-[#14477B] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#0B79BF]/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0B79BF]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-sm font-bold tracking-widest text-[#0B79BF] uppercase mb-4">
                Why Bichuten
              </p>
              <h2 className="text-4xl md:text-5xl font-bebas tracking-wide mb-6">
                Built for Control. Designed for Reliability.
              </h2>
              <p className="text-blue-100/80 text-lg leading-relaxed">
                Bichuten provides infrastructure that prioritizes control, security, and performance—designed for organizations where reliability is critical.
              </p>
            </div>
          </Reveal>

          {/* 2-Column Layout */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-16">

            {/* LEFT — Key Differentiators */}
            <Reveal>
              <h3 className="text-sm font-bold tracking-widest text-[#0B79BF] uppercase mb-8 pb-4 border-b border-white/10">
                Key Differentiators
              </h3>
              <ul className="space-y-6">
                {[
                  { icon: Shield, title: "Sovereign infrastructure", desc: "Full ownership and jurisdiction within Nepal." },
                  { icon: Lock, title: "Full control over data and access", desc: "No third-party dependency on critical systems." },
                  { icon: CheckCircle, title: "Compliance-ready systems", desc: "Built for audit, regulatory, and governance needs." },
                  { icon: Zap, title: "Local performance advantage", desc: "Low latency through in-country infrastructure." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-5 h-5 text-[#0B79BF]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-blue-100/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* RIGHT — System Benefits */}
            <Reveal delay={200}>
              <h3 className="text-sm font-bold tracking-widest text-[#0B79BF] uppercase mb-8 pb-4 border-b border-white/10">
                System Benefits
              </h3>
              <ul className="space-y-6">
                {[
                  { icon: Layers, title: "Unified platform integration", desc: "Infrastructure, identity, and communication in one system." },
                  { icon: Shield, title: "Security-first architecture", desc: "Encryption and access control across every layer." },
                  { icon: Activity, title: "High availability and resilience", desc: "Geo-distributed with automated failover." },
                  { icon: Server, title: "Scalable infrastructure", desc: "Designed to grow with organizational demand." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-5 h-5 text-[#0B79BF]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-blue-100/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

          </div>

          {/* Bottom Anchor */}
          <Reveal delay={300}>
            <div className="text-center pt-10 border-t border-white/10">
              <p className="text-2xl md:text-3xl font-bebas tracking-wide text-white mb-4">
                Control is not a feature—it is a requirement.
              </p>
              <p className="text-blue-200/60 text-sm font-bold tracking-widest uppercase">
                Global cloud offers scale. Bichuten offers control.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 9 & 10. INFRASTRUCTURE ADVANTAGE ================= */}
      <section className="py-24 bg-gray-50 border-t border-gray-200 relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">
                Infrastructure Advantage
              </p>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
                Built on Natural and Strategic Advantages
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Bichuten leverages Nepal's natural resources and strategic positioning to deliver efficient, sustainable, and high-performance infrastructure.
              </p>
            </div>
          </Reveal>

          {/* Asymmetric 2-Column */}
          <div className="grid lg:grid-cols-5 gap-8 mb-16">

            {/* LEFT — Primary (Sustainability) — 3 cols */}
            <Reveal className="lg:col-span-3">
              <div className="bg-gradient-to-br from-[#0f365c] to-[#14477B] p-10 md:p-14 rounded-2xl text-white relative overflow-hidden shadow-xl h-full">
                <Leaf className="absolute -right-10 -bottom-10 w-56 h-56 text-green-500/8 transform rotate-45 pointer-events-none" />
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                    <Leaf className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bebas tracking-wide mb-4">
                    Sustainable Infrastructure<br/>Powered by Nature
                  </h3>
                  <p className="text-blue-100/70 mb-8 leading-relaxed max-w-lg">
                    Nepal's abundant hydroelectric resources and naturally cool climate create an ideal foundation for energy-efficient, sustainable data center operations.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Hydroelectric-powered operations",
                      "Energy-efficient data center design",
                      "Reduced environmental impact"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white font-medium">
                        <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-green-400 font-bold tracking-widest uppercase text-xs">
                      Clean energy. Efficient design. Responsible operations.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* RIGHT — Secondary (Strategic) — 2 cols */}
            <Reveal delay={200} className="lg:col-span-2">
              <div className="bg-white p-10 md:p-12 rounded-2xl border border-gray-200 h-full flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bebas text-[#14477B] tracking-wide mb-4">
                    Beyond Traditional Infrastructure
                  </h3>
                  <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                    A sovereign platform built to power Nepal's critical digital future.
                  </p>
                  <ul className="space-y-5">
                    {[
                      "Reduced dependency on foreign providers",
                      "Supports national data sovereignty",
                      "Enables mission-critical systems",
                      "Ensures long-term resilience"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700 font-medium text-sm">
                        <ArrowRight className="w-4 h-4 text-[#0B79BF] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 mt-8 border-t border-gray-100">
                  <p className="text-[#14477B] font-bold tracking-widest uppercase text-xs">
                    Global cloud offers scale. Bichuten offers control.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Bottom Anchor */}
          <Reveal delay={300}>
            <div className="text-center">
              <p className="text-[#14477B] font-bold tracking-widest uppercase text-sm">
                Infrastructure designed for long-term national digital growth.
              </p>
            </div>
          </Reveal>

        </div>
      </section>


      {/* ================= FINAL CTA ================= */}
      <section className="relative py-28 bg-[#0a1628] text-white overflow-hidden">
        {/* Glowing orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0B79BF] rounded-full blur-[140px] opacity-15 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#14477B] rounded-full blur-[140px] opacity-25 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0B79BF] rounded-full blur-[200px] opacity-5 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-bold tracking-widest uppercase text-[#0B79BF] mb-6">
              Get Started
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas tracking-tight leading-tight mb-6">
              Build Infrastructure That<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0B79BF]">
                Performs Under Pressure
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
              Partner with Bichuten to design and deploy secure, resilient, and high-performance infrastructure tailored to your organization.
            </p>
            <p className="text-white font-bebas text-xl tracking-wide mb-10">
              Designed for reliability. Built for continuity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-[#0B79BF] hover:bg-blue-500 text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(11,121,191,0.4)] hover:-translate-y-0.5 rounded"
              >
                Request Infrastructure Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:border-white/60 hover:bg-white/5 text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 rounded"
              >
                Talk to an Expert
              </a>
              <a
                href="/platform"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/10 hover:border-white/30 hover:bg-white/5 text-white/60 hover:text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 rounded"
              >
                Explore Platform
              </a>
            </div>

            {/* Trust Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400">No obligation consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Secure and confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Enterprise-grade infrastructure</span>
              </div>
            </div>

            {/* Final Reassurance */}
            <div className="space-y-3">
              <p className="text-xl font-bebas tracking-wide text-white">
                Reliable systems. Trusted infrastructure. Long-term confidence.
              </p>
              <p className="text-gray-500 text-sm">
                Our team will guide you from planning to deployment with clarity and precision.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default Home;