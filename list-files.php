<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$dataDirectory = __DIR__ . DIRECTORY_SEPARATOR . 'DATA FILE';
if (!is_dir($dataDirectory)) {
    http_response_code(500);
    echo json_encode(['error' => 'Data directory not found']);
    exit;
}

$files = array_values(array_filter(
    scandir($dataDirectory) ?: [],
    static fn(string $file): bool => is_file($dataDirectory . DIRECTORY_SEPARATOR . $file)
        && strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'txt'
));

natcasesort($files);
echo json_encode(array_values($files), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
