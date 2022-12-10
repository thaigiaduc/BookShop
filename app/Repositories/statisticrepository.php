<?php

namespace App\Repositories;

use App\models\Order;
use App\models\OrderItem;
use App\Models\ImportDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class statisticRepository
{
    public static function getCountStatus($id){
        $countStars = Order::selectRaw('order_status, count(order_status) as count_order_status')
                        ->  where('user_id', $id)
                        ->  groupBy('order_status')
                        ->  orderBy('order_status', 'desc')
                        ->  get();

        for($i = 5; $i >= 1; $i--){
            $isExist = false;
            foreach($countStars as $countStar){
                if($countStar -> order_status == $i){
                    $isExist = true;
                    break;
                }
            }
        }
        return $countStars;
    }
    
    public static function getCountStatusBook($id){
        $countStars = Order::selectRaw('order_status, count(order_status) as count_order_status')
                        ->  leftjoin('order_item','order.id','order_item.order_id')
                        ->  where('book_id', $id)
                        ->  groupBy('order_status')
                        ->  orderBy('order_status', 'desc')
                        ->  get();

        for($i = 5; $i >= 1; $i--){
            $isExist = false;
            foreach($countStars as $countStar){
                if($countStar -> order_status == $i){
                    $isExist = true;
                    break;
                }
            }
        }
        return $countStars;
    }
    public function filter($list, $filterType, $filterValue)
    {
        switch($filterType){
            case 1:{
                $list->whereMonth('order_date',$filterValue);
                break;
            }
            case 2:{
                $list->whereMonth('order_date','<=',$filterValue*3)
                     ->whereMonth('order_date','>',($filterValue-1)*3);
                break;
            }
            case 3:{
                $list->whereYear('order_date',$filterValue);
                break;
            }
        }
        return $list;
    }
    
    public function index(Request $request)
    {
        switch($request->statistic){
            case 'user':{
                $list = Order::leftjoin('user','order.user_id','user.id')
                                ->selectRaw('count(user_id) as order_bill,SUM(order_amount) as order_amount')
                                ->addSelect('email','user_id')
                                ->groupby('email','user_id');
                $list = $this->filter($list,$request->filterType,$request->filterValue);
                break;
            }
            case 'book':{
                $list = Order::leftjoin('order_item','order_item.order_id','order.id')
                               ->leftjoin('book','order_item.book_id','book.id')
                               ->selectRaw('book_id,book.book_title, SUM(order_item.quantity) as quantity, SUM(order_item.quantity*order_item.price) as amount')
                               ->groupby('book.book_title','book_id');
                $list = $this->filter($list,$request->filterType,$request->filterValue);
                break;
            }
        }
        return $list->get();
    }
  
}
