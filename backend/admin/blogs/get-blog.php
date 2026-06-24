<?php
// ============================================================
// Bichuten Admin — Get Single Blog
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if (!$id) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Blog ID is required.']);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = :id");
    $stmt->execute([':id' => $id]);
    $blog = $stmt->fetch();

    if ($blog) {
        echo json_encode(['status' => 'success', 'blog' => $blog]);
    } else {
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Blog not found.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch blog.']);
}
?>
