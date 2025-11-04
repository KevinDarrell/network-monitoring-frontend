import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { logout } from '../api/authService';
import ProduksiHeader from '../components/produksi/ProduksiHeader';
import TimbanganList from '../components/produksi/TimbanganList';

export default function ProduksiDashboard() {
  const [timbangans, setTimbangans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/timbangan/me')
      .then(response => {
        setTimbangans(response.data);
      })
      .catch(err => {
        console.error("Gagal mengambil data timbangan:", err);
        if (err.response && [401, 403].includes(err.response.status)) {
          navigate('/login');
        } else {
          setError('Gagal memuat data timbangan.');
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Gagal logout:", err);
    } finally {
      navigate('/login');
    }
  };

  const companyName = timbangans[0]?.companyName || '';

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-inter">
      <div className="max-w-4xl mx-auto">
        <ProduksiHeader companyName={companyName} onLogout={handleLogout} />
        {loading ? (
          <p className="text-center text-gray-500">Memuat timbangan...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <TimbanganList timbangans={timbangans} />
        )}
      </div>
    </div>
  );
}
