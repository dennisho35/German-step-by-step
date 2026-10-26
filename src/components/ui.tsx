import { useEffect } from 'react';
import { useLanguage } from '../state/LanguageContext';
import { navigate, type View } from '../App';

/** 每個子頁面的本地化返回操作 */
export function BackButton({ to = 'home', labelKey = 'nav.back' }: { to?: View; labelKey?: string }) {
  const { t } = useLanguage();
  return (
    <button className="btn" onClick={() => navigate(to)} aria-label={t(labelKey)}>
      ← {t(labelKey)}
    </button>
  );
}

/** 短暫顯示的提示 */
export function Toast({ message }: { message: string | null }) {
  useEffect(() => {
    if (!message) return;
  }, [message]);
  if (!message) return null;
  return <div className="toast" role="status">{message}</div>;
}
