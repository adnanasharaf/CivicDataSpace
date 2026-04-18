import { describe, it, expect, jest } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import React from "react";
import { screen, fireEvent, act } from "@testing-library/react";
import SearchBar from "@/src/components/SearchBar";
import { renderWithStore } from "./testUtils";

jest.useFakeTimers();

describe("SearchBar", () => {
  it("renders the search input", () => {
    renderWithStore(<SearchBar />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("has correct placeholder text", () => {
    renderWithStore(<SearchBar />);
    expect(screen.getByPlaceholderText(/start typing to search/i)).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    renderWithStore(<SearchBar />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "climate" } });
    expect(input.value).toBe("climate");
  });

  it("dispatches query to store after debounce delay", () => {
    const { store } = renderWithStore(<SearchBar />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "energy" } });
    act(() => jest.advanceTimersByTime(400));
    expect(store.getState().app.filters.query).toBe("energy");
  });

  it("does not dispatch before debounce delay", () => {
    const { store } = renderWithStore(<SearchBar />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "solar" } });
    act(() => jest.advanceTimersByTime(200));
    expect(store.getState().app.filters.query).toBe("");
  });

  it("has aria-label for accessibility", () => {
    renderWithStore(<SearchBar />);
    expect(screen.getByLabelText(/search datasets/i)).toBeInTheDocument();
  });
});
