"use client";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { setFilters, resetFilters } from "@/src/store/appSlice";
import type { Aggregations } from "@/src/types";



interface SectionProps {
  title: string;
  count?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, count, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 bg-[#e8f0f7] dark:bg-[#1e3a52] text-sm font-semibold text-gray-700 dark:text-slate-200 cursor-pointer"
      >
        <span>{title}{count !== undefined ? ` (${count})` : ""}</span>
        {open
          ? <span className="text-gray-500 font-bold text-base leading-none">—</span>
          : <ChevronDown size={15} className="text-gray-500" />
        }
      </button>
      {open && <div className="px-3 py-2 max-h-44 overflow-y-auto">{children}</div>}
    </div>
  );
}

function CheckboxItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 py-1 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-3.5 h-3.5 rounded-sm accent-[#B17F3D] cursor-pointer"
      />
      <span className="text-sm text-gray-600 dark:text-slate-300 flex-1 truncate" title={label}>{label}</span>
    </label>
  );
}

interface Props {
  aggregations?: Aggregations;
  onClose?: () => void;
}

type FilterField = "sectors" | "tags" | "formats" | "Geography";

export default function FiltersSidebar({ aggregations, onClose }: Props) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.app.filters);

  const toggle = (field: FilterField, value: string) => {
    const current = filters[field];
    const values: string[] = current ? current.split(",").filter(Boolean) : [];
    const next = values.includes(value) ? values.filter((v) => v !== value) : [...values, value];
    dispatch(setFilters({ [field]: next.join(",") }));
  };

  const isChecked = (field: FilterField, value: string) => {
    const current = filters[field] || "";
    return current.split(",").includes(value);
  };

  const sectors = aggregations?.sectors ? Object.entries(aggregations.sectors).sort(([a], [b]) => a.localeCompare(b)) : [];
  const tags = aggregations?.tags ? Object.entries(aggregations.tags).sort(([a], [b]) => a.localeCompare(b)) : [];
  const formats = aggregations?.formats ? Object.entries(aggregations.formats).sort(([a], [b]) => a.localeCompare(b)) : [];
  const geos = aggregations?.Geography ? Object.entries(aggregations.Geography).sort(([a], [b]) => a.localeCompare(b)) : [];

  const hasActiveFilters = filters.sectors || filters.tags || filters.formats || filters.Geography;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-4 space-y-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[16px] font-bold text-[#194c71] tracking-widest uppercase">Filters</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={() => dispatch(resetFilters())}
              className="text-sm text-[#B17F3D] font-bold tracking-wide hover:opacity-80 cursor-pointer"
            >
              RESET
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 md:hidden">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <Section title="Sectors" count={sectors.length || 5} defaultOpen={true}>
        {sectors.length > 0
          ? sectors.map(([name]) => (
              <CheckboxItem key={name} label={name} checked={isChecked("sectors", name)} onChange={() => toggle("sectors", name)} />
            ))
          : ["Biodiversity Conservati...", "Climate Finance", "Climate and Health", "Disaster Risk Reductio...", "Energy Transition"].map((s) => (
              <CheckboxItem key={s} label={s} checked={isChecked("sectors", s)} onChange={() => toggle("sectors", s)} />
            ))
        }
      </Section>

      <Section title="Data Type" count={formats.length || 4} defaultOpen={true}>
        {formats.length > 0
          ? formats.map(([name]) => (
              <CheckboxItem key={name} label={name} checked={isChecked("formats", name)} onChange={() => toggle("formats", name)} />
            ))
          : ["CSV", "GeoJSON", "XLS", "API"].map((f) => (
              <CheckboxItem key={f} label={f} checked={isChecked("formats", f)} onChange={() => toggle("formats", f)} />
            ))
        }
      </Section>

      <Section title="Tags" count={tags.length || 30} defaultOpen={false}>
        {tags.length > 0
          ? tags.map(([name]) => (
              <CheckboxItem key={name} label={name} checked={isChecked("tags", name)} onChange={() => toggle("tags", name)} />
            ))
          : <p className="text-xs text-gray-400 py-1">No tags available</p>
        }
      </Section>

      <Section title="Geographies" count={geos.length || 15} defaultOpen={false}>
        {geos.length > 0
          ? geos.map(([name]) => (
              <CheckboxItem key={name} label={name} checked={isChecked("Geography", name)} onChange={() => toggle("Geography", name)} />
            ))
          : ["Assam", "India", "Bangkok", "Philippines"].map((g) => (
              <CheckboxItem key={g} label={g} checked={isChecked("Geography", g)} onChange={() => toggle("Geography", g)} />
            ))
        }
      </Section>
    </div>
  );
}
