/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Speaks the provided Chinese character in Mandarin using standard browser SpeechSynthesis.
 * 
 * @param text The text/character to pronounce
 * @param onError Callback if pronunciation fails
 */
export const speakMandarin = (text: string, onError?: (message: string) => void) => {
  if (!text) return;
  
  if (!("speechSynthesis" in window)) {
    if (onError) onError("⚠️ 您的浏览器/系统不支持语音合成发音功能。建议使用 Chrome 浏览器。");
    return;
  }

  try {
    // Cancel any ongoing speech to avoid overlapping
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN"; // Set explicitly to Chinese Mandarin
    utterance.rate = 0.85;    // Slower speed for educational clarity
    utterance.pitch = 1.0;

    // Retrieve voices
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      // Prioritize zh-CN, fallback to zh, zh-HK, zh-TW
      const zhVoice = voices.find(
        (v) => v.lang.includes("zh-CN") || v.lang === "zh" || v.lang.includes("zh-")
      );
      if (zhVoice) {
        utterance.voice = zhVoice;
      }
    }

    utterance.onerror = (e) => {
      console.error("Speech synthesis error occurred:", e);
      if (e.error !== "interrupted") {
        if (onError) onError("⚠️ 播放普通话发音失败，请确认系统已装载中文语音引擎。");
      }
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error("Speech synthesis failed with exception:", err);
    if (onError) onError("⚠️ 语音模块启动异常，请重试播放。");
  }
};
