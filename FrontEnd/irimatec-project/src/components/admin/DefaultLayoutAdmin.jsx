import React from 'react'
import SideBar from './SideBar'
import NavBarAdmin from './NavBarAdmin'
import { Outlet } from 'react-router-dom'

export default function DefaultLayoutAdmin() {
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <SideBar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <NavBarAdmin />

        {/* Contenu */}
        <main className="flex-1 p-4 overflow-auto bg-[#ACE1AF] border-l border-green-50 rounded-tl-3xl p-6 h-full">
          <div className="">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
