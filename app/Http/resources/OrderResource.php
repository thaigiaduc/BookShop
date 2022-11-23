<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'order_amount' => $this->order_amount,
            'order_date' => $this->order_date,
            'order_status' => $this->orderStatus->status_name,
        ];
    }
}
