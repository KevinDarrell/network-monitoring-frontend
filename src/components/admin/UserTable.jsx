import React from "react";

export default function UserTable({ users, loading, onDelete }) {
  return (
    <>
      <h3 className="text-xl font-bold mb-4">Daftar User</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left font-semibold text-gray-600">ID</th>
              <th className="p-3 text-left font-semibold text-gray-600">Username</th>
              <th className="p-3 text-left font-semibold text-gray-600">Role</th>
              <th className="p-3 text-left font-semibold text-gray-600">Company</th>
              <th className="p-3 text-left font-semibold text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.companyName || "N/A"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => onDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-600 transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  {loading ? "Memuat..." : "Belum ada user."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
