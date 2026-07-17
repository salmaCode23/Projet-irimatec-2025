import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  
  ChartBarIcon,         
  ArrowTrendingUpIcon   
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les projets depuis Laravel
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/projets");
      setProjects(response.data);
    } catch (error) {
      console.error("Erreur chargement projets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Stats calculées
  const activeProjects = projects.filter(p => p.status === "active").length;

   const projectsThisMonth = projects.filter(p => {
    const created = new Date(p.created_at);
    const now = new Date();
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;
  const growthRate = projects.length > 0 ? ((projectsThisMonth / projects.length) * 100).toFixed(1) : 0;

  const dashboardStats = [
    { 
      title: 'Active Projects', 
      value: activeProjects, 
      subtitle: 'Nombre total de projets actifs', 
      icon: ChartBarIcon, 
      color: 'text-purple-600' 
    },
    { 
      title: 'Growth Rate', 
      value: `${growthRate}%`, 
      subtitle: 'Projets ajoutés ce mois', 
      icon: ArrowTrendingUpIcon, 
      color: 'text-orange-600' 
    }
  ];

  // Activité récente (3 derniers projets)
  const recentActivity = projects
    .slice(-3)
    .reverse()
    .map(proj => ({
      action: `Projet "${proj.title}" ajouté`,
      time: new Date(proj.created_at).toLocaleDateString("fr-FR"),
      color: 'bg-purple-500'
    }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Dashboard</h2>
        <p className="text-gray-600 mb-6">
          Vue d'ensemble de votre plateforme IRIMATEC
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <p>Chargement...</p>
        ) : (
          dashboardStats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Activité récente</h3>
          <div className="space-y-4">
            {loading ? (
              <p>Chargement...</p>
            ) : recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${activity.color}`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Aucune activité récente</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
