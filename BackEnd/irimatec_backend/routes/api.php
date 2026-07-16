<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessageMail;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\ProjetController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Ici se trouvent les routes de ton API Laravel.
|
*/

// 🔹 Projets
Route::apiResource('projets', ProjetController::class);

// 🔹 Contact
Route::post('/contact', function(Request $request) {
    $data = $request->only('name', 'email', 'message', 'phone');

    Mail::to('irimatec2@gmail.com')->send(new ContactMessageMail($data));

    return response()->json(['message' => 'Email envoyé !']);
});

// 🔹 Authentification
Route::post('/register', [AuthController::class, 'register']);     // Inscription
Route::post('/login', [AuthController::class, 'login']);           // Connexion
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']); // Mot de passe oublié
Route::post('/reset-password', [AuthController::class, 'resetPassword']);   // Réinitialiser mot de passe

// 🔹 Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);   // Récupérer infos user connecté
    Route::post('/logout', [AuthController::class, 'logout']); // Déconnexion
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user(); // Renvoie directement l'utilisateur connecté
});
Route::middleware('auth:sanctum')->get('/users', function () {
    $user = auth()->user();
    if (!$user || $user->role !== 'admin') {
        return response()->json(['message' => 'Unauthorized'], 403);
    }
    return App\Models\User::all();
});
