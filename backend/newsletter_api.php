<?php
// ============================================================
// Bichuten Newsletter API
// ============================================================
// Public endpoint — no auth required, rate-limited.
// ============================================================

require_once __DIR__ . '/admin/db.php';

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed. Use POST.']);
    exit();
}

// ---- Rate Limiting (spam protection) ----
$ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
if (isRateLimited('newsletter_' . $ip, FORM_MAX_ATTEMPTS, FORM_WINDOW_SECONDS)) {
    http_response_code(429);
    echo json_encode(['status' => 'error', 'message' => 'Too many submissions. Please try again later.']);
    exit();
}

// ---- Read JSON input ----
$json_data = file_get_contents("php://input");
$data      = json_decode($json_data, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data received.']);
    exit();
}

// ---- Validate Email ----
$email = isset($data['email']) ? trim($data['email']) : '';

if (empty($email)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Email is required.']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email format.']);
    exit();
}

// ---- Insert into Database ----
try {
    $stmt = $pdo->prepare("INSERT INTO newsletter_subscribers (email) VALUES (:email)");
    $stmt->bindParam(':email', $email);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            'status'  => 'success',
            'message' => 'Successfully subscribed to the newsletter.'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status'  => 'error',
            'message' => 'Failed to subscribe. Please try again.'
        ]);
    }
} catch (PDOException $e) {
    // Check for duplicate entry (email already subscribed)
    if ($e->getCode() == 23000) {
        http_response_code(409);
        echo json_encode([
            'status'  => 'error',
            'message' => 'This email is already subscribed.'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'status'  => 'error',
            'message' => 'A database error occurred.'
        ]);
    }
}
?>
