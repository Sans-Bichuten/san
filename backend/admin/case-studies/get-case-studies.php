<?php
// ============================================================
// Bichuten Admin — List Case Studies
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

try {
    $stmt        = $pdo->query("SELECT id, title, slug, industry, client_name, status, published_at, created_at, featured_image FROM case_studies ORDER BY created_at DESC");
    $caseStudies = $stmt->fetchAll();

    echo json_encode([
        'status'      => 'success',
        'caseStudies' => $caseStudies
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch case studies.']);
}
?>
