import { fetchDatasets } from "@/src/lib/api";
import { beforeEach, afterEach, describe, it, expect, jest } from "@jest/globals";

const mockResponse = {
  results: [{ id: "1", title: "Test Dataset" }],
  total: 1,
  aggregations: {
    sectors: { Climate: 2 },
    tags: { solar: 1 },
    formats: { CSV: 3 },
    geographies: { India: 5 },
    Geography: { India: 5 },
  },
};

const mockFetch = () => jest.fn<() => Promise<Partial<Response>>>();

beforeEach(() => {
  global.fetch = mockFetch().mockResolvedValue({
    ok: true,
    json: async () => ({ ...mockResponse }),
  }) as unknown as typeof fetch;
});

afterEach(() => { jest.resetAllMocks(); });

describe("fetchDatasets", () => {
  it("calls the correct base URL", async () => {
    await fetchDatasets({});
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://api.datakeep.civicdays.in/api/search/dataset/"),
      expect.any(Object)
    );
  });

  it("appends query params correctly", async () => {
    await fetchDatasets({ query: "climate", sectors: "Energy", page: 2, size: 9 });
    const url = (fetch as ReturnType<typeof jest.fn>).mock.calls[0][0] as string;
    expect(url).toContain("query=climate");
    expect(url).toContain("sectors=Energy");
    expect(url).toContain("page=2");
    expect(url).toContain("size=9");
  });

  it("maps geographies aggregation to Geography key", async () => {
    global.fetch = mockFetch().mockResolvedValue({
      ok: true,
      json: async () => ({
        ...mockResponse,
        aggregations: { ...mockResponse.aggregations, Geography: undefined },
      }),
    }) as unknown as typeof fetch;
    const result = await fetchDatasets({});
    expect(result.aggregations.Geography).toBeDefined();
  });

  it("throws on non-ok response", async () => {
    global.fetch = mockFetch().mockResolvedValue({ ok: false, status: 500 }) as unknown as typeof fetch;
    await expect(fetchDatasets({})).rejects.toThrow("API error: 500");
  });

  it("does not append empty params", async () => {
    await fetchDatasets({ query: "" });
    const url = (fetch as ReturnType<typeof jest.fn>).mock.calls[0][0] as string;
    expect(url).not.toContain("query=");
  });

  it("appends Geography as geographies param", async () => {
    await fetchDatasets({ Geography: "India" });
    const url = (fetch as ReturnType<typeof jest.fn>).mock.calls[0][0] as string;
    expect(url).toContain("geographies=India");
  });
});
