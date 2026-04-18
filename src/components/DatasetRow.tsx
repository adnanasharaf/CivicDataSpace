import {
  Calendar,
  Download,
  Globe,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import type { Dataset } from "@/src/types";
import Image from "next/image";
import Link from "next/link";

const FORMAT_COLORS: Record<string, string> = {
  CSV: "bg-[#1d7f5f]",
  XLS: "bg-[#1d7f5f]",
  XLSX: "bg-[#1d7f5f]",
  JSON: "bg-[#e67e22]",
  GEOJSON: "bg-[#e67e22]",
  API: "bg-[#e67e22]",
  PDF: "bg-[#d94b3d]",
  ZIP: "bg-[#d94b3d]",
};

const TAG_COLORS = [
  "bg-[#6ec5b8]",
  "bg-[#4fa38b]",
  "bg-[#68b9cb]",
  "bg-[#5da59d]",
  "bg-[#79c0a9]",
];

function formatDate(raw?: string) {
  if (!raw) return "";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;

  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function DatasetRow({
  dataset,
}: {
  dataset: Dataset;
}) {
  const date = formatDate(dataset.modified);
  const geo = dataset.geographies?.join(", ") ?? "";
  const downloads = dataset.download_count ?? 0;
  const displayDownloads = downloads >= 500 ? "500+" : String(downloads);
  const url = `https://civicdataspace.in/datasets/${dataset.id}`;

  return (
    <Link href={url} target="_blank" className="block group">
      <article className="w-full rounded-[12px] border border-[#dfe5ea] bg-white px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:shadow-md">
        {/* Title */}
        <h3 className="text-[16px] font-semibold leading-[18px] text-[#1a6fa8] group-hover:text-[#1f5f82]">
          {dataset.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-[14px] leading-[18px] text-[#666] line-clamp-2">
          {stripHtml(dataset.description || "")}
        </p>

        {/* Meta */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#6f6f6f]">
          {date && (
            <div className="flex items-center gap-1">
              <Calendar size={12} className="text-[#d28d26]" />
              <span>Last Updated :</span>
              <span className="font-medium text-[#555]">{date}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Download size={12} className="text-[#d28d26]" />
            <span>Downloads :</span>
            <span className="font-medium text-[#555]">{displayDownloads}</span>
          </div>

          {geo && (
            <div className="flex items-center gap-1">
              <Globe size={12} className="text-[#d28d26]" />
              <span>Geography :</span>
              <span className="font-medium text-[#555]">{geo}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <ChartNoAxesColumnIncreasing
              size={12}
              className="text-[#d28d26]"
              strokeWidth={2.3}
            />
            <span>With Charts</span>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          {/* Left Side */}
          <div className="space-y-2">
            {/* Sectors */}
            <div className="flex items-center gap-2 text-[11px] text-[#777]">
              <span>Sectors :</span>
               <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white" title={dataset.organization?.name ?? dataset.user?.name}>
                  <Image alt="Logo" className="h-6 w-6 object-contain" src="/assets/Disaster Risk Reduction.svg" width={24} height={24} />
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              {dataset.tags?.length > 0 && (
                <span className="text-[11px] text-[#777]">Tags :</span>
              )}

              {dataset.tags?.slice(0, 5).map((tag, i) => (
                <span
                  key={tag}
                  className={`rounded-[3px] px-2 py-[2px] text-[10px] font-medium text-white ${
                    TAG_COLORS[i % TAG_COLORS.length]
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-2 text-right">
            {/* Published by */}
            <div className="flex items-center justify-end gap-2 text-[11px] text-[#777]">
              <span>Published by :</span>

              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#e5e5e5] bg-white">
                <Image
                  src="/assets/CDL_Primary_Logo.png"
                  alt="logo"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </span>
            </div>

            {/* Formats */}
            {dataset.formats?.length > 0 && (
              <div className="flex items-center justify-end gap-1.5">
                <span className="text-[11px] text-[#777]">Formats :</span>

                {dataset.formats.map((item) => (
                  <span
                    key={item}
                    className={`rounded-[3px] px-1.5 py-[2px] text-[9px] font-bold text-white ${
                      FORMAT_COLORS[item.toUpperCase()] ?? "bg-gray-500"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}