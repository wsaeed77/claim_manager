<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TpVehicle extends Model
{
    protected $table = 'tp_vehicles';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'tpv_reg',
        'tpv_make',
        'tpv_model',
        'tpv_btype',
        'tpv_color',
        'tpv_ftype',
        'tpv_regdate',
        'tpv_nooccu',
        'tpv_damage',
        'tpv_details',
    ];

    protected $casts = [
        'tpv_regdate' => 'date',
    ];
}
