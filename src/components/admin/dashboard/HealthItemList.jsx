export default function HealthItemList({ companies }) {
  if (!companies) return <p className="text-gray-500">Memuat status company...</p>;

  const companyNames = Object.keys(companies);
  if (companyNames.length === 0)
    return <p className="text-gray-500">Belum ada company/timbangan yang dimonitor.</p>;

  return (
    <div className="space-y-4">
      {companyNames.map((companyName) => (
        <div key={companyName}>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-1 mb-2">
            {companyName}
          </h3>
          <div className="space-y-1 pl-4">
            {Object.values(companies[companyName]).map((timbangan) => {
              let statusText = '';
              let statusClass = '';

              if (timbangan.total === 0) {
                statusText = '(Belum ada device)';
                statusClass = 'text-gray-400';
              } else if (timbangan.down > 0) {
                statusText = `(${timbangan.up} AKTIF, ${timbangan.down} MATI)`;
                statusClass =
                  timbangan.up > 0 ? 'text-yellow-600' : 'text-red-600';
              } else {
                statusText = `(${timbangan.total} Device) - SEMUA AKTIF`;
                statusClass = 'text-green-600';
              }

              return (
                <div key={timbangan.timbanganName}>
                  <strong>{timbangan.timbanganName}:</strong>
                  <span className={`font-medium ml-2 ${statusClass}`}>
                    {statusText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}