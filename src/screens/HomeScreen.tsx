import { useMemo, useState } from "react";
import { ArrowLeftRight, Dumbbell } from "lucide-react";
import { LanguageGrid } from "@/components/LanguageGrid";
import { CategoryGrid } from "@/components/CategoryGrid";
import { StatsBar } from "@/components/StatsBar";
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

  const canPick = targetLang !== null && targetLang !== nativeLang;

  const bestRatings = useMemo(() => {
    if (!canPick) return {};
    const map: Partial<Record<string, Rating>> = {};
    for (const cat of CATEGORIES) {
      const rating = progress.completions[completionKey(nativeLang, targetLang, cat.id)];
      if (rating) map[cat.id] = rating;
    }
    return map;
  }, [canPick, nativeLang, targetLang, progress.completions]);

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
            <LanguageGrid value={nativeLang} onChange={setNativeLang} disabledCode={targetLang} />
          </section>

          <div className="flex justify-center text-muted-foreground">
            <ArrowLeftRight className="w-5 h-5" />
          </div>

          <section>
            <h2 className="font-serif text-lg font-semibold mb-3">I want to learn</h2>
            <LanguageGrid value={targetLang} onChange={setTargetLang} disabledCode={nativeLang} />
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold mb-3">Pick a lesson</h2>
            <CategoryGrid
              disabled={!canPick}
              bestRatings={bestRatings}
              onSelect={(categoryId) => canPick && onStart(nativeLang, targetLang, categoryId)}
            />
            {!canPick && (
              <p className="text-center text-muted-foreground text-sm font-sans mt-3">
                Choose a language to learn that's different from the one you speak.
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
