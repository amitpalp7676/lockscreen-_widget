import { Flame, Home, RotateCcw, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { rateAccuracy, RATING_COLOR } from "@/lib/practice";
import type { LessonResult } from "@/screens/PracticeScreen";
import { CATEGORIES } from "@/data/sentences";
import { LANGUAGES } from "@/data/languages";

interface ResultsScreenProps {
  result: LessonResult;
  onRetry: () => void;
  onHome: () => void;
}

export function ResultsScreen({ result, onRetry, onHome }: ResultsScreenProps) {
  const accuracy = result.totalTokens > 0 ? result.correctFirstTry / result.totalTokens : 0;
  const rating = rateAccuracy(accuracy);
  const category = CATEGORIES.find((c) => c.id === result.categoryId);
  const targetLang = LANGUAGES[result.targetLang];

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-10">
      <Card className="w-full max-w-md p-8 flex flex-col items-center gap-6 animate-fade-in">
        <p className="font-sans text-sm uppercase tracking-wide text-muted-foreground">
          {category?.icon} {category?.name} · {targetLang.flag} {targetLang.name}
        </p>

        <div className={`font-serif text-7xl font-bold ${RATING_COLOR[rating]}`}>{rating}</div>

        <div className="grid grid-cols-3 gap-4 w-full text-center">
          <div>
            <p className="font-serif text-2xl font-semibold flex items-center justify-center gap-1">
              <Star className="w-5 h-5 text-primary" /> {result.score}
            </p>
            <p className="text-xs text-muted-foreground font-sans">XP earned</p>
          </div>
          <div>
            <p className="font-serif text-2xl font-semibold">{Math.round(accuracy * 100)}%</p>
            <p className="text-xs text-muted-foreground font-sans">Accuracy</p>
          </div>
          <div>
            <p className="font-serif text-2xl font-semibold flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 text-accent" /> {result.maxCombo}
            </p>
            <p className="text-xs text-muted-foreground font-sans">Best combo</p>
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2" onClick={onHome}>
            <Home className="w-4 h-4" /> Home
          </Button>
          <Button className="flex-1 flex items-center justify-center gap-2" onClick={onRetry}>
            <RotateCcw className="w-4 h-4" /> Practice again
          </Button>
        </div>
      </Card>
    </div>
  );
}
