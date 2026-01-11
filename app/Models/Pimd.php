<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pimd extends Model
{
    protected $table = 'pimd'; // Explicitly define table name (singular, not pimds)
    public $timestamps = false;

    protected $fillable = [
        'client_id', 'pimd_md', 'pimd_ref', 'pimd_exp', 'pimd_venue', 'pimd_status',
        'pimd_dins', 'pimd_dad', 'pimd_address', 'pimd_postcode', 'pimd_city',
        'pimd_country', 'pimd_dat', 'pimd_drr', 'pimd_drs',
    ];

    protected $casts = [
        'pimd_dins' => 'date',
        'pimd_dad' => 'date',
        'pimd_drr' => 'date',
        'pimd_drs' => 'date',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
