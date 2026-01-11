<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->integer('case_no')->nullable();
            $table->integer('case_order')->nullable();
            $table->string('case_ref', 255)->nullable();
            $table->string('client_title', 255)->nullable();
            $table->string('client_type', 255)->nullable();
            $table->string('client_fname', 255)->nullable();
            $table->string('client_lname', 255)->nullable();
            $table->text('client_address')->nullable();
            $table->string('client_city', 255)->nullable();
            $table->string('client_country', 255)->nullable();
            $table->string('client_postcode', 255)->nullable();
            $table->string('client_hometel', 255)->nullable();
            $table->string('client_worktel', 255)->nullable();
            $table->string('client_mobile', 255)->nullable();
            $table->string('client_email', 255)->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable()->useCurrentOnUpdate();
            $table->integer('created_by')->nullable();
            $table->string('client_cooperation', 255)->nullable();
            $table->string('sketch', 255)->nullable();
            $table->index('case_no');
            $table->index('case_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
