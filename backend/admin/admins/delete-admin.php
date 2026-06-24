<?php
// ============================================================
// Bichuten Admin — Delete Admin User
// ============================================================

require_once __DIR__ . '/../db.php';
requireSuperAdmin(); // Only super_admin can delete admin users

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['id'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Admin ID required.']);
    exit();
}

// Prevent self-deletion
if ((int)$input['id'] === (int)$_SESSION['admin_id']) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Cannot delete your own account.']);
    exit();
}

try {
    $pdo->beginTransaction();
    $stmt = $pdo->prepare("DELETE FROM admins WHERE id = :id");
    $stmt->execute([':id' => $input['id']]);
    $log = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:aid, :action, :ip)");
    $log->execute([':aid' => $_SESSION['admin_id'], ':action' => 'Deleted admin #' . (int)$input['id'], ':ip' => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN']);
    $pdo->commit();
    echo json_encode(['status' => 'success', 'message' => 'Admin deleted.']);
} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete admin.']);
}
?>
