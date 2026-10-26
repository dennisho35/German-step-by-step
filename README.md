# 德語 Step by Step 國際版 (German Step by Step)

循序漸進學習德語的國際版學習應用程式。響應式 Web App（React + TypeScript + Vite），支援 **16 種正式介面語言**，並提供 GitHub Pages 部署與 Android（Capacitor）封裝建置能力。

## 目錄
1. [功能總覽](#功能總覽)
2. [16 種介面語言](#16-種介面語言)
3. [安裝與執行](#安裝與執行)
4. [測試](#測試)
5. [部署至 GitHub Pages](#部署至-github-pages)
6. [Android 建置](#android-建置)
7. [翻譯資源架構與更新](#翻譯資源架構與更新)
8. [專案結構](#專案結構)
9. [已知限制](#已知限制)

---

## 功能總覽

- **德語課程**：字母 A–Z 與 Ä/Ö/Ü/ß（名稱、IPA、發音、例詞）、六大深度學習區塊、單字（冠詞/詞性/複數）、數字/日期/時間、文法（四格、動詞變位、語序、否定、疑問、介詞、連接詞）、日常對話（購物、餐廳、交通、旅遊、住宿）、測驗與錯題複習。
- **發音**：Web Speech API 德語語音合成，支援播放/暫停/重播/語速，語音不可用時顯示本地化錯誤。
- **A9 寫字板**：清除、復原、重做、重設、顯示/隱藏參考字形、書寫提示、儲存；支援觸控/滑鼠/手寫筆；適合練習德語字母（含 Ä/Ö/Ü/ß）。
- **學習進度與 SRS（間隔重複）**：未開始/學習中/已學習/待複習/已掌握；依實際作答記錄更新，切換語言不遺失進度。
- **語言切換**：左上角語言選擇器，即時切換不重新載入、不重設導航/進度/畫布/音訊偏好。

## 16 種介面語言

| Locale | 名稱 | 國旗 |
|---|---|---|
| en-GB | English (UK) | 🇬🇧 |
| fr-FR | Français | 🇫🇷 |
| ja-JP | 日本語 | 🇯🇵 |
| es-ES | Español | 🇪🇸 |
| ru-RU | Русский | 🇷🇺 |
| uk-UA | Українська | 🇺🇦 |
| it-IT | Italiano | 🇮🇹 |
| ko-KR | 한국어 | 🇰🇷 |
| th-TH | ไทย | 🇹🇭 |
| vi-VN | Tiếng Việt | 🇻🇳 |
| my-MM | မြန်မာဘာသာ | 🇲🇲 |
| id-ID | Bahasa Indonesia | 🇮🇩 |
| fil-PH | Filipino | 🇵🇭 |
| km-KH | ភាសាខ្មែរ | 🇰🇭 |
| zh-HK | 正體中文（香港） | 🇭🇰 |
| de-DE | Deutsch | 🇩🇪 |

- 正式 locale 清單**剛好** 16 個，不含簡體中文（zh-CN）。
- 首次使用依裝置語言偵測；不受支援時預設 `en-GB`，**不自動轉簡體中文**。
- 語言偏好持久保存；無效 locale 安全回退 `en-GB`。
- 回退順序嚴格為：目前 locale → `en-GB` → 本地化缺漏提示（絕不回退中文）。

## 安裝與執行

```bash
npm install
npm run dev        # 本地開發（http://localhost:5173）
npm run build      # 型別檢查 + 生產建置 → dist/
npm run preview    # 預覽建置結果
```

## 測試

```bash
npm run lint            # TypeScript 靜態型別檢查
npm test                # 全部單元測試
npm run check:i18n      # i18n + 德語內容測試
npm run check:locale    # 翻譯完整性報告（reports/translation-completeness-report.md）
```

測試涵蓋：
- **Locale 完整性**：正式清單剛好 16 個、每個語系含全部 key、無重複/無效 key、國旗/自稱名稱正確、無 zh-CN、裝置語言回退。
- **UI 殘留檢查**：非中文介面無未翻譯簡體中文 UI（以簡體專用字偵測，正確排除日文/韓文合法漢字）。
- **語言切換**：即時更新、不重新載入、偏好持久化、無效 locale 安全回退。
- **回退機制**：目前 locale → en-GB → 安全提示，不顯示 undefined/內部 key。
- **德語內容**：字母/特殊字元、冠詞/詞性/複數、IPA、測驗答案、文法/對話/數字覆蓋。

## 部署至 GitHub Pages

1. 建立 GitHub 儲存庫並 push 此專案。
2. GitHub Actions（`.github/workflows/main.yml`）會在 `main` 分支自動：安裝依賴 → 型別檢查 → 單元測試 → 翻譯完整性檢查 → 建置 → 部署至 Pages。
3. 於儲存庫 **Settings → Pages** 選擇「GitHub Actions」作為部署來源。
4. 部署路徑由 `vite.config.ts` 的 `GHPAGES_BASE` 控制（預設 `/german-step-by-step/`；依你的倉庫名調整）。
5. 使用 **hash 路由**，子頁面可直接進入與重新整理（`#/alphabet/A`）。

## Android 建置

本專案以 **Capacitor** 將 Web App 封裝為 Android 原生應用（共用同一課程資料與 16 語系）。

```bash
# 前置：安裝 JDK 17+、Android SDK、Android Studio
npm run build                          # 產生 dist/
npx cap add android                    # 初始化 android 專案（首次）
npx cap sync                           # 同步 Web 資源至 Android 專案
npx cap open android                   # 用 Android Studio 開啟
# 在 Android Studio 中：Build → Build Bundle(s)/APK(s) → Build APK(s)
```

> **驗證狀態**：本開發環境未安裝 Android SDK/JDK，**尚未實際建置 APK**。上述為完整、可執行的建置流程；`capacitor.config.ts` 已就緒。APK 產物需在具備 Android SDK 的環境執行上述指令產生。

## 翻譯資源架構與更新

集中管理於 `src/i18n/messages/`，每語系一個 JSON：

```
src/i18n/
  index.ts              # 集中式翻譯服務（回退鏈、缺漏記錄、插值）
  localeRegistry.ts     # 16 locale 白名單 + 裝置語言偵測
  translationTypes.ts   # 翻譯型別（TypeScript 驗證完整性）
  messages/en-GB.json   # 主翻譯（完整 key 基準）
  messages/fr-FR.json … # 其餘 15 語系
```

新增/更新翻譯：
1. 於 `en-GB.json` 加入或修改 key（基準）。
2. 在 `translationTypes.ts` 對應 namespace 補型別。
3. 在其他 15 個語系補上相同 key 的翻譯。
4. 執行 `npm run check:locale` 與 `npm run check:i18n` 驗證。

命名規範：`namespace.key`（nav / common / home / alphabet / words / numbers / grammar / dialogues / quiz / canvas / settings / srs / errors / messages）。支援參數插值 `t('key', { name })`，佔位 `{name}`。

## 專案結構

```
german-step-by-step/
├── .github/workflows/main.yml   # CI/CD
├── public/assets/images/app_logo.png  # 品牌 Logo（原圖保留）
├── src/
│   ├── i18n/                    # 16 語系翻譯系統
│   ├── state/                   # 語言 + 進度/SRS Context
│   ├── data/                    # 德語課程資料（原文，不隨介面語言變）
│   ├── components/              # Header、語言選擇器、UI 元件
│   ├── pages/                   # 主頁/字母/單字/文法/對話/數字/測驗/畫布/設定
│   ├── hooks/                   # useSpeech（發音）、useCanvas（A9 畫布）
│   └── App.tsx                  # hash 路由 + 版型
├── scripts/check-locales.mjs    # 翻譯完整性報告產生器
├── tests/                       # 自動化測試（i18n/content/ui）
├── capacitor.config.ts          # Android 封裝
└── reports/translation-completeness-report.md
```

## 已知限制

- **Android APK 未在本環境實作建置**：需具備 Android SDK 的環境執行（見上）。
- **發音語音**：依賴瀏覽器 Web Speech API 的德語語音；部分桌面瀏覽器可能無 de-DE 語音，會顯示本地化錯誤提示，不假裝播放成功。
- **資料本地儲存**：進度存於裝置本地（localStorage / Android WebView），未實作雲端同步（規格允許）。
