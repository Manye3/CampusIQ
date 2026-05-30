export default function CompareLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="h-8 w-56 bg-gray-200 rounded animate-pulse" />

      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-6 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>

        {/* Table rows */}
        {Array.from({ length: 10 }).map((_, row) => (
          <div
            key={row}
            className="grid grid-cols-4 gap-4 p-4 border-b border-gray-50"
          >
            {Array.from({ length: 4 }).map((_, col) => (
              <div
                key={col}
                className="h-4 bg-gray-200 rounded animate-pulse"
                style={{ width: `${60 + Math.round((col * 17 + row * 7) % 30)}%` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
