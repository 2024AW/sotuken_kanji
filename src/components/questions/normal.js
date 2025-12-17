const normalQuestions = [
  /* ===========================
            rank1（基本の二字熟語 50問）
         =========================== */
  { level: "normal", rank: "1", kanji: "計画", reading: "けいかく" },
  { level: "normal", rank: "1", kanji: "記録", reading: "きろく" },
  { level: "normal", rank: "1", kanji: "整理", reading: "せいり" },
  { level: "normal", rank: "1", kanji: "出荷", reading: "しゅっか" },
  { level: "normal", rank: "1", kanji: "印象", reading: "いんしょう" },

  { level: "normal", rank: "1", kanji: "発表", reading: "はっぴょう" },
  { level: "normal", rank: "1", kanji: "反応", reading: "はんのう" },
  { level: "normal", rank: "1", kanji: "事例", reading: "じれい" },
  { level: "normal", rank: "1", kanji: "構図", reading: "こうず" },
  { level: "normal", rank: "1", kanji: "信号", reading: "しんごう" },

  { level: "normal", rank: "1", kanji: "要請", reading: "ようせい" },
  { level: "normal", rank: "1", kanji: "改善", reading: "かいぜん" },
  { level: "normal", rank: "1", kanji: "注意", reading: "ちゅうい" },
  { level: "normal", rank: "1", kanji: "試験", reading: "しけん" },
  { level: "normal", rank: "1", kanji: "制度", reading: "せいど" },

  { level: "normal", rank: "1", kanji: "連続", reading: "れんぞく" },
  { level: "normal", rank: "1", kanji: "努力", reading: "どりょく" },
  { level: "normal", rank: "1", kanji: "回数", reading: "かいすう" },
  { level: "normal", rank: "1", kanji: "時期", reading: "じき" },
  { level: "normal", rank: "1", kanji: "対策", reading: "たいさく" },

  { level: "normal", rank: "1", kanji: "設定", reading: "せってい" },
  { level: "normal", rank: "1", kanji: "達成", reading: "たっせい" },
  { level: "normal", rank: "1", kanji: "状況", reading: "じょうきょう" },
  { level: "normal", rank: "1", kanji: "平均", reading: "へいきん" },
  { level: "normal", rank: "1", kanji: "記念", reading: "きねん" },

  { level: "normal", rank: "1", kanji: "保護", reading: "ほご" },
  { level: "normal", rank: "1", kanji: "感想", reading: "かんそう" },
  { level: "normal", rank: "1", kanji: "意見", reading: "いけん" },
  { level: "normal", rank: "1", kanji: "条件", reading: "じょうけん" },
  { level: "normal", rank: "1", kanji: "要素", reading: "ようそ" },

  { level: "normal", rank: "1", kanji: "特徴", reading: "とくちょう" },
  { level: "normal", rank: "1", kanji: "現実", reading: "げんじつ" },
  { level: "normal", rank: "1", kanji: "発見", reading: "はっけん" },
  { level: "normal", rank: "1", kanji: "比例", reading: "ひれい" },
  { level: "normal", rank: "1", kanji: "比較", reading: "ひかく" },

  { level: "normal", rank: "1", kanji: "結末", reading: "けつまつ" },
  { level: "normal", rank: "1", kanji: "注意報", reading: "ちゅういほう" },
  { level: "normal", rank: "1", kanji: "作業", reading: "さぎょう" },
  { level: "normal", rank: "1", kanji: "確率", reading: "かくりつ" },
  { level: "normal", rank: "1", kanji: "最終", reading: "さいしゅう" },

  { level: "normal", rank: "1", kanji: "現場", reading: "げんば" },
  { level: "normal", rank: "1", kanji: "整理券", reading: "せいりけん" },
  { level: "normal", rank: "1", kanji: "重要", reading: "じゅうよう" },
  { level: "normal", rank: "1", kanji: "成功", reading: "せいこう" },
  { level: "normal", rank: "1", kanji: "視点", reading: "してん" },

  { level: "normal", rank: "1", kanji: "機能", reading: "きのう" },
  { level: "normal", rank: "1", kanji: "用途", reading: "ようと" },
  { level: "normal", rank: "1", kanji: "本質", reading: "ほんしつ" },
  { level: "normal", rank: "1", kanji: "改善点", reading: "かいぜんてん" },
  { level: "normal", rank: "1", kanji: "信頼度", reading: "しんらいど" },

  /* ===========================
            rank2（中級・少し難しい 50問）
         =========================== */
  { level: "normal", rank: "2", kanji: "概念", reading: "がいねん" },
  { level: "normal", rank: "2", kanji: "俯瞰", reading: "ふかん" },
  { level: "normal", rank: "2", kanji: "構造", reading: "こうぞう" },
  { level: "normal", rank: "2", kanji: "抽象", reading: "ちゅうしょう" },
  { level: "normal", rank: "2", kanji: "推測", reading: "すいそく" },

  { level: "normal", rank: "2", kanji: "精度", reading: "せいど" },
  { level: "normal", rank: "2", kanji: "根拠", reading: "こんきょ" },
  { level: "normal", rank: "2", kanji: "相関", reading: "そうかん" },
  { level: "normal", rank: "2", kanji: "権限", reading: "けんげん" },
  { level: "normal", rank: "2", kanji: "確証", reading: "かくしょう" },

  { level: "normal", rank: "2", kanji: "解析", reading: "かいせき" },
  { level: "normal", rank: "2", kanji: "転換", reading: "てんかん" },
  { level: "normal", rank: "2", kanji: "拡張", reading: "かくちょう" },
  { level: "normal", rank: "2", kanji: "縮小", reading: "しゅくしょう" },
  { level: "normal", rank: "2", kanji: "志向", reading: "しこう" },

  { level: "normal", rank: "2", kanji: "施策", reading: "しさく" },
  { level: "normal", rank: "2", kanji: "要件", reading: "ようけん" },
  { level: "normal", rank: "2", kanji: "関連", reading: "かんれん" },
  { level: "normal", rank: "2", kanji: "変革", reading: "へんかく" },
  { level: "normal", rank: "2", kanji: "企画", reading: "きかく" },

  { level: "normal", rank: "2", kanji: "抑制", reading: "よくせい" },
  { level: "normal", rank: "2", kanji: "制御", reading: "せいぎょ" },
  { level: "normal", rank: "2", kanji: "分配", reading: "ぶんぱい" },
  { level: "normal", rank: "2", kanji: "調整", reading: "ちょうせい" },
  { level: "normal", rank: "2", kanji: "構築", reading: "こうちく" },

  { level: "normal", rank: "2", kanji: "確立", reading: "かくりつ" },
  { level: "normal", rank: "2", kanji: "反証", reading: "はんしょう" },
  { level: "normal", rank: "2", kanji: "推論", reading: "すいろん" },
  { level: "normal", rank: "2", kanji: "施行", reading: "しこう" },
  { level: "normal", rank: "2", kanji: "精査", reading: "せいさ" },

  { level: "normal", rank: "2", kanji: "概要", reading: "がいよう" },
  { level: "normal", rank: "2", kanji: "適応", reading: "てきおう" },
  { level: "normal", rank: "2", kanji: "補足", reading: "ほそく" },
  { level: "normal", rank: "2", kanji: "克服", reading: "こくふく" },
  { level: "normal", rank: "2", kanji: "創造", reading: "そうぞう" },

  { level: "normal", rank: "2", kanji: "理論", reading: "りろん" },
  { level: "normal", rank: "2", kanji: "傾向", reading: "けいこう" },
  { level: "normal", rank: "2", kanji: "特殊", reading: "とくしゅ" },
  { level: "normal", rank: "2", kanji: "規制", reading: "きせい" },
  { level: "normal", rank: "2", kanji: "対立", reading: "たいりつ" },

  { level: "normal", rank: "2", kanji: "抽出", reading: "ちゅうしゅつ" },
  { level: "normal", rank: "2", kanji: "均衡", reading: "きんこう" },
  { level: "normal", rank: "2", kanji: "指針", reading: "ししん" },
  { level: "normal", rank: "2", kanji: "媒介", reading: "ばいかい" },
  { level: "normal", rank: "2", kanji: "概略", reading: "がいりゃく" },

  /* ===========================
            rank3（高度な二字熟語 50問）
         =========================== */
  { level: "normal", rank: "3", kanji: "端緒", reading: "たんしょ" },
  { level: "normal", rank: "3", kanji: "兆候", reading: "ちょうこう" },
  { level: "normal", rank: "3", kanji: "旋回", reading: "せんかい" },
  { level: "normal", rank: "3", kanji: "遵守", reading: "じゅんしゅ" },
  { level: "normal", rank: "3", kanji: "精緻", reading: "せいち" },

  { level: "normal", rank: "3", kanji: "希薄", reading: "きはく" },
  { level: "normal", rank: "3", kanji: "緩衝", reading: "かんしょう" },
  { level: "normal", rank: "3", kanji: "堅実", reading: "けんじつ" },
  { level: "normal", rank: "3", kanji: "追従", reading: "ついじゅう" },
  { level: "normal", rank: "3", kanji: "抽象化", reading: "ちゅうしょうか" },

  { level: "normal", rank: "3", kanji: "災禍", reading: "さいか" },
  { level: "normal", rank: "3", kanji: "遵法", reading: "じゅんぽう" },
  { level: "normal", rank: "3", kanji: "確執", reading: "かくしつ" },
  { level: "normal", rank: "3", kanji: "端正", reading: "たんせい" },
  { level: "normal", rank: "3", kanji: "機微", reading: "きび" },

  { level: "normal", rank: "3", kanji: "瞬発", reading: "しゅんぱつ" },
  { level: "normal", rank: "3", kanji: "本質", reading: "ほんしつ" },
  { level: "normal", rank: "3", kanji: "冗長", reading: "じょうちょう" },
  { level: "normal", rank: "3", kanji: "緻密", reading: "ちみつ" },
  { level: "normal", rank: "3", kanji: "概況", reading: "がいきょう" },

  { level: "normal", rank: "3", kanji: "精巧", reading: "せいこう" },
  { level: "normal", rank: "3", kanji: "権勢", reading: "けんせい" },
  { level: "normal", rank: "3", kanji: "主導", reading: "しゅどう" },
  { level: "normal", rank: "3", kanji: "兼用", reading: "けんよう" },
  { level: "normal", rank: "3", kanji: "均質", reading: "きんしつ" },

  { level: "normal", rank: "3", kanji: "堅守", reading: "けんしゅ" },
  { level: "normal", rank: "3", kanji: "精励", reading: "せいれい" },
  { level: "normal", rank: "3", kanji: "慎重", reading: "しんちょう" },
  { level: "normal", rank: "3", kanji: "真偽", reading: "しんぎ" },
  { level: "normal", rank: "3", kanji: "固執", reading: "こしつ" },

  { level: "normal", rank: "3", kanji: "端的", reading: "たんてき" },
  { level: "normal", rank: "3", kanji: "折衷", reading: "せっちゅう" },
  { level: "normal", rank: "3", kanji: "調和性", reading: "ちょうわせい" },
  { level: "normal", rank: "3", kanji: "妥協", reading: "だきょう" },
  { level: "normal", rank: "3", kanji: "明瞭", reading: "めいりょう" },

  /* ===========================
            BOSS（中級最難：二字熟語 50問）
         =========================== */
  { level: "normal", rank: "BOSS", kanji: "該当", reading: "がいとう" },
  { level: "normal", rank: "BOSS", kanji: "端緒", reading: "たんしょ" },
  { level: "normal", rank: "BOSS", kanji: "精密", reading: "せいみつ" },
  { level: "normal", rank: "BOSS", kanji: "緻密", reading: "ちみつ" },
  { level: "normal", rank: "BOSS", kanji: "追随", reading: "ついずい" },

  { level: "normal", rank: "BOSS", kanji: "端麗", reading: "たんれい" },
  { level: "normal", rank: "BOSS", kanji: "峻別", reading: "しゅんべつ" },
  { level: "normal", rank: "BOSS", kanji: "希求", reading: "ききゅう" },
  { level: "normal", rank: "BOSS", kanji: "指向", reading: "しこう" },
  { level: "normal", rank: "BOSS", kanji: "明察", reading: "めいさつ" },

  { level: "normal", rank: "BOSS", kanji: "包含", reading: "ほうがん" },
  { level: "normal", rank: "BOSS", kanji: "端正", reading: "たんせい" },
  { level: "normal", rank: "BOSS", kanji: "精鋭", reading: "せいえい" },
  { level: "normal", rank: "BOSS", kanji: "遵守", reading: "じゅんしゅ" },
  { level: "normal", rank: "BOSS", kanji: "均衡", reading: "きんこう" },

  { level: "normal", rank: "BOSS", kanji: "錯覚", reading: "さっかく" },
  { level: "normal", rank: "BOSS", kanji: "抽出", reading: "ちゅうしゅつ" },
  { level: "normal", rank: "BOSS", kanji: "緩和", reading: "かんわ" },
  { level: "normal", rank: "BOSS", kanji: "堅持", reading: "けんじ" },
  { level: "normal", rank: "BOSS", kanji: "俯瞰図", reading: "ふかんず" },

  { level: "normal", rank: "BOSS", kanji: "端境期", reading: "はざかいき" },
  { level: "normal", rank: "BOSS", kanji: "希薄", reading: "きはく" },
  { level: "normal", rank: "BOSS", kanji: "要旨", reading: "ようし" },
  { level: "normal", rank: "BOSS", kanji: "精読", reading: "せいどく" },
  { level: "normal", rank: "BOSS", kanji: "潜在", reading: "せんざい" },

  { level: "normal", rank: "BOSS", kanji: "簡潔", reading: "かんけつ" },
  {
    level: "normal",
    rank: "BOSS",
    kanji: "端緒探し",
    reading: "たんしょさがし",
  },
  { level: "normal", rank: "BOSS", kanji: "慎重策", reading: "しんちょうさく" },
  { level: "normal", rank: "BOSS", kanji: "適正化", reading: "てきせいか" },
  { level: "normal", rank: "BOSS", kanji: "均質化", reading: "きんしつか" },

  { level: "normal", rank: "BOSS", kanji: "高精度", reading: "こうせいど" },
  { level: "normal", rank: "BOSS", kanji: "基準値", reading: "きじゅんち" },
  { level: "normal", rank: "BOSS", kanji: "抽象度", reading: "ちゅうしょうど" },
  {
    level: "normal",
    rank: "BOSS",
    kanji: "端末操作",
    reading: "たんまつそうさ",
  },
  {
    level: "normal",
    rank: "BOSS",
    kanji: "要点整理",
    reading: "ようてんせいり",
  },

  {
    level: "normal",
    rank: "BOSS",
    kanji: "状況整理",
    reading: "じょうきょうせいり",
  },
  { level: "normal", rank: "BOSS", kanji: "精密度", reading: "せいみつど" },
  { level: "normal", rank: "BOSS", kanji: "概算値", reading: "がいさんち" },
  { level: "normal", rank: "BOSS", kanji: "分析法", reading: "ぶんせきほう" },
  {
    level: "normal",
    rank: "BOSS",
    kanji: "比較研究",
    reading: "ひかくけんきゅう",
  },
];

export default normalQuestions;
