 import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

 import { 
  MagnifyingGlassIcon,   // Search
  PlusIcon,              // Plus
  UsersIcon,             // Users
  DocumentTextIcon,      // FileText
  ChartBarIcon,          // Activity (closest match)
  ArrowTrendingUpIcon,   // TrendingUp
  BellIcon,              // Bell
  UserIcon,              // User
  HomeIcon,              // Home
  Cog6ToothIcon,         // Settings
  FunnelIcon             // Filter
} from "@heroicons/react/24/outline";
export default function SideBar() {
      const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div>
  <div className=" hidden md:block w-64 bg-white   h-full">
    <div className="">
      <div className="flex items-center space-x-3">
        
        <div>
          <img src="/logoN.png" alt="Logo" className="w-1/" />
         </div>
      </div>
    </div>
 {/*  desktop */}
    <nav className="  mt-6">
      <div className="px-3 space-y-1">
        <NavLink  to="dashbord"
          onClick={() => setActiveTab("dashboard")}
          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === "dashboard"
              ? "bg-green-50 text-green-700 border-r-2 border-green-500"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <HomeIcon className="mr-3 h-5 w-5" />
          Tableau de bord
        </NavLink>

        <NavLink
         to="main"
          onClick={() => setActiveTab("content")}
          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === "content"
              ? "bg-green-50 text-green-700 border-r-2 border-green-500"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <DocumentTextIcon className="mr-3 h-5 w-5" />
          Gestion des  projets
        </NavLink>

       
      </div>
    </nav>
  </div>
 
    </div>
  )
}