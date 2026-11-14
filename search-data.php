<?php
declare(strict_types=1);

header('Content-Type: application/x-ndjson; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('X-Accel-Buffering: no');
set_time_limit(0);

while (ob_get_level() > 0) {
    ob_end_flush();
}

function sendRecord(array $record, bool $flushNow = false): void
{
    echo json_encode(
        $record,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE
    ) . "\n";
    if ($flushNow) flush();
}

$query = trim((string)($_GET['q'] ?? ''));
if ($query === '') {
    http_response_code(400);
    sendRecord(['type' => 'error', 'message' => 'Search query is empty'], true);
    exit;
}

$directory = __DIR__ . DIRECTORY_SEPARATOR . 'DATA FILE';
$files = array_map(
    static fn(string $file): array => [
        'path' => $directory . DIRECTORY_SEPARATOR . $file,
        'name' => $file,
        'size' => (int)filesize($directory . DIRECTORY_SEPARATOR . $file)
    ],
    array_values(array_filter(
        scandir($directory) ?: [],
        static fn(string $file): bool => is_file($directory . DIRECTORY_SEPARATOR . $file)
            && strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'txt'
    ))
);

$totalBytes = array_sum(array_map(
    static fn(array $file): int => $file['size'],
    $files
));
$processedBytes = 0;
$lastReportedBytes = 0;
foreach ($files as $file) {
    $handle = fopen($file['path'], 'rb');
    if ($handle === false) continue;

    while (($line = fgets($handle)) !== false) {
        $lineBytes = strlen($line);
        $processedBytes += $lineBytes;

        if (stripos($line, $query) !== false) {
            sendRecord(['type' => 'match', 'line' => rtrim($line, "\r\n")]);
        }

        if ($processedBytes - $lastReportedBytes >= 1048576) {
            $percent = $totalBytes > 0 ? (int)floor(($processedBytes / $totalBytes) * 100) : 100;
            sendRecord(['type' => 'progress', 'percent' => min($percent, 99), 'file' => $file['name']], true);
            $lastReportedBytes = $processedBytes;
        }
    }
    fclose($handle);
}

sendRecord(['type' => 'progress', 'percent' => 100, 'file' => 'Complete'], true);
