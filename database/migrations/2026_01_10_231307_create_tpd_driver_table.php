<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tpd_driver', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('tpd_driver', 255)->nullable();
            $table->string('tpd_fname', 255)->nullable();
            $table->string('tpd_lname', 255)->nullable();
            $table->text('tpd_add')->nullable();
            $table->string('tpd_city', 255)->nullable();
            $table->string('tpd_country', 255)->nullable();
            $table->string('tpd_postcode', 255)->nullable();
            $table->string('tpd_hometel', 255)->nullable();
            $table->string('tpd_mobtel', 255)->nullable();
            $table->string('tpd_liability', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tpd_driver');
    }
};
