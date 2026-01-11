<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->date('note_date')->nullable();
            $table->string('note_time', 255)->nullable();
            $table->string('dealt_by', 255)->nullable();
            $table->string('importance', 255)->nullable();
            $table->string('method', 255)->nullable();
            $table->string('with', 255)->nullable();
            $table->string('name', 255)->nullable();
            $table->text('details')->nullable();
            $table->string('attachment', 255)->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
