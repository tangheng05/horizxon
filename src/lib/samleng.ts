const STATUS_URL =
  "https://gist.githubusercontent.com/tangheng05/88470c558a887022f9c8f72951895528/raw/status.json";

// The Mac mini publishes every 5 minutes; older than this means the run stopped reporting.
const STALE_MS = 2 * 60 * 60 * 1000;

export type TrainingStatus = {
  epoch: number;
  epochs: number;
  progress: number;
  updatedAt: Date;
};

export async function getTrainingStatus(): Promise<TrainingStatus | null> {
  try {
    const res = await fetch(STATUS_URL, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const s = await res.json();
    const updatedAt = new Date(s.updated_at);
    if (s.state !== "training" || !(Date.now() - updatedAt.getTime() < STALE_MS)) return null;
    if (typeof s.progress !== "number" || typeof s.epoch !== "number") return null;
    return { epoch: s.epoch, epochs: s.epochs, progress: s.progress, updatedAt };
  } catch {
    return null;
  }
}

export function cambodiaTime(d: Date) {
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Phnom_Penh",
  });
}
