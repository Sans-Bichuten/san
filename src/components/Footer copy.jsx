import React from 'react';
import bichutenWhiteLogo from '../assets/Bichutenwhitelogo.png';
import {
  ArrowRight, Mail, MapPin, ShieldCheck, Server, Lock,
  Activity, Send
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#040814] text-white font-helvetica border-t border-[#0B79BF]/30 relative overflow-hidden">

      {/* Abstract Background Effects */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0B79BF] to-transparent opacity-50"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#14477B]/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#0B79BF]/10 rounded-full blur-[100px] pointer-events-none"></div>


      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

        {/* ================= 2. MAIN FOOTER (MULTI-COLUMN LAYOUT) ================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 gap-x-8 gap-y-12">

          {/* COLUMN 1: ABOUT (Spans wider on large screens) */}
          <div className="col-span-2 xl:col-span-2 space-y-6">
            <div className="flex flex-col items-start mb-2">
              <img src={bichutenWhiteLogo} alt="Bichuten" className="h-10 w-auto object-contain mb-6" />
              <h3 className="text-xl font-bold text-white mb-1">Bichuten Data Vault</h3>
              <p className="text-xs text-[#0B79BF] font-semibold uppercase tracking-widest">Sovereign Digital Infrastructure for Nepal</p>
            </div>
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-[#0B79BF] mt-0.5" /> Data hosted within Nepal
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <ShieldCheck className="w-4 h-4 text-[#34A853] mt-0.5" /> Compliance-ready infrastructure
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Lock className="w-4 h-4 text-[#EA4335] mt-0.5" /> Enterprise-grade security
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Activity className="w-4 h-4 text-[#FBBC05] mt-0.5" /> 24/7 monitoring & uptime
              </li>
            </ul>
          </div>

          {/* COLUMN 2: PLATFORM */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Platform Overview', href: '/platform/overview' },
                { name: 'Infrastructure Layer', href: '/platform/infrastructure' },
                { name: 'Security & Encryption', href: '/platform/security' },
                { name: 'Compliance & Audit', href: '/platform/audit' }
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SOLUTIONS */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Solutions</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Data Sovereignty', href: '/solutions/data-sovereignty' },
                { name: 'Compliance & Regulatory', href: '/solutions/compliance' },
                { name: 'Cyber Resilience & DR', href: '/solutions/cyber-resilience' },
                { name: 'Secure Communication', href: '/solutions/communication' },
                { name: 'Digital Trust & Security', href: '/solutions/digital-trust' }
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 5 & 6: INFRA & COMPANY */}
          <div className="col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Infrastructure</h4>
              <ul className="space-y-2.5">
                {[
                  { name: 'Data Centers', href: '/infrastructure/datacenters' },
                  { name: 'Strategic Locations', href: '/infrastructure/datacenters#locations' },
                  { name: 'Network & Connectivity', href: '/infrastructure/datacenters#network' },
                  { name: 'Sustainability', href: '/infrastructure/datacenters#sustainability' }
                ].map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Company</h4>
              <ul className="space-y-2.5">
                {[
                  { name: 'About Us', href: '/company/about' },
                  { name: 'Leadership Team', href: '/company/leadership' },
                  { name: 'Partners & Ecosystem', href: '/company/partners' },
                  { name: 'Contact Us', href: '/contact' }
                ].map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* COLUMN 4: RESOURCES */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Our Blogs', href: '/resources/blog' },
                { name: 'Case Studies', href: '/resources/case-studies' },
                { name: 'Documentation', href: '/resources/docs' }
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ================= 3 & 4. TRUST ELEMENTS & NEWSLETTER ================= */}
        <div className="mt-20 pt-12 border-t border-white/10 grid lg:grid-cols-2 gap-12 items-center">

          {/* Trust Badges */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Trusted Infrastructure for Critical Operations</h4>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Server, text: "99.995% Uptime", color: "text-[#0B79BF]" },
                { icon: Server, text: "Tier-Grade Data Centers", color: "text-[#34A853]" },
                { icon: MapPin, text: "Sovereign Infrastructure", color: "text-[#4285F4]" },
                { icon: Lock, text: "Security by Design", color: "text-[#EA4335]" },
                { icon: Activity, text: "24/7 Monitoring", color: "text-[#FBBC05]" }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded text-xs font-medium text-gray-300">
                  <badge.icon className={`w-4 h-4 ${badge.color}`} /> {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Mini CTA */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-end">
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Get Infrastructure & Security Updates</h4>
              <p className="text-xs text-gray-400 max-w-[250px]">Insights on data sovereignty, compliance, and enterprise infrastructure.</p>
            </div>
            <form className="flex w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#0a1426] border border-gray-700 text-sm text-white px-4 py-2 rounded-l focus:outline-none focus:border-[#0B79BF] w-full sm:w-64 transition-colors"
                required
              />
              <button type="submit" className="bg-[#14477B] hover:bg-[#0B79BF] px-4 py-2 rounded-r transition-colors flex items-center justify-center group">
                <Send className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* ================= 5 & 6. SOCIAL & LEGAL BOTTOM ================= */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="text-xs text-gray-500">
            © {currentYear} Bichuten Data Vault. All rights reserved.
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0077b5] hover:border-[#0077b5] text-gray-400 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1DA1F2] hover:border-[#1DA1F2] text-gray-400 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="mailto:info@bichuten.com" className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#EA4335] hover:border-[#EA4335] text-gray-400 hover:text-white transition-all">
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Legal */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs text-gray-400">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;