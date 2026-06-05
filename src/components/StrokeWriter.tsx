/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";
import { Play, RotateCcw, ArrowRight, Eye, EyeOff, Clipboard, CheckCircle, RefreshCw, AlertCircle, Volume2 } from "lucide-react";
import { PINYIN_MAP } from "../charactersData";
import { speakMandarin } from "./PronunciationHelper";

interface StrokeWriterProps {
  char: string;
}

export default function StrokeWriter({ char }: StrokeWriterProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const writerRef = useRef<any>(null);
  
  // Display settings
  const [showOutline, setShowOutline] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [hasDataError, setHasDataError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Playback/Quiz feedback states
  const [quizFeedback, setQuizFeedback] = useState<string>("请按印墨虚线提示或笔顺笔法在右侧方格里书写汉字");
  const [quizProgress, setQuizProgress] = useState<{ correct: number; total: number } | null>(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showInkSplash, setShowInkSplash] = useState(false);

  // Re-create the HanziWriter instance on character or essential display option modifications
  useEffect(() => {
    if (!containerRef.current || !char) return;

    // Reset indicator states
    setHasDataError(false);
    setIsLoading(true);
    setIsQuizCompleted(false);
    setQuizProgress(null);
    setShowInkSplash(false);
    setQuizFeedback(isQuizMode ? "提笔开练！请按红印印章提示正确的笔画书写第一笔" : "格内观摩：点击下方播放动画，或逐笔拆解详析。");

    // Clean up container html
    containerRef.current.innerHTML = "";

    try {
      const writer = HanziWriter.create(containerRef.current, char, {
        width: 220,
        height: 220,
        padding: 15,
        strokeColor: "#2C3E50", // 徽州墨色 - Deep charcoal ink
        outlineColor: "#EBE5D3", // 宣纸微黄大底
        drawingColor: "#3E6D9C", // 青花瓷蓝 - Pure writing blue
        highlightColor: "#B83B26", // 朱砂印章色 - Stamp verification warning
        strokeAnimationSpeed: 1.0,
        delayBetweenStrokes: 180,
        showOutline: showOutline,
        
        // Error handling callbacks
        onLoadCharDataError: (err: any) => {
          console.warn("HanziWriter failed to load character:", char, err);
          setHasDataError(true);
          setIsLoading(false);
        },
        onLoadCharDataSuccess: () => {
          setHasDataError(false);
          setIsLoading(false);
          // Auto-play the first time when switched to learn mode
          if (!isQuizMode && writer) {
            setTimeout(() => {
              writer.animateCharacter();
            }, 300);
          } else if (isQuizMode && writer) {
            startQuiz(writer);
          }
        }
      });

      writerRef.current = writer;
    } catch (e) {
      console.error(e);
      setHasDataError(true);
      setIsLoading(false);
    }

    // Clean up instance on unmount
    return () => {
      if (writerRef.current) {
        writerRef.current.cancelQuiz();
      }
    };
  }, [char, showOutline, isQuizMode]);

  // Handle standard buttons
  const playAnimation = () => {
    if (writerRef.current && !isQuizMode && !hasDataError) {
      writerRef.current.animateCharacter();
    }
  };

  const loopAnimation = () => {
    if (writerRef.current && !isQuizMode && !hasDataError) {
      writerRef.current.animateCharacter();
    }
  };

  const nextStrokeStep = () => {
    if (writerRef.current && !isQuizMode && !hasDataError) {
      writerRef.current.animateStroke();
    }
  };

  // Start the interactive Quiz (practice) mode
  const startQuiz = (writer: any) => {
    if (!writer) return;
    setIsQuizCompleted(false);
    writer.cancelQuiz();
    
    writer.quiz({
      onCorrectStroke: (strokeData: any) => {
        const current = strokeData.strokeNum + 1;
        const total = strokeData.totalStrokes;
        setQuizProgress({ correct: current, total });
        setQuizFeedback(`第 ${current} 笔写对啦！横平竖直，起笔有神 ✨`);
      },
      onWrongStroke: (strokeData: any) => {
        const total = strokeData.totalStrokes;
        const current = strokeData.strokeNum;
        setQuizProgress({ correct: current, total });
        setQuizFeedback("笔画走偏或顺规不对，莫急，请看朱砂红线，重写那一笔 💡");
      },
      onComplete: (summary: any) => {
        setIsQuizCompleted(true);
        setShowInkSplash(true);
        setTimeout(() => setShowInkSplash(false), 1400); // clear splash after play is done
        setQuizFeedback(`🎉 妙笔生花！你已熟练通晓此字的标准笔顺！`);
      }
    });
  };

  const handleResetQuiz = () => {
    if (writerRef.current && isQuizMode) {
      setIsQuizCompleted(false);
      setQuizProgress(null);
      setQuizFeedback("重练开篇！请平心静气写第一笔。");
      startQuiz(writerRef.current);
    }
  };

  const toggleQuizMode = () => {
    setIsQuizMode(!isQuizMode);
  };

  const handleSpeak = () => {
    speakMandarin(char, (errorMessage) => {
      setQuizFeedback(errorMessage);
    });
  };

  const pinyin = PINYIN_MAP[char] || "";

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-[#FCFAF5] rounded-3xl border-2 border-[#E6DEC9] shadow-md items-stretch text-[#4A443F] relative overflow-hidden antique-border">
      {/* Visual Stroke Area Panel */}
      <div className="flex-1 flex flex-col items-center justify-between min-h-[360px] relative z-10">
        {/* Title, Pronunciation Header */}
        <div className="text-center w-full mb-3">
          <div className="inline-flex items-center gap-1.5 bg-[#EAF3FA] text-[#3E6D9C] text-xs px-3.5 py-1 rounded-full font-serif font-extrabold mb-2 border border-[#BBD5E8] tracking-widest uppercase">
            笔法演示台 · {isQuizMode ? "朱砂金石练习" : "正楷水墨标准"}
          </div>
          <h2 className="text-4xl font-serif font-extrabold text-[#4A443F] flex items-center justify-center gap-3 mt-1.5 select-none">
            <span 
              onClick={handleSpeak}
              title="点击播放普通话发音"
              className="relative drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] cursor-pointer hover:text-[#B83B26] active:scale-95 transition-all"
            >
              {char}
              {pinyin && (
                <span className="absolute -top-7.5 left-1/2 -translate-x-1/2 text-xs font-serif font-bold text-[#C98A4A] py-0.5 px-2 bg-[#FCF8EC] rounded-md border border-[#F2DCC4] tracking-widest whitespace-nowrap shadow-xs hover:text-[#B83B26] transition-colors">
                  {pinyin}
                </span>
              )}
            </span>
            <button
              onClick={handleSpeak}
              title="朗读普通话发音"
              className="ml-2 text-[#C98A4A] hover:text-[#B83B26] p-1.5 rounded-full bg-[#FAF6EB] hover:bg-[#F3EFE0] border border-[#F2DCC4] active:scale-90 transition-all shadow-2xs cursor-pointer flex items-center justify-center"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </h2>
        </div>

        {/* The Core HanziWriter DOM mount target - Upgraded with premium rice paper tone, double scroll line, and celadon gridlines */}
        <div className="relative my-4 flex items-center justify-center p-4 rounded-2xl bg-[#FAF6EB] border-2 border-[#DCD3B6] shadow-inner overflow-hidden select-none">
          {/* Xuan paper mineral grain simulation inside writing container */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
            backgroundImage: "radial-gradient(#C98A4A 0.5px, transparent 0.5px)",
            backgroundSize: "6px 6px"
          }} />

          {/* Twin scholastic scroll borders (双线书卷边框) */}
          <div className="absolute inset-2 border border-[#C98A4A]/25 pointer-events-none rounded-xl z-0" />
          <div className="absolute inset-3 border border-double border-[#6A8F7A]/15 pointer-events-none rounded-lg z-0" />

          {/* Scholastic cloud emblems in four corners at 20% opacity */}
          <div className="absolute top-4 left-4 text-[#C98A4A]/25 font-serif text-[11px] select-none pointer-events-none z-0">✥</div>
          <div className="absolute top-4 right-4 text-[#C98A4A]/25 font-serif text-[11px] select-none pointer-events-none z-0">✥</div>
          <div className="absolute bottom-4 left-4 text-[#C98A4A]/25 font-serif text-[11px] select-none pointer-events-none z-0">✥</div>
          <div className="absolute bottom-4 right-4 text-[#C98A4A]/25 font-serif text-[11px] select-none pointer-events-none z-0">✥</div>

          {/* Calligraphy Gridlines (古雅松石青灰色田字格 mi-ji-grid with highly precise fine alignments) */}
          {showGrid && (
            <div className="absolute inset-0 w-[220px] h-[220px] mx-auto my-auto border-2 border-[#6A8F7A]/30 rounded-md pointer-events-none z-0">
              {/* Vertical center axis line in slate/celadon gray */}
              <div className="absolute inset-y-0 left-1/2 w-0 border-l border-dashed border-[#6A8F7A]/35" />
              {/* Horizontal center axis line */}
              <div className="absolute inset-x-0 top-1/2 h-0 border-t border-dashed border-[#6A8F7A]/35" />
              {/* Diagonal visual helper lines at 12% opacity */}
              <div className="absolute inset-0 border-l border-t border-dashed border-[#6A8F7A]/12 rotate-45 scale-[1.414]" />
              <div className="absolute inset-0 border-l border-t border-dashed border-[#6A8F7A]/12 -rotate-45 scale-[1.414]" />
              {/* Circle helper watermark inside grid paper */}
              <div className="absolute inset-6 rounded-full border border-dashed border-[#6A8F7A]/8" />
            </div>
          )}

          {/* Mount Div */}
          <div 
            ref={containerRef} 
            className="w-[220px] h-[220px] bg-transparent rounded-lg relative z-10"
          />

          {/* Ink Ripple completing splash */}
          {showInkSplash && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="w-[120px] h-[120px] rounded-full bg-[#2C3E50]/15 animate-ink-ripple" />
              <div className="absolute w-[60px] h-[60px] rounded-full bg-[#3E6D9C]/25 animate-ink-ripple [animation-delay:0.2s]" />
            </div>
          )}

          {/* Seal Stamp dropped award stamp */}
          {isQuizCompleted && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 bg-[#2C3E50]/5 backdrop-blur-[0.5px]">
              <div className="stamp-seal-active text-center px-5 py-3 font-serif bg-[#FCFAF5] rounded-xl border border-[#B83B26] tracking-widest flex flex-col items-center justify-center animate-stamp-drop shadow-lg">
                <span className="text-[9px] uppercase tracking-widest font-sans text-[#B83B26]/75 font-semibold">书院 · 学成</span>
                <span className="text-base font-black font-serif text-[#B83B26] mt-0.5">✓ 笔墨入骨</span>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#FAF8F2]/90 z-20 rounded-lg">
              <span className="text-xs text-[#A69F92] font-serif tracking-widest animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#3E6D9C] rounded-full animate-ping" />
                墨宝裁切载入中...
              </span>
            </div>
          )}

          {hasDataError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 p-4 text-center z-30 rounded-lg border border-red-100">
              <AlertCircle className="w-8 h-8 text-[#C98A4A] mb-2" />
              <p className="text-xs font-serif font-bold text-[#4A443F]">该字暂未配齐标准动画</p>
              <p className="text-[10px] text-[#A69F92] mt-1 font-sans">塾师正在快马加鞭描摹中</p>
            </div>
          )}
        </div>

        {/* Feedback text bubble */}
        <div className="w-full text-center px-4 py-3 bg-[#FCFAF2] rounded-xl border border-[#E6DEC9] min-h-[52px] flex items-center justify-center shadow-inner">
          <p className="text-xs font-serif text-[#6D675B] font-medium leading-relaxed">
            {hasDataError ? "请选择其它生字进行印谱摹写" : quizFeedback}
          </p>
        </div>
      </div>

      {/* Control Buttons Panel */}
      <div className="w-full md:w-[220px] shrink-0 border-t md:border-t-0 md:border-l border-[#E6DEC9] pt-5 md:pt-0 md:pl-5 flex flex-col justify-between gap-4 relative z-10">
        {/* Toggle Mode Control */}
        <div className="bg-[#FAF8F3] p-2.5 rounded-xl border border-[#E6DEC9] shadow-inner">
          <label className="text-[11px] font-bold text-[#A69F92] tracking-widest block mb-2 px-1 font-serif">
            书塾研习模式
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setIsQuizMode(false)}
              className={`py-1.5 px-2 text-xs font-serif font-bold rounded-xl transition-all cursor-pointer transform hover:scale-102 hover:-translate-y-0.5 active:scale-98 duration-300 ${
                !isQuizMode
                  ? "bg-[#3E6D9C] text-white shadow-md border-b-2 border-sky-800"
                  : "bg-white border border-[#E6DEC9] text-[#4A443F] hover:bg-[#FDFCF0]"
              }`}
            >
              观摩学习
            </button>
            <button
              onClick={() => setIsQuizMode(true)}
              disabled={hasDataError}
              className={`py-1.5 px-2 text-xs font-serif font-bold rounded-xl transition-all cursor-pointer transform hover:scale-102 hover:-translate-y-0.5 active:scale-98 disabled:opacity-40 duration-300 ${
                isQuizMode
                  ? "bg-[#3E6D9C] text-white shadow-md border-b-2 border-sky-800"
                  : "bg-white border border-[#E6DEC9] text-[#4A443F] hover:bg-[#FDFCF0]"
              }`}
            >
              同步练习
            </button>
          </div>
        </div>

        {/* Display Settings Switches */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[#A69F92] tracking-widest block px-1 font-serif">
            临摹辅助选项
          </span>
          
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`w-full py-2 px-3 text-xs font-medium rounded-xl border flex items-center justify-between transition-all cursor-pointer transform hover:scale-102 hover:-translate-y-0.5 active:scale-98 duration-300 ${
              showGrid
                ? "bg-[#EAF3FA] border-[#3E6D9C]/50 text-[#2C5278] font-bold shadow-xs"
                : "bg-white border-[#E6DEC9] text-[#6D675B] hover:bg-[#FCFAF5]"
            }`}
          >
            <span className="font-serif">古雅田字格</span>
            <span>{showGrid ? "常开" : "隐去"}</span>
          </button>

          <button
            onClick={() => setShowOutline(!showOutline)}
            disabled={isQuizMode}
            className={`w-full py-2 px-3 text-xs font-medium rounded-xl border flex items-center justify-between transition-all cursor-pointer disabled:opacity-45 transform hover:scale-102 hover:-translate-y-0.5 active:scale-98 duration-300 ${
              showOutline
                ? "bg-[#EAF3FA] border-[#3E6D9C]/50 text-[#2C5278] font-bold shadow-xs"
                : "bg-white border-[#E6DEC9] text-[#6D675B] hover:bg-[#FCFAF5]"
            }`}
          >
            <span className="font-serif">字骨轮廓</span>
            <span>{showOutline ? "展露" : "匿影"}</span>
          </button>
        </div>

        {/* Contextual control action elements */}
        <div className="pt-2 border-t border-[#E6DEC9] mt-auto">
          {!isQuizMode ? (
            /* LEARN CONTROL BUTTONS */
            <div className="space-y-2.5">
              <button
                onClick={playAnimation}
                disabled={isLoading || hasDataError}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-serif font-bold bg-[#3E6D9C] hover:bg-[#2C5278] text-white rounded-xl shadow-md cursor-pointer transition-all transform hover:scale-102 hover:-translate-y-0.5 active:scale-98 duration-300"
              >
                <Play className="w-3.5 h-3.5 fill-white/10" />
                播放笔顺
              </button>
              
              <button
                onClick={loopAnimation}
                disabled={isLoading || hasDataError}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-serif font-bold bg-[#6A8F7A] hover:bg-[#52735F] text-white rounded-xl shadow-sm transition-all transform hover:scale-102 hover:-translate-y-0.5 active:scale-98 duration-300 border-none cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-white" />
                重新播放
              </button>

              <button
                onClick={nextStrokeStep}
                disabled={isLoading || hasDataError}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-serif font-bold bg-[#C98A4A] hover:bg-[#A8723B] text-white rounded-xl shadow-sm transition-all transform hover:scale-102 hover:-translate-y-0.5 active:scale-98 duration-300 border-none cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5 text-white" />
                逐笔拆解 (下一步)
              </button>
            </div>
          ) : (
            /* QUIZ / PRACTICE CONTROL BUTTONS */
            <div className="space-y-2.5">
              <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E6DEC9] text-center shadow-inner">
                <span className="text-[10px] uppercase font-serif tracking-widest font-bold text-[#A69F92] block">
                  画卷进度
                </span>
                <span className="text-xl font-bold font-serif text-[#3E6D9C]">
                  {quizProgress ? `${quizProgress.correct} / ${quizProgress.total}` : "未落笔"}
                </span>
                <span className="text-[10px] text-[#8C8473] block mt-1 leading-relaxed">
                  请按印迹运笔，错漏之处将红印指正。
                </span>
              </div>

              <button
                onClick={handleResetQuiz}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-serif font-bold bg-[#6A8F7A] hover:bg-[#52735F] text-white rounded-xl shadow-sm transition-all transform hover:scale-102 hover:-translate-y-0.5 active:scale-98 duration-300 disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                重练此字 / 清除笔墨
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
