// src/components/ExtraMenu.jsx
import React, { useState } from "react";
import "../styles.css";

export default function ExtraMenu({ onSelect, onBack }) {
  const slidesData = [
    [
      {
        label: "偉人クイズ",
        target: "extra-famous",
        // 実際の画像パスに合わせてください
        image: "/images/偉人問題.jpg", 
      },
    ],
  ];

  const [currentSlide] = useState(0);

  const handleClick = (target) => {
    if (!target) return;
    onSelect(target);
  };

  return (
    <div className="startmenu-slider">
      {/* 背景 */}
      <img
        src="/images/kokuban13.png"
        alt="background"
        className="startmenu-background"
      />

      {/* ★ 追加: タイトル表示エリア */}
      <div className="extra-menu-title">
        エクストラモードを選択してください
      </div>

      {/* スライド（ボタンエリア） */}
      <div
        className="startmenu-slides"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px", // ボタンが大きくなったので間隔も少し広げました
          pointerEvents: "auto",
        }}
      >
        {slidesData[currentSlide].map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item.target)}
            className="extra-menu-btn"
            aria-label={item.label}
          >
            <img src={item.image} alt={item.label} />
          </button>
        ))}
      </div>

      {/* 戻るボタン */}
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          zIndex: 10,
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
          borderRadius: "8px",
          border: "none",
          background: "rgba(255,255,255,0.8)",
          fontWeight: "bold",
        }}
      >
        戻る
      </button>
    </div>
  );
}