import { SearchX, RefreshCw } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <SearchX size={48} className="text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-gray-600 dark:text-slate-300 mb-2">No datasets found</h3>
      <p className="text-sm text-gray-400 dark:text-slate-500 max-w-xs">
        Try adjusting your search or filters to find what you&apos;re looking for.
      </p>
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <RefreshCw size={28} className="text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-300 mb-2">Something went wrong</h3>
      <p className="text-sm text-gray-400 dark:text-slate-500 mb-5 max-w-xs">
        We couldn&apos;t load the datasets. Please check your connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <RefreshCw size={14} />
        Retry
      </button>
    </div>
  );
}
