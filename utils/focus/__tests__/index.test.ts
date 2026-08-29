import { getRemainingTime } from "../index";

describe("getRemainingTime", () => {
  it("returns full duration when no time has elapsed", () => {
    const { minutes, seconds } = getRemainingTime(25 * 60 * 1000, 0);
    expect(minutes).toBe(25);
    expect(seconds).toBe(0);
  });

  it("returns correct minutes and seconds mid-session", () => {
    const duration = 25 * 60 * 1000;
    const elapsed = 5 * 60 * 1000 + 30 * 1000; // 5m 30s elapsed
    const { minutes, seconds } = getRemainingTime(duration, elapsed);
    expect(minutes).toBe(19);
    expect(seconds).toBe(30);
  });

  it("returns zeros when elapsed equals duration", () => {
    const duration = 10 * 60 * 1000;
    const { minutes, seconds } = getRemainingTime(duration, duration);
    expect(minutes).toBe(0);
    expect(seconds).toBe(0);
  });

  it("clamps to zero when elapsed exceeds duration", () => {
    const duration = 5 * 60 * 1000;
    const elapsed = 6 * 60 * 1000;
    const { minutes, seconds } = getRemainingTime(duration, elapsed);
    expect(minutes).toBe(0);
    expect(seconds).toBe(0);
  });

  it("handles sub-minute remaining time", () => {
    const duration = 60 * 1000; // 1 minute
    const elapsed = 45 * 1000; // 45 seconds elapsed
    const { minutes, seconds } = getRemainingTime(duration, elapsed);
    expect(minutes).toBe(0);
    expect(seconds).toBe(15);
  });
});
