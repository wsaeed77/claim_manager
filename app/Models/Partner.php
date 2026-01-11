<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Partner extends Model
{
    protected $table = 'partners';
    
    public $timestamps = true;

    protected $fillable = [
        'name',
        'partner_type',
        'email',
        'reference',
        'address',
        'partner_city',
        'partner_county',
        'phone_number',
        'partner_postcode',
        'mobile_number',
        'fax',
        'prefix',
        'website',
        'comp_reg_no',
        'vat_reg_no',
        'bank_name',
        'acc_name',
        'short_code',
        'acc_no',
        'attach_logo',
        'minor_pay_rate',
        'taxi_pay_rate',
        'prestige_pay_rate',
        'moj_register',
        'moj_crm_no',
        'pay_rate',
    ];

    public function agents(): HasMany
    {
        return $this->hasMany(Agent::class, 'agent_name', 'id');
    }
}
