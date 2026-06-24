<?php
// ============================================================
// Bichuten Admin — Create Case Study
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
        INSERT INTO case_studies (
            title, slug, industry, client_name, overview, challenge, solution, results,
            featured_image, gallery, status, meta_title, meta_description, keywords, og_image, published_at
        ) VALUES (
            :title, :slug, :industry, :client_name, :overview, :challenge, :solution, :results,
            :featured_image, :gallery, :status, :meta_title, :meta_description, :keywords, :og_image, :published_at
        )
    ");

    $status       = $input['status'] ?? 'Draft';
    $published_at = ($status === 'Published') ? date('Y-m-d H:i:s') : null;
    $gallery      = !empty($input['gallery']) ? json_encode($input['gallery']) : null;

    $stmt->execute([
        ':title'            => $input['title'],
        ':slug'             => $input['slug'],
        ':industry'         => $input['industry'] ?? '',
        ':client_name'      => $input['client_name'] ?? '',
        ':overview'         => $input['overview'] ?? '',
        ':challenge'        => $input['challenge'] ?? '',
        ':solution'         => $input['solution'] ?? '',
        ':results'          => $input['results'] ?? '',
        ':featured_image'   => $input['featured_image'] ?? null,
        ':gallery'          => $gallery,
        ':status'           => $status,
        ':meta_title'       => $input['meta_title'] ?? '',
        ':meta_description' => $input['meta_description'] ?? '',
        ':keywords'         => $input['keywords'] ?? '',
        ':og_image'         => $input['og_image'] ?? null,
        ':published_at'     => $published_at
    ]);

    $caseStudyId = $pdo->lastInsertId();

    // Insert Metrics
    if (!empty($input['metrics']) && is_array($input['metrics'])) {
        $metricStmt = $pdo->prepare("INSERT INTO case_study_metrics (case_study_id, metric_name, metric_value) VALUES (:id, :name, :val)");
        foreach ($input['metrics'] as $metric) {
            if (!empty($metric['metric_name']) && !empty($metric['metric_value'])) {
                $metricStmt->execute([
                    ':id'   => $caseStudyId,
                    ':name' => $metric['metric_name'],
                    ':val'  => $metric['metric_value']
                ]);
            }
        }
    }

    // Log activity
    $logStmt = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:admin_id, :action, :ip)");
    $logStmt->execute([
        ':admin_id' => $_SESSION['admin_id'],
        ':action'   => 'Created case study: ' . truncateForLog($input['title']),
        ':ip'       => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN'
    ]);

    $pdo->commit();

    echo json_encode([
        'status'  => 'success',
        'message' => 'Case study created successfully.',
        'id'      => $caseStudyId
    ]);
} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    if ($e->getCode() == 23000) {
        echo json_encode(['status' => 'error', 'message' => 'Slug already exists.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to create case study.']);
    }
}
?>
