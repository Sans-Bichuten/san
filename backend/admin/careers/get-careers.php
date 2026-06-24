<?php
// ============================================================
// Bichuten Admin Panel - Get Careers API
// Place at: htdocs/bichuten_backend/admin/careers/get-careers.php
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

try {
    $stmt = $pdo->query("SELECT * FROM career_applications ORDER BY submitted_at DESC");
    echo json_encode([
        'status' => 'success',
        'careers' => $stmt->fetchAll()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to fetch career applications.'
    ]);
}
?>
