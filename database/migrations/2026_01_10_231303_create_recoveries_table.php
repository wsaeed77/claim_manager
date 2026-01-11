<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recoveries', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('recovery_provided', 255)->nullable();
            $table->string('recovery_company', 255)->nullable();
            $table->string('recovery_to', 255)->nullable();
            $table->date('recovery_date')->nullable();
            $table->string('recovery_agreed', 255)->nullable();
            $table->string('recovery_invstatus', 255)->nullable();
            $table->date('recovery_dsent')->nullable();
            $table->date('recovery_dpaid')->nullable();
            $table->string('recovery_chk', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recoveries');
    }
};
