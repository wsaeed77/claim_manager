<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solicitor extends Model
{
    protected $table = 'solicitors';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'solicitors_name',
        'solicitors_datesent',
        'solicitors_dateaccepted',
        'solicitors_reference',
        'solicitors_fhandler',
        'solicitors_email',
        'solicitors_tel',
        'solicitors_invstatus',
        'solicitors_invsdate',
        'solicitors_invpdate',
        'solicitors_notes',
        'solicitors_providers',
        'solicitors_dstatus',
        'solicitors_dscdate',
        'solicitors_dssate',
        'solicitors_dhandler',
        'solicitors_leico',
        'solicitors_ate_provider',
        'solicitors_ate_cstatus',
    ];

    protected $casts = [
        'solicitors_datesent' => 'date',
        'solicitors_dateaccepted' => 'date',
        'solicitors_invsdate' => 'date',
        'solicitors_invpdate' => 'date',
        'solicitors_dscdate' => 'date',
        'solicitors_dssate' => 'date',
    ];
}
