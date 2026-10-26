import { useLanguage } from '../state/LanguageContext';
import { GRAMMAR_TOPICS } from '../data/grammar';
import { BackButton } from '../components/ui';
import { navigate } from '../App';

export function GrammarPage() {
  const { t } = useLanguage();
  return (
    <div>
      <div className="back-row"><BackButton to="home" /></div>
      <h1 className="page-title">{t('grammar.title')}</h1>
      <p className="page-subtitle">{t('grammar.subtitle')}</p>

      <div className="grid grid-sections">
        {GRAMMAR_TOPICS.map((g) => (
          <button key={g.id} className="card section-card" onClick={() => navigate(`grammar/${g.id}`)}>
            <h3>{t(g.topicKey)}</h3>
            <p className="de">{g.titleDe}</p>
            <p style={{ color: 'var(--muted)', fontSize: '.84rem' }}>{g.explanationDe}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
