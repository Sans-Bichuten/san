import React, { useEffect, useRef, useState } from 'react';
import {
  Users, Target, ShieldCheck, Server, Compass,
  ArrowRight, CheckCircle, Award, Eye, FileText,
  Lock, Globe, Mail, Activity, Cpu, Scale, Phone, Clock
} from 'lucide-react';

// --- Team Images ---
import imgSharad from '../assets/team/Sharad_Goel_Executive_Director.png';
import imgMin from '../assets/team/Min_Agrawal_Director.png';
import imgVishal from '../assets/team/Vishal_Jatia_Director.png';
import imgNaveen from '../assets/team/Naveen_Agarwal_Chairman.jpeg';

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

// --- Real Data for Leaders ---
const leadershipTeam = [
  {
    name: "Sharad Goel",
    role: "Executive Director",
    phone: "+977 9851327155",
    email: "sharad@bichuten.com",
    experience:
      "Over 25 years of extensive experience in the manufacturing industry.",
    expertise: [
      "Strategic Leadership",
      "Operational Excellence",
      "Manufacturing Operations",
      "Market Strategy",
      "Quality Control",
      "Business Growth & Market Penetration"
    ],
    summary:
      "Dynamic and seasoned professional with a robust technical background complemented by a Master's degree in Marketing, providing a rare blend of operational expertise and strategic market insight.",
    image: imgSharad
  },
  {
    name: "Min Agrawal",
    role: "Director",
    phone: "",
    email: "",
    experience:
      "Strong academic foundation in management, marketing, and finance with adaptability in dynamic professional environments.",
    expertise: [
      "Business Management",
      "Communication & Analysis",
      "Team Collaboration",
      "Strategic Support",
      "Marketing Knowledge",
      "Interpersonal Skills"
    ],
    summary:
      "Business Management graduate from Kathmandu College of Management (KCM) skilled in communication, analysis, and teamwork, with the ability to contribute effectively across operational and strategic roles.",
    image: imgMin
  },
  {
    name: "Vishal Kumar Jatia",
    role: "Director",
    phone: "+977 9851034667",
    email: "vishal@bichuten.com",
    experience:
      "Experience in business operations and strategic development.",
    expertise: [
      "Business Operations",
      "Strategic Development",
      "Execution & Partnerships",
      "Organizational Growth"
    ],
    summary:
      "Focused on execution, partnerships, and organizational growth initiatives supporting long-term business expansion.",
    image: imgVishal
  }
];

