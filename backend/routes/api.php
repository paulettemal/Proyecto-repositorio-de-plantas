<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlantaController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rutas públicas
Route::post('/register', [RegisteredUserController::class, 'apiRegister']);
Route::post('/login', [AuthenticatedSessionController::class, 'apiLogin']);

// Rutas para plantas públicas
Route::get('/plantas', [PlantaController::class, 'apiIndex']);
Route::get('/plantas/{planta}', [PlantaController::class, 'apiShow']);

// Rutas protegidas por autenticación
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/logout', [AuthenticatedSessionController::class, 'apiLogout']);
    
    // CRUD de plantas para usuarios autenticados
    Route::post('/plantas', [PlantaController::class, 'store']);
    Route::put('/plantas/{planta}', [PlantaController::class, 'update']);
    Route::delete('/plantas/{planta}', [PlantaController::class, 'destroy']);
});
