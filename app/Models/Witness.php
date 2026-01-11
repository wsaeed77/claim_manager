<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Witness extends Model
{
    protected $table = 'witness';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'witness_name',
        'witness_address',
        'witness_phone',
        'witness_email',
        'witness_statement',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }
}
