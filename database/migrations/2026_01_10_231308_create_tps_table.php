<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tps', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('tp_title', 255)->nullable();
            $table->string('tp_fname', 255)->nullable();
            $table->string('tp_lname', 255)->nullable();
            $table->text('tp_address')->nullable();
            $table->string('tp_city', 255)->nullable();
            $table->string('tp_country', 255)->nullable();
            $table->string('tp_postcode', 255)->nullable();
            $table->string('tp_hometel', 255)->nullable();
            $table->string('tp_mobiletel', 255)->nullable();
            $table->string('tp_email', 255)->nullable();
            $table->text('tp_desc')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tps');
    }
};
