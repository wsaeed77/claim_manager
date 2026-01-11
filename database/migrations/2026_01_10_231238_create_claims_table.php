<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('claims', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->date('claim_dob')->nullable();
            $table->string('claim_occupation', 255)->nullable();
            $table->string('claim_ni', 255)->nullable();
            $table->string('claim_rni', 255)->nullable();
            $table->date('claim_sdate')->nullable();
            $table->date('claim_ldate')->nullable();
            $table->string('claim_status', 255)->nullable();
            $table->string('claim_dreason', 255)->nullable();
            $table->string('case_advisor', 255)->nullable();
            $table->string('claim_category', 255)->nullable();
            $table->string('claim_type', 255)->nullable();
            $table->string('claim_odetails', 255)->nullable();
            $table->string('claim_excess', 255)->nullable();
            $table->string('claim_isdriver', 255)->nullable();
            $table->string('claim_posdriver', 255)->nullable();
            $table->string('claim_owner', 255)->nullable();
            $table->string('claim_fault', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('claims');
    }
};
