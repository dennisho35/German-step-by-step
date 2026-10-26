import { useEffect, useState } from 'react';
import { useLanguage } from './state/LanguageContext';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { AlphabetPage } from './pages/AlphabetPage';
import { LetterDetailPage } from './pages/LetterDetailPage';
import { WordsPage } from './pages/WordsPage';
import { GrammarPage } from './pages/GrammarPage';
import { GrammarDetailPage } from './pages/GrammarDetailPage';
import { DialoguesPage } from './pages/DialoguesPage';
import { NumbersPage } from './pages/NumbersPage';
import { QuizPage } from './pages/QuizPage';
import { CanvasPage } from './pages/CanvasPage';
import { SettingsPage } from './pages/SettingsPage';

export type View =
  | 'home'
  | 'alphabet'
  | `alphabet/${string}`
  | 'words'
  | 'grammar'
  | `grammar/${string}`
  | 'dialogues'
  | 'numbers'
  | 'quiz'
  | 'canvas'
  | 'settings';

/** 極簡 hash router：支援 GitHub Pages 子路徑 + 重新整理直接進入子頁面 */
function parseHash(): View {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw || raw === '/') return 'home';
  const path = raw.replace(/^\/+/, '').replace(/\/+$/, '');
  if (path.startsWith('alphabet/')) return `alphabet/${path.split('/')[1]}` as View;
  if (path.startsWith('grammar/')) return `grammar/${path.split('/')[1]}` as View;
  if (path === 'alphabet') return 'alphabet';
  if (path === 'words') return 'words';
  if (path === 'grammar') return 'grammar';
  if (path === 'dialogues') return 'dialogues';
  if (path === 'numbers') return 'numbers';
  if (path === 'quiz') return 'quiz';
  if (path === 'canvas') return 'canvas';
  if (path === 'settings') return 'settings';
  return 'home';
}

export function navigate(view: View) {
  window.location.hash = view;
}

export function App() {
  const { locale } = useLanguage();
  const [view, setView] = useState<View>(parseHash);

  useEffect(() => {
    const onHash = () => setView(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // 更新 document.lang（不重新載入）
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="app" data-locale={locale}>
      <Header currentView={view} />
      <main className="content">
        {view === 'home' && <HomePage />}
        {view === 'alphabet' && <AlphabetPage />}
        {view.startsWith('alphabet/') && <LetterDetailPage id={view.split('/')[1]} />}
        {view === 'words' && <WordsPage />}
        {view === 'grammar' && <GrammarPage />}
        {view.startsWith('grammar/') && <GrammarDetailPage id={view.split('/')[1]} />}
        {view === 'dialogues' && <DialoguesPage />}
        {view === 'numbers' && <NumbersPage />}
        {view === 'quiz' && <QuizPage />}
        {view === 'canvas' && <CanvasPage />}
        {view === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}
