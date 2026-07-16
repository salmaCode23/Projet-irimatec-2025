import { createBrowserRouter, Navigate } from "react-router-dom";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import DefaultLayout from "./components/DefaultLayout";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";
import Service from "./pages/Service";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";

import DefaultLayoutAdmin from "./components/admin/DefaultLayoutAdmin";
 import Dashboard from "./components/admin/Dashbord";
import Main from "./components/admin/Main";

import ProtectedRoute from "./components/ProtectedRoute";
 
const router = createBrowserRouter([
  // Routes publiques
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Navigate to={"/home"} /> },
      { path: "/home", element: <Home /> },
      { path: "/contact", element: <Contact /> },
      { path: "/projets", element: <Project /> },
      { path: "/services", element: <Service /> },
    ],
  },

  // Routes auth
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // Routes admin sécurisées
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <DefaultLayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashbord" /> },
      { path: "dashbord", element: <Dashboard /> },
      { path: "main", element: <Main /> },
  

    ],
  },

  // Route 404
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
