import { describe, it, expect, jest } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EmptyState, ErrorState } from "@/src/components/States";

describe("EmptyState", () => {
  it("renders the no datasets message", () => {
    render(<EmptyState />);
    expect(screen.getByText("No datasets found")).toBeInTheDocument();
  });

  it("renders the helper hint text", () => {
    render(<EmptyState />);
    expect(screen.getByText(/try adjusting your search or filters/i)).toBeInTheDocument();
  });
});

describe("ErrorState", () => {
  it("renders the error heading", () => {
    render(<ErrorState onRetry={jest.fn()} />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders the retry button", () => {
    render(<ErrorState onRetry={jest.fn()} />);
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", () => {
    const onRetry = jest.fn();
    render(<ErrorState onRetry={onRetry} />);
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
