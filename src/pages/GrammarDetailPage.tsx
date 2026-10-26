import { useLanguage } from '../state/LanguageContext';
import { useProgress } from '../state/ProgressContext';
import { GRAMMAR_TOPICS } from '../data/grammar';
import { useSpeech } from '../hooks/useSpeech';
import { BackButton } from '../components/ui';

export function GrammarDetailPage({ id }: { id: string }) {
  const { t } = useLanguage();
  const { recordResult } = useProgress();
  const speech = useSpeech();
  const topic = GRAMMAR_TOPICS.find((g) => g.id === id) ?? GRAMMAR_TOPICS[0];

  const speakAll = () => speech.play(topic.examplesDe.join('. '));

  return (
    <div>
      <div className="back-row"><BackButton to="grammar" /></div>
      <h1 className="page-title">{t(topic.topicKey)}</h1>
      <p className="page-subtitle">{topic.titleDe}</p>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3>{t('grammar.explanation')}</h3>
        <p>{topic.explanationDe}</p>
        <h3 style={{ marginTop: 14 }}>{t('grammar.examples')}</h3>
        <ul className="examples">
          {topic.examplesDe.map((ex, i) => (
            <li key={i}>
              <span className="de">{ex}</span> <span style={{ color: 'var(--muted)' }}>({topic.examplesEn[i]})</span>
            </li>
          ))}
        </ul>
        <div className="speech-controls" style={{ marginTop: 12 }}>
          <button className="btn" onClick={speakAll}>▶ {t('common.play')}</button>
          <button className="btn btn-primary" onClick={() => recordResult(`grammar:${topic.id}`, true)}>
            {t('common.done')}
          </button>
        </div>
      </div>

      {speech.errorMessage && <div className="banner-error">{speech.errorMessage}</div>}
    </div>
  );
}
