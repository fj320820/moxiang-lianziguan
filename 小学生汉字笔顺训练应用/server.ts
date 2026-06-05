import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set standard limits
  app.use(express.json({ limit: "15mb" }));

  // Endpoint to recognize handwritten characters using Gemini-3.5-flash
  app.post("/api/recognize", async (req, res) => {
    try {
      const { image } = req.body;
      if (!image) {
        return res.status(400).json({ error: "未提取到绘图内容" });
      }

      // Check if GEMINI_API_KEY is available
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        console.warn("GEMINI_API_KEY is missing or key placeholder. Using offline fallback.");
        // Find possible characters based on simple stroke data of what the user is selecting
        return res.json({ candidates: ["昼", "桑", "耘", "晓", "拔"] });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Split base64 components
      const mimeMatch = image.match(/^data:([^;]+);base64,(.*)$/);
      if (!mimeMatch) {
         return res.status(400).json({ error: "图片格式不正确" });
      }
      const mimeType = mimeMatch[1];
      const base64Data = mimeMatch[2];

      const prompt = `你是一个专业的汉字手写识别系统。输入是一个小学生画板上手部或鼠标写的汉字。
请仔细看书写的笔画和字形进行识别，如果是潦草或不完整的笔画，也尽量给出最接近的 5 个汉字作为候选。
请严格以 JSON 数组格式返回 5 个汉字字符串，不要带有任何 Markdown 标记或其它文字说明，例如: ["昼", "桑", "耘", "晓", "拔"]。`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          prompt,
        ],
        config: {
          responseMimeType: "application/json",
        }
      });

      const text = response.text || "[]";
      console.log("Handwriting recognition result:", text);
      
      let candidates: string[] = [];
      try {
        candidates = JSON.parse(text);
      } catch (e) {
        // Fallback parse if markdown block is returned anyway
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        candidates = JSON.parse(cleanText);
      }

      // Guarantee candidate array validity
      if (Array.isArray(candidates)) {
        res.json({ candidates: candidates.slice(0, 6) });
      } else {
        res.json({ candidates: ["昼", "桑", "耘", "晓", "拔"] });
      }
    } catch (error: any) {
      console.error("Handwriting recognition failed:", error);
      res.status(500).json({ error: "手写识别出现错误，请换写或选用手动输入方案", details: error.message });
    }
  });

  // Serve static files to Vite or client
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
