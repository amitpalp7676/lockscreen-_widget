import { useCallback, useState } from "react";

export interface ProgressState {
  xp: number;
  streak: number;
  lastPracticeDate: string | null;
  bestCombo: number;
  lessonsCompleted: number;
}

const STORAGE_KEY = "julingo:progress";

const DEFAULT_PROGRESS: ProgressState = {
  xp: 0,
  streak: 0,
  lastPracticeDate: null,
  bestCombo: 0,
  lessonsCompleted: 0,
};

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(loadProgress);

  const persist = useCallback((next: ProgressState) => {
    setProgress(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage unavailable (private mode, blocked, etc.) — progress stays in-memory for this session.
    }
  }, []);

  const recordLesson = useCallback(
    (xpEarned: number, comboReached: number) => {
      const today = todayKey();
      let streak = progress.streak;
      if (progress.lastPracticeDate === today) {
        // already practiced today, streak unchanged
      } else if (progress.lastPracticeDate === yesterdayKey()) {
        streak = progress.streak + 1;
      } else {
        streak = 1;
      }
      persist({
        xp: progress.xp + xpEarned,
        streak,
        lastPracticeDate: today,
        bestCombo: Math.max(progress.bestCombo, comboReached),
        lessonsCompleted: progress.lessonsCompleted + 1,
      });
    },
    [progress, persist],
  );

  return { progress, recordLesson };
}
