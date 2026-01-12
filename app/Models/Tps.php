<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tps extends Model
{
    protected $table = 'tps';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'tp_title',
        'tp_fname',
        'tp_lname',
        'tp_address',
        'tp_city',
        'tp_country',
        'tp_postcode',
        'tp_hometel',
        'tp_mobiletel',
        'tp_email',
        'tp_desc',
    ];
}
