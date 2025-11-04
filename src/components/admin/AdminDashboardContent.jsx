import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import api from '@/api/axiosInstance';
import StatBox from './dashboard/StatBox';
import HealthItemSAP from './dashboard/HealthItemSAP';
import HealthItemList from './dashboard/HealthItemList';

const SOCKET_URL = 'http://localhost:3001';
let adminSocket = null;

export default function AdminDashboardContent() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [health, setHealth] = useState(null);

  // Fetch data
  useEffect(() => {
    api.get('/api/admin/stats')
      .then(res => setStats(res.data))
      .catch(err => {
        console.error("Gagal load statistik:", err);
        if (err.response?.status === 403) navigate('/login');
      });
  }, [navigate]);

  // Setup socket
  useEffect(() => {
    adminSocket = io(SOCKET_URL);
    adminSocket.on('connect', () => {
      console.log('[Admin Socket] Connected');
      adminSocket.emit('join-admin-room');
    });
    adminSocket.on('overview-update', setHealth);
    adminSocket.on('connect_error', () => setHealth({ sapStatus: 'ERROR' }));

    return () => {
      console.log('[Admin Socket] Disconnect');
      adminSocket.disconnect();
    };
  }, []);

  return (
    <div className="space-y-10 px-4 sm:px-6 lg:px-8 pb-10">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-50 to-white shadow-sm rounded-2xl p-6 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm">Ringkasan sistem & status jaringan secara real-time</p>
      </header>

      {/* Statistik */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Statistik Sistem</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <StatBox title="Total Company" value={stats?.totalCompanies} />
          <StatBox title="Total Timbangan" value={stats?.totalTimbangan} />
          <StatBox title="Total Device" value={stats?.totalDevices} />
          <StatBox title="Total User" value={stats?.totalUsers} />
        </div>
      </section>

      {/* Aksi Cepat */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Aksi Cepat</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/company"
            className="flex-1 min-w-[160px] text-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all"
          >
            Tambah Company
          </Link>
          <Link
            to="/admin/user"
            className="flex-1 min-w-[160px] text-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all"
          >
            Tambah User
          </Link>
          <Link
            to="/admin/network"
            className="flex-1 min-w-[160px] text-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all"
          >
            Konfigurasi Device
          </Link>
        </div>
      </section>

      {/* Status Jaringan */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Status Jaringan Live</h2>
        <div className="space-y-5">
          <HealthItemSAP status={health?.sapStatus} />
          <hr className="border-gray-200" />
          <HealthItemList companies={health?.companies} />
        </div>
      </section>
    </div>
  );
}
