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
        'witness_title',
        'witness_id',
        'witness_fname',
        'witness_lname',
        'witness_add',
        'witness_city',
        'witness_country',
        'witness_postcode',
        'witness_hometel',
        'witness_officetel',
        'witness_op',
        'witness_opd',
        'witness_type',
        'witness_vehreg',
        'witness_make',
        'witness_model',
        'witness_insco',
        'witness_policno',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }
}
