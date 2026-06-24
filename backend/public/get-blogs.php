<?php
// ============================================================
// Bichuten Public — List Published Blogs
// ============================================================

require_once __DIR__ . '/../admin/db.php';

try {
    $query = "SELECT b.id, b.title, b.slug, b.excerpt, b.published_at, b.author, b.read_time, c.name as category_name, b.featured_image
              FROM blogs b
              LEFT JOIN blog_categories c ON b.category_id = c.id
              WHERE b.status = 'Published'
              ORDER BY b.published_at DESC";

    $stmt  = $pdo->query($query);
    $blogs = $stmt->fetchAll();

    echo json_encode(['status' => 'success', 'blogs' => $blogs]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch blogs.']);
}
?>
