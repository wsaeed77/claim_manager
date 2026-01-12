<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inspection extends Model
{
    protected $table = 'inspections';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'inspect_status',
        'inspect_eng',
        'inspect_engname',
        'inspect_salk',
        'inspect_inst',
        'inspect_insptd',
        'inspect_rrec',
        'inspect_rsent',
        'inspect_vdamount',
        'inspect_vdamount_received',
        'inspect_setofer',
        'inspect_doffer',
        'inspect_chqrec',
    ];

    protected $casts = [
        'inspect_inst' => 'date',
        'inspect_insptd' => 'date',
        'inspect_rrec' => 'date',
        'inspect_rsent' => 'date',
        'inspect_setofer' => 'date',
        'inspect_doffer' => 'date',
        'inspect_chqrec' => 'date',
    ];
}
