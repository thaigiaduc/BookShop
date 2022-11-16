<?php

namespace App\Http\Controllers;
use App\Http\Requests\StoreOrderRequest;
use Illuminate\Http\Request;
use App\Repositories\orderrepository;
class OrderController extends Controller
{   
    protected $orderRepo;

    public function __construct(orderrepository $orderRepo)
    {
        $this->orderRepo = $orderRepo;
    }

    
    public function createorder(StoreOrderRequest $request)
    {
        $itemOrderArray = $request->itemOrder;
        $userID =   $request->user()->id;
        try {
            $res = $this->orderRepo->createOrder($userID,$itemOrderArray);
            return response()->json($res,201);
        } catch (\Exception $e) {
            return response()->json([
                'errors' => $e->getMessage(),
            ], 422);
        }
       
    }

    public function showOrder(Request $request)
    {
        $res = $this->orderRepo->showOrderUser($request->user()->id);
        return response()->json($res, 200);
    }
    public function showOrderDetail($id)
    {
        $res = $this->orderRepo->showOrderDetail($id);
        return response()->json($res, 200);
    }
}
