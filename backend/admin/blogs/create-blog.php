<?php
// ============================================================
// Bichuten Admin — Create Blog
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['title']) || empty($input['slug'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Title and slug are required.']);
    exit();
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        INSERT INTO blogs (
            title, slug, excerpt, content, featured_image, category_id,
            author, read_time, status, meta_title, meta_description,
            keywords, og_image, canonical_url, published_at
        ) VALUES (
            :title, :slug, :excerpt, :content, :featured_image, :category_id,
            :author, :read_time, :status, :meta_title, :meta_description,
            :keywords, :og_image, :canonical_url, :published_at
        )
    ");

    $status       = $input['status'] ?? 'Draft';
    $published_at = ($status === 'Published') ? date('Y-m-d H:i:s') : null;

    $stmt->execute([
        ':title'            => $input['title'],
        ':slug'             => $input['slug'],
        ':excerpt'          => $input['excerpt'] ?? '',
        ':content'          => $input['content'] ?? '',
        ':featured_image'   => $input['featured_image'] ?? null,
        ':category_id'      => !empty($input['category_id']) ? $input['category_id'] : null,
        ':author'           => $input['author'] ?? $_SESSION['admin_name'],
        ':read_time'        => !empty($input['read_time']) ? (int)$input['read_time'] : 5,
        ':status'           => $status,
        ':meta_title'       => $input['meta_title'] ?? '',
        ':meta_description' => $input['meta_description'] ?? '',
        ':keywords'         => $input['keywords'] ?? '',
        ':og_image'         => $input['og_image'] ?? null,
        ':canonical_url'    => $input['canonical_url'] ?? '',
        ':published_at'     => $published_at
    ]);

    $blogId = $pdo->lastInsertId();

    // Log activity
    $logStmt = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:admin_id, :action, :ip)");
    $logStmt->execute([
        ':admin_id' => $_SESSION['admin_id'],
        ':action'   => 'Created blog: ' . truncateForLog($input['title']),
        ':ip'       => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN'
    ]);

    $pdo->commit();

    echo json_encode([
        'status'  => 'success',
        'message' => 'Blog created successfully.',
        'blog_id' => $blogId
    ]);
} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    if ($e->getCode() == 23000) {
        echo json_encode(['status' => 'error', 'message' => 'Slug already exists.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to create blog.']);
    }
}
?>
