import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { LearningStatus } from '../data/types';
import { ALPHABET, LETTER_COMBINATIONS } from '../data/alphabet';
import { WORDS } from '../data/words';
import { loadProgress, saveProgress, clearProgress } from '../lib/storage';

/** 每個學習項目的 SRS 狀態 */
interface SrsRecord {
  /** 學習狀態 */
  status: LearningStatus;
  /** 已複習次數 */
  reviews: number;
  /** 下次複習時間（epoch ms），0 = 未排程 */
  dueAt: number;
  /** 首次學習時間 */
  firstLearnedAt: number | null;
}

/** 學習進度資料結構 */
export interface ProgressState {
  srs: Record<string, SrsRecord>;
  /** 答對題目總數 */
  correctAnswers: number;
  /** 錯題數 */
  mistakes: number;
  /** 已完成的測驗次數 */
  quizzesCompleted: number;
  /** 每日學習計數：date -> count */
  daily: Record<string, number>;
  /** 連勝天數計算基底 */
  lastActiveDay: string | null;
  streak: number;
}

const defaultProgress: ProgressState = {
  srs: {},
  correctAnswers: 0,
  mistakes: 0,
  quizzesCompleted: 0,
  daily: {},
  lastActiveDay: null,
  streak: 0,
};

/** 所有可學習項目的 ID（字母 + 字母組合 + 單字） */
export const ALL_ITEM_IDS = [
  ...ALPHABET.map((l) => `letter:${l.id}`),
  ...LETTER_COMBINATIONS.map((c) => `combo:${c.combo}`),
  ...WORDS.map((w) => `word:${w.id}`),
];

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function nextInterval(reviews: number): number {
  // SRS 間隔：1天, 3天, 7天, 14天, 30天
  const intervals = [1, 3, 7, 14, 30];
  const idx = Math.min(reviews, intervals.length - 1);
  return intervals[idx] * 24 * 3600 * 1000;
}

interface ProgressContextValue {
  progress: ProgressState;
  /** 學習某項目：status 進階（答對=前進，答錯=退回） */
  recordResult: (itemId: string, correct: boolean) => void;
  /** 取得某項目狀態 */
  getStatus: (itemId: string) => LearningStatus;
  /** 總學習進度（百分比） */
  overallPercent: number;
  /** 待複習項目數 */
  dueCount: number;
  /** 已掌握數 */
  masteredCount: number;
  /** 今日學習數 */
  todayCount: number;
  /** 連勝天數 */
  streak: number;
  /** 重置所有進度 */
  resetAll: () => void;
  /** 記錄測驗結果 */
  recordQuizResult: (correct: number, wrong: number) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function loadInitial(): ProgressState {
  const raw = loadProgress();
  if (!raw) return defaultProgress;
  try {
    const parsed = JSON.parse(raw) as ProgressState;
    // 驗證資料結構，避免損毀資料導致崩潰
    if (parsed && typeof parsed === 'object' && parsed.srs && typeof parsed.srs === 'object') {
      return parsed;
    }
    return defaultProgress;
  } catch {
    return defaultProgress;
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(loadInitial);

  // 持久化
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const recordResult = useCallback((itemId: string, correct: boolean) => {
    setProgress((prev) => {
      const record: SrsRecord = prev.srs[itemId] ?? {
        status: 'notStarted',
        reviews: 0,
        dueAt: 0,
        firstLearnedAt: null,
      };
      const now = Date.now();
      let status: LearningStatus = record.status;
      let reviews = record.reviews;

      if (correct) {
        reviews += 1;
        if (status === 'notStarted' || status === 'learning') status = 'learning';
        if (reviews >= 3) status = 'learned';
        if (reviews >= 5) status = 'mastered';
      } else {
        // 答錯：退回至 learning
        status = 'learning';
        reviews = Math.max(0, reviews - 1);
      }
      // 答錯時下次複習間隔縮短（1 天）
      const interval = correct ? nextInterval(reviews) : 1 * 24 * 3600 * 1000;
      const dueAt = now + interval;
      const firstLearnedAt = record.firstLearnedAt ?? now;

      const today = todayStr();
      const daily = { ...prev.daily, [today]: (prev.daily[today] ?? 0) + 1 };

      let streak = prev.streak;
      let lastActiveDay = prev.lastActiveDay;
      if (lastActiveDay === today) {
        // 同日不重複計
      } else if (lastActiveDay && lastActiveDay === yesterday()) {
        streak = prev.streak + 1;
        lastActiveDay = today;
      } else {
        streak = prev.streak > 0 ? 1 : 0;
        if (prev.streak > 0) streak = 1;
        lastActiveDay = today;
      }

      return {
        ...prev,
        srs: { ...prev.srs, [itemId]: { status, reviews, dueAt, firstLearnedAt } },
        correctAnswers: prev.correctAnswers + (correct ? 1 : 0),
        mistakes: prev.mistakes + (correct ? 0 : 1),
        daily,
        streak,
        lastActiveDay,
      };
    });
  }, []);

  const recordQuizResult = useCallback((correct: number, wrong: number) => {
    setProgress((prev) => ({
      ...prev,
      correctAnswers: prev.correctAnswers + correct,
      mistakes: prev.mistakes + wrong,
      quizzesCompleted: prev.quizzesCompleted + 1,
    }));
  }, []);

  const getStatus = useCallback(
    (itemId: string): LearningStatus => progress.srs[itemId]?.status ?? 'notStarted',
    [progress.srs],
  );

  const dueCount = useMemo(() => {
    const now = Date.now();
    return ALL_ITEM_IDS.filter((id) => {
      const r = progress.srs[id];
      return r && r.status !== 'mastered' && r.dueAt > 0 && r.dueAt <= now;
    }).length;
  }, [progress.srs]);

  const masteredCount = useMemo(
    () => Object.values(progress.srs).filter((r) => r.status === 'mastered').length,
    [progress.srs],
  );

  const overallPercent = useMemo(() => {
    const done = ALL_ITEM_IDS.filter((id) => {
      const r = progress.srs[id];
      return r && (r.status === 'learned' || r.status === 'mastered');
    }).length;
    return Math.round((done / ALL_ITEM_IDS.length) * 100);
  }, [progress.srs]);

  const todayCount = useMemo(() => progress.daily[todayStr()] ?? 0, [progress.daily]);

  const resetAll = useCallback(() => {
    clearProgress();
    setProgress(defaultProgress);
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      recordResult,
      getStatus,
      overallPercent,
      dueCount,
      masteredCount,
      todayCount,
      streak: progress.streak,
      resetAll,
      recordQuizResult,
    }),
    [progress, recordResult, getStatus, overallPercent, dueCount, masteredCount, todayCount, resetAll, recordQuizResult],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

function yesterday(): string {
  const d = new Date(Date.now() - 24 * 3600 * 1000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
