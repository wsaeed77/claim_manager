<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('witness', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('witness_title', 255)->nullable();
            $table->string('witness_id', 255)->nullable();
            $table->string('witness_fname', 255)->nullable();
            $table->string('witness_lname', 255)->nullable();
            $table->text('witness_add')->nullable();
            $table->string('witness_city', 255)->nullable();
            $table->string('witness_country', 255)->nullable();
            $table->string('witness_postcode', 255)->nullable();
            $table->string('witness_hometel', 255)->nullable();
            $table->string('witness_officetel', 255)->nullable();
            $table->string('witness_op', 255)->nullable();
            $table->string('witness_opd', 255)->nullable();
            $table->string('witness_type', 255)->nullable();
            $table->string('witness_vehreg', 255)->nullable();
            $table->string('witness_make', 255)->nullable();
            $table->string('witness_model', 255)->nullable();
            $table->string('witness_insco', 255)->nullable();
            $table->string('witness_policno', 255)->nullable();
            $table->index('client_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('witness');
    }
};
