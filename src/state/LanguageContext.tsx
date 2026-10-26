import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { isSupportedLocale, detectDeviceLocale, getLocaleMeta, LOCALES, type LocaleCode } from '../i18n/localeRegistry';
import { translate } from '../i18n';
import { loadLanguage, saveLanguage } from '../lib/storage';

interface LanguageContextValue {
  locale: LocaleCode;
  /** 立即切換語言：僅更新狀態，不重新載入頁面 */
  setLocale: (code: LocaleCode) => void;
  /** 集中式翻譯函式 */
  t: (key: string, params?: Record<string, string | number>) => string;
  /** 語言選單資料（國旗 + 自稱名稱） */
  menu: typeof LOCALES;
  /** 目前語言的中文說明（內部命名） */
  languageChangedMessage: string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** 讀取並驗證已儲存的語言偏好；無效則回退 en-GB */
function resolveInitialLocale(): LocaleCode {
  const stored = loadLanguage();
  if (stored !== null && isSupportedLocale(stored)) {
    return stored;
  }
  // 無有效偏好：依裝置語言偵測
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    return detectDeviceLocale(navigator.languages as string[]);
  }
  return 'en-GB';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(resolveInitialLocale);

  const changeLocale = useCallback((code: LocaleCode) => {
    if (!isSupportedLocale(code)) return; // 安全：無效 locale 直接忽略
    setLocaleState(code);
    saveLanguage(code); // 持久化使用者偏好
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => translate(locale, key, params),
    [locale],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: changeLocale,
      t,
      menu: LOCALES,
      languageChangedMessage: translate(locale, 'messages.languageChanged'),
    }),
    [locale, changeLocale, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export { getLocaleMeta };
export type { LocaleCode };
