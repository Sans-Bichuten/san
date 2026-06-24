-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2026 at 11:04 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bichuten_contact`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'admin',
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'admin@bichuten.com', '$2y$10$0gTJpyDGODBNVtR.8Zpyzerhb..gJEvSY9K.GS5giUbYgemM0kDwW', 'super_admin', 'active', '2026-05-08 17:56:01', '2026-05-08 17:56:01');

-- --------------------------------------------------------

--
-- Table structure for table `admin_activity_logs`
--

CREATE TABLE `admin_activity_logs` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `action` varchar(255) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `featured_image` varchar(500) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `read_time` int(11) DEFAULT 5,
  `status` varchar(50) DEFAULT 'Draft',
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `keywords` text DEFAULT NULL,
  `og_image` varchar(500) DEFAULT NULL,
  `canonical_url` varchar(500) DEFAULT NULL,
  `published_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `category_id`, `author`, `read_time`, `status`, `meta_title`, `meta_description`, `keywords`, `og_image`, `canonical_url`, `published_at`, `created_at`, `updated_at`) VALUES
(2, 'The Critical Importance of Data Sovereignty in Nepal\'s Digital Era', 'data-sovereignty-nepal-digital-era', 'As Nepal digitizes its public and private sectors, keeping critical citizen and business data within national borders is vital for security, compliance, and national sovereignty.', '<h2>The Rise of the Digital Economy in Nepal</h2><p>In recent years, Nepal has witnessed a massive surge in digital adoption. From digital payment gateways and mobile banking to government portals like the National ID card system, the country is rapidly shifting online. However, this digital explosion raises a critical question: <strong>Where is our data being stored?</strong></p><h3>Why Data Sovereignty Matters</h3><p>Data sovereignty is the concept that digital data is subject to the laws and governance of the nation in which it is collected. For Nepal, relying on overseas cloud providers means that sensitive citizen records, financial logs, and healthcare data are stored in jurisdictions where Nepalese authorities have no legal control.</p><p>If a foreign jurisdiction experiences legal disputes, regulatory changes, or international sanctions, Nepal\'s access to its own critical infrastructure could be cut off or compromised. Establishing a sovereign data environment like the <strong>Bichuten Data Vault</strong> ensures that our national assets remain under our legal and operational jurisdiction.</p><h3>Key Benefits of Local Data Sovereignty</h3><ul><li><strong>Legal Protection:</strong> All data is bound strictly by Nepalese cyber laws and privacy guidelines.</li><li><strong>National Security:</strong> Essential infrastructure is protected from foreign surveillance and remote shutdowns.</li><li><strong>Economic Growth:</strong> Investing in local data vaults fosters technical talent and retains digital capital within the country.</li></ul><p>As we build a resilient future, building locally managed, geo-distributed digital infrastructure is not just a technological choice — it is a national requirement.</p>', '/uploads/blog-sovereignty.png', 1, 'Technical Director, Bichuten', 5, 'Published', 'Data Sovereignty in Nepal | Bichuten Data Vault', 'Learn why keeping critical citizen and business data within Nepal is vital for security, compliance, and national sovereignty in the digital era.', 'data sovereignty nepal, digital infrastructure, bichuten data vault, local cloud, nepal cyber security', '/uploads/blog-sovereignty.png', NULL, '2026-06-09 20:11:44', '2026-06-09 20:11:44', '2026-06-09 20:46:04'),
(3, 'Why Enterprises are Moving from Public Clouds to Sovereign Private Infrastructures', 'enterprises-moving-to-sovereign-private-infrastructures', 'Exploring the costs, security gaps, and latency disadvantages of host countries and why localized, sovereign vaults are the future of enterprise cloud hosting.', '<h2>The Public Cloud Reality Check</h2><p>For the past decade, the public cloud was advertised as the ultimate destination for every business workload. However, as enterprises in Nepal scale, they are running into the hard realities of public cloud hosting: unpredictable bandwidth costs, high latency, and regulatory non-compliance.</p><h3>The Latency Penalty</h3><p>Every millisecond counts when handling real-time financial transaction databases or active customer sessions. When an enterprise hosts its databases in servers located in Singapore, India, or Ireland, packets have to travel across multiple international hops. This results in high round-trip latency (often 150ms to 300ms).</p><p>By hosting workloads locally in an in-country private infrastructure, latency is slashed down to single-digit milliseconds (5ms to 15ms), drastically improving the user experience for end consumers.</p><h3>The Cost of Data Egress</h3><p>Public cloud providers often charge high fees to transfer data out of their networks. For high-volume transaction systems, these billing expenses can skyrocket. Local enterprise clouds offer predictable flat-rate billing models, enabling CTOs to control their operational budgets with precision.</p><h3>Security and Hybrid Cloud</h3><p>A hybrid cloud modelÔÇöwhere sensitive core records are kept in a local, physical secure vault while non-sensitive marketing assets run on public hostsÔÇöoffers the best of both worlds. Bichuten provides these sovereign, hybrid-ready integration environments built specifically for enterprise compliance.</p>', '/uploads/blog-private-cloud.png', 2, 'Infrastructure Architect, Bichuten', 6, 'Published', 'Sovereign Private Cloud vs Public Cloud | Bichuten', 'Understand the advantages of local private cloud hosting in Nepal, focusing on latency, compliance, and predictable cost structures for enterprises.', 'private cloud nepal, enterprise hosting, local data center, hybrid cloud, server latency', '/uploads/blog-private-cloud.png', NULL, '2026-06-09 20:11:44', '2026-06-09 20:11:44', '2026-06-09 20:16:48'),
(4, 'Securing Financial Transactions: Compliance and Cyber Resilience in Nepal\'s Banking Sector', 'securing-financial-transactions-nepal-banking', 'How central bank regulations and modern threat vectors mandate geo-redundant, local disaster recovery environments for banks.', '<h2>The Changing Regulatory Landscape</h2><p>The Nepal Rastra Bank (NRB) has steadily modernized its IT guidelines, mandating strict compliance regarding data security, transaction logging, and operational business continuity. For commercial banks, maintaining a high-availability primary site is no longer sufficient; they must have a robust, real-time replicated disaster recovery site within national borders.</p><h3>Addressing Modern Cyber Threats</h3><p>Ransomware and distributed denial-of-service (DDoS) attacks have grown increasingly sophisticated. When financial platforms are targeted, banks need to ensure that their backup databases are not only isolated but can be restored instantly without data loss.</p><h3>A Real-Time Geo-Redundant Solution</h3><p>BichutenÔÇÖs platform is built with active-active synchronization capabilities. In the event of a localized power failure, earthquake, or communication outage in Kathmandu, workloads failover seamlessly to a Pokhara or regional vault with zero manual intervention.</p><p>This geo-distributed layout ensures that financial databases maintain 99.99% uptime, satisfying national compliance requirements and preserving citizen trust in the financial system.</p>', '/uploads/blog-banking-security.png', 3, 'Chief Information Security Officer, Bichuten', 7, 'Published', 'Financial Security & Compliance in Nepal | Bichuten', 'Explore how central bank guidelines and cyber security threats necessitate secure, local, and geo-redundant database vaults in Nepal.', 'banking security nepal, compliance, nrb regulations, disaster recovery, data center replication', '/uploads/blog-banking-security.png', NULL, '2026-06-09 20:11:44', '2026-06-09 20:11:44', '2026-06-09 20:16:48'),
(5, 'How Hydro-Powered Data Centers are Shaping a Greener Digital Future for Nepal', 'hydro-powered-green-data-centers-nepal', 'Leveraging Nepal\'s unique clean energy landscape to power next-generation, high-performance data centers with low carbon footprints.', '<h2>The Environmental Cost of the Global Cloud</h2><p>Data centers are massive consumers of electricity and water, contributing significantly to global carbon emissions. Globally, many hyperscale facilities rely on fossil fuels. In Nepal, however, we have a unique opportunity: an abundance of clean, renewable hydroelectric power.</p><h3>Tapping into Hydropower</h3><p>By positioning data centers close to reliable hydroelectric generation corridors, Bichuten operates infrastructure that runs almost entirely on clean energy. This green approach allows enterprises hosting locally to achieve their environmental sustainability goals while reducing national reliance on carbon-intensive energy imports.</p><h3>Natural Free Cooling</h3><p>In addition to clean power, parts of Nepal offer temperate climates that enable natural air-cooling techniques. By utilizing cool ambient air rather than massive, power-hungry chillers, our facilities achieve a highly efficient Power Usage Effectiveness (PUE) rating.</p><p>A green digital vault is not just environmentally friendly; it translates directly into lower operating costs and a highly resilient, self-sustaining system infrastructure.</p>', '/uploads/blog-green-energy.png', 4, 'Sustainability Specialist, Bichuten', 5, 'Published', 'Hydro-Powered Green Data Centers in Nepal | Bichuten', 'Discover how Bichuten utilizes Nepal\'s natural hydroelectric power and climate to operate energy-efficient, sustainable digital vaults.', 'green data center, hydropower nepal, sustainable IT, clean energy hosting, PUE efficiency', '/uploads/blog-green-energy.png', NULL, '2026-06-09 20:11:44', '2026-06-09 20:11:44', '2026-06-09 20:16:48'),
(6, 'Why Digital Sovereignty Is Becoming the Foundation of Modern Infrastructure', 'why-digital-sovereignty-is-becoming-the-foundation-of-modern-infrastructure', 'Discover why enterprises, governments, and regulated industries are shifting toward sovereign digital infrastructure to achieve stronger security, compliance, resilience, and long-term control over their data.', '<p>In today’s digital economy, data is no longer just information — it is critical infrastructure.</p><p>Every financial transaction, business decision, customer interaction, and government service depends on secure, accessible, and compliant digital systems. As organizations continue accelerating digital transformation, one question has become increasingly important:</p><p>Who controls your data?</p><p>This challenge has driven the global movement toward Digital Sovereignty — an approach that enables organizations to maintain governance, visibility, compliance, and ownership over their digital infrastructure.</p><p>For enterprises handling sensitive information, sovereignty is becoming a strategic requirement rather than a technical preference.</p><h2>The Shift Toward Sovereign Infrastructure</h2><p>Traditional cloud adoption created unprecedented flexibility and scalability. However, organizations are increasingly facing concerns around:</p><p>• Data residency requirements</p><p>• Cross-border regulatory challenges</p><p>• Cybersecurity risks</p><p>• Vendor dependency</p><p>• Limited visibility into data governance</p><p>As regulations evolve and digital trust becomes more valuable, infrastructure decisions are moving closer to jurisdiction, compliance, and long-term resilience.</p><p>This evolution is creating demand for sovereign digital ecosystems.</p><h2>More Than Data Storage — Building Digital Trust</h2><p>Modern infrastructure goes beyond racks, servers, and cloud resources.</p><p>Organizations require integrated platforms that combine:</p><h3>Secure Infrastructure</h3><p>Enterprise-grade environments designed for availability, reliability, and local governance.</p><h3>Disaster Recovery &amp; Business Continuity</h3><p>Geo-diverse environments that support uninterrupted operations and operational resilience.</p><h3>Secure Document Protection</h3><p>Encrypted and immutable storage environments with audit-ready traceability.</p><h3>Trusted Communication</h3><p>Protected communication channels for email, messaging, collaboration, and sensitive information exchange.</p><h3>Identity &amp; Security Services</h3><p>Centralized identity management, authentication controls, and digital trust frameworks.</p><p>Together, these capabilities establish a foundation for secure and scalable growth.</p><h2>Sustainability Is Becoming a Business Requirement</h2><p>Digital infrastructure must also address environmental responsibility.</p><p>The next generation of infrastructure is expected to deliver:</p><p>• Higher energy efficiency</p><p>• Renewable energy adoption</p><p>• Reduced environmental impact</p><p>• Long-term operational sustainability</p><p>Organizations increasingly evaluate digital infrastructure providers based on both performance and sustainability outcomes.</p><h2>Nepal’s Emerging Role in Digital Infrastructure</h2><p>Nepal presents a unique opportunity to support the next phase of digital infrastructure growth.</p><p>With renewable energy potential, geographic positioning, and growing digital adoption, Nepal can become an emerging destination for secure, resilient, and sovereign digital services.</p><p>This opportunity supports:</p><p>• Banking and financial services</p><p>• Government modernization</p><p>• Telecom infrastructure</p><p>• Enterprise digital transformation</p><p>• Regional business continuity solutions</p><h2>The Future Is Built on Trust</h2><p>Digital transformation is no longer only about moving to the cloud.</p><p>It is about building infrastructure that protects data, enables innovation, supports compliance, and strengthens resilience.</p><p>At Bichuten, we envision a future where organizations can operate with confidence through secure, sustainable, and sovereign digital infrastructure.</p><p>The next generation of growth will not simply be cloud-enabled.</p><p>It will be sovereign by design.</p>', '/bichuten_backend/uploads/img_6a2833c440b58_1781019588.png', 1, 'Bichuten Team', 5, 'Published', 'Digital Sovereignty & Secure Infrastructure | Bichuten', 'Explore why digital sovereignty is shaping the future of secure, compliant, and sustainable digital infrastructure for enterprises and governments', 'digital sovereignty, sovereign cloud, Nepal data center, secure cloud infrastructure, enterprise data security, disaster recovery, sovereign infrastructure, cloud compliance, secure data storage, Bichuten', '/bichuten_backend/uploads/img_6a28345d24688_1781019741.png', 'https://bichuten.com/resources/blog/digital-sovereignty-modern-infrastructure', '2026-06-09 17:42:27', '2026-06-09 21:12:27', '2026-06-09 21:12:27');

