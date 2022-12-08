<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Author extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'author';
    protected $fillable = [
        'author_name',
        'author_bio',
    ];

    public function book()
    {
        return $this->hasMany(Book::class);
    }

    public function scopeSearch($query, $request)
    {
        $query->when($request->has('search'), function ($query) use ($request) {
            $query->where(DB::raw('lower(author_name)'), 'like', '%' . strtolower($request->input('search')) . '%')
                ->orWhere(DB::raw('lower(author_bio)'), 'like', '%' . strtolower($request->input('search')) . '%');
        });
    }
}
