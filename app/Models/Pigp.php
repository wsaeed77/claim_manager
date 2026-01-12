<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pigp extends Model
{
    protected $table = 'pigp';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'pigp_gp',
        'pigp_name',
        'pigp_add',
        'pigp_city',
        'pigp_country',
        'pigp_postcode',
        'pigp_tel',
        'pigp_fax',
        'pigp_ref',
        'pigp_note',
    ];
}
