import { Calendar, Download, Globe, ChartNoAxesColumnIncreasing  } from "lucide-react";
import type { Dataset } from "@/src/types";
import Image from "next/image";
import Link from "next/link";

function formatDate(raw?: string): string {
  if (!raw) return "";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

export default function DatasetCard({ dataset }: { dataset: Dataset }) {
  const date = formatDate(dataset.modified);
  const geo = dataset.geographies?.[0] ?? "";
  const downloads = dataset.download_count ?? 0;
  const displayDownloads = downloads >= 500 ? "500+" : String(downloads);
  const url = `https://civicdataspace.in/datasets/${dataset.id}`;

  return (
    <Link href={url} className="h-full block group" target="_blank">
      <article className="bg-white rounded-xl border border-gray-200 shadow-sm group-hover:shadow-md transition-all p-5 flex flex-col gap-3 cursor-pointer min-h-[220px] h-full">
        {/* Title */}
        <h3 className="text-[#1a6fa8] font-semibold text-[16px] leading-snug line-clamp-3">
          {dataset.title}
        </h3>

        {/* Meta row */}
        <div className="flex flex-wrap justify-between items-center gap-x-3 gap-y-1 text-xs text-gray-500">
          {date && (
            <span className="flex items-center gap-1 font-medium">
              <Calendar size={16} className="text-[#B17F3D] group-hover:text-[#8f642f]" />
              <span className="truncate max-w-[80px]">{date}</span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <Download size={16} className="text-[#B17F3D] group-hover:text-[#8f642f]" />
            <span className="truncate max-w-[80px]">{displayDownloads}</span>
          </span>
          {geo && (
            <span className="flex items-center gap-1">
              <Globe size={16} className="text-[#B17F3D] group-hover:text-[#8f642f]" />
              <span className="truncate max-w-[80px]">{geo}</span>
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1 border-t border-gray-300 pt-2">
          {stripHtml(dataset.description || "")}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 mt-auto">
          <div className="flex items-center gap-2">
            {/* Cloud download icon */}
            <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200">
             <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white" title={dataset.organization?.name ?? dataset.user?.name}>
              <Image alt="Logo" className="h-6 w-6 object-contain" src="/assets/Disaster Risk Reduction.svg" width={24} height={24} />
             </span>
            </div>
            {/* Bar chart icon */}
            <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200">
              <ChartNoAxesColumnIncreasing  className="w-4 h-4 text-[#E8A838]" strokeWidth={2.5} />
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>published by</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white" title={dataset.organization?.name ?? dataset.user?.name}>
              <Image alt="Logo" className="h-6 w-6 object-contain" src="/assets/CDL_Primary_Logo.png" width={24} height={24} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
