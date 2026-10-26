import { useState } from 'react';
import { useLanguage } from '../state/LanguageContext';
import { useProgress } from '../state/ProgressContext';
import { DIALOGUES } from '../data/dialogues';
import { useSpeech } from '../hooks/useSpeech';
import { BackButton } from '../components/ui';

export function DialoguesPage() {
  const { t } = useLanguage();
  const { recordResult } = useProgress();
  const speech = useSpeech();
  const [selected, setSelected] = useState(DIALOGUES[0].id);
  const [showTranslate, setShowTranslate] = useState(false);

  const dialogue = DIALOGUES.find((d) => d.id === selected) ?? DIALOGUES[0];

  const playLine = (text: string) => speech.play(text);
  const playAll = () => speech.play(dialogue.lines.map((l) => l.text).join('. '));

  return (
    <div>
      <div className="back-row"><BackButton to="home" /></div>
      <h1 className="page-title">{t('dialogues.title')}</h1>
      <p className="page-subtitle">{t('dialogues.subtitle')}</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {DIALOGUES.map((d) => (
          <button key={d.id} className={`btn ${d.id === selected ? 'btn-primary' : ''}`} onClick={() => setSelected(d.id)}>
            {d.topic}
          </button>
        ))}
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <h3 style={{ margin: 0 }}>{t('dialogues.topic')}: {dialogue.topic}</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" onClick={playAll}>▶ {t('dialogues.listen')}</button>
            <button className="btn" onClick={() => setShowTranslate((s) => !s)}>
              {showTranslate ? t('dialogues.hideTranslation') : t('dialogues.translate')}
            </button>
            <button className="btn btn-primary" onClick={() => recordResult(`dialogue:${dialogue.id}`, true)}>
              {t('common.done')}
            </button>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          {dialogue.lines.map((line, i) => (
            <div key={i} className="dialogue-line">
              <span className={`dialogue-speaker speaker-${line.speaker}`} aria-label={t(`dialogues.speaker${line.speaker}`)}>
                {line.speaker}
              </span>
              <div style={{ flex: 1 }}>
                <div>
                  <strong className="de">{line.text}</strong>
                  <button className="btn btn-ghost" onClick={() => playLine(line.text)} aria-label={t('common.play')}>▶</button>
                </div>
                {showTranslate && <div style={{ color: 'var(--muted)', fontSize: '.9rem' }}>{line.textEn}</div>}
              </div>
            </div>
          ))}
        </div>

        {speech.errorMessage && <div className="banner-error">{speech.errorMessage}</div>}
      </div>
    </div>
  );
}
