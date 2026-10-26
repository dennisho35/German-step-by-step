import { useLanguage } from '../state/LanguageContext';
import { useProgress } from '../state/ProgressContext';
import { navigate } from '../App';

export function HomePage() {
  const { t } = useLanguage();
  const { overallPercent, dueCount, masteredCount, todayCount, streak, progress } = useProgress();

  const sections: { view: Parameters<typeof navigate>[0]; key: string; icon: string; desc: string }[] = [
    { view: 'alphabet', key: 'nav.alphabet', icon: '🔤', desc: 'alphabet.subtitle' },
    { view: 'words', key: 'nav.words', icon: '📖', desc: 'words.subtitle' },
    { view: 'grammar', key: 'nav.grammar', icon: '🧩', desc: 'grammar.subtitle' },
    { view: 'dialogues', key: 'nav.dialogues', icon: '💬', desc: 'dialogues.subtitle' },
    { view: 'numbers', key: 'nav.numbers', icon: '🔢', desc: 'numbers.subtitle' },
    { view: 'quiz', key: 'nav.quiz', icon: '✅', desc: 'quiz.subtitle' },
    { view: 'canvas', key: 'nav.canvas', icon: '✍️', desc: 'canvas.subtitle' },
  ];

  return (
    <div>
      <h1 className="page-title">{t('home.title')}</h1>
      <p className="page-subtitle">{t('home.subtitle')}</p>

      <div className="stats-row" style={{ marginBottom: 20 }}>
        <div className="stat">
          <div className="num">{overallPercent}%</div>
          <div className="label">{t('home.totalLearned')}</div>
          <div className="progress-track" style={{ marginTop: 8 }}><div className="progress-fill" style={{ width: `${overallPercent}%` }} /></div>
        </div>
        <div className="stat"><div className="num">{todayCount}</div><div className="label">{t('home.today')}</div></div>
        <div className="stat"><div className="num">{streak}🔥</div><div className="label">{t('home.streak')}</div></div>
        <div className="stat"><div className="num">{masteredCount}</div><div className="label">{t('home.mastered')}</div></div>
        <div className="stat"><div className="num">{dueCount}</div><div className="label">{t('home.reviewDue')}</div></div>
      </div>

      <h2>{t('home.sections')}</h2>
      <p className="page-subtitle">{t('home.pickSection')}</p>
      <div className="grid grid-sections">
        {sections.map((s) => (
          <button key={s.view} className="card section-card" onClick={() => navigate(s.view)}>
            <span className="icon" aria-hidden>{s.icon}</span>
            <h3>{t(s.key)}</h3>
            <p>{t(s.desc)}</p>
          </button>
        ))}
        <button className="card section-card" onClick={() => navigate('settings')}>
          <span className="icon" aria-hidden>⚙️</span>
          <h3>{t('nav.settings')}</h3>
          <p>{t('settings.subtitle')}</p>
        </button>
      </div>

      {progress.quizzesCompleted === 0 && (
        <div className="card" style={{ marginTop: 20 }}>
          <strong>{t('messages.noSavedProgress')}</strong>
        </div>
      )}
    </div>
  );
}
