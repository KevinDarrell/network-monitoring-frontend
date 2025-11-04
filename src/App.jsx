import React from "react"
import { Routes, Route, Navigate, Link } from "react-router-dom"

import LoginPage from "./pages/LoginPage"
import ProduksiDashboard from "./pages/ProduksiDashboard"
import ViewPage from "./pages/ViewPage"
import AdminDashboard from "./pages/admin/AdminDashboard"

// Halaman konten admin
import AdminDashboardContent from "./components/admin/AdminDashboardContent"
import AdminCompany from "./pages/admin/AdminCompany"
import AdminNetwork from "./pages/admin/AdminNetwork"
import AdminUser from "./pages/admin/AdminUser"

// ✅ Import toaster dari sonner
import { Toaster } from "sonner"

function App() {
  return (
    <>
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rute Produksi */}
        <Route path="/produksi/dashboard" element={<ProduksiDashboard />} />
        <Route path="/produksi/view/:timbanganId" element={<ViewPage />} />

        {/* Rute Admin */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardContent />} />
          <Route path="company" element={<AdminCompany />} />
          <Route path="network" element={<AdminNetwork />} />
          <Route path="user" element={<AdminUser />} />
        </Route>

        {/* Rute 404 */}
        <Route
          path="*"
          element={
            <div className="h-screen w-full flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold">404 - Halaman Tidak Ditemukan</h1>
              <Link to="/login" className="mt-4 text-blue-600 hover:underline">
                Kembali ke Login
              </Link>
            </div>
          }
        />
      </Routes>

      {/* ✅ Toaster global */}
      <Toaster position="top-right" richColors />
    </>
  )
}

export default App
