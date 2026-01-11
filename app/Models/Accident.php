<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Accident extends Model
{
    protected $table = 'accidents';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'accident_date',
        'accident_time',
        'accident_cond',
        'accident_other',
        'accident_rcond',
        'accident_rother',
        'accident_speed',
        'accident_tp',
        'accident_circum',
        'accident_circumd',
        'accident_loca',
        'accident_seatbelt',
        'accident_accbook',
    ];

    protected $casts = [
        'accident_date' => 'date',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }
}
