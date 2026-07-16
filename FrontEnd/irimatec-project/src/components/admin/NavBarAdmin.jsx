import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon,
  BellIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NavBarAdmin() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Charger les infos du user connecté
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://127.0.0.1:8000/api/me", { // 🔹 utiliser /me
          headers: { Authorization: `Bearer ${token}` }
        });

        // response.data doit contenir l'utilisateur
        setUser(response.data);
      } catch (error) {
        console.error("Erreur récupération user:", error);
      }
    };

    fetchUser();
  }, []);

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    navigate("/login");               // Redirige vers login
  };

  return (
    <div className="bg-white px-6 py-2 shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between">
        
        {/* Barre de recherche */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-green-700 rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
        </div>

        {/* Profil utilisateur */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <BellIcon className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-gray-600" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.name ?? "Invité"} {/* 🔹 Affiche le nom */}
              </p>
              <p className="text-xs text-gray-500">
                {user ? "Administrateur" : "Non connecté"}
              </p>
            </div>

            {/* Bouton Logout */}
            {user && (
              <button 
                onClick={handleLogout} 
                className="ml-3 flex items-center text-red-600 hover:text-red-800 text-sm"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                Déconnexion
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
