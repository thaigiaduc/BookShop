<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PublisherResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'publisher_name' => $this->publisher_name
        ];
    }
}
