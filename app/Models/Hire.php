<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Hire extends Model
{
    protected $table = 'hire';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'hire_req',
        'hire_alter',
        'hire_ongoing',
        'hire_provider',
        'hire_ref',
        'hire_sdate',
        'hire_edate',
        'hire_reg',
        'hire_make',
        'hire_model',
        'hire_cc',
        'hire_diveh',
        'hire_knr',
        'hire_cd',
        'hire_vehicle_type',
    ];

    protected $casts = [
        'hire_sdate' => 'date',
        'hire_edate' => 'date',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
