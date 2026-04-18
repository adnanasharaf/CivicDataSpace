"use client";
import { useEffect, useState, useCallback } from "react";
import { Filter, X } from "lucide-react";
import { useAppSelector } from "@/src/hooks/redux";
import { fetchDatasets } from "@/src/lib/api";
import type { ApiResponse } from "@/src/types";
import SearchBar from "./SearchBar";
import ViewToggle from "./ViewToggle";
import SortDropdown from "./SortDropdown";
import FiltersSidebar from "./FiltersSidebar";
import DatasetCard from "./DatasetCard";
import DatasetRow from "./DatasetRow";
import Pagination from "./Pagination";
import LoadingSkeleton from "./LoadingSkeleton";
import { EmptyState, ErrorState } from "./States";

export default function DatasetListing() {
  const filters = useAppSelector((s) => s.app.filters);
  const viewMode = useAppSelector((s) => s.app.viewMode);

  const [data, setData] = useState<ApiResponse | null>(null);
  const [baseAggregations, setBaseAggregations] = useState<ApiResponse["aggregations"] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await fetchDatasets(filters);
      setData(result);
      setBaseAggregations((prev) => prev ?? result.aggregations);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-[#fdb557]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 text-xs flex items-center gap-1.5">
          <span className="text-gray-700 font-medium">Home</span>
          <span className="text-gray-600">›</span>
          <span className="text-gray-800 font-bold">All Data</span>
          <span className="text-gray-600">›</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Top bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="flex-1 min-w-0">
            <SearchBar />
          </div>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-600 shadow-sm flex-shrink-0 cursor-pointer"
          >
            <Filter size={16} />
            Filters
          </button>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <ViewToggle />
            <SortDropdown />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-20">
              <FiltersSidebar aggregations={baseAggregations} />
            </div>
          </aside>

          {/* Mobile filter drawer */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFilterOpen(false)} />
              <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl overflow-y-auto p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-800">Filters</h2>
                  <button onClick={() => setMobileFilterOpen(false)} className="cursor-pointer">
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
                <FiltersSidebar aggregations={baseAggregations} onClose={() => setMobileFilterOpen(false)} />
              </div>
            </div>
          )}

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-4">
            {loading ? (
              <LoadingSkeleton viewMode={viewMode} count={filters.size} />
            ) : error ? (
              <ErrorState onRetry={load} />
            ) : !data || data.results.length === 0 ? (
              <EmptyState />
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {data.results.map((d) => (
                  <DatasetCard key={d.id} dataset={d} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {data.results.map((d) => (
                  <DatasetRow key={d.id} dataset={d} />
                ))}
              </div>
            )}

            {!loading && !error && data && data.total > 0 && (
              <Pagination total={data.total} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
