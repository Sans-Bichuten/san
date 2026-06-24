<?php
// ============================================================
// Bichuten Contact Form API
// Place this file at: htdocs/bichuten_backend/contact_api.php
// ============================================================

require_once __DIR__ . '/admin/db.php';

// --- CORS Headers (restrict to allowed origins from config) ---
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: " . ALLOWED_ORIGINS[0]);
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed. Use POST.'
    ]);
    exit();
}

// Rate limiting for contact form
$ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
if (isRateLimited('contact_' . $ip, FORM_MAX_ATTEMPTS, FORM_WINDOW_SECONDS)) {
    http_response_code(429);
    echo json_encode(['status' => 'error', 'message' => 'Too many submissions. Please try again later.']);
    exit();
}

// --- Read JSON Input ---
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid JSON input.'
    ]);
    exit();
}

// --- Extract & Sanitize Fields ---
$name     = isset($input['name'])     ? trim(htmlspecialchars($input['name']))     : '';
$org      = isset($input['org'])      ? trim(htmlspecialchars($input['org']))      : '';
$email    = isset($input['email'])    ? trim(htmlspecialchars($input['email']))    : '';
$phone    = isset($input['phone'])    ? trim(htmlspecialchars($input['phone']))    : '';
$industry = isset($input['industry']) ? trim(htmlspecialchars($input['industry'])) : '';
$service  = isset($input['service'])  ? trim(htmlspecialchars($input['service']))  : '';
$message  = isset($input['message'])  ? trim(htmlspecialchars($input['message']))  : '';

// --- Validate Required Fields ---
if (empty($name) || empty($email) || empty($org) || empty($industry) || empty($service)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please fill in all required fields (Name, Email, Organization, Industry, Service).'
    ]);
    exit();
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide a valid email address.'
    ]);
    exit();
}

// --- Connect to Database (use $pdo from db.php) ---
try {
    if (!isset($pdo)) {
        throw new Exception('Database not initialized.');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed.'
    ]);
    exit();
}

// --- Insert into Database ---
try {
    $stmt = $pdo->prepare("
        INSERT INTO contact_submissions (name, organization, email, phone, industry, service, message, submitted_at)
        VALUES (:name, :org, :email, :phone, :industry, :service, :message, NOW())
    ");

    $stmt->execute([
        ':name'     => $name,
        ':org'      => $org,
        ':email'    => $email,
        ':phone'    => $phone,
        ':industry' => $industry,
        ':service'  => $service,
        ':message'  => $message,
    ]);

    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Your inquiry has been submitted successfully. We will contact you within 24 hours.'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to save your inquiry. Please try again later.'
    ]);
}
?>
