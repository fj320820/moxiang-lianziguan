/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  BookmarkCheck, 
  CheckCircle2, 
  GraduationCap 
} from "lucide-react";
import { GRADE5_CHAR_PAGES, PINYIN_MAP } from "./charactersData";
import HandwritingCanvas from "./components/HandwritingCanvas";
import StrokeWriter from "./components/StrokeWriter";
import { speakMandarin } from "./components/PronunciationHelper";

export default function App() {
  // Current active page ID (default: 'P01')
  const [currentPageId, setCurrentPageId] = useState("P01");
  
  // Find current page item
  const currentPage = GRADE5_CHAR_PAGES.find((p) => p.id === currentPageId) || GRADE5_CHAR_PAGES[0];
  
  // Selected single character (default to the first char of the current page, e.g. "昼" for P01)
  const [selectedChar, setSelectedChar] = useState<string>(currentPage.characters[0] || "昼");

  // Keep track of characters that the user has successfully practiced (completed a quiz!)
  const [completedChars, setCompletedChars] = useState<Record<string, boolean>>({});

  // When parent page is changed, update active char to first char of the target list
  const handlePageChange = (pageId: string) => {
    setCurrentPageId(pageId);
    const targetPage = GRADE5_CHAR_PAGES.find((p) => p.id === pageId);
    if (targetPage && targetPage.characters.length > 0) {
      setSelectedChar(targetPage.characters[0]);
    }
  };

  const selectPreviousPage = () => {
    const currentIndex = GRADE5_CHAR_PAGES.findIndex((p) => p.id === currentPageId);
    if (currentIndex > 0) {
      const prevPage = GRADE5_CHAR_PAGES[currentIndex - 1];
      handlePageChange(prevPage.id);
    }
  };

  const selectNextPage = () => {
    const currentIndex = GRADE5_CHAR_PAGES.findIndex((p) => p.id === currentPageId);
    if (currentIndex < GRADE5_CHAR_PAGES.length - 1) {
      const nextPage = GRADE5_CHAR_PAGES[currentIndex + 1];
      handlePageChange(nextPage.id);
    }
  };

  // Callback from Handwriting recognition or list click to change characters
  const handleSelectChar = (char: string) => {
    if (char && char.length > 0) {
      const selected = char.charAt(0);
      setSelectedChar(selected); // Only pick the first character
      speakMandarin(selected);
    }
  };

  // Add character to standard completion achievements list
  const markCharAsMastered = (char: string) => {
    setCompletedChars((prev) => ({
      ...prev,
      [char]: true
    }));
  };

  const masteredCount = Object.keys(completedChars).length;
  
  let currentScholarRank = "书塾新生";
  let rankColor = "bg-[#7c725a] text-white";
  let rankProgressLabel = "初开笔墨，静气临摹";
  if (masteredCount > 0 && masteredCount <= 10) {
    currentScholarRank = "墨香书童";
    rankColor = "bg-[#6A8F7A] text-white";
    rankProgressLabel = "塾生入门，勤学笃行";
  } else if (masteredCount > 10 && masteredCount <= 30) {
    currentScholarRank = "博雅秀才";
    rankColor = "bg-[#3E6D9C] text-[#FAF8F2]";
    rankProgressLabel = "字字珠玑，书墨有神";
  } else if (masteredCount > 30 && masteredCount <= 75) {
    currentScholarRank = "贡院举人";
    rankColor = "bg-[#C98A4A] text-[#FCFAF2]";
    rankProgressLabel = "笔力刚健，浑厚古雅";
  } else if (masteredCount > 75) {
    currentScholarRank = "金殿进士";
    rankColor = "bg-[#B83B26] text-white animate-pulse";
    rankProgressLabel = "笔精墨妙，自成一派";
  }

  const studyMottos = [
    "书山有路勤为径，学海无涯苦作舟。——《增广贤文》",
    "学而时习之，不亦说乎？——《论语·学记》",
    "温故而知新，可以为师矣。——《论语·为政》",
    "敏而好学，不耻下问。——《论语·公冶长》",
    "业精于勤，荒于嬉；行成于思，毁于随。——韩愈",
    "玉不琢，不成器；人不学，不知道。——《礼记·学记》"
  ];
  const mottoIndex = (selectedChar.charCodeAt(0) || 0) % studyMottos.length;
  const currentQuote = studyMottos[mottoIndex];

  return (
    <div className="min-h-screen bg-xuan-paper text-[#4A443F] pb-12 transition-all">
      {/* Visual Top Decorative Accent Strip (Qinghua and Cinnabar Gradient) */}
      <div className="h-2 bg-gradient-to-r from-[#3E6D9C] via-[#6A8F7A] to-[#C98A4A]" />

      {/* Main Container Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* APP CORE HEADER BANNER - Upgraded to a grand scholarly lacquer plaque (书院门匾视觉) */}
        <header className="py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 border-b-4 border-[#C98A4A] mb-10 bg-[#1F2F3D] text-white -mx-4 px-8 sm:-mx-6 sm:px-10 rounded-b-[2rem] shadow-xl relative overflow-hidden">
          
          {/* Decorative Palace Museum SVGs: Mountains, bamboo, clouds & wet ink splatters (远山、竹树、祥云、墨迹 at 4%~5% opacity) */}
          <div className="absolute inset-0 opacity-5 pointer-events-none select-none z-0">
            <svg className="w-full h-full text-[#FAF8F2]" viewBox="0 0 1000 240" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              {/* Far mountains (远山轮廓) */}
              <path d="M-50 240 C150 110, 200 150, 420 240" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" />
              <path d="M220 240 C380 90, 480 140, 720 240" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M520 240 C680 130, 780 150, 1050 240" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              
              {/* Bamboo silhouettes (竹叶竹枝) */}
              <path d="M80 240 L110 90 M110 90 L125 15" stroke="currentColor" strokeWidth="1.0" />
              <path d="M85 160 C105 150, 115 145, 130 155" stroke="currentColor" strokeWidth="0.8" />
              <path d="M98 115 C118 108, 130 98, 142 115" stroke="currentColor" strokeWidth="0.8" />
              <path d="M130 155 C138 152, 148 156, 145 161 C133 164, 128 159, 130 155 Z" fill="currentColor" />
              <path d="M142 115 C150 112, 160 116, 157 121 C145 124, 140 119, 142 115 Z" fill="currentColor" />

              {/* Classic scroll clouds (祥云水纹) */}
              <path d="M220 70 C240 62, 255 72, 250 82 C245 88, 230 82, 220 78" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" />
              <path d="M205 74 C188 80, 198 90, 212 90" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" />
              <path d="M870 70 C890 62, 905 72, 900 82 C895 88, 880 82, 870 78" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" />
              <path d="M855 74 C838 80, 848 90, 862 90" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" />

              {/* Wet ink splashes (水墨印渍) */}
              <ellipse cx="480" cy="80" rx="45" ry="25" fill="currentColor" filter="blur(6px)" />
              <ellipse cx="505" cy="95" rx="28" ry="16" fill="currentColor" filter="blur(4px)" />
              <circle cx="150" cy="50" r="12" fill="currentColor" filter="blur(2px)" />
              <circle cx="820" cy="180" r="18" fill="currentColor" filter="blur(3px)" />
            </svg>
          </div>

          {/* Golden double-frame lacquer trim (金边漆饰) */}
          <div className="absolute inset-2 border-2 border-[#C98A4A]/30 rounded-2xl pointer-events-none select-none z-0" />
          <div className="absolute inset-3 border border-double border-[#C98A4A]/10 rounded-xl pointer-events-none select-none z-0" />

          {/* Big plaque title with children-friendly alignment */}
          <div className="flex items-center gap-4.5 md:gap-5 relative z-10 w-full md:w-auto">
            <div className="w-15 h-15 rounded-2xl bg-white/95 flex items-center justify-center text-[#B83B26] shadow-xl font-serif font-black text-4xl shrink-0 border-2 border-[#C98A4A]">
              墨
            </div>
            <div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <h1 id="app-title" className="font-serif font-black text-4xl tracking-[0.3em] text-[#FAF8F2] drop-shadow-[0_2.5px_4px_rgba(0,0,0,0.3)] leading-none">
                    墨香练字馆
                  </h1>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-sans font-bold text-xs tracking-[0.2em] text-[#D0E2EE] uppercase opacity-95">
                    汉字笔顺大师
                  </h2>
                  <span className="h-3 w-[1.5px] bg-[#E9F1F7]/30 hidden sm:block" />
                  <span className="bg-[#B83B26] text-[#FAF8F2] px-3 py-0.5 rounded-md text-[10px] font-bold font-serif shadow-md tracking-widest border border-[#FCFAF2]/30">
                    五年级下册写字训练
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* School enrollment / Hanging Boxwood Bookmark (书院考功铭木牌 / 悬穗书签) */}
          <div className="flex items-center gap-3.5 bg-gradient-to-b from-[#F7ECD2] to-[#E2D2A4] py-3.5 px-5.5 rounded-2xl self-stretch md:self-auto shrink-0 justify-between border-2 border-[#C98A4A]/50 shadow-lg relative z-10 text-[#4D3A1B]">
            {/* Tassel Red Cord hook decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[14px] flex flex-col items-center pointer-events-none select-none">
              <div className="w-1.5 h-4 bg-[#B83B26] rounded-t-full shadow-xs" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#B83B26] border border-white flex items-center justify-center text-[5px] text-white leading-none">💮</div>
            </div>

            <div className="flex items-center gap-3.5">
              <GraduationCap className="w-7 h-7 text-[#B83B26]" />
              <div>
                <div className="text-[10px] font-black text-[#5C4524] tracking-widest font-serif leading-none uppercase">
                  书院学籍簿 · 功修记印
                </div>
                <div className="text-xs font-serif mt-2 flex items-center gap-1.5">
                  <span className="font-medium text-[#7A6038]">掌握度：</span>
                  <span className="font-mono text-lg font-black text-[#B83B26]">{masteredCount}</span>
                  <span className="text-[11px] text-[#7A6038]">/ 180 字</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 border-l border-[#C98A4A]/30 pl-4.5 ml-1">
              <span className={`text-[10px] font-serif font-black px-2 py-0.5 rounded-md ${rankColor} shadow-xs tracking-wider`}>
                {currentScholarRank}
              </span>
              {masteredCount > 0 && (
                <button
                  onClick={() => setCompletedChars({})}
                  className="text-[9.5px] text-[#B83B26] hover:text-[#8C1B0A] font-serif underline tracking-wide hover:scale-105 active:scale-95 transition-transform cursor-pointer font-bold pb-0.5 leading-none animate-pulse"
                >
                  重修文脉
                </button>
              )}
            </div>
          </div>
        </header>

        {/* PAGINATION SWITCHER (Open Book / Academy Directory Theme) */}
        <section className="bg-[#FCFAF5] rounded-3xl border-2 border-[#E6DEC9] p-6 shadow-md mb-8 flex flex-col gap-4 text-[#4A443F] relative overflow-hidden antique-border animate-char-fade">
          {/* Decorative book pages binding thread watermark */}
          <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-[0.03] bg-[radial-gradient(#C98A4A_1.5px,transparent_1.5px)] [background-size:16px_16px]" style={{ transform: "rotate(15deg)" }} />
          {/* Subtle Key-motif corners (回纹) at 3% opacity inside directory */}
          <div className="absolute inset-2 pointer-events-none border border-[#C98A4A]/10 rounded-2xl" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-double border-[#E6DEC9] pb-4.5 relative z-10 w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5.5 h-5.5 text-[#3E6D9C] fill-[#3E6D9C]/10" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h2 className="font-serif font-black text-[#4A443F] text-base tracking-[0.15em]">
                  《写字表目录》
                </h2>
                <span className="text-[10px] sm:text-xs font-serif text-[#6D675B] font-bold bg-[#FAF3EB] px-3.5 py-0.5 rounded-full border border-[#F2DCC4] whitespace-nowrap shadow-inner">
                  五年级下册 · 精选 180 字 / 18 页
                </span>
              </div>
            </div>
            
            {/* Quick paging controls */}
            <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
              <button
                onClick={selectPreviousPage}
                disabled={currentPageId === (GRADE5_CHAR_PAGES[0]?.id || "P01")}
                className="flex items-center justify-center h-9 px-4 rounded-xl bg-white border-2 border-[#E6DEC9] hover:bg-[#FAF8F3] hover:border-[#3E6D9C]/60 disabled:opacity-40 transition-all cursor-pointer text-xs font-serif font-black text-[#4A443F] shadow-sm transform hover:scale-102 active:scale-95 duration-200"
              >
                <ChevronLeft className="w-4 h-4 text-[#4A443F] mr-0.5 stroke-[2.5]" />
                <span>上卷一页</span>
              </button>

              <div className="text-xs font-black text-[#3E6D9C] font-serif px-4 py-1.5 bg-[#EAF3FA] rounded-xl border-2 border-[#BBD5E8] shadow-inner min-w-[76px] text-center tracking-widest">
                第 {parseInt(currentPageId.slice(1))} 页
              </div>

              <button
                onClick={selectNextPage}
                disabled={currentPageId === (GRADE5_CHAR_PAGES[GRADE5_CHAR_PAGES.length - 1]?.id || "P01")}
                className="flex items-center justify-center h-9 px-4 rounded-xl bg-white border-2 border-[#E6DEC9] hover:bg-[#FAF8F3] hover:border-[#3E6D9C]/60 disabled:opacity-40 transition-all cursor-pointer text-xs font-serif font-black text-[#4A443F] shadow-sm transform hover:scale-102 active:scale-95 duration-200"
              >
                <span>下卷一页</span>
                <ChevronRight className="w-4 h-4 text-[#4A443F] ml-0.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Book Catalog directory grid (P01-P18 listed in two neat rows) - Styled like an unfolded open list */}
          <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full relative z-10 py-1">
            
            {/* Row 1: P01 - P09 */}
            <div className="flex flex-col gap-2">
              <div className="text-[10px] text-[#A69F92] font-serif font-black tracking-widest text-center border-b border-[#E6DEC9]/40 pb-1.5 flex items-center justify-center gap-1.5">
                <span className="text-[#3E6D9C]">☯</span> 
                <span>上卷目录 · 初学十五（页P01 - P09）</span>
                <span className="text-[#3E6D9C]">☯</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-2.5 md:gap-3.5 justify-center">
                {GRADE5_CHAR_PAGES.slice(0, 9).map((page) => {
                  const isCurrent = currentPageId === page.id;
                  return (
                    <button
                      key={page.id}
                      onClick={() => handlePageChange(page.id)}
                      title={page.name}
                      className={`py-2 px-1 text-xs font-serif font-extrabold rounded-xl transition-all cursor-pointer shadow-sm border-2 text-center transform hover:scale-[1.08] hover:-translate-y-0.5 active:scale-95 duration-300 ${
                        isCurrent
                          ? "bg-[#3E6D9C] border-[#204E74] text-white shadow-md scale-105"
                          : "bg-white border-[#E6DEC9] text-[#4A443F] hover:bg-[#FCFAF5]"
                      }`}
                    >
                      {page.id}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subtle paper gap divide with central decorative text */}
            <div className="flex items-center justify-center py-2 select-none">
              <div className="h-[1.5px] bg-gradient-to-r from-transparent via-[#DCD3B6] to-transparent w-full" />
              <div className="mx-5 text-[10px] font-black text-[#A69F92] tracking-[0.25em] font-serif whitespace-nowrap flex items-center gap-1">
                <span>❀</span>
                <span>翻卷折页</span>
                <span>❀</span>
              </div>
              <div className="h-[1.5px] bg-gradient-to-r from-transparent via-[#DCD3B6] to-transparent w-full" />
            </div>

            {/* Row 2: P10 - P18 */}
            <div className="flex flex-col gap-2">
              <div className="text-[10px] text-[#A69F92] font-serif font-black tracking-widest text-center border-b border-[#E6DEC9]/40 pb-1.5 flex items-center justify-center gap-1.5">
                <span className="text-[#C98A4A]">☯</span> 
                <span>下卷目录 · 精进十五（页P10 - P18）</span>
                <span className="text-[#C98A4A]">☯</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-2.5 md:gap-3.5 justify-center">
                {GRADE5_CHAR_PAGES.slice(9, 18).map((page) => {
                  const isCurrent = currentPageId === page.id;
                  return (
                    <button
                      key={page.id}
                      onClick={() => handlePageChange(page.id)}
                      title={page.name}
                      className={`py-2 px-1 text-xs font-serif font-extrabold rounded-xl transition-all cursor-pointer shadow-sm border-2 text-center transform hover:scale-[1.08] hover:-translate-y-0.5 active:scale-95 duration-300 ${
                        isCurrent
                          ? "bg-[#3E6D9C] border-[#204E74] text-white shadow-md scale-105"
                          : "bg-white border-[#E6DEC9] text-[#4A443F] hover:bg-[#FCFAF5]"
                      }`}
                    >
                      {page.id}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* WORKSPACE AREA AND GRID BLOCK */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT CONTAINER LAYER: HANDWRITING DRAWING AND RECOGNITION */}
          <div className="lg:col-span-4 flex flex-col gap-6 animate-char-fade">
            <HandwritingCanvas onSelectedChar={handleSelectChar} />

            {/* 新增：线装古雅修业名册 (SCHOLAR REGISTER WITH SEALS AND BOOK STITCHING EFFECT) */}
            <div className="p-6 bg-[#FCFAF5] rounded-3xl border-2 border-[#E6DEC9] shadow-md font-serif antique-border relative overflow-hidden flex">
              
              {/* Traditional Bound-Stitch spine effect (模拟线装书的书脊缝线) */}
              <div className="w-5 pr-3 mr-1 flex flex-col justify-between items-center border-r border-[#E6DEC9] select-none text-[8px] text-[#A69F92] tracking-normal pointer-events-none opacity-80">
                <div className="flex flex-col items-center gap-1">
                  <span>▣</span>
                  <div className="w-0.5 h-6 bg-[#A69F92] opacity-40 dotted-spine" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span>▣</span>
                  <div className="w-0.5 h-16 bg-[#A69F92] opacity-40 dotted-spine" />
                </div>
                <div className="flex flex-col items-center gap-1 flex-1 py-4">
                  <span className="writing-vertical font-sans scale-90 translate-y-2 opacity-50">天禄琅琊</span>
                  <div className="w-0.5 h-full bg-[#A69F92] opacity-40 dotted-spine min-h-[40px] mt-2" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-0.5 h-16 bg-[#A69F92] opacity-40 dotted-spine" />
                  <span>▣</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-0.5 h-6 bg-[#A69F92] opacity-40 dotted-spine" />
                  <span>▣</span>
                </div>
              </div>

              {/* Roster Main Ripped Page Column */}
              <div className="flex-1 min-w-0">
                <div className="absolute right-3 top-3 opacity-[0.03] pointer-events-none text-red-700 font-serif text-8xl">簿</div>
                
                <h3 className="font-serif font-black text-[#4A443F] text-sm tracking-widest flex items-center gap-2 mb-3 border-b-2 border-[#E6DEC9] pb-2">
                  <GraduationCap className="w-5 h-5 text-[#B83B26]" />
                  <span>塾生修业名册</span>
                </h3>

                <div className="space-y-4">
                  {/* Dynamic stats */}
                  <div className="bg-white/95 p-3 rounded-xl border border-[#E6DEC9] flex items-center justify-between shadow-xs transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-[0.03] border-4 border-[#3E6D9C] rounded-full" />
                    <div>
                      <span className="text-[9px] text-[#A69F92] block font-extrabold tracking-widest leading-none mb-1">修业学分数</span>
                      <span className="text-xs font-bold font-serif text-[#C98A4A] tracking-wider leading-none">
                        当前掌握：<span className="font-mono text-lg font-black text-[#B83B26]">{masteredCount}</span> / 180 生字
                      </span>
                    </div>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border shadow-2xs ${rankColor}`}>
                      {currentScholarRank}
                    </span>
                  </div>

                  {/* Progressive timeline list: Sutong -> Xiucai -> Juren -> Jinshi */}
                  <div className="border-t border-dashed border-[#E6DEC9] pt-3.5">
                    <span className="text-[10px] text-[#A69F92] font-extrabold tracking-widest block mb-2 px-0.5 leading-none">
                      功名进阶契印阶梯：
                    </span>
                    
                    <div className="space-y-2">
                      {/* Sutong */}
                      <div className={`p-2 rounded-lg border flex items-center justify-between text-xs transition-all ${
                        masteredCount <= 10 
                          ? "bg-[#6A8F7A]/5 border-[#6A8F7A]/40 text-[#5C7E6A] shadow-xs" 
                          : "bg-white/50 border-[#E6DEC9]/40 opacity-70 text-[#8C8473]"
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] px-1 font-bold bg-[#EAEAEA] rounded text-stone-600">阶一</span>
                          <span className="font-bold">墨香书童</span>
                          <span className="text-[10px] font-mono leading-none">(1-10字)</span>
                        </div>
                        {masteredCount <= 10 ? (
                          <span className="text-[9.5px] text-[#B83B26] font-black tracking-tighter shrink-0 border border-double border-[#B83B26]/60 rounded px-1 rotate-3 select-none">盖印中</span>
                        ) : (
                          <span className="text-[9px] text-[#6A8F7A] font-bold">已通关</span>
                        )}
                      </div>

                      {/* Xiucai */}
                      <div className={`p-2 rounded-lg border flex items-center justify-between text-xs transition-all ${
                        masteredCount > 10 && masteredCount <= 30
                          ? "bg-[#3E6D9C]/5 border-[#3E6D9C]/40 text-[#2C5278] shadow-xs animate-pulse-soft" 
                          : masteredCount > 30 
                            ? "bg-white/50 border-[#E6DEC9]/40 opacity-70 text-[#8C8473]"
                            : "bg-stone-50 border-stone-200/50 opacity-45 text-stone-400"
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] px-1 font-bold bg-[#EAEAEA] rounded text-stone-600">阶二</span>
                          <span className="font-bold">博雅秀才</span>
                          <span className="text-[10px] font-mono leading-none">(11-30字)</span>
                        </div>
                        {masteredCount > 10 && masteredCount <= 30 ? (
                          <span className="text-[9.5px] text-[#B83B26] font-black tracking-tighter shrink-0 border border-double border-[#B83B26]/60 rounded px-1 rotate-3 select-none">盖印中</span>
                        ) : masteredCount > 30 ? (
                          <span className="text-[9px] text-[#6A8F7A] font-bold">已通关</span>
                        ) : (
                          <span className="text-[9px] tracking-widest text-[#A69F92]/65">未抵达</span>
                        )}
                      </div>

                      {/* Juren */}
                      <div className={`p-2 rounded-lg border flex items-center justify-between text-xs transition-all ${
                        masteredCount > 30 && masteredCount <= 75
                          ? "bg-[#C98A4A]/5 border-[#C98A4A]/40 text-[#A8723B] shadow-xs" 
                          : masteredCount > 75 
                            ? "bg-white/50 border-[#E6DEC9]/40 opacity-70 text-[#8C8473]"
                            : "bg-stone-50 border-stone-200/50 opacity-45 text-stone-400"
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] px-1 font-bold bg-[#EAEAEA] rounded text-stone-600">阶三</span>
                          <span className="font-bold">贡院举人</span>
                          <span className="text-[10px] font-mono leading-none">(31-75字)</span>
                        </div>
                        {masteredCount > 30 && masteredCount <= 75 ? (
                          <span className="text-[9.5px] text-[#B83B26] font-black tracking-tighter shrink-0 border border-double border-[#B83B26]/60 rounded px-1 rotate-3 select-none">盖印中</span>
                        ) : masteredCount > 75 ? (
                          <span className="text-[9px] text-[#6A8F7A] font-bold">已通关</span>
                        ) : (
                          <span className="text-[9px] tracking-widest text-[#A69F92]/65">未抵达</span>
                        )}
                      </div>

                      {/* Jinshi */}
                      <div className={`p-2 rounded-lg border flex items-center justify-between text-xs transition-all ${
                        masteredCount > 75
                          ? "bg-[#B83B26]/5 border-[#B83B26]/40 text-[#9E2A1B] shadow-xs font-bold" 
                          : "bg-stone-50 border-stone-200/50 opacity-45 text-stone-400"
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] px-1 font-bold bg-[#EAEAEA] rounded text-stone-600">阶四</span>
                          <span className="font-bold">金殿进士</span>
                          <span className="text-[10px] font-mono leading-none">(76-180字)</span>
                        </div>
                        {masteredCount > 75 ? (
                          <span className="text-[9.5px] text-[#B83B26] font-black tracking-tighter shrink-0 border border-double border-[#B83B26]/60 rounded px-1 rotate-3 select-none">天子策盖印</span>
                        ) : (
                          <span className="text-[9px] tracking-widest text-[#A69F92]/65">未抵达</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACADEMIC INK STONE GUIDE CARD */}
            <div className="p-5 bg-[#FAF8F3]/80 rounded-3xl border-2 border-[#E6DEC9] shadow-inner font-serif antique-border relative overflow-hidden">
              <div className="absolute -right-2 -bottom-2 opacity-5 font-serif text-5xl">书</div>
              <h4 className="text-xs font-bold text-[#6A8F7A] flex items-center gap-1.5 mb-2 px-0.5">
                <HelpCircle className="w-4 h-4 text-[#6A8F7A]" />
                如何操作砚台手写临帖？
              </h4>
              <ol className="text-[11px] text-[#6D675B] space-y-1.5 list-decimal list-inside pl-0.5 leading-relaxed">
                <li>
                  于上方<b>“砚台砂格”</b>内，点按鼠标或触屏，勾勒笔划书写。
                </li>
                <li>
                  运笔罢，击按<b>“点击识别”</b>神识按钮。
                </li>
                <li>
                  识别候选印信现出后，<b>轻触对应汉字</b>，右侧水墨砚台瞬间开启该字标准国画笔法、顺规练习。
                </li>
                <li>
                  亦可使用手动<b>拼音或拼写检索</b>功能。
                </li>
              </ol>
            </div>
          </div>

          {/* RIGHT CONTAINER LAYER: CURRENT CHARACTERS SELECTOR GALLERY & MAIN STROKE WRITER BOARD */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* CURRENT ACTIVE PAGE'S CHARACTER LIST SELECTOR */}
            <section className="bg-[#FCFAF5] rounded-3xl border-2 border-[#E6DEC9] p-5.5 shadow-md text-[#4A443F] relative overflow-hidden antique-border">
              {/* Subtle watermark in background */}
              <div className="absolute -left-12 -bottom-10 w-24 h-24 pointer-events-none opacity-5 border-4 border-[#3E6D9C] rounded-full" />
              
              <div className="flex items-center justify-between mb-4 border-b border-[#E6DEC9] pb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <BookmarkCheck className="w-4.5 h-4.5 text-[#3E6D9C]" />
                  <h3 className="font-serif font-black text-[#4A443F] text-sm">
                    当页同步字帖生字库 ({currentPage.name})
                  </h3>
                </div>
                <span className="text-[10px] text-[#A69F92] font-serif">点击生字落印，即刻看墨宝动画</span>
              </div>

              {/* Tacitle Grid buttons for writing items - upgraded with transition animations */}
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2.5 relative z-10">
                {currentPage.characters.map((item) => {
                  const isActive = selectedChar === item;
                  const isMastered = completedChars[item];
                  return (
                    <button
                      key={item}
                      onClick={() => handleSelectChar(item)}
                      className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition-all duration-300 ease-out cursor-pointer relative select-none ${
                        isActive
                          ? "stamp-seal-active font-serif font-black scale-103 shadow-md text-[#B83B26]"
                          : "bg-white border border-[#E6DEC9] text-[#4A443F] hover:bg-[#FCFAF5] hover:scale-103 hover:-translate-y-1 hover:shadow-sm active:scale-95 duration-300"
                      }`}
                    >
                      {/* Dotted Rice grid details inside the mini preview */}
                      {!isActive && (
                        <span className="absolute inset-0 pointer-events-none opacity-20">
                          <span className="absolute inset-x-0 top-1/2 border-t border-[#A9C0CE] border-dashed" />
                          <span className="absolute inset-y-0 left-1/2 border-l border-[#A9C0CE] border-dashed" />
                        </span>
                      )}

                      {/* Character text */}
                      <span className={`font-serif font-extrabold text-xl md:text-2xl relative z-10 ${isActive ? "text-[#B83B26]" : "text-[#4A443F]"}`}>
                        {item}
                      </span>
                      {/* Pinyin label below character */}
                      <span className={`text-[9px] font-serif mt-0.5 leading-none ${isActive ? "text-[#B83B26]/80 font-bold" : "text-[#A69F92]"}`}>
                        {PINYIN_MAP[item] || ""}
                      </span>

                      {/* Seal stamp drop-down visual effect when mastered */}
                      {isMastered && (
                        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#B83B26] text-white font-serif text-[7.5px] font-black border border-white shadow-md flex items-center justify-center rotate-12 z-20 scale-105 pointer-events-none" style={{ textShadow: "0.5px 0.5px 0px rgba(0,0,0,0.2)" }}>
                          【已】
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* CORE INTERACTIVE STROKE ORDER BOARD */}
            <StrokeWriter char={selectedChar} />

            {/* QUICK TRAINING COMPLETION DECLARATION BANNER */}
            <div className="p-5 bg-[#FCF5EC] border-2 border-[#EAD5C5] rounded-3xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left transition-all shadow-sm relative overflow-hidden antique-border hover:shadow-xs">
              <div className="absolute right-0 top-0 opacity-5 font-serif text-6xl select-none">印</div>
              <div className="relative z-10">
                <h4 className="text-xs font-bold font-serif text-[#B83B26] flex items-center justify-center md:justify-start gap-1.5">
                  <BookmarkCheck className="w-4.5 h-4.5 text-[#B83B26]" />
                  授予通关印鉴功名 🎖️
                </h4>
                <p className="text-[11px] font-serif text-[#8C8473] mt-1 pr-2 leading-relaxed">
                  若在此练习中熟玩骨笔，笔走龙蛇，请击按右侧“授予印鉴”按钮，于印谱中盖上您的大红私印！
                </p>
              </div>
              <button
                onClick={() => {
                  markCharAsMastered(selectedChar);
                  // Premium tailored Chinese sound alarm animation / toast with stamp dropping visual
                  const notification = document.createElement("div");
                  notification.className = "fixed bottom-5 right-5 bg-[#B83B26] text-white text-xs font-serif font-bold px-4 py-3.5 rounded-xl shadow-2xl z-50 animate-stamp-drop border-2 border-[#FAF8F2] flex items-center gap-2";
                  notification.innerHTML = `
                    <span class="text-base">💮</span> 
                    <span>书塾捷报：【${selectedChar}】字功德圆满！朱砂印谱已加盖！</span>
                  `;
                  document.body.appendChild(notification);
                  setTimeout(() => notification.remove(), 2500);
                }}
                className="px-5 py-2.5 bg-[#C98A4A] hover:bg-[#A8723B] text-white text-xs font-serif font-extrabold rounded-xl shadow-md transition-all active:scale-95 duration-200 cursor-pointer max-w-[150px] mx-auto md:mx-0 shrink-0 border-b-2 border-amber-800"
              >
                学习完成，奖励勋章
              </button>
            </div>

          </div>
        </main>

        {/* BOTTOM ATTRIBUTION DETAIL (Notice Board of traditional Academy - 今日书院公告栏) */}
        <footer className="mt-14 text-center border-t border-[#E6DEC9] pt-6 flex flex-col items-center gap-4 bg-[#FAF8F3] p-6 rounded-3xl border-2 border-[#E6DEC9] shadow-inner font-serif antique-border">
          {/* Notice Board Header */}
          <div className="text-xs uppercase font-extrabold text-[#B83B26] tracking-widest border-b border-[#E6DEC9]/60 pb-2.5 w-full flex items-center justify-center gap-1.5">
            <span>💮</span> 今日习字与书院训言 <span>💮</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
            {/* 今日习字 Panel */}
            <div className="bg-white/60 p-4 rounded-2xl border border-[#E6DEC9]/50 flex flex-col gap-2">
              <span className="text-xs font-extrabold text-[#C98A4A] flex items-center gap-1">
                🌾 今日习字 (每日精选推荐)：
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {["昼", "耘", "桑", "晓"].map((char) => (
                  <button
                    key={char}
                    onClick={() => handleSelectChar(char)}
                    className="w-10 h-10 rounded-xl bg-white hover:bg-[#FCF5EC] hover:border-[#B83B26]/80 text-[#4A443F] hover:text-[#B83B26] border border-[#E6DEC9] font-black text-lg cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-xs flex items-center justify-center duration-300"
                  >
                    {char}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-[#8C8473] mt-1 leading-relaxed">
                温馨指示：塾师今日荐此四枚金石好字。书生宜在“写字表目录”第 1 页挑选演练，笔耕不辍，自成一家。
              </p>
            </div>

            {/* School Motto Section */}
            <div className="bg-white/60 p-4 rounded-2xl border border-[#E6DEC9]/50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold text-[#6A8F7A] flex items-center gap-1">
                  🏮 书院学规诫勉：
                </span>
                <p className="text-[11px] text-[#6D675B] mt-1.5 leading-relaxed tracking-wide font-medium">
                  书山有路勤为径，学海无涯苦作舟。诸书童当用心书写正楷标准国标笔画，多习“笔法演示台”中之运笔要领。
                </p>
              </div>
              <div className="text-[9px] text-[#A69F92] text-right mt-2 font-mono">
                修身戒浮 ‖ 笔画标准 ‖ 二零二六春修
              </div>
            </div>
          </div>

          <div className="text-center pt-2.5 w-full border-t border-[#E6DEC9]/60 flex flex-col gap-1 items-center">
            <p className="text-[11px] text-[#6D675B] font-serif font-bold tracking-widest uppercase">
              墨香练字馆 —— 汉字笔顺大师
            </p>
            <p className="text-[9px] text-[#A69F92]">
              书院修业规程核定 ‖ 官方标准 Hanzi Writer 与砚砂临摹高精度识别支持
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
