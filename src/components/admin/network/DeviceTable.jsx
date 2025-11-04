import React from "react";

export default function DeviceTable({ devices, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[400px]">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3">ID</th>
            <th className="p-3">Nama</th>
            <th className="p-3">IP</th>
            <th className="p-3">Tipe</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {devices.length > 0 ? devices.map(d => (
            <tr key={d.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{d.id}</td>
              <td className="p-3">{d.name}</td>
              <td className="p-3">{d.ipAddress}</td>
              <td className="p-3">{d.type}</td>
              <td className="p-3 space-x-2">
                <button onClick={() => onEdit(d)} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">Edit</button>
                <button onClick={() => onDelete(d)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Hapus</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" className="p-3 text-center text-gray-500">Belum ada device.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
