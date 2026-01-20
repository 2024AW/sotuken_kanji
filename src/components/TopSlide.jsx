// src/components/TopSlide.js
import React from "react";
import "../styles.css";

export default function TopSlide({ onStart }) {
  return (
    // 1. 統一された黒板枠
    <div
      className="unified-board"
      onClick={onStart}
      style={{ cursor: "pointer" }}
    >
      {/* 2. 背景画像 */}
      <img
        src="/images/kokuban11.png"
        alt="背景"
        className="unified-board-bg"
      />

      {/* 3. コンテンツの中身 */}
      <div className="unified-board-content">
        {/* タイトルロゴ */}
        <img
          src="/images/サイトロゴ1.png"
          alt="タイトル"
          style={{
            // ★修正1: ロゴサイズをコンパクトに (例: 55%)
            maxWidth: "65%",
            height: "auto",
            marginBottom: "40px",
            pointerEvents: "none",
          }}
        />

        {/* タップメッセージ */}
        <p
          className="tap-message"
          style={{
            // ★修正2: 位置を少し上に調整
            marginTop: "-20px",
            fontSize: "28px",
            color: "white",
            pointerEvents: "none",
          }}
        >
          この画面をタップしてね
        </p>
      </div>
    </div>
  );
}
