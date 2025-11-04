// components/produksi/TimbanganList.jsx
import { Link } from 'react-router-dom';

export default function TimbanganList({ timbangans }) {
  if (timbangans.length === 0) {
    return <p className="text-center text-gray-500">Belum ada timbangan.</p>;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {timbangans.map(timbangan => (
        <li key={timbangan.id}>
          <Link
            to={`/produksi/view/${timbangan.id}?nama=${encodeURIComponent(timbangan.name)}`}
            className="flex items-center p-6 bg-white rounded-lg shadow-md border border-transparent hover:border-blue-500 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
          >
            <span className="text-3xl mr-5">⚖️</span>
            <span className="text-xl font-semibold text-gray-700">{timbangan.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
