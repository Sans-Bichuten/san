# Administrative User Manual — Bichuten Data Vault

This manual details how to operate the **Bichuten Admin Control Panel**. It guides the operations and content teams through managing incoming leads, updating dynamic blogs, reviewing job applications, managing settings, and monitoring administrative audit logs.

---

## 1. Access & Dashboard Overview

### Login Credentials
1. Open your browser and navigate to the admin portal:
   * **Local:** `http://localhost:5173/admin/login`
   * **Production:** `https://bichuten.com/admin/login` (or your domain equivalent)
2. Enter the administrator credentials:
   * **Default Email:** `admin@bichuten.com`
   * **Default Password:** `Admin@2026!` *(change this immediately after your first login)*
3. Click **Sign In**. The system will authenticate your session, generate a CSRF validation token, and redirect you to the main dashboard.

---

## 2. Managing Consultation Leads (Leads Module)

When visitors submit the "Request a Consultation" form on the public website, their submissions are securely saved in the database.

### Reviewing Submissions
1. Click **Leads** in the Admin Sidebar.
2. The page displays a table of all contact inquiries with the following columns:
   * **Name & Organization:** Visitor identity details.
   * **Contact Information:** Email, phone number, and industry sector.
   * **Service Requested:** Specific solution domain (e.g. Identity Access, Data Center, Secure Comm).
   * **Date:** Timestamp of submission.
   * **Status Badge:** Shows either **New** (unread) or **Reviewed** (read).
3. Click a lead row to view the full message body.
4. Mark the lead as **Reviewed** once follow-up contact is established.

---

## 3. Talent Acquisition Pipeline (Careers Module)

Candidates submit applications on the dynamic Careers page, uploading their PDF or Word resumes.

### Reviewing Candidates
1. Click **Careers** in the Admin Sidebar.
2. You will see a chronological pipeline of applicants, showing:
   * Candidate name, email, phone, and expected salary/notice period.
   * Expected Role (e.g. System Administrator, Devops Lead).
   * Total years of experience and employment status.
3. Click **Download Resume** to review their CV.
   * *Security Note: Resumes are stored on the server as randomized, non-executable `.bin` binaries. Clicking download triggers a secure backend script (`download-resume.php`) that checks your session, re-attaches the original file extension (e.g. `.pdf`), and streams the file securely to your browser.*

---

## 4. Newsletter Subscribers

1. Click **Newsletter** in the Admin Sidebar.
2. This view displays all registered subscriber emails and their subscription statuses.
3. To export the list for email marketing platforms (e.g., Mailchimp):
   * Click **Export CSV** to download a spreadsheet of active subscribers.

---

## 5. Editing Dynamic Content (Blogs & Case Studies)

The platform includes a built-in content manager for writing blogs and publishing case studies.

### Publishing a Blog Post
1. Click **Blogs** in the Admin Sidebar.
2. Click **Create New Blog**.
3. Fill in the following settings:
   * **Title & Slug:** The slug is generated automatically based on the title (e.g., `nepals-sovereign-cloud-infrastructure`).
   * **Category:** Assign to a category (or click **Add Category** to create a new one).
   * **Author & Read Time:** Enter developer/author details and reading estimation (minutes).
   * **Excerpt:** A short 2-3 sentence summary displayed on the card preview lists.
   * **Content (Rich Text Editor):** Write your content using the editor. You can insert links, headers, code snippets, and format text.
   * **Featured Image:** Upload a cover image. It is automatically saved inside `/uploads/`.
   * **SEO Settings:** Provide a custom Meta Title, Meta Description, and Canonical URL for search engine optimization.
4. Set the status to **Draft** or **Published**.
5. Click **Save Blog**.

### Creating Case Studies
1. Click **Case Studies** in the Admin Sidebar.
2. Click **Create New Case Study**.
3. Fill in details (Client Name, Industry, Challenge, Solution, and Results).
4. Add **Metrics** (e.g., Metric Name: `Uptime`, Metric Value: `99.99%`) to populate the interactive key performance grids on the public case studies page.

---

## 6. Website Settings Management

Rather than editing codebase configurations, general parameters can be edited directly in the Admin Panel:

1. Click **Settings** in the Admin Sidebar.
2. Update values in the following categories:
   * **General Brand Info:** Site Name, contact phone, contact support email, and physical office address.
   * **Brand Messaging:** Hero titles, short description tags, and text for primary and secondary CTA buttons.
   * **Social Profiles:** Links to your LinkedIn, Twitter, Instagram, and YouTube pages.
   * **Analytics & Search Engines:** Google Analytics Tracking IDs, Google Tag Manager IDs, and robots search indexing directives (e.g., `index, follow` or `noindex, nofollow`).
3. Click **Update Settings** to save your changes to the database.

---

## 7. Audit Compliance Logs (Security Module)

For regulatory compliance, the system records all administrative actions:

1. Click **Activity Logs** in the Admin Sidebar.
2. The table shows a log of administrative actions, detailing:
   * Which administrator performed the action.
   * The action taken (e.g., `Logged In`, `Created Blog`, `Updated Settings`, `Downloaded Resume`).
   * The administrator's IP address.
   * Timestamp.
3. This audit trail is read-only and cannot be modified or cleared by standard administrative accounts.
