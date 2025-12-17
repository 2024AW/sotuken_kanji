import React from "react";

export default function Timer({ timeLeft }) {
  const isWarning = timeLeft <= 10;

  return (
    <div
      style={{
        position: "relative", // 画像と数字を重ねる
        width: "120px", // timer.png に合わせて調整
        height: "120px",
        margin: "20px auto", // 中央寄せ
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
          fontSize: "48px",
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
