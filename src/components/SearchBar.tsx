"use client";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { setFilters } from "@/src/store/appSlice";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const query = useAppSelector((s) => s.app.filters.query);
  const [input, setInput] = useState(query);
  const debounced = useDebounce(input, 400);

  useEffect(() => {
    dispatch(setFilters({ query: debounced }));
  }, [debounced, dispatch]);

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Start typing to search for any Dataset"
        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm"
        aria-label="Search datasets"
      />
    </div>
  );
}
