// components/produksi/ProduksiHeader.jsx
export default function ProduksiHeader({ companyName, onLogout }) {
  return (
    <header className="bg-white p-6 rounded-lg shadow-md mb-8">
      <button
        onClick={onLogout}
        className="float-right text-red-500 font-medium hover:underline"
      >
        Logout
      </button>
      <h1 className="text-3xl font-bold text-gray-800">
        Pilih Timbangan {companyName && `- ${companyName}`}
      </h1>
    </header>
  );
}
