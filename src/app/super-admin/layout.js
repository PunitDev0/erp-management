'use client'
import Header from "@/components/Super-Admin/components/header";
import { SuperAdminSidebar } from "@/components/Super-Admin/components/sidebar";
import { useState } from "react";

// export const metadata = {
//   title: "Super Admin Dashboard",
//   description: "Admin panel for managing institutes",
// };

export default function RootLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <html lang="en">
         <body
        style={{
          backgroundImage: "url('/patternImage.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className="font-sans text-black min-h-screen "
      >
       {children}
      </body>
    </html>
  );
}
