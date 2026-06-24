<?php
// ============================================================
// Bichuten Careers Application Form API
// Receives candidate data, performs security checks,
// saves uploaded resume securely, and inserts into DB.
// Place at: htdocs/bichuten_backend/careers_api.php
// ============================================================

require_once __DIR__ . '/admin/db.php';

// --- CORS Headers (restrict to allowed origins from config) ---
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: " . ALLOWED_ORIGINS[0]);
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed. Use POST.'
    ]);
    exit();
}

// --- Read Inputs ---
// Text fields might be sent via standard multipart/form-data because of file upload
$name             = isset($_POST['name'])             ? trim(htmlspecialchars($_POST['name']))             : '';
$email            = isset($_POST['email'])            ? trim(htmlspecialchars($_POST['email']))            : '';
$phone            = isset($_POST['phone'])            ? trim(htmlspecialchars($_POST['phone']))            : '';
$linkedin         = isset($_POST['linkedin'])         ? trim(htmlspecialchars($_POST['linkedin']))         : '';
$address          = isset($_POST['address'])          ? trim(htmlspecialchars($_POST['address']))          : '';
$current_profile  = isset($_POST['current_job_profile']) ? trim(htmlspecialchars($_POST['current_job_profile'])) : '';
$expected_role    = isset($_POST['expected_role'])    ? trim(htmlspecialchars($_POST['expected_role']))    : '';
$education        = isset($_POST['last_education'])   ? trim(htmlspecialchars($_POST['last_education']))   : '';
$experience       = isset($_POST['experience'])       ? trim(htmlspecialchars($_POST['experience']))       : '';
$status           = isset($_POST['employment_status'])? trim(htmlspecialchars($_POST['employment_status'])): '';
$expected_salary  = isset($_POST['expected_salary'])  ? trim(htmlspecialchars($_POST['expected_salary']))  : '';
$notice_period    = isset($_POST['notice_period'])    ? trim(htmlspecialchars($_POST['notice_period']))    : '';
$message          = isset($_POST['message'])          ? trim(htmlspecialchars($_POST['message']))          : '';

// --- Validate Text Fields ---
if (empty($name) || empty($email) || empty($phone) || empty($expected_role) || empty($status)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please fill in all required fields (Name, Email, Phone, Expected Role, Employment Status).'
    ]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide a valid email address.'
    ]);
    exit();
}

// --- Validate Resume File Upload ---
if (!isset($_FILES['resume']) || $_FILES['resume']['error'] !== UPLOAD_ERR_OK) {
    $err_code = isset($_FILES['resume']['error']) ? $_FILES['resume']['error'] : 'missing';
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => "Resume file upload is required. (Code: $err_code)"
    ]);
    exit();
}

$file_tmp   = $_FILES['resume']['tmp_name'];
$file_name  = $_FILES['resume']['name'];
$file_size  = $_FILES['resume']['size'];

// Size limit: 10MB (10 * 1024 * 1024 bytes)
if ($file_size > 10485760) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Resume exceeds the maximum size limit of 10 MB.'
    ]);
    exit();
}

// Check extension
$file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
$allowed_exts = ['pdf', 'doc', 'docx'];
if (!in_array($file_ext, $allowed_exts)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid file extension. Only PDF, DOC, and DOCX files are allowed.'
    ]);
    exit();
}

// Securely check MIME type using fileinfo extension
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$file_mime = finfo_file($finfo, $file_tmp);
finfo_close($finfo);

$allowed_mimes = [
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/octet-stream', // sometimes word files are uploaded under this mime type
];

if (!in_array($file_mime, $allowed_mimes)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid file content. Uploaded file is not a valid PDF or Word document.'
    ]);
    exit();
}

// --- Create Uploads Directory and write secure htaccess if missing ---
$upload_dir = __DIR__ . '/uploads';
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

// Enforce secure settings via .htaccess inside uploads/
$htaccess_path = $upload_dir . '/.htaccess';
if (!file_exists($htaccess_path)) {
    $htaccess_content = "# Secure Uploads Directory\n"
        . "Deny from all\n\n"
        . "# Disable script execution\n"
        . "RemoveHandler .php .phtml .php3 .php4 .php5 .php7 .phps .pl .py .cgi .asp .aspx .shtml\n"
        . "AddType text/plain .php .phtml .php3 .php4 .php5 .php7 .phps .pl .py .cgi .asp .aspx .shtml\n";
    file_put_contents($htaccess_path, $htaccess_content);
}

// --- Hash the filename for storage ---
// Generate a 32-character random string and append .bin extension so the server treats it as binary/non-executable
$unique_filename = bin2hex(random_bytes(16)) . '.bin';
$upload_path = $upload_dir . '/' . $unique_filename;

if (!move_uploaded_file($file_tmp, $upload_path)) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to save the uploaded resume. Please try again.'
    ]);
    exit();
}

// --- Connect to Database (use $pdo from db.php) ---
try {
    // $pdo is already initialized by admin/db.php
    if (!isset($pdo)) {
        throw new Exception('Database not initialized.');
    }
} catch (Exception $e) {
    // Clean up uploaded file if DB connection fails
    if (file_exists($upload_path)) {
        unlink($upload_path);
    }
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed.'
    ]);
    exit();
}

// --- Insert into Database ---
try {
    $stmt = $pdo->prepare("
        INSERT INTO career_applications (
            name, email, phone, linkedin, address, current_job_profile, expected_role, 
            last_education, experience, employment_status, expected_salary, notice_period, 
            message, resume_path, resume_original_name, submitted_at
        ) VALUES (
            :name, :email, :phone, :linkedin, :address, :current_profile, :expected_role, 
            :education, :experience, :status, :expected_salary, :notice_period, 
            :message, :resume_path, :resume_original_name, NOW()
        )
    ");

    $stmt->execute([
        ':name'                 => $name,
        ':email'                => $email,
        ':phone'                => $phone,
        ':linkedin'             => $linkedin,
        ':address'              => $address,
        ':current_profile'      => $current_profile,
        ':expected_role'        => $expected_role,
        ':education'            => $education,
        ':experience'           => $experience,
        ':status'               => $status,
        ':expected_salary'      => $expected_salary,
        ':notice_period'        => $notice_period,
        ':message'              => $message,
        ':resume_path'          => $unique_filename,
        ':resume_original_name' => $file_name,
    ]);

    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Your application has been submitted successfully. Our HR team will review it shortly.'
    ]);

} catch (PDOException $e) {
    // Clean up uploaded file if DB query fails
    if (file_exists($upload_path)) {
        unlink($upload_path);
    }
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to save application. Please try again.'
    ]);
}
?>
