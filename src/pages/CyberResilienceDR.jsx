import React, { useEffect, useRef, useState } from 'react';
import {
  ShieldAlert, RefreshCcw, Activity, ShieldCheck,
  ArrowRight, CloudLightning, Database, HardDrive,
  AlertTriangle, Server, CheckCircle, MapPin,
  Layers, Landmark, Building2, Wifi, Briefcase, Lock, Globe, XCircle
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
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${translateClasses[direction]} scale-95`
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const CyberResilienceDR = () => {
  const [activeUseCase, setActiveUseCase] = useState(0);

  const useCases = [
    {
      industry: "BANKING & FINANCIAL SERVICES",
      shortName: "Banking",
      context: "Continuous operation of transaction and financial systems under all conditions",
      apps: ["Core banking systems", "Transaction processing", "Recovery from cyber incidents"],
      icon: Landmark
    },
    {
      industry: "GOVERNMENT & PUBLIC SECTOR",
      shortName: "Government",
      context: "Resilience for national systems and public service infrastructure",
      apps: ["Citizen data systems", "Government platforms", "Disaster recovery for critical infrastructure"],
      icon: Building2
    },
    {
      industry: "TELECOM & ISPs",
      shortName: "Telecom",
      context: "High availability for network and communication systems",
      apps: ["Network infrastructure", "Data routing systems", "Service continuity"],
      icon: Wifi
    },
    {
      industry: "ENTERPRISE ORGANIZATIONS",
      shortName: "Enterprise",
      context: "Protection and recovery for business-critical operations",
      apps: ["Enterprise applications", "Internal systems", "Data protection"],
      icon: Briefcase
    }
  ];

  const ActiveUseCaseIcon = useCases[activeUseCase].icon;

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">

      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          @keyframes syncFlow {
            100% { stroke-dashoffset: -100; }
          }
          .animate-sync-flow {
            stroke-dasharray: 6 6;
            animation: syncFlow 1s linear infinite;
          }
          @keyframes attackPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(234, 67, 53, 0.5); }
            50% { box-shadow: 0 0 0 24px rgba(234, 67, 53, 0); }
          }
          .animate-attack {
            animation: attackPulse 1.5s infinite;
            border-color: #EA4335 !important;
          }
          @keyframes failoverActive {
            0%, 100% { box-shadow: 0 0 10px rgba(52,168,83,0.3); }
            50% { box-shadow: 0 0 35px rgba(52,168,83,0.7); }
          }
          .animate-recovery {
            animation: failoverActive 2s infinite;
            border-color: #34A853 !important;
          }
          @keyframes logScroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100%); }
          }
          @keyframes scanLine {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 0.15; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          .animate-scan-line {
            animation: scanLine 4s linear infinite;
          }
          .dark-glass {
            background: rgba(4, 8, 20, 0.8);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
          .light-glass {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(11, 121, 191, 0.1);
            box-shadow: 0 10px 30px rgba(20, 71, 123, 0.08);
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION (Live Resilience Console) ================= */}
      <section className="relative pt-36 pb-24 min-h-[100vh] flex flex-col justify-center bg-[#040814] overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)', backgroundSize: '100% 4px' }}></div>
          <div className="animate-scan-line absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#EA4335]/10 to-transparent pointer-events-none"></div>
        </div>

        {/* Ambient glows */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#EA4335]/15 rounded-full blur-[120px] z-0"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-[#0B79BF]/20 rounded-full blur-[130px] z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#34A853]/10 rounded-full blur-[80px] z-0"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* LEFT: Content */}
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EA4335]/10 border border-[#EA4335]/30 rounded-full mb-8">
                  <span className="w-2 h-2 rounded-full bg-[#EA4335] animate-pulse"></span>
                  <span className="text-xs font-bold tracking-widest text-[#EA4335] uppercase">● Live System — Cyber Resilience & DR</span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bebas tracking-wide text-white leading-[0.95] mb-6">
                  Stay Operational.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34A853] via-[#0B79BF] to-[#34A853]">
                    Even Under Attack.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-lg text-gray-400 leading-relaxed mb-6 max-w-xl">
                  Protect critical systems, maintain uptime, and recover instantly with a cyber resilience infrastructure designed to operate through disruptions—not after them.
                </p>
              </Reveal>

              {/* Urgency line */}
              <Reveal delay={250}>
                <div className="inline-flex items-center gap-2 px-3 py-2 bg-[#EA4335]/8 border border-[#EA4335]/20 rounded mb-8">
                  <AlertTriangle className="w-4 h-4 text-[#EA4335]/70 flex-shrink-0" />
                  <p className="text-sm text-[#EA4335]/70 font-bold">Downtime is not just a disruption—it is a business risk.</p>
                </div>
              </Reveal>

              {/* Status Strip */}
              <Reveal delay={300}>
                <div className="flex flex-wrap gap-3 mb-10">
                  {[
                    { label: 'System Status', value: 'Operational', ok: true },
                    { label: 'Threat Monitoring', value: 'Active', ok: true },
                    { label: 'Recovery Systems', value: 'Ready', ok: true },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 bg-[#0A0E17] border border-gray-800 rounded-lg">
                      <div className={`w-1.5 h-1.5 rounded-full ${s.ok ? 'bg-[#34A853] animate-pulse' : 'bg-[#EA4335]'}`}></div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{s.label}:</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${s.ok ? 'text-[#34A853]' : 'text-[#EA4335]'}`}>{s.value} ✔</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* CTAs */}
              <Reveal delay={380}>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <a href="/contact" className="group relative inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#34A853] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_20px_40px_rgba(52,168,83,0.35)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-500"></div>
                    <ShieldAlert className="w-4 h-4" /> Request Resilience Consultation
                  </a>
                  <a href="/infrastructure" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-transparent text-white font-bold text-sm uppercase tracking-wider rounded-xl border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 group">
                    View Recovery Architecture <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </Reveal>

              {/* Trust strip */}
              <Reveal delay={440}>
                <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">
                  Zero Data Loss &nbsp;•&nbsp; Minimal Downtime &nbsp;•&nbsp; Continuous Operations
                </p>
              </Reveal>
            </div>

            {/* RIGHT: Attack vs Recovery Visual */}
            <Reveal direction="left" delay={200}>
              <div className="relative w-full h-[520px] flex items-center justify-center">

                {/* Failover badge */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 bg-[#040814] border border-[#34A853]/50 rounded-full shadow-[0_0_20px_rgba(52,168,83,0.25)]">
                  <div className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></div>
                  <span className="text-[10px] font-bold text-[#34A853] uppercase tracking-widest">Failover Ready</span>
                </div>

                {/* System nodes */}
                <div className="flex items-center gap-8 w-full px-4">

                  {/* Primary System (under attack) */}
                  <div className="flex-1">
                    <div className="bg-[#0A0E17] border-2 border-[#EA4335] animate-attack rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[#EA4335]/5"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Server className="w-5 h-5 text-[#EA4335]" />
                            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Primary System</span>
                          </div>
                          <span className="text-[9px] font-bold text-[#EA4335] uppercase tracking-widest bg-[#EA4335]/10 px-2 py-1 rounded border border-[#EA4335]/30">Under Threat</span>
                        </div>
                        <div className="space-y-2">
                          {['Auth Service', 'DB Cluster', 'API Gateway'].map((s, i) => (
                            <div key={i} className="flex items-center justify-between bg-[#040814] px-3 py-2 rounded text-[10px]">
                              <span className="text-gray-500">{s}</span>
                              <span className="text-[#EA4335] font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Alert</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Animated Failover Connection */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-1">Failover</div>
                    <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                      <path d="M 0 12 L 60 12" stroke="#34A853" strokeWidth="2" strokeDasharray="6 3">
                        <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="0.8s" repeatCount="indefinite" />
                      </path>
                      <polygon points="54,7 60,12 54,17" fill="#34A853" />
                    </svg>
                    <div className="text-[9px] font-bold text-[#34A853] uppercase tracking-widest mt-1">Active</div>
                  </div>

                  {/* Recovery System (glowing green) */}
                  <div className="flex-1">
                    <div className="bg-[#0A0E17] border-2 border-[#34A853] animate-recovery rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[#34A853]/5"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <RefreshCcw className="w-5 h-5 text-[#34A853]" />
                            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Recovery System</span>
                          </div>
                          <span className="text-[9px] font-bold text-[#34A853] uppercase tracking-widest bg-[#34A853]/10 px-2 py-1 rounded border border-[#34A853]/30">Online</span>
                        </div>
                        <div className="space-y-2">
                          {['Backup Auth', 'Replica DB', 'Standby API'].map((s, i) => (
                            <div key={i} className="flex items-center justify-between bg-[#040814] px-3 py-2 rounded text-[10px]">
                              <span className="text-gray-500">{s}</span>
                              <span className="text-[#34A853] font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Ready</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Micro Log Feed */}
                <div className="absolute bottom-0 left-4 right-4 bg-[#02040A] border border-gray-800 rounded-xl p-4 font-mono text-[10px] overflow-hidden h-[130px]">
                  <div className="flex items-center gap-2 mb-3 border-b border-gray-800 pb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EA4335] animate-pulse"></div>
                    <span className="text-gray-500 uppercase tracking-widest font-bold text-[9px]">Live Recovery Feed</span>
                  </div>
                  <div className="space-y-2 text-gray-400">
                    <p className="opacity-40"><span className="text-[#EA4335]">[ALERT]</span> 09:14:02 — Threat detected on primary node</p>
                    <p className="opacity-60"><span className="text-[#FBBC05]">[SYNC]</span>&nbsp; 09:14:03 — Backup integrity verified (SHA-256 OK)</p>
                    <p className="opacity-80"><span className="text-[#0B79BF]">[INFO]</span>&nbsp; 09:14:04 — Initiating failover to recovery node</p>
                    <p className="opacity-100 drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]"><span className="text-[#34A853]">[OK]</span>&nbsp;&nbsp;&nbsp; 09:14:05 — Recovery node active. Zero data loss.</p>
                  </div>
                  <div className="mt-2">
                    <span className="w-2 h-3.5 bg-[#34A853] inline-block animate-pulse"></span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#02040A] to-transparent pointer-events-none"></div>
                </div>

              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 2. RISK (Threats & Business Impact) ================= */}
      <section className="py-24 md:py-32 bg-white relative border-b border-gray-200 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#EA4335]/30 to-transparent"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EA4335]/5 border border-[#EA4335]/20 rounded-full mb-6">
                <AlertTriangle className="w-3.5 h-3.5 text-[#EA4335]" />
                <span className="text-xs font-bold text-[#EA4335] uppercase tracking-widest">Risk Awareness</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bebas text-gray-900 tracking-wide mb-4">
                The Cost of Downtime and Cyber Failure
              </h2>
              <p className="text-[#EA4335] text-sm font-bold mb-6">
                Most organizations only realize the impact after systems go down.
              </p>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                Cyberattacks, system failures, and unexpected disruptions are no longer rare events—they are inevitable. Without a resilience strategy, even a single incident can halt operations and cause lasting damage.
              </p>
            </Reveal>
          </div>

          {/* Risk Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-12">
            {[
              {
                icon: ShieldAlert,
                title: "Ransomware & Data Breaches",
                desc: "Critical systems locked or compromised, leading to data loss and operational paralysis.",
                impact: "Revenue loss & data exposure"
              },
              {
                icon: Activity,
                title: "System Downtime",
                desc: "Even short outages can disrupt operations, reduce productivity, and impact revenue.",
                impact: "Operational disruption"
              },
              {
                icon: Database,
                title: "Unreliable Recovery Systems",
                desc: "Backup systems that fail when needed most increase risk during critical incidents.",
                impact: "Extended outage risk"
              },
              {
                icon: RefreshCcw,
                title: "Slow Incident Response",
                desc: "Delayed detection and recovery extend downtime and increase damage.",
                impact: "Customer churn & trust loss"
              },
              {
                icon: Layers,
                title: "External Dependency",
                desc: "Reliance on external infrastructure delays recovery and reduces control.",
                impact: "Loss of operational control"
              },
            ].map((risk, i) => (
              <Reveal key={i} delay={i * 80} className="group">
                <div className="relative bg-slate-50 border border-gray-200 rounded-2xl p-7 h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-[#EA4335]/40 hover:shadow-[0_20px_40px_rgba(234,67,53,0.08)] hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EA4335]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[#EA4335]/8 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#EA4335]/15 group-hover:scale-110 transition-all duration-300">
                      <risk.icon className="w-6 h-6 text-[#EA4335]" />
                    </div>
                    <h3 className="text-xl font-bebas text-gray-900 tracking-wider mb-2">{risk.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed flex-grow">{risk.desc}</p>

                    {/* Hover Impact Disclosure */}
                    <div className="mt-5 pt-4 border-t border-gray-100 overflow-hidden max-h-0 group-hover:max-h-20 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-in-out">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#EA4335] flex-shrink-0" />
                        <span className="text-xs font-bold text-[#EA4335] uppercase tracking-widest">Potential Impact: {risk.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Impact Strip */}
          <Reveal delay={450}>
            <div className="max-w-4xl mx-auto bg-[#EA4335]/5 border-l-4 border-[#EA4335] p-6 rounded-r-xl relative overflow-hidden group hover:bg-[#EA4335]/8 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-[#EA4335]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start gap-4 relative z-10">
                <AlertTriangle className="w-6 h-6 text-[#EA4335] flex-shrink-0 mt-0.5" />
                <p className="text-gray-800 font-bold text-base leading-relaxed">
                  Downtime directly impacts revenue, customer trust, and operational continuity.
                  <span className="block text-sm text-gray-500 font-normal mt-1">
                    A resilience strategy is no longer optional—it is a business requirement.
                  </span>
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 3. RESILIENCE SHIFT (Traditional DR vs Cyber Resilience) ================= */}
      <section className="py-24 md:py-32 bg-slate-50 relative border-b border-gray-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#14477B]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-gray-900 tracking-wide mb-4">
                From Disaster Recovery to Cyber Resilience
              </h2>
              <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed">
                Preventing attacks is not enough—systems must continue operating and recover instantly.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-14">

            {/* Left: Traditional DR (Weak/Muted) */}
            <Reveal direction="right">
              <div className="h-full bg-white border border-gray-200 rounded-2xl p-8 opacity-75 hover:opacity-90 transition-opacity duration-300 relative group">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-red-50/50 rounded-r-2xl -z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <HardDrive className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Outdated Model</p>
                      <h3 className="text-2xl font-bebas text-gray-700 tracking-wider">Traditional Disaster Recovery</h3>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {[
                      { label: "Focus on backup only", detail: "No active protection during incidents" },
                      { label: "Recovery after failure", detail: "Systems must go down before recovery starts" },
                      { label: "Manual processes", detail: "Human-dependent, slow, and error-prone" },
                      { label: "Long downtime", detail: "Business operations halted" },
                      { label: "Limited preparedness", detail: "No active threat response capability" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 group/row relative">
                        <div className="w-6 h-6 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2.5 h-0.5 bg-red-400 rounded-full"></div>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-gray-600 line-through decoration-red-300/60">{item.label}</span>
                          <p className="text-xs text-gray-400 mt-0.5 opacity-0 group-hover/row:opacity-100 transition-opacity duration-200">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-xs font-bold text-red-400 uppercase tracking-widest">
                      Systems go down before recovery begins.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: Cyber Resilience (Strong/Glowing) */}
            <Reveal direction="left" delay={150}>
              <div className="h-full bg-[#040814] rounded-2xl p-8 relative overflow-hidden shadow-[0_30px_60px_rgba(20,71,123,0.25)] border border-[#0B79BF]/30 group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-60 h-60 bg-[#34A853]/15 rounded-full blur-[60px]"></div>
                <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-[#0B79BF]/20 rounded-full blur-[80px]"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-[#34A853]/20 border border-[#34A853]/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(52,168,83,0.3)]">
                      <ShieldCheck className="w-5 h-5 text-[#34A853]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#34A853] uppercase tracking-widest">Modern Standard</p>
                      <h3 className="text-2xl font-bebas text-white tracking-wider">Cyber Resilience with Bichuten</h3>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {[
                      { label: "Continuous system protection", detail: "Active monitoring before, during, and after threats" },
                      { label: "Real-time failover", detail: "Instant switch to backup—zero manual intervention" },
                      { label: "Automated recovery", detail: "System restores itself without human delay" },
                      { label: "Minimal downtime", detail: "Operations continue even during active disruptions" },
                      { label: "Always prepared", detail: "Resilience embedded at the infrastructure level" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 group/row relative">
                        <div className="w-6 h-6 rounded-full bg-[#34A853]/20 border border-[#34A853]/40 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/row:shadow-[0_0_10px_rgba(52,168,83,0.5)] transition-shadow">
                          <CheckCircle className="w-3.5 h-3.5 text-[#34A853]" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white">{item.label}</span>
                          <p className="text-xs text-blue-200/60 mt-0.5 opacity-0 group-hover/row:opacity-100 transition-opacity duration-200">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-xs font-bold text-[#34A853] uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></span>
                      Systems continue operating—even during disruptions.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Bottom statements + outcome strip */}
          <Reveal delay={400}>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl font-bebas text-[#14477B] tracking-wide mb-6">
                "Bichuten ensures systems don't just recover—they remain operational."
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold tracking-[0.1em] uppercase text-gray-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#34A853]" /> Continuous operations
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#34A853]" /> Zero disruption mindset
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#34A853]" /> Instant recovery readiness
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 4. ATTACK → FAILOVER → RECOVERY FLOW ================= */}
      <section className="py-24 md:py-32 bg-[#040814] relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '100% 4px' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#14477B]/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">
                How Bichuten Ensures Continuous Operations
              </h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                Even during attacks or failures, systems automatically transition, recover, and continue operating without disruption.
              </p>
            </Reveal>
          </div>

          {/* 3-Step Flow */}
          <div className="relative max-w-5xl mx-auto">

            {/* Step Cards */}
            <div className="grid md:grid-cols-3 gap-6 relative z-10">

              {/* Step 1: Threat Detected */}
              <Reveal delay={0} className="group">
                <div className="relative bg-[#0A0E17] border-2 border-[#EA4335]/50 rounded-2xl p-8 h-full flex flex-col animate-attack hover:border-[#EA4335] hover:shadow-[0_0_40px_rgba(234,67,53,0.2)] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#EA4335]/8 to-transparent rounded-2xl pointer-events-none"></div>

                  {/* Live indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#EA4335]/10 border border-[#EA4335]/30 px-2 py-1 rounded text-[9px] font-bold text-[#EA4335] uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335] animate-pulse"></span>ALERT
                  </div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#EA4335]/10 border border-[#EA4335]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <ShieldAlert className="w-8 h-8 text-[#EA4335]" />
                    </div>
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Step 01</div>
                    <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Threat Detected</h3>
                    <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                      Cyberattack or system disruption detected in real-time.
                    </p>

                    {/* Sub-system status */}
                    <div className="mt-6 space-y-2">
                      {['Auth Service', 'DB Cluster', 'API Gateway'].map((s, i) => (
                        <div key={i} className="flex items-center justify-between bg-[#040814] px-3 py-1.5 rounded text-[10px]">
                          <span className="text-gray-600">{s}</span>
                          <span className="text-[#EA4335] font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Alert
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Hover tooltip */}
                    <div className="mt-5 pt-4 border-t border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-[10px] text-[#EA4335] font-bold uppercase tracking-widest">Detection time: &lt;1 second</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Step 2: Failover Activated */}
              <Reveal delay={150} className="group">
                <div className="relative bg-[#0A0E17] border-2 border-[#0B79BF]/50 rounded-2xl p-8 h-full flex flex-col hover:border-[#0B79BF] hover:shadow-[0_0_40px_rgba(11,121,191,0.2)] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0B79BF]/8 to-transparent rounded-2xl pointer-events-none"></div>

                  {/* Live indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#0B79BF]/10 border border-[#0B79BF]/30 px-2 py-1 rounded text-[9px] font-bold text-[#0B79BF] uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B79BF] animate-pulse"></span>SYNC
                  </div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#0B79BF]/10 border border-[#0B79BF]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <RefreshCcw className="w-8 h-8 text-[#0B79BF] group-hover:animate-spin" style={{ animationDuration: '1s' }} />
                    </div>
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Step 02</div>
                    <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Failover Activated</h3>
                    <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                      Systems automatically shift to secure recovery environments.
                    </p>

                    {/* Animated data transfer visualization */}
                    <div className="mt-6 space-y-2">
                      {[
                        { label: 'Data Sync', pct: '100%', color: 'bg-[#0B79BF]' },
                        { label: 'Auth Mirror', pct: '98%', color: 'bg-[#0B79BF]' },
                        { label: 'Config Transfer', pct: '100%', color: 'bg-[#34A853]' },
                      ].map((item, i) => (
                        <div key={i} className="text-[10px]">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600">{item.label}</span>
                            <span className="text-[#0B79BF] font-bold">{item.pct}</span>
                          </div>
                          <div className="w-full bg-gray-800 h-0.5 rounded overflow-hidden">
                            <div className={`h-full ${item.color} rounded shadow-[0_0_6px_currentColor]`} style={{ width: item.pct }}></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Hover tooltip */}
                    <div className="mt-5 pt-4 border-t border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-[10px] text-[#0B79BF] font-bold uppercase tracking-widest">Failover completed in milliseconds</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Step 3: Recovery Active */}
              <Reveal delay={300} className="group">
                <div className="relative bg-[#0A0E17] border-2 border-[#34A853]/50 rounded-2xl p-8 h-full flex flex-col animate-recovery hover:border-[#34A853] hover:shadow-[0_0_40px_rgba(52,168,83,0.2)] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#34A853]/8 to-transparent rounded-2xl pointer-events-none"></div>

                  {/* Live indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#34A853]/10 border border-[#34A853]/30 px-2 py-1 rounded text-[9px] font-bold text-[#34A853] uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse"></span>ACTIVE
                  </div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#34A853]/10 border border-[#34A853]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative">
                      <ShieldCheck className="w-8 h-8 text-[#34A853]" />
                      <div className="absolute inset-0 rounded-2xl border border-[#34A853]/20 animate-ping" style={{ animationDuration: '2s' }}></div>
                    </div>
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Step 03</div>
                    <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Recovery Active</h3>
                    <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                      Operations continue with minimal downtime and zero data loss.
                    </p>

                    {/* Sub-system recovered status */}
                    <div className="mt-6 space-y-2">
                      {['Backup Auth', 'Replica DB', 'Standby API'].map((s, i) => (
                        <div key={i} className="flex items-center justify-between bg-[#040814] px-3 py-1.5 rounded text-[10px]">
                          <span className="text-gray-600">{s}</span>
                          <span className="text-[#34A853] font-bold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Online
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Hover tooltip */}
                    <div className="mt-5 pt-4 border-t border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-[10px] text-[#34A853] font-bold uppercase tracking-widest">Zero data loss confirmed</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Connecting SVG flow lines (desktop) */}
            <div className="hidden md:block absolute top-[90px] left-0 right-0 pointer-events-none z-0 px-[calc(33%+16px)]" style={{ width: 'calc(66% - 48px)', marginLeft: 'calc(16.67% + 24px)' }}>
              <svg viewBox="0 0 200 20" className="w-full" fill="none">
                <path d="M 0 10 L 200 10" stroke="url(#flowGrad)" strokeWidth="1.5" strokeDasharray="6 3">
                  <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1s" repeatCount="indefinite" />
                </path>
                <defs>
                  <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#EA4335" />
                    <stop offset="50%" stopColor="#0B79BF" />
                    <stop offset="100%" stopColor="#34A853" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

          </div>

          {/* Micro timeline */}
          <Reveal delay={450}>
            <div className="text-center mt-12 mb-10">
              <p className="text-xs text-gray-600 font-bold uppercase tracking-[0.2em]">
                Detection &nbsp;→&nbsp; Failover &nbsp;→&nbsp; Recovery &nbsp;
                <span className="text-[#34A853]">(within seconds)</span>
              </p>
            </div>
          </Reveal>

          {/* Outcome Strip */}
          <Reveal delay={500}>
            <div className="max-w-3xl mx-auto text-center border-t border-gray-800 pt-10">
              <p className="text-2xl md:text-3xl font-bebas text-white tracking-wide mb-4">
                Result: Minimal downtime. Zero data loss. Continuous operations.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
                {[
                  { label: 'Uptime Protected', color: 'text-[#34A853]' },
                  { label: 'Zero Data Loss', color: 'text-[#0B79BF]' },
                  { label: 'Auto-Recovery', color: 'text-[#FBBC05]' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${item.color}`} />
                    <span className={`text-xs font-bold uppercase tracking-widest ${item.color}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </section>


      {/* ================= 6. RESILIENCE MODULES (Product Architecture) ================= */}
      <section className="py-24 md:py-32 bg-[#040814] relative overflow-hidden border-y border-white/5">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0B79BF]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#34A853]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">
                Resilience Built Into Every Layer
              </h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                From disaster recovery to secure data vaults, every component is designed to ensure continuous operations and rapid recovery.
              </p>
            </Reveal>
          </div>

          {/* Cards Grid Container */}
          <div className="relative">
            
            {/* Connection Line (Advanced) - Desktop only */}
            <div className="hidden lg:block absolute top-[110px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#0B79BF]/50 to-transparent z-0">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#34A853] to-transparent w-1/3 animate-[scanLineHorizontal_3s_linear_infinite]" style={{ animation: 'scanLineHorizontal 3s linear infinite' }}></div>
            </div>

            <style>{`
              @keyframes scanLineHorizontal {
                0% { transform: translateX(-100%); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translateX(300%); opacity: 0; }
              }
            `}</style>

            <div className="grid lg:grid-cols-3 gap-8 relative z-10">
              
              {/* Card 1 */}
              <Reveal delay={0} className="group">
                <div className="h-full bg-[#0A0E17] border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#0B79BF]/50 hover:shadow-[0_0_40px_rgba(11,121,191,0.15)] flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0B79BF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-xl bg-[#0B79BF]/10 border border-[#0B79BF]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0B79BF]/20 transition-all duration-300">
                        <RefreshCcw className="w-7 h-7 text-[#0B79BF]" />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Module 01</span>
                    </div>
                    
                    <h3 className="text-2xl font-bebas text-white tracking-wider mb-4 group-hover:text-[#0B79BF] transition-colors">
                      Disaster Recovery Infrastructure
                    </h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed flex-grow">
                      Ensures operational continuity during infrastructure failures or regional disruptions.
                    </p>
                    
                    <div className="space-y-4 border-t border-gray-800/50 pt-6">
                      {[
                        "Geo-distributed environments",
                        "Automated failover architecture",
                        "Real-time data replication"
                      ].map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-[#0B79BF] flex-shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                          <span className="text-sm text-gray-300 font-medium">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Card 2 */}
              <Reveal delay={150} className="group">
                <div className="h-full bg-[#0A0E17] border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#EA4335]/50 hover:shadow-[0_0_40px_rgba(234,67,53,0.15)] flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EA4335]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-xl bg-[#EA4335]/10 border border-[#EA4335]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#EA4335]/20 transition-all duration-300">
                        <ShieldAlert className="w-7 h-7 text-[#EA4335]" />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Module 02</span>
                    </div>
                    
                    <h3 className="text-2xl font-bebas text-white tracking-wider mb-4 group-hover:text-[#EA4335] transition-colors">
                      Isolated Recovery Vault
                    </h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed flex-grow">
                      Secure, isolated environments designed to protect critical data from cyber threats.
                    </p>
                    
                    <div className="space-y-4 border-t border-gray-800/50 pt-6">
                      {[
                        "Immutable storage",
                        "Air-gapped architecture",
                        "Controlled recovery processes"
                      ].map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-[#EA4335] flex-shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                          <span className="text-sm text-gray-300 font-medium">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Card 3 */}
              <Reveal delay={300} className="group">
                <div className="h-full bg-[#0A0E17] border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#34A853]/50 hover:shadow-[0_0_40px_rgba(52,168,83,0.15)] flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#34A853]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-xl bg-[#34A853]/10 border border-[#34A853]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#34A853]/20 transition-all duration-300">
                        <HardDrive className="w-7 h-7 text-[#34A853]" />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Module 03</span>
                    </div>
                    
                    <h3 className="text-2xl font-bebas text-white tracking-wider mb-4 group-hover:text-[#34A853] transition-colors">
                      Backup & Data Protection Systems
                    </h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed flex-grow">
                      Continuous and automated protection of enterprise data with rapid recovery capabilities.
                    </p>
                    
                    <div className="space-y-4 border-t border-gray-800/50 pt-6">
                      {[
                        "Automated backups",
                        "Encrypted storage",
                        "Granular restoration"
                      ].map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                          <span className="text-sm text-gray-300 font-medium">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>

          {/* Trust Strip */}
          <Reveal delay={450}>
            <div className="mt-16 text-center border-t border-gray-800/50 pt-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#0A0E17] border border-gray-800 rounded-full">
                <ShieldCheck className="w-5 h-5 text-[#34A853]" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                  Designed for high availability, security, and rapid recovery.
                </span>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 7. BUSINESS OUTCOMES (CYBER RESILIENCE VALUE) ================= */}
      <section className="py-24 bg-slate-50 relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">
                What Cyber Resilience Delivers
              </h2>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                Cyber resilience is not just about recovery—it is about maintaining operations, protecting value, and ensuring long-term stability.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { title: "CONTINUOUS OPERATIONS", desc: "Maintain system availability even during cyberattacks or infrastructure failures.", icon: Activity },
              { title: "MINIMIZED DOWNTIME", desc: "Reduce operational disruption with automated failover and rapid recovery systems.", icon: RefreshCcw },
              { title: "DATA PROTECTION", desc: "Ensure critical data remains secure, backed up, and fully recoverable.", icon: Lock },
              { title: "REDUCED FINANCIAL IMPACT", desc: "Avoid revenue loss and operational costs associated with downtime and breaches.", icon: Landmark },
              { title: "BUSINESS CONTINUITY", desc: "Keep services running and maintain operational stability under all conditions.", icon: Globe },
              { title: "ENHANCED TRUST", desc: "Strengthen confidence among customers, partners, and regulators.", icon: ShieldCheck }
            ].map((outcome, i) => (
              <Reveal key={i} delay={i * 100} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-2 hover:border-[#14477B]/30 transition-all duration-300 flex flex-col h-full group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-[#14477B]/5 transition-colors">
                  <outcome.icon className="w-6 h-6 text-[#0B79BF] group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-wide">{outcome.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-grow">{outcome.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="text-center flex flex-col items-center">
              <div className="bg-[#14477B] text-white px-8 py-4 rounded-xl shadow-md mb-6 transform transition-transform hover:scale-105">
                <p className="text-xl md:text-2xl font-bebas tracking-wide">
                  Resilience transforms risk into operational stability.
                </p>
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                Designed for high-availability and mission-critical systems.
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 8. USE CASES (MISSION-CRITICAL) ================= */}
      <section className="py-24 md:py-32 bg-white relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EA4335]/10 border border-[#EA4335]/20 rounded-full mb-6">
                <AlertTriangle className="w-4 h-4 text-[#EA4335]" />
                <span className="text-xs font-bold text-[#EA4335] uppercase tracking-widest">
                  Used in systems that must remain operational—at all times
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bebas text-gray-900 tracking-wide mb-6">
                Where Resilience is Mission-Critical
              </h2>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                Bichuten powers resilience infrastructure for environments where downtime, disruption, or data loss is unacceptable.
              </p>
            </Reveal>
          </div>

          {/* Tab Navigation */}
          <Reveal delay={150}>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
              {useCases.map((uc, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveUseCase(idx)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                    activeUseCase === idx
                      ? 'bg-[#14477B] text-white shadow-lg scale-105'
                      : 'bg-slate-100 text-gray-500 hover:bg-slate-200 hover:text-gray-900'
                  }`}
                >
                  <uc.icon className={`w-4 h-4 ${activeUseCase === idx ? 'text-white' : 'text-gray-500'}`} />
                  {uc.shortName}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Tab Content */}
          <Reveal delay={300}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#040814] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(11,121,191,0.2)] transition-shadow duration-500 border border-gray-800 hover:border-[#0B79BF]/50">
                {/* Abstract Backgrounds */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0B79BF]/20 rounded-full blur-[80px] pointer-events-none transition-all duration-500 group-hover:bg-[#0B79BF]/30"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EA4335]/10 rounded-full blur-[80px] pointer-events-none transition-all duration-500 group-hover:bg-[#EA4335]/20"></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <ActiveUseCaseIcon className="w-16 h-16 text-[#0B79BF]" />
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3 text-center md:text-left">
                    <h3 className="text-3xl font-bebas text-white tracking-wider mb-4">
                      {useCases[activeUseCase].industry}
                    </h3>
                    <p className="text-[#0B79BF] font-medium text-lg mb-8 leading-relaxed">
                      "{useCases[activeUseCase].context}"
                    </p>
                    
                    <div className="space-y-4 inline-block text-left">
                      <p className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">Key Applications:</p>
                      {useCases[activeUseCase].apps.map((app, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-[#34A853] flex-shrink-0" />
                          <span className="text-gray-300 font-medium">{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* CTA & Trust Line */}
          <Reveal delay={450}>
            <div className="mt-16 text-center flex flex-col items-center">
              <p className="text-gray-600 font-medium mb-8 text-lg">
                Not sure where you fit? <a href="/contact" className="text-[#0B79BF] font-bold hover:underline inline-flex items-center gap-1 group">Talk to our team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></a>
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-gray-600 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                Designed for mission-critical and high-availability environments.
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 9. INTEGRATION ACROSS LAYERS ================= */}
      <section className="py-24 bg-[#14477B] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/3">
              <Reveal>
                <Layers className="w-10 h-10 text-[#FBBC05] mb-6" />
                <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">Resilience Integrated Across Layers</h2>
                <p className="text-blue-100 leading-relaxed text-lg">
                  The Cyber Resilience Solution is built on the Bichuten platform, integrating multiple native layers to ensure absolute protection without bolt-on software.
                </p>
              </Reveal>
            </div>
            <div className="w-full lg:w-2/3">
              <div className="grid md:grid-cols-2 gap-4">
                <Reveal delay={100}><div className="bg-white/10 p-6 rounded-xl border border-white/20 flex items-center gap-4 hover:bg-white/20 transition-colors"><div className="p-3 bg-[#FBBC05]/20 rounded-lg"><Server className="w-6 h-6 text-[#FBBC05]" /></div><div><h3 className="text-white font-bold">Infrastructure</h3><p className="text-sm text-blue-200">For high availability</p></div></div></Reveal>
                <Reveal delay={200}><div className="bg-white/10 p-6 rounded-xl border border-white/20 flex items-center gap-4 hover:bg-white/20 transition-colors"><div className="p-3 bg-[#EA4335]/20 rounded-lg"><ShieldAlert className="w-6 h-6 text-[#EA4335]" /></div><div><h3 className="text-white font-bold">Security Layer</h3><p className="text-sm text-blue-200">For threat protection</p></div></div></Reveal>
                <Reveal delay={300}><div className="bg-white/10 p-6 rounded-xl border border-white/20 flex items-center gap-4 hover:bg-white/20 transition-colors"><div className="p-3 bg-[#4285F4]/20 rounded-lg"><Lock className="w-6 h-6 text-[#4285F4]" /></div><div><h3 className="text-white font-bold">Identity Layer</h3><p className="text-sm text-blue-200">For controlled access</p></div></div></Reveal>
                <Reveal delay={400}><div className="bg-white/10 p-6 rounded-xl border border-white/20 flex items-center gap-4 hover:bg-white/20 transition-colors"><div className="p-3 bg-[#34A853]/20 rounded-lg"><Activity className="w-6 h-6 text-[#34A853]" /></div><div><h3 className="text-white font-bold">Compliance</h3><p className="text-sm text-blue-200">For monitoring & reporting</p></div></div></Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 10. NEPAL ADVANTAGE (RECOVERY + CONTROL) ================= */}
      <section className="py-24 md:py-32 bg-[#040814] relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0B79BF]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left: Content */}
            <div className="w-full lg:w-1/2">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EA4335]/10 border border-[#EA4335]/20 rounded-full mb-6">
                  <MapPin className="w-4 h-4 text-[#EA4335]" />
                  <span className="text-xs font-bold text-[#EA4335] uppercase tracking-widest">
                    Where your infrastructure is located directly impacts how fast you recover.
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">
                  Recovery Within a Controlled Environment
                </h2>
                
                <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                  Bichuten ensures that all recovery processes, backups, and failover operations occur within Nepal—delivering faster response times and full control.
                </p>
              </Reveal>

              <div className="space-y-4 mb-10">
                {[
                  { title: "Local Recovery Systems", desc: "Failover and recovery processes operate within Nepal, reducing latency and delays." },
                  { title: "Full Infrastructure Control", desc: "All systems remain within your jurisdiction, ensuring maximum control." },
                  { title: "No External Dependency", desc: "Eliminate reliance on foreign infrastructure during critical recovery moments." },
                  { title: "Faster Response Time", desc: "Local deployment enables faster detection, failover, and restoration." },
                  { title: "Regulatory Alignment", desc: "Recovery processes align with national data and compliance policies." }
                ].map((item, idx) => (
                  <Reveal key={idx} delay={idx * 100}>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-[#0B79BF]/50 transition-all duration-300 flex items-start gap-4 group cursor-default">
                      <div className="mt-1 w-2 h-2 rounded-full bg-[#0B79BF] group-hover:scale-150 transition-transform group-hover:shadow-[0_0_10px_#0B79BF] flex-shrink-0"></div>
                      <div>
                        <h4 className="text-white font-bold text-sm tracking-wide mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={500}>
                <div className="inline-flex items-center gap-4 px-6 py-4 bg-[#14477B]/20 border border-[#14477B]/40 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-[#34A853] flex-shrink-0" />
                  <span className="text-white font-bebas text-xl tracking-wider">
                    Control over infrastructure means control over recovery.
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right: Visual (Map + Nodes) */}
            <div className="w-full lg:w-1/2 relative min-h-[500px] flex items-center justify-center">
              <Reveal delay={300} className="w-full h-full flex justify-center items-center relative">
                
                {/* Minimalist Grid / Map Canvas */}
                <div className="relative w-full max-w-[500px] aspect-[4/3] bg-[#0A0E17]/80 rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
                  
                  {/* Grid background */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                  
                  {/* Glowing core connections */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,121,191,0.1)_0%,transparent_70%)]"></div>
                  
                  {/* SVG Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full z-10" style={{ filter: "drop-shadow(0 0 4px rgba(11,121,191,0.8))" }}>
                    <path d="M 50% 50% L 20% 30%" stroke="#0B79BF" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_3s_linear_infinite]" opacity="0.6" />
                    <path d="M 50% 50% L 80% 40%" stroke="#34A853" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_4s_linear_infinite_reverse]" opacity="0.6" />
                    <path d="M 50% 50% L 70% 80%" stroke="#EA4335" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_2s_linear_infinite]" opacity="0.6" />
                    <path d="M 50% 50% L 30% 70%" stroke="#FBBC05" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_5s_linear_infinite_reverse]" opacity="0.6" />
                  </svg>

                  {/* Main Recovery Hub Node (Center) */}
                  <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#14477B] border-4 border-[#040814] shadow-[0_0_30px_#0B79BF] flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform">
                    <Database className="w-6 h-6 text-white" />
                    <div className="absolute inset-0 rounded-full border-2 border-[#0B79BF] animate-ping opacity-30"></div>
                    <div className="absolute -bottom-8 whitespace-nowrap bg-black/80 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      Primary Hub
                    </div>
                  </div>

                  {/* Nodes */}
                  {[
                    { top: '30%', left: '20%', icon: ShieldCheck, color: 'text-[#0B79BF]', border: 'border-[#0B79BF]', label: 'DR Node 01' },
                    { top: '40%', left: '80%', icon: Server, color: 'text-[#34A853]', border: 'border-[#34A853]', label: 'Failover Hub' },
                    { top: '80%', left: '70%', icon: Lock, color: 'text-[#EA4335]', border: 'border-[#EA4335]', label: 'Data Vault' },
                    { top: '70%', left: '30%', icon: CloudLightning, color: 'text-[#FBBC05]', border: 'border-[#FBBC05]', label: 'Edge Sync' }
                  ].map((node, i) => (
                    <div key={i} className={`absolute z-20 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#040814] border-2 ${node.border} shadow-lg flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform`} style={{ top: node.top, left: node.left }}>
                      <node.icon className={`w-4 h-4 ${node.color}`} />
                      <div className="absolute -bottom-6 whitespace-nowrap bg-black/80 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        {node.label}
                      </div>
                    </div>
                  ))}

                  <style>{`
                    @keyframes dash {
                      to { stroke-dashoffset: -40; }
                    }
                  `}</style>
                </div>

              </Reveal>
            </div>

          </div>

          {/* Trust Strip */}
          <Reveal delay={600}>
            <div className="mt-20 border-t border-white/10 pt-8 flex flex-wrap justify-center gap-6 md:gap-16">
              {[
                { icon: ShieldCheck, text: "Locally Controlled" },
                { icon: CloudLightning, text: "Faster Recovery" },
                { icon: CheckCircle, text: "Compliance Aligned" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-[#34A853]" />
                  <span className="text-sm font-bold tracking-widest uppercase text-gray-400">{item.text}</span>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 11. DIFFERENTIATION (BICHUTEN VS TRADITIONAL DR) ================= */}
      <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">
                Beyond Traditional Disaster Recovery
              </h2>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                Traditional disaster recovery focuses on backup and restoration. Bichuten delivers continuous resilience—ensuring systems remain operational even during disruptions.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
              <div className="flex flex-col md:flex-row">
                
                {/* LEFT: Traditional DR */}
                <div className="w-full md:w-1/2 p-10 md:p-14 bg-gray-50 border-r border-gray-100 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-transparent opacity-50"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bebas text-gray-500 tracking-wider mb-8 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-gray-400" />
                      </div>
                      Traditional Disaster Recovery
                    </h3>
                    
                    <ul className="space-y-6">
                      {[
                        "Backup-focused approach",
                        "Recovery after failure",
                        "Manual intervention",
                        "Longer downtime",
                        "Limited protection"
                      ].map((point, idx) => (
                        <li key={idx} className="flex items-start gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                          <XCircle className="w-5 h-5 text-[#EA4335]/70 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* RIGHT: Bichuten */}
                <div className="w-full md:w-1/2 p-10 md:p-14 bg-[#040814] relative shadow-2xl z-10 transform md:scale-[1.03] rounded-3xl md:-ml-4 border border-[#0B79BF]/30 hover:border-[#0B79BF] transition-colors duration-500">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 rounded-3xl"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#34A853]/10 rounded-full blur-[80px] pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0B79BF]/10 rounded-full blur-[80px] pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <div className="absolute -top-14 right-4 bg-[#0B79BF] text-white text-[10px] font-bold px-4 py-1.5 rounded-t-lg uppercase tracking-[0.2em] hidden md:block">
                      The Upgrade
                    </div>
                    
                    <h3 className="text-3xl font-bebas text-white tracking-wider mb-8 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#34A853]/20 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-[#34A853]" />
                      </div>
                      Bichuten Cyber Resilience
                    </h3>
                    
                    <ul className="space-y-6">
                      {[
                        "Continuous system protection",
                        "Real-time failover",
                        "Automated recovery",
                        "Minimal downtime",
                        "End-to-end resilience"
                      ].map((point, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <CheckCircle className="w-6 h-6 text-[#34A853] mt-0 flex-shrink-0 shadow-[0_0_10px_rgba(52,168,83,0.3)] rounded-full" />
                          <span className="text-white font-medium text-lg">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="text-center max-w-2xl mx-auto mt-20">
              <p className="text-[#0B79BF] font-bold text-lg md:text-xl mb-8">
                Bichuten ensures systems remain operational—not just recoverable.
              </p>
              
              <div className="inline-flex items-center justify-center px-8 py-4 bg-[#14477B] text-white rounded-full shadow-lg border-2 border-[#14477B] hover:bg-transparent hover:text-[#14477B] transition-all duration-300 font-bold uppercase tracking-widest text-sm">
                Not a backup solution—a complete resilience system.
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 12. FINAL CTA ================= */}
      <section className="py-32 bg-[#040814] relative overflow-hidden">
        {/* Abstract Backgrounds & Glows */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0B79BF]/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#14477B]/20 to-transparent pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm">
              <Activity className="w-4 h-4 text-[#EA4335] animate-pulse" />
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                Downtime increases risk with every second.
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-5xl md:text-6xl font-bebas text-white tracking-wider mb-6 leading-tight">
              Ensure Your Systems <span className="text-[#0B79BF]">Never Go Down</span>
            </h2>
            <p className="text-gray-400 text-xl mb-12 leading-relaxed max-w-3xl">
              Build a resilience-first infrastructure that protects your systems, ensures continuity, and enables instant recovery under any condition.
            </p>
          </Reveal>

          <Reveal delay={200} className="w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              {/* Primary Button */}
              <button className="w-full sm:w-auto px-8 py-4 bg-[#0B79BF] hover:bg-[#14477B] text-white rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(11,121,191,0.3)] hover:scale-105 flex items-center justify-center gap-2 group">
                Request Resilience Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {/* Secondary Button */}
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/20 hover:border-white/50 text-white rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/5 hover:scale-105">
                Talk to an Expert
              </button>
              
              {/* Tertiary Button */}
              <button className="w-full sm:w-auto px-6 py-4 bg-transparent text-gray-400 hover:text-white rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:bg-white/5">
                View Recovery Architecture
              </button>
            </div>
          </Reveal>

          <Reveal delay={300} className="w-full">
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto border-t border-white/10 pt-10 mb-12">
              <div className="flex flex-col items-center text-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#34A853]" />
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">No obligation consultation</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#34A853]" />
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Enterprise-grade resilience</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <Server className="w-5 h-5 text-[#34A853]" />
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Mission-critical design</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="bg-[#14477B]/20 border border-[#14477B]/30 px-8 py-5 rounded-2xl mb-8">
              <p className="text-[#0B79BF] font-bebas text-2xl tracking-widest">
                Always protected. Always operational. Always recoverable.
              </p>
            </div>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Our team will guide you through resilience planning, system setup, and deployment.
            </p>
          </Reveal>

        </div>
      </section>

    </div>
  );
};

export default CyberResilienceDR;