<?php

namespace App\Http\Controllers;

use App\Models\Planta;
use App\Http\Requests\StorePlantaRequest;
use App\Http\Requests\UpdatePlantaRequest;

class PlantaController extends Controller
{
    public function index()
    {
        return inertia('plantas/index', [
            'plantas' => Planta::all()
        ]);
    }

    public function create()
    {
        return inertia('plantas/create', [
            'plantas' => new Planta()
        ]);
    }

    public function store(StorePlantaRequest $request)
    {
        $validated = $request->validated();
        Planta::create($validated);
        return redirect()->route('plantas.index');

    }

    public function show(Planta $planta)
    {
        //
    }

    public function edit(Planta $planta)
    {
        //
    }

    public function update(UpdatePlantaRequest $request, Planta $planta)
    {
        //
    }

    public function destroy(Planta $planta)
    {
        //
    }


    public function publicIndex()
    {
        //
    }
}
