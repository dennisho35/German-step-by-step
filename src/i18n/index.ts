import type { Messages, TranslationKey, MissingKeyRecord } from './translationTypes';
import { isSupportedLocale, type LocaleCode } from './localeRegistry';

/**
 * 集中式翻譯資源載入：所有 16 個 locale 在模組載入時靜態匯入。
 * 採 namespace 結構，型別由 translationTypes 驗證。
 */
import enGB from './messages/en-GB.json';
import frFR from './messages/fr-FR.json';
import jaJP from './messages/ja-JP.json';
import esES from './messages/es-ES.json';
import ruRU from './messages/ru-RU.json';
import ukUA from './messages/uk-UA.json';
import itIT from './messages/it-IT.json';
import koKR from './messages/ko-KR.json';
import thTH from './messages/th-TH.json';
import viVN from './messages/vi-VN.json';
import myMM from './messages/my-MM.json';
import idID from './messages/id-ID.json';
import filPH from './messages/fil-PH.json';
import kmKH from './messages/km-KH.json';
import zhHK from './messages/zh-HK.json';
import deDE from './messages/de-DE.json';

const messageMap: Record<LocaleCode, Messages> = {
  'en-GB': enGB as Messages,
  'fr-FR': frFR as Messages,
  'ja-JP': jaJP as Messages,
  'es-ES': esES as Messages,
  'ru-RU': ruRU as Messages,
  'uk-UA': ukUA as Messages,
  'it-IT': itIT as Messages,
  'ko-KR': koKR as Messages,
  'th-TH': thTH as Messages,
  'vi-VN': viVN as Messages,
  'my-MM': myMM as Messages,
  'id-ID': idID as Messages,
  'fil-PH': filPH as Messages,
  'km-KH': kmKH as Messages,
  'zh-HK': zhHK as Messages,
  'de-DE': deDE as Messages,
};

/** 依點分隔路徑取得翻譯值；任一層不存在則回傳 undefined */
function lookup(messages: Messages, key: string): string | undefined {
  const parts = key.split('.');
  let node: unknown = messages;
  for (const p of parts) {
    if (node === null || typeof node !== 'object') return undefined;
    node = (node as Record<string, unknown>)[p];
  }
  return typeof node === 'string' ? node : undefined;
}

const EN = 'en-GB';

/**
 * 開發環境缺漏記錄器：
 * - 只在開發模式啟用，避免正式版污染。
 * - 以 locale+key 去重，防止同一缺漏在每次渲染時無限重複記錄。
 */
const reportedMissing = new Set<string>();
export const missingKeyRecords: MissingKeyRecord[] = [];

function recordMissing(locale: LocaleCode, key: string, fallback: 'en-GB' | 'none') {
  const dedupe = `${locale}::${key}`;
  if (reportedMissing.has(dedupe)) return;
  reportedMissing.add(dedupe);
  const record: MissingKeyRecord = { locale, key, fallback, timestamp: Date.now() };
  missingKeyRecords.push(record);
  // eslint-disable-next-line no-console
  if (import.meta.env.DEV) console.warn(`[i18n] 缺漏 key: ${locale}.${key} → 回退: ${fallback}`);
}

/**
 * 翻譯函式。回退順序嚴格為：
 *   1) 目前 locale
 *   2) en-GB
 *   3) 安全缺漏提示（使用目前介面語言顯示），絕不顯示 undefined/null/[object Object]/內部 key，
 *      也絕不回退至中文。
 * 支援參數插值：t('nav.home') 或 t('key', { name: 'Anna' })，placeholder 用 {name}。
 */
export function translate(locale: LocaleCode, key: string, params?: Record<string, string | number>): string {
  const current = messageMap[locale];
  let value = current ? lookup(current, key) : undefined;

  if (value === undefined) {
    if (locale !== EN) {
      const en = lookup(messageMap[EN], key);
      if (en !== undefined) {
        recordMissing(locale, key, 'en-GB');
        value = en;
      }
    }
    if (value === undefined) {
      recordMissing(locale, key, 'none');
      // 安全缺漏提示，使用目前介面語言
      const missingKeyText = messageMap[locale]?.errors?.missingTranslation || 'This text is not available in your language yet.';
      value = missingKeyText;
    }
  }

  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return value;
}

/**
 * 取得完整 Messages 物件（供元件直接讀取結構化翻譯，或測試用途）。
 */
export function getMessages(locale: LocaleCode): Messages {
  return messageMap[locale] ?? messageMap[EN];
}

/** 驗證某 locale 的翻譯完整性（測試用） */
export function getLocaleMessages(locale: LocaleCode): Messages {
  return messageMap[locale];
}

export { isSupportedLocale };
export type { LocaleCode, Messages, TranslationKey, MissingKeyRecord };

/** 取得目前支援的 locale 清單（白名單） */
export function getSupportedLocales(): LocaleCode[] {
  return Object.keys(messageMap) as LocaleCode[];
}
