export interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
}

export function calculateCountdown(targetDate: string | Date): CountdownTime {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      isExpired: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    isExpired: false,
  };
}

export function formatDate(dateString: string | Date): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat("en-BD", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
  } catch {
    return String(dateString);
  }
}

export function formatDateTime(dateString: string | Date): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat("en-BD", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
  } catch {
    return String(dateString);
  }
}
