<?php

namespace App\Repositories;
use Illuminate\Http\Request;
use App\models\Book;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\BookRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;
class BookRepository
{
     public function filterrequest(Request $request)
    {


                $listing = Book::select('book.*')
                ->leftjoin('discount','book.id','=','discount.book_id')
                ->leftjoin('review','book.id','=','review.book_id')
                ->groupBy('book.id','discount.discount_price',
                          'discount.discount_start_date',
                          'discount.discount_end_date')
                ->selectraw('case
                          when ( discount.discount_price isnull ) then book.book_price
                          else discount.discount_price 
                          end as finalprice
                          ')
                ->when($request->has('author'),function($listing) use($request){
                        return $listing->where('author_id', $request->author);
                })
                ->when($request->has('category'),function($listing) use($request){
                        return $listing->where('category_id', $request->category);
                })
                ->when($request->has('publisher'),function($listing) use($request){
                    return $listing->where('publisher_id', $request->publisher);
                })
                ->when($request->has('rating'),function($listing)use($request){
                        return $listing->havingraw('avg(rating_start)>='.$request->rating);      
                });
                switch($request->sort){
                    case 2: $listing->orderByDesc(DB::raw('count(rating_start)'));
                            $listing->orderBy('finalprice','asc');
                            break;
                    case 3: $listing->orderBy('finalprice','asc');
                            break;
                    case 4: $listing->orderBy('finalprice','desc');
                            break;
                    default:$listing->orderByDesc(DB::raw('case
                                        when ( discount.discount_price isnull ) then 0
                                        else book_price - discount.discount_price 
                                        end
                                        '));
                            $listing->orderBy('finalprice','asc');
                            break;
                }
                
        $res = $listing->paginate($request->limit);
           return $res;    
    }
    public function getDetailBook($id){
        return Book::find($id);
    }
    public function getHomeBookOnSale(){
        $listing = Book::select('book.id','book_title','book_cover_photo','book_price','category_id')
        ->leftjoin('discount','book.id','=','discount.book_id')
        ->groupBy('book.id','discount.discount_price',
                  'discount.discount_start_date',
                  'discount.discount_end_date');
        $listing = Book::getFinalPrice($listing);
        $listing->orderByDesc(DB::raw('case
                  when ( discount.discount_price isnull ) then 0
                  else book_price - discount.discount_price 
                  end
                  '))
                  ;
        return $listing->take(10)->get();
    }

    public function getHomeBookByRecommended(){
        $listing = Book::select('book.id','book_title','book_cover_photo','book_price','category_id')
        ->leftjoin('discount','book.id','=','discount.book_id')
        ->leftjoin('review','book.id','=','review.book_id')
        ->groupBy('book.id','discount.discount_price',
                  'discount.discount_start_date',
                  'discount.discount_end_date');
        $listing = Book::getFinalPrice($listing);         
        $listing->orderByDesc(DB::raw('case
        when ( avg(rating_start) isnull ) then 0
        else Round(avg(rating_start),1)
        end
        '))
        ->orderBy('finalprice','asc');
        return $listing->take(8)->get();
    }

    public function getHomeBookByPopular(){
        $listing = Book::select('book.id','book_title','book_cover_photo','book_price','category_id')
        ->leftjoin('discount','book.id','=','discount.book_id')
        ->leftjoin('review','book.id','=','review.book_id')
        ->groupBy('book.id','discount.discount_price',
                  'discount.discount_start_date',
                  'discount.discount_end_date');
        $listing = Book::getFinalPrice($listing);
        $listing->orderByDesc(DB::raw('count(rating_start)'))
        ->orderBy('finalprice','asc');
        return $listing->take(8)->get();
    }

    // admin -----------------------------------------------------------------------------------------------
    public function showBook() 
    {
        $books = Book::select('book.id','category_id','author_id','book_title','book_summary','book_price','book_cover_photo','author_name','category_name','publisher_name')
        ->leftJoin('category','book.category_id','=','category.id')
        ->leftJoin('author','book.author_id','=','author.id')
        ->leftJoin('publisher','book.publisher_id','=','publisher.id')
        ->orderBy('id','asc');
        return $books->get();
    }

    // thêm sách mới
    public function insertBook(BookRequest $request)
    {
        $books = Book::create([
            'category_id' => $request->category_id,
            'author_id' => $request->author_id,
            'book_title' => $request->book_title,
            'book_summary' => $request->book_summary,
            'book_price' => $request->book_price,
            'book_cover_photo' => $request->book_cover_photo
        ]);

        return $books;
    }

    /// cập nhật lại thông tin của sách
    public function updateBook(BookRequest $request, $id)
    {
        $books = Book::where('id',$id)->update([
            'category_id' => $request->category_id,
            'author_id' => $request->author_id,
            'book_title' => $request->book_title,
            'book_summary' => $request->book_summary,
            'book_price' => $request->book_price,
            'book_cover_photo' => $request->book_cover_photo
        ]);

        return $books;
    }

    // xóa sách khỏi database
    public function deleteBook($id)
    {
        $books = Book::where('id',$id)->delete();
        return $books;
    }
}