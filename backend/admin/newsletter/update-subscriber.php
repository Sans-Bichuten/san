<?php
require_once __DIR__ . '/../db.php';
requireAuth();
$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['id'])) { http_response_code(400); echo json_encode(['status' => 'error', 'message' => 'Subscriber ID required.']); exit(); }
try {
    $stmt = $pdo->prepare("UPDATE newsletter_subscribers SET is_active = :is_active WHERE id = :id");
    $stmt->execute([':is_active' => isset($input['is_active']) ? (int)$input['is_active'] : 1, ':id' => $input['id']]);
    echo json_encode(['status' => 'success', 'message' => 'Subscriber updated.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to update subscriber.']);
}
?>
