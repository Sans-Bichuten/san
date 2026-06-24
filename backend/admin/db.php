<?php
// ============================================================
// Bichuten Backend — Bootstrap & Database Connection
// ============================================================
// Include this file FIRST in every endpoint. It handles:
//   1. CORS headers (dynamic, production-ready)
//   2. Session configuration (secure cookies)
//   3. OPTIONS preflight handling
//   4. Database connection (PDO)
//   5. Helper functions (requireAuth, requireSuperAdmin, etc.)
// ============================================================

require_once __DIR__ . '/../config.php';

// ---- CORS Headers (dynamic origin from config) ----
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Fallback to first allowed origin (dev)
    header("Access-Control-Allow-Origin: " . ALLOWED_ORIGINS[0]);
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// ---- Secure Session Configuration ----
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_samesite', 'Lax');
// ⚠️ PRODUCTION: Change the value below from 0 to 1 once you have HTTPS enabled on Hostinger
// This prevents session cookies from being sent over plain HTTP
ini_set('session.cookie_secure', 0); // → Set to 1 in production with HTTPS
ini_set('display_errors', 0);
error_reporting(0);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Inactivity Session Timeout (30 minutes = 1800 seconds)
if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > 1800)) {
    session_unset();
    session_destroy();
    session_start();
}
$_SESSION['last_activity'] = time();

// ---- Handle OPTIONS Preflight ----
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ---- Database Connection ----
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false, // Enforce native prepared statements
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Database connection failed.'
    ]);
    exit();
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Require admin authentication. Exits with 401 if not logged in.
 */
function requireAuth() {
    if (!isset($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Not authenticated.']);
        exit();
    }

    // CSRF Verification for state-changing methods
    if ($_SERVER['REQUEST_METHOD'] !== 'GET' && $_SERVER['REQUEST_METHOD'] !== 'OPTIONS') {
        $headers = getallheaders();
        $clientToken = $headers['X-CSRF-Token'] ?? $headers['x-csrf-token'] ?? '';
        
        if (empty($clientToken) || !isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $clientToken)) {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'CSRF token validation failed.']);
            exit();
        }
    }
}

/**
 * Require super_admin role. Exits with 403 if insufficient.
 */
function requireSuperAdmin() {
    requireAuth();
    if (($_SESSION['admin_role'] ?? '') !== 'super_admin') {
        http_response_code(403);
        echo json_encode(['status' => 'error', 'message' => 'Super admin access required.']);
        exit();
    }
}

/**
 * Simple file-based rate limiter.
 *
 * @param  string $key           Unique key (e.g. 'login_127.0.0.1')
 * @param  int    $maxAttempts   Max attempts allowed in the window
 * @param  int    $windowSeconds Time window in seconds
 * @return bool   True if rate limit is exceeded (caller should block)
 */
function isRateLimited($key, $maxAttempts = 5, $windowSeconds = 300) {
    $dir = sys_get_temp_dir() . '/bichuten_rate_limits';
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }

    $file     = $dir . '/' . md5($key) . '.json';
    $attempts = [];

    if (file_exists($file)) {
        $data = json_decode(file_get_contents($file), true);
        if (is_array($data)) {
            $cutoff   = time() - $windowSeconds;
            $attempts = array_filter($data, fn($ts) => $ts > $cutoff);
        }
    }

    if (count($attempts) >= $maxAttempts) {
        return true; // rate-limited
    }

    $attempts[] = time();
    file_put_contents($file, json_encode(array_values($attempts)));
    return false;
}

/**
 * Safely truncate a string for activity-log entries (VARCHAR 255).
 */
function truncateForLog($str, $maxLen = 200) {
    return mb_substr($str, 0, $maxLen);
}
?>
