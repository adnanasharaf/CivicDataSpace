import { describe, it, expect, jest } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import FiltersSidebar from "@/src/components/FiltersSidebar";
import { renderWithStore } from "./testUtils";
import type { Aggregations } from "@/src/types";

const aggregations: Aggregations = {
  sectors: { Climate: 5, Energy: 3 },
  tags: { solar: 2, wind: 1 },
  formats: { CSV: 4, JSON: 2 },
  geographies: { India: 6, Nepal: 2 },
  Geography: { India: 6, Nepal: 2 },
};

describe("FiltersSidebar", () => {
  it("renders the Filters heading", () => {
    renderWithStore(<FiltersSidebar />);
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("renders sector checkboxes from aggregations", () => {
    renderWithStore(<FiltersSidebar aggregations={aggregations} />);
    expect(screen.getByLabelText("Climate")).toBeInTheDocument();
    expect(screen.getByLabelText("Energy")).toBeInTheDocument();
  });

  it("renders format checkboxes from aggregations", () => {
    renderWithStore(<FiltersSidebar aggregations={aggregations} />);
    expect(screen.getByLabelText("CSV")).toBeInTheDocument();
    expect(screen.getByLabelText("JSON")).toBeInTheDocument();
  });

  it("dispatches sector filter when checkbox is clicked", () => {
    const { store } = renderWithStore(<FiltersSidebar aggregations={aggregations} />);
    fireEvent.click(screen.getByLabelText("Climate"));
    expect(store.getState().app.filters.sectors).toBe("Climate");
  });

  it("dispatches format filter when checkbox is clicked", () => {
    const { store } = renderWithStore(<FiltersSidebar aggregations={aggregations} />);
    fireEvent.click(screen.getByLabelText("CSV"));
    expect(store.getState().app.filters.formats).toBe("CSV");
  });

  it("unchecks a filter when clicked again", () => {
    const { store } = renderWithStore(<FiltersSidebar aggregations={aggregations} />);
    fireEvent.click(screen.getByLabelText("Climate"));
    fireEvent.click(screen.getByLabelText("Climate"));
    expect(store.getState().app.filters.sectors).toBe("");
  });

  it("shows RESET button when filters are active", () => {
    renderWithStore(<FiltersSidebar aggregations={aggregations} />);
    fireEvent.click(screen.getByLabelText("Climate"));
    expect(screen.getByText("RESET")).toBeInTheDocument();
  });

  it("resets all filters when RESET is clicked", () => {
    const { store } = renderWithStore(<FiltersSidebar aggregations={aggregations} />);
    fireEvent.click(screen.getByLabelText("Climate"));
    fireEvent.click(screen.getByText("RESET"));
    expect(store.getState().app.filters.sectors).toBe("");
  });

  it("calls onClose when X button is clicked on mobile", () => {
    const onClose = jest.fn();
    renderWithStore(<FiltersSidebar aggregations={aggregations} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "" })); // X button
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
