<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Repositories\statisticRepository;
class UserStatisticResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->user_id,
            'email' => $this->email,
            'order_bill' => $this->order_bill,
            'order_amount' => $this->order_amount,
            'count_order_status' => statisticRepository::getCountStatus($this->user_id),
        ];
    }
}
