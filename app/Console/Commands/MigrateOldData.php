<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use PDO;
use Exception;

class MigrateOldData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:old-data 
                            {--old-db=claim_manager : Old database name}
                            {--new-db=claim_manager_v2 : New database name}
                            {--host=127.0.0.1 : Database host}
                            {--username=root : Database username}
                            {--password=root : Database password}
                            {--port=3306 : Database port}
                            {--truncate : Truncate tables before migrating}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate data from old claim_manager database to new database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $oldDatabase = $this->option('old-db');
        $newDatabase = $this->option('new-db');
        $host = $this->option('host');
        $username = $this->option('username');
        $password = $this->option('password');
        $port = $this->option('port');
        $truncate = $this->option('truncate');

        $this->info("Starting data migration from {$oldDatabase} to {$newDatabase}...");
        $this->newLine();

        try {
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

            $this->info("Found " . count($tables) . " tables to migrate");
            $this->newLine();

            $totalRecords = 0;
            $successCount = 0;
            $errorCount = 0;
            $bar = $this->output->createProgressBar(count($tables));
            $bar->start();

            foreach ($tables as $table) {
                try {
                    // Skip migrations table
                    if ($table === 'migrations') {
                        $bar->advance();
                        continue;
                    }

                    // Check if table exists in new database
                    $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?");
                    $checkStmt->execute([$newDatabase, $table]);
                    $exists = $checkStmt->fetchColumn() > 0;

                    if (!$exists) {
                        $bar->advance();
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
                        $bar->advance();
                        continue;
                    }

                    // Count records in old table
                    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM `{$oldDatabase}`.`{$table}`");
                    $countStmt->execute();
                    $recordCount = $countStmt->fetchColumn();

                    if ($recordCount == 0) {
                        $bar->advance();
                        continue;
                    }

                    // Disable foreign key checks
                    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0");
                    
                    // Clear existing data in new table if truncate option is set
                    if ($truncate) {
                        $pdo->exec("TRUNCATE TABLE `{$newDatabase}`.`{$table}`");
                    }

                    // Get column nullability info
                    $nullabilityStmt = $pdo->prepare("SELECT COLUMN_NAME, IS_NULLABLE FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME IN ('" . implode("', '", $commonColumns) . "')");
                    $nullabilityStmt->execute([$newDatabase, $table]);
                    $nullabilityInfo = [];
                    while ($row = $nullabilityStmt->fetch(PDO::FETCH_ASSOC)) {
                        $nullabilityInfo[$row['COLUMN_NAME']] = $row['IS_NULLABLE'] === 'YES';
                    }
                    
                    // Get data from old table
                    $columnsList = '`' . implode('`, `', $commonColumns) . '`';
                    $selectStmt = $pdo->prepare("SELECT {$columnsList} FROM `{$oldDatabase}`.`{$table}`");
                    $selectStmt->execute();
                    $rows = $selectStmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    // Clean invalid dates (0000-00-00)
                    foreach ($rows as &$row) {
                        foreach ($row as $key => &$value) {
                            if (is_string($value) && (strpos($value, '0000-00-00') !== false)) {
                                // If column is nullable, use NULL, otherwise use default date
                                if (isset($nullabilityInfo[$key]) && $nullabilityInfo[$key]) {
                                    $value = null;
                                } else {
                                    // Use a default date for non-nullable columns
                                    if (strlen($value) > 10) {
                                        $value = '1970-01-01 00:00:00';
                                    } else {
                                        $value = '1970-01-01';
                                    }
                                }
                            }
                        }
                    }
                    unset($row, $value);

                    if (empty($rows)) {
                        $bar->advance();
                        continue;
                    }

                    // Prepare insert statement
                    $placeholders = '(' . str_repeat('?,', count($commonColumns) - 1) . '?)';
                    $insertSql = "INSERT INTO `{$newDatabase}`.`{$table}` ({$columnsList}) VALUES {$placeholders}";
                    $insertStmt = $pdo->prepare($insertSql);

                    // Insert data in batches
                    $pdo->beginTransaction();
                    try {
                        foreach ($rows as $row) {
                            $values = array_values(array_intersect_key($row, array_flip($commonColumns)));
                            $insertStmt->execute($values);
                        }
                        $pdo->commit();
                        $successCount++;
                        $totalRecords += count($rows);
                    } catch (Exception $e) {
                        $pdo->rollBack();
                        $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");
                        throw $e;
                    }
                    
                    // Re-enable foreign key checks
                    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");

                } catch (Exception $e) {
                    $errorCount++;
                    $this->newLine();
                    $this->error("Error migrating {$table}: " . $e->getMessage());
                }
                
                $bar->advance();
            }

            $bar->finish();
            $this->newLine(2);

            $this->info("=== Migration Summary ===");
            $this->table(
                ['Metric', 'Count'],
                [
                    ['Total tables processed', count($tables)],
                    ['Successfully migrated', $successCount],
                    ['Errors', $errorCount],
                    ['Total records migrated', $totalRecords],
                ]
            );

            $this->info("Migration completed!");

        } catch (Exception $e) {
            $this->error("Fatal error: " . $e->getMessage());
            return Command::FAILURE;
        }

        return Command::SUCCESS;
    }
}
