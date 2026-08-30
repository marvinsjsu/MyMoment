import { renderHook, act } from "@testing-library/react-native";
import { useTimer } from "../use-timer";

const ONE_MINUTE_MS = 60 * 1000;
const TICK_MS = 100;

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe("useTimer", () => {
  it("initialises with duration 0 and not running", () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.duration).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.elapsedTime).toBe(0);
  });

  it("setDuration updates the duration", () => {
    const { result } = renderHook(() => useTimer());
    act(() => {
      result.current.setDuration(ONE_MINUTE_MS);
    });
    expect(result.current.duration).toBe(ONE_MINUTE_MS);
  });

  it("setIsRunning(true) starts the timer", () => {
    const { result } = renderHook(() => useTimer());
    act(() => {
      result.current.setDuration(ONE_MINUTE_MS);
      result.current.setIsRunning(true);
    });
    expect(result.current.isRunning).toBe(true);
  });

  it("advances elapsedTime while running", () => {
    const { result } = renderHook(() => useTimer());
    act(() => {
      result.current.setDuration(ONE_MINUTE_MS);
      result.current.setStartDate(Date.now());
      result.current.setIsRunning(true);
    });
    act(() => {
      jest.advanceTimersByTime(TICK_MS * 5);
    });
    expect(result.current.elapsedTime).toBeGreaterThan(0);
  });

  it("pauseTimer stops ticking and sets isPaused", () => {
    const { result } = renderHook(() => useTimer());
    act(() => {
      result.current.setDuration(ONE_MINUTE_MS);
      result.current.setStartDate(Date.now());
      result.current.setIsRunning(true);
    });
    act(() => {
      jest.advanceTimersByTime(TICK_MS * 3);
      result.current.pauseTimer();
    });
    expect(result.current.isPaused).toBe(true);
    expect(result.current.isRunning).toBe(false);

    const elapsedAtPause = result.current.elapsedTime;
    act(() => {
      jest.advanceTimersByTime(TICK_MS * 10);
    });
    expect(result.current.elapsedTime).toBe(elapsedAtPause);
  });

  it("resumeTimer resumes ticking from where it paused", () => {
    const { result } = renderHook(() => useTimer());
    act(() => {
      result.current.setDuration(ONE_MINUTE_MS);
      result.current.setStartDate(Date.now());
      result.current.setIsRunning(true);
    });
    act(() => {
      jest.advanceTimersByTime(TICK_MS * 3);
      result.current.pauseTimer();
    });
    const elapsedAtPause = result.current.elapsedTime;

    act(() => {
      result.current.resumeTimer();
    });
    expect(result.current.isRunning).toBe(true);
    expect(result.current.isPaused).toBe(false);

    act(() => {
      jest.advanceTimersByTime(TICK_MS * 5);
    });
    expect(result.current.elapsedTime).toBeGreaterThan(elapsedAtPause);
  });

  it("stops automatically when elapsedTime reaches duration", () => {
    const SHORT_DURATION = TICK_MS * 3;
    const { result } = renderHook(() => useTimer());
    act(() => {
      result.current.setDuration(SHORT_DURATION);
      result.current.setStartDate(Date.now());
      result.current.setIsRunning(true);
    });
    act(() => {
      jest.advanceTimersByTime(SHORT_DURATION + TICK_MS);
    });
    expect(result.current.isRunning).toBe(false);
  });
});
