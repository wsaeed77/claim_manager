<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('accidents', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->date('accident_date')->nullable();
            $table->string('accident_time', 255)->nullable();
            $table->string('accident_cond', 255)->nullable();
            $table->string('accident_other', 255)->nullable();
            $table->string('accident_rcond', 255)->nullable();
            $table->string('accident_rother', 255)->nullable();
            $table->string('accident_speed', 100)->nullable();
            $table->string('accident_tp', 100)->nullable();
            $table->string('accident_circum', 100)->nullable();
            $table->text('accident_circumd')->nullable();
            $table->text('accident_loca')->nullable();
            $table->string('accident_seatbelt', 255)->nullable();
            $table->string('accident_accbook', 255)->nullable();
            $table->index('client_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('accidents');
    }
};
