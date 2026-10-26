#!/usr/bin/env node
/**
 * 翻譯完整性檢查與報告產生器。
 * - 驗證正式 locale 清單剛好 16 個。
 * - 逐語系比對 en-GB 的所有 key。
 * - 輸出翻譯完整性測試報告（reports/translation-completeness-report.md）。
 * 必要翻譯缺漏會導致 exit code 非 0（正式版保護）。
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const msgDir = join(root, 'src', 'i18n', 'messages');
const reportDir = join(root, 'reports');

const EXPECTED_LOCALES = [
  'en-GB', 'fr-FR', 'ja-JP', 'es-ES', 'ru-RU', 'uk-UA', 'it-IT',
  'ko-KR', 'th-TH', 'vi-VN', 'my-MM', 'id-ID', 'fil-PH', 'km-KH', 'zh-HK', 'de-DE',
];

function collectKeys(obj, prefix = '') {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) keys.push(...collectKeys(v, path));
    else keys.push(path);
  }
  return keys;
}

const files = readdirSync(msgDir).filter((f) => f.endsWith('.json'));
const actualLocales = files.map((f) => f.replace('.json', '')).sort();

// 1) locale 清單完整性
const localeIssues = [];
for (const loc of EXPECTED_LOCALES) if (!actualLocales.includes(loc)) localeIssues.push(`缺少 ${loc}`);
for (const loc of actualLocales) if (!EXPECTED_LOCALES.includes(loc)) localeIssues.push(`多餘 locale ${loc}`);

const enData = JSON.parse(readFileSync(join(msgDir, 'en-GB.json'), 'utf8'));
const enKeys = collectKeys(enData);

let totalMissing = 0;
const rows = [];

for (const loc of EXPECTED_LOCALES) {
  const data = JSON.parse(readFileSync(join(msgDir, `${loc}.json`), 'utf8'));
  const keys = collectKeys(data);
  const missing = enKeys.filter((k) => !keys.includes(k));
  const extra = keys.filter((k) => !enKeys.includes(k));
  totalMissing += missing.length;
  rows.push({
    locale: loc,
    keys: keys.length,
    missing: missing.length,
    missingList: missing,
    extra,
  });
}

const lines = [];
lines.push('# 翻譯完整性測試報告');
lines.push('');
lines.push(`生成時間: ${new Date().toISOString()}`);
lines.push(`正式 locale 數: ${EXPECTED_LOCALES.length}（檢查通過: ${localeIssues.length === 0 ? '是' : '否'}）`);
lines.push('');
if (localeIssues.length) {
  lines.push('## Locale 清單問題');
  for (const i of localeIssues) lines.push(`- ⚠️ ${i}`);
  lines.push('');
}
lines.push('## 各語系 key 完整性');
lines.push('');
lines.push('| Locale | 總 key 數 | 缺漏 key 數 | 狀態 |');
lines.push('|---|---|---|---|');
for (const r of rows) {
  lines.push(`| ${r.locale} | ${r.keys} | ${r.missing} | ${r.missing === 0 ? '✅ 完整' : '❌ 缺漏'} |`);
}
lines.push('');
const failed = rows.filter((r) => r.missing > 0);
if (failed.length) {
  lines.push('## 缺漏明細（必要翻譯，正式版發佈前必須補齊）');
  lines.push('');
  for (const r of failed) {
    lines.push(`### ${r.locale}`);
    for (const k of r.missingList) lines.push(`- \`${k}\``);
    lines.push('');
  }
}
lines.push(`## 總結`);
lines.push('');
lines.push(`- 檢查語系數：${rows.length}`);
lines.push(`- 必要缺漏總數：${totalMissing}`);
lines.push(`- 檢查結果：${totalMissing === 0 && localeIssues.length === 0 ? '✅ 全部通過，可發佈正式版' : '❌ 存在缺漏，需修復後再發佈'}`);
lines.push('');

mkdirSync(reportDir, { recursive: true });
const reportFile = join(reportDir, 'translation-completeness-report.md');
writeFileSync(reportFile, lines.join('\n'), 'utf8');
console.log(`報告已產生: ${reportFile}`);
console.log(`必要缺漏總數: ${totalMissing}, locale 清單問題: ${localeIssues.length}`);
process.exit(totalMissing === 0 && localeIssues.length === 0 ? 0 : 1);
