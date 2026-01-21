// src/components/LevelSelect.js
import React, { useState } from "react";
import "../styles.css";

export default function LevelSelect({ onSelect, onBack }) {
  const levels = [
    { id: "easy", label: "初級", img: "/images/初.jpg" },
    { id: "normal", label: "中級", img: "/images/中.jpg" },
    { id: "hard", label: "上級", img: "/images/上.jpg" },
    { id: "expert", label: "超級", img: "/images/超.jpg" },
  ];

  // スマホ用スライドのインデックス
  const [mobileIndex, setMobileIndex] = useState(0);

  const handleMobilePrev = () => {
    setMobileIndex((prev) => (prev - 1 + levels.length) % levels.length);
  };

  const handleMobileNext = () => {
    setMobileIndex((prev) => (prev + 1) % levels.length);
  };

  return (
    <div className="unified-board">
      <img
        src="/images/kokuban13.png"
        alt="background"
        className="unified-board-bg"
      />

      <div className="unified-board-content">
        <h2
          className="board-title"
          style={{
            marginBottom: "40px",
            marginTop: "-30px",
          }}
        >
          難易度を選んでください
        </h2>

        {/* =================================================
            🖥️ PC用レイアウト (4枚横並び)
           ================================================= */}
        <div
          className="pc-layout-area"
          style={{
            display: "flex", // PCではflexで表示（CSSでスマホ時はnoneに上書きされる）
            gap: "30px",
            justifyContent: "center",
            width: "90%",
            alignItems: "center",
          }}
        >
          {levels.map((lvl) => (
            <div
              key={lvl.id}
              onClick={() => onSelect(lvl.id)}
              style={{
                cursor: "pointer",
                transition: "transform 0.25s, filter 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.filter = "brightness(1.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "brightness(1)";
              }}
            >
              <img
                src={lvl.img}
                alt={lvl.label}
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                }}
              />
            </div>
          ))}
        </div>

        {/* =================================================
            📱 スマホ用レイアウト (スライド式)
           ================================================= */}
        <div className="mobile-layout-area">
          {/* 画像表示エリア (1枚だけ表示) */}
          <div
            className="mobile-item-display"
            onClick={() => onSelect(levels[mobileIndex].id)}
          >
            <img
              src={levels[mobileIndex].img}
              alt={levels[mobileIndex].label}
              style={{
                borderRadius: "15px", // 角丸追加
                boxShadow: "0 5px 15px rgba(0,0,0,0.6)",
              }}
            />
          </div>

          {/* 操作ボタンエリア (StartMenuと同じデザイン) */}
          <div className="mobile-controls-container">
            <button className="mobile-arrow-btn" onClick={handleMobilePrev}>
              ◀
            </button>

            {/* ドットインジケーター */}
            <div className="mobile-dots">
              {levels.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === mobileIndex ? "active" : ""}`}
                ></span>
              ))}
            </div>

            <button className="mobile-arrow-btn" onClick={handleMobileNext}>
              ▶
            </button>
          </div>
        </div>

        <button className="unified-back-btn" onClick={onBack}>
          ← 戻る
        </button>
      </div>
    </div>
  );
}
