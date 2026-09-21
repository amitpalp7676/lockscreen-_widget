import { CATEGORIES } from "@/data/sentences";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface CategoryGridProps {
  onSelect: (categoryId: string) => void;
  disabled?: boolean;
}

export function CategoryGrid({ onSelect, disabled }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {CATEGORIES.map((cat) => (
        <Card
          key={cat.id}
          role="button"
          aria-disabled={disabled}
          onClick={() => !disabled && onSelect(cat.id)}
          className={cn(
            "flex flex-col items-center gap-2 p-5 cursor-pointer transition-all hover:border-primary/50 active:scale-95",
            disabled && "opacity-40 pointer-events-none cursor-not-allowed",
          )}
        >
          <span className="text-3xl">{cat.icon}</span>
          <span className="text-sm font-sans font-semibold text-center">{cat.name}</span>
        </Card>
      ))}
    </div>
  );
}
