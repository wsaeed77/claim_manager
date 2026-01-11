<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pimd', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('pimd_md', 255)->nullable();
            $table->string('pimd_ref', 255)->nullable();
            $table->string('pimd_exp', 255)->nullable();
            $table->string('pimd_venue', 255)->nullable();
            $table->string('pimd_status', 255)->nullable();
            $table->date('pimd_dins')->nullable();
            $table->date('pimd_dad')->nullable();
            $table->string('pimd_address', 50)->nullable();
            $table->string('pimd_postcode', 50)->nullable();
            $table->string('pimd_city', 50)->nullable();
            $table->string('pimd_country', 50)->nullable();
            $table->string('pimd_dat', 200)->nullable();
            $table->date('pimd_drr')->nullable();
            $table->date('pimd_drs')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pimd');
    }
};
