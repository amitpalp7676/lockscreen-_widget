import { LANGUAGE_LIST, type LanguageCode } from "@/data/languages";
import { cn } from "@/lib/utils";

interface LanguageGridProps {
  value: LanguageCode | null;
  onChange: (code: LanguageCode) => void;
  disabledCode?: LanguageCode | null;
}

export function LanguageGrid({ value, onChange, disabledCode }: LanguageGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
      {LANGUAGE_LIST.map((lang) => {
        const isSelected = value === lang.code;
        const isDisabled = disabledCode === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            disabled={isDisabled}
            onClick={() => onChange(lang.code)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl border px-2 py-3 transition-all active:scale-95",
              isSelected
                ? "border-primary bg-primary/10 ring-2 ring-primary"
                : "border-border bg-card hover:border-primary/50",
              isDisabled && "opacity-30 pointer-events-none",
            )}
          >
            <span className="text-2xl leading-none">{lang.flag}</span>
            <span className="text-xs font-sans font-medium text-foreground">{lang.name}</span>
          </button>
        );
      })}
    </div>
  );
}
