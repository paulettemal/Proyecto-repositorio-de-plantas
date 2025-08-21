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
        $planta = Planta::create($validated);
        
        if (request()->expectsJson()) {
            return response()->json([
                'success' => true,
                'data' => $planta,
                'message' => 'Planta creada exitosamente'
            ], 201);
        }
        
        return redirect()->route('plantas.index');
    }
    

    public function show(Planta $planta)
    {
        if (request()->expectsJson()) {
            return response()->json([
                'success' => true,
                'data' => $planta
            ]);
        }
        return inertia('plantas/show', ['planta' => $planta]);
    }


    public function edit(Planta $planta)
    {
        return inertia('plantas/edit', [
            'planta'=>$planta
        ]);
    }

    public function update(UpdatePlantaRequest $request, Planta $planta)
    {
        $validated = $request->validated();
        $planta->update($validated);
        
        if (request()->expectsJson()) {
            return response()->json([
                'success' => true,
                'data' => $planta,
                'message' => 'Planta actualizada exitosamente'
            ]);
        }
        
        return redirect()->route('plantas.index');
    }

    public function destroy(Planta $planta)
    {
        $planta->delete();
        
        if (request()->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Planta eliminada exitosamente'
            ]);
        }
        
        return redirect()->route('plantas.index');
    }


    public function publicIndex()
    {
        return response()->json([
            'plantas' => Planta::all()
        ]);
    }
}
