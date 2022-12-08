<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Publisher extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'publisher';
    protected $fillable = [
        'publisher_name',
        'publisher_desc',
    ];

    public function book()
    {
        return $this->hasMany(Book::class);
    }

    public function scopeSearch($query, $request)
    {
        $query->when($request->has('search'), function ($query) use ($request) {
            $query->where(DB::raw('lower(publisher_name)'), 'like', '%' . strtolower($request->input('search')) . '%')
                ->orWhere(DB::raw('lower(publisher_desc)'), 'like', '%' . strtolower($request->input('search')) . '%');
        });
    }
}
