<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use App\Models\User;

class AuthController extends Controller
{
    // 🔹 REGISTER
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user', // par défaut user, tu peux mettre "admin" si besoin
        ]);

        // 🔹 Générer un token automatiquement
        $token = $user->createToken('apiToken')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Compte créé avec succès',
            'user' => $user,
            'token' => $token, // 🔥 ajouté
        ], 201);
    }

    // 🔹 LOGIN
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => false,
                'message' => 'Identifiants invalides'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('apiToken')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Connexion réussie',
            'token' => $token,
            'user' => $user
        ], 200);
    }

    // 🔹 LOGOUT
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Déconnexion réussie'
        ]);
    }

    // 🔹 GET USER CONNECTÉ
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    // 🔹 FORGOT PASSWORD
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['status' => true, 'message' => 'Email de réinitialisation envoyé'])
            : response()->json(['status' => false, 'message' => 'Erreur lors de l’envoi'], 400);
    }

    // 🔹 RESET PASSWORD
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['status' => true, 'message' => 'Mot de passe réinitialisé avec succès'])
            : response()->json(['status' => false, 'message' => 'Erreur lors de la réinitialisation'], 400);
    }
}
