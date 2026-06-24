<?php
// ============================================================
// Bichuten Admin — Update Website Settings
// ============================================================
// Uses ALLOWED_SETTING_KEYS whitelist from config to prevent
// arbitrary key injection.
// ============================================================

require_once __DIR__ . '/../db.php';
requireSuperAdmin(); // Only super_admin can modify site settings

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['settings']) || !is_array($input['settings'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid settings data.']);
    exit();
}

try {
    $stmt = $pdo->prepare("INSERT INTO website_settings (setting_key, setting_value) VALUES (:key, :value) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");

    foreach ($input['settings'] as $key => $value) {
        // Whitelist check — skip unknown keys
        if (!in_array($key, ALLOWED_SETTING_KEYS, true)) {
            continue;
        }
        $stmt->execute([':key' => $key, ':value' => $value]);
    }

    $logStmt = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:id, :action, :ip)");
    $logStmt->execute([':id' => $_SESSION['admin_id'], ':action' => 'Updated website settings', ':ip' => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN']);

    echo json_encode(['status' => 'success', 'message' => 'Settings saved.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to save settings.']);
}
?>
