<?php
// ============================================================
// Bichuten Admin Panel — Logout API
// ============================================================

require_once __DIR__ . '/../db.php';

if (isset($_SESSION['admin_id'])) {
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
    try {
        $logStmt = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:admin_id, 'Logout successful', :ip)");
        $logStmt->execute([':admin_id' => $_SESSION['admin_id'], ':ip' => $ip_address]);
    } catch (Exception $e) {
        // Ignore logging errors on logout
    }

    // Destroy the session
    $_SESSION = array();
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
}

echo json_encode(['status' => 'success', 'message' => 'Logged out successfully.']);
?>
