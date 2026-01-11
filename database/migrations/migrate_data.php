<?php

/**
 * Data Migration Script
 * 
 * This script migrates data from the old claim_manager database to the new claim_manager_v2 database
 * 
 * Usage: php database/migrations/migrate_data.php
 */

require __DIR__ . '/../../vendor/autoload.php';

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;

// Bootstrap Laravel
$app = require_once __DIR__ . '/../../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Database configuration
$oldDatabase = 'claim_manager';  // Update this if different
$newDatabase = 'claim_manager_v2';

try {
    echo "Starting data migration from {$oldDatabase} to {$newDatabase}...\n\n";

    // Get PDO connection
    $host = Config::get('database.connections.mysql.host', '127.0.0.1');
    $username = Config::get('database.connections.mysql.username', 'root');
    $password = Config::get('database.connections.mysql.password', 'root');
    $port = Config::get('database.connections.mysql.port', 3306);

    // Create PDO connection
    $pdo = new PDO(
        "mysql:host={$host};port={$port};charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    // Get all tables from old database
    $stmt = $pdo->prepare("SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? ORDER BY TABLE_NAME");
    $stmt->execute([$oldDatabase]);
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

    echo "Found " . count($tables) . " tables to migrate\n\n";

    $totalRecords = 0;
    $successCount = 0;
    $errorCount = 0;

    foreach ($tables as $table) {
        try {
            // Skip migrations table
            if ($table === 'migrations') {
                echo "Skipping {$table}...\n";
                continue;
            }

            echo "Migrating {$table}... ";

            // Check if table exists in new database
            $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?");
            $checkStmt->execute([$newDatabase, $table]);
            $exists = $checkStmt->fetchColumn() > 0;

            if (!$exists) {
                echo "Table does not exist in new database, skipping...\n";
                continue;
            }

            // Get column names from both tables
            $oldColumnsStmt = $pdo->prepare("SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? ORDER BY ORDINAL_POSITION");
            $oldColumnsStmt->execute([$oldDatabase, $table]);
            $oldColumns = $oldColumnsStmt->fetchAll(PDO::FETCH_COLUMN);

            $newColumnsStmt = $pdo->prepare("SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? ORDER BY ORDINAL_POSITION");
            $newColumnsStmt->execute([$newDatabase, $table]);
            $newColumns = $newColumnsStmt->fetchAll(PDO::FETCH_COLUMN);

            // Get common columns
            $commonColumns = array_intersect($oldColumns, $newColumns);

            if (empty($commonColumns)) {
                echo "No common columns found, skipping...\n";
                continue;
            }

            // Count records in old table
            $countStmt = $pdo->prepare("SELECT COUNT(*) FROM `{$oldDatabase}`.`{$table}`");
            $countStmt->execute();
            $recordCount = $countStmt->fetchColumn();

            if ($recordCount == 0) {
                echo "No records to migrate\n";
                continue;
            }

            // Clear existing data in new table (optional - comment out if you want to append)
            $pdo->exec("TRUNCATE TABLE `{$newDatabase}`.`{$table}`");

            // Get data from old table
            $columnsList = '`' . implode('`, `', $commonColumns) . '`';
            $selectStmt = $pdo->prepare("SELECT {$columnsList} FROM `{$oldDatabase}`.`{$table}`");
            $selectStmt->execute();
            $rows = $selectStmt->fetchAll();

            if (empty($rows)) {
                echo "No data to migrate\n";
                continue;
            }

            // Prepare insert statement
            $placeholders = '(' . str_repeat('?,', count($commonColumns) - 1) . '?)';
            $insertSql = "INSERT INTO `{$newDatabase}`.`{$table}` ({$columnsList}) VALUES {$placeholders}";
            $insertStmt = $pdo->prepare($insertSql);

            // Insert data in batches
            $batchSize = 100;
            $inserted = 0;

            $pdo->beginTransaction();
            try {
                foreach ($rows as $row) {
                    $values = array_values(array_intersect_key($row, array_flip($commonColumns)));
                    $insertStmt->execute($values);
                    $inserted++;
                }
                $pdo->commit();
                $successCount++;
                $totalRecords += $inserted;
                echo "✓ Migrated {$inserted} records\n";
            } catch (Exception $e) {
                $pdo->rollBack();
                throw $e;
            }

        } catch (Exception $e) {
            $errorCount++;
            echo "✗ Error: " . $e->getMessage() . "\n";
        }
    }

    echo "\n=== Migration Summary ===\n";
    echo "Total tables processed: " . count($tables) . "\n";
    echo "Successfully migrated: {$successCount}\n";
    echo "Errors: {$errorCount}\n";
    echo "Total records migrated: {$totalRecords}\n";
    echo "\nMigration completed!\n";

} catch (Exception $e) {
    echo "Fatal error: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
    exit(1);
}
