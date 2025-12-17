// src/components/DebugPanel.jsx
import React from "react";
import "../styles.css";

export default function DebugPanel({
  questionNumber,
  questionCount,
  questionsLength,
  isChecking,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        background: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "5px",
        fontSize: "12px",
        zIndex: 9999,
      }}
    >
      <p>
        <strong>[デバッグ情報 (E案)]</strong>
      </p>
      <p>
        questionNumber (累計正解数): <strong>{questionNumber}</strong>
      </p>
      <p>
        (Index計算値): <strong>{questionNumber - 1}</strong>
      </p>
      <p>
        目標正解数 (questionCount): <strong>{questionCount}</strong>
      </p>
      <p>
        残り問題ストック: <strong>{questionsLength}</strong>
      </p>
      <p>
        処理中: <strong>{isChecking ? "true" : "false"}</strong>
      </p>
    </div>
  );
}
