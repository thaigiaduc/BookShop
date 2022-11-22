<?php

namespace App\Repositories;

use App\models\Discount;
use Illuminate\Http\Request;
use App\Http\Requests\DiscountRequest;
use App\Http\Requests\StoreDiscountRequest;

class DiscountRepository
{
    // admin ----------------------------------------------------------
    public function showDiscount()
    {
        $Discount = Discount::orderBy('id','asc')->get();
        return $Discount;
    }
    // thêm danh mục sản phẩm
    public function insertDiscount(StoreDiscountRequest $request)
    {
        $Discount = Discount::create([
            'book_id' => $request->book_id,
            'discount_start_day' => $request->discount_start_day,
            'discount_end_day' => $request->discount_end_day,
            'discount_price' => $request->discount_price,
        ]);

        return $Discount;
    }

    // sửa danh mục sản phẩm
    public function updateDiscount($request, $id)
    {
        $Discount = Discount::where('id',$id)->update([
            'book_id' => $request->book_id,
            'discount_start_day' => $request->discount_start_day,
            'discount_end_day' => $request->discount_end_day,
            'discount_price' => $request->discount_price,
        ]);

        return $Discount;
    }

    // show chi tiết danh mục sản phẩm
    public function showDetailDiscount($id) 
    {
        $Discount = Discount::where('id',$id)->get();
        return $Discount;
    }

    // xóa danh mục sản phẩm
    public function deleteDiscount($id)
    {
        $Discount = Discount::where('id',$id)->delete();
        return $Discount;
    }
}
