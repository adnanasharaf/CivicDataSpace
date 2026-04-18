import { describe, it, expect, jest } from "@jest/globals";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@/src/hooks/useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 400));
    expect(result.current).toBe("hello");
  });

  it("does not update before the delay", () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 400), {
      initialProps: { val: "a" },
    });
    rerender({ val: "b" });
    act(() => jest.advanceTimersByTime(200));
    expect(result.current).toBe("a");
  });

  it("updates after the delay", () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 400), {
      initialProps: { val: "a" },
    });
    rerender({ val: "b" });
    act(() => jest.advanceTimersByTime(400));
    expect(result.current).toBe("b");
  });

  it("resets timer on rapid changes and only fires once", () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 400), {
      initialProps: { val: "a" },
    });
    rerender({ val: "b" });
    act(() => jest.advanceTimersByTime(200));
    rerender({ val: "c" });
    act(() => jest.advanceTimersByTime(200));
    expect(result.current).toBe("a");
    act(() => jest.advanceTimersByTime(200));
    expect(result.current).toBe("c");
  });

  it("uses default delay of 400ms", () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val), {
      initialProps: { val: "x" },
    });
    rerender({ val: "y" });
    act(() => jest.advanceTimersByTime(399));
    expect(result.current).toBe("x");
    act(() => jest.advanceTimersByTime(1));
    expect(result.current).toBe("y");
  });
});
