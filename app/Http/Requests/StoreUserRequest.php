<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'email' => 'required|email|unique:user,email',
            'password' => 'required',
            'address' => 'required|string',
            'phone' => 'required|string|between:10,10',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
        ];
    }
}
