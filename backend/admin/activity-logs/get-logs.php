<?php
require_once __DIR__ . '/../db.php';
requireAuth();
try {
    $stmt = $pdo->query("SELECT l.id, l.action, l.ip_address, l.created_at, a.name as admin_name, a.email as admin_email FROM admin_activity_logs l LEFT JOIN admins a ON l.admin_id = a.id ORDER BY l.created_at DESC LIMIT 200");
    echo json_encode(['status' => 'success', 'logs' => $stmt->fetchAll()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch logs.']);
}
?>
