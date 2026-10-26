import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { LanguageProvider, useLanguage } from '../src/state/LanguageContext';
import { ProgressProvider } from '../src/state/ProgressContext';
import { HomePage } from '../src/pages/HomePage';
import { AlphabetPage } from '../src/pages/AlphabetPage';
import { getSupportedLocales } from '../src/i18n';

// 檢查非中文介面是否殘留「未翻譯的簡體中文」。
// 不能用全部漢字範圍判斷（日文/韓文合法使用漢字），需針對「簡體中文專用字」。
// 這些簡化字不會出現在日文漢字或正體中文，是 zh-CN 殘留的可靠訊號。
const SIMPLIFIED_ONLY = new Set(
  '发设单习语测评错试载确复认课练词进边问题对开关门让读写记换谁这从来时候还点吗哪个开说见面起应该把被着过看想叫买饭喝行写题样时长',
);

function hasChineseResidue(html: string): string {
  for (const ch of html) {
    if (SIMPLIFIED_ONLY.has(ch)) return ch;
  }
  return '';
}

function setStoredLanguage(loc: string | null) {
  if (loc) window.localStorage.setItem('gss.language', loc);
  else window.localStorage.removeItem('gss.language');
}

/** 以指定 locale 渲染頁面的 server render，用於殘留檢查 */
function renderLocale(loc: string, node: React.ReactElement) {
  setStoredLanguage(loc);
  return renderToString(
    <LanguageProvider>
      <ProgressProvider>{node}</ProgressProvider>
    </LanguageProvider>,
  );
}

describe('UI 殘留檢查（非中文介面不得殘留未翻譯中文）', () => {
  beforeEach(() => window.localStorage.clear());

  it('所有非 zh 語系渲染的主頁不含未翻譯簡體中文', () => {
    const nonZh = getSupportedLocales().filter((l) => !l.startsWith('zh'));
    for (const loc of nonZh) {
      const html = renderLocale(loc, <HomePage />);
      const found = hasChineseResidue(html);
      expect(found, `locale ${loc} 主頁殘留簡體中文「${found}」`).toBe('');
    }
  });

  it('所有非 zh 語系渲染的字母頁不含未翻譯簡體中文', () => {
    const nonZh = getSupportedLocales().filter((l) => !l.startsWith('zh'));
    for (const loc of nonZh) {
      const html = renderLocale(loc, <AlphabetPage />);
      const found = hasChineseResidue(html);
      expect(found, `locale ${loc} 字母頁殘留簡體中文「${found}」`).toBe('');
    }
  });
});

describe('語言切換（即時更新、不重載）', () => {
  beforeEach(() => window.localStorage.clear());

  it('切換語言後頁面即時更新為新語言且不重新載入', () => {
    setStoredLanguage('zh-HK');
    render(
      <LanguageProvider>
        <ProgressProvider>
          <Probe />
        </ProgressProvider>
      </LanguageProvider>,
    );
    expect(screen.getByTestId('probe-nav-home').textContent).toBe('主頁');
    expect(screen.getByTestId('probe-locale').textContent).toBe('zh-HK');

    // 切換到法文（fireEvent 觸發 state 更新，非重新載入）
    fireEvent.click(screen.getByTestId('set-fr-FR'));
    expect(screen.getByTestId('probe-nav-home').textContent).toBe('Accueil');
    expect(screen.getByTestId('probe-locale').textContent).toBe('fr-FR');
  });

  it('切換到日文後再切到韓文，狀態持續更新', () => {
    render(
      <LanguageProvider>
        <ProgressProvider>
          <Probe />
        </ProgressProvider>
      </LanguageProvider>,
    );
    fireEvent.click(screen.getByTestId('set-ja-JP'));
    expect(screen.getByTestId('probe-nav-home').textContent).toBe('ホーム');
    fireEvent.click(screen.getByTestId('set-ko-KR'));
    expect(screen.getByTestId('probe-nav-home').textContent).toBe('홈');
  });

  it('語言偏好持久化：重新載入後仍保留', () => {
    setStoredLanguage('fr-FR');
    render(
      <LanguageProvider>
        <ProgressProvider>
          <Probe />
        </ProgressProvider>
      </LanguageProvider>,
    );
    expect(screen.getByTestId('probe-locale').textContent).toBe('fr-FR');
  });

  it('無效的已儲存 locale 安全回退 en-GB，不崩潰', () => {
    setStoredLanguage('xx-INVALID');
    render(
      <LanguageProvider>
        <ProgressProvider>
          <Probe />
        </ProgressProvider>
      </LanguageProvider>,
    );
    expect(screen.getByTestId('probe-locale').textContent).toBe('en-GB');
  });
});

function Probe() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div>
      <span data-testid="probe-locale">{locale}</span>
      <span data-testid="probe-nav-home">{t('nav.home')}</span>
      {getSupportedLocales().map((l) => (
        <button key={l} data-testid={`set-${l}`} onClick={() => setLocale(l)}>{l}</button>
      ))}
    </div>
  );
}
