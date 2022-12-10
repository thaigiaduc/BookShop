<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Repositories\statisticRepository;
class BookStatisticResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return[
            'book_id' => $this->book_id,
            'book_title' => $this->book_title,
            'quantity' => $this->quantity,
            'amount' => $this->amount,
            'count_order_status' =>  statisticRepository::getCountStatusBook($this->book_id),
        ];
    }
}
