import { CATEGORIES } from "@/data/sentences";
import { Card } from "@/components/ui/Card";
import { RATING_COLOR, type Rating } from "@/lib/practice";
import { cn } from "@/lib/utils";

interface CategoryGridProps {
  onSelect: (categoryId: string) => void;
  disabled?: boolean;
  /** Best rating achieved so far for each category, for the currently selected language pair. */
  bestRatings?: Partial<Record<string, Rating>>;
}

export function CategoryGrid({ onSelect, disabled, bestRatings }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {CATEGORIES.map((cat) => {
        const rating = bestRatings?.[cat.id];
        return (
          <Card
            key={cat.id}
            role="button"
            aria-disabled={disabled}
            onClick={() => !disabled && onSelect(cat.id)}
            className={cn(
              "relative flex flex-col items-center gap-2 p-5 cursor-pointer transition-all hover:border-primary/50 active:scale-95",
              disabled && "opacity-40 pointer-events-none cursor-not-allowed",
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
          </Card>
        );
      })}
    </div>
  );
}
