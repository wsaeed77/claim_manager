<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('driver_title', 255)->nullable();
            $table->string('driver_fname', 255)->nullable();
            $table->string('driver_lname', 255)->nullable();
            $table->text('driver_address')->nullable();
            $table->string('driver_city', 255)->nullable();
            $table->string('driver_country', 255)->nullable();
            $table->string('driver_postcode', 255)->nullable();
            $table->string('driver_hometel', 255)->nullable();
            $table->string('driver_email', 255)->nullable();
            $table->date('driver_dob')->nullable();
            $table->string('driver_ni', 255)->nullable();
            $table->string('driver_occupation', 255)->nullable();
            $table->string('driver_dlno', 255)->nullable();
            $table->string('driver_dtype', 255)->nullable();
            $table->date('driver_dotp')->nullable();
            $table->date('driver_doiss')->nullable();
            $table->date('driver_doexpires')->nullable();
            $table->string('driver_pol', 255)->nullable();
            $table->string('driver_mobtel', 255)->nullable();
            $table->index('client_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};
