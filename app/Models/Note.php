<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    protected $table = 'notes';
    
    public $timestamps = true;

    protected $fillable = [
        'client_id',
        'note_date',
        'note_time',
        'dealt_by',
        'importance',
        'method',
        'with',
        'name',
        'details',
        'attachment',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }
}
