import { describe, it, expect } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import Pagination from "@/src/components/Pagination";
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

describe("Pagination", () => {
  it("renders page info correctly", () => {
    renderWithStore(<Pagination total={27} />, baseState);
    expect(screen.getByText("03")).toBeInTheDocument(); // totalPages
  });

  it("first and prev buttons are disabled on page 1", () => {
    renderWithStore(<Pagination total={27} />, baseState);
    expect(screen.getByLabelText("First page")).toBeDisabled();
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("next and last buttons are enabled when not on last page", () => {
    renderWithStore(<Pagination total={27} />, baseState);
    expect(screen.getByLabelText("Next page")).not.toBeDisabled();
    expect(screen.getByLabelText("Last page")).not.toBeDisabled();
  });

  it("dispatches next page on next button click", () => {
    const { store } = renderWithStore(<Pagination total={27} />, baseState);
    fireEvent.click(screen.getByLabelText("Next page"));
    expect(store.getState().app.filters.page).toBe(2);
  });

  it("dispatches last page on last button click", () => {
    const { store } = renderWithStore(<Pagination total={27} />, baseState);
    fireEvent.click(screen.getByLabelText("Last page"));
    expect(store.getState().app.filters.page).toBe(3);
  });

  it("next and last buttons are disabled on last page", () => {
    const lastPageState = {
      app: { ...baseState.app, filters: { ...baseState.app.filters, page: 3 } },
    };
    renderWithStore(<Pagination total={27} />, lastPageState);
    expect(screen.getByLabelText("Next page")).toBeDisabled();
    expect(screen.getByLabelText("Last page")).toBeDisabled();
  });

  it("dispatches setSize when rows-per-page select changes", () => {
    const { store } = renderWithStore(<Pagination total={27} />, baseState);
    fireEvent.change(screen.getByLabelText("Rows per page"), { target: { value: "18" } });
    expect(store.getState().app.filters.size).toBe(18);
  });

  it("renders rows per page select with correct options", () => {
    renderWithStore(<Pagination total={27} />, baseState);
    const select = screen.getByLabelText("Rows per page") as HTMLSelectElement;
    const values = Array.from(select.options).map((o) => o.value);
    expect(values).toEqual(["9", "18", "36"]);
  });
});
