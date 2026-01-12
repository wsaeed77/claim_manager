<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TpdDriver extends Model
{
    protected $table = 'tpd_driver';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'tpd_driver',
        'tpd_fname',
        'tpd_lname',
        'tpd_add',
        'tpd_city',
        'tpd_country',
        'tpd_postcode',
        'tpd_hometel',
        'tpd_mobtel',
        'tpd_liability',
    ];
}
