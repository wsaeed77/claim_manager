<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pigp', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('pigp_gp', 255)->nullable();
            $table->string('pigp_name', 255)->nullable();
            $table->string('pigp_add', 255)->nullable();
            $table->string('pigp_city', 255)->nullable();
            $table->string('pigp_country', 255)->nullable();
            $table->string('pigp_postcode', 255)->nullable();
            $table->string('pigp_tel', 255)->nullable();
            $table->string('pigp_fax', 255)->nullable();
            $table->string('pigp_ref', 255)->nullable();
            $table->text('pigp_note')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pigp');
    }
};
