import { UserIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [status, setStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:3000/api/register", form);

      // 🔹 Stocker token et user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setStatus("Compte créé avec succès !");
      setShowAlert(true);

      // 🔹 Redirection après un petit délai
      setTimeout(() => {
        navigate("/admin/dashbord");
      }, 1000);
    } catch (err) {
      console.error("Erreur inscription:", err);
      setStatus("Erreur lors de la création du compte.");
      setShowAlert(true);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src="./logoN.png" alt="Logo" className="h-16 w-auto" />
        </div>

        <p className="text-gray-600 mb-7 text-sm text-center">
          Créez votre compte
        </p>

        {showAlert && (
          <div className="mb-4 text-sm text-center text-white bg-green-600 py-2 rounded-lg">
            {status}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Nom *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Votre nom"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="votre.email@exemple.com"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="**********"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe *</label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              placeholder="**********"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition-all text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <UserIcon className="w-4 h-4" />
            Créer mon compte
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span>Vous avez déjà un compte ? </span>
          <Link to="/login" className="text-green-700 hover:underline">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
