<?php
// ============================================================
// Bichuten Admin — Delete Blog
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
    echo json_encode(['status' => 'error', 'message' => 'Blog ID is required.']);
    exit();
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("SELECT title FROM blogs WHERE id = :id");
    $stmt->execute([':id' => $input['id']]);
    $blog = $stmt->fetch();

    if (!$blog) {
        $pdo->rollBack();
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Blog not found.']);
        exit();
    }

    $deleteStmt = $pdo->prepare("DELETE FROM blogs WHERE id = :id");
    $deleteStmt->execute([':id' => $input['id']]);

    // Log activity
    $logStmt = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:admin_id, :action, :ip)");
    $logStmt->execute([
        ':admin_id' => $_SESSION['admin_id'],
        ':action'   => 'Deleted blog: ' . truncateForLog($blog['title']),
        ':ip'       => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN'
    ]);

    $pdo->commit();

    echo json_encode([
        'status'  => 'success',
        'message' => 'Blog deleted successfully.'
    ]);
} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete blog.']);
}
?>
