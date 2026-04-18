import { describe, it, expect } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import SortDropdown from "@/src/components/SortDropdown";
import { renderWithStore } from "./testUtils";

const baseState = {
  app: {
    viewMode: "grid" as const,
    filters: {
      query: "", Geography: "", sectors: "", tags: "", formats: "",
      page: 1, size: 9, sort: "recent" as const, order: "desc" as const,
    },
  },
};

describe("SortDropdown", () => {
  it("renders the current sort label", () => {
    renderWithStore(<SortDropdown />, baseState);
    expect(screen.getByText("Latest Updated")).toBeInTheDocument();
  });

  it("opens dropdown on button click", () => {
    renderWithStore(<SortDropdown />, baseState);
    fireEvent.click(screen.getByText("Latest Updated"));
    expect(screen.getByText("A → Z")).toBeInTheDocument();
  });

  it("dispatches alphabetical sort when A→Z is selected", () => {
    const { store } = renderWithStore(<SortDropdown />, baseState);
    fireEvent.click(screen.getByText("Latest Updated"));
    fireEvent.click(screen.getByText("A → Z"));
    expect(store.getState().app.filters.sort).toBe("alphabetical");
    expect(store.getState().app.filters.order).toBe("asc");
  });

  it("closes dropdown after selection", () => {
    renderWithStore(<SortDropdown />, baseState);
    fireEvent.click(screen.getByText("Latest Updated"));
    fireEvent.click(screen.getByText("A → Z"));
    expect(screen.queryByText("Latest Updated")).not.toBeInTheDocument();
  });

  it("toggles sort order when arrow button is clicked", () => {
    const { store } = renderWithStore(<SortDropdown />, baseState);
    fireEvent.click(screen.getByRole("button", { name: "" })); // ArrowUpDown button
    expect(store.getState().app.filters.order).toBe("asc");
  });
});
