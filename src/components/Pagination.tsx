"use client";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { setPage, setSize } from "@/src/store/appSlice";

const SIZE_OPTIONS = [9, 18, 36];

export default function Pagination({ total }: { total: number }) {
  const dispatch = useAppDispatch();
  const { page, size } = useAppSelector((s) => s.app.filters);

  useEffect(() => {
    if (!SIZE_OPTIONS.includes(size)) {
      dispatch(setSize(9));
    }
  }, [size, dispatch]);

  const totalPages = Math.max(1, Math.ceil(total / size));

  const go = (p: number) => {
    if (p >= 1 && p <= totalPages) dispatch(setPage(p));
  };

  const navBtn = (onClick: () => void, disabled: boolean, children: React.ReactNode, label: string) => (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`w-7 h-7 flex items-center justify-center rounded border text-xs transition-colors ${
        disabled
          ? "border-gray-200 dark:border-slate-700 text-gray-300 dark:text-slate-600 cursor-not-allowed"
          : "border-gray-300 dark:border-slate-600 text-gray-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-400 hover:text-blue-600 cursor-pointer"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center justify-end gap-4 px-5 py-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm text-sm text-gray-600 dark:text-slate-400">
      {/* Rows per page */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 dark:text-slate-400">Rows per page</span>
        <div className="relative">
          <select
            value={size}
            onChange={(e) => dispatch(setSize(Number(e.target.value)))}
            className="appearance-none pl-2 pr-6 py-1 border border-gray-300 dark:border-slate-600 rounded text-xs focus:outline-none bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300 cursor-pointer"
            aria-label="Rows per page"
          >
            {SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>{String(s).padStart(2, "0")}</option>
            ))}
          </select>
          <ChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
        </div>
      </div>

      {/* Page info */}
      <span className="text-xs text-gray-700 dark:text-slate-200">
        Page{" "}
        <strong className="font-semibold" style={{ color: "inherit" }}>{String(page).padStart(2, "0")}</strong>
        {" "}of{" "}
        <strong className="font-semibold" style={{ color: "inherit" }}>{String(totalPages).padStart(2, "0")}</strong>
      </span>

      {/* Nav buttons */}
      <div className="flex items-center gap-1">
        {navBtn(() => go(1), page === 1, <ChevronsLeft size={13} className="text-[#194C71] dark:text-slate-300"/>, "First page")}
        {navBtn(() => go(page - 1), page === 1, <ChevronLeft size={13} className="text-[#194C71] dark:text-slate-300"/>, "Previous page")}
        {navBtn(() => go(page + 1), page === totalPages, <ChevronRight size={13} className="text-[#194C71] dark:text-slate-300"/>, "Next page")}
        {navBtn(() => go(totalPages), page === totalPages, <ChevronsRight size={13} className="text-[#194C71] dark:text-slate-300"/>, "Last page")}
      </div>
    </div>
  );
}
