import React, { useState } from 'react';
import bichutenWhiteLogo from '../assets/Bichutenwhitelogo.png';
import { ArrowRight, Mail, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ type: 'loading', message: '' });

    try {
      const response = await fetch('/bichuten_backend/newsletter_api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setStatus({ type: 'success', message: result.message || 'Successfully subscribed!' });
        setEmail('');
        setTimeout(() => setStatus({ type: '', message: '' }), 4000);
      } else {
        setStatus({
          type: 'error',
          message: result.message || 'Subscription failed.'
        });
        setTimeout(() => setStatus({ type: '', message: '' }), 6000);
      }
    } catch (err) {
      console.error('Newsletter error:', err);
      setStatus({
        type: 'error',
        message: 'Could not connect to the server.'
      });
      setTimeout(() => setStatus({ type: '', message: '' }), 6000);
    }
  };

  return (
    <footer className="bg-[#040814] text-white font-helvetica relative overflow-hidden">

      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0B79BF] to-transparent opacity-40"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#14477B]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">

        {/* ================= ZONE A: BRAND + POSITIONING ================= */}
        <div className="grid lg:grid-cols-5 gap-16 mb-20">

          {/* Brand Block */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col items-start">
              <img src={bichutenWhiteLogo} alt="Bichuten" className="h-10 w-auto object-contain mb-5" />
              <h3 className="text-lg font-bold text-white mb-1">Bichuten Data Vault</h3>
              <p className="text-xs text-[#0B79BF] font-bold uppercase tracking-widest">Sovereign Digital Infrastructure for Nepal</p>
            </div>
            <ul className="space-y-3 pt-2">
              {[
                "Data hosted within Nepal",
                "Compliance-ready infrastructure",
                "Enterprise-grade security"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="w-1 h-1 bg-[#0B79BF] rounded-full flex-shrink-0"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= ZONE B: NAVIGATION ================= */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">

            {/* Platform */}
            <div>
              <h4 className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-5">Platform</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Platform Overview', href: '/platform/overview' },
                  { name: 'Infrastructure', href: '/platform/infrastructure' },
                  { name: 'Security', href: '/platform/security' },
                  { name: 'Compliance', href: '/platform/audit' }
                ].map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-5">Solutions</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Data Sovereignty', href: '/solutions/data-sovereignty' },
                  { name: 'Compliance', href: '/solutions/compliance' },
                  { name: 'Cyber Resilience', href: '/solutions/cyber-resilience' },
                  { name: 'Communication', href: '/solutions/communication' },
                  { name: 'Digital Trust', href: '/solutions/digital-trust' }
                ].map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Infrastructure */}
            <div>
              <h4 className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-5">Infrastructure</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Data Centers', href: '/infrastructure/datacenters' },
                  { name: 'Locations', href: '/infrastructure/datacenters#locations' },
                  { name: 'Network', href: '/infrastructure/datacenters#network' },
                  { name: 'Sustainability', href: '/infrastructure/datacenters#sustainability' }
                ].map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-5">Company</h4>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', href: '/company/about' },
                  { name: 'Leadership', href: '/company/leadership' },
                  { name: 'Partners', href: '/company/partners' },
                  { name: 'Careers', href: '/company/careers' },
                  { name: 'Contact', href: '/contact' },
                  { name: 'Blog', href: '/resources/blog' }
                ].map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ================= ZONE C: TRUST + ACTION ================= */}
        <div className="border-t border-white/5 pt-10 mb-10">

          {/* Trust Strip + Newsletter Row */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">

            {/* Trust Strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
              <span>99.99% uptime</span>
              <span className="text-gray-700">·</span>
              <span>Sovereign infrastructure</span>
              <span className="text-gray-700">·</span>
              <span>Tier-grade facilities</span>
              <span className="text-gray-700">·</span>
              <span>24/7 monitoring</span>
            </div>

            {/* Newsletter Inline */}
            <div className="flex flex-col items-start lg:items-end gap-1.5 w-full lg:w-auto">
              <form className="flex items-center gap-0 w-full lg:w-auto" onSubmit={handleSubscribe}>
                <span className="text-xs text-gray-500 mr-3 hidden sm:inline whitespace-nowrap">Get infrastructure updates</span>
                <input
                  type="email"
                  placeholder={status.type === 'loading' ? 'Subscribing...' : 'Enter your email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status.type === 'loading'}
                  className="bg-white/5 border border-white/10 text-sm text-white px-4 py-2.5 rounded-l focus:outline-none focus:border-[#0B79BF]/50 w-full sm:w-56 transition-colors placeholder:text-gray-600 disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="bg-[#14477B] hover:bg-[#0B79BF] px-4 py-2.5 rounded-r transition-colors flex items-center justify-center group disabled:bg-gray-800 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
              {status.message && (
                <div className={`text-xs ${status.type === 'success' ? 'text-green-400' : 'text-red-400'} font-medium`}>
                  {status.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Brand Statement */}
        <div className="text-center mb-10">
          <p className="text-sm font-bebas tracking-widest text-gray-600 uppercase">
            Designed for performance, security, and long-term digital sovereignty.
          </p>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="text-xs text-gray-600">
            © {currentYear} Bichuten Data Vault. All rights reserved.
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a href="#" className="w-8 h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center text-gray-600 hover:text-white hover:bg-white/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center text-gray-600 hover:text-white hover:bg-white/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="mailto:info@bichuten.com" className="w-8 h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center text-gray-600 hover:text-white hover:bg-white/10 transition-all">
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Legal */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600">
            <a href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="/cookies" className="hover:text-gray-400 transition-colors">Cookie Policy</a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;