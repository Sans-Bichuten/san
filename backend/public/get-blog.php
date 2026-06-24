<?php
// ============================================================
// Bichuten Public — Get Single Published Blog
// ============================================================

require_once __DIR__ . '/../admin/db.php';

$slug = isset($_GET['slug']) ? $_GET['slug'] : '';

if (empty($slug)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Slug is required.']);
    exit();
}

try {
    $stmt = $pdo->prepare("
        SELECT b.*, c.name as category_name
        FROM blogs b
        LEFT JOIN blog_categories c ON b.category_id = c.id
        WHERE b.slug = :slug AND b.status = 'Published'
    ");
    $stmt->execute([':slug' => $slug]);
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
