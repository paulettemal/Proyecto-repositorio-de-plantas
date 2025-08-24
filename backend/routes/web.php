<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlantaController;
use Illuminate\Http\Request;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('plantas.index', function () {
        return Inertia::render('Plantas');
    })->name('plantas.index');
});

Route::get('plantas', [PlantaController::class, 'Index'])->name('plantas.index');
Route::get('plantas/create',[PlantaController::class, 'Create'])-> name('plantas.create');
Route::post('plantas', [PlantaController::class, 'store'])->name('plantas.store');
Route::get('plantas/edit/{planta}', [PlantaController::class, 'edit'])->name('plantas.edit'); 
Route::put('plantas/{planta}', [PlantaController::class, 'update'])->name('plantas.update');
Route::delete('plantas/{planta}',  [PlantaController::class, 'destroy'])->name('plantas.destroy');




Route::get('/explora', function () {
    return Inertia::render('explora'); 
});
Route::get('/favoritos', function () {
    return Inertia::render('favoritos');
});

Route::get('plantas/{planta}', [PlantaController::class, 'show'])->name('plantas.show');

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
