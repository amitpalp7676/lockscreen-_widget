import type { LanguageCode } from "./languages";

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: "greetings", name: "Greetings & Basics", icon: "👋" },
  { id: "daily", name: "Daily Life", icon: "🌤️" },
  { id: "food", name: "Food & Dining", icon: "🍽️" },
  { id: "travel", name: "Travel", icon: "✈️" },
];

export interface SentenceTranslation {
  /** Words/chunks in natural reading order, revealed progressively during practice. */
  tokens: string[];
  /** Optional per-token romanization, for non-Latin scripts (ja, ru, ar). */
  romanization?: string[];
}

export interface Sentence {
  id: string;
  categoryId: string;
  translations: Record<LanguageCode, SentenceTranslation>;
}

export const SENTENCES: Sentence[] = [
  {
    id: "greetings-1",
    categoryId: "greetings",
    translations: {
      en: { tokens: ["Hello,", "how", "are", "you?"] },
      es: { tokens: ["Hola,", "¿Cómo", "estás?"] },
      de: { tokens: ["Hallo,", "wie", "geht", "es", "dir?"] },
      it: { tokens: ["Ciao,", "come", "stai?"] },
      ja: { tokens: ["こんにちは、", "お元気", "ですか?"], romanization: ["Konnichiwa,", "ogenki", "desu ka?"] },
      tl: { tokens: ["Kumusta", "ka?"] },
      ru: { tokens: ["Привет,", "как", "дела?"], romanization: ["Privet,", "kak", "dela?"] },
      fr: { tokens: ["Bonjour,", "comment", "ça", "va?"] },
      pt: { tokens: ["Olá,", "como", "você", "está?"] },
      ar: { tokens: ["مرحباً،", "كيف", "حالك؟"], romanization: ["Marhaban,", "kayfa", "haluk?"] },
    },
  },
  {
    id: "greetings-2",
    categoryId: "greetings",
    translations: {
      en: { tokens: ["My", "name", "is", "Anna."] },
      es: { tokens: ["Mi", "nombre", "es", "Ana."] },
      de: { tokens: ["Mein", "Name", "ist", "Anna."] },
      it: { tokens: ["Mi", "chiamo", "Anna."] },
      ja: { tokens: ["私の", "名前は", "アンナです。"], romanization: ["Watashi no", "namae wa", "Anna desu."] },
      tl: { tokens: ["Ang", "pangalan", "ko", "ay", "Anna."] },
      ru: { tokens: ["Меня", "зовут", "Анна."], romanization: ["Menya", "zovut", "Anna."] },
      fr: { tokens: ["Je", "m'appelle", "Anna."] },
      pt: { tokens: ["Meu", "nome", "é", "Anna."] },
      ar: { tokens: ["اسمي", "آنا."], romanization: ["Ismi", "Anna."] },
    },
  },
  {
    id: "greetings-3",
    categoryId: "greetings",
    translations: {
      en: { tokens: ["Nice", "to", "meet", "you."] },
      es: { tokens: ["Mucho", "gusto."] },
      de: { tokens: ["Freut", "mich,", "dich", "kennenzulernen."] },
      it: { tokens: ["Piacere", "di", "conoscerti."] },
      ja: { tokens: ["はじめまして。"], romanization: ["Hajimemashite."] },
      tl: { tokens: ["Ikinagagalak", "kong", "makilala", "ka."] },
      ru: { tokens: ["Приятно", "познакомиться."], romanization: ["Priyatno", "poznakomit'sya."] },
      fr: { tokens: ["Enchanté", "de", "te", "rencontrer."] },
      pt: { tokens: ["Prazer", "em", "conhecê-lo."] },
      ar: { tokens: ["تشرفت", "بمعرفتك."], romanization: ["Tasharraftu", "bima'rifatik."] },
    },
  },
  {
    id: "greetings-4",
    categoryId: "greetings",
    translations: {
      en: { tokens: ["Thank", "you", "very", "much."] },
      es: { tokens: ["Muchas", "gracias."] },
      de: { tokens: ["Vielen", "Dank."] },
      it: { tokens: ["Grazie", "mille."] },
      ja: { tokens: ["どうも", "ありがとうございます。"], romanization: ["Doumo", "arigatou gozaimasu."] },
      tl: { tokens: ["Maraming", "salamat."] },
      ru: { tokens: ["Большое", "спасибо."], romanization: ["Bol'shoye", "spasibo."] },
      fr: { tokens: ["Merci", "beaucoup."] },
      pt: { tokens: ["Muito", "obrigado."] },
      ar: { tokens: ["شكراً", "جزيلاً."], romanization: ["Shukran", "jazilan."] },
    },
  },
  {
    id: "greetings-5",
    categoryId: "greetings",
    translations: {
      en: { tokens: ["See", "you", "tomorrow."] },
      es: { tokens: ["Hasta", "mañana."] },
      de: { tokens: ["Bis", "morgen."] },
      it: { tokens: ["Ci", "vediamo", "domani."] },
      ja: { tokens: ["また", "明日。"], romanization: ["Mata", "ashita."] },
      tl: { tokens: ["Hanggang", "bukas."] },
      ru: { tokens: ["До", "завтра."], romanization: ["Do", "zavtra."] },
      fr: { tokens: ["À", "demain."] },
      pt: { tokens: ["Até", "amanhã."] },
      ar: { tokens: ["أراك", "غداً."], romanization: ["Araka", "ghadan."] },
    },
  },

  {
    id: "daily-1",
    categoryId: "daily",
    translations: {
      en: { tokens: ["I", "wake", "up", "early", "every", "morning."] },
      es: { tokens: ["Me", "despierto", "temprano", "cada", "mañana."] },
      de: { tokens: ["Ich", "wache", "jeden", "Morgen", "früh", "auf."] },
      it: { tokens: ["Mi", "sveglio", "presto", "ogni", "mattina."] },
      ja: { tokens: ["私は", "毎朝", "早く", "起きます。"], romanization: ["Watashi wa", "maiasa", "hayaku", "okimasu."] },
      tl: { tokens: ["Gumigising", "ako", "nang", "maaga", "tuwing", "umaga."] },
      ru: { tokens: ["Я", "просыпаюсь", "рано", "каждое", "утро."], romanization: ["Ya", "prosypayus'", "rano", "kazhdoye", "utro."] },
      fr: { tokens: ["Je", "me", "réveille", "tôt", "chaque", "matin."] },
      pt: { tokens: ["Eu", "acordo", "cedo", "todas", "as", "manhãs."] },
      ar: { tokens: ["أستيقظ", "مبكراً", "كل", "صباح."], romanization: ["Astayqizu", "mubakkiran", "kulla", "sabah."] },
    },
  },
  {
    id: "daily-2",
    categoryId: "daily",
    translations: {
      en: { tokens: ["She", "works", "at", "a", "hospital."] },
      es: { tokens: ["Ella", "trabaja", "en", "un", "hospital."] },
      de: { tokens: ["Sie", "arbeitet", "in", "einem", "Krankenhaus."] },
      it: { tokens: ["Lei", "lavora", "in", "un", "ospedale."] },
      ja: { tokens: ["彼女は", "病院で", "働いています。"], romanization: ["Kanojo wa", "byouin de", "hataraite imasu."] },
      tl: { tokens: ["Nagtatrabaho", "siya", "sa", "ospital."] },
      ru: { tokens: ["Она", "работает", "в", "больнице."], romanization: ["Ona", "rabotayet", "v", "bol'nitse."] },
      fr: { tokens: ["Elle", "travaille", "dans", "un", "hôpital."] },
      pt: { tokens: ["Ela", "trabalha", "em", "um", "hospital."] },
      ar: { tokens: ["تعمل", "في", "مستشفى."], romanization: ["Ta'malu", "fi", "mustashfa."] },
    },
  },
  {
    id: "daily-3",
    categoryId: "daily",
    translations: {
      en: { tokens: ["We", "are", "learning", "a", "new", "language."] },
      es: { tokens: ["Estamos", "aprendiendo", "un", "nuevo", "idioma."] },
      de: { tokens: ["Wir", "lernen", "eine", "neue", "Sprache."] },
      it: { tokens: ["Stiamo", "imparando", "una", "nuova", "lingua."] },
      ja: { tokens: ["私たちは", "新しい", "言語を", "学んでいます。"], romanization: ["Watashitachi wa", "atarashii", "gengo o", "manande imasu."] },
      tl: { tokens: ["Natututo", "kami", "ng", "bagong", "wika."] },
      ru: { tokens: ["Мы", "изучаем", "новый", "язык."], romanization: ["My", "izuchayem", "novyy", "yazyk."] },
      fr: { tokens: ["Nous", "apprenons", "une", "nouvelle", "langue."] },
      pt: { tokens: ["Estamos", "aprendendo", "um", "novo", "idioma."] },
      ar: { tokens: ["نحن", "نتعلم", "لغة", "جديدة."], romanization: ["Nahnu", "nata'allamu", "lughatan", "jadidatan."] },
    },
  },
  {
    id: "daily-4",
    categoryId: "daily",
    translations: {
      en: { tokens: ["He", "likes", "to", "read", "books."] },
      es: { tokens: ["A", "él", "le", "gusta", "leer", "libros."] },
      de: { tokens: ["Er", "liest", "gerne", "Bücher."] },
      it: { tokens: ["A", "lui", "piace", "leggere", "libri."] },
      ja: { tokens: ["彼は", "本を", "読むのが", "好きです。"], romanization: ["Kare wa", "hon o", "yomu no ga", "suki desu."] },
      tl: { tokens: ["Gusto", "niyang", "magbasa", "ng", "mga", "libro."] },
      ru: { tokens: ["Он", "любит", "читать", "книги."], romanization: ["On", "lyubit", "chitat'", "knigi."] },
      fr: { tokens: ["Il", "aime", "lire", "des", "livres."] },
      pt: { tokens: ["Ele", "gosta", "de", "ler", "livros."] },
      ar: { tokens: ["يحب", "قراءة", "الكتب."], romanization: ["Yuhibbu", "qira'ata", "al-kutub."] },
    },
  },
  {
    id: "daily-5",
    categoryId: "daily",
    translations: {
      en: { tokens: ["I", "need", "to", "buy", "some", "milk."] },
      es: { tokens: ["Necesito", "comprar", "leche."] },
      de: { tokens: ["Ich", "muss", "Milch", "kaufen."] },
      it: { tokens: ["Devo", "comprare", "del", "latte."] },
      ja: { tokens: ["牛乳を", "買う", "必要が", "あります。"], romanization: ["Gyuunyuu o", "kau", "hitsuyou ga", "arimasu."] },
      tl: { tokens: ["Kailangan", "kong", "bumili", "ng", "gatas."] },
      ru: { tokens: ["Мне", "нужно", "купить", "молоко."], romanization: ["Mne", "nuzhno", "kupit'", "moloko."] },
      fr: { tokens: ["Je", "dois", "acheter", "du", "lait."] },
      pt: { tokens: ["Eu", "preciso", "comprar", "leite."] },
      ar: { tokens: ["أحتاج", "أن", "أشتري", "حليباً."], romanization: ["Ahtaju", "an", "ashtariya", "haliban."] },
    },
  },

  {
    id: "food-1",
    categoryId: "food",
    translations: {
      en: { tokens: ["I", "like", "to", "eat", "apples."] },
      es: { tokens: ["Me", "gusta", "comer", "manzanas."] },
      de: { tokens: ["Ich", "esse", "gerne", "Äpfel."] },
      it: { tokens: ["Mi", "piace", "mangiare", "le", "mele."] },
      ja: { tokens: ["私は", "りんごを", "食べるのが", "好きです。"], romanization: ["Watashi wa", "ringo o", "taberu no ga", "suki desu."] },
      tl: { tokens: ["Gusto", "kong", "kumain", "ng", "mansanas."] },
      ru: { tokens: ["Я", "люблю", "есть", "яблоки."], romanization: ["Ya", "lyublyu", "yest'", "yabloki."] },
      fr: { tokens: ["J'aime", "manger", "des", "pommes."] },
      pt: { tokens: ["Eu", "gosto", "de", "comer", "maçãs."] },
      ar: { tokens: ["أحب", "أكل", "التفاح."], romanization: ["Uhibbu", "akla", "at-tuffah."] },
    },
  },
  {
    id: "food-2",
    categoryId: "food",
    translations: {
      en: { tokens: ["Can", "I", "have", "the", "menu,", "please?"] },
      es: { tokens: ["¿Puedo", "ver", "el", "menú,", "por", "favor?"] },
      de: { tokens: ["Kann", "ich", "bitte", "die", "Speisekarte", "haben?"] },
      it: { tokens: ["Posso", "avere", "il", "menù,", "per", "favore?"] },
      ja: { tokens: ["メニューを", "いただけますか?"], romanization: ["Menyuu o", "itadakemasu ka?"] },
      tl: { tokens: ["Pwede", "po", "bang", "makuha", "ang", "menu?"] },
      ru: { tokens: ["Можно", "меню,", "пожалуйста?"], romanization: ["Mozhno", "menyu,", "pozhaluysta?"] },
      fr: { tokens: ["Puis-je", "avoir", "le", "menu,", "s'il", "vous", "plaît?"] },
      pt: { tokens: ["Posso", "ver", "o", "cardápio,", "por", "favor?"] },
      ar: { tokens: ["هل", "يمكنني", "رؤية", "القائمة", "من", "فضلك؟"], romanization: ["Hal", "yumkinuni", "ru'yatu", "al-qa'imah", "min", "fadlik?"] },
    },
  },
  {
    id: "food-3",
    categoryId: "food",
    translations: {
      en: { tokens: ["This", "coffee", "is", "very", "hot."] },
      es: { tokens: ["Este", "café", "está", "muy", "caliente."] },
      de: { tokens: ["Dieser", "Kaffee", "ist", "sehr", "heiß."] },
      it: { tokens: ["Questo", "caffè", "è", "molto", "caldo."] },
      ja: { tokens: ["この", "コーヒーは", "とても", "熱いです。"], romanization: ["Kono", "koohii wa", "totemo", "atsui desu."] },
      tl: { tokens: ["Napakainit", "ng", "kape", "na", "ito."] },
      ru: { tokens: ["Этот", "кофе", "очень", "горячий."], romanization: ["Etot", "kofe", "ochen'", "goryachiy."] },
      fr: { tokens: ["Ce", "café", "est", "très", "chaud."] },
      pt: { tokens: ["Este", "café", "está", "muito", "quente."] },
      ar: { tokens: ["هذه", "القهوة", "ساخنة", "جداً."], romanization: ["Hadhihi", "al-qahwa", "sakhinah", "jiddan."] },
    },
  },
  {
    id: "food-4",
    categoryId: "food",
    translations: {
      en: { tokens: ["The", "food", "here", "is", "delicious."] },
      es: { tokens: ["La", "comida", "aquí", "es", "deliciosa."] },
      de: { tokens: ["Das", "Essen", "hier", "ist", "köstlich."] },
      it: { tokens: ["Il", "cibo", "qui", "è", "delizioso."] },
      ja: { tokens: ["ここの", "料理は", "とても", "美味しいです。"], romanization: ["Koko no", "ryouri wa", "totemo", "oishii desu."] },
      tl: { tokens: ["Napakasarap", "ng", "pagkain", "dito."] },
      ru: { tokens: ["Еда", "здесь", "очень", "вкусная."], romanization: ["Yeda", "zdes'", "ochen'", "vkusnaya."] },
      fr: { tokens: ["La", "nourriture", "ici", "est", "délicieuse."] },
      pt: { tokens: ["A", "comida", "aqui", "é", "deliciosa."] },
      ar: { tokens: ["الطعام", "هنا", "لذيذ."], romanization: ["At-ta'am", "huna", "ladhidh."] },
    },
  },
  {
    id: "food-5",
    categoryId: "food",
    translations: {
      en: { tokens: ["She", "drinks", "water", "every", "day."] },
      es: { tokens: ["Ella", "bebe", "agua", "todos", "los", "días."] },
      de: { tokens: ["Sie", "trinkt", "jeden", "Tag", "Wasser."] },
      it: { tokens: ["Lei", "beve", "acqua", "ogni", "giorno."] },
      ja: { tokens: ["彼女は", "毎日", "水を", "飲みます。"], romanization: ["Kanojo wa", "mainichi", "mizu o", "nomimasu."] },
      tl: { tokens: ["Umiinom", "siya", "ng", "tubig", "araw-araw."] },
      ru: { tokens: ["Она", "пьёт", "воду", "каждый", "день."], romanization: ["Ona", "p'yot", "vodu", "kazhdyy", "den'."] },
      fr: { tokens: ["Elle", "boit", "de", "l'eau", "tous", "les", "jours."] },
      pt: { tokens: ["Ela", "bebe", "água", "todos", "os", "dias."] },
      ar: { tokens: ["تشرب", "الماء", "كل", "يوم."], romanization: ["Tashrabu", "al-ma'a", "kulla", "yawm."] },
    },
  },

  {
    id: "travel-1",
    categoryId: "travel",
    translations: {
      en: { tokens: ["Where", "is", "the", "train", "station?"] },
      es: { tokens: ["¿Dónde", "está", "la", "estación", "de", "tren?"] },
      de: { tokens: ["Wo", "ist", "der", "Bahnhof?"] },
      it: { tokens: ["Dov'è", "la", "stazione", "dei", "treni?"] },
      ja: { tokens: ["駅は", "どこですか?"], romanization: ["Eki wa", "doko desu ka?"] },
      tl: { tokens: ["Saan", "po", "ang", "istasyon", "ng", "tren?"] },
      ru: { tokens: ["Где", "находится", "вокзал?"], romanization: ["Gde", "nakhoditsya", "vokzal?"] },
      fr: { tokens: ["Où", "est", "la", "gare?"] },
      pt: { tokens: ["Onde", "fica", "a", "estação", "de", "trem?"] },
      ar: { tokens: ["أين", "محطة", "القطار؟"], romanization: ["Ayna", "mahattatu", "al-qitar?"] },
    },
  },
  {
    id: "travel-2",
    categoryId: "travel",
    translations: {
      en: { tokens: ["I", "would", "like", "to", "book", "a", "hotel", "room."] },
      es: { tokens: ["Quisiera", "reservar", "una", "habitación", "de", "hotel."] },
      de: { tokens: ["Ich", "möchte", "ein", "Hotelzimmer", "buchen."] },
      it: { tokens: ["Vorrei", "prenotare", "una", "camera", "d'albergo."] },
      ja: { tokens: ["ホテルの", "部屋を", "予約したいです。"], romanization: ["Hoteru no", "heya o", "yoyaku shitai desu."] },
      tl: { tokens: ["Gusto", "kong", "magpareserba", "ng", "kuwarto", "sa", "hotel."] },
      ru: { tokens: ["Я", "хотел", "бы", "забронировать", "номер", "в", "отеле."], romanization: ["Ya", "khotel", "by", "zabronirovat'", "nomer", "v", "otele."] },
      fr: { tokens: ["Je", "voudrais", "réserver", "une", "chambre", "d'hôtel."] },
      pt: { tokens: ["Eu", "gostaria", "de", "reservar", "um", "quarto", "de", "hotel."] },
      ar: { tokens: ["أريد", "حجز", "غرفة", "في", "فندق."], romanization: ["Uridu", "hajza", "ghurfatin", "fi", "funduq."] },
    },
  },
  {
    id: "travel-3",
    categoryId: "travel",
    translations: {
      en: { tokens: ["How", "much", "does", "this", "cost?"] },
      es: { tokens: ["¿Cuánto", "cuesta", "esto?"] },
      de: { tokens: ["Wie", "viel", "kostet", "das?"] },
      it: { tokens: ["Quanto", "costa", "questo?"] },
      ja: { tokens: ["これは", "いくらですか?"], romanization: ["Kore wa", "ikura desu ka?"] },
      tl: { tokens: ["Magkano", "po", "ito?"] },
      ru: { tokens: ["Сколько", "это", "стоит?"], romanization: ["Skol'ko", "eto", "stoit?"] },
      fr: { tokens: ["Combien", "ça", "coûte?"] },
      pt: { tokens: ["Quanto", "custa", "isso?"] },
      ar: { tokens: ["كم", "يكلف", "هذا؟"], romanization: ["Kam", "yukallifu", "hadha?"] },
    },
  },
  {
    id: "travel-4",
    categoryId: "travel",
    translations: {
      en: { tokens: ["The", "airport", "is", "far", "from", "here."] },
      es: { tokens: ["El", "aeropuerto", "está", "lejos", "de", "aquí."] },
      de: { tokens: ["Der", "Flughafen", "ist", "weit", "von", "hier."] },
      it: { tokens: ["L'aeroporto", "è", "lontano", "da", "qui."] },
      ja: { tokens: ["空港は", "ここから", "遠いです。"], romanization: ["Kuukou wa", "koko kara", "tooi desu."] },
      tl: { tokens: ["Malayo", "ang", "paliparan", "mula", "rito."] },
      ru: { tokens: ["Аэропорт", "далеко", "отсюда."], romanization: ["Aeroport", "daleko", "otsyuda."] },
      fr: { tokens: ["L'aéroport", "est", "loin", "d'ici."] },
      pt: { tokens: ["O", "aeroporto", "fica", "longe", "daqui."] },
      ar: { tokens: ["المطار", "بعيد", "من", "هنا."], romanization: ["Al-matar", "ba'id", "min", "huna."] },
    },
  },
  {
    id: "travel-5",
    categoryId: "travel",
    translations: {
      en: { tokens: ["Can", "you", "help", "me,", "please?"] },
      es: { tokens: ["¿Puede", "ayudarme,", "por", "favor?"] },
      de: { tokens: ["Können", "Sie", "mir", "bitte", "helfen?"] },
      it: { tokens: ["Può", "aiutarmi,", "per", "favore?"] },
      ja: { tokens: ["手伝って", "いただけますか?"], romanization: ["Tetsudatte", "itadakemasu ka?"] },
      tl: { tokens: ["Pwede", "mo", "po", "ba", "akong", "tulungan?"] },
      ru: { tokens: ["Вы", "можете", "мне", "помочь,", "пожалуйста?"], romanization: ["Vy", "mozhete", "mne", "pomoch',", "pozhaluysta?"] },
      fr: { tokens: ["Pouvez-vous", "m'aider,", "s'il", "vous", "plaît?"] },
      pt: { tokens: ["Você", "pode", "me", "ajudar,", "por", "favor?"] },
      ar: { tokens: ["هل", "يمكنك", "مساعدتي", "من", "فضلك؟"], romanization: ["Hal", "yumkinuka", "musa'adati", "min", "fadlik?"] },
    },
  },
];

export function sentencesForCategory(categoryId: string): Sentence[] {
  return SENTENCES.filter((s) => s.categoryId === categoryId);
}
