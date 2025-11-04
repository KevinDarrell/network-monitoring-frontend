import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import api from '@/api/axiosInstance';
import DeviceStatus from '@/components/produksi/DeviceStatus';
import '@/styles/view.css';

const SPRING_BOOT_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 2. Ganti portnya (dari :8080) menjadi port WebSocket Anda (3001)
// Ini menggunakan URL Web API untuk memastikan URL terstruktur dengan baik
const urlObject = new URL(SPRING_BOOT_BASE_URL);
urlObject.port = '3001';

// 3. Set variabel akhir untuk koneksi WebSocket
// Hasilnya akan menjadi http://[IP_PC_SERVER]:3001
const NODEJS_SERVER_URL = urlObject.toString();

// Variabel lainnya (tidak perlu diubah)
const HISTORY_LENGTH = 15;

 export default function ViewPage() {
  const { timbanganId } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const namaTimbangan = queryParams.get('nama') || `Timbangan ${timbanganId}`;

  const [devices, setDevices] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch daftar device dari API
  useEffect(() => {
    setLoading(true);
    api.get(`/api/device/by-timbangan/${timbanganId}`)
      .then(res => setDevices(res.data))
      .catch(err => {
        console.error("Gagal ambil daftar device:", err);
        setError('Gagal memuat daftar perangkat.');
      })
      .finally(() => setLoading(false));
  }, [timbanganId]);

  // Koneksi WebSocket (Realtime Monitoring)
  useEffect(() => {
    const socket = io(NODEJS_SERVER_URL, {
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    socket.on('connect', () => {
      console.log('Socket terhubung:', socket.id);
      socket.emit('join-room', timbanganId);
    });

    socket.on('monitoring-update', (data) => {
      setStatuses(data);
      setUpdateTrigger(prev => prev + 1);
    });

    socket.on('connect_error', (err) => {
      console.error('Koneksi WebSocket gagal:', err.message);
      setError('Gagal terhubung ke server monitoring.');
    });

    socket.on('disconnect', () => {
      console.warn('Socket terputus. Mencoba reconnect...');
    });

    return () => socket.disconnect();
  }, [timbanganId]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-inter p-8">
      <div className="w-full max-w-6xl bg-white p-8 rounded-xl shadow-lg relative border border-gray-200">
        
        {/* Tombol Kembali */}
        <Link
          to="/produksi/dashboard"
          className="absolute top-6 right-6 text-blue-600 hover:underline font-medium"
        >
          &larr; Kembali
        </Link>

        {/* Judul */}
        <h1 className="text-3xl font-bold text-gray-800 mb-10">
          Dashboard {decodeURIComponent(namaTimbangan)}
        </h1>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 text-center p-3 rounded mb-5">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <p className="text-gray-500 text-center text-lg">Memuat perangkat...</p>
        ) : (
          <div className="flex flex-col md:flex-row justify-between gap-10">
            
            {/* SERVER BOX */}
            <div className="bg-gray-100 p-8 rounded-lg flex flex-col items-center justify-center shadow-inner border border-gray-200 md:w-1/3">
              <span className="text-8xl mb-5">💻</span>
              <span className="bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold">
                Server Lokal
              </span>
            </div>

            {/* DEVICE LIST */}
            <div className="flex-grow space-y-5">
              {/* Server SAP */}
              <DeviceStatus
                name="Server SAP"
                id="SAP"
                status={statuses['SAP']}
                updateTrigger={updateTrigger}
                historyLength={HISTORY_LENGTH}
              />

              {/* Semua Device */}
              {devices.length > 0 ? (
                devices.map((device) => (
                  <DeviceStatus
                    key={device.id}
                    id={`device-${device.id}`}
                    name={device.name}
                    status={statuses[device.id]}
                    updateTrigger={updateTrigger}
                    historyLength={HISTORY_LENGTH}
                  />
                ))
              ) : (
                <p className="text-gray-500 italic text-center">
                  Tidak ada perangkat terdaftar untuk timbangan ini.
                </p>
              )}
            </div>
          </div>
        )}

        {/* STATUS LEGEND */}
        <div className="mt-10 flex justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-green-500 rounded-sm" /> <span>Up / Aktif</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-red-500 rounded-sm" /> <span>Down / Offline</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-gray-400 rounded-sm" /> <span>Default / Tidak ada data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
