<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Batch extends Model
{
    protected $table = 'batch';
    
    public $timestamps = true;

    protected $fillable = [
        'partner_id',
        'due_date',
        'amount',
        'start_date',
        'end_date',
        'status',
        'created_by',
    ];

    protected $casts = [
        'due_date' => 'date',
        'start_date' => 'date',
        'end_date' => 'date',
        'amount' => 'decimal:2',
        'status' => 'boolean',
    ];

    public function partner(): BelongsTo
    {
        return $this->belongsTo(Partner::class, 'partner_id', 'id');
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(BatchInvoice::class, 'batch_id', 'id');
    }
}
