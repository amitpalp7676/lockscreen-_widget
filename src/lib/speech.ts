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
  const synth = window.speechSynthesis;

  const doSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langTag;
    utterance.rate = rate;
    const voice = pickVoice(langTag);
    if (voice) utterance.voice = voice;
    synth.speak(utterance);
    // Chrome sometimes leaves the queue paused after a period of inactivity,
    // which otherwise makes newly queued speech silently wait forever.
    if (synth.paused) synth.resume();
  };

  if (synth.speaking || synth.pending) {
    synth.cancel();
    // Cancelling and speaking in the very same tick silently drops the new
    // utterance in Chromium — deferring a tick works around that.
    setTimeout(doSpeak, 50);
  } else {
    doSpeak();
  }
}
