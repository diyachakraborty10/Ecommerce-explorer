export default function Loader() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">

      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-4 shadow-sm animate-pulse"
        >
          
          <div className="h-28 bg-gray-200 rounded mb-4"></div>

          
          <div className="h-4 bg-gray-200 rounded mb-2"></div>

          
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}

    </div>
  );
}