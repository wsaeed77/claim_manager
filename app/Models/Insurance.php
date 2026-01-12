<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Insurance extends Model
{
    protected $table = 'insurances';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'insurance_name',
        'insurance_details',
        'insurance_policyno',
        'insurance_cover',
        'insurance_claimno',
        'insurance_expdate',
        'insurance_insreported',
        'insurance_owner',
        'insurance_notes',
    ];

    protected $casts = [
        'insurance_expdate' => 'date',
        'insurance_insreported' => 'date',
    ];
}
