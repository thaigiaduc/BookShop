<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'book' => $this->book->book_title,
            'quantity' => $this->quantity,
            'price' => $this->price,
        ];
    }
}
