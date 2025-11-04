import React from 'react';
import { Outlet } from 'react-router-dom'; // PENTING
import Sidebar from '@/components/admin/Sidebar'; // Import Sidebar
import '@/styles/adminLayout.css';

// Ini adalah Halaman Layout Utama untuk Admin
// Tugasnya hanya menampilkan Sidebar dan Konten (Outlet)
export default function AdminDashboard() {
  
  return (
    <div className="flex min-h-screen bg-gray-100 font-inter">
      {/* Sidebar Statis di kiri */}
      <Sidebar />

      {/* Konten Utama Dinamis (diatur oleh <Outlet>) */}
      <main className="flex-1 ml-64 p-8"> {/* ml-64 = margin-left selebar sidebar */}
        
        {/* Di sinilah komponen (AdminDashboardContent, AdminCompany, dll) akan dirender */}
        <Outlet /> 

      </main>
    </div>
  );
}