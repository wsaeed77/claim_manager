<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inspections', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('inspect_status', 255)->nullable();
            $table->string('inspect_eng', 255)->nullable();
            $table->string('inspect_engname', 255)->nullable();
            $table->string('inspect_salk', 255)->nullable();
            $table->date('inspect_inst')->nullable();
            $table->date('inspect_insptd')->nullable();
            $table->date('inspect_rrec')->nullable();
            $table->date('inspect_rsent')->nullable();
            $table->date('inspect_setofer')->nullable();
            $table->date('inspect_doffer')->nullable();
            $table->date('inspect_chqrec')->nullable();
            $table->string('inspect_vdamount_received', 50)->nullable();
            $table->string('inspect_vdamount', 50)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inspections');
    }
};
