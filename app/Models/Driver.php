<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    protected $table = 'drivers';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'driver_title',
        'driver_fname',
        'driver_lname',
        'driver_address',
        'driver_city',
        'driver_country',
        'driver_postcode',
        'driver_hometel',
        'driver_email',
        'driver_dob',
        'driver_ni',
        'driver_occupation',
        'driver_dlno',
        'driver_dtype',
        'driver_dotp',
        'driver_doiss',
        'driver_doexpires',
        'driver_pol',
        'driver_mobtel',
    ];

    protected $casts = [
        'driver_dob' => 'date',
        'driver_dotp' => 'date',
        'driver_doiss' => 'date',
        'driver_doexpires' => 'date',
    ];
}
