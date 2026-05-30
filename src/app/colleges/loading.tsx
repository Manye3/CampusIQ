function SkeletonCard() {
  return (
    <div className="rounded-xl bg-white shadow-sm overflow-hidden">
      <div className="h-40 bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-2 pt-1">
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-14 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function CollegesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 space-y-2">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-72 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
