import { useMemo, useState } from "react";
import { ArrowLeftRight, BookOpen, Dumbbell } from "lucide-react";
import { LanguageGrid } from "@/components/LanguageGrid";
import { CategoryGrid } from "@/components/CategoryGrid";
import { StatsBar } from "@/components/StatsBar";
import { Button } from "@/components/ui/Button";
import { BasicsScreen } from "@/screens/BasicsScreen";
import type { LanguageCode } from "@/data/languages";
import { CATEGORIES } from "@/data/sentences";
import { completionKey, type ProgressState } from "@/hooks/useProgress";
import type { Rating } from "@/lib/practice";

interface HomeScreenProps {
  progress: ProgressState;
  onStart: (nativeLang: LanguageCode, targetLang: LanguageCode, categoryId: string) => void;
}

export function HomeScreen({ progress, onStart }: HomeScreenProps) {
  const [nativeLang, setNativeLang] = useState<LanguageCode>("en");
  const [targetLang, setTargetLang] = useState<LanguageCode | null>(null);
  const [showBasics, setShowBasics] = useState(false);

  const canPick = targetLang !== null;

  const bestRatings = useMemo(() => {
    if (!canPick) return {};
    const map: Partial<Record<string, Rating>> = {};
    for (const cat of CATEGORIES) {
      const rating = progress.completions[completionKey(nativeLang, targetLang, cat.id)];
      if (rating) map[cat.id] = rating;
    }
    return map;
  }, [canPick, nativeLang, targetLang, progress.completions]);

  if (showBasics && targetLang) {
    return (
      <BasicsScreen
        targetLang={targetLang}
        onContinue={() => setShowBasics(false)}
        onExit={() => setShowBasics(false)}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <header className="py-6 px-6 md:px-8 border-b border-border">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-primary" />
            <span className="font-serif text-xl font-semibold">LinguaGym</span>
          </div>
          <StatsBar progress={progress} />
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-3xl mx-auto flex flex-col gap-10 animate-fade-in">
          <div>
            <p className="text-center text-muted-foreground font-sans text-sm mb-6 tracking-wide uppercase">
              English through sentences, like a game — now in 10 languages
            </p>
          </div>

          <section>
            <h2 className="font-serif text-lg font-semibold mb-3">I speak</h2>
            <LanguageGrid value={nativeLang} onChange={setNativeLang} />
          </section>

          <div className="flex justify-center text-muted-foreground">
            <ArrowLeftRight className="w-5 h-5" />
          </div>

          <section>
            <h2 className="font-serif text-lg font-semibold mb-3">I want to learn</h2>
            <LanguageGrid value={targetLang} onChange={setTargetLang} />
            <p className="text-center text-muted-foreground text-xs font-sans mt-2">
              Same language on both sides works too — e.g. Spanish → Spanish for pure typing practice.
            </p>
          </section>

          {canPick && (
            <div className="flex justify-center">
              <Button variant="secondary" onClick={() => setShowBasics(true)} className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> New to this language? Learn the basics first
              </Button>
            </div>
          )}

          <section>
            <h2 className="font-serif text-lg font-semibold mb-3">Pick a lesson</h2>
            <CategoryGrid
              disabled={!canPick}
              bestRatings={bestRatings}
              onSelect={(categoryId) => canPick && onStart(nativeLang, targetLang, categoryId)}
            />
            {!canPick && (
              <p className="text-center text-muted-foreground text-sm font-sans mt-3">
                Pick a language you want to learn above to unlock lessons.
              </p>
            )}
          </section>
        </div>
      </main>

      <footer className="py-6 px-6 text-center">
        <p className="text-sm text-muted-foreground font-sans">
          Type the sentence, chunk by chunk. Build combos. Don't break the streak.
        </p>
      </footer>
    </div>
  );
}
