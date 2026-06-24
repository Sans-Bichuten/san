<?php
// ============================================================
// Bichuten Admin Panel - Secure Download Resume API
// Place at: htdocs/bichuten_backend/admin/careers/download-resume.php
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

if (!isset($_GET['id']) || empty($_GET['id'])) {
    http_response_code(400);
    echo "Invalid request: ID is required.";
    exit();
}

$app_id = (int)$_GET['id'];

try {
    $stmt = $pdo->prepare("SELECT resume_path, resume_original_name FROM career_applications WHERE id = :id LIMIT 1");
    $stmt->execute([':id' => $app_id]);
    $row = $stmt->fetch();

    if (!$row) {
        http_response_code(404);
        echo "Application not found.";
        exit();
    }

    $resume_path = $row['resume_path'];
    $original_name = $row['resume_original_name'];

    // Security check: ensure path is just a filename
    if (basename($resume_path) !== $resume_path) {
        http_response_code(400);
        echo "Invalid file path.";
        exit();
    }

    $full_path = __DIR__ . '/../../uploads/' . $resume_path;

    if (!file_exists($full_path)) {
        http_response_code(404);
        echo "Resume file not found.";
        exit();
    }

    // Stream File
    if (ob_get_level()) {
        ob_end_clean();
    }

    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . basename($original_name) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');
    header('Content-Length: ' . filesize($full_path));
    
    readfile($full_path);
    exit();

} catch (PDOException $e) {
    http_response_code(500);
    echo "Database query error.";
}
?>
