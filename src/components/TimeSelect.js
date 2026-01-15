// src/components/TimeSelect.js
import React from "react";
import "../styles.css";

export default function TimeSelect({ onSelect, onBack }) {
  const times = [
    { sec: 30, img: "/images/timer30.png" },
    { sec: 15, img: "/images/timer15.png" },
  ];

  return (
    <div className="unified-board">
      <img
        src="/images/kokuban15.png"
        alt="background"
        className="unified-board-bg"
      />

      <div className="unified-board-content">
        <h2
          className="board-title"
          style={{
            marginBottom: "50px",
          }}
        >
          制限時間を選んでください
        </h2>

        <div
          style={{
            display: "flex",
            gap: "80px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {times.map((t) => (
            <img
              key={t.sec}
              src={t.img}
              alt={`${t.sec}秒`}
              onClick={() => onSelect(t.sec)}
              style={{
                width: "300px",
                maxWidth: "35%",
                height: "auto",
                cursor: "pointer",
                transition: "transform 0.25s ease, filter 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15)";
                e.currentTarget.style.filter = "brightness(1.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "brightness(1)";
              }}
            />
          ))}
        </div>

        {/* ★ここを共通クラスに変更 */}
        <button className="unified-back-btn" onClick={onBack}>
          ← 戻る
        </button>
      </div>
    </div>
  );
}
