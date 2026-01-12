<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TpInsurance extends Model
{
    protected $table = 'tp_insurances';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'tpi_insurer',
        'tpi_cdetails',
        'tpi_tpin',
        'tpi_policy',
        'tpi_claim',
        'vdamage_liability',
        'vdamage_insurd',
        'vdamage_ndriver',
        'vdamage_rques',
    ];
}
