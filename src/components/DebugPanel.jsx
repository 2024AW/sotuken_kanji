// src/components/DebugPanel.jsx
import React from "react";
import "../styles.css";

export default function DebugPanel({
  gameMode = "main", // "main" | "extra"
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
        padding: "6px",
        fontSize: "12px",
        zIndex: 9999,
        lineHeight: 1.4,
      }}
    >
      <p>
        <strong>
          [デバッグ情報 ({gameMode === "extra" ? "Extra" : "Main"})]
        </strong>
      </p>

      {gameMode === "extra" ? (
        <>
          <p>
            正解数 (questionNumber): <strong>{questionNumber}</strong>
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
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
