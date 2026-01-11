<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Claim extends Model
{
    protected $table = 'claims';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'claim_dob',
        'claim_occupation',
        'claim_ni',
        'claim_rni',
        'claim_sdate',
        'claim_ldate',
        'claim_status',
        'claim_dreason',
        'case_advisor',
        'claim_category',
        'claim_type',
        'claim_odetails',
        'claim_excess',
    ];

    protected $casts = [
        'claim_dob' => 'date',
        'claim_sdate' => 'date',
        'claim_ldate' => 'date',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }

    // Accessors
    public function getClaimDobAttribute($value)
    {
        if (empty($value) || is_null($value)) {
            return '';
        }
        return date('d-m-Y', strtotime($value));
    }

    public function getCaseAdvisorAttribute($value)
    {
        if (empty($value)) {
            return auth()->user()->name ?? '';
        }
        return $value;
    }

    public function getClaimSdateAttribute($value)
    {
        if (empty($value)) {
            return date('d-m-Y');
        }
        return date('d-m-Y', strtotime($value));
    }

    public function getClaimLdateAttribute($value)
    {
        if (empty($value)) {
            return '';
        }
        return date('d-m-Y', strtotime($value));
    }
}
