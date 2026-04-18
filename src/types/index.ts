export interface Dataset {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  sectors: string[];
  formats: string[];
  geographies: string[];
  organization: { name: string; logo: string } | null;
  user: { name: string; bio: string; profile_picture: string };
  metadata: { metadata_item: { label: string }; value: string }[];
  modified?: string;
  download_count?: number;
  has_charts?: boolean;
  trending_score?: number;
}

export interface Aggregations {
  Geography: Record<string, number>;
  sectors: Record<string, number>;
  tags: Record<string, number>;
  formats: Record<string, number>;
  geographies: Record<string, number>;
}

export interface ApiResponse {
  results: Dataset[];
  total: number;
  aggregations: Aggregations;
}

export interface Filters {
  query: string;
  Geography: string;
  sectors: string;
  tags: string;
  formats: string;
  page: number;
  size: number;
  sort: "recent" | "alphabetical";
  order: "asc" | "desc";
}

export type ViewMode = "grid" | "list";
