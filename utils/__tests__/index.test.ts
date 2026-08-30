import { getFormattedTime, throttle } from "../index";

describe("getFormattedTime", () => {
  it("formats a morning time correctly", () => {
    const date = new Date(2024, 0, 1, 9, 5); // 9:05 AM
    expect(getFormattedTime(date)).toBe("9:05 am");
  });

  it("formats noon as 12:00 pm", () => {
    const date = new Date(2024, 0, 1, 12, 0);
    expect(getFormattedTime(date)).toBe("12:00 pm");
  });

  it("formats midnight as 12:00 am", () => {
    const date = new Date(2024, 0, 1, 0, 0);
    expect(getFormattedTime(date)).toBe("12:00 am");
  });

  it("formats afternoon times correctly", () => {
    const date = new Date(2024, 0, 1, 15, 30); // 3:30 PM
    expect(getFormattedTime(date)).toBe("3:30 pm");
  });

  it("pads single-digit minutes with a leading zero", () => {
    const date = new Date(2024, 0, 1, 10, 3);
    expect(getFormattedTime(date)).toBe("10:03 am");
  });
});

describe("throttle", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("calls the function once immediately on first invocation", () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 500);

    throttled("a");
    jest.runAllTimers();

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("drops calls made while throttled", () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 500);

    throttled("first");
    throttled("second");
    throttled("third");
    jest.runAllTimers();

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("first");
  });

  it("allows a second call after the delay elapses", () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 500);

    throttled("first");
    jest.advanceTimersByTime(600);
    throttled("second");
    jest.runAllTimers();

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(1, "first");
    expect(fn).toHaveBeenNthCalledWith(2, "second");
  });
});
