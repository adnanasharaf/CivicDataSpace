import { describe, it, expect } from "@jest/globals";
import reducer, {
  setFilters,
  setPage,
  setSize,
  setSort,
  setViewMode,
  resetFilters,
} from "@/src/store/appSlice";
import type { Filters } from "@/src/types";

const initialFilters: Filters = {
  query: "",
  Geography: "",
  sectors: "",
  tags: "",
  formats: "",
  page: 1,
  size: 9,
  sort: "recent",
  order: "desc",
};

const initialState = { filters: initialFilters, viewMode: "grid" as const };

describe("appSlice", () => {
  it("returns initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("setFilters updates filters and resets page to 1", () => {
    const state = reducer(initialState, setFilters({ query: "climate", page: 3 }));
    expect(state.filters.query).toBe("climate");
    expect(state.filters.page).toBe(1);
  });

  it("setPage updates page number", () => {
    const state = reducer(initialState, setPage(5));
    expect(state.filters.page).toBe(5);
  });

  it("setSize updates size and resets page to 1", () => {
    const prev = { ...initialState, filters: { ...initialFilters, page: 4 } };
    const state = reducer(prev, setSize(18));
    expect(state.filters.size).toBe(18);
    expect(state.filters.page).toBe(1);
  });

  it("setSort updates sort and order and resets page to 1", () => {
    const prev = { ...initialState, filters: { ...initialFilters, page: 3 } };
    const state = reducer(prev, setSort({ sort: "alphabetical", order: "asc" }));
    expect(state.filters.sort).toBe("alphabetical");
    expect(state.filters.order).toBe("asc");
    expect(state.filters.page).toBe(1);
  });

  it("setViewMode switches to list", () => {
    const state = reducer(initialState, setViewMode("list"));
    expect(state.viewMode).toBe("list");
  });

  it("resetFilters restores initial filters", () => {
    const modified = {
      ...initialState,
      filters: { ...initialFilters, query: "energy", sectors: "Climate", page: 4 },
    };
    const state = reducer(modified, resetFilters());
    expect(state.filters).toEqual(initialFilters);
  });

  it("setFilters merges partial updates without touching other fields", () => {
    const prev = { ...initialState, filters: { ...initialFilters, sectors: "Climate" } };
    const state = reducer(prev, setFilters({ tags: "solar" }));
    expect(state.filters.sectors).toBe("Climate");
    expect(state.filters.tags).toBe("solar");
  });
});
