<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('storages', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('storage_provided', 255)->nullable();
            $table->string('storage_company', 255)->nullable();
            $table->date('storage_indate')->nullable();
            $table->date('storage_outdate')->nullable();
            $table->string('storage_rate', 255)->nullable();
            $table->date('storage_dsentinv')->nullable();
            $table->date('storage_dpaidinv')->nullable();
            $table->string('storage_chqrec', 255)->nullable();
            $table->text('storage_location')->nullable();
            $table->string('storage_rate_one', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('storages');
    }
};
