<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'book';
    protected $fillable = [
        'category_id',
        'author_id',
        'publisher_id',
        'book_title',
        'book_summary',
        'quantity',
        'book_price',
        'book_cover_photo',
    ];

    public static function getFinalPrice($listing){
        return $listing->selectraw('case
        when ( discount.discount_price isnull ) then book.book_price
        else discount.discount_price 
        end as finalprice
        ');
    }
    public static function getFinalPriceByBook($id){
        $listing=Book::where('book.id',$id)
                      ->leftjoin('discount','book.id','=','discount.book_id')
                      ->groupBy('book.id','discount.discount_price');
        $listing=Book::getFinalPrice($listing);
        $res = $listing->get();
        return $res[0]->finalprice;
    }

    public function author(){
        return $this->belongsTo(Author::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function publisher(){
        return $this->belongsTo(Publisher::class);
    }

    public function discount()
    {
        return $this->hasMany(Discount::class);
    }

    public function review()
    {
        return $this->hasMany(Review::class);
    }

    public function scopeSearch($query, $request)
    {
        $query->when($request->has('search'), function ($query) use ($request) {
            $query->where(DB::raw('lower(book_title)'), 'like', '%' . strtolower($request->input('search')) . '%')
                ->orWhere(DB::raw('lower(book_summary)'), 'like', '%' . strtolower($request->input('search')) . '%')
                ->orWhere(DB::raw('lower(author_name)'), 'like', '%' . strtolower($request->input('search')) . '%')
                ->orWhere(DB::raw('lower(category_name)'), 'like', '%' . strtolower($request->input('search')) . '%')
                ->orWhere(DB::raw('lower(publisher_name)'), 'like', '%' . strtolower($request->input('search')) . '%')
                ->orWhere(DB::raw('book_price'), 'like', '%' . strtolower($request->input('search')) . '%')
                ;
        });
    }
}
