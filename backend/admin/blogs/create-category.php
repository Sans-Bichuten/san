<?php
// ============================================================
// Bichuten Admin — Create Blog Category
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['name'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Category name is required.']);
    exit();
}

$name = trim($input['name']);
$slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name), '-'));

try {
    $stmt = $pdo->prepare("INSERT INTO blog_categories (name, slug) VALUES (:name, :slug)");
    $stmt->execute([':name' => $name, ':slug' => $slug]);

    echo json_encode([
        'status'   => 'success',
        'message'  => 'Category created successfully.',
        'category' => [
            'id'   => $pdo->lastInsertId(),
            'name' => $name,
            'slug' => $slug
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    if ($e->getCode() == 23000) {
        echo json_encode(['status' => 'error', 'message' => 'Category already exists.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to create category.']);
    }
}
?>
