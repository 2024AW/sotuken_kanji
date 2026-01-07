// src/components/CorrectOverlay.jsx
import React from "react";
import "../styles.css";

export default function CorrectOverlay({ kanji, reading, meaning, onNext }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={onNext}
    >
      <div
        style={{
          background: "rgba(20,20,20,0.95)",
          border: "2px solid rgba(255,255,255,0.2)",
          borderRadius: 16,
          padding: 20,
          width: "min(520px, 92vw)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>
          ✅ 正解！
        </div>

        <div style={{ fontSize: 44, fontWeight: "bold", marginBottom: 10 }}>
          {kanji}
        </div>

        <div style={{ fontSize: 20, marginBottom: 10 }}>
          よみ：<strong>{reading || "（なし）"}</strong>
        </div>

        <div style={{ fontSize: 18, opacity: 0.95 }}>
          意味：<strong>{meaning || "（未登録）"}</strong>
        </div>

        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 14 }}>
          クリックで次へ
        </div>
      </div>
    </div>
  );
}
