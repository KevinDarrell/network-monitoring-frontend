export default function HealthItemSAP({ status }) {
  const isUp = status === 'UP';
  const isLoading = status == null;
  const isError = status === 'ERROR';

  return (
    <div className="flex items-center text-lg">
      <strong className="mr-3">Server SAP Pusat:</strong>
      {isLoading && <span className="font-bold text-gray-500">Memuat...</span>}
      {isError && <span className="font-bold text-red-500">Gagal terhubung ke Pinger</span>}
      {!isError && status && (
        <span className={`font-bold ${isUp ? 'text-green-600' : 'text-red-600'}`}>
          ● {isUp ? 'AKTIF' : 'MATI'}
        </span>
      )}
    </div>
  );
}