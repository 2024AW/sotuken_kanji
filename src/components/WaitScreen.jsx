// src/components/WaitScreen.js
import React from "react";
import "../styles.css"; // CSSファイルを読み込む

export default function WaitScreen({
  level,
  questionCount,
  timeLimit,
  gameMode,
  onStart,
  onBack,
}) {
  const levelLabel = {
    easy: "初級",
    normal: "中級",
    hard: "上級",
    expert: "超級",
  }[level];

  return (
    <div className="wait-screen-container">
      <h2>準備はいいですか？</h2>
      <p className="wait-screen-text">以下の設定でクイズを開始します：</p>

      <div className="wait-screen-box">
        <p>
          🔹{" "}
          {gameMode === "extra-famous" ? (
            <>
              モード：<strong>エクストラ（偉人クイズ）</strong>
            </>
          ) : (
            <>
              難易度：<strong>{levelLabel}</strong>
            </>
          )}
        </p>

        <p>
          🔹 出題数：<strong>{questionCount}問</strong>
        </p>
        <p>
          🔹 制限時間：<strong>{timeLimit}秒</strong>
        </p>
      </div>

      <div className="wait-screen-btn-area">
        <button onClick={onStart} className="wait-screen-start-btn">
          ▶ スタート！
        </button>

        <button onClick={onBack} className="wait-screen-back-btn">
          ← 戻る
        </button>
      </div>
    </div>
  );
}
