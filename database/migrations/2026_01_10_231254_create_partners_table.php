<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('name', 191);
            $table->string('email', 191)->nullable();
            $table->string('reference', 191)->nullable();
            $table->string('address', 191)->nullable();
            $table->string('partner_city', 191)->nullable();
            $table->string('partner_county', 191)->nullable();
            $table->string('phone_number', 191)->nullable();
            $table->string('partner_postcode', 191)->nullable();
            $table->string('mobile_number', 191)->nullable();
            $table->string('fax', 200)->nullable();
            $table->string('prefix', 200)->nullable();
            $table->string('website', 200)->nullable();
            $table->string('comp_reg_no', 200)->nullable();
            $table->string('vat_reg_no', 200)->nullable();
            $table->string('bank_name', 255)->nullable();
            $table->string('acc_name', 255)->nullable();
            $table->string('short_code', 255)->nullable();
            $table->string('acc_no', 255)->nullable();
            $table->string('attach_logo', 255)->nullable();
            $table->decimal('minor_pay_rate', 10, 2)->nullable();
            $table->decimal('taxi_pay_rate', 10, 2)->nullable();
            $table->decimal('prestige_pay_rate', 10, 2)->nullable();
            $table->string('moj_register', 200)->nullable();
            $table->string('moj_crm_no', 200)->nullable();
            $table->string('pay_rate', 191)->nullable();
            $table->string('partner_type', 191)->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partners');
    }
};
