// src/components/GameOverOverlay.jsx
import React, { useEffect, useState } from "react";

export default function GameOverOverlay({ onBack }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // フェードインを遅延で開始
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`gameover-overlay ${visible ? "show" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        zIndex: 3000,
        transition: "opacity 1.2s ease",
        opacity: visible ? 1 : 0,
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "20px",
          textShadow: "0 0 15px red",
          transform: visible ? "scale(1)" : "scale(0.8)",
          transition: "transform 1.2s ease",
        }}
      >
        💀 GAME OVER 💀
      </h1>
      <p style={{ fontSize: "1.3rem", marginBottom: "30px" }}>
        残念！また挑戦してみよう！
      </p>
      <button
        onClick={onBack}
        style={{
          padding: "12px 30px",
          fontSize: "1.1rem",
          borderRadius: "10px",
          background: "#f8b400",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 0 10px rgba(255,255,255,0.3)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        ← 最初に戻る
      </button>
    </div>
  );
}