-- --------------------------------------------------------

--
-- Table structure for table `blog_categories`
--

CREATE TABLE `blog_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_categories`
--

INSERT INTO `blog_categories` (`id`, `name`, `slug`, `created_at`) VALUES
(1, 'Data Sovereignty', 'data-sovereignty', '2026-06-09 20:11:44'),
(2, 'Cloud Infrastructure', 'cloud-infrastructure', '2026-06-09 20:11:44'),
(3, 'Security & Compliance', 'security-compliance', '2026-06-09 20:11:44'),
(4, 'Sustainability', 'sustainability', '2026-06-09 20:11:44');

-- --------------------------------------------------------

--
-- Table structure for table `career_applications`
--

CREATE TABLE `career_applications` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `current_job_profile` varchar(255) DEFAULT NULL,
  `expected_role` varchar(255) NOT NULL,
  `last_education` varchar(255) DEFAULT NULL,
  `experience` text DEFAULT NULL,
  `employment_status` varchar(100) NOT NULL,
  `expected_salary` varchar(100) DEFAULT NULL,
  `notice_period` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `resume_path` varchar(255) NOT NULL,
  `resume_original_name` varchar(255) NOT NULL,
  `submitted_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `career_applications`
--

INSERT INTO `career_applications` (`id`, `name`, `email`, `phone`, `linkedin`, `address`, `current_job_profile`, `expected_role`, `last_education`, `experience`, `employment_status`, `expected_salary`, `notice_period`, `message`, `resume_path`, `resume_original_name`, `submitted_at`) VALUES
(2, 'Test Candidate', 'candidate_test@example.com', '+977 9876543210', 'https://linkedin.com/in/testcandidate', 'Kathmandu, Nepal', 'QA Engineer', 'Senior QA Engineer', 'B.Sc. in Computer Science', '2 years at TechCorp, 1 year at DevStudio', 'immediate', 'Negotiable', 'Immediate', 'This is a dummy test submission to verify that the careers form backend is working.', '64d849a8293b65890360e92e483a03bb.bin', 'dummy_resume.pdf', '2026-06-22 14:32:56');

-- --------------------------------------------------------

--
-- Table structure for table `case_studies`
--

CREATE TABLE `case_studies` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `overview` text DEFAULT NULL,
  `challenge` text DEFAULT NULL,
  `solution` text DEFAULT NULL,
  `results` text DEFAULT NULL,
  `featured_image` varchar(500) DEFAULT NULL,
  `gallery` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Draft',
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `keywords` text DEFAULT NULL,
  `og_image` varchar(500) DEFAULT NULL,
  `published_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `case_studies`
