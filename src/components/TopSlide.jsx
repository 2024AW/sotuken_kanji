// src/components/TopSlide.js
import React from "react";
import "../styles.css";

export default function TopSlide({ onStart }) {
  return (
    // 1. 統一された黒板枠
    // 黒板全体をクリック可能(onClick)にし、カーソルを指マークにする
    <div
      className="unified-board"
      onClick={onStart}
      style={{ cursor: "pointer" }}
    >
      {/* 2. 背景画像 (kokuban11.png) */}
      <img
        src="/images/kokuban11.png"
        alt="背景"
        className="unified-board-bg"
      />

      {/* 3. コンテンツの中身 */}
      <div className="unified-board-content">
        {/* タイトルロゴ */}
        <img
          src="/images/kanjinojikan.png"
          alt="タイトル"
          style={{
            maxWidth: "85%", // 黒板からはみ出さないように制限
            height: "auto",
            marginBottom: "40px",
            // ユーザー操作を邪魔しない設定（画像ドラッグ防止など）
            pointerEvents: "none",
          }}
        />

        {/* タップメッセージ */}
        {/* styles.css でフォントやアニメーションが定義済み */}
        <p
          className="tap-message"
          style={{
            fontSize: "28px", // 少し大きく見やすく
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
