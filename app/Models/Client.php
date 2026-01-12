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

    // Report Methods
    public static function report($search)
    {
        $query = self::reportQuery($search);
        return $query->get();
    }

    public static function reportCount($search)
    {
        $query = self::reportQuery($search);
        return $query->count();
    }

    public static function reportQuery($search)
    {
        $query = self::query()
            ->leftJoin('repairs as rep', 'rep.client_id', '=', 'clients.id')
            ->leftJoin('hire as hire', 'hire.client_id', '=', 'clients.id')
            ->leftJoin('inspections as inspect', 'inspect.client_id', '=', 'clients.id')
            ->leftJoin('repairs as repair', 'repair.client_id', '=', 'clients.id')
            ->leftJoin('solicitors as sol', 'sol.client_id', '=', 'clients.id')
            ->leftJoin('accidents as acc', 'acc.client_id', '=', 'clients.id')
            ->leftJoin('tp_insurances as tpI', 'tpI.client_id', '=', 'clients.id')
            ->leftJoin('pimd as pi', 'pi.client_id', '=', 'clients.id')
            ->leftJoin('agents as agent', 'agent.client_id', '=', 'clients.id')
            ->leftJoin('hire_pcn as hirepcn', 'hirepcn.client_id', '=', 'clients.id')
            ->leftJoin('vehicles as vehicle', 'vehicle.client_id', '=', 'clients.id')
            ->leftJoin('insurances as insurance', 'insurance.client_id', '=', 'clients.id')
            ->leftJoin('claims as cl', 'cl.client_id', '=', 'clients.id')
            ->select('clients.*', 
                'cl.claim_sdate', 'cl.claim_status', 'cl.claim_type', 'cl.claim_category', 'cl.case_advisor',
                'sol.solicitors_name', 'sol.solicitors_reference', 'sol.solicitors_invstatus', 
                'sol.solicitors_dateaccepted', 'sol.solicitors_invsdate', 'sol.solicitors_invpdate', 
                'sol.solicitors_fhandler', 'sol.solicitors_dhandler', 'sol.solicitors_ate_cstatus',
                'agent.agent_name',
                'vehicle.vehicle_reg',
                'hire.hire_provider', 'hire.hire_sdate', 'hire.hire_edate',
                'repair.repair_repair', 'repair.repair_status', 'repair.repair_din', 'repair.repair_dauthor',
                'inspect.inspect_status', 'inspect.inspect_eng', 'inspect.inspect_inst', 
                'inspect.inspect_insptd', 'inspect.inspect_rrec', 'inspect.inspect_rsent',
                'tpI.vdamage_liability', 'tpI.tpi_tpin',
                'pi.pimd_exp', 'pi.pimd_venue', 'pi.pimd_dad', 'pi.pimd_dat', 'pi.pimd_status', 'pi.pimd_drr',
                'acc.accident_date',
                'insurance.insurance_name'
            );

        if (isset($search['period']) && $search['period'] == 'period') {
            $startDate = date('Y-m-d', strtotime($search['start_date'] ?? '1970-01-01'));
            $endDate = date('Y-m-d', strtotime($search['end_date'] ?? '2099-12-31'));
            $query = $query
                ->where('cl.claim_sdate', '>=', $startDate)
                ->where('cl.claim_sdate', '<=', $endDate);
        }

        if (isset($search['claim_type']) && !isset($search['allClaimType'])) {
            if (count($search['claim_type']) > 0) {
                $query = $query->where(function ($q) use ($search) {
                    foreach ($search['claim_type'] as $claim) {
                        $q->orWhere('cl.claim_type', 'like', '%' . $claim . '%');
                    }
                    return $q;
                });
            }
        }

        if (isset($search['case_status']) && !isset($search['allCaseStatus'])) {
            if (count($search['case_status']) > 0) {
                $query = $query->where(function ($q) use ($search) {
                    foreach ($search['case_status'] as $status) {
                        $q->orWhere('cl.claim_status', 'like', '%' . $status . '%');
                    }
                    return $q;
                });
            }
        }

        if (isset($search['select']) && isset($search['group_by']) && $search['select'] != 'all') {
            if ($search['group_by'] == 'solicitor') {
                $query = $query->where('sol.solicitors_name', $search['select']);
            } elseif ($search['group_by'] == 'agent') {
                $query = $query->where('agent.agent_name', $search['select']);
            } elseif ($search['group_by'] == 'insurer') {
                $query = $query->where('insurance.insurance_name', $search['select']);
            } elseif ($search['group_by'] == 'hire-company') {
                $query = $query->where('hire.hire_provider', $search['select']);
            } elseif ($search['group_by'] == 'repairer') {
                $query = $query->where('repair.repair_repair', $search['select']);
            } elseif ($search['group_by'] == 'claim-adviser') {
                $query = $query->where('cl.case_advisor', $search['select']);
            }
        }

        $orderBy = 'clients.case_no';
        if (isset($search['order_by']) && $search['order_by'] == 'case_date') {
            $orderBy = 'cl.claim_sdate';
        }

        $query = $query->orderBy($orderBy, 'DESC')
            ->distinct();

        return $query;
    }

    public static function partner($id)
    {
        if (empty($id)) {
            return '';
        }
        $partner = Partner::find($id);
        return $partner ? $partner->name : '';
    }

    public function latestNotes()
    {
        return $this->notes()->orderBy('id', 'DESC')->first();
    }
}
