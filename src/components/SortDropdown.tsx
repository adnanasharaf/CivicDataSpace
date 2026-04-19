"use client";

import { ChevronDown, ArrowUpDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { setSort } from "@/src/store/appSlice";
import type { Filters } from "@/src/types";

const OPTIONS: {
  label: string;
  sort: Filters["sort"];
  defaultOrder: Filters["order"];
}[] = [
  { label: "Latest Updated", sort: "recent", defaultOrder: "desc" },
  { label: "A → Z", sort: "alphabetical", defaultOrder: "asc" },
];

export default function SortDropdown() {
  const dispatch = useAppDispatch();
  const { sort, order } = useAppSelector((s) => s.app.filters);
  const [flipped, setFlipped] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleSortOrder = () => {
    setFlipped((f) => !f);
    dispatch(setSort({ sort, order: order === "desc" ? "asc" : "desc" }));
  };

  const selected = OPTIONS.find((o) => o.sort === sort)!;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleSortOrder}
        className="flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-[#1a3a5c] transition-colors cursor-pointer"
      >
        <ArrowUpDown
          size={16}
          className={`transition-transform duration-200 text-[#1a3a5c] ${
            flipped ? "rotate-180" : ""
          }`}
        />
      </button>

      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className={`flex items-center gap-2 pl-3 pr-2.5 py-2 text-sm font-medium rounded-md border transition-colors bg-white dark:bg-slate-800 cursor-pointer ${
            open
              ? "border-[#1a3a5c] text-[#1a3a5c] dark:border-[#84DCCF] dark:text-[#84DCCF]"
              : "border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:border-[#1a3a5c]"
          }`}
        >
          {selected.label}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 text-[#1a3a5c] ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-1 w-44 rounded-md border border-[#1a3a5c]/20 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-lg z-50 overflow-hidden">
            {OPTIONS.map((o) => (
              <button
                key={o.sort}
                onClick={() => {
                  dispatch(setSort({ sort: o.sort, order: o.defaultOrder }));
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                  o.sort === sort
                    ? "bg-[#1a3a5c] text-white font-medium"
                    : "text-gray-700 dark:text-slate-300 hover:bg-[#e8f0f7] dark:hover:bg-slate-700 hover:text-[#1a3a5c]"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}