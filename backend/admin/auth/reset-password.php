<?php
// ============================================================
// Bichuten Admin Panel — Reset Password API
// ============================================================
// Accepts: { token, password, confirm_password }
// 1. Validates token exists + not expired
// 2. Validates new password strength
// 3. Updates admin's password with bcrypt hash
// 4. Deletes the used token
// 5. Logs the activity
// ============================================================

require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['token']) || empty($input['password'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Token and new password are required.']);
    exit();
}

$token           = trim($input['token']);
$newPassword     = $input['password'];
$confirmPassword = $input['confirm_password'] ?? '';

// ---- Validate password strength ----
if (strlen($newPassword) < 8) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Password must be at least 8 characters long.']);
    exit();
}

if ($newPassword !== $confirmPassword) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Passwords do not match.']);
    exit();
}

try {
    // ---- Look up the token ----
    $stmt = $pdo->prepare("SELECT email, expires_at FROM password_resets WHERE token = :token LIMIT 1");
    $stmt->execute([':token' => $token]);
    $reset = $stmt->fetch();

    if (!$reset) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid or already used reset link. Please request a new one.']);
        exit();
    }

    // ---- Check expiry ----
    if (strtotime($reset['expires_at']) < time()) {
        // Clean up expired token
        $del = $pdo->prepare("DELETE FROM password_resets WHERE token = :token");
        $del->execute([':token' => $token]);

        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'This reset link has expired. Please request a new one.']);
        exit();
    }

    $email = $reset['email'];

    // ---- Get the admin record ----
    $adminStmt = $pdo->prepare("SELECT id FROM admins WHERE email = :email AND status = 'active' LIMIT 1");
    $adminStmt->execute([':email' => $email]);
    $admin = $adminStmt->fetch();

    if (!$admin) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Admin account not found or inactive.']);
        exit();
    }

    // ---- Hash and update password ----
    $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

    $update = $pdo->prepare("UPDATE admins SET password = :password, updated_at = NOW() WHERE id = :id");
    $update->execute([':password' => $hashedPassword, ':id' => $admin['id']]);

    // ---- Delete the used token ----
    $del = $pdo->prepare("DELETE FROM password_resets WHERE token = :token");
    $del->execute([':token' => $token]);

    // ---- Log the activity ----
    $log = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:id, :action, :ip)");
    $log->execute([
        ':id'     => $admin['id'],
        ':action' => 'Password successfully reset via email link',
        ':ip'     => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN',
    ]);

    echo json_encode([
        'status'  => 'success',
        'message' => 'Password has been reset successfully. You can now log in with your new password.',
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'A server error occurred. Please try again.']);
}
?>
