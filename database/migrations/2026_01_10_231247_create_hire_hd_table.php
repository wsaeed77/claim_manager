<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hire_hd', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('hirehd_agreement', 255)->nullable();
            $table->string('hirehd_status', 255)->nullable();
            $table->string('hirehd_rate', 255)->nullable();
            $table->date('hirehd_ddate')->nullable();
            $table->date('hirehd_cdate')->nullable();
            $table->date('hirehd_edate')->nullable();
            $table->date('hirehd_colection')->nullable();
            $table->string('hirehd_hirety', 255)->nullable();
            $table->string('hirehd_sd', 255)->nullable();
            $table->text('hirehd_note')->nullable();
            $table->string('hirehd_dby', 255)->nullable();
            $table->string('hirehd_reto', 255)->nullable();
            $table->string('hirehd_addedby', 255)->nullable();
            $table->string('hirehd_collectedby', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hire_hd');
    }
};
