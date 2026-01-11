<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->integer('inv_no')->nullable();
            $table->string('status', 255)->nullable();
            $table->date('indate')->nullable();
            $table->string('desc_de', 255)->nullable();
            $table->integer('uto')->nullable();
            $table->string('uto_type', 255);
            $table->string('ufor', 255)->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->decimal('vat', 10, 2)->nullable();
            $table->decimal('total', 10, 2)->nullable();
            $table->date('date_paid')->nullable();
            $table->date('clawed_date');
            $table->string('chq_no', 255)->nullable();
            $table->string('type');
            $table->date('due_date')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
