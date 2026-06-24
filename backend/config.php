<?php
// ============================================================
// Bichuten Backend — Centralized Configuration
// ============================================================
// All settings in one place. Update these for production.
// ============================================================

// Database Credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'bichuten_contact');
define('DB_USER', 'root');
define('DB_PASS', '');

// Allowed CORS Origins
define('ALLOWED_ORIGINS', [
    'http://localhost:5173',          // Local dev React/Vite
    'http://localhost:3000',          // Local dev alternative
    'https://bichuten.com',           // Main domain
    'https://www.bichuten.com',       // Main domain with www
]);


// Upload settings
define('MAX_UPLOAD_SIZE', 5 * 1024 * 1024); // 5 MB

// Rate Limiting
define('LOGIN_MAX_ATTEMPTS', 5);
define('LOGIN_WINDOW_SECONDS', 300);      // 5 minutes
define('FORM_MAX_ATTEMPTS', 10);
define('FORM_WINDOW_SECONDS', 3600);      // 1 hour

// Allowed website_settings keys (whitelist for update-settings.php)
define('ALLOWED_SETTING_KEYS', [
    // General
    'site_name', 'site_tagline', 'contact_email', 'contact_phone',
    // Address
    'address_line1', 'address_city', 'address_state', 'address_country',
    // Social Media
    'social_linkedin', 'social_twitter', 'social_instagram', 'social_youtube',
    // SEO
    'seo_default_title', 'seo_default_description', 'seo_keywords', 'seo_og_image',
    // Analytics
    'google_analytics_id', 'google_tag_manager_id', 'robots_directive',
    // Contact
    'contact_email_sales', 'contact_email_support',
    'business_hours', 'support_hours',
    // Brand
    'brand_tagline_short', 'brand_cta_primary', 'brand_cta_secondary',
]);

// ============================================================
// Email / SMTP Configuration (for Forgot Password)
// ============================================================
// On Hostinger: use your cPanel email account credentials.
// On XAMPP (local): leave SMTP settings as-is; emails won't
// send locally but the reset link is logged to php error_log.
// ============================================================
define('MAIL_FROM_ADDRESS', 'noreply@bichuten.com');  // ← Your Hostinger email
define('MAIL_FROM_NAME',    'Bichuten Admin');

// Dynamically set SITE_URL based on environment
if (isset($_SERVER['HTTP_HOST']) && ($_SERVER['HTTP_HOST'] === 'localhost' || strpos($_SERVER['HTTP_HOST'], 'localhost:') === 0 || $_SERVER['HTTP_HOST'] === '127.0.0.1')) {
    define('SITE_URL', 'http://localhost:5173'); // Local Dev React/Vite server URL
} else {
    define('SITE_URL', 'https://bichuten.com');  // Main Domain for production
}

// Password reset token expiry (seconds) — 1 hour default
define('RESET_TOKEN_EXPIRY', 3600);


