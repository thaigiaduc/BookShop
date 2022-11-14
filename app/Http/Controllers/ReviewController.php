<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\reviewRepository;
use App\Http\Resources\ReviewResource;
use App\Http\Resources\ReviewCollection;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\FilterReviewsRequest;
use Exception;

class ReviewController extends Controller
{
    protected $reviewRepo;

    public function __construct(reviewRepository $reviewRepo)
    {
        $this->reviewRepo = $reviewRepo;
    }


    function getReviewByBook(Request $request)
    {
        try {
           $reviewRes = $this->reviewRepo->getReviewByBook($request);
            return new ReviewCollection($reviewRes);
        } catch (\Exception $e) {
            return response()->json('Uncessfully', 500);
        }
    }
    function createReview(StoreReviewRequest $request){
        
        try {
            $newReviewRes = $this->reviewRepo->createReview($request);
            return response()->json(new ReviewResource($newReviewRes),201);
        } catch (\Exception $e) {
            return response()->json('Uncessfully', 500);
        }
    }
    public function getRating(FilterReviewsRequest $request){
        $respone = [
            'rating_avg' => $this -> reviewRepo -> getRatingAvg($request -> book_id),
            'count_stars' => $this -> reviewRepo -> getCountStars($request -> book_id)
        ];

        return response()->json($respone, 200);
    }
}
