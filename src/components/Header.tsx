"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import ThemeToggle from "@/src/components/ThemeToggle";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { setFilters } from "@/src/store/appSlice";
import { useDebounce } from "@/src/hooks/useDebounce";

const NAV_LINKS = ["ALL DATA", "SECTORS", "USE CASES", "PUBLISHERS", "ABOUT US"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const query = useAppSelector((s) => s.app.filters.query);
  const debounced = useDebounce(input, 400);

  useEffect(() => {
    dispatch(setFilters({ query: debounced }));
  }, [debounced, dispatch]);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
      mobileInputRef.current?.focus();
    } else {
      setInput("");
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!query) setInput("");
  }, [query]);

  const closeAll = () => { setOpen(false); setSearchOpen(false); };

  return (
    <header className="bg-[#1a3a5c] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 min-w-0">
          <Image alt="Logo" className="h-8 w-8 object-contain flex-shrink-0" src="/assets/brandlogo.png" width={100} height={100} />
          <span className="text-white text-sm sm:text-base font-semibold truncate">CivicDataSpace</span>
        </Link>

        {/* Desktop Nav — only on lg+ */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-end">
          {/* Expanding search */}
          <div className={`flex items-center transition-all duration-300 overflow-hidden ${
            searchOpen ? "w-60 xl:w-72" : "w-9"
          }`}>
            {searchOpen ? (
              <div className="flex items-center w-full bg-[#2a4a6c] rounded-md px-2 py-1.5 gap-1">
                <Search size={14} className="text-gray-300 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Search datasets..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none min-w-0"
                />
                <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-white cursor-pointer flex-shrink-0">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-300 hover:text-white cursor-pointer"
                aria-label="Open search"
              >
                <Search size={18} />
              </button>
            )}
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link}
              href="#"
              className={`px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${
                link === "ALL DATA" ? "text-[#84DCCF]" : "text-gray-200 hover:text-white"
              }`}
            >
              {link}
            </Link>
          ))}
          <Link
            href="#"
            className="ml-2 xl:ml-3 px-3 xl:px-4 py-2 rounded-md text-[#11181C] bg-[#84DCCF] hover:bg-[#6fcbbf] transition-colors text-xs xl:text-sm font-semibold whitespace-nowrap"
          >
            LOGIN / SIGN UP
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile / Tablet right side — below lg */}
        <div className="lg:hidden flex items-center gap-0.5 flex-shrink-0">
          <ThemeToggle />
          <button
            onClick={() => { setSearchOpen((s) => !s); setOpen(false); }}
            className="p-2 text-gray-300 hover:text-white cursor-pointer"
            aria-label="Toggle search"
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>
          <button
            className="p-2 text-white rounded-md hover:bg-[#2a4a6c] transition-colors cursor-pointer"
            onClick={() => { setOpen((o) => !o); setSearchOpen(false); }}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet search bar */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
        searchOpen ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="bg-[#152f4e] px-4 py-2.5">
          <div className="flex items-center bg-[#2a4a6c] rounded-md px-3 py-2 gap-2">
            <Search size={15} className="text-gray-400 flex-shrink-0" />
            <input
              ref={mobileInputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search datasets..."
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
            />
            {input && (
              <button onClick={() => setInput("")} className="text-gray-400 hover:text-white cursor-pointer">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="bg-[#152f4e] border-t border-[#2a4a6c] px-4 pt-2 pb-5">
          {/* Tablet: 2-col grid, Mobile: single col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                href="#"
                onClick={closeAll}
                className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  link === "ALL DATA"
                    ? "text-[#84DCCF] bg-[#1a3a5c]"
                    : "text-gray-300 hover:text-white hover:bg-[#1a3a5c]"
                }`}
              >
                {link}
              </Link>
            ))}
          </div>
          <div className="pt-3">
            <Link
              href="#"
              onClick={closeAll}
              className="flex items-center justify-center w-full py-3 rounded-lg bg-[#84DCCF] text-[#11181C] text-sm font-bold hover:bg-[#6fcbbf] transition-colors"
            >
              LOGIN / SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
