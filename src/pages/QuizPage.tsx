import { useState } from 'react';
import { useLanguage } from '../state/LanguageContext';
import { useProgress } from '../state/ProgressContext';
import { pickQuizQuestions, type QuizQuestion } from '../data/quiz';
import { BackButton } from '../components/ui';

type Phase = 'start' | 'active' | 'done';

export function QuizPage() {
  const { t } = useLanguage();
  const { recordQuizResult, recordResult } = useProgress();
  const [phase, setPhase] = useState<Phase>('start');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);

  const start = () => {
    const qs = pickQuizQuestions(10);
    setQuestions(qs);
    setIndex(0);
    setScore(0);
    setWrong(0);
    setSelected(null);
    setRevealed(false);
    setPhase('active');
  };

  const q = questions[index];

  const choose = (optIdx: number) => {
    if (revealed) return;
    setSelected(optIdx);
    setRevealed(true);
    const isCorrect = optIdx === q.answerIndex;
    if (isCorrect) setScore((s) => s + 1);
    else {
      setWrong((w) => w + 1);
    }
    // 更新 SRS：答對→學習進度前進；答錯→退回
    recordResult(`quiz:${q.id}`, isCorrect);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      recordQuizResult(score, wrong);
      setPhase('done');
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  };

  const skip = () => {
    if (index + 1 >= questions.length) {
      setPhase('done');
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  if (phase === 'start') {
    return (
      <div>
        <div className="back-row"><BackButton to="home" /></div>
        <h1 className="page-title">{t('quiz.title')}</h1>
        <p className="page-subtitle">{t('quiz.subtitle')}</p>
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <button className="btn btn-primary" onClick={start}>▶ {t('quiz.title')}</button>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div>
        <div className="back-row"><BackButton to="home" /></div>
        <h1 className="page-title">{t('quiz.completed')}</h1>
        <div className="card" style={{ textAlign: 'center', padding: 30 }}>
          <div className="stat"><div className="num">{pct}%</div><div className="label">{t('quiz.score')}</div></div>
          <p style={{ marginTop: 12 }}>
            <strong>{score}</strong> / {questions.length} {t('quiz.correct').toLowerCase()}
          </p>
          {wrong > 0 && <p>{t('quiz.mistakes')}: {wrong}</p>}
          <div style={{ marginTop: 16, display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button className="btn" onClick={start}>{t('common.tryAgain')}</button>
            <button className="btn btn-primary" onClick={() => setPhase('start')}>{t('common.done')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="back-row"><BackButton to="home" /></div>
      <h1 className="page-title">{t('quiz.title')}</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
        <span>{t('quiz.question')} {index + 1} / {questions.length}</span>
        <span>{t('quiz.score')}: {score} · {t('quiz.remaining')}: {questions.length - index - 1}</span>
      </div>
      <div className="progress-track" style={{ marginBottom: 14 }}>
        <div className="progress-fill" style={{ width: `${((index + (revealed ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>

      <div className="card">
        <p className="de" style={{ fontSize: '1.1rem', fontWeight: 600 }}>{q.prompt}</p>
        <p style={{ color: 'var(--muted)', fontSize: '.86rem' }}>{q.promptEn}</p>

        <div style={{ marginTop: 12 }}>
          {q.options.map((opt, i) => {
            let cls = 'quiz-option';
            if (revealed) {
              if (i === q.answerIndex) cls += ' correct';
              else if (i === selected) cls += ' incorrect';
            }
            return (
              <button key={i} className={cls} onClick={() => choose(i)} disabled={revealed}>
                {opt}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div style={{ marginTop: 12 }}>
            {selected === q.answerIndex
              ? <p style={{ color: 'var(--ok)', fontWeight: 600 }}>✓ {t('quiz.correct')}</p>
              : <p style={{ color: 'var(--bad)', fontWeight: 600 }}>✗ {t('quiz.incorrect')} — {t('quiz.correctAnswer')}: {q.options[q.answerIndex]}</p>}
            <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>{t('quiz.explanation')}: {q.explanationEn}</p>
            <button className="btn btn-primary" onClick={next}>
              {index + 1 >= questions.length ? t('quiz.finish') : t('quiz.nextQuestion')}
            </button>
          </div>
        )}
        {!revealed && (
          <button className="btn btn-ghost" onClick={skip}>{t('common.skip')}</button>
        )}
      </div>
    </div>
  );
}
