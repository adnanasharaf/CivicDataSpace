import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Filters, ViewMode, Theme } from "@/src/types";

interface AppState {
  filters: Filters;
  viewMode: ViewMode;
  theme: Theme;
}

const initialState: AppState = {
  filters: {
    query: "",
    Geography: "",
    sectors: "",
    tags: "",
    formats: "",
    page: 1,
    size: 9,
    sort: "recent",
    order: "desc",
  },
  viewMode: "grid",
  theme: "light",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = { ...state.filters, ...action.payload, page: 1 };
    },
    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },
    setSize(state, action: PayloadAction<number>) {
      state.filters.size = action.payload;
      state.filters.page = 1;
    },
    setSort(state, action: PayloadAction<{ sort: Filters["sort"]; order: Filters["order"] }>) {
      state.filters.sort = action.payload.sort;
      state.filters.order = action.payload.order;
      state.filters.page = 1;
    },
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    resetFilters(state) {
      state.filters = { ...initialState.filters };
    },
  },
});

export const { setFilters, setPage, setSize, setSort, setViewMode, resetFilters, setTheme } = appSlice.actions;
export default appSlice.reducer;
