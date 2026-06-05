/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { Sparkles, Trash2, Keyboard, Search } from "lucide-react";

interface HandwritingCanvasProps {
  onSelectedChar: (char: string) => void;
}

export default function HandwritingCanvas({ onSelectedChar }: HandwritingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [manualChar, setManualChar] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set high-DPI canvas size matching layout client rect
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.scale(2, 2);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#2C3E50"; // 徽州墨色 - Deep elegant Chinese ink
    context.lineWidth = 6;
    contextRef.current = context;

    // Draw helper background lines (Rice Grid / 米字格)
    drawBackgroundLines(context, rect.width, rect.height);
  }, []);

  const drawBackgroundLines = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    // Clear first with clean cozy sandstone cream background
    ctx.fillStyle = "#FCFAF2";
    ctx.fillRect(0, 0, width, height);

    // Draw borders
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#E6DEC9"; // soft sandstone contour line
    ctx.strokeRect(1, 1, width - 2, height - 2);

    // Draw center cross dotted lines
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(62, 109, 156, 0.25)"; // soft Qinghua Blue lines

    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Vertical line
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Diagonal lines
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width, 0);
    ctx.lineTo(0, height);
    ctx.stroke();

    ctx.restore();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    if (!coords) return;

    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(coords.x, coords.y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCoordinates(e);
    if (!coords) return;

    if (contextRef.current) {
      contextRef.current.lineTo(coords.x, coords.y);
      contextRef.current.stroke();
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;
    const rect = canvas.getBoundingClientRect();
    
    contextRef.current.clearRect(0, 0, rect.width, rect.height);
    drawBackgroundLines(contextRef.current, rect.width, rect.height);
    setCandidates([]);
    setErrorText(null);
  };

  const recognizeHandwriting = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsRecognizing(true);
    setErrorText(null);

    try {
      // Export canvas containing strokes to base64 jpeg/png
      const imageUrl = canvas.toDataURL("image/png");

      const response = await fetch("/api/recognize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageUrl }),
      });

      if (!response.ok) {
        throw new Error("识别服务返回错误");
      }

      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        setCandidates(data.candidates);
      } else {
        setErrorText("未识别出文字，请换个姿势书写或手动输入哦");
      }
    } catch (err: any) {
      console.error(err);
      setErrorText("网络连接不畅，请使用下方的键盘手动输入哦。");
    } finally {
      setIsRecognizing(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = manualChar.trim();
    if (!trimmed) return;
    // Just select the first character entered
    const firstChar = trimmed.charAt(0);
    onSelectedChar(firstChar);
    setManualChar("");
  };

  return (
    <div className="flex flex-col gap-4 p-5 bg-[#FCFAF5] rounded-3xl border-2 border-[#E6DEC9] shadow-md text-[#4A443F] relative overflow-hidden antique-border">
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-bold text-[#4A443F] text-sm tracking-widest flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#C98A4A] fill-[#C98A4A]/25" />
          观摩临摹案 (手写识字)
        </h3>
        <span className="text-[10px] text-[#A69F92] font-serif tracking-tight">触屏/鼠标皆可行笔</span>
      </div>

      {/* Drawing Area Container */}
      <div className="relative w-full aspect-square max-w-[260px] mx-auto overflow-hidden rounded-2xl bg-[#FCFAF2] border border-[#E6DEC9] shadow-inner">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full cursor-crosshair touch-none"
        />

        {isRecognizing && (
          <div className="absolute inset-0 bg-[#FAF8F2]/95 flex flex-col items-center justify-center gap-2.5 p-4 text-center">
            {/* Playful traditional styled bounce loaders */}
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#3E6D9C] animate-bounce delay-100" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#C98A4A] animate-bounce delay-200" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#6A8F7A] animate-bounce delay-300" />
            </div>
            <p className="text-xs font-serif text-[#4A443F] font-bold animate-pulse">
              塾师正借烛台详辨墨痕...
            </p>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-3 max-w-[260px] mx-auto w-full">
        <button
          onClick={clearCanvas}
          type="button"
          className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-serif font-bold text-[#4A443F] bg-white border border-[#E6DEC9] hover:bg-[#FAF8F3] active:scale-95 transition-all rounded-xl cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5 text-[#8C8473]" />
          清除笔迹
        </button>
        <button
          onClick={recognizeHandwriting}
          disabled={isRecognizing}
          type="button"
          className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-serif font-bold text-white bg-[#C98A4A] hover:bg-[#A8723B] shadow-sm active:scale-95 disabled:opacity-50 transition-all rounded-xl cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 fill-white/10" />
          点击识别
        </button>
      </div>

      {/* Candidate Display */}
      {candidates.length > 0 && (
        <div className="p-3 bg-[#FCF8EC] rounded-2xl border border-[#F2DCC4] text-center max-w-[260px] mx-auto w-full">
          <div className="text-[11px] font-serif font-bold text-[#C98A4A] mb-1.5 tracking-wider">
            识别出似有以下墨宝，点击入选：
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {candidates.map((char) => (
              <button
                key={char}
                onClick={() => onSelectedChar(char)}
                className="w-10 h-10 rounded-xl border border-[#F2DCC4] bg-white hover:bg-[#FAF3EB] hover:border-[#C98A4A]/50 active:scale-90 font-serif font-black text-xl text-[#B83B26] flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
              >
                {char}
                <span className="absolute bottom-0 right-0.5 text-[6px] text-[#B83B26]/30 font-serif select-none pointer-events-none">印</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {errorText && (
        <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-100 max-w-[260px] mx-auto w-full text-center">
          <p className="text-[11px] text-rose-600 font-serif font-semibold">{errorText}</p>
        </div>
      )}

      {/* Backup Manual Search Form */}
      <div className="border-t border-[#E6DEC9] pt-3.5 max-w-[260px] mx-auto w-full">
        <form onSubmit={handleManualSubmit} className="flex gap-1.5">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-2.5 flex items-center pr-3 pointer-events-none">
              <Keyboard className="w-3.5 h-3.5 text-[#A69F92]" />
            </span>
            <input
              type="text"
              maxLength={2}
              value={manualChar}
              onChange={(e) => setManualChar(e.target.value)}
              placeholder="手动输入任意汉字..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#E6DEC9] bg-[#FCFAF2] text-[#4A443F] placeholder-[#A69F92] focus:outline-none focus:border-[#3E6D9C] focus:bg-white transition-all font-serif font-medium"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl text-xs font-serif font-bold text-white bg-[#3E6D9C] hover:bg-[#2C5278] border border-transparent transition-all flex items-center gap-1 cursor-pointer shadow-xs"
          >
            <Search className="w-3.5 h-3.5" />
            检索
          </button>
        </form>
      </div>
    </div>
  );
}
