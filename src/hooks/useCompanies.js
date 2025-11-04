import { useState, useCallback } from "react";
import { getCompanies, createCompany, deleteCompany, editCompany } from "@/api/adminService";

export default function useCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCompanies = useCallback(async () => {
    try {
      setError("");
      const res = await getCompanies();
      setCompanies(res.data);
    } catch (err) {
      console.error("Gagal load companies:", err);
      setError("Gagal memuat data perusahaan.");
    }
  }, []);

  const addCompany = async (name) => {
    if (!name) throw new Error("Nama company tidak boleh kosong.");
    setLoading(true);
    try {
      await createCompany(name);
      await loadCompanies();
    } finally {
      setLoading(false);
    }
  };

  const removeCompany = async (id) => {
    setLoading(true);
    try {
      await deleteCompany(id);
      await loadCompanies();
    } finally {
      setLoading(false);
    }
  };

   const updateCompany = async (id, data) => {
    if (!id) throw new Error("ID company tidak valid.");
    setLoading(true);
    try {
      await editCompany(id, data);
      await loadCompanies();
    } catch (err) {
      console.error("Gagal update company:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { companies, loading, error, loadCompanies, addCompany, removeCompany, updateCompany };
}
