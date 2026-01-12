<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PiHospital extends Model
{
    protected $table = 'pi_hospitals';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'pihos_hosp',
        'pihos_name',
        'pihos_add',
        'pihos_city',
        'pihos_country',
        'pihos_postcode',
        'pihos_tel',
        'pihos_fax',
        'pihos_ref',
        'pihos_note',
    ];
}
