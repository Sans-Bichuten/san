<?php
require_once __DIR__ . '/../db.php';
requireAuth();
$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['id'])) { http_response_code(400); echo json_encode(['status' => 'error', 'message' => 'Subscriber ID required.']); exit(); }
try {
    $pdo->beginTransaction();
    $stmt = $pdo->prepare("DELETE FROM newsletter_subscribers WHERE id = :id");
    $stmt->execute([':id' => $input['id']]);
    $log = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:aid, :action, :ip)");
    $log->execute([':aid' => $_SESSION['admin_id'], ':action' => 'Deleted subscriber #' . (int)$input['id'], ':ip' => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN']);
    $pdo->commit();
    echo json_encode(['status' => 'success', 'message' => 'Subscriber deleted.']);
} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete subscriber.']);
}
?>
