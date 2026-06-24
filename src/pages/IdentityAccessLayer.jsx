import React, { useEffect, useRef, useState } from 'react';
import { 
  ShieldCheck, Fingerprint, Key, UserCheck, Lock, 
  Eye, FileSearch, ArrowRight, Layers, CheckCircle, 
  Activity, Users, Smartphone, Shield, Database,
  FileText, Server
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

const IdentityAccessLayer = () => {
  return (
    <div className="min-h-screen bg-[#040814] text-gray-300 font-helvetica overflow-hidden">
      
      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          @keyframes dataStream {
            to { stroke-dashoffset: -100; }
          }
          .animate-stream {
            stroke-dasharray: 8 8;
            animation: dataStream 1.5s linear infinite;
          }
          .glass-panel {
            background: rgba(20, 71, 123, 0.1);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(11, 121, 191, 0.2);
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
          }
          @keyframes scanLine {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .animate-scan {
            position: absolute;
            width: 100%;
            height: 2px;
            background: #0B79BF;
            box-shadow: 0 0 10px #0B79BF, 0 0 20px #0B79BF;
            animation: scanLine 3s ease-in-out infinite;
          }
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 15px rgba(11,121,191,0.2); }
            50% { box-shadow: 0 0 30px rgba(11,121,191,0.6); }
          }
          .auth-node { animation: pulseGlow 2s infinite; }
        `}
      </style>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-40 pb-32 min-h-[90vh] flex flex-col justify-center border-b border-white/5">
        {/* Background Imagery */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614064641913-a53bba4d2417?q=80&w=2000&auto=format&fit=crop" 
            alt="Digital Security and Identity" 
            className="w-full h-full object-cover object-center opacity-20 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040814]/80 via-[#040814]/90 to-[#040814]"></div>
        </div>

        {/* Floating Identity Nodes */}
        <div className="absolute top-1/4 left-[10%] w-32 h-32 bg-[#0B79BF]/20 rounded-full blur-[60px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-[10%] w-48 h-48 bg-purple-600/20 rounded-full blur-[80px] animate-pulse" style={{animationDelay: '1s'}}></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 glass-panel rounded-full mb-8">
              <Fingerprint className="w-4 h-4 text-[#0B79BF]" />
              <span className="text-xs font-bold tracking-widest uppercase text-blue-200">Layer 3: Identity & Access</span>
            </div>
          </Reveal>
          
          <Reveal delay={150}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-white mb-6 leading-[0.9] drop-shadow-2xl">
              Control Every Identity. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B79BF] to-purple-400">
                Secure Every Access.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-xl md:text-2xl font-light text-blue-100/80 max-w-4xl mx-auto mb-6 leading-relaxed">
              Bichuten’s Identity and Access Layer provides centralized control over users, systems, and permissions—ensuring that every interaction within your infrastructure is authenticated, authorized, and governed.
            </p>
            <p className="text-sm font-bold text-[#0B79BF] uppercase tracking-wider mb-10 max-w-2xl mx-auto">
              Built for organizations that require strict access control, strong authentication, and full visibility across digital environments.
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="group bg-[#0B79BF] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(11,121,191,0.5)] flex items-center justify-center gap-3 rounded">
                Request a Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="/platform/security" className="glass-panel hover:bg-white/10 text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 rounded flex items-center justify-center">
                Explore Security Architecture
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 2. OVERVIEW ================= */}
      <section className="py-24 relative bg-[#070e20]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <Reveal direction="right">
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">A Centralized Framework for Secure Operations</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                In modern digital environments, identity is the primary control point for security. Every user, application, and system interaction depends on accurate authentication and controlled access.
              </p>
              
              <div className="glass-panel p-6 rounded-xl border-l-4 border-red-500/50 mb-8">
                <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-2">The Problem with Fragmented Identity</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div> Inconsistent access controls across systems</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div> Increased risk of unauthorized access</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div> Lack of visibility into user activities</li>
                </ul>
              </div>

              <p className="text-sm text-blue-100/90 leading-relaxed p-4 bg-[#14477B]/20 rounded-lg border border-[#0B79BF]/30">
                The Bichuten Identity and Access Layer addresses these challenges by providing a centralized framework. It ensures that every identity is verified, every action is controlled, and every interaction is recorded within a secure and compliant environment.
              </p>
            </Reveal>

            {/* Visual: Identity Flow Diagram */}
            <Reveal direction="left" delay={200} className="relative h-[500px] glass-panel rounded-2xl p-8 flex flex-col justify-between overflow-hidden">
               <h3 className="text-center font-bebas text-2xl tracking-widest text-[#0B79BF] mb-4">Identity Authentication Flow</h3>
               
               <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-0">
  <path d="M 50 15 L 50 35" fill="none" stroke="#0B79BF" strokeWidth="2" className="animate-flow opacity-50" />
  <path d="M 50 45 L 50 65" fill="none" stroke="#0B79BF" strokeWidth="2" className="animate-flow opacity-50" />
  <path d="M 50 75 L 50 90" fill="none" stroke="#0B79BF" strokeWidth="2" className="animate-flow opacity-50" />
</svg>

               <div className="flex flex-col items-center gap-8 relative z-10 h-full justify-center">
                  <div className="flex items-center gap-4 bg-[#060d1a] px-6 py-3 rounded-full border border-gray-600 w-64 justify-center shadow-lg">
                     <UserCheck className="w-6 h-6 text-gray-300" />
                     <span className="font-bold text-sm tracking-wide">1. User Request</span>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-[#14477B]/40 px-6 py-4 rounded-xl border border-[#0B79BF] w-64 justify-center auth-node backdrop-blur-md relative overflow-hidden">
                     <div className="animate-scan"></div>
                     <Fingerprint className="w-8 h-8 text-[#0B79BF]" />
                     <span className="font-bold text-sm tracking-wide text-white">2. MFA Authentication</span>
                  </div>

                  <div className="flex items-center gap-4 bg-purple-900/30 px-6 py-3 rounded-full border border-purple-500/50 w-64 justify-center shadow-lg">
                     <Lock className="w-6 h-6 text-purple-400" />
                     <span className="font-bold text-sm tracking-wide">3. Policy & RBAC</span>
                  </div>

                  <div className="flex gap-4 w-full justify-center">
                     <div className="flex items-center gap-2 bg-green-900/30 px-4 py-2 rounded border border-green-500/50 shadow-lg">
                        <Server className="w-4 h-4 text-green-400" />
                        <span className="font-bold text-xs">Access Granted</span>
                     </div>
                     <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded border border-gray-600 shadow-lg">
                        <FileSearch className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-xs">Audit Logged</span>
                     </div>
                  </div>
               </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 3. CORE IDENTITY CAPABILITIES & MFA/RBAC VISUALS ================= */}
      <section className="py-24 bg-[#040814] relative border-y border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bebas text-center text-white tracking-wide mb-16">
              Comprehensive Identity & Access Management
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            
            {/* Centralized Identity */}
            <Reveal delay={0} className="glass-panel p-8 rounded-2xl">
              <Users className="w-10 h-10 text-[#0B79BF] mb-6" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Centralized Identity Management</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">A unified system for managing users, roles, and access policies across the entire platform.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#0B79BF]"/> Single source of truth for user identities</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#0B79BF]"/> Centralized user lifecycle management</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-[#0B79BF]"/> Unified access control across all systems</li>
              </ul>
            </Reveal>

            {/* MFA with Visual */}
            <Reveal delay={150} className="glass-panel p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <Smartphone className="w-10 h-10 text-purple-400 mb-6" />
                <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Multi-Factor Authentication (MFA)</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">Strong authentication mechanisms to ensure secure access to systems and applications.</p>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li>• Multi-layer authentication processes</li>
                  <li>• Reduced risk of credential-based attacks</li>
                  <li>• Secure access for sensitive systems</li>
                </ul>
              </div>
              {/* MFA Visual Component */}
              <div className="w-40 h-48 bg-[#0a1426] border border-gray-700 rounded-xl relative flex flex-col items-center justify-center p-4 shadow-2xl">
                 <div className="w-full h-4 bg-gray-800 rounded-full mb-4"></div>
                 <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center mb-4">
                    <Key className="w-6 h-6 text-purple-400" />
                 </div>
                 <div className="bg-gray-800 w-full py-2 text-center rounded">
                    <span className="text-lg font-mono tracking-widest text-white">842 915</span>
                 </div>
                 <div className="absolute top-2 w-8 h-1 bg-gray-600 rounded-full"></div>
              </div>
            </Reveal>

          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* RBAC with Visual Hierarchy Chart */}
            <Reveal delay={200} className="glass-panel p-8 rounded-2xl">
              <Layers className="w-10 h-10 text-green-400 mb-6" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Role-Based Access Control (RBAC)</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">Structured access management based on defined roles and responsibilities.</p>
              
              {/* RBAC Visual Component */}
              <div className="mt-6 flex flex-col items-center">
                 <div className="bg-green-900/40 border border-green-500/50 px-6 py-2 rounded text-sm font-bold text-white mb-4 z-10">Administrator</div>
                 <div className="w-px h-6 bg-gray-600"></div>
                 <div className="w-64 h-px bg-gray-600"></div>
                 <div className="flex justify-between w-72">
                    <div className="flex flex-col items-center">
                       <div className="w-px h-6 bg-gray-600 mb-2"></div>
                       <div className="bg-blue-900/40 border border-blue-500/50 px-4 py-2 rounded text-xs font-bold text-white">Manager</div>
                    </div>
                    <div className="flex flex-col items-center">
                       <div className="w-px h-6 bg-gray-600 mb-2"></div>
                       <div className="bg-gray-800 border border-gray-600 px-4 py-2 rounded text-xs font-bold text-gray-300">Standard User</div>
                    </div>
                 </div>
              </div>
            </Reveal>

            {/* Privileged Access */}
            <Reveal delay={300} className="glass-panel p-8 rounded-2xl">
              <ShieldCheck className="w-10 h-10 text-red-400 mb-6" />
              <h3 className="text-2xl font-bebas text-white tracking-wider mb-4">Privileged Access Management</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">Enhanced controls for high-level and sensitive access within systems.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-red-400"/> Controlled access to critical systems</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-red-400"/> Strict monitoring of privileged activities</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-red-400"/> Restricted administrative access limits</li>
              </ul>
              <div className="mt-8 bg-red-900/20 border border-red-500/30 p-4 rounded text-xs text-red-200 text-center">
                <strong>Outcome:</strong> A secure framework where access is governed precisely by policy.
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 4, 5, 6, 7. GOVERNANCE, AUDIT & SECURITY ================= */}
      <section className="py-24 relative bg-[#070e20]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid md:grid-cols-2 gap-8">
            
            <Reveal delay={0} className="bg-[#040814] p-8 rounded-2xl border border-white/5 hover:border-[#0B79BF]/30 transition-colors">
              <FileSearch className="w-8 h-8 text-[#0B79BF] mb-4" />
              <h3 className="text-2xl font-bebas text-white tracking-wide mb-3">Identity Governance</h3>
              <p className="text-sm text-gray-400 mb-4">Enforcing Policies and Accountability. Ensures that access to systems is granted, reviewed, and maintained according to defined policies.</p>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>• Access provisioning and de-provisioning</li>
                <li>• Periodic access reviews and audits</li>
                <li>• Enforcement of least-privilege principles</li>
              </ul>
            </Reveal>

            <Reveal delay={100} className="bg-[#040814] p-8 rounded-2xl border border-white/5 hover:border-[#0B79BF]/30 transition-colors">
              <Layers className="w-8 h-8 text-[#0B79BF] mb-4" />
              <h3 className="text-2xl font-bebas text-white tracking-wide mb-3">Consistent Access Across Layers</h3>
              <p className="text-sm text-gray-400 mb-4">Integrated across the platform, ensuring policies are applied to infrastructure, comms, applications, and data.</p>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>• Unified authentication across all systems</li>
                <li>• Centralized enforcement of access policies</li>
                <li>• Controlled access to sensitive data</li>
              </ul>
            </Reveal>

            <Reveal delay={200} className="bg-[#040814] p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors">
              <Shield className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bebas text-white tracking-wide mb-3">Identity as Security Foundation</h3>
              <p className="text-sm text-gray-400 mb-4">Works closely with the Security Layer to ensure access controls are reinforced by strong security mechanisms.</p>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>• Authentication linked with encryption</li>
                <li>• Access control aligned with security policies</li>
                <li>• Continuous monitoring of activities</li>
              </ul>
            </Reveal>

            <Reveal delay={300} className="bg-[#040814] p-8 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
              <Eye className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-2xl font-bebas text-white tracking-wide mb-3">Auditability & Traceability</h3>
              <p className="text-sm text-gray-400 mb-4">Every access event and user activity within the platform is logged and monitored, ensuring full traceability.</p>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>• Detailed audit logs of user actions</li>
                <li>• Monitoring of login and access attempts</li>
                <li>• Integration with compliance reporting</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 8, 9, 10, 11. COMPLIANCE, USE CASES & SOVEREIGNTY ================= */}
      <section className="py-24 bg-[#040814] relative border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Compliance */}
            <Reveal delay={0} className="glass-panel p-8 rounded-2xl border-t-4 border-t-[#0B79BF]">
              <h3 className="text-xl font-bebas text-white tracking-wider mb-4">Designed for Regulated Environments</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">Built to support compliance requirements across industries where governance and auditability are essential.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#0B79BF] mt-1.5 rounded-full"></div> Audit-ready reporting and documentation</li>
                <li className="flex items-start gap-2 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#0B79BF] mt-1.5 rounded-full"></div> Support for data protection frameworks</li>
                <li className="flex items-start gap-2 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#0B79BF] mt-1.5 rounded-full"></div> Enforcement based on compliance needs</li>
              </ul>
            </Reveal>

            {/* Use Cases */}
            <Reveal delay={150} className="glass-panel p-8 rounded-2xl border-t-4 border-t-[#14477B]">
              <h3 className="text-xl font-bebas text-white tracking-wider mb-4">Securing Critical Systems</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">The Identity Layer supports a wide range of use cases across mission-critical industries.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#14477B] mt-1.5 rounded-full"></div> Banking and financial systems</li>
                <li className="flex items-start gap-2 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#14477B] mt-1.5 rounded-full"></div> Government platforms & citizen services</li>
                <li className="flex items-start gap-2 text-sm text-gray-300"><div className="w-1.5 h-1.5 bg-[#14477B] mt-1.5 rounded-full"></div> Management of privileged administrators</li>
              </ul>
            </Reveal>

            {/* Sovereignty */}
            <Reveal delay={300} className="bg-gradient-to-br from-[#14477B] to-[#040814] p-8 rounded-2xl border border-[#0B79BF]/30 shadow-lg">
              <h3 className="text-xl font-bebas text-white tracking-wider mb-4">Sovereign Identity Advantage</h3>
              <p className="text-sm text-blue-100 mb-6 leading-relaxed">Unlike global identity systems that operate outside local control, Bichuten’s Identity Layer is fully hosted within Nepal.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-white font-medium"><CheckCircle className="w-4 h-4 text-[#0B79BF] flex-shrink-0" /> Local control over identity data</li>
                <li className="flex items-start gap-2 text-sm text-white font-medium"><CheckCircle className="w-4 h-4 text-[#0B79BF] flex-shrink-0" /> Reduced exposure to external risks</li>
                <li className="flex items-start gap-2 text-sm text-white font-medium"><CheckCircle className="w-4 h-4 text-[#0B79BF] flex-shrink-0" /> Alignment with national data sovereignty</li>
              </ul>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 12. TRANSITION SECTION ================= */}
      <section className="py-24 relative bg-[#070e20]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-4">Explore the Platform Layers</h2>
              <p className="text-gray-400">The Identity and Access Layer works in conjunction with other components of the Bichuten platform.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Infrastructure Layer", href: "/platform/infrastructure" },
              { title: "Communication Layer", href: "/platform/communication" },
              { title: "Security & Encryption", href: "/platform/security" },
              { title: "Compliance and Audit", href: "/platform/audit" }
            ].map((link, i) => (
              <Reveal key={i} delay={i * 100}>
                <a 
                  href={link.href} 
                  className="group block h-full glass-panel p-6 text-center hover:bg-[#0B79BF]/20 hover:border-[#0B79BF]/50 transition-all duration-300"
                >
                  <h4 className="font-bold text-gray-300 group-hover:text-white text-sm tracking-wide uppercase transition-colors">
                    {link.title}
                  </h4>
                  <ArrowRight className="w-5 h-5 mx-auto mt-4 text-[#0B79BF] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

     

    </div>
  );
};

export default IdentityAccessLayer;