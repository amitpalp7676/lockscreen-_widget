export type Rating = "C" | "B" | "A" | "S" | "SS" | "SSS";

export function rateAccuracy(accuracy: number): Rating {
  if (accuracy >= 0.95) return "SSS";
  if (accuracy >= 0.9) return "SS";
  if (accuracy >= 0.8) return "S";
  if (accuracy >= 0.7) return "A";
  if (accuracy >= 0.5) return "B";
  return "C";
}

const RATING_ORDER: Rating[] = ["C", "B", "A", "S", "SS", "SSS"];

/** Returns whichever rating ranks higher (SSS > SS > ... > C). */
export function betterRating(a: Rating | undefined, b: Rating): Rating {
  if (!a) return b;
  return RATING_ORDER.indexOf(b) > RATING_ORDER.indexOf(a) ? b : a;
}

export const RATING_COLOR: Record<Rating, string> = {
  SSS: "text-warning",
  SS: "text-primary",
  S: "text-primary",
  A: "text-success",
  B: "text-foreground",
  C: "text-muted-foreground",
};

/** Score awarded for one correctly-typed token, given the streak going into it. */
export function scoreForCombo(combo: number): number {
  const multiplier = combo >= 20 ? 2 : combo >= 10 ? 1.5 : 1;
  return Math.round(10 * multiplier);
}
