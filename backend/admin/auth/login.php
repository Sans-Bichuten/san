<?php
// ============================================================
// Bichuten Admin Panel — Login API
// ============================================================

require_once __DIR__ . '/../db.php';

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['email']) || empty($input['password'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Email and password are required.']);
    exit();
}

$email      = trim($input['email']);
$password   = $input['password'];
$ip_address = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';

// ---- Rate Limiting (brute-force protection) ----
if (isRateLimited('login_' . $ip_address, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_SECONDS)) {
    http_response_code(429);
    echo json_encode(['status' => 'error', 'message' => 'Too many login attempts. Please try again in 5 minutes.']);
    exit();
}

try {
    // Check if user exists and is active
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = :email AND status = 'active' LIMIT 1");
    $stmt->execute([':email' => $email]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($password, $admin['password'])) {
        // Prevent session fixation
        session_regenerate_id(true);

        $_SESSION['admin_id']    = $admin['id'];
        $_SESSION['admin_name']  = $admin['name'];
        $_SESSION['admin_role']  = $admin['role'];
        $_SESSION['admin_email'] = $admin['email'];
        $_SESSION['last_login']  = time();
        $_SESSION['csrf_token']  = bin2hex(random_bytes(32));

        // Log the successful login
        $logStmt = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:admin_id, 'Login successful', :ip)");
        $logStmt->execute([':admin_id' => $admin['id'], ':ip' => $ip_address]);

        echo json_encode([
            'status'  => 'success',
            'message' => 'Login successful.',
            'csrfToken' => $_SESSION['csrf_token'],
            'admin'   => [
                'id'    => $admin['id'],
                'name'  => $admin['name'],
                'email' => $admin['email'],
                'role'  => $admin['role']
            ]
        ]);
    } else {
        // If user exists, log failed attempt
        if ($admin) {
            $logStmt = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:admin_id, 'Failed login attempt', :ip)");
            $logStmt->execute([':admin_id' => $admin['id'], ':ip' => $ip_address]);
        }

        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Invalid email or password.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Internal server error.']);
}
?>
