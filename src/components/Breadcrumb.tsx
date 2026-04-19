"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const ROUTE_LABELS: Record<string, string> = {
  "/all-data": "All Data",
  "/coming-soon": "Coming Soon",
  "/not-found": "Page Not Found",
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Hide on home page
  if (pathname === "/") return null;

  const page = searchParams.get("page");
  const label = page ?? ROUTE_LABELS[pathname] ?? "Page";

  return (
    <div className="bg-[#fdb557]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 text-xs flex items-center gap-1.5">
        <Link href="/" className="text-gray-700 font-medium hover:text-gray-900 transition-colors">
          Home
        </Link>
        <span className="text-gray-600">›</span>
        <span className="text-gray-800 font-bold">{label}</span>
        <span className="text-gray-600">›</span>
      </div>
    </div>
  );
}
