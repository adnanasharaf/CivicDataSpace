import { describe, it, expect, jest } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import React from "react";
import { render, screen } from "@testing-library/react";
import DatasetCard from "@/src/components/DatasetCard";
import type { Dataset } from "@/src/types";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockDataset: Dataset = {
  id: "ds-1",
  title: "Climate Risk Data",
  description: "<p>A dataset about <b>climate</b> risks.</p>",
  slug: "climate-risk-data",
  tags: ["climate", "risk"],
  sectors: ["Climate Finance"],
  formats: ["CSV", "JSON"],
  geographies: ["India", "Nepal"],
  organization: { name: "CivicDays", logo: "/logo.png" },
  user: { name: "John", bio: "Researcher", profile_picture: "/pic.png" },
  metadata: [],
  modified: "2024-03-15T00:00:00Z",
  download_count: 120,
  has_charts: true,
};

describe("DatasetCard", () => {
  it("renders the dataset title", () => {
    render(<DatasetCard dataset={mockDataset} />);
    expect(screen.getByText("Climate Risk Data")).toBeInTheDocument();
  });

  it("strips HTML from description", () => {
    render(<DatasetCard dataset={mockDataset} />);
    expect(screen.getByText(/A dataset about climate risks/i)).toBeInTheDocument();
  });

  it("renders the formatted date", () => {
    render(<DatasetCard dataset={mockDataset} />);
    expect(screen.getByText(/15 Mar 2024/i)).toBeInTheDocument();
  });

  it("renders the first geography", () => {
    render(<DatasetCard dataset={mockDataset} />);
    expect(screen.getByText("India")).toBeInTheDocument();
  });

  it("renders download count", () => {
    render(<DatasetCard dataset={mockDataset} />);
    expect(screen.getByText("120")).toBeInTheDocument();
  });

  it("renders 500+ when download count >= 500", () => {
    render(<DatasetCard dataset={{ ...mockDataset, download_count: 600 }} />);
    expect(screen.getByText("500+")).toBeInTheDocument();
  });

  it("links to the correct dataset URL", () => {
    render(<DatasetCard dataset={mockDataset} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://civicdataspace.in/datasets/ds-1"
    );
  });

  it("renders 0 downloads when download_count is undefined", () => {
    render(<DatasetCard dataset={{ ...mockDataset, download_count: undefined }} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
