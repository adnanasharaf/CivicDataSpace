import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import appReducer from "@/src/store/appSlice";
import type { RootState } from "@/src/store";

export function renderWithStore(
  ui: React.ReactElement,
  preloadedState?: Partial<RootState>,
  options?: RenderOptions
) {
  const store = configureStore({
    reducer: { app: appReducer },
    preloadedState: preloadedState as RootState,
  });
  return {
    ...render(<Provider store={store}>{ui}</Provider>, options),
    store,
  };
}
