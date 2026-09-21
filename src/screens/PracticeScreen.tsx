import { useMemo, useRef, useState } from "react";
import { X, Eye } from "lucide-react";
import { sentencesForCategory } from "@/data/sentences";
import { LANGUAGES, type LanguageCode } from "@/data/languages";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { foldDiacritics, normalizeForMatch, scoreForCombo } from "@/lib/practice";
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
const OPTIONAL_LEADING_PUNCT = new Set(["¿", "¡"]);

export function PracticeScreen({ nativeLang, targetLang, categoryId, onExit, onComplete }: PracticeScreenProps) {
  const sentences = useMemo(() => sentencesForCategory(categoryId), [categoryId]);
  const targetMeta = LANGUAGES[targetLang];
  const nativeMeta = LANGUAGES[nativeLang];

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [input, setInput] = useState("");
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [correctFirstTry, setCorrectFirstTry] = useState(0);
  const [missedThisSentence, setMissedThisSentence] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const feedbackId = useRef(0);

  const sentence = sentences[sentenceIndex];
  if (!sentence) {
    return null;
  }

  const targetTranslation = sentence.translations[targetLang];
  const nativePrompt = sentence.translations[nativeLang].tokens.join(nativeMeta.joiner);
  const expectedText = targetTranslation.tokens.join(targetMeta.joiner);
  // Chars the learner actually has to type — accents are folded and leading ¿/¡ are optional,
  // so this stays correct whether or not they typed those (a plain keyboard usually can't).
  const requiredLength = normalizeForMatch(expectedText).length;

  function fireFeedback(label: Feedback["label"], comboValue: number, ok: boolean) {
    feedbackId.current += 1;
    setFeedback({ id: feedbackId.current, label, combo: comboValue, ok });
    window.setTimeout(() => {
      setFeedback((f) => (f?.id === feedbackId.current ? null : f));
    }, 550);
  }

  function resetForNextSentence() {
    setInput("");
    setShowHint(false);
    setMissedThisSentence(false);
  }

  // Accepts the just-updated tallies explicitly, since the state setters above
  // haven't flushed yet when the final sentence completes the lesson in the same tick.
  function advanceSentence(tallies: { correctFirstTry: number; mistakes: number; maxCombo: number; score: number }) {
    if (sentenceIndex + 1 < sentences.length) {
      setSentenceIndex(sentenceIndex + 1);
      resetForNextSentence();
      return;
    }
    onComplete({
      categoryId,
      nativeLang,
      targetLang,
      totalTokens: sentences.length,
      ...tallies,
    });
  }

  function evaluate(value: string) {
    if (normalizeForMatch(value) === normalizeForMatch(expectedText)) {
      const nextCombo = combo + 1;
      const gained = scoreForCombo(nextCombo);
      const newMaxCombo = Math.max(maxCombo, nextCombo);
      const newScore = score + gained;
      const newCorrectFirstTry = missedThisSentence ? correctFirstTry : correctFirstTry + 1;
      setCombo(nextCombo);
      setMaxCombo(newMaxCombo);
      setScore(newScore);
      setCorrectFirstTry(newCorrectFirstTry);
      fireFeedback(nextCombo >= 20 ? "Perfect!" : nextCombo >= 5 ? "Great!" : "Perfect!", nextCombo, true);
      advanceSentence({ correctFirstTry: newCorrectFirstTry, mistakes, maxCombo: newMaxCombo, score: newScore });
    } else {
      setCombo(0);
      setMissedThisSentence(true);
      setMistakes((m) => m + 1);
      fireFeedback("Try again", 0, false);
      setInput("");
    }
  }

  function handleChange(value: string) {
    setInput(value);
    if (normalizeForMatch(value).length >= requiredLength) {
      evaluate(value);
    }
  }

  const sentenceProgress =
    (sentenceIndex + Math.min(input.length / Math.max(requiredLength, 1), 1)) / sentences.length;

  // Walk the full target sentence, overlaying what's been typed so far (colored)
  // on top of the still-untyped remainder (shown as a muted "answer" to copy).
  const typedChars = Array.from(input);
  let typedIndex = 0;
  const displayChars: { key: number; ch: string; state: "correct" | "wrong" | "ghost" | "optional" }[] = [];
  Array.from(expectedText).forEach((ch, i) => {
    if (OPTIONAL_LEADING_PUNCT.has(ch)) {
      const typedIt = typedIndex < typedChars.length && typedChars[typedIndex] === ch;
      if (typedIt) {
        displayChars.push({ key: i, ch, state: "correct" });
        typedIndex++;
      } else {
        // Not typed (most keyboards can't produce ¿/¡) — show it dimmed, don't consume input for it.
        displayChars.push({ key: i, ch, state: "optional" });
      }
      return;
    }
    if (typedIndex < typedChars.length) {
      const typedCh = typedChars[typedIndex];
      const correct = foldDiacritics(typedCh).toLowerCase() === foldDiacritics(ch).toLowerCase();
      displayChars.push({ key: i, ch: typedCh, state: correct ? "correct" : "wrong" });
      typedIndex++;
    } else {
      displayChars.push({ key: i, ch, state: "ghost" });
    }
  });

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

          {/* Typewriter line: the answer is always visible (copy it), coloring as you type over it. */}
          <div dir={targetMeta.dir} className="text-center font-serif text-2xl min-h-[2.5rem] tracking-wide">
            {displayChars.map(({ key, ch, state }) => (
              <span
                key={key}
                className={cn(
                  state === "correct" && "text-success",
                  state === "wrong" && "text-destructive underline",
                  state === "ghost" && "text-muted-foreground",
                  state === "optional" && "text-muted-foreground opacity-50",
                )}
              >
                {ch}
              </span>
            ))}
            <span className="inline-block w-0.5 h-6 bg-primary align-middle animate-pulse ml-0.5" />
          </div>

          <div className="flex flex-col items-center gap-3">
            <input
              autoFocus
              dir={targetMeta.dir}
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  evaluate(input);
                }
              }}
              placeholder={`Type in ${targetMeta.name}…`}
              className={cn(
                "w-full max-w-md px-4 py-3 rounded-xl border-2 bg-card text-center font-sans text-lg outline-none transition-colors",
                missedThisSentence ? "border-destructive" : "border-border focus:border-primary",
              )}
            />
            <div className="flex items-center gap-3">
              {targetMeta.hasRomanization && targetTranslation.romanization && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowHint((v) => !v)}
                  className="flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" /> Pronunciation
                </Button>
              )}
            </div>
            {showHint && targetTranslation.romanization && (
              <p className="text-muted-foreground font-sans text-sm italic">
                {targetTranslation.romanization.join(" ")}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
