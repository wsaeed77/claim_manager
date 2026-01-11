<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('file_handlers', function (Blueprint $table) {
            $table->id('filehandler_id');
            $table->string('name', 255)->nullable();
            $table->string('email_address', 255)->nullable();
            $table->string('contactno', 255)->nullable();
            $table->integer('solicitor_id')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('file_handlers');
    }
};
