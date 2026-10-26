import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../state/LanguageContext';
import { navigate, type View } from '../App';

const LOGO = `${import.meta.env.BASE_URL}assets/images/app_logo.png`;

interface HeaderProps {
  currentView: View;
}

const SECTION_KEYS: { view: View; key: string }[] = [
  { view: 'home', key: 'nav.home' },
  { view: 'alphabet', key: 'nav.alphabet' },
  { view: 'words', key: 'nav.words' },
  { view: 'grammar', key: 'nav.grammar' },
  { view: 'dialogues', key: 'nav.dialogues' },
  { view: 'numbers', key: 'nav.numbers' },
  { view: 'quiz', key: 'nav.quiz' },
  { view: 'canvas', key: 'nav.canvas' },
  { view: 'settings', key: 'nav.settings' },
];

export function Header({ currentView }: HeaderProps) {
  const { t, locale, menu, setLocale } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // 點擊外部關閉語言選單
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const currentLabel = menu.find((m) => m.code === locale);

  return (
    <header className="header">
      <button
        className="btn btn-ghost"
        onClick={() => setMenuOpen(true)}
        aria-label={t('nav.menu')}
        title={t('nav.menu')}
      >
        ☰
      </button>

      <img className="header-logo" src={LOGO} alt="German Step by Step logo" />

      <div className="header-title">
        {currentView === 'home' ? t('nav.appName') : SECTION_KEYS.find((s) => currentView.startsWith(s.view))?.key ? t(SECTION_KEYS.find((s) => currentView.startsWith(s.view))!.key) : t('nav.home')}
      </div>

      <div className="header-spacer" />

      <div className="language-selector" ref={langRef}>
        <button
          className="lang-button"
          onClick={() => setLangOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={langOpen}
          aria-label={t('nav.language')}
        >
          <span className="lang-flag">{currentLabel?.flag}</span>
          <span>{currentLabel?.nativeName}</span>
          <span aria-hidden>▾</span>
        </button>
        {langOpen && (
          <div className="lang-dropdown" role="listbox" aria-label={t('nav.language')}>
            {menu.map((m) => (
              <button
                key={m.code}
                className={`lang-option ${m.code === locale ? 'active' : ''}`}
                role="option"
                aria-selected={m.code === locale}
                onClick={() => {
                  setLocale(m.code);
                  setLangOpen(false);
                }}
              >
                <span className="lang-flag" aria-hidden>{m.flag}</span>
                <span className="lang-native">{m.nativeName}</span>
                <span className="lang-code" aria-hidden>{m.code}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="side-menu" onClick={() => setMenuOpen(false)}>
          <div className="side-menu-panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={t('nav.menu')}>
            <div className="back-row">
              <button className="btn" onClick={() => setMenuOpen(false)} aria-label={t('nav.closeMenu')}>
                {t('common.close')}
              </button>
            </div>
            {SECTION_KEYS.map((s) => (
              <button
                key={s.view}
                className="lang-option"
                onClick={() => {
                  setMenuOpen(false);
                  navigate(s.view);
                }}
              >
                {t(s.key)}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
