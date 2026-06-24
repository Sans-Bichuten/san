<?php
// ============================================================
// Bichuten Admin — List Media Files
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

$uploadDir = realpath(__DIR__ . '/../../uploads');
$files     = [];

if ($uploadDir && is_dir($uploadDir)) {
    $allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'svg'];
    $items      = scandir($uploadDir);

    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        $filePath = $uploadDir . DIRECTORY_SEPARATOR . $item;
        if (!is_file($filePath)) continue;
        $ext = strtolower(pathinfo($item, PATHINFO_EXTENSION));
        if (!in_array($ext, $allowedExt)) continue;

        $files[] = [
            'name'     => $item,
            'url'      => '/bichuten_backend/uploads/' . $item,
            'size'     => filesize($filePath),
            'type'     => mime_content_type($filePath),
            'modified' => date('Y-m-d H:i:s', filemtime($filePath)),
        ];
    }
    // Sort by modified desc
    usort($files, fn($a, $b) => strcmp($b['modified'], $a['modified']));
}

echo json_encode(['status' => 'success', 'files' => $files]);
?>
