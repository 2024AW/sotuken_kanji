// src/components/questions/index.js

import easy from "./easy";
import normal from "./normal";
import hard from "./hard";
import expert from "./expert";

// レベル別にまとめたセット
const questionSets = {
  easy,
  normal,
  hard,
  expert,
};

export { easy, normal, hard, expert, questionSets };
