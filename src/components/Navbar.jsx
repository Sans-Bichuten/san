import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight, ChevronLeft, ArrowUpRight, ArrowRight } from 'lucide-react';
import logo from '../assets/BichutenLogo.png';

// ============================================================
// NAVIGATION CONFIG
// ============================================================
const navItems = [
  { name: 'Home', path: '/' },

  {
    name: 'Solutions',
    mega: true,
    desc: 'Transform your organization with sovereign, compliant, and resilient digital infrastructure solutions for critical operations.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    cta: '/solutions',
    sections: [
      {
        title: 'Core Solutions',
        links: [
          { name: 'Data Sovereignty',        path: '/solutions/data-sovereignty' },
          { name: 'Compliance & Regulatory', path: '/solutions/compliance' },
          { name: 'Cyber Resilience & DR',   path: '/solutions/cyber-resilience' },
          { name: 'Secure Communication',    path: '/solutions/communication' },
          { name: 'Digital Trust & Security',path: '/solutions/digital-trust' },
        ],
      },
    ],
  },

  {
    name: 'Platform',
    mega: true,
    desc: 'A unified platform integrating infrastructure, communication, identity, security, and compliance into one sovereign ecosystem.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    cta: '/platform',
    sections: [
      {
        title: 'Platform',
        links: [
          { name: 'Overview',      path: '/platform/overview' },
          { name: 'Architecture',  path: '/platform/architecture' },
        ],
      },
      {
        title: 'Core Capabilities',
        links: [
          { name: 'Infrastructure',    path: '/platform/infrastructure' },
          { name: 'Communication',     path: '/platform/communication' },
          { name: 'Identity & Access', path: '/platform/identity' },
          { name: 'Security',          path: '/platform/security' },
          { name: 'Compliance',        path: '/platform/audit' },
        ],
      },
    ],
  },

  { name: 'Industries', path: '/industries' },

  {
    name: 'Data Centers',
    mega: true,
    desc: 'Strategically located, hydro-powered data centers ensuring 99.995% uptime and full data sovereignty within Nepal.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    cta: '/infrastructure',
    sections: [
      {
        title: 'Infrastructure',
        links: [
          { name: 'Locations',             path: '/infrastructure/datacenters' },
          { name: 'Network & Connectivity', path: '/infrastructure' },
          { name: 'Sustainability',         path: '/infrastructure' },
        ],
      },
    ],
  },

  {
    name: 'Company',
    mega: true,
    desc: 'Leading the charge in sovereign digital infrastructure. Learn about our team, partners, and knowledge resources.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    cta: '/company/about',
    sections: [
      {
        title: 'Company',
        links: [
          { name: 'About Us',   path: '/company/about' },
          { name: 'Leadership', path: '/company/leadership' },
          { name: 'Partners',   path: '/company/partners' },
          { name: 'Careers',    path: '/company/careers' },
        ],
      },
      {
        title: 'Knowledge Hub',
        links: [
          { name: 'Blog & Insights', path: '/resources/blog' },
          { name: 'Case Studies',    path: '/resources/case-studies' },
        ],
      },
    ],
  },

  { name: 'Contact', path: '/contact' },
];

