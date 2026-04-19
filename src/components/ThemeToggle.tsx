"use client";
import { Sun, Moon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { setTheme } from "@/src/store/appSlice";

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.app.theme);
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => dispatch(setTheme(isDark ? "light" : "dark"))}
      className="p-2 text-gray-300 hover:text-white cursor-pointer transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
