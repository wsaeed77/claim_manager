<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Agent extends Model
{
    protected $table = 'agents';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'agent_name',
        'agent_tel',
        'agent_reference',
        'broker_name',
        'broker_reference',
        'host_co',
        'claim_negotiator',
        'account_manager',
        'campaign',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }

    public function partner(): BelongsTo
    {
        return $this->belongsTo(Partner::class, 'agent_name', 'id');
    }
}