const LeadershipTeam = () => {
  const [settings, setSettings] = useState({
    contact_email: 'info@bichuten.com',
    contact_phone: '+977 9714509070'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/bichuten_backend/public/get-settings.php');
        const data = await response.json();
        if (data.status === 'success' && data.settings) {
          setSettings(prev => ({
            ...prev,
            ...data.settings
          }));
        }
      } catch (err) {
        console.error('Failed to load settings in leadership page:', err);
      }
    };
    fetchSettings();
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden">

      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          .pattern-dots-light {
            background-image: radial-gradient(#14477B 1px, transparent 1px);
            background-size: 24px 24px;
            opacity: 0.05;
          }
          .glass-light {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 1);
            box-shadow: 0 10px 40px -10px rgba(20, 71, 123, 0.08);
          }
          @keyframes floatSubtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-float-subtle {
            animation: floatSubtle 5s ease-in-out infinite;
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION (Light & Clean Theme) ================= */}
      <section className="relative pt-40 pb-32 min-h-[75vh] flex flex-col justify-center border-b border-gray-200 bg-white overflow-hidden">
        {/* Abstract Background Gradients */}
        <div className="absolute inset-0 pattern-dots-light z-0"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-bl from-blue-100/50 via-white to-transparent rounded-full blur-[100px] z-0"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-slate-200/50 via-white to-transparent rounded-full blur-[100px] z-0"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full mb-8">
                <Users className="w-4 h-4 text-[#0B79BF]" />
                <span className="text-xs font-bold tracking-widest uppercase text-gray-700">Leadership Team</span>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-[#14477B] mb-6 leading-[1.05]">
                Leadership Behind <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14477B] to-[#0B79BF]">
                  Nepal’s Digital Infrastructure
                </span>
              </h1>

              <p className="text-xl md:text-2xl font-bold text-[#14477B] mb-8">
                Driving security, scale, and long-term infrastructure strategy.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-lg md:text-xl font-light text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
                Our leadership team brings together deep expertise across infrastructure, cybersecurity, governance, and enterprise systems to build a sovereign digital foundation for Nepal.
              </p>

              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-10">
                Built for mission-critical systems and long-term digital transformation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#" className="flex items-center justify-center gap-2 bg-[#14477B] text-white px-8 py-4 rounded-md font-bold hover:bg-[#0a2e52] transition-colors w-full sm:w-auto shadow-md">
                  Explore Platform
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#" className="flex items-center justify-center gap-2 bg-white text-[#14477B] px-8 py-4 rounded-md font-bold border border-gray-200 hover:border-[#14477B] hover:shadow-sm transition-all w-full sm:w-auto">
                  Contact Leadership Team
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= 2. CHAIRMAN SPOTLIGHT ================= */}
      <section className="py-24 relative bg-slate-50 border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 pattern-dots-light z-0"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col lg:flex-row relative group">

            {/* LEFT: Large Professional Image */}
            <div className="lg:w-[45%] relative min-h-[500px] lg:min-h-full bg-slate-200">
              <img
                src={imgNaveen}
                alt="Mr. Naveen Agarwal, Chairman"
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14477B]/80 via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 bg-[#14477B]/10 mix-blend-multiply"></div>
              {/* Decorative Element */}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#14477B] to-[#0B79BF]"></div>
            </div>

            {/* RIGHT: Content (Structured) */}
            <div className="lg:w-[55%] p-10 lg:p-16 flex flex-col justify-center bg-white relative">
              <Reveal direction="left">

                {/* NAME & TITLE */}
                <div className="mb-8 border-b border-gray-100 pb-8">
                  <h2 className="text-5xl md:text-6xl font-bebas text-[#14477B] tracking-wide mb-2">Mr. Naveen Agarwal</h2>
                  <p className="text-[#0B79BF] font-bold text-sm md:text-base uppercase tracking-widest mb-5">Chairman, Bichuten Data Vault</p>

                  {/* EXPERIENCE HIGHLIGHT */}
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-[#14477B] px-5 py-2.5 rounded-full text-sm font-bold border border-blue-100 shadow-sm">
                    <Award className="w-4 h-4 text-[#0B79BF]" />
                    30+ years of experience across trading, distribution & retail operations
                  </div>
                </div>

                {/* SHORT INTRO */}
                <div className="mb-10">
                  <p className="text-gray-700 text-xl md:text-2xl font-light leading-relaxed border-l-4 border-gray-200 pl-6 italic">
                    "Seasoned business leader driving sustainable growth, strategic partnerships, and operational excellence."
                  </p>
                </div>


                <div className="grid md:grid-cols-2 gap-10 mb-10">
                  {/* KEY STRENGTHS */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-5 flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#0B79BF]" /> Key Strengths
                    </h4>

                    <ul className="space-y-4">
                      <li className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                        <CheckCircle className="w-5 h-5 text-[#0B79BF] shrink-0" />
                        <span className="leading-tight">Strategic Leadership & Business Growth</span>
                      </li>

                      <li className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                        <CheckCircle className="w-5 h-5 text-[#0B79BF] shrink-0" />
                        <span className="leading-tight">Distribution Network Development</span>
                      </li>

                      <li className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                        <CheckCircle className="w-5 h-5 text-[#0B79BF] shrink-0" />
                        <span className="leading-tight">Long-Term Brand Partnerships</span>
                      </li>

                      <li className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                        <CheckCircle className="w-5 h-5 text-[#0B79BF] shrink-0" />
                        <span className="leading-tight">Sales & Operational Management</span>
                      </li>
                    </ul>
                  </div>

                  {/* LEADERSHIP FOCUS */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-5 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#0B79BF]" /> Leadership Focus
                    </h4>

                    <div className="bg-slate-50 p-5 rounded-xl border border-gray-100 h-full shadow-inner">
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        Focused on building trusted business ecosystems, strengthening partnerships, and driving long-term sustainable growth across industries.
                      </p>
                    </div>
                  </div>
                </div>

                {/* IMPACT LINE */}
                <div className="bg-gradient-to-r from-[#14477B] to-[#0a355c] text-white p-6 rounded-xl mb-10 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-bl-full"></div>

                  <p className="text-base font-medium leading-relaxed flex gap-4 items-center relative z-10">
                    <ShieldCheck className="w-8 h-8 text-[#4da6e7] shrink-0" />
                    <span>
                      Providing strategic direction for Bichuten’s vision of sovereign digital infrastructure.
                    </span>
                  </p>
                </div>

                {/* CONTACT */}
                <div className="flex gap-4 items-center">
                  <a href={`mailto:${settings.contact_email || 'info@bichuten.com'}`} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#14477B] transition-all bg-white border border-gray-200 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-blue-200 group">
                    <Mail className="w-4 h-4 text-gray-400 group-hover:text-[#0B79BF] transition-colors" />
                    <span>Email</span>
                  </a>
                  <a href={`tel:${(settings.contact_phone || '+977 9714509070').replace(/\s+/g, '')}`} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#14477B] transition-all bg-white border border-gray-200 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-blue-200 group">
                    <Phone className="w-4 h-4 text-gray-400 group-hover:text-[#0B79BF] transition-colors" />
                    <span>Phone</span>
                  </a>
                </div>

              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 3. LEADERSHIP PRINCIPLES ================= */}
      <section className="py-24 bg-white relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Leadership Principles</h2>
              <p className="text-gray-600 text-lg">Every decision at Bichuten is guided by principles that prioritize control, security, and long-term sustainability.</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Security First", desc: "Security is not an add-on. It is the foundation of every system we design and operate." },
              { icon: Server, title: "Infrastructure as Core", desc: "Digital infrastructure is treated as a critical foundation, not a supporting layer." },
              { icon: FileText, title: "Compliance by Design", desc: "Governance and regulatory alignment are built into systems from the start—not added later." },
              { icon: Clock, title: "Long-Term Thinking", desc: "Every decision is made with long-term reliability, scalability, and sustainability in mind." }
            ].map((phil, i) => (
              <Reveal key={i} delay={i * 100} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[#14477B] hover:shadow-lg transition-all text-center flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[#14477B] transition-colors">
                  <phil.icon className="w-8 h-8 text-[#0B79BF] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bebas text-2xl tracking-wide text-[#14477B] mb-3">{phil.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">{phil.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="mt-16 text-center">
              <span className="inline-block px-8 py-3 bg-[#14477B] text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-md">
                We build systems that are designed to last—not just to launch.
              </span>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 4. EXECUTIVE LEADERSHIP (Interactive Grid) ================= */}
      <section className="py-24 bg-slate-50 relative border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 pattern-dots-light z-0"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Executive Leadership Team</h2>
              <p className="text-gray-600 text-lg">A team of experienced leaders driving strategy, operations, and infrastructure excellence.</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {leadershipTeam.map((leader, i) => (
              <Reveal key={i} delay={i * 100} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative h-full flex flex-col">

                  {/* TOP: Profile Image */}
                  <div className="h-72 w-full relative overflow-hidden bg-slate-100">
                    <img
                      src={leader.image}
                      alt={leader.role}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop' }}
                    />
                  </div>

                  {/* MIDDLE & BELOW: Basic Info */}
                  <div className="p-8 flex-grow flex flex-col bg-white relative z-10">
                    <h3 className="font-bebas text-3xl tracking-wide text-[#14477B] mb-1">{leader.name}</h3>
                    <p className="text-[#0B79BF] font-bold text-xs uppercase tracking-widest mb-3">{leader.role}</p>

                    {/* Experience */}
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-[#14477B] px-4 py-2 rounded-full text-xs font-bold border border-blue-100 mb-4 self-start">
                      <Award className="w-3.5 h-3.5 text-[#0B79BF]" />
                      {leader.experience}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                      "{leader.summary}"
                    </p>

                    {/* Hover Extra Details */}
                    <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-500 border-t border-gray-100 group-hover:mt-6 pt-0 group-hover:pt-6">
                      <div className="space-y-3 mb-6">
                        <div>
                          <span className="text-xs font-bold text-gray-900 uppercase flex items-center gap-2"><Target className="w-3 h-3 text-[#0B79BF]" /> Expertise:</span>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {leader.expertise.map((skill, idx) => (
                              <span key={idx} className="text-xs font-semibold text-[#14477B] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {leader.email && <a href={`mailto:${leader.email}`} className="w-10 h-10 rounded-full bg-slate-50 border border-gray-100 flex items-center justify-center hover:bg-[#14477B] hover:text-white text-gray-600 transition-colors"><Mail className="w-4 h-4" /></a>}
                        {leader.phone && <a href={`tel:${leader.phone}`} className="w-10 h-10 rounded-full bg-slate-50 border border-gray-100 flex items-center justify-center hover:bg-[#14477B] hover:text-white text-gray-600 transition-colors"><Phone className="w-4 h-4" /></a>}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="mt-16 text-center">
              <span className="inline-block px-6 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-semibold tracking-wide rounded-full shadow-sm">
                Experienced leadership across business, operations, and strategic growth.
              </span>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 4. EXPERTISE & GOVERNANCE FRAMEWORK ================= */}
      <section className="py-24 bg-slate-50 relative border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Expertise & Governance Framework</h2>
              <p className="text-gray-600 text-lg">Bichuten’s leadership combines deep technical expertise with strong governance to ensure secure, reliable, and compliant infrastructure.</p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

            {/* Technical Expertise */}
            <Reveal direction="right" className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all flex flex-col h-full">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <Cpu className="w-10 h-10 text-[#0B79BF] mb-6 relative z-10" />
              <h3 className="text-2xl font-bebas text-[#14477B] tracking-wide mb-6 relative z-10 border-b border-gray-100 pb-4">Technical Expertise</h3>
              <ul className="space-y-4 relative z-10 flex-grow">
                <li className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#0B79BF] shrink-0" />
                  <span className="leading-tight">Data center architecture and operations</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#0B79BF] shrink-0" />
                  <span className="leading-tight">Cloud and virtualization systems</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#0B79BF] shrink-0" />
                  <span className="leading-tight">Network and connectivity design</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#0B79BF] shrink-0" />
                  <span className="leading-tight">Cybersecurity and encryption systems</span>
                </li>
              </ul>
            </Reveal>

            {/* Governance & Compliance */}
            <Reveal direction="left" delay={150} className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all flex flex-col h-full">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <Scale className="w-10 h-10 text-[#0B79BF] mb-6 relative z-10" />
              <h3 className="text-2xl font-bebas text-[#14477B] tracking-wide mb-6 relative z-10 border-b border-gray-100 pb-4">Governance & Compliance</h3>
              <ul className="space-y-4 relative z-10 flex-grow">
                <li className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#0B79BF] shrink-0" />
                  <span className="leading-tight">Policy enforcement and governance frameworks</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#0B79BF] shrink-0" />
                  <span className="leading-tight">Audit readiness and compliance monitoring</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#0B79BF] shrink-0" />
                  <span className="leading-tight">Risk management and mitigation</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#0B79BF] shrink-0" />
                  <span className="leading-tight">Operational transparency and accountability</span>
                </li>
              </ul>
            </Reveal>

          </div>

          {/* Trust Line */}
          <Reveal delay={300}>
            <div className="mt-16 text-center max-w-4xl mx-auto">
              <div className="bg-[#14477B] text-white p-6 rounded-2xl shadow-md border-l-4 border-[#0B79BF]">
                <p className="text-lg md:text-xl font-medium leading-relaxed italic">
                  "Technology without governance is risk. Governance without technology is limitation. Bichuten delivers both."
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= 5. TRUST & IMPACT ================= */}
      <section className="py-24 lg:py-32 bg-[#14477B] text-white relative overflow-hidden flex flex-col items-center justify-center text-center border-t border-[#0a2e52]">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="absolute top-[-50%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-[#0B79BF]/20 to-transparent rounded-full blur-[120px] z-0"></div>
        <div className="absolute bottom-[-50%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-tl from-[#0a2e52]/50 to-transparent rounded-full blur-[120px] z-0"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl mx-auto">

            <Reveal>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bebas tracking-wide mb-8">
                Trusted for Critical Infrastructure
              </h2>
              <p className="text-xl md:text-2xl font-medium text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Bichuten is built to support systems where reliability, security, and compliance are non-negotiable.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-16">
                {[
                  "Infrastructure designed for mission-critical operations",
                  "Security-first architecture across all systems",
                  "Compliance-ready environments for regulated industries",
                  "Long-term reliability and operational stability"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors text-left group">
                    <ShieldCheck className="w-6 h-6 text-[#4da6e7] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-blue-50 text-sm md:text-base leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="border-t border-white/20 pt-12 mt-4 relative">
                <ShieldCheck className="w-8 h-8 text-[#0B79BF] absolute top-[-16px] left-1/2 transform -translate-x-1/2 bg-[#14477B] px-2 box-content" />
                <p className="text-2xl md:text-3xl font-bebas tracking-wide text-white mb-3">
                  Trusted by organizations that require control, performance, and certainty.
                </p>
                <p className="text-sm md:text-base font-bold text-[#4da6e7] uppercase tracking-widest">
                  Designed for banking, government, and enterprise systems.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 6. FINAL CTA ================= */}
      <section className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-0"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[#14477B]/5 to-transparent rounded-full blur-[100px] z-0"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl mx-auto">

            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas tracking-wide text-[#14477B] mb-4">
                Work with a Leadership Team You Can Trust
              </h2>
              <p className="text-xl font-bold text-[#0B79BF] uppercase tracking-widest mb-6">
                Led by expertise. Built for long-term impact.
              </p>
              <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Partner with Bichuten to build secure, compliant, and high-performance digital infrastructure guided by experienced leadership.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12">
                <a href="#" className="inline-flex items-center justify-center bg-[#14477B] text-white px-8 py-4 rounded-full font-bold shadow-[0_4px_14px_0_rgba(20,71,123,0.39)] hover:shadow-[0_6px_20px_rgba(20,71,123,0.23)] hover:-translate-y-1 transition-all duration-300 min-w-[220px]">
                  Request a Consultation
                </a>
                <a href="#" className="inline-flex items-center justify-center bg-white text-[#14477B] border-2 border-[#14477B] px-8 py-4 rounded-full font-bold hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300 min-w-[200px]">
                  Contact Our Team
                </a>
                <a href="#" className="inline-flex items-center justify-center bg-transparent text-gray-600 border border-gray-300 px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#14477B] hover:border-gray-400 hover:-translate-y-1 shadow-sm transition-all duration-300 min-w-[200px]">
                  Explore Platform
                </a>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 mb-12 border-b border-gray-200 pb-12">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <CheckCircle className="w-4 h-4 text-[#0B79BF]" />
                  No obligation consultation
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <CheckCircle className="w-4 h-4 text-[#0B79BF]" />
                  Enterprise-grade infrastructure
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <CheckCircle className="w-4 h-4 text-[#0B79BF]" />
                  Designed for mission-critical systems
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 max-w-2xl mx-auto transform hover:-translate-y-1 transition-transform duration-300">
                <p className="text-gray-900 font-bebas text-2xl tracking-wide mb-2">
                  Strong leadership. Reliable infrastructure. Long-term confidence.
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  Our team will guide you from planning to deployment with precision and expertise.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

    </div>
  );
};

export default LeadershipTeam;