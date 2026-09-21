export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickVoice(langTag: string): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const base = langTag.split("-")[0].toLowerCase();
  return (
    voices.find((v) => v.lang.toLowerCase() === langTag.toLowerCase()) ??
    voices.find((v) => v.lang.toLowerCase().startsWith(base))
  );
}

/** Speaks text aloud via the browser's built-in speech synthesis. Silently no-ops if unsupported. */
export function speak(text: string, langTag: string, rate = 0.9): void {
  if (!isSpeechSupported() || !text.trim()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langTag;
  utterance.rate = rate;
  const voice = pickVoice(langTag);
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}
