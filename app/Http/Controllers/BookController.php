<?php

namespace App\Http\Controllers;

use App\Repositories\bookrepository as bookrepo;
use Illuminate\Http\Request;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\StoreProductRequest;
use Validator;
use App\Http\Resources\DetailResource;

class BookController extends Controller
{
    protected $bookrepo;
    public function __construct(bookrepo $bookrepo)
    {
        $this->bookrepo = $bookrepo;
    }
    public function getBookByID(StoreBookRequest $request){
        $res = $this->bookrepo->getDetailBook($request->id);
        return response()->json(new BookResource($res),200);
    }
    public function indexshop(Request $request){
        $res = $this->bookrepo->filterrequest($request);
        return new BookCollection($res);
    }
    public function showHomeBookOnSale(){
        $res = $this->bookrepo->getHomeBookOnSale();
        return response()->json($res,200);
    }
    public function showHomeBookRecommended(){
        $res = $this->bookrepo->getHomeBookByRecommended();
        return response()->json($res,200);
    }
    public function showHomeBookPopular(){
        $res = $this->bookrepo->getHomeBookByPopular();
        return response()->json($res,200);
    }

    // admin -----------------------------------------------
    public function showBookAdmin()
    {
        $res = $this->bookrepo->showBook();
        return response()->json($res,200);
    }

    public function insertBookAdmin(StoreProductRequest $request)
    {
        try {
            $res = $this->bookrepo->insertBook($request);
            return response()->json($res,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }

    public function getDetailsBookAdmin($id)
    {
        try {
            $res = $this->bookrepo->getDetailBookAdmin($id);
            return response()->json($res,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),500);
        }
    }

    public function updateBookAdmin(StoreProductRequest $request ,$id)
    {
        try {
            $res = $this->bookrepo->updateBook($request,$id);
            return response()->json($res,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),500);
        }
    }
}   
