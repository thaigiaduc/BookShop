<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Category extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'category';
    protected $fillable = [
        'category_name',
        'category_desc',
    ];

    public function book()
    {
        return $this->hasMany(Book::class);
    }

    public function scopeSearch($query, $request)
    {
        $query->when($request->has('search'), function ($query) use ($request) {
            $query->where(DB::raw('lower(category_name)'), 'like', '%' . strtolower($request->input('search')) . '%')
                ->orWhere(DB::raw('lower(category_desc)'), 'like', '%' . strtolower($request->input('search')) . '%');
        });
    }
}
