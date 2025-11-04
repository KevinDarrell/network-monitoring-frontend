import { useState, useEffect, useCallback } from 'react';
import { getCompanies, getUsers, createUser, deleteUser } from '../api/adminService'; 

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Fetch data user dan company
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, companiesRes] = await Promise.all([
        getUsers(),
        getCompanies()
      ]);
      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
      setCompanies(Array.isArray(companiesRes.data) ? companiesRes.data : []);
    } catch (err) {
      console.error("Gagal load data user/company:", err);
      setError('Gagal memuat data.');
      setUsers([]);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🔹 Tambah user
  const addUser = async (userData) => {
    try {
      console.log("Data dikirim ke server:", userData);
      const res = await createUser(userData);
      // update langsung tanpa reload API
      setUsers(prev => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Gagal tambah user:", err.response?.data || err.message);
      throw err;
    }
  };

  // 🔹 Hapus user
  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error("Gagal hapus user:", err);
      throw err;
    }
  };

  return {
    users,
    companies,
    loading,
    error,
    addUser,       // ✅ gunakan nama ini di AdminUser
    removeUser,    // ✅ gunakan nama ini di AdminUser
  };
}
