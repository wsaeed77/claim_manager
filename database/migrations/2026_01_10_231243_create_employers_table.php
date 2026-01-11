<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employers', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('employer_company', 255)->nullable();
            $table->string('employer_address', 255)->nullable();
            $table->string('employer_city', 255)->nullable();
            $table->string('employer_country', 255)->nullable();
            $table->string('employer_postcode', 255)->nullable();
            $table->string('employer_tel', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employers');
    }
};
