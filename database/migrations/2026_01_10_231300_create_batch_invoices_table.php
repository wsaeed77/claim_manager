<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('batch_invoices', function (Blueprint $table) {
            $table->id('bi_id');
            $table->integer('batch_id');
            $table->integer('invoice_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('batch_invoices');
    }
};
