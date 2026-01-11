<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rehab', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('pire_med', 255)->nullable();
            $table->string('pire_meddetails', 255)->nullable();
            $table->text('pire_provider')->nullable();
            $table->string('pire_rehabc', 255)->nullable();
            $table->string('pire_rehabcdd', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rehab');
    }
};
