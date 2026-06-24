import React, { useEffect, useRef, useState } from 'react';

import {
  Mail, Phone, MapPin, Clock, ShieldCheck,
  Send, ChevronRight, MessageSquare, Building2,
  ArrowRight, Globe, CheckCircle, Activity,
  Target, MessageCircle, Lock, Server, ArrowUpRight,
} from 'lucide-react';
import FreeInfrastructureMap from "../components/FreeInfrastructureMap";

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

const Contact = () => {
  // Form State for visual interactivity
  const [formState, setFormState] = useState({
    name: '', org: '', email: '', phone: '', industry: '', service: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [settings, setSettings] = useState({
    contact_phone: '+977 9714509070',
    contact_email: 'info@bichuten.com',
    contact_email_sales: 'sales@bichuten.com',
    contact_email_support: 'support@bichuten.com',
    business_hours: 'Monday – Friday: 9:00 AM – 6:00 PM',
    support_hours: '24/7 for infrastructure & critical services'
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
        console.error('Failed to load settings in contact page:', err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Because we put the file in htdocs/bichuten_backend/, the URL is:
      const response = await fetch('/bichuten_backend/contact_api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormState({ name: '', org: '', email: '', phone: '', industry: '', service: '', message: '' });

        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setIsSubmitting(false);
        alert(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error submitting form:', error);
      alert('Failed to connect to the server. Is Apache running?');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden relative">

      {/* --- GLOBAL ANIMATIONS & STYLES --- */}
      <style>
        {`
          .pattern-grid-light {
            background-image: radial-gradient(rgba(11, 121, 191, 0.15) 1px, transparent 1px);
            background-size: 32px 32px;
          }
          .glass-light {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 1);
            box-shadow: 0 10px 40px -10px rgba(20, 71, 123, 0.08);
          }
          @keyframes radarPing {
            0% { transform: scale(0.5); opacity: 0.8; }
            100% { transform: scale(2.5); opacity: 0; }
          }
          .animate-radar {
            animation: radarPing 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          @keyframes pulseOnce {
            0% { transform: scale(0.95); opacity: 0; }
            50% { transform: scale(1.02); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-pulse-once {
            animation: pulseOnce 0.4s ease-out forwards;
          }
          .input-field {
            width: 100%;
            background: rgba(248, 250, 252, 1);
            border: 1px solid rgba(226, 232, 240, 1);
            border-radius: 0.5rem;
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
            color: #1e293b;
            transition: all 0.3s ease;
          }
          .input-field:focus {
            outline: none;
            border-color: #0B79BF;
            box-shadow: 0 0 0 4px rgba(11, 121, 191, 0.1);
            background: white;
          }
        `}
      </style>

      {/* Floating WhatsApp / Quick Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce" style={{ animationDuration: '3s' }}>
        <button className="bg-[#25D366] hover:bg-[#1da851] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-colors group">
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap pl-0 group-hover:pl-2 font-bold text-sm">
            Quick Chat
          </span>
        </button>
      </div>

      {/* ================= 1. HERO SECTION (Light & Clean) ================= */}
      <section className="relative pt-40 pb-24 min-h-[60vh] flex flex-col justify-center border-b border-gray-200 bg-white overflow-hidden">
        <div className="absolute inset-0 pattern-grid-light opacity-50 z-0"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-bl from-blue-100/60 via-white to-transparent rounded-full blur-[100px] z-0 pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full mb-8">
                <MessageSquare className="w-4 h-4 text-[#0B79BF]" />
                <span className="text-xs font-bold tracking-widest uppercase text-gray-700">Start a Conversation</span>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-bebas tracking-wide text-[#14477B] mb-6 leading-[1.05]">
                Let’s Build Your <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14477B] to-[#0B79BF]">
                  Digital Infrastructure
                </span>
              </h1>
              <p className="text-xl font-bold text-[#0B79BF] uppercase tracking-widest mb-8">
                Secure, compliant, and high-performance infrastructure—designed for control and long-term reliability.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                Speak with our experts to plan, deploy, or optimize your infrastructure with solutions tailored to your organization.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
                <a href="#contact-form" className="w-full sm:w-auto inline-flex items-center justify-center bg-[#14477B] text-white px-8 py-4 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  Request a Consultation
                </a>
                <a href="#contact-options" className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-[#14477B] border-2 border-[#14477B] px-8 py-4 rounded-full font-bold hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300">
                  Talk to an Expert
                </a>
              </div>

              <div className="flex justify-center items-center gap-2 text-sm font-bold text-gray-500 mb-8">
                <Clock className="w-4 h-4 text-[#0B79BF]" /> Response within 24 hours
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-6 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <CheckCircle className="w-4 h-4 text-[#34A853]" /> No obligation consultation
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <CheckCircle className="w-4 h-4 text-[#34A853]" /> Secure & confidential discussion
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <CheckCircle className="w-4 h-4 text-[#34A853]" /> Enterprise-grade solutions
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= 2 & 3. CONTACT OPTIONS & FORM (Split Layout) ================= */}
      <section className="py-24 relative bg-slate-50 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

            {/* LEFT: Contact Options & Hours */}
            <div className="lg:col-span-5 space-y-8">
              <Reveal direction="right">
                <h2 className="text-3xl font-bebas text-[#14477B] tracking-wide mb-6">Multiple Ways to Get in Touch</h2>

                {/* Contact Options */}
                <div className="space-y-6">

                  {/* Unified Phone Contact */}
                  <div className="bg-[#14477B] text-white p-6 md:p-8 rounded-2xl shadow-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[30px] transition-transform duration-700 group-hover:scale-150"></div>
                    <p className="text-xs font-bold text-[#4da6e7] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Primary Contact Number
                    </p>
                    <a href={`tel:${(settings.contact_phone || '+977 9714509070').replace(/\s+/g, '')}`} className="inline-block text-3xl sm:text-4xl md:text-5xl font-bebas tracking-wide hover:text-white transition-colors relative z-10 mb-2 whitespace-nowrap">
                      {settings.contact_phone || '+977 9714509070'}
                    </a>
                    <p className="text-sm text-blue-100 font-medium relative z-10">Available for consultation & inquiries.</p>
                  </div>

                  {/* Email Contacts */}
                  <div className="space-y-4">
                    {/* General */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-[#0B79BF] hover:shadow-md transition-all group flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2 text-sm"><Building2 className="w-4 h-4 text-[#0B79BF]" /> General Contact</h3>
                        <p className="text-xs text-gray-500">For general questions and platform inquiries.</p>
                      </div>
                      <a href={`mailto:${settings.contact_email || 'info@bichuten.com'}`} className="p-3 bg-slate-50 rounded-full text-gray-600 group-hover:bg-[#0B79BF] group-hover:text-white transition-colors shadow-sm">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>

                    {/* Sales */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-[#34A853] hover:shadow-md transition-all group flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2 text-sm"><Target className="w-4 h-4 text-[#34A853]" /> Sales & Consultation</h3>
                        <p className="text-xs text-gray-500">Speak with our experts to design a tailored solution.</p>
                      </div>
                      <a href={`mailto:${settings.contact_email_sales || 'sales@bichuten.com'}`} className="p-3 bg-slate-50 rounded-full text-gray-600 group-hover:bg-[#34A853] group-hover:text-white transition-colors shadow-sm">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>

                    {/* Support */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-[#EA4335] hover:shadow-md transition-all group flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2 text-sm"><Activity className="w-4 h-4 text-[#EA4335]" /> Technical Support</h3>
                        <p className="text-xs text-gray-500">For technical assistance and operational support.</p>
                      </div>
                      <a href={`mailto:${settings.contact_email_support || 'support@bichuten.com'}`} className="p-3 bg-slate-50 rounded-full text-gray-600 group-hover:bg-[#EA4335] group-hover:text-white transition-colors shadow-sm">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Business Hours */}
              <Reveal direction="right" delay={150}>
                <div className="bg-[#14477B] p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0B79BF]/30 rounded-full blur-[40px]"></div>
                  <h3 className="font-bebas text-2xl tracking-widest mb-6 border-b border-white/20 pb-2">Availability</h3>
                  <div className="space-y-6 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 text-[#4da6e7] mb-1">
                        <Clock className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Business Hours</span>
                      </div>
                      <p className="text-sm font-medium">{settings.business_hours || 'Monday – Friday: 9:00 AM – 6:00 PM'}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[#34A853] mb-1">
                        <ShieldCheck className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Support Availability</span>
                      </div>
                      <p className="text-sm font-medium">{settings.support_hours || '24/7 for infrastructure & critical services'}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT: Contact Form (Primary Conversion) */}
            <div className="lg:col-span-7">
              <Reveal direction="left" delay={200}>
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full rounded-tr-3xl -z-0"></div>

                  <div className="relative z-10" id="contact-form">
                    <h2 className="text-4xl font-bebas text-[#14477B] tracking-wide mb-2">Tell Us About Your Requirements</h2>
                    <p className="text-sm text-gray-500 mb-8 font-medium">
                      Takes less than 1 minute. Our team will respond within 24 hours.
                    </p>

                    {isSuccess ? (
                      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-pulse-once">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bebas text-green-800 tracking-wide mb-2">Thank you</h3>
                        <p className="text-green-700 font-medium">Our team will contact you within 24 hours.</p>
                      </div>
                    ) : (
                      <form className="space-y-6" onSubmit={handleSubmit}>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Full Name</label>
                            <input type="text" name="name" value={formState.name} onChange={handleChange} className="input-field" placeholder="Your full name" required />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Email Address</label>
                            <input type="email" name="email" value={formState.email} onChange={handleChange} className="input-field" placeholder="john@company.com" required />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2 flex justify-between">Phone Number <span className="text-gray-400 normal-case">(Optional)</span></label>
                            <input type="tel" name="phone" value={formState.phone} onChange={handleChange} className="input-field" placeholder="+977-XXXXXXXXXX" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Organization Name</label>
                            <input type="text" name="org" value={formState.org} onChange={handleChange} className="input-field" placeholder="Your organization" required />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Industry</label>
                            <select name="industry" value={formState.industry} onChange={handleChange} className="input-field appearance-none cursor-pointer" required>
                              <option value="" disabled>Select Industry...</option>
                              <option value="bfsi">Banking & Financial Services</option>
                              <option value="gov">Government & Public Sector</option>
                              <option value="telecom">Telecom & ISPs</option>
                              <option value="enterprise">Enterprise Organization</option>
                              <option value="tech">Digital Platforms & Tech</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Service Interest</label>
                            <select name="service" value={formState.service} onChange={handleChange} className="input-field appearance-none cursor-pointer" required>
                              <option value="" disabled>Select Service...</option>
                              <option value="infrastructure">Infrastructure & Colocation</option>
                              <option value="sovereignty">Data Sovereignty</option>
                              <option value="communication">Secure Communication</option>
                              <option value="dr">Disaster Recovery</option>
                              <option value="trust">Digital Trust & Security</option>
                              <option value="compliance">Compliance & Audit</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2 flex justify-between">Message / Requirements <span className="text-gray-400 normal-case">(Optional)</span></label>
                          <textarea name="message" value={formState.message} onChange={handleChange} rows="3" className="input-field resize-none" placeholder="Briefly describe your infrastructure needs..."></textarea>
                        </div>

                        <div className="pt-2">
                          <button type="submit" disabled={isSubmitting} className={`group w-full flex items-center justify-center gap-2 px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 rounded-xl shadow-lg border border-transparent ${isSubmitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#14477B] text-white hover:bg-[#0B79BF] hover:shadow-xl hover:-translate-y-0.5'}`}>
                            {isSubmitting ? 'Submitting...' : 'Request Consultation'}
                            {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                          </button>
                        </div>

                        {/* Trust Strip */}
                        <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs font-medium text-gray-500">
                          <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-green-600" /> Your information is secure</div>
                          <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-green-600" /> No spam, no sharing</div>
                          <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-600" /> Confidential consultation</div>
                        </div>

                      </form>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 4. INFRASTRUCTURE PRESENCE (Map & List) ================= */}
      <FreeInfrastructureMap />

      {/* ================= 6 & 7. WHY CONTACT US & TRUST (Grid Layout) ================= */}
      <section className="py-24 bg-slate-50 relative border-b border-gray-200">
        <div className="absolute inset-0 pattern-grid-light opacity-30"></div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="grid lg:grid-cols-2 gap-16">

            {/* Value Block */}
            <Reveal direction="up">
              <h2 className="text-4xl font-bebas text-[#14477B] tracking-wide mb-4">What You Get When You Contact Us</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Our team provides expert guidance to help you plan, deploy, and optimize your digital infrastructure.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B79BF] group-hover:bg-[#14477B] group-hover:text-white transition-colors">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Infrastructure Planning</h4>
                    <p className="text-sm text-gray-600 mt-1">Clear guidance on designing secure and scalable infrastructure.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B79BF] group-hover:bg-[#14477B] group-hover:text-white transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Compliance & Data Control</h4>
                    <p className="text-sm text-gray-600 mt-1">Solutions aligned with regulatory and sovereignty requirements.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B79BF] group-hover:bg-[#14477B] group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Secure Communication Systems</h4>
                    <p className="text-sm text-gray-600 mt-1">Controlled and encrypted communication environments.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B79BF] group-hover:bg-[#14477B] group-hover:text-white transition-colors">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Disaster Recovery & Resilience</h4>
                    <p className="text-sm text-gray-600 mt-1">Strategies to ensure continuity and risk mitigation.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B79BF] group-hover:bg-[#14477B] group-hover:text-white transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Digital Trust & Security</h4>
                    <p className="text-sm text-gray-600 mt-1">End-to-end protection across systems and operations.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl mb-8 border-l-4 border-l-[#34A853]">
                <p className="text-gray-900 font-medium leading-relaxed">
                  "You leave with a clear infrastructure strategy—aligned with security, compliance, and performance goals."
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a href="#contact-options" className="inline-flex items-center justify-center bg-[#14477B] text-white px-8 py-4 rounded-xl font-bold shadow-md hover:bg-[#0B79BF] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center">
                  Talk to an Expert
                </a>
                <div className="flex flex-col gap-1 text-sm font-bold text-gray-500">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#34A853]" /> Confidential consultation</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#34A853]" /> No sales pressure</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest font-bold">No obligation. Just expert guidance.</p>
            </Reveal>

            {/* Trust & Confidentiality */}
            <Reveal direction="up" delay={200} className="h-full">
              <div className="bg-gradient-to-b from-blue-50 to-white p-10 md:p-12 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden h-full flex flex-col items-center justify-center text-center">

                {/* Visual Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(11,121,191,0.05)_0%,transparent_70%)] pointer-events-none"></div>
                <div className="relative z-10 flex items-center justify-center gap-3 mb-8">
                  <div className="w-16 h-16 bg-white rounded-full shadow-[0_4px_20px_rgba(20,71,123,0.08)] flex items-center justify-center border border-gray-100 relative">
                    <ShieldCheck className="w-8 h-8 text-[#14477B]" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#34A853] rounded-full border-2 border-white flex items-center justify-center">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bebas text-[#14477B] tracking-wide mb-4 relative z-10">Your Information is Secure and Confidential</h2>
                <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-sm relative z-10">
                  Every interaction with Bichuten is handled with strict confidentiality, security, and professional discretion.
                </p>

                <div className="space-y-3 w-full max-w-md mx-auto mb-8 relative z-10 text-left">
                  {[
                    "All discussions are treated as confidential",
                    "No data is shared with third parties",
                    "Secure handling of all submitted information",
                    "Enterprise-grade security practices"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                      <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0" />
                      <span className="text-sm font-bold text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#14477B] p-4 rounded-xl shadow-md mb-6 relative z-10 w-full max-w-md mx-auto">
                  <p className="text-sm font-bold text-white tracking-wide">
                    Your infrastructure discussions remain private—from first contact to deployment.
                  </p>
                </div>

                <div className="relative z-10 mt-auto pt-4">
                  <p className="text-xs text-[#0B79BF] font-bold uppercase tracking-widest mb-2">Designed for organizations handling sensitive and regulated data.</p>
                  <p className="text-xs text-gray-400 font-medium italic">We respect your privacy and operate with complete transparency.</p>
                </div>

              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= 8. FINAL CTA ================= */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-[#f8fafc] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(11,121,191,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal direction="up">
            <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-6">Build Your Infrastructure with Confidence</h2>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
              Partner with Bichuten to design, deploy, and scale secure, compliant, and high-performance digital infrastructure.
            </p>
            <p className="text-lg font-bold text-[#0B79BF] mb-10">
              Led by expertise. Built for long-term reliability.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href="#contact-options" className="group bg-[#14477B] text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#0B79BF] hover:-translate-y-1 hover:shadow-xl rounded-xl w-full sm:w-auto border border-transparent">
                Request a Consultation
              </a>
              <a href="mailto:sales@bichuten.com" className="group bg-white text-[#14477B] px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-md rounded-xl border border-gray-200 w-full sm:w-auto">
                Talk to an Expert
              </a>
              <a href="/platform" className="group bg-transparent text-gray-600 px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:text-[#0B79BF] hover:-translate-y-1 rounded-xl border border-transparent w-full sm:w-auto">
                Explore Platform
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-bold text-gray-700 mb-8 flex-wrap">
              <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#34A853]" /> No obligation consultation</span>
              <span className="flex items-center gap-2"><Lock className="w-5 h-5 text-[#34A853]" /> Secure and confidential discussion</span>
              <span className="flex items-center gap-2"><Server className="w-5 h-5 text-[#34A853]" /> Enterprise-grade infrastructure</span>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-2">Our team will guide you from planning to deployment with clarity and precision.</p>
              <p className="text-xs text-[#14477B] uppercase tracking-widest font-bold">Reliable systems. Trusted leadership. Long-term confidence.</p>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default Contact;