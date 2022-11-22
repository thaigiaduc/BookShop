<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\discountRepository;
use App\Http\Requests\StoreDiscountRequest;

class DiscountController extends Controller
{
    protected $discountRepo;

    public function __construct(discountRepository $discountRepo)
    {
        $this->discountRepo = $discountRepo;
    }
    //admin ------------------------------------------------------------------------------
    public function getDiscountAdmin()
    {
        try {
            $dis = $this->discountRepo->showDiscount();
            return response()->json($dis,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }

    public function insertDiscountAdmin(StoreDiscountRequest $request)
    {
        try {
            $dis = $this->discountRepo->insertDiscount($request);
            return response()->json($dis,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }

    public function showDetailDiscount($id)
    {
        try {
            $dis = $this->discountRepo->showDetailDiscount($id);
            return response()->json($dis,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }

    public function updateDiscount(StoreDiscountRequest $request, $id)
    {
        try {
            $dis = $this->discountRepo->updateDiscount($request,$id);
            return response()->json($dis,200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        }
    }
}
