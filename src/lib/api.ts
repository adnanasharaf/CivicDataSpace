import type { ApiResponse, Filters } from "@/src/types";

const BASE_URL = "https://api.datakeep.civicdays.in/api/search/dataset/";

export async function fetchDatasets(filters: Partial<Filters>): Promise<ApiResponse> {
  const params = new URLSearchParams();
  if (filters.query) params.set("query", filters.query);
  if (filters.Geography) params.set("geographies", filters.Geography);
  if (filters.sectors) params.set("sectors", filters.sectors);
  if (filters.tags) params.set("tags", filters.tags);
  if (filters.formats) params.set("formats", filters.formats);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.size) params.set("size", String(filters.size));
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.order) params.set("order", filters.order);

  const res = await fetch(`${BASE_URL}?${params.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  // Normalize aggregation key: API returns "geographies", our type uses "Geography"
  if (json.aggregations?.geographies && !json.aggregations.Geography) {
    json.aggregations.Geography = json.aggregations.geographies;
  }
  return json;
}
