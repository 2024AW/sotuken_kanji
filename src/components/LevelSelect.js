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

  // ★スマホ用スライドの管理
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextLevel = () => {
    setCurrentIndex((prev) => (prev + 1) % levels.length);
  };

  const prevLevel = () => {
    setCurrentIndex((prev) => (prev - 1 + levels.length) % levels.length);
  };

  const currentLevel = levels[currentIndex];

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

        {/* ====================================================
            💻 PC版レイアウト (className="level-pc-area" を追加)
            スマホ(768px以下)ではCSSで非表示になります
           ==================================================== */}
        <div
          className="level-pc-area"
          style={{
            display: "flex",
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

        {/* ====================================================
            📱 スマホ版レイアウト (StartMenu風スライダー)
            PCではCSSで非表示になります
           ==================================================== */}
        <div className="level-mobile-area">
          {/* 画像表示エリア (タップで決定) */}
          <div
            className="mobile-item-display"
            onClick={() => onSelect(currentLevel.id)}
          >
            <img src={currentLevel.img} alt={currentLevel.label} />
          </div>

          {/* 操作ボタンエリア */}
          <div className="mobile-controls-container">
            <button className="mobile-arrow-btn" onClick={prevLevel}>
              ◀
            </button>
            {/* ドットインジケーター */}
            <div className="mobile-dots">
              {levels.map((_, idx) => (
                <div
                  key={idx}
                  className={`dot ${idx === currentIndex ? "active" : ""}`}
                />
              ))}
            </div>
            <button className="mobile-arrow-btn" onClick={nextLevel}>
              ▶
            </button>
          </div>

          {/* レベル名表示 */}
          <p
            style={{
              color: "white",
              fontSize: "24px",
              marginTop: "20px",
              fontFamily: '"Zen Kurenaido", sans-serif',
              textShadow: "0 2px 5px rgba(0,0,0,0.8)",
            }}
          >
            {currentLevel.label}
          </p>
        </div>

        <button className="unified-back-btn" onClick={onBack}>
          ← 戻る
        </button>
      </div>
    </div>
  );
}
