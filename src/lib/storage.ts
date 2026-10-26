/**
 * 本地儲存協助：Web 使用 localStorage；儲存資料必須經過驗證，
 * 無效 locale 須安全回退 en-GB，絕不導致 App 崩潰。
 */

const LANG_KEY = 'gss.language';
const PROGRESS_KEY = 'gss.progress.v1';

export interface StoredData {
  language: string | null;
  progress: string | null;
}

export function loadLanguage(): string | null {
  try {
    return window.localStorage.getItem(LANG_KEY);
  } catch {
    return null;
  }
}

export function saveLanguage(locale: string): boolean {
  try {
    window.localStorage.setItem(LANG_KEY, locale);
    return true;
  } catch {
    return false;
  }
}

export function loadProgress(): string | null {
  try {
    return window.localStorage.getItem(PROGRESS_KEY);
  } catch {
    return null;
  }
}

export function saveProgress(data: unknown): boolean {
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearProgress(): boolean {
  try {
    window.localStorage.removeItem(PROGRESS_KEY);
    return true;
  } catch {
    return false;
  }
}
