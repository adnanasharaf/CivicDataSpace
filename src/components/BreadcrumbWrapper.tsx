"use client";

import { usePathname } from "next/navigation";
import Breadcrumb from "./Breadcrumb";

export default function BreadcrumbWrapper() {
  const pathname = usePathname();

  // Don't render breadcrumbs on the root path or for the not-found page during build
  if (pathname === "/" || !pathname) {
    return null;
  }

  return <Breadcrumb />;
}