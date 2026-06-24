<?php
require_once __DIR__ . '/../db.php';
requireAuth();
$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['id'])) { http_response_code(400); echo json_encode(['status' => 'error', 'message' => 'Lead ID required.']); exit(); }
try {
    $is_read = isset($input['is_read']) ? (int)$input['is_read'] : 1;
    $stmt = $pdo->prepare("UPDATE contact_submissions SET is_read = :is_read WHERE id = :id");
    $stmt->execute([':is_read' => $is_read, ':id' => $input['id']]);
    echo json_encode(['status' => 'success', 'message' => 'Lead updated.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to update lead.']);
}
?>
