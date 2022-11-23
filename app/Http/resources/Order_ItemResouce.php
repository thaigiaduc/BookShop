<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Order_ItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'order_id'=>$this->order_id,
            'book' => $this->book->book_title,
            'quantity' => $this->quantity,
            'price' => $this->price,
        ];
    }
}
