<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('liability', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('witnlia_why', 255)->nullable();
            $table->string('witnlia_ques', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('liability');
    }
};
