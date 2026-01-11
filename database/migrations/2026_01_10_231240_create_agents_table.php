<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('agents', function (Blueprint $table) {
            $table->id();
            $table->string('client_id', 11)->nullable();
            $table->string('agent_name', 255)->nullable();
            $table->string('agent_tel', 255)->nullable();
            $table->string('agent_reference', 255)->nullable();
            $table->string('broker_name', 255)->nullable();
            $table->string('broker_reference', 255)->nullable();
            $table->string('host_co', 255)->nullable();
            $table->string('claim_negotiator', 255)->nullable();
            $table->string('account_manager', 255)->nullable();
            $table->string('campaign', 255)->nullable();
            $table->index('client_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('agents');
    }
};
