<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'review_title' => $this->review_title,
            'review_detail' => $this->review_details,
            'rating_start' => $this->rating_start,
            'book_id' =>$this->book_id,
            'review_date' => $this->review_date
        ];
    }
}
