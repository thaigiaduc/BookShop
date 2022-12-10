<?php

namespace App\Repositories;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\models\Order;
use App\Models\Book;
use App\Models\OrderItem;
use Carbon\Carbon;
use Exception;

use function PHPUnit\Framework\throwException;

class OrderRepository
{
    public function createOrder($userID,$orderItemArray)
    {
        DB::beginTransaction();
        try{
            $order_amount = 0;
            foreach($orderItemArray as $item=>$value){
                $orderItemArray[$item]['price'] =
                Book::getFinalPriceByBook( $orderItemArray[$item]['book_id']);
                $order_amount += $orderItemArray[$item]['price']*$orderItemArray[$item]['quantity'];
            }
            $order = Order::create([
                    'user_id' => $userID,
                    'order_date' => Carbon::now(),
                    'order_amount' => $order_amount,
                    'order_status' => 1,
            ]);
            foreach($orderItemArray as $item=>$value){
                $orderItemArray[$item]['order_id']=$order->id;
                $quantity=Book::find($orderItemArray[$item]['book_id'])->quantity;
                if($quantity>=$orderItemArray[$item]['quantity'])
                Book::where('id',$orderItemArray[$item]['book_id'])->update([
                    'quantity' => $quantity - $orderItemArray[$item]['quantity'],
                ]);
                else{
                    throw new \Exception("book_id.".$item.".");
                } 
            }
            $order->orderItems()->createMany($orderItemArray);

            DB::commit();
            
            return $order; 
        }catch(\Exception $e){
            DB::rollback();
            return throw new \Exception($e->getMessage());
        }
    }
    
    public function showOrderUser($id)
    {
        return Order::where('user_id',$id)->get();
    }

    public function showOrder(Request $request)
    {
        return Order::where('user_id',$request->user()->id)->get();
    }

    public function showOrderAdmin()
    {
        return Order::get();
    }

    public function showOrderDetail($id)
    {
        return OrderItem::where('order_id',$id)->leftjoin('book','book.id','=','order_item.book_id')->select('order_item.*','book.book_title')->get();
    }

    public function updateStatusOrder($id,$status){
        return Order::where('id',$id)->update(['order_status'=>$status]);
    }
}
