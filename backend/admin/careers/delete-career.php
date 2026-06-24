<?php
// ============================================================
// Bichuten Admin Panel - Delete Career API
// Place at: htdocs/bichuten_backend/admin/careers/delete-career.php
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['id'])) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Application ID is required.'
    ]);
    exit();
}

$id = (int)$input['id'];

try {
    // 1. Fetch file path to clean up resume from disk
    $stmt = $pdo->prepare("SELECT resume_path FROM career_applications WHERE id = :id LIMIT 1");
    $stmt->execute([':id' => $id]);
    $row = $stmt->fetch();
    
    if ($row) {
        $resume_file = __DIR__ . '/../../uploads/' . $row['resume_path'];
        if (file_exists($resume_file)) {
            @unlink($resume_file);
        }
    }

    // 2. Delete DB record
    $del = $pdo->prepare("DELETE FROM career_applications WHERE id = :id");
    $del->execute([':id' => $id]);

    // 3. Log activity
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
    $logStmt = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:admin_id, :action, :ip)");
    $logStmt->execute([
        ':admin_id' => $_SESSION['admin_id'],
        ':action'   => "Deleted career application ID: $id",
        ':ip'       => $ip
    ]);

    echo json_encode([
        'status' => 'success',
        'message' => 'Career application deleted successfully.'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to delete career application.'
    ]);
}
?>
