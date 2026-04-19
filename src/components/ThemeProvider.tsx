"use client";
import { useEffect } from "react";
import { useAppSelector } from "@/src/hooks/redux";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector((s) => s.app.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
}
