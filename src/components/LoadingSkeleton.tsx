interface Props {
  viewMode?: "grid" | "list";
  count?: number;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="space-y-1.5">
        <div className="h-3 bg-gray-100 rounded" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="h-3 bg-gray-100 rounded w-4/6" />
      </div>
      <div className="flex gap-2 pt-2">
        <div className="h-5 w-12 bg-gray-100 rounded" />
        <div className="h-5 w-12 bg-gray-100 rounded" />
        <div className="h-5 w-12 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse space-y-3">
      <div className="h-5 bg-gray-200 rounded w-2/3" />
      <div className="flex gap-4">
        <div className="h-3 bg-gray-100 rounded w-24" />
        <div className="h-3 bg-gray-100 rounded w-20" />
        <div className="h-3 bg-gray-100 rounded w-28" />
      </div>
      <div className="h-3 bg-gray-100 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-4/5" />
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-gray-100 rounded-full" />
          <div className="h-5 w-16 bg-gray-100 rounded-full" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-12 bg-gray-100 rounded" />
          <div className="h-5 w-12 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ viewMode = "grid", count = 9 }: Props) {
  return (
    <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
      {Array.from({ length: count }).map((_, i) =>
        viewMode === "grid" ? <SkeletonCard key={i} /> : <SkeletonRow key={i} />
      )}
    </div>
  );
}
