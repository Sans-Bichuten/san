<?php
require_once __DIR__ . '/../db.php';
requireAuth();
try {
    $stmt = $pdo->query("SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC");
    echo json_encode(['status' => 'success', 'subscribers' => $stmt->fetchAll()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch subscribers.']);
}
?>
