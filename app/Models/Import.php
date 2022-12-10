<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Import extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'import_bill';
    protected $fillable = [
        'user_id',
        'quantity',
        'price',
        'import_date',
    ];

    public function importDetails()
    {
        return $this->hasMany(ImportDetail::class);
    }
}
