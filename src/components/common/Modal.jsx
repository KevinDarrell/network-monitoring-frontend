import React from 'react';

/**
 * Komponen Modal Pop-up generik.
 * @param {boolean} isOpen - Tampilkan atau sembunyikan modal
 * @param {function} onClose - Fungsi yang dipanggil saat backdrop atau tombol X diklik
 * @param {string} title - Judul modal
 */
export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null; // Jangan render apapun jika ditutup

  return (
    // Backdrop (overlay)
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose} // Klik di luar modal akan menutup
    >
      {/* Konten Modal */}
      <div 
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutup modal
      >
        {/* Header Modal */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none"
            aria-label="Tutup modal"
          >
            &times;
          </button>
        </div>
        
        {/* Body Modal (diisi oleh children) */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}