// ============================================================
// NAVBAR COMPONENT
// ============================================================
const Navbar = () => {
  const [activeMenu, setActiveMenu]               = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen]       = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const [scrolled, setScrolled]                   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) setTimeout(() => setActiveMobileSubmenu(null), 300);
  }, [mobileMenuOpen]);

  return (
    <>
      <style>{`
        @keyframes floatGeo {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-12px) rotate(4deg); }
        }
        .animate-float-geo { animation: floatGeo 6s ease-in-out infinite; }
      `}</style>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-inter ${
          scrolled || activeMenu
            ? 'bg-white border-b border-gray-100 shadow-md'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <a href="/" className="flex-shrink-0 flex items-center">
              <img src={logo} alt="Bichuten Data Vault" className="h-12 w-auto" />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.mega && setActiveMenu(item.name)}
                >
                  <a
                    href={item.path || '#'}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-[13px] font-semibold tracking-wide uppercase transition-all duration-200 ${
                      activeMenu === item.name
                        ? 'text-[#0B79BF] bg-blue-50'
                        : 'text-gray-700 hover:text-[#0B79BF] hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                    {item.mega && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        activeMenu === item.name ? 'rotate-180 text-[#0B79BF]' : 'text-gray-400'
                      }`} />
                    )}
                  </a>
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden xl:flex items-center">
              <a
                href="/contact"
                className="group flex items-center gap-2 bg-[#14477B] hover:bg-[#0B79BF] text-white px-6 py-2.5 rounded-full text-[13px] font-semibold uppercase tracking-wider transition-all duration-300 shadow-md"
              >
                Request Demo
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Mobile toggle */}
            <div className="xl:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-[#14477B] p-2 rounded-md focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── MEGA MENUS ─────────────────────────────────────── */}
        {navItems.map((item) =>
          item.mega ? (
            <div
              key={`mega-${item.name}`}
              className={`absolute top-full left-0 w-full bg-[#0a1628] text-white border-t border-[#0B79BF]/20 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
                activeMenu === item.name
                  ? 'max-h-[600px] opacity-100 visible'
                  : 'max-h-0 opacity-0 invisible'
              }`}
            >
              <div className="max-w-[1440px] mx-auto px-12 py-10 flex flex-col lg:flex-row gap-10">

                {/* LEFT – Title / desc / CTA */}
                <div className="w-full lg:w-1/4 pr-8 border-r border-white/10 flex flex-col justify-between">
                  <div>
                    <h2 className="font-jakarta font-bold text-2xl text-white mb-3 tracking-tight">
                      {item.name}
                    </h2>
                    <div className="w-10 h-[3px] bg-[#0B79BF] mb-5 rounded-full" />
                    <p className="text-sm text-gray-400 leading-relaxed font-inter font-normal">
                      {item.desc}
                    </p>
                  </div>
                  <a
                    href={item.cta}
                    className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white bg-[#0B79BF] px-5 py-3 rounded hover:bg-[#14477B] transition-colors"
                  >
                    Explore {item.name} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* CENTER – Link sections */}
                <div className="w-full lg:w-[45%] grid grid-cols-1 md:grid-cols-2 gap-8">
                  {item.sections.map((section, sIdx) => (
                    <div key={sIdx}>
                      <h3 className="text-[#0B79BF] font-jakarta font-semibold text-xs tracking-widest uppercase mb-4 border-b border-white/10 pb-2">
                        {section.title}
                      </h3>
                      <ul className="space-y-2">
                        {section.links.map((link, lIdx) => (
                          <li key={lIdx}>
                            <a
                              href={link.path}
                              className="group/link flex items-center px-2 py-1.5 rounded-md text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                            >
                              <span className="w-0 overflow-hidden group-hover/link:w-3.5 transition-all duration-200 text-[#0B79BF] text-xs">▹</span>
                              <span className="group-hover/link:translate-x-0.5 transition-transform duration-200">
                                {link.name}
                              </span>
                              <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover/link:opacity-100 text-[#0B79BF] transition-opacity duration-200" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* RIGHT – Image card */}
                <div className="hidden lg:block w-full lg:w-[28%] relative h-[240px] overflow-hidden rounded-lg group/img">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 grid grid-cols-4 gap-2 opacity-30 animate-pulse">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-[#0B79BF] rounded-full" />
                    ))}
                  </div>
                  <div className="absolute bottom-5 right-5 flex gap-1 animate-float-geo">
                    <div className="w-7 h-7 bg-[#0B79BF] opacity-80 border border-white/20" />
                    <div className="w-7 h-7 bg-white opacity-90 border border-[#14477B]/20" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <p className="font-jakarta font-bold text-lg tracking-wider text-white drop-shadow-lg">
                      BICHUTEN <span className="text-[#0B79BF]">VAULTS</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ) : null
        )}
      </header>

      {/* ── MOBILE MENU ────────────────────────────────────── */}
      <div
        className={`xl:hidden fixed inset-0 z-40 bg-white font-inter transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '80px' }}
      >
        <div className="relative w-full h-full overflow-hidden">

          {/* Level 1 */}
          <div
            className={`absolute inset-0 w-full h-full overflow-y-auto px-5 py-6 transition-transform duration-300 ease-in-out ${
              activeMobileSubmenu ? '-translate-x-full' : 'translate-x-0'
            }`}
          >
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={`mob-${item.name}`}>
                  {!item.mega ? (
                    <a
                      href={item.path}
                      className="flex items-center px-3 py-4 text-base font-semibold text-[#14477B] uppercase tracking-wide border-b border-gray-100 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <button
                      onClick={() => setActiveMobileSubmenu(item)}
                      className="flex justify-between items-center w-full px-3 py-4 text-left text-base font-semibold text-[#14477B] uppercase tracking-wide border-b border-gray-100 hover:bg-gray-50 rounded-md transition-colors focus:outline-none"
                    >
                      {item.name}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="/contact"
                className="block w-full text-center bg-[#14477B] hover:bg-[#0B79BF] text-white py-4 rounded-lg font-semibold uppercase tracking-widest text-sm transition-colors"
              >
                Request Demo
              </a>
            </div>
          </div>

          {/* Level 2 */}
          <div
            className={`absolute inset-0 w-full h-full bg-gray-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
              activeMobileSubmenu ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {activeMobileSubmenu && (
              <div className="p-5">
                <button
                  onClick={() => setActiveMobileSubmenu(null)}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6 hover:text-[#14477B] transition-colors focus:outline-none"
                >
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>

                <h2 className="font-jakarta font-bold text-2xl text-[#14477B] mb-2">
                  {activeMobileSubmenu.name}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 border-b border-gray-200 pb-4">
                  {activeMobileSubmenu.desc}
                </p>

                <div className="space-y-6">
                  {activeMobileSubmenu.sections.map((section, sIdx) => (
                    <div key={`mob-s-${sIdx}`}>
                      <h4 className="font-jakarta font-semibold text-[#0B79BF] text-xs uppercase tracking-widest mb-3">
                        {section.title}
                      </h4>
                      <ul className="space-y-1 pl-3 border-l-2 border-[#0B79BF]/20">
                        {section.links.map((link, lIdx) => (
                          <li key={`mob-l-${lIdx}`}>
                            <a
                              href={link.path}
                              className="flex items-center px-3 py-2.5 text-[15px] font-medium text-gray-800 hover:text-[#0B79BF] hover:bg-white rounded-md transition-all duration-200"
                            >
                              {link.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <a
                  href={activeMobileSubmenu.cta}
                  className="mt-8 flex items-center justify-center gap-2 w-full bg-[#14477B] hover:bg-[#0B79BF] text-white py-3.5 rounded-lg text-sm font-semibold uppercase tracking-widest transition-colors"
                >
                  Explore {activeMobileSubmenu.name} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;