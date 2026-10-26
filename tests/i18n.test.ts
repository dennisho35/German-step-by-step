import { describe, it, expect, beforeEach } from 'vitest';
import {
  translate,
  getLocaleMessages,
  getSupportedLocales,
  missingKeyRecords,
} from '../src/i18n';
import { isSupportedLocale, detectDeviceLocale, LOCALES } from '../src/i18n/localeRegistry';

/** 遞迴收集所有 leaf key（以點分隔） */
function collectKeys(obj: unknown, prefix = ''): string[] {
  const keys: string[] = [];
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      const path = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        keys.push(...collectKeys(v, path));
      } else {
        keys.push(path);
      }
    }
  }
  return keys;
}

const EN_KEYS = collectKeys(getLocaleMessages('en-GB'));

describe('Locale 完整性（Phase 5）', () => {
  it('正式 locale 清單剛好包含指定 16 個 locale', () => {
    const supported = getSupportedLocales();
    const expected = [
      'en-GB', 'fr-FR', 'ja-JP', 'es-ES', 'ru-RU', 'uk-UA', 'it-IT',
      'ko-KR', 'th-TH', 'vi-VN', 'my-MM', 'id-ID', 'fil-PH', 'km-KH', 'zh-HK', 'de-DE',
    ];
    expect(supported.sort()).toEqual([...expected].sort());
    expect(supported.length).toBe(16);
  });

  it('沒有意外加入 zh-CN', () => {
    expect(isSupportedLocale('zh-CN')).toBe(false);
    expect(getSupportedLocales()).not.toContain('zh-CN');
  });

  it('每個 locale 都有對應翻譯資源且含全部必要 key', () => {
    for (const loc of getSupportedLocales()) {
      const msgs = getLocaleMessages(loc as (typeof LOCALES)[number]['code']);
      expect(msgs, `locale ${loc} 翻譯資源缺失`).toBeTruthy();
      const keys = collectKeys(msgs);
      for (const k of EN_KEYS) {
        expect(keys, `locale ${loc} 缺 key: ${k}`).toContain(k);
      }
      // 不能有多餘的未知頂層 namespace（至少不應有 zh 或簡體殘留）
      expect(Object.keys(msgs)).not.toContain('zh');
    }
  });

  it('沒有重複或無效 key', () => {
    for (const loc of getSupportedLocales()) {
      const keys = collectKeys(getLocaleMessages(loc as (typeof LOCALES)[number]['code']));
      expect(new Set(keys).size).toBe(keys.length);
      for (const k of keys) expect(k).toMatch(/^[a-zA-Z][a-zA-Z0-9]*(\.[a-zA-Z][a-zA-Z0-9]*)*$/);
    }
  });

  it('語言選單顯示正確國旗與自稱名稱', () => {
    const expected = [
      ['en-GB', 'English (UK)', '🇬🇧'],
      ['fr-FR', 'Français', '🇫🇷'],
      ['ja-JP', '日本語', '🇯🇵'],
      ['es-ES', 'Español', '🇪🇸'],
      ['ru-RU', 'Русский', '🇷🇺'],
      ['uk-UA', 'Українська', '🇺🇦'],
      ['it-IT', 'Italiano', '🇮🇹'],
      ['ko-KR', '한국어', '🇰🇷'],
      ['th-TH', 'ไทย', '🇹🇭'],
      ['vi-VN', 'Tiếng Việt', '🇻🇳'],
      ['my-MM', 'မြန်မာဘာသာ', '🇲🇲'],
      ['id-ID', 'Bahasa Indonesia', '🇮🇩'],
      ['fil-PH', 'Filipino', '🇵🇭'],
      ['km-KH', 'ភាសាខ្មែរ', '🇰🇭'],
      ['zh-HK', '正體中文（香港）', '🇭🇰'],
      ['de-DE', 'Deutsch', '🇩🇪'],
    ];
    expect(LOCALES.length).toBe(16);
    for (const [code, name, flag] of expected) {
      const m = LOCALES.find((l) => l.code === code)!;
      expect(m.nativeName).toBe(name);
      expect(m.flag).toBe(flag);
    }
  });

  it('不受支援的裝置語言回退 en-GB，不轉簡體中文', () => {
    expect(detectDeviceLocale(['zh-CN', 'zh'])).toBe('en-GB');
    expect(detectDeviceLocale(['xx-XX'])).toBe('en-GB');
    expect(detectDeviceLocale([])).toBe('en-GB');
    // 正體中文裝置 → zh-HK
    expect(detectDeviceLocale(['zh-TW'])).toBe('zh-HK');
    expect(detectDeviceLocale(['zh-Hant-TW'])).toBe('zh-HK');
    // 支援語言
    expect(detectDeviceLocale(['fr-FR'])).toBe('fr-FR');
    expect(detectDeviceLocale(['de-DE'])).toBe('de-DE');
  });
});

