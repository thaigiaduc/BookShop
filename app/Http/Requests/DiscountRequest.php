<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DiscountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'book_id' => 'required|integer|exists:book,id',
            'discount_start_day' => 'required|date',
            'discount_end_day' => 'required|date',
            'discount_price' => 'required|numeric',
        ];
    }
}
