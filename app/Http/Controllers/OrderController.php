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

    public function showOrderUser(Request $request)
    {
        $res = $this->orderRepo->showOrderUser($request->user()->id);
        return response()->json($res, 200);
    }
    public function showOrderDetail($id)
    {
        $res = $this->orderRepo->showOrderDetail($id);
        return response()->json($res, 200);
    }
    public function updateStatusOrder(Request $request){
        $res= $this->orderRepo->updateStatusOrder($request->id,$request->status);
        return response()->json($res,200);
    }
    public function showOrder(){
        $res= $this->orderRepo->showOrder();
        return response()->json($res,200);
    }
}
