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
}

export const LANGUAGES: Record<LanguageCode, Language> = {
  en: { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", dir: "ltr", joiner: " ", hasRomanization: false },
  es: { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", dir: "ltr", joiner: " ", hasRomanization: false },
  de: { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", dir: "ltr", joiner: " ", hasRomanization: false },
  it: { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", dir: "ltr", joiner: " ", hasRomanization: false },
  ja: { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", dir: "ltr", joiner: "", hasRomanization: true },
  tl: { code: "tl", name: "Tagalog", nativeName: "Tagalog", flag: "🇵🇭", dir: "ltr", joiner: " ", hasRomanization: false },
  ru: { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", dir: "ltr", joiner: " ", hasRomanization: true },
  fr: { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", dir: "ltr", joiner: " ", hasRomanization: false },
  pt: { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹", dir: "ltr", joiner: " ", hasRomanization: false },
  ar: { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", dir: "rtl", joiner: " ", hasRomanization: true },
};

export const LANGUAGE_LIST = Object.values(LANGUAGES);
