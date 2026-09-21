import { ArrowRight, X } from "lucide-react";
import { BASICS } from "@/data/basics";
import { LANGUAGES, type LanguageCode } from "@/data/languages";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface BasicsScreenProps {
  targetLang: LanguageCode;
  onContinue: () => void;
  onExit: () => void;
}

export function BasicsScreen({ targetLang, onContinue, onExit }: BasicsScreenProps) {
  const meta = LANGUAGES[targetLang];
  const basics = BASICS[targetLang];

  return (
    <div className="flex-1 flex flex-col">
      <header className="py-4 px-6 border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button onClick={onExit} className="text-muted-foreground hover:text-foreground" aria-label="Back to home">
            <X className="w-5 h-5" />
          </button>
          <span className="font-serif text-lg font-semibold">
            {meta.flag} {meta.name} basics
          </span>
        </div>
      </header>

      <main className="flex-1 px-6 py-10 flex items-center justify-center">
        <div className="w-full max-w-2xl flex flex-col gap-8 animate-fade-in">
          <Card className="p-6">
            <h2 className="font-serif text-lg font-semibold mb-2">Writing system</h2>
            <p className="font-sans text-foreground">{basics.script}</p>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-lg font-semibold mb-2">Pronunciation tip</h2>
            <p className="font-sans text-foreground">{basics.tip}</p>
          </Card>

          <section>
            <h2 className="font-serif text-lg font-semibold mb-3">Numbers 1–5</h2>
            <div dir={meta.dir} className="flex flex-wrap gap-3">
              {basics.numbers.map((n) => (
                <div
                  key={n.label}
                  className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-muted border border-border min-w-[4.5rem]"
                >
                  <span className="text-xs text-muted-foreground font-sans">{n.label}</span>
                  <span className="font-serif text-lg">{n.word}</span>
                  {n.romanization && <span className="text-xs text-muted-foreground font-sans italic">{n.romanization}</span>}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold mb-3">Essential words</h2>
            <div dir={meta.dir} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {basics.essentials.map((e) => (
                <div key={e.label} className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-muted border border-border">
                  <span className="text-xs text-muted-foreground font-sans">{e.label}</span>
                  <span className="font-serif text-lg text-center">{e.word}</span>
                  {e.romanization && <span className="text-xs text-muted-foreground font-sans italic">{e.romanization}</span>}
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-center">
            <Button size="lg" onClick={onContinue} className="flex items-center gap-2">
              I'm ready — pick a lesson <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
