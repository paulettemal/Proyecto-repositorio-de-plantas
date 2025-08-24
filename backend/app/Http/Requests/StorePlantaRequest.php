<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePlantaRequest extends FormRequest
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
            'nombreComun' => 'required|string|max:255',
            'nombreCientifico' => 'required|string|max:255',
            'descripcion' => 'required|string|max:2550',
            'distribucion' => 'required|string|max:255',
            'propiedades' => 'required|string|max:2550',
            'principiosActivos' => 'required|string|max:2550',
            'url' => 'required|string|max:255',
        ];
    }
}
