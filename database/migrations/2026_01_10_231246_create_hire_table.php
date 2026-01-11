<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hire', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id');
            $table->string('hire_req', 255)->nullable();
            $table->string('hire_alter', 255)->nullable();
            $table->string('hire_ongoing', 255)->nullable();
            $table->string('hire_provider', 255)->nullable();
            $table->string('hire_ref', 255)->nullable();
            $table->date('hire_sdate')->nullable();
            $table->date('hire_edate')->nullable();
            $table->string('hire_reg', 255)->nullable();
            $table->string('hire_make', 255)->nullable();
            $table->string('hire_model', 255)->nullable();
            $table->string('hire_cc', 255)->nullable();
            $table->string('hire_diveh', 255)->nullable();
            $table->string('hire_knr', 255)->nullable();
            $table->string('hire_cd', 255)->nullable();
            $table->string('hire_vehicle_type', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hire');
    }
};