--

INSERT INTO `case_studies` (`id`, `title`, `slug`, `industry`, `client_name`, `overview`, `challenge`, `solution`, `results`, `featured_image`, `gallery`, `status`, `meta_title`, `meta_description`, `keywords`, `og_image`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 'Modernizing Nepal\'s National Citizen ID Registry with Sovereign Vault Systems', 'national-citizen-id-registry-sovereignty', 'Government & Public Sector', 'Ministry of Communication and Information Technology (MCIT)', 'A comprehensive deployment of secure database and identity infrastructure to host millions of citizen records locally with zero downtime.', 'The government originally managed critical identity verification databases across fragmented server environments, some of which were hosted on overseas systems. This created compliance issues under data privacy rules, exposed records to international latency (over 300ms round-trip), and raised severe legal jurisdiction risks regarding national identity assets.', 'Deployed a customized secure database using Bichuten Data Vault, featuring end-to-end encrypted identity verification layers, in-country caching, and a direct private network fiber connection back to the government administrative offices.', 'Successfully migrated 15 million citizen records with zero service disruption. Latency for database verification dropped from 350ms to less than 15ms. The registry achieved 100% compliance with sovereign data storage mandates, preventing unauthorized third-party visibility.', '/uploads/case-citizen-id.png', '[\"/uploads/case-citizen-id-1.jpg\", \"/uploads/case-citizen-id-2.jpg\"]', 'Published', 'Government Identity Data Case Study | Bichuten', 'Read how Bichuten helped the MCIT secure 15 million citizen identity records with local sovereign digital vault infrastructure.', 'government cloud, data sovereignty case study, national ID nepal, secure database, government IT', '/uploads/case-citizen-id.png', '2026-06-09 20:11:44', '2026-06-09 20:11:44', '2026-06-09 20:17:05'),
(2, 'Achieving 24/7 High-Availability and Disaster Recovery for Everest National Bank', 'everest-national-bank-disaster-recovery', 'Banking & Financial Services', 'Everest National Bank', 'Implementing active-active geo-redundancy and automated database failover systems to guarantee financial system continuity.', 'Frequent regional power grid instability, fiber network disruptions, and natural hazards threatened the bank\'s core transactional databases with loss of operations, transactional inconsistency, and regulatory non-compliance penalties.', 'Set up a primary data center vault in Kathmandu with real-time, low-latency replication to a disaster recovery vault in Pokhara. Both locations are backed by independent hydro-electric connections, heavy solar arrays, and redundant generator power backups to ensure complete utility isolation.', 'The bank achieved a continuous 99.99% system uptime, surviving three regional grid outages with zero transaction losses. The Recovery Point Objective (RPO) and Recovery Time Objective (RTO) were both brought down to under 3 seconds, exceeding central bank guidelines.', '/uploads/case-banking-dr.png', '[\"/uploads/case-banking-dr-1.jpg\", \"/uploads/case-banking-dr-2.jpg\"]', 'Published', 'Banking Disaster Recovery Case Study | Bichuten', 'See how Everest National Bank implemented active-active geo-redundant disaster recovery using Bichuten Data Vault.', 'banking disaster recovery, data center Pokhara, bank uptime nepal, real-time database replication', '/uploads/case-banking-dr.png', '2026-06-09 20:11:44', '2026-06-09 20:11:44', '2026-06-09 20:17:05'),
(3, 'Enabling Secure and Compliant Communication for Himalayan Health System', 'himalayan-health-system-secure-communication', 'Enterprise & Healthcare', 'Himalayan Medical & Diagnostic Alliance', 'Replacing public instant messaging with end-to-end encrypted sovereign channels for confidential medical records transmission.', 'Doctors, laboratory technicians, and administrators were frequently sharing sensitive patient records, diagnostics, and radiological images over public, foreign-hosted chat applications. This led to serious patient privacy violations and raised compliance risks under medical confidentiality acts.', 'Implemented the Bichuten Secure Communication Layer hosted entirely within local secure servers. The communication system features end-to-end encryption (E2EE), zero-knowledge storage, and a customized API integrating hospital records directly into secure messaging channels.', 'Protected data transmission for over 25,000 active staff members. External data intercept incidents dropped to absolute zero. Millions of medical files are now shared securely, and patient data is completely secure in accordance with sovereign medical guidelines.', '/uploads/case-health-communication.png', '[\"/uploads/case-health-communication-1.jpg\", \"/uploads/case-health-communication-2.jpg\"]', 'Published', 'Secure Healthcare Communication Case Study | Bichuten', 'Read how Bichuten enabled E2EE secure communications for Himalayan Health System, protecting patient privacy.', 'healthcare security, E2EE medical chat, patient data privacy nepal, secure communication network', '/uploads/case-health-communication.png', '2026-06-09 20:11:44', '2026-06-09 20:11:44', '2026-06-09 20:17:05'),
(4, 'Strengthening Business Continuity Through Sovereign Disaster Recovery Infrastructure', 'strengthening-business-continuity-through-sovereign-disaster-recovery-infrastructure', 'Financial Services', 'Confidential Financial Institution', 'A leading financial institution sought to strengthen operational resilience, improve disaster recovery readiness, and align infrastructure planning with evolving data governance expectations. Bichuten designed a sovereign disaster recovery strategy focused on secure infrastructure, compliance readiness, and long-term business continuity.', '<p>The organization relied on centralized infrastructure that created operational concentration risk and limited flexibility for future regulatory requirements.</p><p>Primary challenges included:</p><p>• Business continuity exposure during outages</p><p>• Recovery planning limitations across critical workloads</p><p>• Requirement for stronger data governance controls</p><p>• Need for jurisdiction-aligned infrastructure planning</p><p>• Pressure to improve resilience while maintaining performance</p><p>The institution required an infrastructure strategy capable of supporting continuous operations without compromising security and compliance expectations.</p>', '<p>Bichuten designed a sovereign-ready disaster recovery and resilience architecture centered on secure infrastructure principles.</p><p>Delivered capabilities included:</p><p>• Geo-diverse disaster recovery environment design</p><p>• Jurisdiction-controlled infrastructure planning</p><p>• Secure backup and recovery workflows</p><p>• Encrypted replication architecture</p><p>• High-availability design recommendations</p><p>• Business continuity readiness framework</p><p>• Infrastructure governance and resilience policies</p><p>The proposed architecture was designed to support operational continuity while maintaining enterprise-grade security and scalability.</p>', '<p>Following implementation planning and readiness optimization, the organization established a stronger operational resilience posture.</p><p>Key outcomes included:</p><p>• Improved preparedness for service continuity events</p><p>• Enhanced recovery readiness for critical systems</p><p>• Better governance visibility across infrastructure environments</p><p>• Reduced dependency concentration risk</p><p>• Stronger alignment between infrastructure and business objectives</p><p>The engagement established a scalable foundation for future sovereign digital transformation initiatives.</p>', '/bichuten_backend/uploads/img_6a293590e07be_1781085584.png', NULL, 'Published', 'Business Continuity & Disaster Recovery | Bichuten', 'See how sovereign disaster recovery infrastructure improves resilience, continuity, security, and compliance readiness.', 'business continuity infrastructure, disaster recovery Nepal, sovereign infrastructure, sovereign cloud Nepal, secure disaster recovery, enterprise resilience, compliance infrastructure, data recovery solutions, cyber resilience, secure cloud infrastructure, Bichuten Data Vault, business continuity solutions', '/bichuten_backend/uploads/img_6a2935135df3f_1781085459.png', '2026-06-10 11:57:46', '2026-06-10 15:27:46', '2026-06-10 15:29:50');

