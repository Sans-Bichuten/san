<?php
// ============================================================
// Bichuten Admin — List Blog Categories
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

try {
    $stmt       = $pdo->query("SELECT * FROM blog_categories ORDER BY name ASC");
    $categories = $stmt->fetchAll();

    echo json_encode([
        'status'     => 'success',
        'categories' => $categories
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch categories.']);
}
?>
