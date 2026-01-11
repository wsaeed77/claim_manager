<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('buses', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->text('bus_id')->nullable();
            $table->text('bus_desc')->nullable();
            $table->text('bus_vdesc')->nullable();
            $table->text('bus_appox')->nullable();
            $table->text('bus_whyno')->nullable();
            $table->index('client_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('buses');
    }
};
