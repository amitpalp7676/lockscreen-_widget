import { useMemo, useRef, useState } from "react";
import { X, Eye } from "lucide-react";
import { sentencesForCategory } from "@/data/sentences";
import { LANGUAGES, type LanguageCode } from "@/data/languages";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { tokensMatch, scoreForCombo } from "@/lib/practice";
import { cn } from "@/lib/utils";

export interface LessonResult {
  categoryId: string;
  nativeLang: LanguageCode;
  targetLang: LanguageCode;
  totalTokens: number;
  correctFirstTry: number;
  mistakes: number;
  maxCombo: number;
  score: number;
}

interface PracticeScreenProps {
  nativeLang: LanguageCode;
  targetLang: LanguageCode;
  categoryId: string;
  onExit: () => void;
  onComplete: (result: LessonResult) => void;
}

type Feedback = { id: number; label: "Perfect!" | "Great!" | "Try again"; combo: number; ok: boolean };

export function PracticeScreen({ nativeLang, targetLang, categoryId, onExit, onComplete }: PracticeScreenProps) {
  const sentences = useMemo(() => sentencesForCategory(categoryId), [categoryId]);
  const targetMeta = LANGUAGES[targetLang];
  const nativeMeta = LANGUAGES[nativeLang];

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [tokenIndex, setTokenIndex] = useState(0);
  const [input, setInput] = useState("");
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [correctFirstTry, setCorrectFirstTry] = useState(0);
  const [missedThisToken, setMissedThisToken] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const feedbackId = useRef(0);

  const totalTokens = useMemo(
    () => sentences.reduce((sum, s) => sum + s.translations[targetLang].tokens.length, 0),
    [sentences, targetLang],
  );

  const sentence = sentences[sentenceIndex];
  if (!sentence) {
    return null;
  }

  const targetTranslation = sentence.translations[targetLang];
  const nativePrompt = sentence.translations[nativeLang].tokens.join(nativeMeta.joiner);
  const currentToken = targetTranslation.tokens[tokenIndex];
  const revealed = targetTranslation.tokens.slice(0, tokenIndex).join(targetMeta.joiner);
  const remainingCount = targetTranslation.tokens.length - tokenIndex - 1;

  function fireFeedback(label: Feedback["label"], comboValue: number, ok: boolean) {
    feedbackId.current += 1;
    setFeedback({ id: feedbackId.current, label, combo: comboValue, ok });
    window.setTimeout(() => {
      setFeedback((f) => (f?.id === feedbackId.current ? null : f));
    }, 550);
  }

  // Accepts the just-updated tallies explicitly, since the state setters above
  // haven't flushed yet when the final token completes the lesson in the same tick.
  function advanceToken(tallies: { correctFirstTry: number; mistakes: number; maxCombo: number; score: number }) {
    setShowHint(false);
    setMissedThisToken(false);
    if (tokenIndex + 1 < targetTranslation.tokens.length) {
      setTokenIndex(tokenIndex + 1);
      setInput("");
      return;
    }
    // sentence complete
    if (sentenceIndex + 1 < sentences.length) {
      setSentenceIndex(sentenceIndex + 1);
      setTokenIndex(0);
      setInput("");
      return;
    }
    // lesson complete
    onComplete({
      categoryId,
      nativeLang,
      targetLang,
      totalTokens,
      ...tallies,
    });
  }

  function handleSubmit() {
    if (!input.trim()) return;
    if (tokensMatch(input, currentToken)) {
      const nextCombo = combo + 1;
      const gained = scoreForCombo(nextCombo);
      const newMaxCombo = Math.max(maxCombo, nextCombo);
      const newScore = score + gained;
      const newCorrectFirstTry = missedThisToken ? correctFirstTry : correctFirstTry + 1;
      setCombo(nextCombo);
      setMaxCombo(newMaxCombo);
      setScore(newScore);
      setCorrectFirstTry(newCorrectFirstTry);
      fireFeedback(nextCombo >= 20 ? "Perfect!" : nextCombo >= 5 ? "Great!" : "Perfect!", nextCombo, true);
      advanceToken({ correctFirstTry: newCorrectFirstTry, mistakes, maxCombo: newMaxCombo, score: newScore });
    } else {
      setCombo(0);
      setMissedThisToken(true);
      setMistakes((m) => m + 1);
      fireFeedback("Try again", 0, false);
      setInput("");
    }
  }

  const sentenceProgress = sentenceIndex / sentences.length;

  return (
    <div className="flex-1 flex flex-col">
      <header className="py-4 px-6 border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button onClick={onExit} className="text-muted-foreground hover:text-foreground" aria-label="Exit lesson">
            <X className="w-5 h-5" />
          </button>
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${sentenceProgress * 100}%` }}
            />
          </div>
          <span className="font-sans text-sm font-semibold text-accent whitespace-nowrap">
            🔥 {combo}
          </span>
        </div>
      </header>

      <main className="flex-1 px-6 py-10 flex items-center justify-center">
        <div className="w-full max-w-2xl flex flex-col gap-8 relative">
          {feedback && (
            <div
              className={cn(
                "absolute -top-4 left-1/2 -translate-x-1/2 font-serif text-2xl font-bold animate-float-up pointer-events-none",
                feedback.ok ? "text-success" : "text-destructive",
              )}
            >
              {feedback.label}
            </div>
          )}

          <Card className="p-6">
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-sans mb-2">
              {nativeMeta.flag} {nativeMeta.name}
            </p>
            <p dir={nativeMeta.dir} className="font-serif text-2xl leading-snug">
              {nativePrompt}
            </p>
          </Card>

          <div className="text-center">
            <p dir={targetMeta.dir} className="font-serif text-xl min-h-[2.5rem] flex flex-wrap gap-2 justify-center items-center">
              {revealed && <span className="text-foreground">{revealed}</span>}
              <span className="inline-block px-3 py-1 rounded-lg bg-primary/10 border-2 border-dashed border-primary text-primary font-sans text-base">
                {input || "…"}
              </span>
              {remainingCount > 0 && (
                <span className="text-muted-foreground">{Array.from({ length: remainingCount }, () => "•••").join(" ")}</span>
              )}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <input
              autoFocus
              dir={targetMeta.dir}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder={`Type in ${targetMeta.name}…`}
              className={cn(
                "w-full max-w-md px-4 py-3 rounded-xl border-2 bg-card text-center font-sans text-lg outline-none transition-colors",
                missedThisToken ? "border-destructive" : "border-border focus:border-primary",
              )}
            />
            <div className="flex items-center gap-3">
              <Button size="sm" onClick={handleSubmit}>
                Check
              </Button>
              {targetMeta.hasRomanization && targetTranslation.romanization && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowHint((v) => !v)}
                  className="flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" /> Hint
                </Button>
              )}
            </div>
            {showHint && targetTranslation.romanization && (
              <p className="text-muted-foreground font-sans text-sm italic">
                {targetTranslation.romanization[tokenIndex]}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
