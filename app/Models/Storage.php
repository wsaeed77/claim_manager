<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Storage extends Model
{
    protected $table = 'storages';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'storage_provided',
        'storage_company',
        'storage_location',
        'storage_indate',
        'storage_outdate',
        'storage_rate_one',
        'storage_dsentinv',
        'storage_dpaidinv',
        'storage_rate',
        'storage_chqrec',
    ];

    protected $casts = [
        'storage_indate' => 'date',
        'storage_outdate' => 'date',
        'storage_dsentinv' => 'date',
        'storage_dpaidinv' => 'date',
    ];
}
