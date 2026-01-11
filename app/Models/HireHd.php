<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HireHd extends Model
{
    protected $table = 'hire_hd';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        // Add other fillable fields as needed
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
