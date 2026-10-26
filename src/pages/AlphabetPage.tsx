import { useLanguage } from '../state/LanguageContext';
import { useProgress } from '../state/ProgressContext';
import { ALPHABET, SPECIAL_LETTERS, LETTER_COMBINATIONS } from '../data/alphabet';
import { BackButton } from '../components/ui';
import { navigate } from '../App';

export function AlphabetPage() {
  const { t } = useLanguage();
  const { getStatus, overallPercent } = useProgress();

  // 字母學習進度（基於 SRS）
  const learnedCount = ALPHABET.filter((l) => {
    const s = getStatus(`letter:${l.id}`);
    return s === 'learned' || s === 'mastered';
  }).length;

  return (
    <div>
      <div className="back-row"><BackButton to="home" /></div>
      <h1 className="page-title">{t('alphabet.title')}</h1>
      <p className="page-subtitle">{t('alphabet.subtitle')}</p>

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <strong>{t('alphabet.lettersLearned')}: {learnedCount} / {ALPHABET.length}</strong>
          <span>{t('home.totalLearned')}: {overallPercent}%</span>
        </div>
        <div className="progress-track" style={{ marginTop: 8 }}>
          <div className="progress-fill" style={{ width: `${(learnedCount / ALPHABET.length) * 100}%` }} />
        </div>
      </div>

      <h2>{t('alphabet.title')}</h2>
      <div className="grid grid-cards" style={{ marginBottom: 24 }}>
        {ALPHABET.map((l) => {
          const status = getStatus(`letter:${l.id}`);
          return (
            <button key={l.id} className="letter-card" onClick={() => navigate(`alphabet/${l.id}`)} aria-label={`${l.letter} ${t('alphabet.letterName')}: ${l.name}`}>
              <span className={`status-dot status-${status}`} data-status={status} aria-hidden />
              {l.letter}
            </button>
          );
        })}
      </div>

      <h2>{t('alphabet.specialLetters')}</h2>
      <div className="grid grid-cards" style={{ marginBottom: 24 }}>
        {SPECIAL_LETTERS.map((l) => (
          <button key={l.id} className="letter-card" onClick={() => navigate(`alphabet/${l.id}`)}>
            {l.letter}
          </button>
        ))}
      </div>

      <h2>{t('alphabet.combinations')}</h2>
      <div className="grid grid-cards" style={{ marginBottom: 24 }}>
        {LETTER_COMBINATIONS.map((c) => (
          <button key={c.combo} className="letter-card" onClick={() => navigate('quiz')}>
            {c.combo}
          </button>
        ))}
      </div>
    </div>
  );
}
