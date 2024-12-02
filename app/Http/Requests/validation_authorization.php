<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class validation_authorization extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|max:255',
            'file' => 'file|mimes:swf|required_without_all:url,fliename',
            'url' => 'required_without_all:file,fliename|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'file.required_without_all' => 'Inter file or URL!',
            'url.required_without_all' => 'Inter file or URL!',
        ];
    }
}
