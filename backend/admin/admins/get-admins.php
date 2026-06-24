<?php
require_once __DIR__ . '/../db.php';
requireAuth();
try {
    $stmt = $pdo->query("SELECT id, name, email, role, status, created_at FROM admins ORDER BY created_at DESC");
    echo json_encode(['status' => 'success', 'admins' => $stmt->fetchAll()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch admins.']);
}
?>
