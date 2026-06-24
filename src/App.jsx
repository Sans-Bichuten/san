import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Platform from './pages/Platform';
import PlatformOverview from './pages/PlatformOverview';
import TechnologyArchitecture from './pages/TechnologyArchitecture';
import InfrastructureLayer from './pages/InfrastructureLayer';
import CommunicationLayer from './pages/CommunicationLayer';
import IdentityAccessLayer from './pages/IdentityAccessLayer';
import SecurityEncryptionLayer from './pages/SecurityEncryptionLayer';
import ComplianceAuditLayer from './pages/ComplianceAuditLayer';
import Solutions from './pages/Solutions';
import DataSovereignty from './pages/DataSovereignty';
import ComplianceRegulatorySolution from './pages/ComplianceRegulatorySolution';
import CyberResilienceDR from './pages/CyberResilienceDR';
import SecureCommunication from './pages/SecureCommunication';
import DigitalTrustSecurity from './pages/DigitalTrustSecurity';
import ServicesMain from './pages/ServicesMain';
import DataCentersLocations from './pages/DataCentersLocations';
import Infrastructure from './pages/Infrastructure';
import EngagementModels from './pages/EngagementModels';
import AboutUs from './pages/AboutUs';
import LeadershipTeam from './pages/LeadershipTeam';
import PartnersEcosystem from './pages/PartnersEcosystem';
import Contact from './pages/Contact';
import Industries from './pages/Industries';

// Dynamic Knowledge Hub & Case Studies
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';

// Careers Page (Public)
import Careers from './pages/Careers';

// Admin Panel Components
import { AuthProvider } from './admin/context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/layouts/AdminLayout';
import AdminLogin from './admin/pages/Login';
import AdminForgotPassword from './admin/pages/ForgotPassword';
import AdminResetPassword from './admin/pages/ResetPassword';
import AdminDashboard from './admin/pages/Dashboard';
import BlogList from './admin/pages/Blogs/BlogList';
import BlogEditor from './admin/pages/Blogs/BlogEditor';
import CaseStudyList from './admin/pages/CaseStudies/CaseStudyList';
import CaseStudyEditor from './admin/pages/CaseStudies/CaseStudyEditor';
import AdminLeads from './admin/pages/Leads';
import AdminCareers from './admin/pages/Careers';
import AdminNewsletter from './admin/pages/Newsletter';
import AdminMedia from './admin/pages/Media';
import AdminSEO from './admin/pages/SEO';
import AdminSettings from './admin/pages/Settings';
import AdminUsers from './admin/pages/Admins';
import AdminActivityLogs from './admin/pages/ActivityLogs';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          {/* ── Admin Panel: Login / Forgot Password (no Navbar/Footer) ── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admin/reset-password" element={<AdminResetPassword />} />

          {/* ── Admin Panel: Protected Dashboard (no Navbar/Footer) ── */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/blogs" element={<BlogList />} />
              <Route path="/admin/blogs/create" element={<BlogEditor />} />
              <Route path="/admin/blogs/edit/:id" element={<BlogEditor />} />
              <Route path="/admin/case-studies" element={<CaseStudyList />} />
              <Route path="/admin/case-studies/create" element={<CaseStudyEditor />} />
              <Route path="/admin/case-studies/edit/:id" element={<CaseStudyEditor />} />
              <Route path="/admin/leads" element={<AdminLeads />} />
              <Route path="/admin/careers" element={<AdminCareers />} />
              <Route path="/admin/newsletter" element={<AdminNewsletter />} />
              <Route path="/admin/media" element={<AdminMedia />} />
              <Route path="/admin/seo" element={<AdminSEO />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/admins" element={<AdminUsers />} />
              <Route path="/admin/activity-logs" element={<AdminActivityLogs />} />
            </Route>
          </Route>

          {/* ── Public Website (with Navbar + Footer) ── */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />

            {/* Platform */}
            <Route path="/platform" element={<Platform />} />
            <Route path="/platform/overview" element={<PlatformOverview />} />
            <Route path="/platform/architecture" element={<TechnologyArchitecture />} />
            <Route path="/platform/infrastructure" element={<InfrastructureLayer />} />
            <Route path="/platform/communication" element={<CommunicationLayer />} />
            <Route path="/platform/identity" element={<IdentityAccessLayer />} />
            <Route path="/platform/security" element={<SecurityEncryptionLayer />} />
            <Route path="/platform/audit" element={<ComplianceAuditLayer />} />

            {/* Solutions */}
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/data-sovereignty" element={<DataSovereignty />} />
            <Route path="/solutions/compliance" element={<ComplianceRegulatorySolution />} />
            <Route path="/solutions/cyber-resilience" element={<CyberResilienceDR />} />
            <Route path="/solutions/communication" element={<SecureCommunication />} />
            <Route path="/solutions/digital-trust" element={<DigitalTrustSecurity />} />

            {/* Services & Industries */}
            <Route path="/services" element={<ServicesMain />} />
            <Route path="/industries" element={<Industries />} />

            {/* Infrastructure */}
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/infrastructure/datacenters" element={<DataCentersLocations />} />

            {/* Company */}
            <Route path="/company/about" element={<AboutUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/company/leadership" element={<LeadershipTeam />} />
            <Route path="/company/partners" element={<PartnersEcosystem />} />
            <Route path="/company/models" element={<EngagementModels />} />
            <Route path="/pricing" element={<EngagementModels />} />
            <Route path="/company/careers" element={<Careers />} />
            <Route path="/careers" element={<Careers />} />

            {/* Contact */}
            <Route path="/contact" element={<Contact />} />

            {/* Knowledge Hub */}
            <Route path="/resources/blog" element={<Blog />} />
            <Route path="/resources/blog/:slug" element={<BlogDetail />} />
            <Route path="/resources/case-studies" element={<CaseStudies />} />
            <Route path="/resources/case-studies/:slug" element={<CaseStudyDetail />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

// Public pages wrapper — adds Navbar and Footer
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col font-helvetica bg-gray-50">
      <Navbar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;