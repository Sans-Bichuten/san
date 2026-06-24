<?php
// ============================================================
// Bichuten Admin Panel — Forgot Password API
// ============================================================
// 1. Validates the submitted email
// 2. Generates a secure reset token
// 3. Stores token + expiry in password_resets table
// 4. Sends reset link email via PHP mail()
// ============================================================

require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit();
}

// Rate limiting — max 5 requests per hour per IP
$ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
if (isRateLimited('forgot_pw_' . $ip, 5, 3600)) {
    http_response_code(429);
    echo json_encode(['status' => 'error', 'message' => 'Too many requests. Please try again later.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['email'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Email is required.']);
    exit();
}

$email = trim(strtolower($input['email']));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
    exit();
}

// Generic success response — prevents user enumeration
// (always say "if email exists, link was sent" regardless of outcome)
$genericResponse = [
    'status'  => 'success',
    'message' => 'If an account exists for this email, a password reset link has been sent. Check your inbox (and spam folder).'
];

try {
    // Check if admin account exists
    $stmt = $pdo->prepare("SELECT id, name, email FROM admins WHERE email = :email AND status = 'active' LIMIT 1");
    $stmt->execute([':email' => $email]);
    $admin = $stmt->fetch();

    if (!$admin) {
        // Email not found — return generic response to prevent enumeration
        echo json_encode($genericResponse);
        exit();
    }

    // Delete any existing token for this email (clean up old requests)
    $deleteOld = $pdo->prepare("DELETE FROM password_resets WHERE email = :email");
    $deleteOld->execute([':email' => $email]);

    // Generate secure 64-character hex token
    $token     = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', time() + RESET_TOKEN_EXPIRY);

    // Store token in DB
    $insert = $pdo->prepare("INSERT INTO password_resets (email, token, expires_at) VALUES (:email, :token, :expires_at)");
    $insert->execute([
        ':email'      => $email,
        ':token'      => $token,
        ':expires_at' => $expiresAt,
    ]);

    // Log the activity
    $log = $pdo->prepare("INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (:id, :action, :ip)");
    $log->execute([
        ':id'     => $admin['id'],
        ':action' => 'Password reset requested',
        ':ip'     => $ip,
    ]);

    // Build reset link
    $resetLink = SITE_URL . '/admin/reset-password?token=' . urlencode($token);

    // ---- Send Email ----
    $toName    = $admin['name'];
    $toEmail   = $admin['email'];
    $fromName  = MAIL_FROM_NAME;
    $fromEmail = MAIL_FROM_ADDRESS;
    $expiryMin = RESET_TOKEN_EXPIRY / 60;

    $subject = 'Bichuten Admin — Password Reset Request';

    $htmlBody = "
    <!DOCTYPE html>
    <html>
    <head><meta charset='UTF-8'></head>
    <body style='font-family: Arial, sans-serif; background: #f4f4f4; padding: 30px; margin: 0;'>
      <div style='max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'>
        <div style='background: #0B1220; padding: 30px 40px; text-align: center;'>
          <h1 style='color: #0B79BF; margin: 0; font-size: 22px; letter-spacing: 1px;'>BICHUTEN DATA VAULT</h1>
          <p style='color: #6b7280; margin: 6px 0 0; font-size: 13px;'>Admin Portal</p>
        </div>
        <div style='padding: 40px;'>
          <h2 style='color: #1a1a1a; margin: 0 0 16px; font-size: 18px;'>Password Reset Request</h2>
          <p style='color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 24px;'>
            Hi <strong>{$toName}</strong>,<br><br>
            We received a request to reset the password for your Bichuten Admin account.
            Click the button below to set a new password.
          </p>
          <div style='text-align: center; margin: 32px 0;'>
            <a href='{$resetLink}'
               style='background: #14477B; color: #ffffff; padding: 14px 36px; border-radius: 6px; text-decoration: none; font-size: 15px; font-weight: bold; display: inline-block;'>
              Reset My Password
            </a>
          </div>
          <p style='color: #6b7280; font-size: 13px; line-height: 1.6; margin: 0 0 12px;'>
            Or copy this link into your browser:
          </p>
          <p style='background: #f3f4f6; padding: 12px; border-radius: 4px; word-break: break-all; font-size: 12px; color: #374151; margin: 0 0 24px;'>
            {$resetLink}
          </p>
          <hr style='border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;'>
          <p style='color: #9ca3af; font-size: 12px; margin: 0;'>
            ⚠️ This link expires in <strong>{$expiryMin} minutes</strong>.<br>
            If you did not request a password reset, you can safely ignore this email.
            Your password will not be changed.
          </p>
        </div>
        <div style='background: #f9fafb; padding: 20px 40px; text-align: center; border-top: 1px solid #e5e7eb;'>
          <p style='color: #9ca3af; font-size: 11px; margin: 0;'>
            Bichuten Data Vault &mdash; Nepal's Sovereign Digital Infrastructure<br>
            This is an automated message. Do not reply to this email.
          </p>
        </div>
      </div>
    </body>
    </html>
    ";

    $textBody = "Password Reset Request\n\n"
        . "Hi {$toName},\n\n"
        . "Reset your Bichuten Admin password using this link:\n"
        . "{$resetLink}\n\n"
        . "This link expires in {$expiryMin} minutes.\n\n"
        . "If you did not request this, ignore this email.";

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: {$fromName} <{$fromEmail}>\r\n";
    $headers .= "Reply-To: {$fromEmail}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    $mailSent = mail($toEmail, $subject, $htmlBody, $headers);

    // If mail() fails (e.g. local dev), log the link so you can test it
    if (!$mailSent) {
        error_log("BICHUTEN RESET LINK (mail() failed): {$resetLink}");
    }

    echo json_encode($genericResponse);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'A server error occurred. Please try again.']);
}
?>
