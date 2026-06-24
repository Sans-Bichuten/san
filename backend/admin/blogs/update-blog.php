<?php
// ============================================================
// Bichuten Admin — Update Blog
// ============================================================
// FIX: Resolved duplicate :status named parameter that crashed PDO.
//      Now uses :status_check as the second parameter.
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['id']) || empty($input['title']) || empty($input['slug'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'ID, title and slug are required.']);
    exit();
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        UPDATE blogs SET
            title = :title, slug = :slug, excerpt = :excerpt, content = :content,
            featured_image = :featured_image, category_id = :category_id,
            author = :author, read_time = :read_time, status = :status,
            meta_title = :meta_title, meta_description = :meta_description,
            keywords = :keywords, og_image = :og_image, canonical_url = :canonical_url,
            published_at = CASE WHEN :status_check = 'Published' AND published_at IS NULL THEN CURRENT_TIMESTAMP ELSE published_at END
        WHERE id = :id
    ");

    $statusValue = $input['status'] ?? 'Draft';

    $stmt->execute([
        ':id'               => $input['id'],
        ':title'            => $input['title'],
        ':slug'             => $input['slug'],
        ':excerpt'          => $input['excerpt'] ?? '',
        ':content'          => $input['content'] ?? '',
        ':featured_image'   => $input['featured_image'] ?? null,
        ':category_id'      => !empty($input['category_id']) ? $input['category_id'] : null,
        ':author'           => $input['author'] ?? $_SESSION['admin_name'],
        ':read_time'        => !empty($input['read_time']) ? (int)$input['read_time'] : 5,
        ':status'           => $statusValue,
        ':status_check'     => $statusValue,
        ':meta_title'       => $input['meta_title'] ?? '',
        ':meta_description' => $input['meta_description'] ?? '',
        ':keywords'         => $input['keywords'] ?? '',
        ':og_image'         => $input['og_image'] ?? null,
        ':canonical_url'    => $input['canonical_url'] ?? ''
    ]);

    // Log activity
    $logStmt = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:admin_id, :action, :ip)");
    $logStmt->execute([
        ':admin_id' => $_SESSION['admin_id'],
        ':action'   => 'Updated blog: ' . truncateForLog($input['title']),
        ':ip'       => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN'
    ]);

    $pdo->commit();

    echo json_encode([
        'status'  => 'success',
        'message' => 'Blog updated successfully.'
    ]);
} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    if ($e->getCode() == 23000) {
        echo json_encode(['status' => 'error', 'message' => 'Slug already exists.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update blog.']);
    }
}
?>
