"use client";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { setViewMode } from "@/src/store/appSlice";
import type { ViewMode } from "@/src/types";

export default function ViewToggle() {
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector((s) => s.app.viewMode);

  return (
    <div className="flex items-center gap-1">
      {/* Grid: 4 squares */}
      <button
        onClick={() => dispatch(setViewMode("grid" as ViewMode))}
        aria-label="Grid view"
        className="p-1.5 cursor-pointer"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="2" width="8" height="8" rx="1" fill={viewMode === "grid" ? "#1a3a5c" : "#9ca3af"} />
          <rect x="12" y="2" width="8" height="8" rx="1" fill={viewMode === "grid" ? "#1a3a5c" : "#9ca3af"} />
          <rect x="2" y="12" width="8" height="8" rx="1" fill={viewMode === "grid" ? "#1a3a5c" : "#9ca3af"} />
          <rect x="12" y="12" width="8" height="8" rx="1" fill={viewMode === "grid" ? "#1a3a5c" : "#9ca3af"} />
        </svg>
      </button>

      {/* List: 3 horizontal lines */}
      <button
        onClick={() => dispatch(setViewMode("list" as ViewMode))}
        aria-label="List view"
        className="p-1.5 cursor-pointer"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="3" width="18" height="4" rx="1" fill={viewMode === "list" ? "#1a3a5c" : "#9ca3af"} />
          <rect x="2" y="9" width="18" height="4" rx="1" fill={viewMode === "list" ? "#1a3a5c" : "#9ca3af"} />
          <rect x="2" y="15" width="18" height="4" rx="1" fill={viewMode === "list" ? "#1a3a5c" : "#9ca3af"} />
        </svg>
      </button>
    </div>
  );
}
