<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreBookRequest extends FormRequest
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
            'book_title' => 'required|string|min:1|max:255',
            'book_summary' => 'required|text',
            'book_price' => 'required|numeric',
            'quantity' => 'required|number',
            'category_id' => 'required|integer',
            'author_id' => 'required|integer',
            'publisher_id' => 'required|integer'
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Failed',
            'data' => $validator->errors(),
            'status_code' => 422
        ],200));
    }
    
    public function message()
    {
        return [
            'book_title.required' => 'Bạn chưa nhập tiêu đề sách.',
            'book_summary.required' => 'Bạn chưa nhập chi tiết sách.',
            'book_price.error' => 'Giá nhập không hợp lệ.',
            'quantity.error' => 'Số lượng nhập không hợp lệ.',
            'category_id.error' => 'Bạn chưa chọn danh mục.',
            'author_id.error' => 'Bạn chưa chọn tác giả.'
        ];
    }
}