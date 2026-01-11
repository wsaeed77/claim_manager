<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    protected $table = 'clients';
    
    public $timestamps = true;
    
    protected $fillable = [
        'case_no',
        'case_order',
        'case_ref',
        'client_title',
        'client_type',
        'client_fname',
        'client_lname',
        'client_address',
        'client_city',
        'client_country',
        'client_postcode',
        'client_hometel',
        'client_worktel',
        'client_mobile',
        'client_email',
        'client_cooperation',
        'sketch',
        'created_by',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships - One to One
    public function accident(): HasOne
    {
        return $this->hasOne(Accident::class, 'client_id', 'id');
    }

    public function agent(): HasOne
    {
        return $this->hasOne(Agent::class, 'client_id', 'id');
    }

    public function bus(): HasOne
    {
        return $this->hasOne(Bus::class, 'client_id', 'id');
    }

    public function claim(): HasOne
    {
        return $this->hasOne(Claim::class, 'client_id', 'id');
    }

    public function damage(): HasOne
    {
        return $this->hasOne(Damage::class, 'client_id', 'id');
    }

    public function driver(): HasOne
    {
        return $this->hasOne(Driver::class, 'client_id', 'id');
    }

    public function employer(): HasOne
    {
        return $this->hasOne(Employer::class, 'client_id', 'id');
    }

    public function hire(): HasOne
    {
        return $this->hasOne(Hire::class, 'client_id', 'id');
    }

    public function hireHd(): HasOne
    {
        return $this->hasOne(HireHd::class, 'client_id', 'id');
    }

    public function hireMileage(): HasOne
    {
        return $this->hasOne(HireMileage::class, 'client_id', 'id');
    }

    public function hirePcn(): HasOne
    {
        return $this->hasOne(HirePcn::class, 'client_id', 'id');
    }

    public function inspection(): HasOne
    {
        return $this->hasOne(Inspection::class, 'client_id', 'id');
    }

    public function insurance(): HasOne
    {
        return $this->hasOne(Insurance::class, 'client_id', 'id');
    }

    public function liability(): HasOne
    {
        return $this->hasOne(Liability::class, 'client_id', 'id');
    }

    public function mib(): HasOne
    {
        return $this->hasOne(Mib::class, 'client_id', 'id');
    }

    public function pi(): HasOne
    {
        return $this->hasOne(Pi::class, 'client_id', 'id');
    }

    public function pidetails(): HasOne
    {
        return $this->hasOne(PolicyDetail::class, 'client_id', 'id');
    }

    public function pigp(): HasOne
    {
        return $this->hasOne(Pigp::class, 'client_id', 'id');
    }

    public function pihospitals(): HasOne
    {
        return $this->hasOne(PiHospital::class, 'client_id', 'id');
    }

    public function pimd(): HasOne
    {
        return $this->hasOne(Pimd::class, 'client_id', 'id');
    }

    public function recovery(): HasOne
    {
        return $this->hasOne(Recovery::class, 'client_id', 'id');
    }

    public function rehab(): HasOne
    {
        return $this->hasOne(Rehab::class, 'client_id', 'id');
    }

    public function vehicle(): HasOne
    {
        return $this->hasOne(Vehicle::class, 'client_id', 'id');
    }

    public function tpVehicle(): HasOne
    {
        return $this->hasOne(TpVehicle::class, 'client_id', 'id');
    }

    public function tps(): HasOne
    {
        return $this->hasOne(Tps::class, 'client_id', 'id');
    }

    public function tpInsurance(): HasOne
    {
        return $this->hasOne(TpInsurance::class, 'client_id', 'id');
    }

    public function tpdDriver(): HasOne
    {
        return $this->hasOne(TpdDriver::class, 'client_id', 'id');
    }

    public function storage(): HasOne
    {
        return $this->hasOne(Storage::class, 'client_id', 'id');
    }

    public function solicitor(): HasOne
    {
        return $this->hasOne(Solicitor::class, 'client_id', 'id');
    }

    public function repair(): HasOne
    {
        return $this->hasOne(Repair::class, 'client_id', 'id');
    }

    // Relationships - One to Many
    public function notes(): HasMany
    {
        return $this->hasMany(Note::class, 'client_id', 'id')->orderBy('id', 'DESC');
    }

    public function latestNote(): HasMany
    {
        return $this->hasMany(Note::class, 'client_id', 'id')->orderBy('id', 'DESC')->limit(1);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'client_id', 'id');
    }

    public function witnesses(): HasMany
    {
        return $this->hasMany(Witness::class, 'client_id', 'id');
    }

    // Helper Methods
    public static function getNextCaseNo()
    {
        return self::max('case_no') + 1;
    }

    public static function getNextCaseOrder()
    {
        return self::max('case_order') + 1;
    }

    public function getAllCaseOrderUnderCaseNo()
    {
        return self::where('case_no', $this->case_no)->get();
    }

    public function getFormatDate($date)
    {
        if (empty($date) || is_null($date)) {
            return '';
        }
        return date('d-m-Y', strtotime($date));
    }
}
