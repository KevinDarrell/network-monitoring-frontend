import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "@/api/authService";
import { Menu, X, LayoutDashboard, Building2, Network, Users, LogOut } from "lucide-react"; // Ikon modern

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // --- Handle logout ---
  const handleLogout = async () => {
  try {
    await logout();
  } catch (err) {
    console.error("Gagal logout:", err);
  } finally {
    // Hapus token & session data
    localStorage.removeItem("token");
    sessionStorage.clear();

    // Navigasi ke login, replace = true supaya tidak bisa "Back"
    navigate("/login", { replace: true });
  }
};

  // --- Handle toggle sidebar (mobile) ---
  const toggleSidebar = () => setIsOpen(!isOpen);

  // --- Styling aktif NavLink ---
  const getNavLinkClass = ({ isActive }) => {
    const base =
      "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200";
    return isActive
      ? `${base} bg-blue-600 text-white font-semibold`
      : `${base} text-gray-300 hover:bg-gray-700 hover:text-white`;
  };

  return (
    <>
      {/* Tombol menu responsif */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar utama */}
      <aside
        className={`sidebar fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0`}
      >
        <div className="px-5 py-6 border-b border-gray-700 flex items-center justify-center">
          <h2 className="text-2xl font-bold tracking-wide">Admin Panel</h2>
        </div>

        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          <NavLink to="/admin/dashboard" className={getNavLinkClass}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/admin/company" className={getNavLinkClass}>
            <Building2 size={18} /> Manajemen Company
          </NavLink>
          <NavLink to="/admin/network" className={getNavLinkClass}>
            <Network size={18} /> Pengaturan Jaringan
          </NavLink>
          <NavLink to="/admin/user" className={getNavLinkClass}>
            <Users size={18} /> Manajemen User
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
