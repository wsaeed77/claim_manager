<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hire_mileage', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('hiremg_out', 255)->nullable();
            $table->string('hiremg_in', 255)->nullable();
            $table->string('hiremg_driven', 255)->nullable();
            $table->string('hiremg_lease', 255)->nullable();
            $table->string('hiremg_insur', 255)->nullable();
            $table->string('hiremg_other', 255)->nullable();
            $table->string('hiremg_deposite', 255)->nullable();
            $table->string('hiremg_rn', 255)->nullable();
            $table->string('hiremg_td', 255)->nullable();
            $table->string('hiremg_amt', 255)->nullable();
            $table->date('hiremg_dr')->nullable();
            $table->string('hiremg_pm', 255)->nullable();
            $table->string('hiremg_penaltypva', 255)->nullable();
            $table->string('hiremg_penaltyp', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hire_mileage');
    }
};
