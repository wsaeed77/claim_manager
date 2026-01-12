<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recovery extends Model
{
    protected $table = 'recoveries';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'recovery_provided',
        'recovery_company',
        'recovery_to',
        'recovery_date',
        'recovery_agreed',
        'recovery_invstatus',
        'recovery_dsent',
        'recovery_dpaid',
        'recovery_chk',
    ];

    protected $casts = [
        'recovery_date' => 'date',
        'recovery_dsent' => 'date',
        'recovery_dpaid' => 'date',
    ];
}
