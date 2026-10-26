import { useLanguage } from '../state/LanguageContext';
import { CARDINAL_NUMBERS, ORDINAL_NUMBERS, WEEKDAYS, TIME_EXPRESSIONS, QUANTITY_EXPRESSIONS } from '../data/numbers';
import { useSpeech } from '../hooks/useSpeech';
import { BackButton } from '../components/ui';

export function NumbersPage() {
  const { t } = useLanguage();
  const speech = useSpeech();

  return (
    <div>
      <div className="back-row"><BackButton to="home" /></div>
      <h1 className="page-title">{t('numbers.title')}</h1>
      <p className="page-subtitle">{t('numbers.subtitle')}</p>

      <h2>{t('numbers.cardinal')}</h2>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))', gap: 8 }}>
          {CARDINAL_NUMBERS.map((n) => (
            <button key={n.n} className="btn" style={{ justifyContent: 'space-between' }} onClick={() => speech.play(n.de)}>
              <span>{n.n}</span> <span className="de"><strong>{n.de}</strong></span>
            </button>
          ))}
        </div>
      </div>

      <h2>{t('numbers.ordinal')}</h2>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))', gap: 8 }}>
          {ORDINAL_NUMBERS.map((n) => (
            <button key={n.n} className="btn" style={{ justifyContent: 'space-between' }} onClick={() => speech.play(n.de)}>
              <span>{n.n}.</span> <strong className="de">{n.de}</strong>
            </button>
          ))}
        </div>
      </div>

      <h2>{t('numbers.date')}</h2>
      <div className="card" style={{ marginBottom: 16 }}>
        {WEEKDAYS.map((d) => (
          <div key={d.de} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
            <strong className="de">{d.de}</strong> <span style={{ color: 'var(--muted)' }}>{d.en}</span>
          </div>
        ))}
      </div>

      <h2>{t('numbers.time')}</h2>
      <div className="card" style={{ marginBottom: 16 }}>
        {TIME_EXPRESSIONS.map((x) => (
          <div key={x.de} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
            <strong className="de">{x.de}</strong>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ color: 'var(--muted)' }}>{x.en}</span>
              <button className="btn btn-ghost" onClick={() => speech.play(x.de)}>▶</button>
            </span>
          </div>
        ))}
      </div>

      <h2>{t('numbers.quantity')}</h2>
      <div className="card">
        {QUANTITY_EXPRESSIONS.map((q) => (
          <div key={q.de} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
            <strong className="de">{q.de}</strong>
            <span style={{ color: 'var(--muted)' }}>{q.en}</span>
          </div>
        ))}
      </div>

      {speech.errorMessage && <div className="banner-error">{speech.errorMessage}</div>}
    </div>
  );
}
