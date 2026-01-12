<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rehab extends Model
{
    protected $table = 'rehab';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'pire_med',
        'pire_meddetails',
        'pire_provider',
        'pire_rehabc',
        'pire_rehabcdd',
    ];
}
