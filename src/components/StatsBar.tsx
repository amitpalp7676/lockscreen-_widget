import { Flame, Star, Trophy } from "lucide-react";
import type { ProgressState } from "@/hooks/useProgress";

export function StatsBar({ progress }: { progress: ProgressState }) {
  return (
    <div className="flex items-center gap-4 font-sans text-sm font-semibold">
      <span className="flex items-center gap-1 text-accent">
        <Flame className="w-4 h-4" />
        {progress.streak}
      </span>
      <span className="flex items-center gap-1 text-primary">
        <Star className="w-4 h-4" />
        {progress.xp} XP
      </span>
      <span className="flex items-center gap-1 text-muted-foreground">
        <Trophy className="w-4 h-4" />
        {progress.bestCombo}
      </span>
    </div>
  );
}
