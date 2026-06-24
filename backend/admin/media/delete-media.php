<?php
// ============================================================
// Bichuten Admin — Delete Media File
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['filename'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Filename required.']);
    exit();
}

// Security: no path traversal
$filename  = basename($input['filename']);
$uploadDir = realpath(__DIR__ . '/../../uploads');
$filePath  = $uploadDir . DIRECTORY_SEPARATOR . $filename;

if (!file_exists($filePath)) {
    http_response_code(404);
    echo json_encode(['status' => 'error', 'message' => 'File not found.']);
    exit();
}

if (unlink($filePath)) {
    echo json_encode(['status' => 'success', 'message' => 'File deleted.']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete file.']);
}
?>
