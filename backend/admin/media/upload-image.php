<?php
// ============================================================
// Bichuten Admin — Upload Image
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No image uploaded or upload error.']);
    exit();
}

$file = $_FILES['image'];

// ---- File Size Limit ----
if ($file['size'] > MAX_UPLOAD_SIZE) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'File too large. Maximum size is 5 MB.']);
    exit();
}

$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// Validate real MIME type (not just extension)
$finfo    = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.']);
    exit();
}

// Generate unique filename
$mimeExtensionMap = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/gif'  => 'gif',
    'image/webp' => 'webp'
];
$extension = $mimeExtensionMap[$mimeType] ?? 'jpg';
$filename  = uniqid('img_') . '_' . time() . '.' . $extension;
$uploadDir = realpath(__DIR__ . '/../../uploads');

// Ensure directory exists
if (!$uploadDir) {
    $uploadDir = __DIR__ . '/../../uploads';
    mkdir($uploadDir, 0755, true);
    $uploadDir = realpath($uploadDir);
}

$targetPath = $uploadDir . DIRECTORY_SEPARATOR . $filename;

if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    $publicPath = '/bichuten_backend/uploads/' . $filename;
    echo json_encode([
        'status'  => 'success',
        'message' => 'Image uploaded successfully.',
        'url'     => $publicPath
    ]);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to save image.']);
}
?>
