// src/components/QuestionCount.js
import React from "react";
import "../styles.css";

export default function QuestionCount({ onSelect, onBack }) {
  const counts = [
    { num: 7, img: "/images/7course.png" },
    { num: 10, img: "/images/10course.png" },
    { num: 16, img: "/images/16course.png" },
  ];

  return (
    <div className="unified-board">
      <img
        src="/images/kokuban14.png"
        alt="background"
        className="unified-board-bg"
      />

      <div className="unified-board-content">
        <h2
          className="board-title"
          style={{
            marginBottom: "20px",
            marginTop: "-20px",
          }}
        >
          出題数を選んでください
        </h2>

        <div
          className="question-count-list" // ★クラス名を追加
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            width: "100%",
          }}
        >
          {counts.map((item) => (
            <img
              key={item.num}
              src={item.img}
              alt={`${item.num}問`}
              onClick={() => onSelect(item.num)}
              className="question-count-img" // ★クラス名を追加
              style={{
                width: "60%", // PC版はこのまま維持
                maxWidth: "500px",
                height: "auto",
                cursor: "pointer",
                transition: "transform 0.25s, filter 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.filter = "brightness(1.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "brightness(1)";
              }}
            />
          ))}
        </div>

        <button className="unified-back-btn" onClick={onBack}>
          ← 戻る
        </button>
      </div>
    </div>
  );
}
