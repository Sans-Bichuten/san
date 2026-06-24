<?php
// ============================================================
// Bichuten Public — Get Single Published Case Study
// ============================================================

require_once __DIR__ . '/../admin/db.php';

$slug = isset($_GET['slug']) ? $_GET['slug'] : '';

if (empty($slug)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Slug is required.']);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT * FROM case_studies WHERE slug = :slug AND status = 'Published'");
    $stmt->execute([':slug' => $slug]);
    $caseStudy = $stmt->fetch();

    if ($caseStudy) {
        $metricsStmt = $pdo->prepare("SELECT metric_name, metric_value FROM case_study_metrics WHERE case_study_id = :id ORDER BY created_at ASC");
        $metricsStmt->execute([':id' => $caseStudy['id']]);
        $caseStudy['metrics'] = $metricsStmt->fetchAll();

        echo json_encode(['status' => 'success', 'caseStudy' => $caseStudy]);
    } else {
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Case study not found.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch case study.']);
}
?>
