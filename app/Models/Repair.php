<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Repair extends Model
{
    protected $table = 'repairs';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'repair_repair',
        'repair_status',
        'repair_dauthor',
        'repair_din',
        'repair_dout',
        'repair_sns',
        'repair_amount',
    ];

    protected $casts = [
        'repair_din' => 'date',
        'repair_dout' => 'date',
    ];
}
