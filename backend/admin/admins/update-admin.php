<?php
// ============================================================
// Bichuten Admin — Update Admin User
// ============================================================

require_once __DIR__ . '/../db.php';
requireSuperAdmin(); // Only super_admin can modify admin users

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['id'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Admin ID required.']);
    exit();
}

try {
    if (!empty($input['password'])) {
        if (strlen($input['password']) < 12) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Password must be at least 12 characters long.']);
            exit();
        }
        $hashedPassword = password_hash($input['password'], PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("UPDATE admins SET name = :name, email = :email, role = :role, status = :status, password = :password WHERE id = :id");
        $stmt->execute([
            ':name'     => $input['name'],
            ':email'    => $input['email'],
            ':role'     => $input['role'] ?? 'admin',
            ':status'   => $input['status'] ?? 'active',
            ':password' => $hashedPassword,
            ':id'       => $input['id']
        ]);
    } else {
        $stmt = $pdo->prepare("UPDATE admins SET name = :name, email = :email, role = :role, status = :status WHERE id = :id");
        $stmt->execute([
            ':name'   => $input['name'],
            ':email'  => $input['email'],
            ':role'   => $input['role'] ?? 'admin',
            ':status' => $input['status'] ?? 'active',
            ':id'     => $input['id']
        ]);
    }
    echo json_encode(['status' => 'success', 'message' => 'Admin updated.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to update admin.']);
}
?>
