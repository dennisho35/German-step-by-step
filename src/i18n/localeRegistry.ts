/**
 * 正式支援的 16 個 locale（不得多於或少於此清單）。
 * languageName 使用該語言的自稱名稱，flag 為對應國旗。
 */
export const LOCALES = [
  { code: 'en-GB', nativeName: 'English (UK)', flag: '🇬🇧' },
  { code: 'fr-FR', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ja-JP', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'es-ES', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ru-RU', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'uk-UA', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'it-IT', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ko-KR', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'th-TH', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'vi-VN', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'my-MM', nativeName: 'မြန်မာဘာသာ', flag: '🇲🇲' },
  { code: 'id-ID', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'fil-PH', nativeName: 'Filipino', flag: '🇵🇭' },
  { code: 'km-KH', nativeName: 'ភាសាខ្មែរ', flag: '🇰🇭' },
  { code: 'zh-HK', nativeName: '正體中文（香港）', flag: '🇭🇰' },
  { code: 'de-DE', nativeName: 'Deutsch', flag: '🇩🇪' },
] as const;

export type LocaleCode = (typeof LOCALES)[number]['code'];

/** 白名單檢查：避免無效 locale 導致崩潰 */
export function isSupportedLocale(code: string | null | undefined): code is LocaleCode {
  if (!code) return false;
  return LOCALES.some((l) => l.code === code);
}

/** 取得某個 locale 的註冊資訊 */
export function getLocaleMeta(code: LocaleCode) {
  return LOCALES.find((l) => l.code === code)!;
}

/**
 * 依裝置語言判斷初始 locale：
 * 取 navigator.languages，依序找第一個受支援的 locale；都不受支援時回退 en-GB。
 * 絕不自動轉成簡體中文；zh-CN/zh/zh-Simplified 一律視為不受支援 → en-GB。
 */
export function detectDeviceLocale(navigatorLangs: readonly string[] = []): LocaleCode {
  // 1) 完整/限定語系比對（含 zh-HK、zh-TW、zh-Hant → zh-HK）
  for (const raw of navigatorLangs) {
    const r = (raw || '').toLowerCase();
    const exact = LOCALES.find((l) => l.code.toLowerCase() === r);
    if (exact) return exact.code;
    if (r.startsWith('zh-hant') || r === 'zh-tw' || r === 'zh-hk') return 'zh-HK';
  }
  // 2) 語言前綴比對；zh 一律跳過（不支援簡體/未指定繁體）
  for (const raw of navigatorLangs) {
    const lang = (raw || '').split('-')[0].toLowerCase();
    if (lang === 'zh') continue;
    const match = LOCALES.find((l) => l.code.toLowerCase().startsWith(lang));
    if (match) return match.code;
  }
  return 'en-GB';
}
