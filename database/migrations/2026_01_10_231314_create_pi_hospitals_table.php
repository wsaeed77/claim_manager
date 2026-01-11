<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pi_hospitals', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('pihos_hosp', 255)->nullable();
            $table->string('pihos_name', 255)->nullable();
            $table->string('pihos_add', 255)->nullable();
            $table->string('pihos_city', 255)->nullable();
            $table->string('pihos_country', 255)->nullable();
            $table->string('pihos_postcode', 255)->nullable();
            $table->string('pihos_tel', 255)->nullable();
            $table->string('pihos_fax', 255)->nullable();
            $table->string('pihos_ref', 255)->nullable();
            $table->string('pihos_note', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pi_hospitals');
    }
};
