import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Android 封裝配置：以 Web App 打包為原生 Android 應用。
 * Web 與 Android 共用同一套課程資料與 16 語系 i18n。
 */
const config: CapacitorConfig = {
  appId: 'com.germanstepbystep.app',
  appName: 'German Step by Step',
  webDir: 'dist',
  backgroundColor: '#fdfaf3',
  android: {
    allowMixedContent: true,
  },
  server: {
    androidScheme: 'https',
  },
  plugins: {
    // 本地儲存：Android 使用 WebView localStorage（由 Capacitor 持久化）
  },
};

export default config;
