<?php
// ============================================================
// Bichuten Public — List Published Case Studies
// ============================================================

require_once __DIR__ . '/../admin/db.php';

try {
    $stmt        = $pdo->query("SELECT id, title, slug, industry, client_name, overview, published_at, featured_image FROM case_studies WHERE status = 'Published' ORDER BY published_at DESC");
    $caseStudies = $stmt->fetchAll();

    echo json_encode(['status' => 'success', 'caseStudies' => $caseStudies]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch case studies.']);
}
?>
