// src/components/StartMenu.jsx
import React, { useState } from "react";
import "../styles.css";

export default function StartMenu({ onSelect }) {
  const slidesData = [
    // ===== 1ページ目 =====
    [
      { img: "/images/エクストラ.png", target: "extra" },
      { img: "/images/メイン.png", target: "level" },
      { img: "/images/遊び方説明.png", target: "howto" },
    ],

    // ===== 2ページ目 =====
    [
      { img: "/images/ジュークボックス.png", target: "bgm" },
      { img: "/images/音量調整.png", target: "volume" },
      { img: "/images/クレジット・規定.png", target: "credit" },
    ],
  ];

  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % slidesData.length);
  };

  return (
    <div className="startmenu-slider">
      {/* 黒板固定 */}
      <img
        src="/images/kokuban12.png"
        className="startmenu-background"
        alt="黒板"
      />

      {/* タイトル */}
      <div className="startmenu-title">遊びたいモードを選んでください</div>

      {/* スライド */}
      <div className="startmenu-slides">
        {slidesData.map((slide, i) => (
          <div
            key={i}
            className={`startmenu-slide ${i === index ? "active" : ""}`}
          >
            <div className="startmenu-menu-items">
              {slide.map((item, j) => (
                <div
                  key={j}
                  className="startmenu-item-box"
                  onClick={() => item.target && onSelect(item.target)}
                >
                  <img src={item.img} alt={`menu-${j}`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ナビゲーション */}
      <button className="startmenu-prev" onClick={handlePrev}>
        &lt;
      </button>
      <button className="startmenu-next" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}
