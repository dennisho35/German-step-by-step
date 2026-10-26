import { useCallback, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../state/LanguageContext';

export type SpeechStatus = 'idle' | 'speaking' | 'paused' | 'unsupported' | 'error';

/**
 * 德語發音 hook：使用瀏覽器語音合成，播放德語單字/句子。
 * - 檢查裝置是否支援德語語音。
 * - 支援播放、暫停、重播、語速控制。
 * - 音訊失敗時回報本地化錯誤，不假裝播放成功。
 */
export function useSpeech() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<SpeechStatus>('idle');
  const [speechRate, setSpeechRateState] = useState(0.9);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const supported = useMemo(() => {
    if (typeof window === 'undefined' || typeof window.speechSynthesis === 'undefined') return false;
    const voices = window.speechSynthesis.getVoices();
    const de = voices.find((v) => v.lang.toLowerCase().startsWith('de'));
    return Boolean(de);
  }, []);

  const initVoice = useCallback(() => {
    if (typeof window === 'undefined' || typeof window.speechSynthesis === 'undefined') return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find((v) => v.lang.toLowerCase().startsWith('de')) ?? null;
  }, []);

  const play = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      if (typeof window === 'undefined' || typeof window.speechSynthesis === 'undefined') {
        setStatus('unsupported');
        return;
      }
      const voice = voiceRef.current ?? initVoice();
      if (!voice) {
        setStatus('unsupported');
        return;
      }
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'de-DE';
        u.voice = voice;
        u.rate = speechRate;
        u.onend = () => setStatus('idle');
        u.onerror = () => setStatus('error');
        setStatus('speaking');
        window.speechSynthesis.speak(u);
      } catch {
        setStatus('error');
      }
    },
    [speechRate, initVoice],
  );

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.pause();
      setStatus('paused');
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.resume();
      setStatus('speaking');
    }
  }, []);

  const replay = useCallback(
    (text: string) => {
      play(text);
    },
    [play],
  );

  const setSpeechRate = useCallback((r: number) => {
    setSpeechRateState(r);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setStatus('idle');
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setStatus('idle');
  }, []);

  // 錯誤訊息（本地化）
  const errorMessage = useMemo(() => {
    if (status === 'unsupported') return t('errors.voiceUnsupported');
    if (status === 'error') return t('errors.audioError');
    return null;
  }, [status, t]);

  return { status, errorMessage, supported, play, pause, resume, replay, stop, speechRate, setSpeechRate };
}
