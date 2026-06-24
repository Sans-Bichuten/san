<?php
require_once __DIR__ . '/../db.php';
requireAuth();
try {
    $stmt = $pdo->query("SELECT * FROM contact_submissions ORDER BY submitted_at DESC");
    echo json_encode(['status' => 'success', 'leads' => $stmt->fetchAll()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch leads.']);
}
?>
