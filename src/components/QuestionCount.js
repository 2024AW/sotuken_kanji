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
        {/* ★スタイルを削除し、クラスに任せる */}
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
              style={{
                width: "60%",
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

        <button
          onClick={onBack}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            padding: "10px 24px",
            fontSize: "18px",
            borderRadius: "6px",
            cursor: "pointer",
            background: "rgba(255, 255, 255, 0.85)",
            border: "1px solid #ddd",
            color: "#333",
          }}
        >
          ← 戻る
        </button>
      </div>
    </div>
  );
}
