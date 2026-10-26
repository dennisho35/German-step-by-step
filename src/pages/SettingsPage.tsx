import { useState } from 'react';
import { useLanguage } from '../state/LanguageContext';
import { useProgress } from '../state/ProgressContext';
import { useSpeech } from '../hooks/useSpeech';
import { BackButton, Toast } from '../components/ui';

export function SettingsPage() {
  const { t, locale, menu, setLocale } = useLanguage();
  const { overallPercent, masteredCount, dueCount, todayCount, resetAll } = useProgress();
  const speech = useSpeech();
  const [confirmReset, setConfirmReset] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [rate, setRateLocal] = useState<number | null>(null);

  const currentLang = menu.find((m) => m.code === locale);

  const doReset = () => {
    resetAll();
    setConfirmReset(false);
    setToast(t('messages.progressSaved'));
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div>
      <div className="back-row"><BackButton to="home" /></div>
      <h1 className="page-title">{t('settings.title')}</h1>
      <p className="page-subtitle">{t('settings.subtitle')}</p>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="setting-row">
          <div>
            <div className="setting-label">{t('settings.language')}</div>
            <div className="setting-desc">{currentLang?.flag} {currentLang?.nativeName} ({locale})</div>
          </div>
        </div>
        <div className="grid grid-cards" style={{ marginTop: 8 }}>
          {menu.map((m) => (
            <button key={m.code} className={`btn ${m.code === locale ? 'btn-primary' : ''}`} onClick={() => setLocale(m.code)}>
              <span aria-hidden>{m.flag}</span> {m.nativeName}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="setting-row">
          <div>
            <div className="setting-label">{t('settings.progress')}</div>
            <div className="setting-desc">{t('settings.dataStored')}</div>
          </div>
          <strong>{overallPercent}%</strong>
        </div>
        <div className="progress-track" style={{ margin: '6px 0 12px' }}>
          <div className="progress-fill" style={{ width: `${overallPercent}%` }} />
        </div>
        <div className="stats-row">
          <div className="stat"><div className="num">{todayCount}</div><div className="label">{t('home.today')}</div></div>
          <div className="stat"><div className="num">{masteredCount}</div><div className="label">{t('srs.masteredCards')}</div></div>
          <div className="stat"><div className="num">{dueCount}</div><div className="label">{t('srs.dueCards')}</div></div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="setting-row">
          <div>
            <div className="setting-label">{t('settings.pronunciation')}</div>
            <div className="setting-desc">{speech.supported ? '✓ de-DE' : t('errors.voiceUnsupported')}</div>
          </div>
          <div className="rate-control">
            <label htmlFor="rate">{t('settings.speechRate')}:</label>
            <input
              id="rate" type="range" min={0.5} max={1.5} step={0.1}
              value={rate ?? Math.round(speech.speechRate * 10) / 10}
              onChange={(e) => { const v = Number(e.target.value); setRateLocal(v); speech.setSpeechRate(v); }}
            />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="setting-row">
          <div>
            <div className="setting-label">{t('settings.about')}</div>
            <div className="setting-desc">{t('settings.appName')}: German Step by Step · {t('settings.version')}: 1.0.0</div>
          </div>
        </div>
      </div>

      <div className="card">
        {!confirmReset ? (
          <button className="btn btn-danger" onClick={() => setConfirmReset(true)}>{t('settings.resetProgress')}</button>
        ) : (
          <div>
            <p><strong>{t('settings.confirmReset')}</strong></p>
            <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>{t('messages.confirmResetBody')}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-danger" onClick={doReset}>{t('common.confirm')}</button>
              <button className="btn" onClick={() => setConfirmReset(false)}>{t('common.cancel')}</button>
            </div>
          </div>
        )}
      </div>

      <Toast message={toast} />
    </div>
  );
}
