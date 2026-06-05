/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageItem } from "./types";

export const CHARACTERS_LIST = [
  // 第1课 (4 characters)
  { char: "昼", pinyin: "zhòu", lesson: "第1课" },
  { char: "耘", pinyin: "yún", lesson: "第1课" },
  { char: "桑", pinyin: "sāng", lesson: "第1课" },
  { char: "晓", pinyin: "xiǎo", lesson: "第1课" },

  // 第2课 (13 characters)
  { char: "蝴", pinyin: "hú", lesson: "第2课" },
  { char: "蚱", pinyin: "zhà", lesson: "第2课" },
  { char: "嗡", pinyin: "wēng", lesson: "第2课" },
  { char: "樱", pinyin: "yīng", lesson: "第2课" },
  { char: "榆", pinyin: "yú", lesson: "第2课" },
  { char: "拔", pinyin: "bá", lesson: "第2课" },
  { char: "瞎", pinyin: "xiā", lesson: "第2课" },
  { char: "铲", pinyin: "chǎn", lesson: "第2课" },
  { char: "锄", pinyin: "chú", lesson: "第2课" },
  { char: "割", pinyin: "gē", lesson: "第2课" },
  { char: "拴", pinyin: "shuān", lesson: "第2课" },
  { char: "瓢", pinyin: "piáo", lesson: "第2课" },
  { char: "逛", pinyin: "guàng", lesson: "第2课" },

  // 第5课 (14 characters)
  { char: "妒", pinyin: "dù", lesson: "第5课" },
  { char: "忌", pinyin: "jì", lesson: "第5课" },
  { char: "曹", pinyin: "cáo", lesson: "第5课" },
  { char: "督", pinyin: "dū", lesson: "第5课" },
  { char: "委", pinyin: "wěi", lesson: "第5课" },
  { char: "鲁", pinyin: "lǔ", lesson: "第5课" },
  { char: "遮", pinyin: "zhē", lesson: "第5课" },
  { char: "漆", pinyin: "qī", lesson: "第5课" },
  { char: "疑", pinyin: "yí", lesson: "第5课" },
  { char: "惑", pinyin: "huò", lesson: "第5课" },
  { char: "寨", pinyin: "zhài", lesson: "第5课" },
  { char: "擂", pinyin: "léi", lesson: "第5课" },
  { char: "呐", pinyin: "nà", lesson: "第5课" },
  { char: "插", pinyin: "chā", lesson: "第5课" },

  // 第6课 (15 characters)
  { char: "冈", pinyin: "gāng", lesson: "第6课" },
  { char: "饥", pinyin: "jī", lesson: "第6课" },
  { char: "碟", pinyin: "dié", lesson: "第6课" },
  { char: "斤", pinyin: "jīn", lesson: "第6课" },
  { char: "俺", pinyin: "ǎn", lesson: "第6课" },
  { char: "榜", pinyin: "bǎng", lesson: "第6课" },
  { char: "杖", pinyin: "zhàng", lesson: "第6课" },
  { char: "申", pinyin: "shēn", lesson: "第6课" },
  { char: "兼", pinyin: "jiān", lesson: "第6课" },
  { char: "勿", pinyin: "wù", lesson: "第6课" },
  { char: "拖", pinyin: "tuō", lesson: "第6课" },
  { char: "悉", pinyin: "xī", lesson: "第6课" },
  { char: "坠", pinyin: "zhuì", lesson: "第6课" },
  { char: "膛", pinyin: "táng", lesson: "第6课" },
  { char: "截", pinyin: "jié", lesson: "第6课" },

  // 第9课 (7 characters)
  { char: "篱", pinyin: "lí", lesson: "第9课" },
  { char: "仞", pinyin: "rèn", lesson: "第9课" },
  { char: "岳", pinyin: "yuè", lesson: "第9课" },
  { char: "摩", pinyin: "mó", lesson: "第9课" },
  { char: "遗", pinyin: "yí", lesson: "第9课" },
  { char: "涕", pinyin: "tì", lesson: "第9课" },
  { char: "巫", pinyin: "wū", lesson: "第9课" },

  // 第10课 (15 characters)
  { char: "彭", pinyin: "péng", lesson: "第10课" },
  { char: "拟", pinyin: "nǐ", lesson: "第10课" },
  { char: "谋", pinyin: "móu", lesson: "第10课" },
  { char: "瑞", pinyin: "ruì", lesson: "第10课" },
  { char: "锻", pinyin: "duàn", lesson: "第10课" },
  { char: "炼", pinyin: "liàn", lesson: "第10课" },
  { char: "眷", pinyin: "juàn", lesson: "第10课" },
  { char: "赴", pinyin: "fù", lesson: "第10课" },
  { char: "搞", pinyin: "gǎo", lesson: "第10课" },
  { char: "殊", pinyin: "shū", lesson: "第10课" },
  { char: "尊", pinyin: "zūn", lesson: "第10课" },
  { char: "签", pinyin: "qiān", lesson: "第10课" },
  { char: "筹", pinyin: "chóu", lesson: "第10课" },
  { char: "躇", pinyin: "chú", lesson: "第10课" },
  { char: "革", pinyin: "gé", lesson: "第10课" },

  // 第11课 (15 characters)
  { char: "庆", pinyin: "qìng", lesson: "第11课" },
  { char: "诊", pinyin: "zhěn", lesson: "第11课" },
  { char: "沃", pinyin: "wò", lesson: "第11课" },
  { char: "龄", pinyin: "líng", lesson: "第11课" },
  { char: "匪", pinyin: "fěi", lesson: "第11课" },
  { char: "绷", pinyin: "bēng", lesson: "第11课" },
  { char: "审", pinyin: "shěn", lesson: "第11课" },
  { char: "剂", pinyin: "jì", lesson: "第11课" },
  { char: "施", pinyin: "shī", lesson: "第11课" },
  { char: "吭", pinyin: "kēng", lesson: "第11课" },
  { char: "崭", pinyin: "zhǎn", lesson: "第11课" },
  { char: "衷", pinyin: "zhōng", lesson: "第11课" },
  { char: "晕", pinyin: "yūn", lesson: "第11课" },
  { char: "慈", pinyin: "cí", lesson: "第11课" },
  { char: "祥", pinyin: "xiáng", lesson: "第11课" },

  // 第13课 (15 characters)
  { char: "跤", pinyin: "jiāo", lesson: "第13课" },
  { char: "搂", pinyin: "lōu", lesson: "第13课" },
  { char: "仗", pinyin: "zhàng", lesson: "第13课" },
  { char: "鞭", pinyin: "biān", lesson: "第13课" },
  { char: "欺", pinyin: "qī", lesson: "第13课" },
  { char: "挠", pinyin: "náo", lesson: "第13课" },
  { char: "扳", pinyin: "bān", lesson: "第13课" },
  { char: "腕", pinyin: "wàn", lesson: "第13课" },
  { char: "剃", pinyin: "tì", lesson: "第13课" },
  { char: "腮", pinyin: "sāi", lesson: "第13课" },
  { char: "疤", pinyin: "bā", lesson: "第13课" },
  { char: "监", pinyin: "jiān", lesson: "第13课" },
  { char: "侄", pinyin: "zhí", lesson: "第13课" },
  { char: "喉", pinyin: "hóu", lesson: "第13课" },
  { char: "咙", pinyin: "lóng", lesson: "第13课" },

  // 第14课 (14 characters)
  { char: "浆", pinyin: "jiāng", lesson: "第14课" },
  { char: "傅", pinyin: "fù", lesson: "第14课" },
  { char: "袱", pinyin: "fú", lesson: "第14课" },
  { char: "障", pinyin: "zhàng", lesson: "第14课" },
  { char: "芝", pinyin: "zhī", lesson: "第14课" },
  { char: "圣", pinyin: "shèng", lesson: "第14课" },
  { char: "犯", pinyin: "fàn", lesson: "第14课" },
  { char: "馅", pinyin: "xiàn", lesson: "第14课" },
  { char: "轰", pinyin: "hōng", lesson: "第14课" },
  { char: "堪", pinyin: "kān", lesson: "第14课" },
  { char: "诈", pinyin: "zhà", lesson: "第14课" },
  { char: "傻", pinyin: "shǎ", lesson: "第14课" },
  { char: "捏", pinyin: "niē", lesson: "第14课" },
  { char: "怔", pinyin: "zhēng", lesson: "第14课" },

  // 第15课 (4 characters)
  { char: "矛", pinyin: "máo", lesson: "第15课" },
  { char: "盾", pinyin: "dùn", lesson: "第15课" },
  { char: "誉", pinyin: "yù", lesson: "第15课" },
  { char: "吾", pinyin: "wú", lesson: "第15课" },

  // 第16课 (5 characters)
  { char: "赢", pinyin: "yíng", lesson: "第16课" },
  { char: "拳", pinyin: "quán", lesson: "第16课" },
  { char: "擦", pinyin: "cā", lesson: "第16课" },
  { char: "策", pinyin: "cè", lesson: "第16课" },
  { char: "荐", pinyin: "jiàn", lesson: "第16课" },

  // 第17课 (13 characters)
  { char: "艘", pinyin: "sōu", lesson: "第17课" },
  { char: "航", pinyin: "háng", lesson: "第17课" },
  { char: "肆", pinyin: "sì", lesson: "第17课" },
  { char: "桅", pinyin: "wéi", lesson: "第17课" },
  { char: "撕", pinyin: "sī", lesson: "第17课" },
  { char: "逗", pinyin: "dòu", lesson: "第17课" },
  { char: "唬", pinyin: "hǔ", lesson: "第17课" },
  { char: "钩", pinyin: "gōu", lesson: "第17课" },
  { char: "龇", pinyin: "zī", lesson: "第17课" },
  { char: "咧", pinyin: "liě", lesson: "第17课" },
  { char: "舱", pinyin: "cāng", lesson: "第17课" },
  { char: "鸥", pinyin: "ōu", lesson: "第17课" },
  { char: "瞄", pinyin: "miáo", lesson: "第17课" },

  // 第18课 (12 characters)
  { char: "尼", pinyin: "ní", lesson: "第18课" },
  { char: "斯", pinyin: "sī", lesson: "第18课" },
  { char: "艇", pinyin: "tǐng", lesson: "第18课" },
  { char: "艄", pinyin: "shāo", lesson: "第18课" },
  { char: "翘", pinyin: "qiào", lesson: "第18课" },
  { char: "垫", pinyin: "diàn", lesson: "第18课" },
  { char: "姆", pinyin: "mǔ", lesson: "第18课" },
  { char: "祷", pinyin: "dǎo", lesson: "第18课" },
  { char: "雇", pinyin: "gù", lesson: "第18课" },
  { char: "簇", pinyin: "cù", lesson: "第18课" },
  { char: "哗", pinyin: "huá", lesson: "第18课" },
  { char: "码", pinyin: "mǎ", lesson: "第18课" },

  // 第19课 (15 characters)
  { char: "仪", pinyin: "yí", lesson: "第19课" },
  { char: "眺", pinyin: "tiào", lesson: "第19课" },
  { char: "骏", pinyin: "jùn", lesson: "第19课" },
  { char: "驰", pinyin: "chí", lesson: "第19课" },
  { char: "辽", pinyin: "liáo", lesson: "第19课" },
  { char: "绵", pinyin: "mián", lesson: "第19课" },
  { char: "属", pinyin: "shǔ", lesson: "第19课" },
  { char: "凳", pinyin: "dèng", lesson: "第19课" },
  { char: "吆", pinyin: "yāo", lesson: "第19课" },
  { char: "铛", pinyin: "dāng", lesson: "第19课" },
  { char: "罐", pinyin: "guàn", lesson: "第19课" },
  { char: "恢", pinyin: "huī", lesson: "第19课" },
  { char: "踢", pinyin: "tī", lesson: "第19课" },
  { char: "牲", pinyin: "shēng", lesson: "第19课" },
  { char: "畜", pinyin: "chù", lesson: "第19课" },

  // 第21课 (4 characters)
  { char: "梁", pinyin: "liáng", lesson: "第21课" },
  { char: "聪", pinyin: "cōng", lesson: "第21课" },
  { char: "诣", pinyin: "yì", lesson: "第21课" },
  { char: "禽", pinyin: "qín", lesson: "第21课" },

  // 第22课 (15 characters)
  { char: "拇", pinyin: "mǔ", lesson: "第22课" },
  { char: "搔", pinyin: "sāo", lesson: "第22课" },
  { char: "痒", pinyin: "yǎng", lesson: "第22课" },
  { char: "秽", pinyin: "huì", lesson: "第22课" },
  { char: "轧", pinyin: "yà", lesson: "第22课" },
  { char: "拧", pinyin: "nǐng", lesson: "第22课" },
  { char: "螺", pinyin: "luó", lesson: "第22课" },
  { char: "纽", pinyin: "niǔ", lesson: "第22课" },
  { char: "扣", pinyin: "kòu", lesson: "第22课" },
  { char: "貌", pinyin: "mào", lesson: "第22课" },
  { char: "仓", pinyin: "cāng", lesson: "第22课" },
  { char: "渺", pinyin: "miǎo", lesson: "第22课" },
  { char: "享", pinyin: "xiǎng", lesson: "第22课" },
  { char: "庸", pinyin: "yōng", lesson: "第22课" },
  { char: "憎", pinyin: "zēng", lesson: "第22课" }
];

// Build exactly 10 characters per page
const buildPages = (): PageItem[] => {
  const pages: PageItem[] = [];
  const chunkSize = 10;
  for (let i = 0; i < CHARACTERS_LIST.length; i += chunkSize) {
    const chunk = CHARACTERS_LIST.slice(i, i + chunkSize);
    const pageNo = Math.floor(i / chunkSize) + 1;
    const pageId = `P${String(pageNo).padStart(2, "0")}`;
    pages.push({
      id: pageId,
      name: `第 ${pageNo} 页 (${pageId})`,
      characters: chunk.map((item) => item.char)
    });
  }
  return pages;
};

export const GRADE5_CHAR_PAGES: PageItem[] = buildPages();

// Build dynamic pinyin map lookup
const buildPinyinMap = (): Record<string, string> => {
  const map: Record<string, string> = {};
  CHARACTERS_LIST.forEach((item) => {
    map[item.char] = item.pinyin;
  });
  return map;
};

export const PINYIN_MAP: Record<string, string> = buildPinyinMap();