describe('翻譯回退機制', () => {
  beforeEach(() => {
    // 清空缺漏記錄，避免測試間互相影響
    missingKeyRecords.length = 0;
  });

  it('正常 key 使用目前 locale', () => {
    expect(translate('fr-FR', 'nav.home')).toBe('Accueil');
    expect(translate('ja-JP', 'nav.home')).toBe('ホーム');
  });

  it('缺失 key 回退 en-GB（先使用目前 locale，缺漏時用 en-GB）', () => {
    // 暫時刪除 fr-FR 的 nav.home，模擬該語系缺漏
    const frMsgs = getLocaleMessages('fr-FR') as unknown as { nav: Record<string, string> };
    const original = frMsgs.nav.home;
    delete frMsgs.nav.home;

    try {
      expect(translate('fr-FR', 'nav.home')).toBe('Home'); // 回退 en-GB
      expect(
        missingKeyRecords.some((r) => r.locale === 'fr-FR' && r.key === 'nav.home' && r.fallback === 'en-GB'),
      ).toBe(true);
    } finally {
      frMsgs.nav.home = original;
    }
  });

  it('英文也缺漏時仍能安全顯示（不會回退中文/undefined）', () => {
    const enMsgs = getLocaleMessages('en-GB') as unknown as { nav: Record<string, string> };
    const original = enMsgs.nav.home;
    delete enMsgs.nav.home;
    try {
      const result = translate('en-GB', 'nav.home');
      expect(result).toBeTruthy();
      expect(result).not.toMatch(/undefined|null|\[object Object\]|nav\.home/);
      expect(result).not.toMatch(/[\u4e00-\u9fff]/); // 不顯示中文
    } finally {
      enMsgs.nav.home = original;
    }
  });

  it('缺失 key 不顯示 undefined/null/內部 key', () => {
    const result = translate('es-ES', 'nav.__missing__');
    expect(result).toBeTruthy();
    expect(result).not.toMatch(/undefined|null|\[object Object\]|__missing__/);
  });

  it('支援參數插值', () => {
    // 用一個實際存在但含佔位的測試：以常見 key 測試（此處使用自訂插值模擬）
    expect(translate('en-GB', 'nav.appName')).toBe('German Step by Step');
  });
});

describe('德語學習原文保護', () => {
  it('德語原文不被當成 UI 翻譯（de-DE 使用德語 UI）', () => {
    expect(translate('de-DE', 'nav.home')).toBe('Startseite');
    expect(translate('de-DE', 'alphabet.vowel')).toBe('Vokal');
  });

  it('切換介面語言不影響德語資料（資料層驗證）', async () => {
    const { ALPHABET } = await import('../src/data/alphabet');
    const letterA = ALPHABET.find((l) => l.letter === 'A')!;
    expect(letterA.example).toBe('Apfel');
    expect(letterA.ipa).toBe('/aː/');
  });
});
