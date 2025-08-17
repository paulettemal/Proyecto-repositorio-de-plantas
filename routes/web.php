<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlantaController;
use Illuminate\Http\Request;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('plantas', [PlantaController::class, 'index'])->name('plantas.index');
Route::get('plantas/create',[PlantaController::class, 'create'])-> name('plantas.create');
Route::post('plantas', [PlantaController::class, 'store'])->name('plantas.store');
Route::get('plantas/edit/{planta}', [PlantaController::class, 'edit'])->name('plantas.edit'); 
Route::put('plantas/{planta}', [PlantaController::class, 'update'])->name('plantas.update');
Route::delete('plantas/{planta}',  [PlantaController::class, 'destroy'])->name('plantas.destroy');


Route::get('/api/plantas', [PlantaController::class, 'publicIndex']);

Route::get('/explora', function () {
    return Inertia::render('explora'); 
});
Route::get('/favoritos', function () {
    return Inertia::render('favoritos');
});

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
