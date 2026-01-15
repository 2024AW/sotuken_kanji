// src/components/ExtraMenu.jsx
import React, { useState } from "react";
import "../styles.css";

export default function ExtraMenu({ onSelect, onBack }) {
  const slidesData = [
    [
      {
        label: "偉人クイズ",
        target: "extra-famous",
        imgSrc: "/images/偉人問題.jpg",
      },
    ],
  ];

  const [currentSlide] = useState(0);

  const handleClick = (target) => {
    if (!target) return;
    onSelect(target);
  };

  return (
    // 1. 統一された外側の枠
    <div className="unified-board">
      {/* 2. 背景画像 (kokuban13.png) */}
      <img
        src="/images/kokuban13.png"
        alt="background"
        className="unified-board-bg"
      />

      {/* 3. コンテンツの中身 */}
      <div className="unified-board-content">
        {/* タイトル：統一クラス(.board-title)を使用 */}
        <h2
          className="board-title"
          style={{
            marginBottom: "40px",
            marginTop: "-40px", // 少し上に配置してバランス調整
          }}
        >
          遊びたいモードを選んでください
        </h2>

        {/* スライド（画像ボタン） */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {slidesData[currentSlide].map((item, index) => (
            <button
              key={index}
              onClick={() => handleClick(item.target)}
              className="img-menu-btn"
              aria-label={item.label}
            >
              <img
                src={item.imgSrc}
                alt={item.label}
                className="img-menu-content"
                // .img-menu-content は styles.css で width: 550px 等に設定済み
              />
            </button>
          ))}
        </div>

        {/* 戻るボタン（黒板内の左下に統一配置） */}
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50px",
            padding: "10px 24px",
            fontSize: "18px",
            borderRadius: "8px",
            cursor: "pointer",
            background: "rgba(255, 255, 255, 0.2)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          戻る
        </button>
      </div>
    </div>
  );
}
