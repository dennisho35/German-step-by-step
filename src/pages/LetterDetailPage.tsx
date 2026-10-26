import { useState } from 'react';
import { useLanguage } from '../state/LanguageContext';
import { useProgress } from '../state/ProgressContext';
import { ALPHABET, LETTER_COMBINATIONS } from '../data/alphabet';
import { useSpeech } from '../hooks/useSpeech';
import { BackButton } from '../components/ui';
import { navigate } from '../App';

export function LetterDetailPage({ id }: { id: string }) {
  const { t } = useLanguage();
  const { getStatus, recordResult } = useProgress();
  const speech = useSpeech();
  const [practiced, setPracticed] = useState(false);
  const [heard, setHeard] = useState(false);

  const letter = ALPHABET.find((l) => l.id === id) ?? ALPHABET[0];
  const combo = LETTER_COMBINATIONS.find((c) => c.combo === id);
  const status = getStatus(`letter:${letter.id}`);

  const playExample = () => speech.play(letter.example);

  return (
    <div>
      <div className="back-row"><BackButton to="alphabet" /></div>

      <div className="letter-hero">
        <div className="letter-display" aria-label={`${letter.letter} ${letter.name}`}>{letter.letter}</div>
        <div className="letter-meta">
          <div className="row"><span className="label">{t('alphabet.letterName')}: </span><strong>{letter.name}</strong></div>
          <div className="row"><span className="label">{t('alphabet.ipa')}: </span><span className="ipa-badge">{letter.ipa}</span></div>
          <div className="row"><span className="label">{t('alphabet.pronunciation')}: </span>{letter.pronunciation}</div>
          <div className="row"><span className="label">{letter.kind === 'vowel' ? t('alphabet.vowel') : t('alphabet.consonant')}: </span>
            {letter.length === 'long' ? t('alphabet.longVowel') : letter.length === 'short' ? t('alphabet.shortVowel') : ''}</div>
          <div className="row"><span className="label">{t('alphabet.example')}: </span>
            <strong>{letter.example}</strong> <span style={{ color: 'var(--muted)' }}>({letter.exampleGloss})</span>
            <button className="btn btn-ghost" onClick={playExample} aria-label={t('common.play')}>▶ {t('common.play')}</button>
          </div>
          {speech.errorMessage && <div className="banner-error">{speech.errorMessage}</div>}
        </div>
      </div>

      {/* 六大字母深度學習區塊：識別與書寫 / 聽辨 / 拼讀 / 例詞 */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', marginBottom: 20 }}>
        <div className="card">
          <h3>✍️ {t('alphabet.recognition')}</h3>
          <p style={{ color: 'var(--muted)', fontSize: '.88rem' }}>{letter.name} · {letter.ipa}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button className="btn btn-primary" onClick={() => navigate('canvas')}>{t('canvas.practice')}</button>
            <button className="btn" onClick={() => { setPracticed(true); recordResult(`letter:${letter.id}`, true); }}>
              {t('common.submit')}
            </button>
          </div>
          {practiced && <p style={{ color: 'var(--ok)', margin: '8px 0 0' }}>{t('messages.congratulation')}</p>}
        </div>

        <div className="card">
          <h3>🎧 {t('alphabet.listening')}</h3>
          <p style={{ color: 'var(--muted)', fontSize: '.88rem' }}>{letter.example} · {letter.ipa}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button className="btn" onClick={playExample}>{t('common.play')}</button>
            <button className="btn" onClick={() => { setHeard(true); recordResult(`letter:${letter.id}`, true); }}>{t('quiz.correct')}</button>
          </div>
          {heard && <p style={{ color: 'var(--ok)', margin: '8px 0 0' }}>✓ {t('common.correct')}</p>}
        </div>

        <div className="card">
          <h3>🗣️ {t('alphabet.spelling')}</h3>
          <p style={{ color: 'var(--muted)', fontSize: '.88rem' }}>{letter.name} — {letter.example}</p>
          <div className="speech-controls" style={{ marginTop: 8 }}>
            <button className="btn" onClick={() => speech.play(`${letter.name}, ${letter.example}`)}>{t('common.replay')}</button>
          </div>
        </div>

        <div className="card">
          <h3>📝 {t('alphabet.letterInWords')}</h3>
          <p style={{ fontSize: '.95rem' }}><strong>{letter.letter}</strong> in „{letter.example}" ({letter.exampleGloss})</p>
          <p style={{ color: 'var(--muted)', fontSize: '.84rem' }}>{letter.pronunciation}</p>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <strong>{t('srs.reviewDue')}: {t(`srs.${status}`)}</strong>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => navigate(`alphabet/${prevLetter(letter.id)}`)}>← {t('alphabet.previousLetter')}</button>
          <button className="btn" onClick={() => navigate(`alphabet/${nextLetter(letter.id)}`)}>{t('alphabet.nextLetter')} →</button>
        </div>
      </div>

      {/* 特殊字母組合提示 */}
      {combo && (
        <div className="card" style={{ marginTop: 14 }}>
          <h3>{combo.combo} · {combo.ipa}</h3>
          <p>{t('alphabet.combinations')}: <strong>{combo.example}</strong> ({combo.gloss})</p>
        </div>
      )}
    </div>
  );
}

function nextLetter(id: string): string {
  const idx = ALPHABET.findIndex((l) => l.id === id);
  return ALPHABET[(idx + 1) % ALPHABET.length].id;
}
function prevLetter(id: string): string {
  const idx = ALPHABET.findIndex((l) => l.id === id);
  return ALPHABET[(idx - 1 + ALPHABET.length) % ALPHABET.length].id;
}
