<?php
// ============================================================
// Bichuten Public — Get Public Website Settings
// ============================================================

require_once __DIR__ . '/../admin/db.php';

// Strict whitelist of public-facing keys to prevent private settings leakage
$whitelist = [
    'site_name',
    'site_tagline',
    'contact_email',
    'contact_phone',
    'address_line1',
    'address_city',
    'address_state',
    'address_country',
    'social_linkedin',
    'social_twitter',
    'social_instagram',
    'social_youtube',
    'contact_email_sales',
    'contact_email_support',
    'business_hours',
    'support_hours',
    'brand_tagline_short',
    'brand_cta_primary',
    'brand_cta_secondary',
    'seo_default_title',
    'seo_default_description',
    'seo_keywords'
];

try {
    // Dynamically build placeholders for the IN clause
    $placeholders = implode(',', array_fill(0, count($whitelist), '?'));
    $stmt = $pdo->prepare("SELECT setting_key, setting_value FROM website_settings WHERE setting_key IN ($placeholders)");
    $stmt->execute($whitelist);
    $rows = $stmt->fetchAll();

    $settings = [];
    // Initialize all whitelisted keys to empty strings so frontend always gets a defined schema
    foreach ($whitelist as $key) {
        $settings[$key] = '';
    }
    
    foreach ($rows as $row) {
        $settings[$row['setting_key']] = $row['setting_value'] ?? '';
    }

    echo json_encode(['status' => 'success', 'settings' => $settings]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch settings.']);
}
?>
