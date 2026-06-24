<?php
// ============================================================
// Bichuten Admin — Create Admin User
// ============================================================

require_once __DIR__ . '/../db.php';
requireSuperAdmin(); // Only super_admin can create new admins

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['name']) || empty($input['email']) || empty($input['password'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Name, email, and password are required.']);
    exit();
}

if (strlen($input['password']) < 12) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Password must be at least 12 characters long.']);
    exit();
}

try {
    $hashedPassword = password_hash($input['password'], PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO admins (name, email, password, role) VALUES (:name, :email, :password, :role)");
    $stmt->execute([':name' => $input['name'], ':email' => $input['email'], ':password' => $hashedPassword, ':role' => $input['role'] ?? 'admin']);

    // Log activity
    $log = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:aid, :action, :ip)");
    $log->execute([':aid' => $_SESSION['admin_id'], ':action' => 'Created admin: ' . truncateForLog($input['name']), ':ip' => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN']);

    echo json_encode(['status' => 'success', 'message' => 'Admin created.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getCode() == 23000 ? 'Email already exists.' : 'Failed to create admin.']);
}
?>
