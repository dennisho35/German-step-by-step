#!/usr/bin/env node
/* 為 16 個語系 JSON 注入 words.categoryNames 翻譯 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const msgDir = join(__dirname, '..', 'src', 'i18n', 'messages');

const CATS = {
  'en-GB': { food: 'Food', family: 'Family', travel: 'Travel', daily: 'Daily life', nature: 'Nature', people: 'People', home: 'Home', time: 'Time' },
  'fr-FR': { food: 'Nourriture', family: 'Famille', travel: 'Voyage', daily: 'Vie quotidienne', nature: 'Nature', people: 'Personnes', home: 'Maison', time: 'Temps' },
  'ja-JP': { food: '食べ物', family: '家族', travel: '旅行', daily: '日常生活', nature: '自然', people: '人', home: '家', time: '時間' },
  'es-ES': { food: 'Comida', family: 'Familia', travel: 'Viaje', daily: 'Vida diaria', nature: 'Naturaleza', people: 'Personas', home: 'Hogar', time: 'Tiempo' },
  'ru-RU': { food: 'Еда', family: 'Семья', travel: 'Путешествия', daily: 'Повседневная жизнь', nature: 'Природа', people: 'Люди', home: 'Дом', time: 'Время' },
  'uk-UA': { food: 'Їжа', family: 'Сім\'я', travel: 'Подорожі', daily: 'Повсякденне життя', nature: 'Природа', people: 'Люди', home: 'Дім', time: 'Час' },
  'it-IT': { food: 'Cibo', family: 'Famiglia', travel: 'Viaggio', daily: 'Vita quotidiana', nature: 'Natura', people: 'Persone', home: 'Casa', time: 'Tempo' },
  'ko-KR': { food: '음식', family: '가족', travel: '여행', daily: '일상생활', nature: '자연', people: '사람', home: '집', time: '시간' },
  'th-TH': { food: 'อาหาร', family: 'ครอบครัว', travel: 'การเดินทาง', daily: 'ชีวิตประจำวัน', nature: 'ธรรมชาติ', people: 'ผู้คน', home: 'บ้าน', time: 'เวลา' },
  'vi-VN': { food: 'Đồ ăn', family: 'Gia đình', travel: 'Du lịch', daily: 'Đời sống hằng ngày', nature: 'Thiên nhiên', people: 'Con người', home: 'Nhà cửa', time: 'Thời gian' },
  'my-MM': { food: 'အစားအစာ', family: 'မိသားစု', travel: 'ခရီးသွား', daily: 'နေ့စဉ်ဘဝ', nature: 'သဘာဝ', people: 'လူများ', home: 'အိမ်', time: 'အချိန်' },
  'id-ID': { food: 'Makanan', family: 'Keluarga', travel: 'Perjalanan', daily: 'Kehidupan sehari-hari', nature: 'Alam', people: 'Orang', home: 'Rumah', time: 'Waktu' },
  'fil-PH': { food: 'Pagkain', family: 'Pamilya', travel: 'Paglalakbay', daily: 'Pang-araw-araw na buhay', nature: 'Kalikasan', people: 'Mga tao', home: 'Tahanan', time: 'Oras' },
  'km-KH': { food: 'អាហារ', family: 'គ្រួសារ', travel: 'ការធ្វើដំណើរ', daily: 'ជីវិតប្រចាំថ្ងៃ', nature: 'ធម្មជាតិ', people: 'មនុស្ស', home: 'ផ្ទះ', time: 'ពេលវេលា' },
  'zh-HK': { food: '食物', family: '家庭', travel: '旅行', daily: '日常生活', nature: '大自然', people: '人物', home: '家居', time: '時間' },
  'de-DE': { food: 'Essen', family: 'Familie', travel: 'Reisen', daily: 'Alltag', nature: 'Natur', people: 'Menschen', home: 'Zuhause', time: 'Zeit' },
};

for (const [loc, cats] of Object.entries(CATS)) {
  const file = join(msgDir, `${loc}.json`);
  const data = JSON.parse(readFileSync(file, 'utf8'));
  if (data.words.categoryNames) continue;
  data.words.categoryNames = cats;
  writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`updated ${loc}`);
}
console.log('done');
