<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImportDetail extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'import_detail';
    protected $fillable = [
        'import_bill_id',
        'book_id',
        'quantity',
        'price',
    ];

    public function import()
    {
        return $this->belongsTo(Import::class);
    }
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
