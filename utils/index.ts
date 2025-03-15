export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let isThrottled = false;

  function throttled(...args: Parameters<T>) {
    if (isThrottled) {
      return;
    }

    isThrottled = true;

    timeoutId = setTimeout(() => {
      func(...args);
      isThrottled = false;
    }, delay);
  }

  throttled.timeoutId = timeoutId;

  return throttled;
}
export const getFormattedTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? "pm" : "am";

  const formattedHours = hours % 12 || 12; //
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${amPm}`;
};
