<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BatchInvoice extends Model
{
    protected $table = 'batch_invoices';
    
    public $timestamps = false;

    protected $fillable = [
        'batch_id',
        'invoice_id',
    ];

    public function batch(): BelongsTo
    {
        return $this->belongsTo(Batch::class, 'batch_id', 'id');
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class, 'invoice_id', 'id');
    }
}
