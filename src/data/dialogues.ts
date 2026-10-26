import type { Dialogue } from './types';

/** 日常德語對話：購物、餐廳、交通、住宿、自我介紹。 */
export const DIALOGUES: Dialogue[] = [
  {
    id: 'd1',
    topic: 'Begrüßung und Vorstellung',
    lines: [
      { speaker: 'A', text: 'Guten Morgen! Wie heißt du?', textEn: 'Good morning! What is your name?' },
      { speaker: 'B', text: 'Guten Morgen! Ich heiße Anna. Und du?', textEn: 'Good morning! My name is Anna. And you?' },
      { speaker: 'A', text: 'Ich heiße Peter. Woher kommst du?', textEn: 'My name is Peter. Where are you from?' },
      { speaker: 'B', text: 'Ich komme aus China. Und du?', textEn: 'I am from China. And you?' },
      { speaker: 'A', text: 'Ich komme aus Deutschland.', textEn: 'I am from Germany.' },
    ],
  },
  {
    id: 'd2',
    topic: 'Im Restaurant',
    lines: [
      { speaker: 'A', text: 'Einen Tisch für zwei, bitte.', textEn: 'A table for two, please.' },
      { speaker: 'B', text: 'Natürlich. Hier entlang, bitte.', textEn: 'Of course. This way, please.' },
      { speaker: 'A', text: 'Die Speisekarte, bitte.', textEn: 'The menu, please.' },
      { speaker: 'B', text: 'Was möchten Sie essen?', textEn: 'What would you like to eat?' },
      { speaker: 'A', text: 'Ich nehme die Suppe und ein Glas Wasser.', textEn: 'I\'ll have the soup and a glass of water.' },
    ],
  },
  {
    id: 'd3',
    topic: 'Einkaufen',
    lines: [
      { speaker: 'A', text: 'Guten Tag! Was kostet dieses Brot?', textEn: 'Hello! How much is this bread?' },
      { speaker: 'B', text: 'Das Brot kostet drei Euro.', textEn: 'The bread costs three euros.' },
      { speaker: 'A', text: 'Ich nehme es. Haben Sie auch Milch?', textEn: 'I\'ll take it. Do you also have milk?' },
      { speaker: 'B', text: 'Ja, die Milch steht dort.', textEn: 'Yes, the milk is over there.' },
      { speaker: 'A', text: 'Danke schön!', textEn: 'Thank you very much!' },
    ],
  },
  {
    id: 'd4',
    topic: 'Am Bahnhof',
    lines: [
      { speaker: 'A', text: 'Entschuldigung, wann fährt der Zug nach Berlin?', textEn: 'Excuse me, when does the train to Berlin leave?' },
      { speaker: 'B', text: 'Der Zug fährt um zehn Uhr.', textEn: 'The train leaves at ten o\'clock.' },
      { speaker: 'A', text: 'Wo ist Gleis drei?', textEn: 'Where is platform three?' },
      { speaker: 'B', text: 'Dort rechts, bitte.', textEn: 'Over there to the right, please.' },
      { speaker: 'A', text: 'Vielen Dank!', textEn: 'Thank you very much!' },
    ],
  },
  {
    id: 'd5',
    topic: 'Im Hotel',
    lines: [
      { speaker: 'A', text: 'Ich habe ein Zimmer reserviert.', textEn: 'I have reserved a room.' },
      { speaker: 'B', text: 'Wie ist Ihr Name, bitte?', textEn: 'What is your name, please?' },
      { speaker: 'A', text: 'Mein Name ist Schmidt.', textEn: 'My name is Schmidt.' },
      { speaker: 'B', text: 'Ihr Zimmer ist Nummer 12, im zweiten Stock.', textEn: 'Your room is number 12, on the second floor.' },
      { speaker: 'A', text: 'Gibt es hier WLAN?', textEn: 'Is there Wi-Fi here?' },
    ],
  },
  {
    id: 'd6',
    topic: 'Alltag und Zeit',
    lines: [
      { speaker: 'A', text: 'Wie spät ist es?', textEn: 'What time is it?' },
      { speaker: 'B', text: 'Es ist halb drei.', textEn: 'It is half past two.' },
      { speaker: 'A', text: 'Wann beginnt der Kurs?', textEn: 'When does the course begin?' },
      { speaker: 'B', text: 'Der Kurs beginnt um drei Uhr.', textEn: 'The course begins at three o\'clock.' },
    ],
  },
];
