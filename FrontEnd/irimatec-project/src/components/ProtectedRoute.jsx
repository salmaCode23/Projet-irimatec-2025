// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // Vérifie si token existe

  if (!token) {
    return <Navigate to="/login" replace />; // Redirige vers login si pas connecté
  }

  return children;
}
