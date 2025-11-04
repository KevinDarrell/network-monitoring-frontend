import React from "react";

export default function CompanyTable({ companies = [], onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[400px] border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-3 text-left font-semibold text-gray-700">ID</th>
            <th className="p-3 text-left font-semibold text-gray-700">Nama</th>
            <th className="p-3 text-left font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((company) => (
              <tr
                key={company.id}
                className="border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-3">{company.id}</td>
                <td className="p-3">{company.name}</td>
                <td className="p-3">
                  <button
                    onClick={() => onDelete(company.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-600 transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="p-3 text-center text-gray-500 italic"
              >
                Belum ada company.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
