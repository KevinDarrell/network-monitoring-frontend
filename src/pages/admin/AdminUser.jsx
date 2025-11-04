import React, { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export default function AdminUser() {
  const { users, companies, loading, error, addUser, removeUser } = useUsers();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_PRODUKSI");
  const [companyId, setCompanyId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role === "ROLE_PRODUKSI" && !companyId) {
      toast.error('User dengan Role "Produksi" harus memilih Company.');
      return;
    }

    setFormLoading(true);
    try {
      await addUser({ username, password, role, companyId: role === "ROLE_ADMIN" ? null : companyId });
      toast.success("User berhasil ditambahkan!");
      setIsDialogOpen(false);
      setUsername("");
      setPassword("");
      setRole("ROLE_PRODUKSI");
      setCompanyId("");
    } catch {
      toast.error("Gagal menambahkan user.");
    } finally {
      setFormLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await removeUser(deleteTarget.id);
      toast.success(`User "${deleteTarget.username}" berhasil dihapus ✅`);
      setDeleteTarget(null);
    } catch {
      toast.error("Gagal menghapus user ❌");
    }
  };

  return (
    <div className="p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen User</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Kelola data user dan akses sistem produksi Anda
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md mt-4 sm:mt-0 px-4 py-2">
              + Tambah User
            </Button>
          </DialogTrigger>

          {/* === FORM DIALOG === */}
          <DialogContent className="sm:max-w-lg rounded-2xl shadow-2xl bg-white p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-800 text-center">
                Tambah User Baru
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Minimal 6 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="ROLE_PRODUKSI">Produksi</option>
                    <option value="ROLE_ADMIN">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <select
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    disabled={role === "ROLE_ADMIN"}
                  >
                    <option value="">-- Pilih Company --</option>
                    {Array.isArray(companies) &&
                      companies.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all"
                  disabled={formLoading}
                >
                  {formLoading ? "Menyimpan..." : "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 border border-red-300">
          {error}
        </div>
      )}

      {/* Tabel User */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-md overflow-hidden">
  <table className="w-full text-sm text-gray-700">
    <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800">
      <tr>
        <th className="p-4 text-left font-semibold border-b border-gray-200">No</th>
        <th className="p-4 text-left font-semibold border-b border-gray-200">Username</th>
        <th className="p-4 text-left font-semibold border-b border-gray-200">Role</th>
        <th className="p-4 text-left font-semibold border-b border-gray-200">Company</th>
        <th className="p-4 text-center font-semibold border-b border-gray-200">Aksi</th>
      </tr>
    </thead>
    <tbody>
      {loading ? (
        <tr>
          <td colSpan="5" className="text-center py-6 text-gray-500 italic">
            Memuat data...
          </td>
        </tr>
      ) : paginatedUsers.length > 0 ? (
        paginatedUsers.map((u, i) => (
          <tr
            key={u.id}
            className={`transition-all duration-200 ${
              i % 2 === 0 ? "bg-white" : "bg-gray-50"
            } hover:bg-blue-50/70`}
          >
            <td className="p-4 border-b border-gray-200 text-gray-800">{(currentPage - 1) * itemsPerPage + i + 1}</td>
            <td className="p-4 border-b border-gray-200 font-medium text-gray-900">{u.username}</td>
            <td className="p-4 border-b border-gray-200">
              {u.role === "ROLE_ADMIN" ? (
                <span className="px-2.5 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full shadow-sm">
                  Admin
                </span>
              ) : (
                <span className="px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full shadow-sm">
                  Produksi
                </span>
              )}
            </td>
            <td className="p-4 border-b border-gray-200 text-gray-700">
              {u.companyName || "-"}
            </td>
            <td className="p-4 border-b border-gray-200 text-center">
              <button
                onClick={() => setDeleteTarget(u)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 text-sm rounded-lg shadow-sm transition-all hover:shadow-md"
              >
                Hapus
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center py-6 text-gray-500 italic">
            Tidak ada data user.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <div>
          Total User: <strong>{users.length}</strong>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Sebelumnya
          </Button>
          <span>
            Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong>
          </span>
          <Button
            variant="outline"
            className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Selanjutnya
          </Button>
        </div>
      </div>

      {/* Dialog Konfirmasi Hapus */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Konfirmasi Hapus"
        description={
          deleteTarget
            ? `Apakah Anda yakin ingin menghapus user "${deleteTarget.username}"?`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
