import { CATEGORIES } from "@/data/sentences";
import { LANGUAGES, type LanguageCode } from "@/data/languages";
import { Card } from "@/components/ui/Card";
import { RATING_COLOR, type Rating } from "@/lib/practice";
import { cn } from "@/lib/utils";

interface CategoryGridProps {
  nativeLang: LanguageCode;
  targetLang: LanguageCode;
  onSelect: (categoryId: string) => void;
  disabled?: boolean;
  /** Best rating achieved so far for each category, for the currently selected language pair. */
  bestRatings?: Partial<Record<string, Rating>>;
}

export function CategoryGrid({ nativeLang, targetLang, onSelect, disabled, bestRatings }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {CATEGORIES.map((cat) => {
        const rating = bestRatings?.[cat.id];
        const matchesPair = !cat.languages || (cat.languages.includes(nativeLang) && cat.languages.includes(targetLang));
        const cardDisabled = disabled || !matchesPair;
        return (
          <Card
            key={cat.id}
            role="button"
            aria-disabled={cardDisabled}
            onClick={() => !cardDisabled && onSelect(cat.id)}
            className={cn(
              "relative flex flex-col items-center gap-2 p-5 cursor-pointer transition-all hover:border-primary/50 active:scale-95",
              cardDisabled && "opacity-40 pointer-events-none cursor-not-allowed",
            )}
          >
            {rating && (
              <span
                className={cn(
                  "absolute top-2 right-2 font-serif text-xs font-bold px-1.5 py-0.5 rounded-md bg-muted",
                  RATING_COLOR[rating],
                )}
              >
                {rating}
              </span>
            )}
            <span className="text-3xl">{cat.icon}</span>
            <span className="text-sm font-sans font-semibold text-center">{cat.name}</span>
            {cat.languages && (
              <span className="text-xs text-muted-foreground font-sans">
                {cat.languages.map((l) => LANGUAGES[l].name).join(" ↔ ")} only
              </span>
            )}
          </Card>
        );
      })}
    </div>
  );
}
