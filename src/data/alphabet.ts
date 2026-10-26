import type { LetterData } from './types';

/**
 * 德語字母 A–Z + 特殊字母 Ä Ö Ü ß。
 * IPA 音標與德語原文為學習原文，不隨介面語言翻譯。
 */
export const ALPHABET: LetterData[] = [
  { id: 'A', letter: 'A', name: 'a', ipa: '/aː/', kind: 'vowel', length: 'long', pronunciation: 'wie in „Apfel“, offener, heller a-Laut.', example: 'Apfel', exampleGloss: 'apple', special: false },
  { id: 'B', letter: 'B', name: 'be', ipa: '/beː/', kind: 'consonant', pronunciation: 'stimmlos, wie deutsches „b“ in „Brot“.', example: 'Brot', exampleGloss: 'bread', special: false },
  { id: 'C', letter: 'C', name: 'ce', ipa: '/tseː/', kind: 'consonant', pronunciation: 'nur in Fremdwörtern; meist als /k/ oder /ts/.', example: 'Computer', exampleGloss: 'computer', special: false },
  { id: 'D', letter: 'D', name: 'de', ipa: '/deː/', kind: 'consonant', pronunciation: 'stimmhaft, wie „d“ in „Danke“.', example: 'Danke', exampleGloss: 'thanks', special: false },
  { id: 'E', letter: 'E', name: 'e', ipa: '/eː/', kind: 'vowel', length: 'long', pronunciation: 'geschlossener e-Laut, wie in „Elefant“.', example: 'Elefant', exampleGloss: 'elephant', special: false },
  { id: 'F', letter: 'F', name: 'ef', ipa: '/ɛf/', kind: 'consonant', pronunciation: 'stimmlos, wie „f“ in „Fisch“.', example: 'Fisch', exampleGloss: 'fish', special: false },
  { id: 'G', letter: 'G', name: 'ge', ipa: '/geː/', kind: 'consonant', pronunciation: 'meist stimmhaft wie „g“ in „Garten“.', example: 'Garten', exampleGloss: 'garden', special: false },
  { id: 'H', letter: 'H', name: 'ha', ipa: '/haː/', kind: 'consonant', pronunciation: 'am Wortanfang hörbares /h/, sonst stumm.', example: 'Haus', exampleGloss: 'house', special: false },
  { id: 'I', letter: 'I', name: 'i', ipa: '/iː/', kind: 'vowel', length: 'long', pronunciation: 'geschlossener i-Laut wie in „Insel“.', example: 'Insel', exampleGloss: 'island', special: false },
  { id: 'J', letter: 'J', name: 'jott', ipa: '/jɔt/', kind: 'consonant', pronunciation: 'wie deutsches „j“ in „ja“ (englisch y).', example: 'Ja', exampleGloss: 'yes', special: false },
  { id: 'K', letter: 'K', name: 'ka', ipa: '/kaː/', kind: 'consonant', pronunciation: 'stimmlos, wie „k“ in „Kaffee“.', example: 'Kaffee', exampleGloss: 'coffee', special: false },
  { id: 'L', letter: 'L', name: 'el', ipa: '/ɛl/', kind: 'consonant', pronunciation: 'wie „l“ in „Liebe“.', example: 'Liebe', exampleGloss: 'love', special: false },
  { id: 'M', letter: 'M', name: 'em', ipa: '/ɛm/', kind: 'consonant', pronunciation: 'wie „m“ in „Mutter“.', example: 'Mutter', exampleGloss: 'mother', special: false },
  { id: 'N', letter: 'N', name: 'en', ipa: '/ɛn/', kind: 'consonant', pronunciation: 'wie „n“ in „Name“.', example: 'Name', exampleGloss: 'name', special: false },
  { id: 'O', letter: 'O', name: 'o', ipa: '/oː/', kind: 'vowel', length: 'long', pronunciation: 'geschlossener o-Laut wie in „Ofen“.', example: 'Ofen', exampleGloss: 'oven', special: false },
  { id: 'P', letter: 'P', name: 'pe', ipa: '/peː/', kind: 'consonant', pronunciation: 'stimmlos, wie „p“ in „Post“.', example: 'Post', exampleGloss: 'post', special: false },
  { id: 'Q', letter: 'Q', name: 'ku', ipa: '/kuː/', kind: 'consonant', pronunciation: 'fast immer als /kv/ (qu) ausgesprochen.', example: 'Quelle', exampleGloss: 'spring/source', special: false },
  { id: 'R', letter: 'R', name: 'er', ipa: '/ɛɐ̯/', kind: 'consonant', pronunciation: 'gerolltes oder Zäpfchen-r, wie in „rot“.', example: 'rot', exampleGloss: 'red', special: false },
  { id: 'S', letter: 'S', name: 'es', ipa: '/ɛs/', kind: 'consonant', pronunciation: 'am Wortanfang stimmhaft /z/ („See“).', example: 'See', exampleGloss: 'lake', special: false },
  { id: 'T', letter: 'T', name: 'te', ipa: '/teː/', kind: 'consonant', pronunciation: 'stimmlos, wie „t“ in „Tag“.', example: 'Tag', exampleGloss: 'day', special: false },
  { id: 'U', letter: 'U', name: 'u', ipa: '/uː/', kind: 'vowel', length: 'long', pronunciation: 'geschlossener u-Laut wie in „Uhr“.', example: 'Uhr', exampleGloss: 'clock', special: false },
  { id: 'V', letter: 'V', name: 'vau', ipa: '/faʊ̯/', kind: 'consonant', pronunciation: 'meist wie /f/ („Vater“), in Fremdwörtern wie /v/.', example: 'Vater', exampleGloss: 'father', special: false },
  { id: 'W', letter: 'W', name: 'we', ipa: '/veː/', kind: 'consonant', pronunciation: 'wie englisch „v“, also /v/ („Wasser“).', example: 'Wasser', exampleGloss: 'water', special: false },
  { id: 'X', letter: 'X', name: 'ix', ipa: '/ɪks/', kind: 'consonant', pronunciation: 'wie /ks/, selten in deutschen Wörtern.', example: 'Taxi', exampleGloss: 'taxi', special: false },
  { id: 'Y', letter: 'Y', name: 'üpsilon', ipa: '/ˈʏpsilɔn/', kind: 'consonant', pronunciation: 'in Fremdwörtern; wie /yː/ oder /ʏ/.', example: 'Yoga', exampleGloss: 'yoga', special: false },
  { id: 'Z', letter: 'Z', name: 'zett', ipa: '/tsɛt/', kind: 'consonant', pronunciation: 'wie /ts/ („Zeit“).', example: 'Zeit', exampleGloss: 'time', special: false },
  { id: 'AE', letter: 'Ä', name: 'ä', ipa: '/ɛː/', kind: 'vowel', length: 'long', pronunciation: 'heller ä-Laut wie in „Äpfel“, oder /ɛ/.', example: 'Äpfel', exampleGloss: 'apples', special: true },
  { id: 'OE', letter: 'Ö', name: 'ö', ipa: '/øː/', kind: 'vowel', length: 'long', pronunciation: 'gerundeter ö-Laut wie in „Öl“.', example: 'Öl', exampleGloss: 'oil', special: true },
  { id: 'UE', letter: 'Ü', name: 'ü', ipa: '/yː/', kind: 'vowel', length: 'long', pronunciation: 'gerundeter ü-Laut wie in „Übung“.', example: 'Übung', exampleGloss: 'exercise', special: true },
  { id: 'SZ', letter: 'ß', name: 'Eszett', ipa: '/ɛsˈtsɛt/', kind: 'consonant', pronunciation: 'stimmloses /s/ nach langem Vokal („Straße“).', example: 'Straße', exampleGloss: 'street', special: true },
];

