<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('vehicle_reg', 255)->nullable();
            $table->string('vehicle_make', 255)->nullable();
            $table->string('vehicle_model', 255)->nullable();
            $table->string('vehicle_bodytype', 255)->nullable();
            $table->string('vehicle_colour', 255)->nullable();
            $table->string('vehicle_fueltype', 255)->nullable();
            $table->date('vehicle_regdate')->nullable();
            $table->string('vehicle_transmission', 255)->nullable();
            $table->string('vehicle_engine', 255)->nullable();
            $table->string('vehicle_egroup', 255)->nullable();
            $table->string('vehicle_mileage', 255)->nullable();
            $table->string('vehicle_mvalue', 255)->nullable();
            $table->string('vehicle_occupants', 255)->nullable();
            $table->string('vehicle_damage', 255)->nullable();
            $table->string('vehicle_pco', 255)->nullable();
            $table->string('vehicle_taxi', 50)->nullable();
            $table->string('vehicle_condition', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
