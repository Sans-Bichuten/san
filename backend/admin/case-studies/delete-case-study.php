<?php
// ============================================================
// Bichuten Admin — Delete Case Study
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['id'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Case Study ID is required.']);
    exit();
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("SELECT title FROM case_studies WHERE id = :id");
    $stmt->execute([':id' => $input['id']]);
    $caseStudy = $stmt->fetch();

    if (!$caseStudy) {
        $pdo->rollBack();
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Case study not found.']);
        exit();
    }

    $deleteStmt = $pdo->prepare("DELETE FROM case_studies WHERE id = :id");
    $deleteStmt->execute([':id' => $input['id']]);

    // Log activity
    $logStmt = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:admin_id, :action, :ip)");
    $logStmt->execute([
        ':admin_id' => $_SESSION['admin_id'],
        ':action'   => 'Deleted case study: ' . truncateForLog($caseStudy['title']),
        ':ip'       => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN'
    ]);

    $pdo->commit();

    echo json_encode(['status' => 'success', 'message' => 'Case study deleted successfully.']);
} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete case study.']);
}
?>
