import { EnvelopeIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [status, setStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", form);

      // Stocker token
      localStorage.setItem("token", response.data.token);

      setStatus("Connexion réussie !");
      setShowAlert(true);
      navigate("/admin");
      setForm({ email: "", password: "" });
    } catch (error) {
      console.error(error);
      setStatus("Erreur de connexion. Vérifiez vos identifiants !");
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
          Connectez-vous à votre compte
        </p>

        {showAlert && (
          <div className="mb-4 text-sm text-center text-white bg-green-600 py-2 rounded-lg">
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
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
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Mot de passe *
            </label>
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

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <EnvelopeIcon className="w-4 h-4" />
            Se connecter
          </button>
        </form>

        {/* Liens supplémentaires */}
        <div className="mt-4 flex justify-between text-sm">
          <Link
            to="/forgot-password"
            className="text-green-700 hover:underline"
          >
            Mot de passe oublié ?
          </Link>
          <Link
            to="/register"
            className="text-green-700 hover:underline"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