export const LETTERS = ALPHABET;
export const SPECIAL_LETTERS = ALPHABET.filter((l) => l.special);
export const VOWELS = ALPHABET.filter((l) => l.kind === 'vowel');
export const CONSONANTS = ALPHABET.filter((l) => l.kind === 'consonant');

/** 常見字母組合（德語發音規則） */
export const LETTER_COMBINATIONS = [
  { combo: 'ei', ipa: '/aɪ̯/', example: 'Mein', gloss: 'my' },
  { combo: 'ie', ipa: '/iː/', example: 'Liebe', gloss: 'love' },
  { combo: 'eu', ipa: '/ɔʏ̯/', example: 'neu', gloss: 'new' },
  { combo: 'äu', ipa: '/ɔʏ̯/', example: 'Häuser', gloss: 'houses' },
  { combo: 'au', ipa: '/aʊ̯/', example: 'Haus', gloss: 'house' },
  { combo: 'sch', ipa: '/ʃ/', example: 'Schule', gloss: 'school' },
  { combo: 'tsch', ipa: '/tʃ/', example: 'Deutsch', gloss: 'German' },
  { combo: 'ch', ipa: '/x/ oder /ç/', example: 'Buch', gloss: 'book' },
  { combo: 'sp', ipa: '/ʃp/', example: 'Sport', gloss: 'sport' },
  { combo: 'st', ipa: '/ʃt/', example: 'Straße', gloss: 'street' },
  { combo: 'z', ipa: '/ts/', example: 'Zeit', gloss: 'time' },
  { combo: 'ck', ipa: '/k/', example: 'Ecke', gloss: 'corner' },
];
