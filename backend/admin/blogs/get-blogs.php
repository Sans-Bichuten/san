<?php
// ============================================================
// Bichuten Admin — List Blogs
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

try {
    $query = "SELECT b.id, b.title, b.slug, b.status, b.published_at, b.created_at, b.author, c.name as category_name, b.featured_image
              FROM blogs b
              LEFT JOIN blog_categories c ON b.category_id = c.id
              ORDER BY b.created_at DESC";

    $stmt  = $pdo->query($query);
    $blogs = $stmt->fetchAll();

    echo json_encode([
        'status' => 'success',
        'blogs'  => $blogs
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch blogs.']);
}
?>
