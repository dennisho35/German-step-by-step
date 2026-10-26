import { describe, it, expect } from 'vitest';
import { ALPHABET, SPECIAL_LETTERS, VOWELS, CONSONANTS, LETTER_COMBINATIONS } from '../src/data/alphabet';
import { WORDS } from '../src/data/words';
import { GRAMMAR_TOPICS } from '../src/data/grammar';
import { QUIZ_BANK, pickQuizQuestions } from '../src/data/quiz';
import { DIALOGUES } from '../src/data/dialogues';
import { CARDINAL_NUMBERS } from '../src/data/numbers';

describe('德語字母內容', () => {
  it('包含 A–Z、Ä、Ö、Ü、ß', () => {
    const letters = ALPHABET.map((l) => l.letter);
    expect(letters).toEqual(expect.arrayContaining([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')]));
    expect(letters).toContain('Ä');
    expect(letters).toContain('Ö');
    expect(letters).toContain('Ü');
    expect(letters).toContain('ß');
  });

  it('特殊字母與類型分類正確', () => {
    expect(SPECIAL_LETTERS.map((l) => l.letter).sort()).toEqual(['Ä', 'Ö', 'Ü', 'ß'].sort());
    expect(VOWELS.length).toBeGreaterThan(0);
    expect(CONSONANTS.length).toBeGreaterThan(0);
  });

  it('每個字母都有名稱、IPA 與例詞', () => {
    for (const l of ALPHABET) {
      expect(l.name, `字母 ${l.letter} 缺名稱`).toBeTruthy();
      expect(l.ipa, `字母 ${l.letter} 缺 IPA`).toMatch(/^\//);
      expect(l.example, `字母 ${l.letter} 缺例詞`).toBeTruthy();
      expect(l.pronunciation).toBeTruthy();
    }
  });

  it('字母組合都有正確 IPA', () => {
    expect(LETTER_COMBINATIONS.length).toBeGreaterThanOrEqual(10);
    for (const c of LETTER_COMBINATIONS) expect(c.ipa).toMatch(/^\//);
  });
});

describe('德語名詞：冠詞、詞性、複數', () => {
  it('每個單字都有冠詞（der/die/das）與複數', () => {
    for (const w of WORDS) {
      expect(['der', 'die', 'das']).toContain(w.article);
      expect(w.plural, `單字 ${w.word} 缺複數`).toBeTruthy();
      expect(w.meaningEn).toBeTruthy();
      expect(w.category).toBeTruthy();
    }
  });

  it('各冠詞皆有出現（詞性多樣性）', () => {
    const articles = new Set(WORDS.map((w) => w.article));
    expect(articles.has('der')).toBe(true);
    expect(articles.has('die')).toBe(true);
    expect(articles.has('das')).toBe(true);
  });
});

describe('文法與對話', () => {
  it('文法主題覆蓋核心內容', () => {
    const topics = GRAMMAR_TOPICS.map((g) => g.topicKey);
    expect(topics).toContain('grammar.nounGender');
    expect(topics).toContain('grammar.nominative');
    expect(topics).toContain('grammar.accusative');
    expect(topics).toContain('grammar.dative');
    expect(topics).toContain('grammar.genitive');
    expect(topics).toContain('grammar.verbConjugation');
  });

  it('對話涵蓋購物、餐廳、交通、旅遊、住宿', () => {
    const topics = DIALOGUES.map((d) => d.topic.toLowerCase());
    expect(topics.some((t) => t.includes('restaurant'))).toBe(true);
    expect(topics.some((t) => t.includes('einkaufen') || t.includes('shopping'))).toBe(true);
    expect(topics.some((t) => t.includes('bahnhof') || t.includes('train'))).toBe(true);
    expect(topics.some((t) => t.includes('hotel'))).toBe(true);
  });

  it('數字涵蓋 0–1000', () => {
    const nums = CARDINAL_NUMBERS.map((n) => n.n);
    expect(nums).toContain(0);
    expect(nums).toContain(100);
    expect(nums).toContain(1000);
  });
});

describe('測驗題庫', () => {
  it('答案 index 有效且選項不重複', () => {
    for (const q of QUIZ_BANK) {
      expect(q.answerIndex).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex).toBeLessThan(q.options.length);
      expect(new Set(q.options).size).toBe(q.options.length);
    }
  });

  it('抽題數量正確', () => {
    const picked = pickQuizQuestions(10);
    expect(picked.length).toBe(10);
  });
});
