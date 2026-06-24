<?php
require_once __DIR__ . '/../db.php';
requireAuth();
try {
    $stmt = $pdo->query("SELECT setting_key, setting_value FROM website_settings");
    $rows = $stmt->fetchAll();
    $settings = [];
    foreach ($rows as $row) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }
    echo json_encode(['status' => 'success', 'settings' => $settings]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch settings.']);
}
?>
