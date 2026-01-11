<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('solicitors', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->nullable();
            $table->string('solicitors_name', 255)->nullable();
            $table->date('solicitors_datesent')->nullable();
            $table->date('solicitors_dateaccepted')->nullable();
            $table->string('solicitors_reference', 255)->nullable();
            $table->string('solicitors_fhandler', 255)->nullable();
            $table->string('solicitors_email', 255)->nullable();
            $table->string('solicitors_tel', 255)->nullable();
            $table->string('solicitors_invstatus', 255)->nullable();
            $table->date('solicitors_invsdate')->nullable();
            $table->date('solicitors_invpdate')->nullable();
            $table->string('solicitors_notes', 255)->nullable();
            $table->text('solicitors_providers')->nullable();
            $table->string('solicitors_dstatus', 255)->nullable();
            $table->date('solicitors_dscdate')->nullable();
            $table->date('solicitors_dssate')->nullable();
            $table->string('solicitors_dhandler', 255)->nullable();
            $table->string('solicitors_leico', 255)->nullable();
            $table->string('solicitors_ate_provider', 255)->nullable();
            $table->string('solicitors_ate_cstatus', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('solicitors');
    }
};
