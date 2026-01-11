<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tp_insurances', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('tpi_insurer', 255)->nullable();
            $table->string('tpi_cdetails', 255)->nullable();
            $table->text('tpi_tpin')->nullable();
            $table->string('tpi_policy', 255)->nullable();
            $table->string('tpi_claim', 255)->nullable();
            $table->string('vdamage_liability', 255)->nullable();
            $table->string('vdamage_insurd', 255)->nullable();
            $table->string('vdamage_ndriver', 255)->nullable();
            $table->string('vdamage_rques', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tp_insurances');
    }
};
