import { useMemo, useState } from 'react';
import { useLanguage } from '../state/LanguageContext';
import { useProgress } from '../state/ProgressContext';
import { WORDS, WORD_CATEGORIES, type WordCategory } from '../data/words';
import { useSpeech } from '../hooks/useSpeech';
import { BackButton } from '../components/ui';

export function WordsPage() {
  const { t } = useLanguage();
  const { getStatus, recordResult } = useProgress();
  const speech = useSpeech();
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<WordCategory | 'all'>('all');

  const filtered = useMemo(() => {
    return WORDS.filter((w) => {
      if (cat !== 'all' && w.category !== (cat as WordCategory)) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        return w.word.toLowerCase().includes(q) || w.meaningEn.toLowerCase().includes(q);
      }
      return true;
    });
  }, [query, cat]);

  const wordOfDay = WORDS[new Date().getDate() % WORDS.length];

  return (
    <div>
      <div className="back-row"><BackButton to="home" /></div>
      <h1 className="page-title">{t('words.title')}</h1>
      <p className="page-subtitle">{t('words.subtitle')}</p>

      {/* 今日生字 */}
      <div className="card" style={{ marginBottom: 20 }}>
        <strong>⭐ {t('words.wordOfDay')}:</strong> {wordOfDay.article} <strong>{wordOfDay.word}</strong>
        <span style={{ color: 'var(--muted)' }}> ({wordOfDay.meaningEn})</span>
        <button className="btn btn-ghost" onClick={() => speech.play(wordOfDay.word)}>▶ {t('common.play')}</button>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        <input
          className="btn" style={{ flex: 1, minWidth: 180, textAlign: 'left' }}
          placeholder={t('words.search')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t('words.search')}
        />
        <select className="btn" value={cat} onChange={(e) => setCat(e.target.value as WordCategory | 'all')} aria-label={t('words.categories')}>
          <option value="all">{t('words.categories')}</option>
          {WORD_CATEGORIES.map((c) => (
            <option key={c} value={c}>{t(`words.categoryNames.${c}`)}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="card">{t('words.noResults')}</div>
      ) : (
        <div className="card" style={{ overflowX: 'auto' }}>
          <table className="word-table">
            <thead>
              <tr>
                <th>{t('words.article')}</th>
                <th>{t('words.gender')}</th>
                <th>Deutsch</th>
                <th>{t('words.plural')}</th>
                <th>{t('words.meaning')}</th>
                <th>{t('words.addToReview')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((w) => {
                const artClass = w.article === 'der' ? 'article-der' : w.article === 'die' ? 'article-die' : 'article-das';
                return (
                  <tr key={w.id}>
                    <td><span className={`article-badge ${artClass}`}>{w.article}</span></td>
                    <td>{w.article === 'der' ? 'm' : w.article === 'die' ? 'f' : 'n'}</td>
                    <td><strong>{w.word}</strong> <button className="btn btn-ghost" onClick={() => speech.play(w.word)}>▶</button></td>
                    <td>{w.plural}</td>
                    <td>{w.meaningEn}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => recordResult(`word:${w.id}`, getStatus(`word:${w.id}`) !== 'mastered')}
                      >
                        {getStatus(`word:${w.id}`) === 'mastered' ? t('srs.mastered') : t('words.addToReview')}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {speech.errorMessage && <div className="banner-error">{speech.errorMessage}</div>}
    </div>
  );
}
