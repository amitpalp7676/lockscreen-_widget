import { useCallback, useState } from "react";
import { betterRating, type Rating } from "@/lib/practice";

export interface ProgressState {
  xp: number;
  streak: number;
  lastPracticeDate: string | null;
  bestCombo: number;
  lessonsCompleted: number;
  /** Best rating earned per "nativeLang:targetLang:categoryId" key. */
  completions: Record<string, Rating>;
}

const STORAGE_KEY = "julingo:progress";

const DEFAULT_PROGRESS: ProgressState = {
  xp: 0,
  streak: 0,
  lastPracticeDate: null,
  bestCombo: 0,
  lessonsCompleted: 0,
  completions: {},
};

export function completionKey(nativeLang: string, targetLang: string, categoryId: string): string {
  return `${nativeLang}:${targetLang}:${categoryId}`;
}

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
    (xpEarned: number, comboReached: number, categoryKey: string, rating: Rating) => {
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
        completions: {
          ...progress.completions,
          [categoryKey]: betterRating(progress.completions[categoryKey], rating),
        },
      });
    },
    [progress, persist],
  );

  return { progress, recordLesson };
}
