<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('insurances', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('insurance_name', 255)->nullable();
            $table->text('insurance_details')->nullable();
            $table->string('insurance_policyno', 255)->nullable();
            $table->string('insurance_cover', 255)->nullable();
            $table->string('insurance_claimno', 255)->nullable();
            $table->date('insurance_expdate')->nullable();
            $table->date('insurance_insreported')->nullable();
            $table->text('insurance_owner')->nullable();
            $table->text('insurance_notes')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('insurances');
    }
};