-- --------------------------------------------------------

--
-- Table structure for table `case_study_metrics`
--

CREATE TABLE `case_study_metrics` (
  `id` int(11) NOT NULL,
  `case_study_id` int(11) NOT NULL,
  `metric_name` varchar(255) NOT NULL,
  `metric_value` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `case_study_metrics`
--

INSERT INTO `case_study_metrics` (`id`, `case_study_id`, `metric_name`, `metric_value`, `created_at`) VALUES
(1, 1, 'Latency Reduction', '95%', '2026-06-09 20:11:44'),
(2, 1, 'Compliance Score', '100%', '2026-06-09 20:11:44'),
(3, 1, 'Citizen Records Migrated', '15 Million+', '2026-06-09 20:11:44'),
(4, 2, 'Core Database Uptime', '99.99%', '2026-06-09 20:11:44'),
(5, 2, 'Recovery Time (RPO/RTO)', '< 3 seconds', '2026-06-09 20:11:44'),
(6, 2, 'Transaction Loss', '0%', '2026-06-09 20:11:44'),
(7, 3, 'Data Leak Incidents', '0', '2026-06-09 20:11:44'),
(8, 3, 'Active Secure Users', '25,000+', '2026-06-09 20:11:44'),
(9, 3, 'Encrypted Files Exchanged', '2 Million+', '2026-06-09 20:11:44'),
(12, 4, 'Improved', 'Recovery Readiness', '2026-06-10 15:29:50'),
(13, 4, '99.99%', 'Infrastructure Availability Target', '2026-06-10 15:29:50');

-- --------------------------------------------------------

--
-- Table structure for table `contact_submissions`
--

CREATE TABLE `contact_submissions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `organization` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `industry` varchar(100) NOT NULL,
  `service` varchar(100) NOT NULL,
  `message` text DEFAULT NULL,
  `submitted_at` datetime NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_submissions`
--

INSERT INTO `contact_submissions` (`id`, `name`, `organization`, `email`, `phone`, `industry`, `service`, `message`, `submitted_at`, `is_read`) VALUES
(7, 'Test', 'Test', 'test@test.com', '+977 9876543210', 'bfsi', 'infrastructure', 'test', '2026-06-22 14:25:12', 0);

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_subscribers`
--

CREATE TABLE `newsletter_subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subscribed_at` datetime NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `newsletter_subscribers`
--

INSERT INTO `newsletter_subscribers` (`id`, `email`, `subscribed_at`, `is_active`) VALUES
(4, 'test_api_powershell@example.com', '2026-06-22 14:29:08', 1),
(5, 'test@test.com', '2026-06-22 14:30:01', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(128) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `website_settings`
--

CREATE TABLE `website_settings` (
  `id` int(11) NOT NULL,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `website_settings`
--

INSERT INTO `website_settings` (`id`, `setting_key`, `setting_value`) VALUES
(3, 'site_name', 'Bichuten Data Vault'),
(4, 'site_tagline', 'Nepal\'s Sovereign Digital Infrastructure Platform'),
(5, 'contact_email', 'info@bichuten.com'),
(6, 'contact_phone', '+977 9714509070'),
(7, 'address_line1', 'Kathmandu'),
(8, 'address_city', 'Kathmandu'),
(9, 'address_state', 'Bagmati Province'),
(10, 'address_country', 'Nepal'),
(11, 'social_linkedin', ''),
(12, 'social_twitter', ''),
(13, 'social_instagram', ''),
(14, 'social_youtube', ''),
(15, 'seo_default_title', 'Bichuten Data Vault | Nepal\'s Sovereign Digital Infrastructure Platform'),
(16, 'seo_default_description', 'Bichuten Data Vault is Nepal\'s sovereign digital infrastructure platform delivering secure, compliant, and high-performance data center, communication, identity, and security services for enterprises and government.'),
(17, 'seo_keywords', 'sovereign digital infrastructure Nepal, data vault Nepal, secure data center Kathmandu, enterprise cloud Nepal, data sovereignty Nepal, Bichuten, government infrastructure Nepal, compliance infrastructure'),
(18, 'seo_og_image', '/bichuten_backend/uploads/og-default.jpg'),
(19, 'google_analytics_id', ''),
(20, 'google_tag_manager_id', ''),
(21, 'robots_directive', 'index, follow'),
(29, 'contact_email_sales', 'sales@bichuten.com'),
(30, 'contact_email_support', 'support@bichuten.com'),
(31, 'business_hours', 'Monday – Friday: 9:00 AM – 6:00 PM'),
(32, 'support_hours', '24/7 for infrastructure & critical services'),
(33, 'brand_tagline_short', 'Sovereign Infrastructure. Built in Nepal.'),
(34, 'brand_cta_primary', 'Request a Consultation'),
(35, 'brand_cta_secondary', 'Talk to an Expert');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `admin_activity_logs`
--
ALTER TABLE `admin_activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `blog_categories`
--
ALTER TABLE `blog_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `career_applications`
--
ALTER TABLE `career_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_submitted_at` (`submitted_at`);

--
-- Indexes for table `case_studies`
--
ALTER TABLE `case_studies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `case_study_metrics`
--
ALTER TABLE `case_study_metrics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `case_study_id` (`case_study_id`);

--
-- Indexes for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_submitted_at` (`submitted_at`);

--
-- Indexes for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_newsletter_email` (`email`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `idx_token` (`token`),
  ADD KEY `idx_email` (`email`);

--
-- Indexes for table `website_settings`
--
ALTER TABLE `website_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admin_activity_logs`
--
ALTER TABLE `admin_activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blog_categories`
--
ALTER TABLE `blog_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `career_applications`
--
ALTER TABLE `career_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `case_studies`
--
ALTER TABLE `case_studies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `case_study_metrics`
--
ALTER TABLE `case_study_metrics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `website_settings`
--
ALTER TABLE `website_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_activity_logs`
--
ALTER TABLE `admin_activity_logs`
  ADD CONSTRAINT `admin_activity_logs_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `blog_categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `case_study_metrics`
--
ALTER TABLE `case_study_metrics`
  ADD CONSTRAINT `case_study_metrics_ibfk_1` FOREIGN KEY (`case_study_id`) REFERENCES `case_studies` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
