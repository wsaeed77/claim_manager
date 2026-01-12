<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pi extends Model
{
    protected $table = 'pi';
    
    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'pi_injtype',
        'pi_desc',
        'pi_timeoff',
        'pi_stimeoff',
        'pi_daysoff',
        'pi_mattent',
        'pi_medfdate',
        'pi_hosp',
        'pi_hospfdate',
        'pi_overnight',
        'pi_hospdays',
    ];

    protected $casts = [
        'pi_medfdate' => 'date',
        'pi_hospfdate' => 'date',
    ];
}
