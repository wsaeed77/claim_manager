<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('repairs', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('repair_repair', 255)->nullable();
            $table->string('repair_dauthor', 255)->nullable();
            $table->date('repair_din')->nullable();
            $table->date('repair_dout')->nullable();
            $table->string('repair_sns', 255)->nullable();
            $table->string('repair_amount', 255)->nullable();
            $table->string('repair_status', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('repairs');
    }
};
