<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('damages', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('vdamage_ownv', 255)->nullable();
            $table->string('vdamage_owni', 255)->nullable();
            $table->string('vdamage_alterc', 255)->nullable();
            $table->text('vdamage_altercdetails')->nullable();
            $table->string('vdamage_tloss', 255)->nullable();
            $table->string('vdamage_oins', 255)->nullable();
            $table->string('vdamage_oinsd', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('damages');
    }
};
