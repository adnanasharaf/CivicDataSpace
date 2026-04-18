import { describe, it, expect } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import ViewToggle from "@/src/components/ViewToggle";
import { renderWithStore } from "./testUtils";

describe("ViewToggle", () => {
  it("renders grid and list buttons", () => {
    renderWithStore(<ViewToggle />);
    expect(screen.getByLabelText("Grid view")).toBeInTheDocument();
    expect(screen.getByLabelText("List view")).toBeInTheDocument();
  });

  it("dispatches setViewMode('list') when list button is clicked", () => {
    const { store } = renderWithStore(<ViewToggle />);
    fireEvent.click(screen.getByLabelText("List view"));
    expect(store.getState().app.viewMode).toBe("list");
  });

  it("dispatches setViewMode('grid') when grid button is clicked", () => {
    const { store } = renderWithStore(<ViewToggle />, {
      app: {
        viewMode: "list",
        filters: {
          query: "", Geography: "", sectors: "", tags: "", formats: "",
          page: 1, size: 9, sort: "recent", order: "desc",
        },
      },
    });
    fireEvent.click(screen.getByLabelText("Grid view"));
    expect(store.getState().app.viewMode).toBe("grid");
  });

  it("defaults to grid view mode", () => {
    const { store } = renderWithStore(<ViewToggle />);
    expect(store.getState().app.viewMode).toBe("grid");
  });
});
