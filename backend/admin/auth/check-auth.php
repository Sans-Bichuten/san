<?php
// ============================================================
// Bichuten Admin Panel — Check Auth API
// ============================================================

require_once __DIR__ . '/../db.php';

if (isset($_SESSION['admin_id'])) {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    echo json_encode([
        'status'          => 'success',
        'isAuthenticated' => true,
        'csrfToken'       => $_SESSION['csrf_token'],
        'admin'           => [
            'id'    => $_SESSION['admin_id'],
            'name'  => $_SESSION['admin_name'],
            'email' => $_SESSION['admin_email'],
            'role'  => $_SESSION['admin_role']
        ]
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        'status'          => 'error',
        'isAuthenticated' => false,
        'message'         => 'Not authenticated.'
    ]);
}
?>
