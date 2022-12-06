<?php

namespace App\Repositories;

use App\models\Import;
use App\models\Book;
use App\Models\ImportDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class importRepository
{

    public function store(Request $request)
    {
       DB::beginTransaction();
       try{
        $import_amount = 0;
        $import_quantity = 0;
        $orderItemArray = $request->itemImport;
        foreach($orderItemArray as $item=>$value){
            $orderItemArray[$item]['price'] =
            Book::getFinalPriceByBook( $orderItemArray[$item]['book_id']);
            $import_amount += $orderItemArray[$item]['price']*$orderItemArray[$item]['quantity'];
            $import_quantity += $orderItemArray[$item]['quantity'];
        }
        $import = Import::create([
                'user_id' => $request->user()->id,
                'quantity' => $import_quantity,
                'price' => $import_amount,
                'import_date' => Carbon::now(),
        ]);
        foreach($orderItemArray as $item=>$value){
            $orderItemArray[$item]['import_bill_id']=$import->id;
            $quantity=Book::find($orderItemArray[$item]['book_id'])->quantity;
           
            Book::where('id',$orderItemArray[$item]['book_id'])->update([
                'quantity' => $quantity + $orderItemArray[$item]['quantity'],
            ]);
            ImportDetail::create([
                'import_bill_id' => $import->id,
                'book_id' => $orderItemArray[$item]['book_id'],
                'quantity' => $orderItemArray[$item]['quantity'],
                'price' => $orderItemArray[$item]['price'],
            ]);
        }

        DB::commit();
        
        return $import; 
    }catch(\Exception $e){
        DB::rollback();
        return throw new \Exception($e->getMessage());
    }
    }

  
}
