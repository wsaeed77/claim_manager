<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pi', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('pi_injtype', 255)->nullable();
            $table->text('pi_desc')->nullable();
            $table->string('pi_timeoff', 255)->nullable();
            $table->string('pi_stimeoff', 255)->nullable();
            $table->string('pi_daysoff', 255)->nullable();
            $table->string('pi_mattent', 255)->nullable();
            $table->date('pi_medfdate')->nullable();
            $table->string('pi_hosp', 255)->nullable();
            $table->date('pi_hospfdate');
            $table->string('pi_overnight', 255)->nullable();
            $table->string('pi_hospdays', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pi');
    }
};
