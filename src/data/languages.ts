export type LanguageCode =
  | "en"
  | "es"
  | "de"
  | "it"
  | "ja"
  | "tl"
  | "ru"
  | "fr"
  | "pt"
  | "ar";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  dir: "ltr" | "rtl";
  /** How tokens are joined into a displayed sentence in this language. */
  joiner: string;
  /** Whether learner-facing romanization hints are useful for this script. */
  hasRomanization: boolean;
  /** BCP-47 tag used to pick a speechSynthesis voice for this language. */
  speechLang: string;
}

export const LANGUAGES: Record<LanguageCode, Language> = {
  en: { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", dir: "ltr", joiner: " ", hasRomanization: false, speechLang: "en-US" },
  es: { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", dir: "ltr", joiner: " ", hasRomanization: false, speechLang: "es-ES" },
  de: { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", dir: "ltr", joiner: " ", hasRomanization: false, speechLang: "de-DE" },
  it: { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", dir: "ltr", joiner: " ", hasRomanization: false, speechLang: "it-IT" },
  ja: { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", dir: "ltr", joiner: "", hasRomanization: true, speechLang: "ja-JP" },
  tl: { code: "tl", name: "Tagalog", nativeName: "Tagalog", flag: "🇵🇭", dir: "ltr", joiner: " ", hasRomanization: false, speechLang: "fil-PH" },
  ru: { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", dir: "ltr", joiner: " ", hasRomanization: true, speechLang: "ru-RU" },
  fr: { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", dir: "ltr", joiner: " ", hasRomanization: false, speechLang: "fr-FR" },
  pt: { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹", dir: "ltr", joiner: " ", hasRomanization: false, speechLang: "pt-BR" },
  ar: { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", dir: "rtl", joiner: " ", hasRomanization: true, speechLang: "ar-SA" },
};

export const LANGUAGE_LIST = Object.values(LANGUAGES);
