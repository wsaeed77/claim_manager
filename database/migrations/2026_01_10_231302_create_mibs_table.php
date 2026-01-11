<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mibs', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('mib_name', 255)->nullable();
            $table->text('mib_address')->nullable();
            $table->string('mib_city', 255)->nullable();
            $table->string('mib_country', 255)->nullable();
            $table->string('mib_postcode', 255)->nullable();
            $table->string('mib_reg', 255)->nullable();
            $table->string('mib_make', 255)->nullable();
            $table->string('mib_model', 255)->nullable();
            $table->string('mib_colour', 255)->nullable();
            $table->text('mib_dod')->nullable();
            $table->string('mib_aod', 255)->nullable();
            $table->string('mib_sod', 255)->nullable();
            $table->string('mib_how', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mibs');
    }
};
