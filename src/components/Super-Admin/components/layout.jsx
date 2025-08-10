'use client'
import React, { useState } from 'react'
import { SuperAdminSidebar } from './sidebar'
import Header from './header'

function Layout({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
     <div className="grid grid-cols-[16rem_1fr] min-h-screen relative">
          
          {/* Sidebar */}
          <aside className=" z-20">
            <SuperAdminSidebar sidebarOpen={sidebarOpen} />
          </aside>

          {/* Main Area: Sticky Header + Scrollable Content */}
          <div className="flex flex-col min-h-screen relative  ">
            
            {/* Sticky Header */}
            <div className="z-50 w-full sticky pr-5 py-5">
              <Header setSidebarOpen={setSidebarOpen} />
            </div>

            {/* Scrollable Page Content */}
            <main className="flex-1 overflow-y-auto ">
              {children}
            </main>
          </div>
        </div>
  )
}

export default Layout
