export default function StatBox({ title, value }) {
  return (
    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
      <div className="text-sm text-gray-500 font-medium">{title}</div>
      <div className="text-3xl font-bold text-blue-600">{value ?? '...'}</div>
    </div>
  );
}