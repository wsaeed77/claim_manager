<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FileHandler extends Model
{
    protected $table = 'file_handlers';
    
    protected $primaryKey = 'filehandler_id';
    
    public $incrementing = true;
    
    public $timestamps = false;

    protected $fillable = [
        'name',
        'email_address',
        'contactno',
        'solicitor_id',
    ];
}
