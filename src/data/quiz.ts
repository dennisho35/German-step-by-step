import type { QuizQuestion } from './types';

export type { QuizQuestion };

/** 德語測驗題庫（跨主題）。prompt 使用德語原文，解析以英文輔助。 */
export const QUIZ_BANK: QuizQuestion[] = [
  // 字母與發音
  { id: 'q01', prompt: 'Welcher Buchstabe wird „eßtset“ genannt?', promptEn: 'Which letter is called "eszett"?', options: ['Ä', 'Ö', 'ß', 'Ü'], answerIndex: 2, explanationEn: 'ß (Eszett) represents a voiceless /s/ after a long vowel, e.g. Straße.' },
  { id: 'q02', prompt: 'Wie spricht man „ei“ aus?', promptEn: 'How is "ei" pronounced?', options: ['/iː/', '/aɪ̯/', '/ɔʏ̯/', '/uː/'], answerIndex: 1, explanationEn: '"ei" is pronounced /aɪ̯/, as in "Mein".' },
  { id: 'q03', prompt: 'Wie spricht man „ie“ aus?', promptEn: 'How is "ie" pronounced?', options: ['/aɪ̯/', '/eː/', '/iː/', '/aʊ̯/'], answerIndex: 2, explanationEn: '"ie" is a long /iː/, as in "Liebe".' },
  { id: 'q04', prompt: 'Wie spricht man „z“ aus?', promptEn: 'How is "z" pronounced?', options: ['/z/', '/s/', '/ts/', '/ʃ/'], answerIndex: 2, explanationEn: 'German "z" is always /ts/, as in "Zeit".' },
  { id: 'q05', prompt: 'Wie spricht man „sch“ aus?', promptEn: 'How is "sch" pronounced?', options: ['/ʃ/', '/sk/', '/ç/', '/ts/'], answerIndex: 0, explanationEn: '"sch" is pronounced /ʃ/, as in "Schule".' },
  // 詞性 / 冠詞
  { id: 'q06', prompt: 'Welcher Artikel gehört zu „Mädchen“?', promptEn: 'Which article belongs to "Mädchen"?', options: ['der', 'die', 'das', 'den'], answerIndex: 2, explanationEn: '"Mädchen" is neuter (das) because of the diminutive suffix -chen.' },
  { id: 'q07', prompt: 'Welcher Artikel gehört zu „Brot“?', promptEn: 'Which article belongs to "Brot"?', options: ['der', 'die', 'das', 'den'], answerIndex: 2, explanationEn: '"Brot" is neuter: das Brot.' },
  { id: 'q08', prompt: 'Welcher Artikel gehört zu „Mutter“?', promptEn: 'Which article belongs to "Mutter"?', options: ['der', 'die', 'das', 'dem'], answerIndex: 1, explanationEn: '"Mutter" is feminine: die Mutter.' },
  { id: 'q09', prompt: 'Welcher Artikel gehört zu „Tisch“?', promptEn: 'Which article belongs to "Tisch"?', options: ['der', 'die', 'das', 'ein'], answerIndex: 0, explanationEn: '"Tisch" is masculine: der Tisch.' },
  // 數字
  { id: 'q10', prompt: 'Was ist „zwei“ auf Deutsch?', promptEn: 'What is "two" in German?', options: ['eins', 'zwei', 'drei', 'zehn'], answerIndex: 1, explanationEn: 'zwei = two.' },
  { id: 'q11', prompt: 'Was ist „20“ auf Deutsch?', promptEn: 'What is "20" in German?', options: ['zwanzig', 'dreißig', 'zwölf', 'zweihundert'], answerIndex: 0, explanationEn: '20 = zwanzig.' },
  { id: 'q12', prompt: 'Wie sagt man „half past two“ auf Deutsch?', promptEn: 'How do you say "half past two" in German?', options: ['Es ist halb zwei.', 'Es ist zwei Uhr.', 'Es ist Viertel zwei.', 'Es ist halb drei.'], answerIndex: 3, explanationEn: 'Halb drei = half past two (half towards three).' },
  // 文法
  { id: 'q13', prompt: '„Ich ___ Anna.“ (sein)', promptEn: '"I ___ Anna." (to be)', options: ['bin', 'bist', 'ist', 'sind'], answerIndex: 0, explanationEn: 'ich bin = I am.' },
  { id: 'q14', prompt: 'Wie ist die richtige Wortstellung?', promptEn: 'What is the correct word order?', options: ['Ich Deutsch lerne.', 'Ich lerne Deutsch.', 'Lerne ich Deutsch.', 'Deutsch ich lerne.'], answerIndex: 1, explanationEn: 'In a main clause the conjugated verb is in position 2.' },
  { id: 'q15', prompt: '„Ich habe ___ Auto.“ (kein/keine)', promptEn: '"I have ___ car."', options: ['kein', 'keine', 'nicht', 'einem'], answerIndex: 0, explanationEn: 'kein negates a noun with an indefinite article: kein Auto.' },
  { id: 'q16', prompt: 'Was ist der Akkusativ von „der Mann“?', promptEn: 'What is the accusative of "der Mann"?', options: ['der Mann', 'den Mann', 'dem Mann', 'des Mannes'], answerIndex: 1, explanationEn: 'The accusative of der is den: den Mann.' },
  { id: 'q17', prompt: 'Was ist der Dativ von „die Frau“?', promptEn: 'What is the dative of "die Frau"?', options: ['die Frau', 'der Frau', 'den Frau', 'das Frau'], answerIndex: 1, explanationEn: 'The dative of die is der: der Frau.' },
  // 單字
  { id: 'q18', prompt: 'Was bedeutet „Haus“?', promptEn: 'What does "Haus" mean?', options: ['house', 'car', 'book', 'tree'], answerIndex: 0, explanationEn: 'Haus = house.' },
  { id: 'q19', prompt: 'Was bedeutet „Wasser“?', promptEn: 'What does "Wasser" mean?', options: ['bread', 'water', 'milk', 'wine'], answerIndex: 1, explanationEn: 'Wasser = water.' },
  { id: 'q20', prompt: 'Was ist das Plural von „Apfel“?', promptEn: 'What is the plural of "Apfel"?', options: ['Äpfel', 'Apfels', 'Äpfeln', 'Apfel'], answerIndex: 0, explanationEn: 'der Apfel → die Äpfel.' },
];

/** 依主題選取題目：預設抽 10 題 */
export function pickQuizQuestions(count = 10): QuizQuestion[] {
  const shuffled = [...QUIZ_BANK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
