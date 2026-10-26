import type { WordEntry } from './types';

/** 德語基本詞彙：名詞附冠詞（der/die/das）、複數與意義。 */
export const WORDS: WordEntry[] = [
  // 食物
  { id: 'w01', word: 'Brot', article: 'das', plural: 'die Brote', meaningEn: 'bread', category: 'food' },
  { id: 'w02', word: 'Wasser', article: 'das', plural: 'die Wasser', meaningEn: 'water', category: 'food' },
  { id: 'w03', word: 'Apfel', article: 'der', plural: 'die Äpfel', meaningEn: 'apple', category: 'food' },
  { id: 'w04', word: 'Kaffee', article: 'der', plural: 'die Kaffees', meaningEn: 'coffee', category: 'food' },
  { id: 'w05', word: 'Milch', article: 'die', plural: 'die Milche (sg. üblich)', meaningEn: 'milk', category: 'food' },
  { id: 'w06', word: 'Fisch', article: 'der', plural: 'die Fische', meaningEn: 'fish', category: 'food' },
  // 家人
  { id: 'w07', word: 'Mutter', article: 'die', plural: 'die Mütter', meaningEn: 'mother', category: 'family' },
  { id: 'w08', word: 'Vater', article: 'der', plural: 'die Väter', meaningEn: 'father', category: 'family' },
  { id: 'w09', word: 'Kind', article: 'das', plural: 'die Kinder', meaningEn: 'child', category: 'family' },
  { id: 'w10', word: 'Mädchen', article: 'das', plural: 'die Mädchen', meaningEn: 'girl', category: 'family' },
  { id: 'w11', word: 'Bruder', article: 'der', plural: 'die Brüder', meaningEn: 'brother', category: 'family' },
  { id: 'w12', word: 'Schwester', article: 'die', plural: 'die Schwestern', meaningEn: 'sister', category: 'family' },
  // 旅遊
  { id: 'w13', word: 'Zug', article: 'der', plural: 'die Züge', meaningEn: 'train', category: 'travel' },
  { id: 'w14', word: 'Flugzeug', article: 'das', plural: 'die Flugzeuge', meaningEn: 'airplane', category: 'travel' },
  { id: 'w15', word: 'Hotel', article: 'das', plural: 'die Hotels', meaningEn: 'hotel', category: 'travel' },
  { id: 'w16', word: 'Karte', article: 'die', plural: 'die Karten', meaningEn: 'ticket / map', category: 'travel' },
  { id: 'w17', word: 'Bahnhof', article: 'der', plural: 'die Bahnhöfe', meaningEn: 'train station', category: 'travel' },
  // 日常
  { id: 'w18', word: 'Haus', article: 'das', plural: 'die Häuser', meaningEn: 'house', category: 'daily' },
  { id: 'w19', word: 'Buch', article: 'das', plural: 'die Bücher', meaningEn: 'book', category: 'daily' },
  { id: 'w20', word: 'Uhr', article: 'die', plural: 'die Uhren', meaningEn: 'clock', category: 'daily' },
  { id: 'w21', word: 'Tisch', article: 'der', plural: 'die Tische', meaningEn: 'table', category: 'home' },
  { id: 'w22', word: 'Stuhl', article: 'der', plural: 'die Stühle', meaningEn: 'chair', category: 'home' },
  { id: 'w23', word: 'Fenster', article: 'das', plural: 'die Fenster', meaningEn: 'window', category: 'home' },
  // 大自然
  { id: 'w24', word: 'Baum', article: 'der', plural: 'die Bäume', meaningEn: 'tree', category: 'nature' },
  { id: 'w25', word: 'Blume', article: 'die', plural: 'die Blumen', meaningEn: 'flower', category: 'nature' },
  { id: 'w26', word: 'Sonne', article: 'die', plural: 'die Sonnen', meaningEn: 'sun', category: 'nature' },
  { id: 'w27', word: 'Wald', article: 'der', plural: 'die Wälder', meaningEn: 'forest', category: 'nature' },
  // 人
  { id: 'w28', word: 'Mann', article: 'der', plural: 'die Männer', meaningEn: 'man', category: 'people' },
  { id: 'w29', word: 'Frau', article: 'die', plural: 'die Frauen', meaningEn: 'woman', category: 'people' },
  { id: 'w30', word: 'Freund', article: 'der', plural: 'die Freunde', meaningEn: 'friend', category: 'people' },
  { id: 'w31', word: 'Lehrer', article: 'der', plural: 'die Lehrer', meaningEn: 'teacher', category: 'people' },
  // 時間
  { id: 'w32', word: 'Tag', article: 'der', plural: 'die Tage', meaningEn: 'day', category: 'time' },
  { id: 'w33', word: 'Nacht', article: 'die', plural: 'die Nächte', meaningEn: 'night', category: 'time' },
  { id: 'w34', word: 'Jahr', article: 'das', plural: 'die Jahre', meaningEn: 'year', category: 'time' },
  { id: 'w35', word: 'Woche', article: 'die', plural: 'die Wochen', meaningEn: 'week', category: 'time' },
];

export const WORD_CATEGORIES = ['food', 'family', 'travel', 'daily', 'nature', 'people', 'home', 'time'] as const;
export type WordCategory = (typeof WORD_CATEGORIES)[number];
