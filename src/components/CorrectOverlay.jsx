// src/components/CorrectOverlay.jsx
import React from "react";
import "../styles.css";

export default function CorrectOverlay({
  kanji,
  reading,
  meaning,
  mode, // "correct" | "skip" | "timeout"
  onNext,
}) {
  const getMessage = () => {
    if (mode === "skip") return "🔁 スキップしました";
    if (mode === "timeout") return "⏰ 時間切れ！";
    return "✅ 正解！";
  };

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
    >
      <div
        style={{
          background: "rgba(20,20,20,0.95)",
          border: "3px solid #f5c542",
          boxShadow: "0 0 18px rgba(245,197,66,0.45)",
          borderRadius: 16,
          padding: 24,
          width: "min(640px, 94vw)",
          color: "#fff",
        }}
        onClick={(e) => e.stopPropagation()} // 念のため
      >
        {/* メッセージ */}
        <div
          style={{
            fontSize: 32, // ← さらに少し大きく
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 22,
            letterSpacing: 1,
            lineHeight: 1.3,
          }}
        >
          {getMessage()}
        </div>

        {/* 内容：左右分割 */}
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "stretch",
            flexWrap: "wrap",
          }}
        >
          {/* 左：漢字＋読み */}
          <div
            style={{
              flex: "1 1 240px",
              textAlign: "center",
              borderRight: "1px solid rgba(255,255,255,0.15)",
              paddingRight: 16,
            }}
          >
            <div style={{ fontSize: 42, fontWeight: "bold", marginBottom: 8 }}>
              {kanji}
            </div>

            <div style={{ fontSize: 20 }}>
              よみ：
              <strong style={{ marginLeft: 6 }}>{reading || "（なし）"}</strong>
            </div>
          </div>

          {/* 右：意味 */}
          <div
            style={{
              flex: "1 1 240px",
              paddingLeft: 16,
              fontSize: 18,
              lineHeight: 1.6,
            }}
          >
            <div style={{ fontSize: 16, opacity: 0.8, marginBottom: 6 }}>
              意味
            </div>
            <div style={{ fontWeight: "bold" }}>{meaning || "（未登録）"}</div>
          </div>
        </div>

        {/* フッター：次へボタンのみ */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={onNext}
            style={{
              background: "#f5c542",
              color: "#222",
              border: "none",
              borderRadius: 24,
              padding: "14px 36px",
              fontSize: 18,
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            次へ ▶
          </button>
        </div>
      </div>
    </div>
  );
}
