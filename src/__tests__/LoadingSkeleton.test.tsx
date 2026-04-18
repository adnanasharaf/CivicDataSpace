import { describe, it, expect } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import React from "react";
import { render } from "@testing-library/react";
import LoadingSkeleton from "@/src/components/LoadingSkeleton";

describe("LoadingSkeleton", () => {
  it("renders correct number of grid skeletons", () => {
    const { container } = render(<LoadingSkeleton viewMode="grid" count={6} />);
    const cards = container.querySelectorAll(".animate-pulse");
    expect(cards).toHaveLength(6);
  });

  it("renders correct number of list skeletons", () => {
    const { container } = render(<LoadingSkeleton viewMode="list" count={3} />);
    const rows = container.querySelectorAll(".animate-pulse");
    expect(rows).toHaveLength(3);
  });

  it("defaults to 9 skeletons in grid mode", () => {
    const { container } = render(<LoadingSkeleton />);
    expect(container.querySelectorAll(".animate-pulse")).toHaveLength(9);
  });

  it("applies grid layout class for grid mode", () => {
    const { container } = render(<LoadingSkeleton viewMode="grid" />);
    expect(container.firstChild).toHaveClass("grid");
  });

  it("applies space-y layout class for list mode", () => {
    const { container } = render(<LoadingSkeleton viewMode="list" />);
    expect(container.firstChild).toHaveClass("space-y-4");
  });
});
