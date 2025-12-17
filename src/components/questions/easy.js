const easyQuestions = [
  /* ===========================
            rank1（超やさしい・50問）
         =========================== */
  { level: "easy", rank: "1", kanji: "山", reading: "やま" },
  { level: "easy", rank: "1", kanji: "川", reading: "かわ" },
  { level: "easy", rank: "1", kanji: "森", reading: "もり" },
  { level: "easy", rank: "1", kanji: "空", reading: "そら" },
  { level: "easy", rank: "1", kanji: "雨", reading: "あめ" },

  { level: "easy", rank: "1", kanji: "月", reading: "つき" },
  { level: "easy", rank: "1", kanji: "花", reading: "はな" },
  { level: "easy", rank: "1", kanji: "石", reading: "いし" },
  { level: "easy", rank: "1", kanji: "竹", reading: "たけ" },
  { level: "easy", rank: "1", kanji: "星", reading: "ほし" },

  { level: "easy", rank: "1", kanji: "草原", reading: "そうげん" },
  { level: "easy", rank: "1", kanji: "入口", reading: "いりぐち" },
  { level: "easy", rank: "1", kanji: "出口", reading: "でぐち" },
  { level: "easy", rank: "1", kanji: "左右", reading: "さゆう" },
  { level: "easy", rank: "1", kanji: "地面", reading: "じめん" },
  { level: "easy", rank: "1", kanji: "新聞", reading: "しんぶん" },

  { level: "easy", rank: "1", kanji: "山道", reading: "やまみち" },
  { level: "easy", rank: "1", kanji: "晴天", reading: "せいてん" },
  { level: "easy", rank: "1", kanji: "風車", reading: "かざぐるま" },
  { level: "easy", rank: "1", kanji: "水中", reading: "すいちゅう" },
  { level: "easy", rank: "1", kanji: "海辺", reading: "うみべ" },

  { level: "easy", rank: "1", kanji: "手紙", reading: "てがみ" },
  { level: "easy", rank: "1", kanji: "日帰り", reading: "ひがえり" },
  { level: "easy", rank: "1", kanji: "大雨", reading: "おおあめ" },
  { level: "easy", rank: "1", kanji: "早朝", reading: "そうちょう" },
  { level: "easy", rank: "1", kanji: "草むら", reading: "くさむら" },

  { level: "easy", rank: "1", kanji: "小石", reading: "こいし" },
  { level: "easy", rank: "1", kanji: "昼間", reading: "ひるま" },
  { level: "easy", rank: "1", kanji: "地図", reading: "ちず" },
  { level: "easy", rank: "1", kanji: "帰り道", reading: "かえりみち" },
  { level: "easy", rank: "1", kanji: "校内", reading: "こうない" },

  { level: "easy", rank: "1", kanji: "黒板", reading: "こくばん" },
  { level: "easy", rank: "1", kanji: "教室", reading: "きょうしつ" },
  { level: "easy", rank: "1", kanji: "机", reading: "つくえ" },
  { level: "easy", rank: "1", kanji: "先生", reading: "せんせい" },
  { level: "easy", rank: "1", kanji: "友達", reading: "ともだち" },

  { level: "easy", rank: "1", kanji: "昼食", reading: "ちゅうしょく" },
  { level: "easy", rank: "1", kanji: "休日", reading: "きゅうじつ" },
  { level: "easy", rank: "1", kanji: "青空", reading: "あおぞら" },
  { level: "easy", rank: "1", kanji: "雪山", reading: "ゆきやま" },
  { level: "easy", rank: "1", kanji: "野原", reading: "のはら" },

  { level: "easy", rank: "1", kanji: "虫取り", reading: "むしとり" },
  { level: "easy", rank: "1", kanji: "川辺", reading: "かわべ" },
  { level: "easy", rank: "1", kanji: "太陽", reading: "たいよう" },
  { level: "easy", rank: "1", kanji: "月光", reading: "げっこう" },
  { level: "easy", rank: "1", kanji: "草花", reading: "くさばな" },

  { level: "easy", rank: "1", kanji: "木陰", reading: "こかげ" },
  { level: "easy", rank: "1", kanji: "田んぼ", reading: "たんぼ" },
  { level: "easy", rank: "1", kanji: "畑道", reading: "はたけみち" },
  { level: "easy", rank: "1", kanji: "雨雲", reading: "あまぐも" },
  { level: "easy", rank: "1", kanji: "花火", reading: "はなび" },
  { level: "easy", rank: "1", kanji: "時計", reading: "とけい" },

  /* ===========================
            rank2（標準語彙・50問）
         =========================== */
  { level: "easy", rank: "2", kanji: "計画", reading: "けいかく" },
  { level: "easy", rank: "2", kanji: "整理", reading: "せいり" },
  { level: "easy", rank: "2", kanji: "生活", reading: "せいかつ" },
  { level: "easy", rank: "2", kanji: "交通", reading: "こうつう" },
  { level: "easy", rank: "2", kanji: "連続", reading: "れんぞく" },

  { level: "easy", rank: "2", kanji: "温度", reading: "おんど" },
  { level: "easy", rank: "2", kanji: "記録", reading: "きろく" },
  { level: "easy", rank: "2", kanji: "出発", reading: "しゅっぱつ" },
  { level: "easy", rank: "2", kanji: "出席", reading: "しゅっせき" },
  { level: "easy", rank: "2", kanji: "活動", reading: "かつどう" },

  { level: "easy", rank: "2", kanji: "改善", reading: "かいぜん" },
  { level: "easy", rank: "2", kanji: "管理", reading: "かんり" },
  { level: "easy", rank: "2", kanji: "努力", reading: "どりょく" },
  { level: "easy", rank: "2", kanji: "計算", reading: "けいさん" },
  { level: "easy", rank: "2", kanji: "調査", reading: "ちょうさ" },

  { level: "easy", rank: "2", kanji: "学習", reading: "がくしゅう" },
  { level: "easy", rank: "2", kanji: "図書館", reading: "としょかん" },
  { level: "easy", rank: "2", kanji: "説明", reading: "せつめい" },
  { level: "easy", rank: "2", kanji: "成長", reading: "せいちょう" },
  { level: "easy", rank: "2", kanji: "特徴", reading: "とくちょう" },

  { level: "easy", rank: "2", kanji: "応援", reading: "おうえん" },
  { level: "easy", rank: "2", kanji: "選手", reading: "せんしゅ" },
  { level: "easy", rank: "2", kanji: "飛行機", reading: "ひこうき" },
  { level: "easy", rank: "2", kanji: "読書", reading: "どくしょ" },
  { level: "easy", rank: "2", kanji: "目標", reading: "もくひょう" },

  { level: "easy", rank: "2", kanji: "準備", reading: "じゅんび" },
  { level: "easy", rank: "2", kanji: "会話", reading: "かいわ" },
  { level: "easy", rank: "2", kanji: "出入口", reading: "でいりぐち" },
  { level: "easy", rank: "2", kanji: "希望", reading: "きぼう" },
  { level: "easy", rank: "2", kanji: "安心", reading: "あんしん" },

  { level: "easy", rank: "2", kanji: "写真", reading: "しゃしん" },
  { level: "easy", rank: "2", kanji: "未来", reading: "みらい" },
  { level: "easy", rank: "2", kanji: "計時", reading: "けいじ" },
  { level: "easy", rank: "2", kanji: "料理", reading: "りょうり" },
  { level: "easy", rank: "2", kanji: "実力", reading: "じつりょく" },

  { level: "easy", rank: "2", kanji: "環境", reading: "かんきょう" },
  { level: "easy", rank: "2", kanji: "相談", reading: "そうだん" },
  { level: "easy", rank: "2", kanji: "挑戦", reading: "ちょうせん" },
  { level: "easy", rank: "2", kanji: "演習", reading: "えんしゅう" },
  { level: "easy", rank: "2", kanji: "家庭科", reading: "かていか" },

  { level: "easy", rank: "2", kanji: "体育館", reading: "たいいくかん" },
  { level: "easy", rank: "2", kanji: "宿題", reading: "しゅくだい" },
  { level: "easy", rank: "2", kanji: "発表", reading: "はっぴょう" },
  { level: "easy", rank: "2", kanji: "連絡", reading: "れんらく" },
  { level: "easy", rank: "2", kanji: "調整", reading: "ちょうせい" },

  { level: "easy", rank: "2", kanji: "信号機", reading: "しんごうき" },
  { level: "easy", rank: "2", kanji: "競争", reading: "きょうそう" },
  { level: "easy", rank: "2", kanji: "大自然", reading: "だいしぜん" },
  { level: "easy", rank: "2", kanji: "総合", reading: "そうごう" },
  { level: "easy", rank: "2", kanji: "物語", reading: "ものがたり" },

  /* ===========================
            rank3（中学生語彙・50問）
         =========================== */
  { level: "easy", rank: "3", kanji: "状況", reading: "じょうきょう" },
  { level: "easy", rank: "3", kanji: "印象", reading: "いんしょう" },
  { level: "easy", rank: "3", kanji: "反応", reading: "はんのう" },
  { level: "easy", rank: "3", kanji: "結論", reading: "けつろん" },
  { level: "easy", rank: "3", kanji: "提案", reading: "ていあん" },

  { level: "easy", rank: "3", kanji: "活動記録", reading: "かつどうきろく" },
  { level: "easy", rank: "3", kanji: "意識", reading: "いしき" },
  { level: "easy", rank: "3", kanji: "理解", reading: "りかい" },
  { level: "easy", rank: "3", kanji: "分析", reading: "ぶんせき" },
  { level: "easy", rank: "3", kanji: "調和", reading: "ちょうわ" },

  { level: "easy", rank: "3", kanji: "構造", reading: "こうぞう" },
  { level: "easy", rank: "3", kanji: "比較", reading: "ひかく" },
  { level: "easy", rank: "3", kanji: "影響", reading: "えいきょう" },
  { level: "easy", rank: "3", kanji: "需要", reading: "じゅよう" },
  { level: "easy", rank: "3", kanji: "供給", reading: "きょうきゅう" },

  { level: "easy", rank: "3", kanji: "過程", reading: "かてい" },
  { level: "easy", rank: "3", kanji: "緊張", reading: "きんちょう" },
  { level: "easy", rank: "3", kanji: "依頼", reading: "いらい" },
  { level: "easy", rank: "3", kanji: "成績", reading: "せいせき" },
  { level: "easy", rank: "3", kanji: "現象", reading: "げんしょう" },

  { level: "easy", rank: "3", kanji: "選択", reading: "せんたく" },
  { level: "easy", rank: "3", kanji: "適応", reading: "てきおう" },
  { level: "easy", rank: "3", kanji: "拡大", reading: "かくだい" },
  { level: "easy", rank: "3", kanji: "縮小", reading: "しゅくしょう" },
  { level: "easy", rank: "3", kanji: "条件", reading: "じょうけん" },

  { level: "easy", rank: "3", kanji: "現実", reading: "げんじつ" },
  { level: "easy", rank: "3", kanji: "証拠", reading: "しょうこ" },
  { level: "easy", rank: "3", kanji: "資料", reading: "しりょう" },
  { level: "easy", rank: "3", kanji: "要因", reading: "よういん" },
  { level: "easy", rank: "3", kanji: "仕組み", reading: "しくみ" },

  { level: "easy", rank: "3", kanji: "観点", reading: "かんてん" },
  { level: "easy", rank: "3", kanji: "要素", reading: "ようそ" },
  { level: "easy", rank: "3", kanji: "詳細", reading: "しょうさい" },
  { level: "easy", rank: "3", kanji: "規則", reading: "きそく" },
  { level: "easy", rank: "3", kanji: "範囲", reading: "はんい" },

  { level: "easy", rank: "3", kanji: "適切", reading: "てきせつ" },
  { level: "easy", rank: "3", kanji: "解決", reading: "かいけつ" },
  { level: "easy", rank: "3", kanji: "信頼", reading: "しんらい" },
  { level: "easy", rank: "3", kanji: "視点", reading: "してん" },
  { level: "easy", rank: "3", kanji: "速度", reading: "そくど" },

  { level: "easy", rank: "3", kanji: "直感", reading: "ちょっかん" },
  { level: "easy", rank: "3", kanji: "練習量", reading: "れんしゅうりょう" },
  { level: "easy", rank: "3", kanji: "自信", reading: "じしん" },
  { level: "easy", rank: "3", kanji: "経験値", reading: "けいけんち" },
  { level: "easy", rank: "3", kanji: "成果", reading: "せいか" },

  /* ===========================
            BOSS（やや高度・50問）
            ※四字熟語限定なし
         =========================== */
  { level: "easy", rank: "BOSS", kanji: "瞬間", reading: "しゅんかん" },
  { level: "easy", rank: "BOSS", kanji: "要点", reading: "ようてん" },
  { level: "easy", rank: "BOSS", kanji: "確保", reading: "かくほ" },
  { level: "easy", rank: "BOSS", kanji: "精密", reading: "せいみつ" },
  { level: "easy", rank: "BOSS", kanji: "好奇心", reading: "こうきしん" },

  { level: "easy", rank: "BOSS", kanji: "真相", reading: "しんそう" },
  { level: "easy", rank: "BOSS", kanji: "発想力", reading: "はっそうりょく" },
  { level: "easy", rank: "BOSS", kanji: "最適解", reading: "さいてきかい" },
  { level: "easy", rank: "BOSS", kanji: "要領", reading: "ようりょう" },
  { level: "easy", rank: "BOSS", kanji: "観察力", reading: "かんさつりょく" },

  { level: "easy", rank: "BOSS", kanji: "着眼点", reading: "ちゃくがんてん" },
  {
    level: "easy",
    rank: "BOSS",
    kanji: "詳細説明",
    reading: "しょうさいせつめい",
  },
  {
    level: "easy",
    rank: "BOSS",
    kanji: "重要人物",
    reading: "じゅうようじんぶつ",
  },
  { level: "easy", rank: "BOSS", kanji: "整合性", reading: "せいごうせい" },
  { level: "easy", rank: "BOSS", kanji: "適応力", reading: "てきおうりょく" },

  { level: "easy", rank: "BOSS", kanji: "柔軟性", reading: "じゅうなんせい" },
  { level: "easy", rank: "BOSS", kanji: "瞬発力", reading: "しゅんぱつりょく" },
  { level: "easy", rank: "BOSS", kanji: "着想", reading: "ちゃくそう" },
  { level: "easy", rank: "BOSS", kanji: "構築", reading: "こうちく" },
  {
    level: "easy",
    rank: "BOSS",
    kanji: "現状分析",
    reading: "げんじょうぶんせき",
  },

  { level: "easy", rank: "BOSS", kanji: "維持管理", reading: "いじかんり" },
  {
    level: "easy",
    rank: "BOSS",
    kanji: "発見能力",
    reading: "はっけんのうりょく",
  },
  {
    level: "easy",
    rank: "BOSS",
    kanji: "直観的判断",
    reading: "ちょっかんてきはんだん",
  },
  { level: "easy", rank: "BOSS", kanji: "実践力", reading: "じっせんりょく" },
  { level: "easy", rank: "BOSS", kanji: "思考力", reading: "しこうりょく" },

  {
    level: "easy",
    rank: "BOSS",
    kanji: "適材適所",
    reading: "てきざいてきしょ",
  },
  {
    level: "easy",
    rank: "BOSS",
    kanji: "状況判断",
    reading: "じょうきょうはんだん",
  },
  {
    level: "easy",
    rank: "BOSS",
    kanji: "影響要素",
    reading: "えいきょうようそ",
  },
  { level: "easy", rank: "BOSS", kanji: "全体像", reading: "ぜんたいぞう" },
  {
    level: "easy",
    rank: "BOSS",
    kanji: "集中力",
    reading: "しゅうちゅうりょく",
  },

  {
    level: "easy",
    rank: "BOSS",
    kanji: "判断基準",
    reading: "はんだんきじゅん",
  },
  { level: "easy", rank: "BOSS", kanji: "確実性", reading: "かくじつせい" },
  {
    level: "easy",
    rank: "BOSS",
    kanji: "必要条件",
    reading: "ひつようじょうけん",
  },
  {
    level: "easy",
    rank: "BOSS",
    kanji: "最終確認",
    reading: "さいしゅうかくにん",
  },
  {
    level: "easy",
    rank: "BOSS",
    kanji: "計画立案",
    reading: "けいかくりつあん",
  },

  { level: "easy", rank: "BOSS", kanji: "注意力", reading: "ちゅういりょく" },
  { level: "easy", rank: "BOSS", kanji: "予備知識", reading: "よびちしき" },
  { level: "easy", rank: "BOSS", kanji: "目的意識", reading: "もくてきいしき" },
  { level: "easy", rank: "BOSS", kanji: "改善策", reading: "かいぜんさく" },
  { level: "easy", rank: "BOSS", kanji: "応用力", reading: "おうようりょく" },
];

export default easyQuestions;
