<?php
// ============================================================
// Bichuten Admin — Dashboard Stats
// ============================================================

require_once __DIR__ . '/../db.php';
requireAuth();

try {
    $stats = [];

    $stmt = $pdo->query("SELECT COUNT(*) as count FROM blogs");
    $stats['totalBlogs'] = (int)($stmt->fetch()['count'] ?? 0);

    $stmt = $pdo->query("SELECT COUNT(*) as count FROM case_studies");
    $stats['totalCaseStudies'] = (int)($stmt->fetch()['count'] ?? 0);

    $stmt = $pdo->query("SELECT COUNT(*) as total, SUM(CASE WHEN is_read = 0 THEN 1 ELSE 0 END) as unread FROM contact_submissions");
    $row  = $stmt->fetch();
    $stats['totalLeads']  = (int)($row['total']  ?? 0);
    $stats['unreadLeads'] = (int)($row['unread'] ?? 0);

    $stmt = $pdo->query("SELECT COUNT(*) as total, SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active FROM newsletter_subscribers");
    $row  = $stmt->fetch();
    $stats['newsletterSubscribers'] = (int)($row['total']  ?? 0);
    $stats['activeSubscribers']     = (int)($row['active'] ?? 0);

    $stmt = $pdo->query("SELECT COUNT(*) as count FROM admins WHERE status = 'active'");
    $stats['activeAdmins'] = (int)($stmt->fetch()['count'] ?? 0);

    $logStmt = $pdo->query("
        SELECT a.action, a.ip_address, a.created_at, ad.name as admin_name
        FROM admin_activity_logs a
        JOIN admins ad ON a.admin_id = ad.id
        ORDER BY a.created_at DESC
        LIMIT 10
    ");
    $recentActivity = $logStmt->fetchAll();

    echo json_encode([
        'status'         => 'success',
        'stats'          => $stats,
        'recentActivity' => $recentActivity
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Internal server error.']);
}
?>
