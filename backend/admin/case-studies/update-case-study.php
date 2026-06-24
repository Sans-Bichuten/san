<?php
// ============================================================
// Bichuten Admin — Update Case Study
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
        UPDATE case_studies SET
            title = :title, slug = :slug, industry = :industry, client_name = :client_name,
            overview = :overview, challenge = :challenge, solution = :solution, results = :results,
            featured_image = :featured_image, gallery = :gallery, status = :status,
            meta_title = :meta_title, meta_description = :meta_description, keywords = :keywords,
            og_image = :og_image,
            published_at = CASE WHEN :status_check = 'Published' AND published_at IS NULL THEN CURRENT_TIMESTAMP ELSE published_at END
        WHERE id = :id
    ");

    $gallery     = !empty($input['gallery']) ? json_encode($input['gallery']) : null;
    $statusValue = $input['status'] ?? 'Draft';

    $stmt->execute([
        ':id'               => $input['id'],
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
        ':status'           => $statusValue,
        ':status_check'     => $statusValue,
        ':meta_title'       => $input['meta_title'] ?? '',
        ':meta_description' => $input['meta_description'] ?? '',
        ':keywords'         => $input['keywords'] ?? '',
        ':og_image'         => $input['og_image'] ?? null
    ]);

    // Update Metrics: delete all and re-insert
    $deleteMetricsStmt = $pdo->prepare("DELETE FROM case_study_metrics WHERE case_study_id = :id");
    $deleteMetricsStmt->execute([':id' => $input['id']]);

    if (!empty($input['metrics']) && is_array($input['metrics'])) {
        $metricStmt = $pdo->prepare("INSERT INTO case_study_metrics (case_study_id, metric_name, metric_value) VALUES (:id, :name, :val)");
        foreach ($input['metrics'] as $metric) {
            if (!empty($metric['metric_name']) && !empty($metric['metric_value'])) {
                $metricStmt->execute([
                    ':id'   => $input['id'],
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
        ':action'   => 'Updated case study: ' . truncateForLog($input['title']),
        ':ip'       => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN'
    ]);

    $pdo->commit();

    echo json_encode(['status' => 'success', 'message' => 'Case study updated successfully.']);
} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    if ($e->getCode() == 23000) {
        echo json_encode(['status' => 'error', 'message' => 'Slug already exists.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update case study.']);
    }
}
?>
