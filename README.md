# Bichuten Data Vault — Enterprise Web Platform

This repository contains the source code for the **Bichuten Data Vault** website and administrative panel. The project is engineered with a modern, high-performance React front-end coupled with a secure, lightweight PHP/MySQL session-based backend.

---

## 1. Project Overview

The Bichuten Data Vault platform serves as a sovereign digital infrastructure interface for Nepal. It includes:
* **Public Core Website:** Responsive, animated pages showcasing platforms, solutions, services, and corporate details.
* **Knowledge Hub & Resource Center:** Fully dynamic blog and case studies search engines.
* **Talent Acquisition (Careers) Portal:** A secure portal for uploading and managing resumes.
* **Control Panel (Admin Dashboard):** Secure dashboard allowing administrators to audit contact leads, manage articles/careers, upload media, optimize SEO keys, and adjust business configuration parameters dynamically.

---

## 2. Folder Explanation

The workspace is organized into separate front-end and back-end directories:

```
├── public/                       # Static public assets (logos, images, favicon)
├── src/                          # React Frontend source code
│   ├── assets/                   # Frontend design elements, icons, and illustrations
│   ├── components/               # Core design elements (Navbar, Footer, etc.)
│   ├── pages/                    # Public pages (Home, Platform, Solutions, etc.)
│   └── admin/                    # Administrative frontend modules
│       ├── components/           # Protected routes, widgets, rich-text input wrappers
│       ├── context/              # Authentication context (AuthContext.jsx)
│       ├── layouts/              # Dashboard layouts (AdminLayout.jsx)
│       ├── pages/                # Admin views (Admins, Settings, Leads, SEO, etc.)
│       └── services/             # API request service handlers with CSRF validation (api.js)
├── backend/                      # Server-side PHP backend APIs
│   ├── .htaccess                 # PHP runtime overrides & rewrite conditions
│   ├── config.php                # Centralized database, SMTP, CORS, and settings whitelist
│   ├── bichuten_contact.sql      # MySQL schema initialization and seed script (combined)
│   ├── contact_api.php           # REST API for public contact requests
│   ├── newsletter_api.php        # REST API for public newsletter registration
│   ├── careers_api.php           # REST API for candidate forms & secure uploads
│   ├── uploads/                  # Protected folder for resumes (denies web access)
│   └── admin/                    # Secure Admin Controllers
│       ├── db.php                # Database connections, session configurations, and security functions
│       └── auth/                 # Login, logout, check-auth, and password reset endpoints
├── package.json                  # Frontend node dependencies & runtime script directives
├── vite.config.js                # Vite development server proxies and build configurations
└── eslint.config.js              # Code linting rules
```

---

## 3. Installation & Local Setup

### System Prerequisites
* **Web Server Stack:** XAMPP, WampServer, or Laragon running **PHP 8.x+** and **MySQL 8.x+**.
* **Node.js Environment:** **Node.js (v18.x or v20.x)** and npm (v9.x+).

### Step-by-Step Local Deployment
1. **Clone & Extract Codebase:** Put the directory under your XAMPP root folder, typically:
   ```
   C:\xampp\htdocs\Bichuten_Data_Vault
   ```
2. **Database Initialization:**
   * Launch Apache and MySQL from your XAMPP Control Panel.
   * Access `http://localhost/phpmyadmin` in your browser.
   * Create a database called `bichuten_contact`.
   * Open the SQL console tab, import the database structure and seed data file [bichuten_contact.sql](file:///d:/xampp/htdocs/Bichuten_Data_Vault/backend/bichuten_contact.sql), and click **Go**.
3. **Database Configuration:**
   * Open [backend/config.php](file:///d:/xampp/htdocs/Bichuten_Data_Vault/backend/config.php) and adjust credentials:
     ```php
     define('DB_HOST', 'localhost');
     define('DB_NAME', 'bichuten_contact');
     define('DB_USER', 'root');
     define('DB_PASS', ''); // default empty password for XAMPP
     ```
4. **Vite Proxy Verification:**
    * Open [vite.config.js](file:///d:/xampp/htdocs/Bichuten_Data_Vault/vite.config.js). Ensure the proxy rewrite matches your directory name:
      ```js
      rewrite: (path) => path.replace('/bichuten_backend', '/Bichuten_Data_Vault/backend')
      ```
5. **Install Frontend Dependencies:**
   * Open a terminal in the root folder and run:
     ```bash
     npm install
     ```
6. **Start Dev Server:**
   * Run the frontend server:
     ```bash
     npm run dev
     ```
   * Open `http://localhost:5173` in your browser.

---

## 4. Environment variables & Configuration

This project does not rely on `.env` files for backend processing. All settings are declared dynamically via PHP constants in [backend/config.php](file:///d:/xampp/htdocs/Bichuten_Data_Vault/backend/config.php):

| Constant | Description | Value for Dev | Value for Production |
| :--- | :--- | :--- | :--- |
| `DB_HOST` | Database server address | `localhost` | `localhost` (Hostinger defaults) |
| `DB_NAME` | Database schema name | `bichuten_contact` | `u468611660_bichutendb` |
| `DB_USER` | Database username | `root` | `u468611660_Bichu10user` |
| `DB_PASS` | Database password | `""` | `[SECRET_PRODUCTION_PASS]` |
| `ALLOWED_ORIGINS` | Permissible client domains | `['http://localhost:5173']` | `['https://bichuten.com', ...]` |
| `SITE_URL` | Application root URL | `http://localhost:5173` | `https://admin.bichuten.com` |

---

## 5. Build & Deployment Commands

### Build Frontend
Compile the React bundle into optimized HTML, JS, and CSS static files:
```bash
npm run build
```
This generates the compile target inside the `dist/` directory.

### Local Preview
Preview the production build locally:
```bash
npm run preview
```

### Deployment Command Flow
1. Run `npm run build` locally.
2. Connect to production server via SFTP/cPanel File Manager.
3. Upload contents of `dist/` to your target directory (`public_html/`).
4. Upload `backend/` files to `public_html/bichuten_backend/`.

---

## 6. Troubleshooting

### Problem 1: Forms fail to submit locally (CORS errors)
* **Reason:** The browser blocks requests if the backend is hosted on a different origin than the frontend.
* **Fix:** Open [backend/config.php](file:///d:/xampp/htdocs/Bichuten_Data_Vault/backend/config.php) and check if your local front-end address (`http://localhost:5173`) is listed inside the `ALLOWED_ORIGINS` array.

### Problem 2: Admin session logs out immediately or fails to login
* **Reason:** `session.cookie_secure` is enabled locally, but the local environment is running on plain HTTP.
* **Fix:** Open [backend/admin/db.php](file:///d:/xampp/htdocs/Bichuten_Data_Vault/backend/admin/db.php) and verify the secure session setting:
  ```php
  // For local HTTP development, set to 0. Change back to 1 on HTTPS production.
  ini_set('session.cookie_secure', 0);
  ```

### Problem 3: 404 Errors on frontend routing refresh
* **Reason:** The React Router uses client-side routing, which requires Apache to redirect requests to `index.html`.
* **Fix:** Ensure an `.htaccess` file exists in `public_html/` with the following fallback directives:
  ```apache
  <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
  </IfModule>
  ```
