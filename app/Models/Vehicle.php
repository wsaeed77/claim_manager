<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $table = 'vehicles';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'vehicle_reg',
        'vehicle_make',
        'vehicle_model',
        'vehicle_bodytype',
        'vehicle_colour',
        'vehicle_fueltype',
        'vehicle_regdate',
        'vehicle_transmission',
        'vehicle_engine',
        'vehicle_egroup',
        'vehicle_mileage',
        'vehicle_mvalue',
        'vehicle_occupants',
        'vehicle_damage',
        'vehicle_pco',
        'vehicle_taxi',
        'vehicle_condition',
    ];

    protected $casts = [
        'vehicle_regdate' => 'date',
    ];
}
