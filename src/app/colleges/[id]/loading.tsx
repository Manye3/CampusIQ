export default function CollegeDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero */}
      <div className="h-48 w-full bg-gray-200 rounded-xl animate-pulse" />

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl bg-white shadow-sm p-5 space-y-3"
          >
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-4 border-b border-gray-200 pb-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-24 bg-gray-200 rounded animate-pulse"
          />
        ))}
      </div>

      {/* Content area */}
      <div className="space-y-4">
        <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
