import React, { useState, useEffect } from "react";
import useCompanies from "@/hooks/useCompanies";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export default function AdminCompany() {
  const {
    companies,
    loading,
    error,
    loadCompanies,
    addCompany,
    removeCompany,
    updateCompany,
  } = useCompanies();

  const [companyName, setCompanyName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // 🔥 new: penanda edit
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(companies.length / itemsPerPage);
  const paginatedCompanies = companies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  // ✅ Tambah atau Edit
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editTarget) {
      await updateCompany(editTarget.id, { name: companyName });
      toast.success(`Company "${companyName}" berhasil diperbarui!`);
    } else {
      await addCompany(companyName);
      toast.success("Company berhasil ditambahkan!");
    }
    setCompanyName("");
    setEditTarget(null);
    setIsDialogOpen(false);
  } catch (err) {
    toast.error(editTarget ? "Gagal memperbarui company ❌" : "Gagal menambahkan company ❌");
  }
};

  // ✅ Buka dialog edit
  const openEditDialog = (company) => {
    setEditTarget(company);
    setCompanyName(company.name);
    setIsDialogOpen(true);
  };

  // ✅ Buka dialog tambah
  const openAddDialog = () => {
    setEditTarget(null);
    setCompanyName("");
    setIsDialogOpen(true);
  };

  // ✅ Hapus data
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await removeCompany(deleteTarget.id);
      toast.success(`Company "${deleteTarget.name}" berhasil dihapus ✅`);
      setDeleteTarget(null);
    } catch {
      toast.error("Gagal menghapus company ❌");
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Company</h1>
        <Button onClick={openAddDialog} className="bg-blue-600 hover:bg-blue-700 text-white">
          + Tambah Company
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 border border-red-300">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm bg-white">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border text-left font-semibold">No</th>
              <th className="p-3 border text-left font-semibold">Nama Company</th>
              <th className="p-3 border text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCompanies.map((company, index) => (
              <tr key={company.id} className="hover:bg-gray-50 transition">
                <td className="p-3 border text-gray-700">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-3 border text-gray-700">{company.name}</td>
                <td className="p-3 border text-center space-x-2">
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1.5"
                    onClick={() => openEditDialog(company)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5"
                    onClick={() => setDeleteTarget(company)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <div>
          Total Company: <strong>{companies.length}</strong>
        </div>

        <div className="flex justify-end items-center mt-5 space-x-3">
          <Button
            variant="outline"
            className="border border-gray-300 text-gray-700 hover:bg-gray-100"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Sebelumnya
          </Button>

          <span className="text-gray-600 text-sm">
            Halaman <strong>{currentPage}</strong> dari <strong>{totalPages || 1}</strong>
          </span>

          <Button
            variant="outline"
            className="border border-gray-300 text-gray-700 hover:bg-gray-100"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Selanjutnya
          </Button>
        </div>
      </div>

      {/* ✅ Dialog Tambah/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-xl transition-all duration-300">
          <DialogHeader>
            <DialogTitle>{editTarget ? "Edit Company" : "Tambah Company"}</DialogTitle>
            <DialogDescription>
              {editTarget
                ? "Ubah nama company yang sudah ada."
                : "Masukkan nama company yang ingin ditambahkan."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Company
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Contoh: PT Maju Jaya"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className={`text-white px-6 ${
                  editTarget
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {loading
                  ? "Menyimpan..."
                  : editTarget
                  ? "Simpan Perubahan"
                  : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ✅ Confirm Dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Konfirmasi Hapus"
        description={
          deleteTarget
            ? `Apakah Anda yakin ingin menghapus "${deleteTarget.name}"?`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
