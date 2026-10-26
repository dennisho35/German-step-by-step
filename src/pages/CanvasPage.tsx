import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../state/LanguageContext';
import { useProgress } from '../state/ProgressContext';
import { ALPHABET } from '../data/alphabet';
import { useCanvas } from '../hooks/useCanvas';
import { BackButton } from '../components/ui';

export function CanvasPage() {
  const { t } = useLanguage();
  const { recordResult } = useProgress();
  const canvas = useCanvas();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [letter, setLetter] = useState('A');
  const [toast, setToast] = useState<string | null>(null);

  // 初始化畫布（高 DPI）
  useEffect(() => {
    if (canvas.canvasRef.current) {
      canvas.setupCanvas(canvas.canvasRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const p = canvas.getPoint(e);
    canvas.startDraw(p.x, p.y);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const p = canvas.getPoint(e);
    canvas.moveDraw(p.x, p.y);
  };
  const onPointerUp = () => canvas.endDraw();

  const doSave = () => {
    const s = canvas.save();
    if (s) {
      setToast(t('canvas.saved'));
      recordResult(`letter:${letter}`, true);
      setTimeout(() => setToast(null), 2000);
    }
  };

  return (
    <div>
      <div className="back-row"><BackButton to="home" /></div>
      <h1 className="page-title">{t('canvas.title')}</h1>
      <p className="page-subtitle">{t('canvas.subtitle')}</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        <select className="btn" value={letter} onChange={(e) => setLetter(e.target.value)} aria-label={t('canvas.practice')}>
          {ALPHABET.map((l) => (
            <option key={l.id} value={l.letter}>{l.letter} — {l.name}</option>
          ))}
        </select>
      </div>

      <div className="card">
        <div className="canvas-wrap" ref={wrapRef}>
          {canvas.showReference && <div className="canvas-reference" aria-hidden>{letter}</div>}
          <canvas
            ref={canvas.canvasRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            aria-label={t('canvas.writeHere')}
          />
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '.84rem', margin: '8px 0 12px' }}>{t('canvas.strokeHint')}</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn" onClick={canvas.clear}>{t('canvas.clear')}</button>
          <button className="btn" onClick={canvas.undo}>{t('canvas.undo')}</button>
          <button className="btn" onClick={canvas.redo}>{t('canvas.redo')}</button>
          <button className="btn" onClick={canvas.reset}>{t('canvas.reset')}</button>
          <button className="btn" onClick={() => canvas.setShowReference((s) => !s)}>
            {canvas.showReference ? t('canvas.hideReference') : t('canvas.showReference')}
          </button>
          <button className="btn btn-primary" onClick={doSave}>{t('canvas.save')}</button>
        </div>

        {canvas.savedSnapshot && (
          <div style={{ marginTop: 12 }}>
            <img src={canvas.savedSnapshot} alt={t('canvas.saved')} style={{ maxWidth: 160, border: '1px solid var(--line)', borderRadius: 8 }} />
          </div>
        )}
      </div>

      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
