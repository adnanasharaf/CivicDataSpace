import { describe, it, expect, jest } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import React from "react";
import { render, screen } from "@testing-library/react";
import DatasetRow from "@/src/components/DatasetRow";
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
  id: "ds-2",
  title: "Energy Transition Index",
  description: "<p>Data on <em>energy</em> transition.</p>",
  slug: "energy-transition-index",
  tags: ["energy", "transition", "solar"],
  sectors: ["Energy Transition"],
  formats: ["CSV", "PDF"],
  geographies: ["India", "Bangladesh"],
  organization: { name: "CivicDays", logo: "/logo.png" },
  user: { name: "Jane", bio: "Analyst", profile_picture: "/pic.png" },
  metadata: [],
  modified: "2024-06-01T00:00:00Z",
  download_count: 250,
};

describe("DatasetRow", () => {
  it("renders the dataset title", () => {
    render(<DatasetRow dataset={mockDataset} />);
    expect(screen.getByText("Energy Transition Index")).toBeInTheDocument();
  });

  it("strips HTML from description", () => {
    render(<DatasetRow dataset={mockDataset} />);
    expect(screen.getByText(/Data on energy transition/i)).toBeInTheDocument();
  });

  it("renders all geographies joined", () => {
    render(<DatasetRow dataset={mockDataset} />);
    expect(screen.getByText("India, Bangladesh")).toBeInTheDocument();
  });

  it("renders download count", () => {
    render(<DatasetRow dataset={mockDataset} />);
    expect(screen.getByText("250")).toBeInTheDocument();
  });

  it("renders 500+ for high download counts", () => {
    render(<DatasetRow dataset={{ ...mockDataset, download_count: 999 }} />);
    expect(screen.getByText("500+")).toBeInTheDocument();
  });

  it("renders format badges", () => {
    render(<DatasetRow dataset={mockDataset} />);
    expect(screen.getByText("CSV")).toBeInTheDocument();
    expect(screen.getByText("PDF")).toBeInTheDocument();
  });

  it("renders up to 5 tags", () => {
    render(<DatasetRow dataset={mockDataset} />);
    expect(screen.getByText("energy")).toBeInTheDocument();
    expect(screen.getByText("transition")).toBeInTheDocument();
    expect(screen.getByText("solar")).toBeInTheDocument();
  });

  it("links to the correct dataset URL", () => {
    render(<DatasetRow dataset={mockDataset} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://civicdataspace.in/datasets/ds-2"
    );
  });

  it("renders the formatted modified date", () => {
    render(<DatasetRow dataset={mockDataset} />);
    expect(screen.getByText(/1 Jun 2024/i)).toBeInTheDocument();
  });
});
