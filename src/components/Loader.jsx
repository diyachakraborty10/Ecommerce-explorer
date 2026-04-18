// export default function Loader() {
//   return (
//     <div className="flex justify-center items-center h-40">
//       <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );
// }

export default function Loader() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">

      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-4 shadow-sm animate-pulse"
        >
          {/* Image skeleton */}
          <div className="h-28 bg-gray-200 rounded mb-4"></div>

          {/* Title skeleton */}
          <div className="h-4 bg-gray-200 rounded mb-2"></div>

          {/* Price skeleton */}
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}

    </div>
  );
}