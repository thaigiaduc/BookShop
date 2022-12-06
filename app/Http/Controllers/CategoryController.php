<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\categoryRepository;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
use App\Http\Requests\StoreCategoryRequest;

class CategoryController extends Controller
{
    protected $categoryRepo;

    public function __construct(categoryRepository $categoryRepo)
    {
        $this->categoryRepo = $categoryRepo;
    }

    public function index(){
        try {
            $cateRes = $this->categoryRepo->index();
            return response()->json(new categoryCollection($cateRes),200);
        } catch (\Exception $e) {
            return response()->json('Uncessfully',500);
        }
    }

    //admin ------------------------------------------------------------------------------
    public function getCategoryAdmin()
    {
        try {
            $cate = $this->categoryRepo->showCategory();
            return response()->json($cate,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }

    public function insertCategoryAdmin(StoreCategoryRequest $request)
    {
        try {
            $cate = $this->categoryRepo->insertCategory($request);
            return response()->json($cate,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }

    public function showDetailCategory($id)
    {
        try {
            $cate = $this->categoryRepo->showDetailCategory($id);
            return response()->json($cate,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }

    public function updateCategory(StoreCategoryRequest $request, $id)
    {
        try {
            $cate = $this->categoryRepo->updateCategory($request,$id);
            return response()->json($cate,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }
}
