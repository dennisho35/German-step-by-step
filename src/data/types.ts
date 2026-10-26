/**
 * 德語課程統一資料模型。
 * 德語學習原文（德語拼寫、冠詞、IPA）與介面翻譯完全分離：
 * 本檔資料固定為德語原文，不隨介面語言切換而變。
 */

/** 學習項目狀態（SRS） */
export type LearningStatus = 'notStarted' | 'learning' | 'learned' | 'reviewDue' | 'mastered';

export interface LetterData {
  /** 穩定唯一 ID，例如 'A', 'AE' */
  id: string;
  /** 字母本身（德語原文） */
  letter: string;
  /** 字母的德語名稱 */
  name: string;
  /** IPA 音標 */
  ipa: string;
  /** 類型：母音 / 子音 / 特殊 */
  kind: 'vowel' | 'consonant' | 'special';
  /** 是否長母音 / 短母音提示（母音用） */
  length?: 'long' | 'short';
  /** 德語發音規則說明 */
  pronunciation: string;
  /** 例詞（德語原文） */
  example: string;
  /** 例詞的中文（輔助）註解——僅作為原文對照，不屬 UI 翻譯 */
  exampleGloss: string;
  /** 是否特殊字母（Ä Ö Ü ß） */
  special?: boolean;
}

/** 名詞詞條 */
export interface WordEntry {
  id: string;
  /** 德語單字 */
  word: string;
  /** 冠詞 der/die/das */
  article: 'der' | 'die' | 'das';
  /** 複數形式（德語） */
  plural: string;
  /** 英文意義（原文對照） */
  meaningEn: string;
  /** 詞性分類 */
  category: 'food' | 'family' | 'travel' | 'daily' | 'nature' | 'people' | 'home' | 'time';
}

export interface GrammarTopic {
  id: string;
  /** 德語標題（原文） */
  titleDe: string;
  /** 主題 key，對應翻譯說明 */
  topicKey: string;
  /** 德語講解摘要 */
  explanationDe: string;
  /** 德語例句 */
  examplesDe: string[];
  /** 例句的英文對照（原文輔助） */
  examplesEn: string[];
}

export interface DialogueLine {
  /** 說話者 A 或 B */
  speaker: 'A' | 'B';
  /** 德語原文 */
  text: string;
  /** 英文對照 */
  textEn: string;
}

export interface Dialogue {
  id: string;
  topic: string;
  lines: DialogueLine[];
}

export interface QuizQuestion {
  id: string;
  /** 題幹（德語或混合） */
  prompt: string;
  /** 題幹英文（輔助） */
  promptEn: string;
  /** 選項 */
  options: string[];
  /** 正確答案 index */
  answerIndex: number;
  /** 解析（英文輔助） */
  explanationEn: string;
}
