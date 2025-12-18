// src/components/ExtraMenu.jsx
import React, { useState } from "react";
import "../styles.css";

export default function ExtraMenu({ onSelect, onBack }) {
  const slidesData = [
    [
      {
        label: "偉人クイズ",
        target: "extra-famous", // ★ ここを直す
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

      {/* スライド（ボタン） */}
      <div
        className="startmenu-slides"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
        }}
      >
        {slidesData[currentSlide].map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item.target)}
            style={{
              fontSize: "28px",
              padding: "20px 40px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 戻る */}
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          zIndex: 10,
        }}
      >
        戻る
      </button>
    </div>
  );
}
