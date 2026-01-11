<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('policy_details', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('police_reported', 255)->nullable();
            $table->text('police_address')->nullable();
            $table->string('police_offname', 255)->nullable();
            $table->string('police_refnum', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('policy_details');
    }
};
