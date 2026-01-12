<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Damage extends Model
{
    protected $table = 'damages';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'vdamage_ownv',
        'vdamage_owni',
        'vdamage_alterc',
        'vdamage_altercdetails',
        'vdamage_tloss',
        'vdamage_oins',
        'vdamage_oinsd',
    ];
}
