<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $table = 'payments';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'inv_no',
        'status',
        'indate',
        'desc_de',
        'uto',
        'uto_type',
        'ufor',
        'due_date',
        'amount',
        'vat',
        'total',
        'date_paid',
        'clawed_date',
        'chq_no',
        'type',
    ];

    protected $casts = [
        'indate' => 'date',
        'due_date' => 'date',
        'date_paid' => 'date',
        'clawed_date' => 'date',
        'amount' => 'decimal:2',
        'vat' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }

    public function partner(): BelongsTo
    {
        return $this->belongsTo(Partner::class, 'uto', 'id');
    }

    // Accessors
    public function getIndateAttribute($value)
    {
        if (empty($value) || is_null($value)) {
            return '';
        }
        return date('d-m-Y', strtotime($value));
    }

    public function getDueDateAttribute($value)
    {
        if (empty($value) || is_null($value)) {
            return '';
        }
        return date('d-m-Y', strtotime($value));
    }
}
