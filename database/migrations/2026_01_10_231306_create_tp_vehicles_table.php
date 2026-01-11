<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tp_vehicles', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('tpv_reg', 255)->nullable();
            $table->string('tpv_make', 255)->nullable();
            $table->string('tpv_model', 255)->nullable();
            $table->string('tpv_btype', 255)->nullable();
            $table->string('tpv_color', 255)->nullable();
            $table->string('tpv_ftype', 255)->nullable();
            $table->date('tpv_regdate')->nullable();
            $table->string('tpv_nooccu', 255)->nullable();
            $table->text('tpv_damage')->nullable();
            $table->text('tpv_details')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tp_vehicles');
    }
};
