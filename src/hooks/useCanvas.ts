import { useCallback, useRef, useState } from 'react';

/**
 * A9 畫布 hook：支援清除、撤銷、重做、重設、顯示/隱藏參考字形、書寫練習提示、儲存。
 * 支援觸控、滑鼠、手寫筆。切換介面語言時畫布既有筆跡不得消失（筆跡保存在 ref/state，不依賴語言）。
 */
export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const [showReference, setShowReference] = useState(true);
  /** 存為 dataURL 的已儲存畫布 */
  const [savedSnapshot, setSavedSnapshot] = useState<string | null>(null);

  // 畫布內容以 pixels 序列保存（undo/redo）
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);

  const getCtx = useCallback((): CanvasRenderingContext2D | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  }, []);

  const snapshot = useCallback((): string | null => {
    const canvas = canvasRef.current;
    return canvas ? canvas.toDataURL() : null;
  }, []);

  const restore = useCallback((dataUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = new Image();
    img.onload = () => {
      const ctx = getCtx();
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = dataUrl;
  }, [getCtx]);

  const pushHistory = useCallback(() => {
    const s = snapshot();
    if (!s) return;
    const hist = historyRef.current;
    // 裁掉 redo 分支
    hist.splice(historyIndexRef.current + 1);
    hist.push(s);
    historyIndexRef.current = hist.length - 1;
  }, [snapshot]);

  const clear = useCallback(() => {
    pushHistory();
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [getCtx, pushHistory]);

  const undo = useCallback(() => {
    const hist = historyRef.current;
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current -= 1;
    const target = hist[historyIndexRef.current];
    if (target) restore(target);
  }, [restore]);

  const redo = useCallback(() => {
    const hist = historyRef.current;
    if (historyIndexRef.current >= hist.length - 1) return;
    historyIndexRef.current += 1;
    const target = hist[historyIndexRef.current];
    if (target) restore(target);
  }, [restore]);

  const reset = useCallback(() => {
    historyRef.current = [];
    historyIndexRef.current = -1;
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSavedSnapshot(null);
  }, [getCtx]);

  const save = useCallback(() => {
    const s = snapshot();
    if (s) setSavedSnapshot(s);
    return s;
  }, [snapshot]);

  const setupCanvas = useCallback((canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
    // 高 DPI 適配
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  const getPoint = useCallback((e: { clientX: number; clientY: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const startDraw = useCallback((x: number, y: number) => {
    drawingRef.current = true;
    pushHistory();
    const ctx = getCtx();
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, [getCtx, pushHistory]);

  const moveDraw = useCallback((x: number, y: number) => {
    if (!drawingRef.current) return;
    const ctx = getCtx();
    if (!ctx) return;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1f2937';
    ctx.lineTo(x, y);
    ctx.stroke();
  }, [getCtx]);

  const endDraw = useCallback(() => {
    drawingRef.current = false;
  }, []);

  return {
    canvasRef,
    showReference,
    setShowReference,
    savedSnapshot,
    setupCanvas,
    clear,
    undo,
    redo,
    reset,
    save,
    startDraw,
    moveDraw,
    endDraw,
    getPoint,
  };
}
