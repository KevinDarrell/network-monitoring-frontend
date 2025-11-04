// src/hooks/useNetworkManagement.js
import { useState, useEffect } from "react";
import {
  getSapIp, saveSapIp, getCompanies, getTimbanganByCompany,
  createTimbangan, updateTimbangan, getDevicesByTimbangan,
  createDevice, deleteDevice, updateDevice
} from "@/api/adminService";

export default function useNetworkManagement() {
  const [sapIp, setSapIp] = useState('');
  const [companies, setCompanies] = useState([]);
  const [timbangans, setTimbangans] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load SAP IP & daftar company saat pertama kali
  useEffect(() => {
    (async () => {
      try {
        const [sapRes, companyRes] = await Promise.all([
          getSapIp(), getCompanies()
        ]);
        setSapIp(sapRes.data.value || '');
        setCompanies(companyRes.data);
      } catch (err) {
        console.error("Gagal load data awal:", err);
      }
    })();
  }, []);

  // Fungsi utilitas
  const loadTimbangans = async (companyId) => {
    const res = await getTimbanganByCompany(companyId);
    setTimbangans(res.data);
  };

  const loadDevices = async (timbanganId) => {
    const res = await getDevicesByTimbangan(timbanganId);
    setDevices(res.data);
  };
  const editTimbangan = async (id, newName, companyId) => {
  setLoading(true);
  try {
    await updateTimbangan(id, { name: newName, companyId });
    // reload data agar list timbangan terupdate
    await loadTimbangans(companyId);
  } catch (err) {
    console.error("Gagal update timbangan:", err);
  } finally {
    setLoading(false);
  }
};

  return {
    sapIp, setSapIp, companies, timbangans, devices, loading, setLoading,
    loadTimbangans, loadDevices,
    saveSapIp, createTimbangan, editTimbangan, createDevice, deleteDevice, updateDevice
  };
}
