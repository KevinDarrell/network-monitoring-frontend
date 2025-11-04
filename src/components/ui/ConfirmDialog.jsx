import React, { useEffect } from "react";

export default function ConfirmDialog({
  open,
  title = "Konfirmasi",
  description = "Apakah Anda yakin ingin melanjutkan tindakan ini?",
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ pointerEvents: "auto" }}
      onClick={onCancel}
    >
      {/* Overlay dengan animasi smooth */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out"
        style={{ pointerEvents: "auto" }}
      />

      {/* Konten Modal dengan animasi smooth */}
      <div
        className="relative z-[10000] bg-white rounded-2xl shadow-2xl w-[380px] p-6 transform transition-all duration-300 ease-out scale-100 animate-fadeIn"
        style={{ pointerEvents: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          {/* Tombol Batal (putih) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
            className="px-4 py-2 text-sm rounded-lg bg-gray-500 text-white hover:bg-gray-600 active:scale-[0.98] transition-all duration-200"
            style={{ pointerEvents: "auto" }}
          >
            Batal
          </button>

          {/* Tombol Hapus */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] transition-all duration-200"
            style={{ pointerEvents: "auto" }}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
