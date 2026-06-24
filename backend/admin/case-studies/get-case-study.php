<?php
// ============================================================
// Bichuten Admin — Get Single Case Study
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if (!$id) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Case Study ID is required.']);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT * FROM case_studies WHERE id = :id");
    $stmt->execute([':id' => $id]);
    $caseStudy = $stmt->fetch();

    if ($caseStudy) {
        // Fetch associated metrics
        $metricsStmt = $pdo->prepare("SELECT id, metric_name, metric_value FROM case_study_metrics WHERE case_study_id = :id ORDER BY created_at ASC");
        $metricsStmt->execute([':id' => $id]);
        $caseStudy['metrics'] = $metricsStmt->fetchAll();

        echo json_encode(['status' => 'success', 'caseStudy' => $caseStudy]);
    } else {
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Case Study not found.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch case study.']);
}
?>
