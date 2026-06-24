import React, { useEffect, useRef, useState } from 'react';
import {
  Briefcase, CheckCircle, Mail, Phone, Lock, FileText, Send, Clock,
  ArrowRight, ShieldCheck, User, MapPin, Award, DollarSign, Upload, AlertCircle
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

const Careers = () => {
  // Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    address: '',
    current_job_profile: '',
    expected_role: '',
    last_education: '',
    experience: '',
    employment_status: '',
    expected_salary: '',
    notice_period: '',
    message: ''
  });
  
  const [resumeFile, setResumeFile] = useState(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' }); // 'success' | 'error' | ''

  const handleTextChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB. Please upload a smaller file.");
      e.target.value = null;
      return;
    }

    // Validate extension
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'doc', 'docx'].includes(ext)) {
      alert("Invalid file type. Only PDF, DOC, and DOCX are allowed.");
      e.target.value = null;
      return;
    }

    setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setSubmitStatus({ type: 'error', message: 'Please upload your Resume/CV.' });
      return;
    }

    if (!consentChecked) {
      setSubmitStatus({ type: 'error', message: 'You must consent to the privacy policy processing.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // Build FormData
    const formData = new FormData();
    Object.keys(formState).forEach(key => {
      formData.append(key, formState[key]);
    });
    formData.append('resume', resumeFile);

    try {
      // Relative path works correctly in both local dev (vite proxy) and production
      const response = await fetch('/bichuten_backend/careers_api.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Your application was submitted successfully!'
        });
        // Reset form
        setFormState({
          name: '', email: '', phone: '', linkedin: '', address: '',
          current_job_profile: '', expected_role: '', last_education: '',
          experience: '', employment_status: '', expected_salary: '',
          notice_period: '', message: ''
        });
        setResumeFile(null);
        setConsentChecked(false);
        // Reset file input element
        const fileInput = document.getElementById('resume-upload');
        if (fileInput) fileInput.value = '';
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'An error occurred during submission. Please try again.'
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to connect to the server. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-helvetica overflow-hidden relative">
      
      {/* Styles */}
      <style>
        {`
          .pattern-grid-light {
            background-image: radial-gradient(rgba(11, 121, 191, 0.15) 1px, transparent 1px);
            background-size: 32px 32px;
          }
          .glass-card-light {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 1);
            box-shadow: 0 10px 45px -10px rgba(20, 71, 123, 0.06);
          }
          .input-box {
            width: 100%;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
            color: #1e293b;
            transition: all 0.3s ease;
          }
          .input-box:focus {
            outline: none;
            border-color: #0B79BF;
            box-shadow: 0 0 0 4px rgba(11, 121, 191, 0.1);
            background: white;
          }
        `}
      </style>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-40 pb-24 min-h-[60vh] flex flex-col justify-center border-b border-gray-200 bg-white overflow-hidden">
        <div className="absolute inset-0 pattern-grid-light opacity-50 z-0"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-bl from-blue-100/60 via-white to-transparent rounded-full blur-[100px] z-0 pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full mb-8">
                <Briefcase className="w-4 h-4 text-[#0B79BF]" />
                <span className="text-xs font-bold tracking-widest uppercase text-gray-700">Careers at Bichuten</span>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-bebas tracking-wide text-[#14477B] mb-6 leading-[1.05]">
                Build the Future of <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14477B] to-[#0B79BF]">
                  Sovereign Digital Infrastructure
                </span>
              </h1>
              <p className="text-xl font-bold text-[#0B79BF] uppercase tracking-widest mb-8">
                Join Bichuten Data Vault
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
                At Bichuten Data Vault, we believe infrastructure is more than technology—it is the foundation of national progress, digital trust, and long-term innovation. Our people are the force behind every secure connection, every resilient system, and every breakthrough that moves industries forward. We are building Nepal’s next generation of sovereign digital infrastructure and are looking for ambitious minds ready to create meaningful impact.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a href="#openings" className="w-full sm:w-auto inline-flex items-center justify-center bg-[#14477B] text-white px-8 py-4 rounded-full font-bold shadow-md hover:bg-[#0B79BF] hover:-translate-y-1 transition-all duration-300">
                  Explore Opportunities
                </a>
                <a href="#apply-form" className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-[#14477B] border-2 border-[#14477B] px-8 py-4 rounded-full font-bold hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300">
                  Submit Direct Application
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= 2. WHY WORK AT BICHUTEN ================= */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Why Work at Bichuten</h2>
              <p className="text-gray-600 text-lg">We offer an environment where innovation, ownership, and continuous growth are part of everyday work.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Build What Matters",
                desc: "Work on mission-critical infrastructure that supports enterprises, institutions, and future digital ecosystems."
              },
              {
                title: "Grow Without Limits",
                desc: "Access learning opportunities, mentorship, certifications, and exposure to emerging technologies."
              },
              {
                title: "Innovate with Purpose",
                desc: "Contribute to secure, sovereign, and sustainable infrastructure designed for long-term national impact."
              },
              {
                title: "Collaborate Across Disciplines",
                desc: "Work alongside professionals across engineering, operations, cybersecurity, compliance, and business."
              },
              {
                title: "Create Real Impact",
                desc: "Take ownership of initiatives that influence products, services, and digital transformation journeys."
              }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="p-8 rounded-2xl bg-slate-50 border border-gray-200 hover:border-[#0B79BF] hover:bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 text-[#0B79BF]">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. LIFE AT BICHUTEN ================= */}
      <section className="py-24 bg-[#14477B] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#0B79BF]/15 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <Reveal direction="right">
                <h2 className="text-4xl md:text-5xl font-bebas tracking-wide mb-6">Life at Bichuten</h2>
                <p className="text-blue-100/90 text-lg leading-relaxed">
                  We are creating more than a workplace—we are building a culture where ideas are respected, innovation is encouraged, and excellence becomes a shared standard.
                </p>
                <div className="pt-6">
                  <span className="text-[#0B79BF] font-bold uppercase tracking-widest text-xs">culture & environment</span>
                </div>
              </Reveal>
            </div>
            
            <div className="lg:col-span-7">
              <Reveal direction="left" delay={150}>
                <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 md:p-10 rounded-3xl space-y-6">
                  {[
                    "High-impact projects and enterprise-scale opportunities",
                    "A culture of ownership and accountability",
                    "Continuous learning and professional development",
                    "Inclusive and collaborative work environment",
                    "Opportunities to lead, build, and grow"
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-green-400 font-bold text-sm">✓</span>
                      </div>
                      <span className="text-lg text-blue-100/95 font-medium">{bullet}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. OPEN OPPORTUNITIES ================= */}
      <section id="openings" className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bebas text-[#14477B] tracking-wide mb-4">Open Opportunities</h2>
              <p className="text-gray-600 text-lg">We are continuously expanding our team across critical divisions.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              "Cloud Infrastructure & Platform Engineering",
              "Data Center Operations",
              "Cybersecurity & Compliance",
              "Software Development",
              "DevOps & Automation",
              "Product & Program Management",
              "Enterprise Solutions & Consulting",
              "Sales & Business Development",
              "Operations & Corporate Functions"
            ].map((role, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="bg-slate-50 p-6 rounded-xl border border-gray-200 flex items-center justify-between group hover:border-[#0B79BF] hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer">
                  <span className="font-bold text-gray-800 group-hover:text-[#14477B] transition-colors">{role}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0B79BF] group-hover:translate-x-1 transition-all" />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-8 text-center max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-[#14477B] mb-2">Don't see a suitable role?</h3>
              <p className="text-gray-600 text-sm mb-6">Submit your application below and our team will connect when relevant opportunities open.</p>
              <a href="#apply-form" className="inline-flex items-center gap-2 bg-[#14477B] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#0B79BF] transition-all">
                Submit General Application <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 5. APPLICATION FORM ================= */}
      <section id="apply-form" className="py-24 bg-slate-50 relative">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full rounded-tr-3xl -z-0"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bebas text-[#14477B] tracking-wide mb-2">Career Application Form</h2>
                <p className="text-sm text-gray-500 mb-8 font-medium">Please fill in your details and upload your resume/CV below.</p>

                {/* Submit Feedback */}
                {submitStatus.message && (
                  <div className={`p-4 rounded-xl mb-8 flex items-start gap-3 border ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 border-green-200 text-green-800' 
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    {submitStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                    )}
                    <div>
                      <span className="font-bold text-sm block mb-1">
                        {submitStatus.type === 'success' ? 'Success' : 'Error'}
                      </span>
                      <p className="text-sm leading-relaxed">{submitStatus.message}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* --- Personal Information --- */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#0B79BF]" /> Personal Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Full Name *</label>
                        <input type="text" name="name" value={formState.name} onChange={handleTextChange} className="input-box" placeholder="Enter your full name" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Email Address *</label>
                        <input type="email" name="email" value={formState.email} onChange={handleTextChange} className="input-box" placeholder="Enter your email address" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Phone Number *</label>
                        <input type="tel" name="phone" value={formState.phone} onChange={handleTextChange} className="input-box" placeholder="Enter your primary contact number" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">LinkedIn Profile</label>
                        <input type="text" name="linkedin" value={formState.linkedin} onChange={handleTextChange} className="input-box" placeholder="linkedin.com/in/yourprofile" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Current Address</label>
                      <input type="text" name="address" value={formState.address} onChange={handleTextChange} className="input-box" placeholder="Enter your current residential address" />
                    </div>
                  </div>

                  {/* --- Professional Information --- */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#0B79BF]" /> Professional Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Current Job Profile</label>
                        <input type="text" name="current_job_profile" value={formState.current_job_profile} onChange={handleTextChange} className="input-box" placeholder="Example: Infrastructure Engineer" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Role Applying For / Expected Role *</label>
                        <input type="text" name="expected_role" value={formState.expected_role} onChange={handleTextChange} className="input-box" placeholder="Example: Cloud Architect" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Last Education & Certifications</label>
                        <input type="text" name="last_education" value={formState.last_education} onChange={handleTextChange} className="input-box" placeholder="Example: B.Tech / M.Tech / Certifications" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Current Employment Status *</label>
                        <select name="employment_status" value={formState.employment_status} onChange={handleTextChange} className="input-box cursor-pointer appearance-none" required>
                          <option value="" disabled>Select Status...</option>
                          <option value="employed">Currently Employed</option>
                          <option value="notice">Serving Notice Period</option>
                          <option value="immediate">Immediate Joiner</option>
                          <option value="fresher">Fresher</option>
                          <option value="freelancer">Freelancer / Consultant</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Professional Experience</label>
                      <textarea name="experience" value={formState.experience} onChange={handleTextChange} rows="4" className="input-box resize-none font-sans" placeholder="List your last three organizations with designation and duration.&#10;Example:&#10;Company A — Senior Engineer | Jan 2024 – Present&#10;Company B — Engineer | Mar 2022 – Dec 2023"></textarea>
                    </div>
                  </div>

                  {/* --- Compensation Details --- */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#0B79BF]" /> Compensation Details
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Expected Salary / CTC</label>
                        <input type="text" name="expected_salary" value={formState.expected_salary} onChange={handleTextChange} className="input-box" placeholder="Example: Negotiable" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Notice Period</label>
                        <input type="text" name="notice_period" value={formState.notice_period} onChange={handleTextChange} className="input-box" placeholder="Example: Immediate | 30 Days | 60 Days" />
                      </div>
                    </div>
                  </div>

                  {/* --- Additional Info --- */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Additional Information</h3>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Message / Comments</label>
                      <textarea name="message" value={formState.message} onChange={handleTextChange} rows="3" className="input-box resize-none" placeholder="Share additional information, achievements, portfolio links..."></textarea>
                    </div>
                  </div>

                  {/* --- Upload Resume & Consent --- */}
                  <div className="space-y-6 pt-4 border-t border-gray-100">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Upload Resume / CV *</label>
                      <div className="flex items-center justify-center w-full">
                        <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-gray-100 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500 font-medium">
                              {resumeFile ? (
                                <span className="text-gray-900 font-bold">{resumeFile.name}</span>
                              ) : (
                                <span>Click to upload PDF / DOC / DOCX</span>
                              )}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">Recommended size: Max 10MB</p>
                          </div>
                          <input id="resume-upload" type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                        </label>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <input type="checkbox" id="consent" checked={consentChecked} onChange={(e) => setConsentChecked(e.target.checked)} className="mt-1 border-gray-300 rounded text-[#14477B] focus:ring-[#0B79BF] cursor-pointer" required />
                      <label htmlFor="consent" className="text-xs text-gray-500 font-medium leading-normal cursor-pointer select-none">
                        I confirm that the information provided is accurate and I consent to the processing of my personal data in accordance with Bichuten’s Privacy Policy and Terms & Conditions.
                      </label>
                    </div>
                  </div>

                  {/* --- Submit Button --- */}
                  <div className="pt-4">
                    <button type="submit" disabled={isSubmitting} className={`group w-full flex items-center justify-center gap-2 px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 rounded-xl shadow-lg border border-transparent ${
                      isSubmitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#14477B] text-white hover:bg-[#0B79BF] hover:shadow-xl hover:-translate-y-0.5'
                    }`}>
                      {isSubmitting ? 'Submitting Application...' : 'Apply Now'}
                      {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    </button>
                  </div>

                  {/* Security/Trust Strip */}
                  <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs font-medium text-gray-500">
                    <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-green-600" /> Your information is secure</div>
                    <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Safe document processing</div>
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-600" /> Direct submission to HR</div>
                  </div>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 6. BOTTOM CTA ================= */}
      <section className="relative py-28 bg-[#0a1628] text-white overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(11,121,191,0.08)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas tracking-tight leading-tight mb-6">
              Ready to Build the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0B79BF]">
                Infrastructure of Tomorrow?
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Join a team committed to security, innovation, and building trusted digital foundations for the future.
            </p>
            <p className="text-xl font-bold tracking-widest text-white uppercase border-t border-b border-white/10 py-6 inline-block px-12">
              Your next opportunity starts here
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Careers;
