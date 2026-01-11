<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hire_pcn', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('pcn_status', 200);
            $table->text('pcn_fine')->nullable();
            $table->date('pcn_dp')->nullable();
            $table->date('pcn_ds')->nullable();
            $table->string('pcn_hiretotal', 255)->nullable();
            $table->string('pcn_hirerec', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hire_pcn');
    }
};
