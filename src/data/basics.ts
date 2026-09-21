import type { LanguageCode } from "./languages";

export interface BasicWord {
  label: string;
  word: string;
  romanization?: string;
}

export interface LanguageBasics {
  script: string;
  tip: string;
  numbers: BasicWord[];
  essentials: BasicWord[];
}

export const BASICS: Record<LanguageCode, LanguageBasics> = {
  en: {
    script: "Latin alphabet (26 letters)",
    tip: "Stress usually falls on the first syllable of a word.",
    numbers: [
      { label: "1", word: "one" },
      { label: "2", word: "two" },
      { label: "3", word: "three" },
      { label: "4", word: "four" },
      { label: "5", word: "five" },
    ],
    essentials: [
      { label: "Yes", word: "Yes" },
      { label: "No", word: "No" },
      { label: "Please", word: "Please" },
      { label: "Thank you", word: "Thank you" },
      { label: "Hello", word: "Hello" },
      { label: "Goodbye", word: "Goodbye" },
    ],
  },
  es: {
    script: "Latin alphabet, plus ñ",
    tip: "Every vowel has one consistent sound — no gliding diphthongs like in English.",
    numbers: [
      { label: "1", word: "uno" },
      { label: "2", word: "dos" },
      { label: "3", word: "tres" },
      { label: "4", word: "cuatro" },
      { label: "5", word: "cinco" },
    ],
    essentials: [
      { label: "Yes", word: "Sí" },
      { label: "No", word: "No" },
      { label: "Please", word: "Por favor" },
      { label: "Thank you", word: "Gracias" },
      { label: "Hello", word: "Hola" },
      { label: "Goodbye", word: "Adiós" },
    ],
  },
  de: {
    script: "Latin alphabet, plus ä ö ü ß",
    tip: "All nouns are capitalized, and 'w' is pronounced like an English 'v'.",
    numbers: [
      { label: "1", word: "eins" },
      { label: "2", word: "zwei" },
      { label: "3", word: "drei" },
      { label: "4", word: "vier" },
      { label: "5", word: "fünf" },
    ],
    essentials: [
      { label: "Yes", word: "Ja" },
      { label: "No", word: "Nein" },
      { label: "Please", word: "Bitte" },
      { label: "Thank you", word: "Danke" },
      { label: "Hello", word: "Hallo" },
      { label: "Goodbye", word: "Tschüss" },
    ],
  },
  it: {
    script: "Latin alphabet",
    tip: "Double consonants are held longer — 'nonno' (grandpa) vs 'nono' (ninth).",
    numbers: [
      { label: "1", word: "uno" },
      { label: "2", word: "due" },
      { label: "3", word: "tre" },
      { label: "4", word: "quattro" },
      { label: "5", word: "cinque" },
    ],
    essentials: [
      { label: "Yes", word: "Sì" },
      { label: "No", word: "No" },
      { label: "Please", word: "Per favore" },
      { label: "Thank you", word: "Grazie" },
      { label: "Hello", word: "Ciao" },
      { label: "Goodbye", word: "Arrivederci" },
    ],
  },
  ja: {
    script: "Hiragana & katakana (phonetic syllables) plus kanji (borrowed characters)",
    tip: "Every syllable is a consistent consonant+vowel beat — there's no strong stress accent like in English.",
    numbers: [
      { label: "1", word: "一", romanization: "ichi" },
      { label: "2", word: "二", romanization: "ni" },
      { label: "3", word: "三", romanization: "san" },
      { label: "4", word: "四", romanization: "yon" },
      { label: "5", word: "五", romanization: "go" },
    ],
    essentials: [
      { label: "Yes", word: "はい", romanization: "hai" },
      { label: "No", word: "いいえ", romanization: "iie" },
      { label: "Please", word: "お願いします", romanization: "onegaishimasu" },
      { label: "Thank you", word: "ありがとう", romanization: "arigatou" },
      { label: "Hello", word: "こんにちは", romanization: "konnichiwa" },
      { label: "Goodbye", word: "さようなら", romanization: "sayounara" },
    ],
  },
  tl: {
    script: "Latin alphabet",
    tip: "Word stress can change meaning — 'buhay' (life) vs 'buháy' (alive).",
    numbers: [
      { label: "1", word: "isa" },
      { label: "2", word: "dalawa" },
      { label: "3", word: "tatlo" },
      { label: "4", word: "apat" },
      { label: "5", word: "lima" },
    ],
    essentials: [
      { label: "Yes", word: "Oo" },
      { label: "No", word: "Hindi" },
      { label: "Please", word: "Pakiusap" },
      { label: "Thank you", word: "Salamat" },
      { label: "Hello", word: "Kumusta" },
      { label: "Goodbye", word: "Paalam" },
    ],
  },
  ru: {
    script: "Cyrillic alphabet (33 letters)",
    tip: "An unstressed 'o' is often pronounced more like 'ah'.",
    numbers: [
      { label: "1", word: "один", romanization: "odin" },
      { label: "2", word: "два", romanization: "dva" },
      { label: "3", word: "три", romanization: "tri" },
      { label: "4", word: "четыре", romanization: "chetyre" },
      { label: "5", word: "пять", romanization: "pyat'" },
    ],
    essentials: [
      { label: "Yes", word: "Да", romanization: "Da" },
      { label: "No", word: "Нет", romanization: "Net" },
      { label: "Please", word: "Пожалуйста", romanization: "Pozhaluysta" },
      { label: "Thank you", word: "Спасибо", romanization: "Spasibo" },
      { label: "Hello", word: "Привет", romanization: "Privet" },
      { label: "Goodbye", word: "Пока", romanization: "Poka" },
    ],
  },
  fr: {
    script: "Latin alphabet, plus accents (é è ê ç)",
    tip: "Most final consonants are silent — 'petit' sounds like 'puh-tee'.",
    numbers: [
      { label: "1", word: "un" },
      { label: "2", word: "deux" },
      { label: "3", word: "trois" },
      { label: "4", word: "quatre" },
      { label: "5", word: "cinq" },
    ],
    essentials: [
      { label: "Yes", word: "Oui" },
      { label: "No", word: "Non" },
      { label: "Please", word: "S'il vous plaît" },
      { label: "Thank you", word: "Merci" },
      { label: "Hello", word: "Bonjour" },
      { label: "Goodbye", word: "Au revoir" },
    ],
  },
  pt: {
    script: "Latin alphabet, plus ã õ ç",
    tip: "Nasal vowels (ã, õ) are pronounced through the nose — there's no English equivalent.",
    numbers: [
      { label: "1", word: "um" },
      { label: "2", word: "dois" },
      { label: "3", word: "três" },
      { label: "4", word: "quatro" },
      { label: "5", word: "cinco" },
    ],
    essentials: [
      { label: "Yes", word: "Sim" },
      { label: "No", word: "Não" },
      { label: "Please", word: "Por favor" },
      { label: "Thank you", word: "Obrigado" },
      { label: "Hello", word: "Olá" },
      { label: "Goodbye", word: "Tchau" },
    ],
  },
  ar: {
    script: "Arabic abjad, written right-to-left, mostly consonant-based",
    tip: "Several sounds (ع ح ق) don't exist in English and are produced deeper in the throat.",
    numbers: [
      { label: "1", word: "واحد", romanization: "wahid" },
      { label: "2", word: "اثنان", romanization: "ithnan" },
      { label: "3", word: "ثلاثة", romanization: "thalatha" },
      { label: "4", word: "أربعة", romanization: "arba'a" },
      { label: "5", word: "خمسة", romanization: "khamsa" },
    ],
    essentials: [
      { label: "Yes", word: "نعم", romanization: "na'am" },
      { label: "No", word: "لا", romanization: "la" },
      { label: "Please", word: "من فضلك", romanization: "min fadlik" },
      { label: "Thank you", word: "شكراً", romanization: "shukran" },
      { label: "Hello", word: "مرحباً", romanization: "marhaban" },
      { label: "Goodbye", word: "مع السلامة", romanization: "ma'a as-salama" },
    ],
  },
};
