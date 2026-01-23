// src/components/Timer.js
import React from "react";
// CSSファイルを読み込んでいない場合は必要に応じて import "../styles.css"; などを追加

export default function Timer({ timeLeft }) {
  const isWarning = timeLeft <= 10;

  return (
    <div
      className="timer-container" // ★クラス名を追加
      style={{
        position: "relative",
        width: "100px",
        height: "100px",
        margin: "0 auto 20px",
        transform: "translateY(-40px)",
      }}
    >
      {/* 背景画像 */}
      <img
        src="/images/timer.png"
        alt="timer"
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      {/* 時間数字 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "38px",
          fontWeight: "bold",
          color: isWarning ? "red" : "black",
          textShadow: "0 0 5px black",
          animation: isWarning ? "flash 0.5s infinite" : "none",
          pointerEvents: "none",
        }}
      >
        {timeLeft}
        <style>
          {`
            @keyframes flash {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.4; }
            }
          `}
        </style>
      </div>
    </div>
  );
}
